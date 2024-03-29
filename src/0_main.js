'use strict';
import express from 'express';
import cors from 'cors';
import opener from "opener";
import multer from "multer";
import {
    runApi,
    startUp,
    getLocalIp,
    getPath,
    close,
    createRecordsFromCsv,
    openExcel,
} from "./002_index.js";


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
    server2 = await _launchServer(app, '127.0.0.1', 3000, 3100);
    const addressInfo1 = server1.address();
    const addressInfo2 = server2.address();
    const localUrl1 = "http://" + addressInfo1.address + ":" + addressInfo1.port;
    const localUrl2 = "http://" + addressInfo2.address + ":" + addressInfo2.port;
    console.log(localUrl1);
    console.log(localUrl2);
    //
    // 下層の処理を呼び出す
    await startUp(localUrl1, isDebug);
    //
    //
    // フロントエンドフォルダを公開する
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const defaultDirPath = await getPath("FRONTEND_DEFAULT");
    app.use('/custom', express.static(customDirPath));
    app.use('/default', express.static(defaultDirPath));
    //============================================================
    app.get('/', async (req, res) => {
        res.redirect("/custom/1/index.html");
    });
    //============================================================
    opener(localUrl1);
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

// ファイルの保存先ディレクトリを指定
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const cacheDirPath = await getPath("CACHE");
        // 保存先ディレクトリを指定
        cb(null, cacheDirPath);
    },
    filename: function (req, file, cb) {
        // 保存されるファイル名を指定
        cb(null, "upload.csv");
    }
});

// アップロードを制限する場合は、fileFilterなどを使用して設定できます

// Multerのインスタンスを生成
const upload = multer({ storage: storage });

// アップロードされたファイルを処理するエンドポイント
app.post('/upload', upload.single('input_file'), async (req, res) => {
    if (req.file.mimetype !== 'text/csv') {
        res.status(500).type("text/plain").send("アップロードされたファイルがCSV形式ではありません。");
        return;
    }
    // Content-Typeヘッダを設定してレスポンスを送信
    res.header('Content-Type', 'application/json');
    res.send({
        "nextUrl": "/default/upload_progress/index.html"
    });
    try {
        let fileName = decodeURIComponent(req.file.originalname);
        await createRecordsFromCsv(fileName, req.file.path);
    }
    catch (err) {
        console.error(err);
    }
});


//============================================================
// Excelファイルを開く関数

app.get('/open_excel/:pageId', async (req, res) => {
    try {
        const pageId = Number(req.params.pageId);
        const { fileContents, fileName } = await openExcel(req.ip, pageId, req.query);
        if (fileContents) {
            const fileName2 = encodeURIComponent(fileName);
            res.set({ 'Content-Disposition': `attachment; filename=${fileName2}` })
            res.status(200).send(fileContents);
        }
        else {
            res.header('Content-Type', 'text/html');
            res.send(`<!DOCTYPE html> <html lang="ja"> <head><meta charset="utf-8"><script>setTimeout(window.close,2000);</script></head> <body><h1 style="text-align: center;">Excelファイルを開いています...</h1></body> </html>`);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).type("text/plain").send(String(err));
    }
})

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
        console.error(err);
        res.status(500).type("text/plain").send(String(err));
        //
        console.log(`\n\n次の処理に影響を与えないように、データベースを再起動します。`);
        try {
            await close();
            await startUp(null, false);
        }
        catch (err) {
            console.error(err);
        }
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