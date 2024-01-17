// データベース
//
import {
  startUp,
  getPath,
} from "./026_directory_test.js";
import {
  getLocalIp,
} from "./028_ip_address_test.js";

import path from 'path';
import sqlite3 from 'sqlite3'
import csvParser from 'csv-parser';
import iconv from 'iconv-lite';
import { Database } from 'sqlite'
import fs from 'fs';

// 使用したnpmパッケージ「sqlite」
//  https://github.com/kriasoft/node-sqlite#readme

//【グローバル変数】データベースとの接続情報
let db = null;

//【グローバル変数】接続中？
let isConnect = false;

//【グローバル変数】デバッグモード
let isDebug = false;

//【グローバル変数】トランザクション処理中？
let isTransaction = false;

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if (isTransaction === true) {
    await db.run("COMMIT TRANSACTION;");
  }
  if (isConnect === true) {
    await db.close();
    isConnect = false;
  }
  //
  await startUp( localUrl );   // 下層の関数を呼び出す
  //
  isDebug = parameters?.isDebug ? true : false;
  //
  // フォルダのパス
  const directoryPath = await getPath("SAVEDATA");
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
  if (isTransaction === true) {
    await db.run("BEGIN TRANSACTION;");
  }
}

// デバッグモード判定
export async function getDebugMode_core(  ){
  return isDebug;
}

// トランザクション処理開始
export async function startTransaction_core(  ){
  await db.run("BEGIN TRANSACTION;");
  isTransaction = true;
}

// トランザクション処理終了
export async function endTransaction_core(  ){
  await db.run("COMMIT TRANSACTION;");
  isTransaction = false;
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
  if (!params) {
    // パラメータなし
    try {
      return await db.all(sql);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}`;
    }
  }
  else {
    // パラメータあり
    try {
      return await db.all(sql, params);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}\n\n${JSON.stringify(params, null, 2)}`;
    }
  }
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
  if (!params) {
    // パラメータなし
    try {
      return await db.run(sql);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}`;
    }
  }
  else {
    // パラメータあり
    try {
      return await db.run(sql, params);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}\n\n${JSON.stringify(params, null, 2)}`;
    }
  }
}


//【グローバル変数】CSVファイルを読み込む進捗
let progressCSV = 0;

// CSVファイルインポート
export async function createRecordsFromCsv_core( tableId, filePath, columnSize ){
  // CSVファイルを読み込む
  const fileStream = fs.createReadStream(filePath);
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
  const fileContent = await fs.promises.readFile(filePath, 'utf8');
  const csvSize = fileContent.split('\n').length;
  //
  // CSVファイルからデータベースへ移行する
  const stmt = await db.prepare(`INSERT INTO ${tableId} VALUES ( ${headers.join(", ")} )`);
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
  return `CSVファイルの内容を、データベースに追記しました。${successCount}件の追記に成功して、${errorCount}件の追記に失敗しました。`;
}

// インポートの進捗状況を取得する関数
export async function getCsvProgress_core(  ){
  return progressCSV;
}

// バックエンドプログラム終了
export async function close_core(  ){
  if (isConnect === true) {
    await db.close();
    isConnect = false;
  }
}
