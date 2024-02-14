// データベース
//
import {
  startUp,
  close,
  getPath,
} from "./130_directory_validate.js";
import {
  getLocalIp,
} from "./133_ip_address_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import path from 'path';
import sqlite3 from 'sqlite3'
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

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  if (isConnect === true) {
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await db.close();
    isConnect = false;
  }
  //
  await startUp( localUrl );   // 下層の関数を呼び出す
  //
  // フォルダのパス
  const directoryPath = await getPath("SAVEDATA");
  //
  // データベースファイルのパス
  const mainFilePath = path.join(directoryPath, "main.db");
  //
  let filePath;
  if (isDebug) {
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // デバッグモードの場合
    const practiceFilePath = path.join(directoryPath, "practice.db");
    if (fs.existsSync(practiceFilePath)) {
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      await fs.promises.rm(practiceFilePath);
    }
    if (fs.existsSync(mainFilePath)) {
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      // メインデータを汚さないようにコピーする
      //await fs.promises.copyFile(mainFilePath, practiceFilePath);
    }
    // コピーしたデータを使用する
    filePath = practiceFilePath;
  }
  else {
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
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



// デバッグモード判定
export async function getDebugMode_core(  ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  return isDebug;
}



// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  if (!params) {
    if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    // パラメータなし
    try {
      return await db.all(sql);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}`;
    }
  }
  else {
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // パラメータあり
    try {
      return await db.all(sql, params);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}\n\n${_getErrorText(params)}`;
    }
  }
}

function _getErrorText(params){
  const newParams = structuredClone(params);
  for( const key in newParams ){
    const value = newParams[key];
    if( value.length > 20 ){
      newParams[key] = [ "配列のサイズが大きいので表示できません" ];
    }
  }
  return JSON.stringify(newParams, null, 2);
}



// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  if (!params) {
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    // パラメータなし
    try {
      return await db.run(sql);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}`;
    }
  }
  else {
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    // パラメータあり
    try {
      return await db.run(sql, params);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}\n\n${_getErrorText(params)}`;
    }
  }
}



// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  if (isConnect === true) {
    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    await db.close();
    isConnect = false;
  }
}



// データベースオブジェクトを取得
export async function getDB_core(  ){
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
  return db;
}
