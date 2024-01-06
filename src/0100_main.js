'use strict';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import opener from "opener";
import action from "./0200_transaction.js";

export default action;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // urlencodedとjsonは別々に初期化する
app.use(cors());

app.use((req, res, next) => {
    const originalUrl = req.originalUrl.split("?")[0];
    process.stdout.write("\n\n" + originalUrl + "\n");
    next();
});

let server1;
let server2;

async function main() {
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
            isDebug: false,
        });
        //
        // フロントエンドフォルダを公開する
        const frontendAppPath = await action("GET_PATH", { directoryCode: "FRONTEND_APP" });
        const frontendSystemPath = await action("GET_PATH", { directoryCode: "FRONTEND_SYSTEM" });
        const appFilePath = path.join(frontendAppPath, "index.html");
        const systemFilePath = path.join(frontendSystemPath, "index.html");
        app.use('/app', express.static(frontendAppPath));
        app.use('/system', express.static(frontendSystemPath));
        app.get('/', async (req, res) => {
            if (fs.existsSync(appFilePath)) {
                // appフォルダの中に「index.html」が存在する場合
                res.sendFile(appFilePath);   // 「./src/frontend/app/index.html」を返す
            }
            else {
                // appフォルダの中に「index.html」が存在しない場合
                res.sendFile(systemFilePath);   // 代わりに「./src/frontend/system/index.html」を返す
            }
        });
        //
        //opener(localUrl);
    }
    catch (err) {
        console.error(err);
    }
}
main();

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
process.on('SIGTERM', process.exit); // for kill
process.on('SIGINT', process.exit); // for Ctrl+C
process.on('exit', async function (code) {
    try {
        await action("CLOSE");
        await _closeServer(server1);
        await _closeServer(server2);
    }
    catch (err) {
        console.error(err);
    }
});

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