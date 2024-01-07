'use strict';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import opener from "opener";
import action from "./0200_transaction.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // urlencodedとjsonは別々に初期化する
app.use(cors());

let server1;
let server2;

export async function main({ isDebug }) {
    try {
        // ローカルIPアドレス
        const localIpAddress = await action("GET_LOCAL_IP");
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
        await action("START_UP", {
            localUrl: localUrl,
            isDebug: isDebug,
        });
        //
        //
        // フロントエンドフォルダを公開する
        const customDirPath = await action("GET_PATH", { directoryCode: "FRONTEND_CUSTOM" });
        const defaultDirPath = await action("GET_PATH", { directoryCode: "FRONTEND_DEFAULT" });
        app.use('/custom', express.static(customDirPath));
        app.use('/default', express.static(defaultDirPath));
        const customFilePath = path.join(customDirPath, "index.html");
        const defaultFilePath = path.join(defaultDirPath, "index.html");
        //
        app.get('/', async (req, res) => {
            if (fs.existsSync(customFilePath)) {
                // appフォルダの中に「index.html」が存在する場合
                res.sendFile(customFilePath);   // 「./src/frontend/custom/index.html」を返す
            }
            else {
                // appフォルダの中に「index.html」が存在しない場合
                res.sendFile(defaultFilePath);   // 代わりに「./src/frontend/default/index.html」を返す
            }
        });
        app.get('*/json_data', async (req, res) => {
            res.send("a");
        });
        //
        app.get('*/form_data', async (req, res) => {
            const maxNumber = 9;
            let pageNumber = 1;
            if (!isNaN(req.query["page"])) {
                pageNumber = Number(req.query["page"]);
            }
            if (pageNumber < 1) {
                pageNumber = 1;
            }
            if (pageNumber >= maxNumber) {
                pageNumber = maxNumber;
            }
            const responseData = {
                "trigger0": 1,
                "tableName0": 'テーブル名0',
                "trigger1": 1,
                "tableName1": 'テーブル名1',
                "trigger2": 1,
                "tableName2": 'テーブル名2',
                "trigger3": 0,
                "tableName3": 'テーブル名3',
                "trigger4": 0,
                "tableName4": 'テーブル名4',
                "trigger5": 0,
                "tableName5": 'テーブル名5',
                "trigger6": 0,
                "tableName6": 'テーブル名6',
                "pageNumber": 1,
                "triggerPaginationFirst": (pageNumber >= 3) ? true : false,
                "triggerPaginationPrev": (pageNumber >= 2) ? true : false,
                "triggerPaginationNow": (maxNumber >= 2) ? true : false,
                "triggerPaginationNext": (pageNumber < maxNumber) ? true : false,
                "triggerPaginationLast": (pageNumber < maxNumber - 1) ? true : false,
                "pageNumberPrev": pageNumber - 1,
                "pageNumber": pageNumber,
                "pageNumberNext": pageNumber + 1,
                "pageNumberLast": maxNumber,
            };

            app.post('*/json_data', async (req, res) => {
                res.send("a");
            });
            app.post('*/form_data', async (req, res) => {
                res.send("a");
            });
            // FormData形式に変換
            const formData = new URLSearchParams(responseData).toString();

            // Content-Typeヘッダを設定してレスポンスを送信
            res.header('Content-Type', 'application/x-www-form-urlencoded');
            res.send(formData);
        });
        //
        if (isDebug === false) {
            opener(localUrl);
        }
    }
    catch (err) {
        console.error(err);
    }
}

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

// 終了時の処理
// kill
process.on('SIGTERM', async () => await endProcess());
// Ctrl+Cが押されたとき
process.on('SIGINT', async () => await endProcess());

export async function endProcess() {
    try {
        await action("CLOSE");
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