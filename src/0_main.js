'use strict';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import opener from "opener";
import { startUp, getLocalIp, getPath, runApi, close } from "./002_index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // urlencodedとjsonは別々に初期化する
app.use(cors());

let server1;
let server2;

async function main({ isDebug }) {
    // ローカルIPアドレス
    const localIpAddress = await getLocalIp();
    if (!localIpAddress) {
        console.error('ローカルIPアドレスを取得できませんでした');
        process.exit();
    }
    server1 = await _launchServer(app, localIpAddress, 3000, 3100);
    server2 = await _launchServer(app, 'localhost', 3000, 3100);
    const addressInfo = server1.address();
    const localUrl = "http://" + addressInfo.address + ":" + addressInfo.port;
    console.log(localUrl);
    //
    // 下層の処理を呼び出す
    await startUp(localUrl, isDebug);
    //
    //
    // フロントエンドフォルダを公開する
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const defaultDirPath = await getPath("FRONTEND_DEFAULT");
    app.use('/custom', express.static(customDirPath));
    app.use('/default', express.static(defaultDirPath));
    //============================================================
    app.get('/', async (req, res) => {
        const customFilePath = path.join(customDirPath, "1.html");
        if (fs.existsSync(customFilePath)) {
            // ./src/frontend/custom/1.html が存在する場合
            res.redirect("/custom/1.html");
        }
        else {
            // ./src/frontend/custom/index.html が存在しない場合
            res.redirect("/default");
        }
    });
    //============================================================
    opener("http://" + addressInfo.address + ":" + addressInfo.port);
}


main({ isDebug: false });

//============================================================
function _launchServer(app, hostname, startPort, maxPort) {
    return new Promise((resolve, reject) => {
        let port = startPort;
        //console.log(`  ポート ${port} の使用を試みます`)
        let server = app.listen(port, hostname);
        server.on('listening', () => {
            //console.log(`  ポート ${port} を確保できました`)
            //console.log(`  http://localhost:${port}\n`);
            resolve(server)
        })
        server.on('error', (err) => {
            //console.log(`  ポート ${port} は既に使われています\n`)
            port += 5;  //ポート番号を5ずつ増やす
            if (port < maxPort) {
                //console.log(`  ポート ${port} の確保を試みます`)
                server.listen(port, hostname);
            } else {
                reject(`  ポートが全て埋まっています`)
            }
        })
    })
}
//============================================================



app.get('*/json', _api);
app.get('*/form', _api);
app.post('*/json', _api);
app.post('*/form', _api);



//============================================================



async function _api(req, res) {
    try {
        let requestBody = req.body ?? {};
        let isRequestFormData = false;
        if (req.method === "POST") {
            // Content-Typeを抽出
            const contentType = req.headers['content-type'];
            if (String(contentType).includes("application/x-www-form-urlencoded")) {
                isRequestFormData = true;
            }
            else if (String(contentType).includes("application/json")) {
                isRequestFormData = false;
            }
            else {
                const messsage = `フロントエンド側でcontent-typeの指定を忘れていませんか？ サポートしていないメディアタイプを受け取りました。content-type="${contentType}"   データ本体：${requestBody}  データ本体の型：${typeof requestBody}`;
                console.error(messsage);
                res.status(415).type("text/plain").send(messsage);
                return;
            }
        }
        let isResponseFormData = false;
        let path = String(req.path);
        if (path.endsWith("/")) {
            // 末尾のスラッシュを除去
            path = path.slice(0, -1);
        }
        if (path.endsWith("/json")) {
            // 末尾の「/json」を除去
            path = path.slice(0, -5);
            isResponseFormData = false;
        }
        else if (path.endsWith("/form")) {
            // 末尾の「/form」を除去
            path = path.slice(0, -5);
            isResponseFormData = true;
        }
        //
        // 処理本体を実行する
        const responseData = await runApi(
            req.method,
            path,
            req.query,
            requestBody,
            isRequestFormData, // リクエストがFormData形式ならtrue、JSON形式ならfalse
            isResponseFormData,  // レスポンスがFormData形式ならtrue、JSON形式ならfalse
        );
        if (isResponseFormData) {
            // FormData形式に変換
            const formData = new URLSearchParams(responseData).toString();
            // Content-Typeヘッダを設定してレスポンスを送信
            res.header('Content-Type', 'application/x-www-form-urlencoded');
            res.send(formData);
        }
        else {
            // Content-Typeヘッダを設定してレスポンスを送信
            res.header('Content-Type', 'application/json');
            res.send(responseData);
        }
    }
    catch (err) {
        console.error(String(err));
        res.status(500).type("text/plain").send(String(err));
    }
}




//============================================================
// 終了時の処理
// kill
process.on('SIGTERM', async () => await endProcess());
// Ctrl+Cが押されたとき
process.on('SIGINT', async () => await endProcess());

async function endProcess() {
    try {
        await close();
        await _closeServer(server1);
        await _closeServer(server2);
        console.log("終了処理を完了しました。\n");
        process.exit(1);
    }
    catch (err) {
        console.error(err);
    }
}

function _closeServer(server) {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
//============================================================