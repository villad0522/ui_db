
//###############################################################
// SQLiteに接続する
//###############################################################

import path from 'path';
import sqlite3 from 'sqlite3'
import csvParser from 'csv-parser';
import iconv from 'iconv-lite';
import { Database } from 'sqlite'
import fs from 'fs';
import action from "./8000_file_path.js"; // 下層から提供されているメイン関数

// 使用したnpmパッケージ「sqlite」
//  https://github.com/kriasoft/node-sqlite#readme

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "7900";

//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる

// このJavaScriptファイルでのメイン関数
export default async function (command, parameters) {
    if (!command) {
        throw `[${LAYER_CODE}層] 引数「command」がNULLです`;
    }
    if (typeof command !== "string" && !(command instanceof String)) {
        throw `[${LAYER_CODE}層] 引数「command」が文字列ではありません`;
    }
    bugMode = 0;  // バグを混入させない（通常動作）
    //
    // コマンドごとに場合分け
    switch (command) {
        case "START_UP":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _startUp(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        case "GET_DEBUG_MODE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getDebugMode(parameters);
        case "START_TRANSACTION":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _startTransaction(parameters);
        case "END_TRANSACTION":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _endTransaction(parameters);
        case "RUN_SQL_READ_ONLY":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _runSqlReadOnly(parameters);
        case "RUN_SQL_WRITE_ONLY":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _runSqlWriteOnly(parameters);
        case "CREATE_RECORDS_FROM_CSV":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createRecordsFromCsv(parameters);
        case "GET_CSV_PROGRESS":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getCsvProgress(parameters);
        case "CLOSE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _close(parameters);
        default:
            // 下層のメイン関数を呼び出す
            // （下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
    }
}

//【グローバル変数】データベースとの接続情報
let db = null;

//【グローバル変数】接続中？
let isConnect = false;

//【グローバル変数】デバッグモード
let isDebug = false;

//【サブ関数】プログラム起動
async function _startUp(parameters) {
    await action("START_UP", parameters);   // 下層の関数を呼び出す
    //
    if (isConnect === true) {
        await db.close();
        isConnect = false;
    }
    //
    if (bugMode === 1) return;  // 意図的にバグを混入させる（ミューテーション解析）
    //
    isDebug = parameters?.isDebug ? true : false;
    //
    // フォルダのパス
    const directoryPath = await action("GET_PATH", { directoryCode: "SAVEDATA" });
    //
    // データベースファイルのパス
    const mainFilePath = path.join(directoryPath, "main.db");
    const practiceFilePath = path.join(directoryPath, "practice.db");
    //
    let filePath;
    if (isDebug) {
        // デバッグモードの場合
        if (fs.existsSync(mainFilePath)) {
            // メインデータを汚さないようにコピーする
            await fs.promises.copyFile(mainFilePath, practiceFilePath);
        }
        // コピーしたデータを使用する
        filePath = practiceFilePath;
    }
    else {
        // 通常動作の場合、メインデータを直接操作する
        filePath = mainFilePath;
    }
    //
    db = new Database({
        filename: filePath,
        driver: sqlite3.Database
    });
    await db.open();
    isConnect = true;
    db.configure('busyTimeout', 3000);  // 3 seconds
    await db.exec("PRAGMA foreign_keys = 1;"); // 外部キー制約を有効にする
}

//【サブ関数】デバッグモード判定
async function _getDebugMode(parameters) {
    return isDebug;
}

//【サブ関数】トランザクション処理開始
async function _startTransaction(parameters) {
    await db.run("BEGIN TRANSACTION;");
}

//【サブ関数】トランザクション処理終了
async function _endTransaction(parameters) {
    await db.run("COMMIT TRANSACTION;");
}

//【サブ関数】SQLクエリ実行（読み取り専用）
async function _runSqlReadOnly(parameters) {
    if (!parameters?.sql) {
        throw `[${LAYER_CODE}層] パラメーター「sql」がNULLです`;
    }
    if (typeof parameters.sql !== "string" && !(parameters.sql instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「sql」が文字列ではありません`;
    }
    if (!parameters?.params) {
        // パラメータなし
        try {
            return await db.all(parameters.sql);
        }
        catch (err) {
            throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${parameters.sql}`;
        }
    }
    else {
        // パラメータあり
        if (typeof parameters.params !== 'object') {
            throw `[${LAYER_CODE}層] パラメーター「params」がオブジェクト型ではありません`;
        }
        if (Array.isArray(parameters.params)) {
            throw `[${LAYER_CODE}層] パラメーター「params」は配列を格納しないでください`;
        }
        try {
            return await db.all(parameters.sql, parameters?.params);
        }
        catch (err) {
            throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${parameters.sql}\n\n${JSON.stringify(parameters?.params, null, 2)}`;
        }
    }
}

//【サブ関数】SQLクエリ実行（書き込み専用）
async function _runSqlWriteOnly(parameters) {
    if (!parameters?.sql) {
        throw `[${LAYER_CODE}層] パラメーター「sql」がNULLです`;
    }
    if (typeof parameters.sql !== "string" && !(parameters.sql instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「sql」が文字列ではありません`;
    }
    if (!parameters?.params) {
        // パラメータなし
        try {
            return await db.run(parameters.sql);
        }
        catch (err) {
            throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${parameters.sql}`;
        }
    }
    else {
        // パラメータあり
        if (typeof parameters.params !== 'object') {
            throw `[${LAYER_CODE}層] パラメーター「params」がオブジェクト型ではありません`;
        }
        if (Array.isArray(parameters.params)) {
            throw `[${LAYER_CODE}層] パラメーター「params」は配列を格納しないでください`;
        }
        try {
            return await db.run(parameters.sql, parameters?.params);
        }
        catch (err) {
            throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${parameters.sql}\n\n${JSON.stringify(parameters?.params, null, 2)}`;
        }
    }
}

//【グローバル変数】CSVファイルを読み込む進捗
let progressCSV = 0;

//【サブ関数】既に存在するテーブルにCSVファイルを読み込む関数
//       ※テーブルとカラムは既に用意してあるものとする。
async function _createRecordsFromCsv(parameters) {
    if (bugMode === 2) return;  // 意図的にバグを混入させる（ミューテーション解析）
    //
    if (!parameters?.tableNumber) {
        throw `[${LAYER_CODE}層] パラメーター「tableNumber」が空欄です`;
    }
    if (isNaN(parameters.tableNumber)) {
        throw `[${LAYER_CODE}層] パラメーター「tableNumber」を数値に変換できません`;
    }
    //
    if (!parameters?.columnSize) {
        throw `[${LAYER_CODE}層] パラメーター「columnSize」が空欄です`;
    }
    if (isNaN(parameters.columnSize)) {
        throw `[${LAYER_CODE}層] パラメーター「columnSize」を数値に変換できません`;
    }
    //
    if (!parameters?.filePath) {
        throw `[${LAYER_CODE}層] パラメーター「filePath」が空欄です`;
    }
    if (typeof parameters.filePath !== "string" && !(parameters.filePath instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「filePath」が文字列ではありません`;
    }
    if (!fs.existsSync(parameters.filePath)) {
        throw `[${LAYER_CODE}層] CSVファイルが存在しません`;
    }
    progressCSV = 0;
    //
    const tableNumber = String(Number(parameters.tableNumber));
    const columnSize = Number(parameters.columnSize);
    //
    // CSVファイルを読み込む
    const fileStream = fs.createReadStream(parameters.filePath);
    const headers = [];
    for (let i = 0; i < columnSize; i++) {
        headers.push(":" + String(i));
    }
    // 配列「headers」には :0, :1, :2... が格納されているはず
    //
    const parser = fileStream
        .pipe(iconv.decodeStream('Shift_JIS'))
        .pipe(csvParser({ headers: headers }));
    //
    // CSVファイルの行数を調べる
    const fileContent = await fs.promises.readFile(parameters.filePath, 'utf8');
    const csvSize = fileContent.split('\n').length;
    //
    // CSVファイルからデータベースへ移行する
    const stmt = await db.prepare(`INSERT INTO t${tableNumber} VALUES ( ${headers.join(", ")} )`);
    let errorCount = 0;
    let allCount = 0;
    await new Promise((resolve, reject) => {
        parser.on('data', async (row) => {
            try {
                // データベースに挿入する処理
                await stmt.run(row);
            }
            catch (err) {
                errorCount++;
                console.error("失敗");
            }
            allCount++;
            if (allCount % 10000 === 0) {
                progressCSV = Math.floor(allCount / csvSize * 100);
                console.log(`${progressCSV}%`);
                //
                // トランザクション処理で処理を高速化する。
                //   開始と終了は、0200_transaction.jsに記述してあるので、
                //   ここでは１万行ごとの再接続のみを行う。
                await db.run("COMMIT TRANSACTION;");    // 終了
                await db.run("BEGIN TRANSACTION;");     // 開始
            }
        }).on('end', () => {
            resolve();
        });
    });
    await stmt.finalize();
    const successCount = allCount - errorCount;
    return {
        userMessage: `CSVファイルの内容を、データベースに追記しました。${successCount}件の追記に成功して、${errorCount}件の追記に失敗しました。`,
    };
}

//【サブ関数】CSVファイルのインポートの進捗状況を取得する
async function _getCsvProgress(parameters) {
    return {
        progressCSV: progressCSV,
    };
}

//【サブ関数】バックエンドプログラム終了
async function _close(parameters) {
    if (isConnect === true) {
        await db.close();
        isConnect = false;
    }
}

//###############################################################
// 以下、テスト用のコード

//【サブ関数】フレームワーク自体のテストを実行
async function _testFramework(parameters) {
    if (isDebug == false) {
        // デバッグモードではない場合
        throw `[${LAYER_CODE}層] テストは本番用データ上で実行できません。`;
    }
    if (!parameters?.targetLayer) {
        throw `[${LAYER_CODE}層] パラメーター「targetLayer」がNULLです`;
    }
    if (isNaN(parameters.targetLayer)) {
        throw `[${LAYER_CODE}層] パラメーター「targetLayer」を数値に変換できません`;
    }
    if (Number(parameters.targetLayer) !== Number(LAYER_CODE)) {
        // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
        return await action("TEST_FRAMEWORK", parameters);
    }
    bugMode = 0;    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    //
    let bugMode2;
    for (bugMode = 1; bugMode <= 2; bugMode++) {
        bugMode2 = bugMode;
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた
        }
        // 意図的に埋め込んだバグを検出できなかった
        bugMode = 0;    // 意図的なバグの発生を止める
        return {
            userMessage: `${LAYER_CODE}層からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode:${bugMode2})を検出できませんでした`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    bugMode = 0;    // 意図的なバグの発生を止める
    return {
        userMessage: `${LAYER_CODE}層からバグは見つかりませんでした。また、意図的に${bugMode2}件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}

//【サブ関数】テストを実行
async function _test() {
    //
    // CSVファイルに書き込むデータ
    const data = [
        ['John Doe', 25, 'New York'],
        ['Jane Smith', 30, 'San Francisco'],
        ['Bob Johnson', 22, 'Los Angeles']
    ];
    const csvText = data.map(row => row.join(',')).join('\n');
    //
    // CSVファイルのパス
    const cachePath = await action("GET_PATH", { directoryCode: "CACHE" });
    const csvFilePath = path.join(cachePath, 'test.csv');
    //
    // CSVファイルを作成してデータを書き込む
    await fs.promises.writeFile(csvFilePath, csvText, 'utf8');
    //
    // テーブルを作り直す
    await db.exec(`
        DROP TABLE IF EXISTS t99999;
        CREATE TABLE t99999 (
            "name" TEXT,
            "age" INTEGER,
            "city" TEXT
        );
    `);
    //
    // CSVファイルからデータベースに読み込む
    await _createRecordsFromCsv({
        tableNumber: 99999,
        filePath: csvFilePath,
        columnSize: 3,
    });
    //
    // わざと再接続
    await action("START_UP", { isDebug: true });
    //
    // テーブルから読み出す
    const matrix = await db.all(`SELECT * FROM t99999`);
    if (matrix.length !== data.length) {
        console.log(matrix);
        throw `[${LAYER_CODE}層] インポートしたはずの件数と合致しません`;
    }
    if (matrix[0]["name"] !== data[0][0]) {
        console.log(matrix);
        throw `[${LAYER_CODE}層] インポートしたはずの内容と合致しません`;
    }
    //
    // CSVファイルを削除
    await fs.promises.rm(csvFilePath);
    //
    // テスト用のテーブルを削除
    await db.exec(`
        DROP TABLE IF EXISTS t99999;
    `);
}

// テスト用のコード ここまで
//###############################################################