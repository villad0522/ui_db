// データベース
//
import {
  startUp,
  getPath,
} from "./106_directory_validate.js";
import {
  getLocalIp,
} from "./109_ip_address_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import path from 'path';
import sqlite3 from 'sqlite3'
import csvParser from 'csv-parser';
import iconv from 'iconv-lite';
import readline from 'readline';
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
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  if (isTransaction === true) {
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await db.run("COMMIT TRANSACTION;");
  }
  if (isConnect === true) {
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
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
  const practiceFilePath = path.join(directoryPath, "practice.db");
  //
  let filePath;
  if (isDebug) {
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    // デバッグモードの場合
    if (fs.existsSync(practiceFilePath)) {
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      await fs.promises.rm(practiceFilePath);
    }
    if (fs.existsSync(mainFilePath)) {
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      // メインデータを汚さないようにコピーする
      await fs.promises.copyFile(mainFilePath, practiceFilePath);
    }
    // コピーしたデータを使用する
    filePath = practiceFilePath;
  }
  else {
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
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
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    await db.run("BEGIN TRANSACTION;");
  }
}

// デバッグモード判定
export async function getDebugMode_core(  ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  return isDebug;
}

// トランザクション処理開始
export async function startTransaction_core(  ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  if(isTransaction===false){
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    isTransaction = true;
    await db.run("BEGIN TRANSACTION;");
  }
}

// トランザクション処理終了
export async function endTransaction_core(  ){
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  if(isTransaction===true){
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    // ↓この順序が大切
    isTransaction = false;
    await db.run("COMMIT TRANSACTION;");
  }
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  if (!params) {
    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    // パラメータなし
    try {
      return await db.all(sql);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}`;
    }
  }
  else {
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  if (!params) {
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    // パラメータなし
    try {
      return await db.run(sql);
    }
    catch (err) {
      throw `SQL文の実行中にエラーが発生しました。\n\n${err}\n\n${sql}`;
    }
  }
  else {
    if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
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
let errorCount = 0;
let allCount = 0;
let csvSize = 0;
let progressMessage = "何も処理をしていません";
let parserStream;

// CSVファイルインポート
export async function createRecordsFromCsv_core( filePath ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
  if (!fs.existsSync(filePath)) {
    throw 'ファイルが見つかりません。';
  }
  //==============================================================================
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  errorCount = 0;
  allCount = 0;
  progressMessage = `【処理中】トランザクション処理を開始しています。`;
  await startTransaction_core();  // 開始
  //
  //==============================================================================
  // CSVファイルの行数と列数を調べる
  progressMessage = `【処理中】CSVファイルの行数と列数を調べています。`;
  let readline1 = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity   // 改行が見つかるまで待機
  });
  csvSize = 0;      // 行のサイズ
  let columnSize = 0;   // 列のサイズ
  let isFirstLine = true; 
  for await (const line of readline1) {
    if(line.trim() === "") continue; // 空白をトリムしてから比較
    if(isFirstLine){
      if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
      columnSize = Object.keys(line.split(",")).length;
      isFirstLine = false;
    }
    csvSize++;
  }
  if(csvSize===0){
    if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    await endTransaction_core();    // 終了
    throw "CSVがゼロ行です。";
  }
  if (columnSize === 0) {
    if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
    await endTransaction_core();    // 終了
    throw `CSVファイルを読み込もうとしましたが、列が存在しません。`;
  }
  readline1.close();
  readline1 = null;       // メモリを開放する
  //
  //==============================================================================
  // テーブルを作り直す
  progressMessage = `【処理中】表「csv_data」を作り直しています。`;
  await db.run(`DROP TABLE IF EXISTS csv_data;`);
  const columnNames = [];
  for (let i = 0; i < columnSize; i++) {
    if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    columnNames.push(`"c${i}"`);
  }
  await db.run(`CREATE TABLE IF NOT EXISTS csv_data( ${columnNames.join(", ")} );`);
  //
  //
  //==============================================================================
  // データ移行の準備を行う
  progressMessage = `【処理中】ファイルストリームを準備しています。`;
  parserStream = fs.createReadStream(filePath)
    .pipe(iconv.decodeStream('Shift_JIS'));
  const readline2 = readline.createInterface({
    input: parserStream,
    crlfDelay: Infinity   // 改行が見つかるまで待機
  });
  progressMessage = `【処理中】SQLの命令文を準備しています。`;
  const sql = `INSERT INTO csv_data VALUES ( ${new Array(columnSize).fill("?").join(", ")} )`;
  let stmt = await db.prepare(sql);
  //
  //==============================================================================
  // CSVファイルからデータベースへ移行する
  progressMessage = `【処理中】データベースに命令しています。`;
  for await (const line of readline2) {
    if(!parserStream) {
      throw "処理が中断されました";
    }
    let array = [];
    try {
      array = parseCsv(line);
      // データベースに挿入する処理
      await stmt.run(array);
    }
    catch (err) {
      if( array.length !== columnSize ){
        if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`\n本来の列のサイズと異なります。\n現状: ${array.length}\n本来: ${columnSize}`);
        console.error(array);
      }
      else{
        if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`\nエラー`);
        console.error(line);
      }
    }
    allCount++;
    if (allCount % 1000 === 0) {
      if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
      progressMessage = `【処理中】現時点までにデータベースに送った命令が、全て実行されるのを待っています。`;
      await stmt.finalize();
      // トランザクション処理で処理を高速化する。
      //   開始と終了は、先頭と末尾に記述してあるので、
      //   ここでは１万行ごとの再接続のみを行う。
      progressMessage = `【処理中】トランザクション処理を終了しています。のちに再開する予定です。`;
      await endTransaction_core();    // 終了
      progressMessage = `【処理中】トランザクション処理を開始しています。`;
      await startTransaction_core();  // 開始
      progressMessage = `【処理中】SQLの命令文を準備しています。`;
      stmt = await db.prepare(sql);
      progressMessage = `【処理中】データベースに命令しています。`;
    }
  }
  //==============================================================================
  progressMessage = `【処理中】命令が全て実行されるのを待っています。`;
  await stmt.finalize();
  progressMessage = `【処理中】ファイルストリームを破棄しています。`;
  parserStream.destroy();
  parserStream = null;
  progressMessage = `【処理中】トランザクション処理を終了しています。`;
  await endTransaction_core();    // 終了
  progressMessage = `完了しました。`;
}


const parseCsv = csv => csv.replace(/\r/g, '').split('\n').reduce(([data, isInQuotes], line) => {
  const [datum, newIsInQuotes] = ((isInQuotes ? '"' : '') + line).split(',').reduce(([datum, isInQuotes], text) => {
    const match = isInQuotes || text.match(/^(\"?)((.*?)(\"*))$/)
    if (isInQuotes) datum[datum.length - 1] += ',' + text.replace(/\"+/g, m => '"'.repeat(m.length / 2))
    else datum.push(match[1] ? match[2].replace(/\"+/g, m => '"'.repeat(m.length / 2)) : match[2])
    return [datum, isInQuotes ? !(text.match(/\"*$/)[0].length % 2) : match[1] && !(match[4].length % 2)]
  }, [[]])
  if (isInQuotes) data[data.length - 1].push(data[data.length - 1].pop() + '\n' + datum[0], ...datum.slice(1))
  else data.push(datum)
  return [data, newIsInQuotes]
}, [[]])[0]


// インポートの進捗状況を取得する関数
export async function getCsvProgress_core(  ){
  if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
  return {
    "progressMessage": progressMessage,
    "successCount": allCount - errorCount,
    "errorCount": errorCount,
    "csvSize": csvSize,
  }
}

// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
  if(parserStream){
    if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.destroy();
    parserStream = null;
  }
  if (isConnect === true) {
    if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    await db.close();
    isConnect = false;
  }
}


// インポートを中断する関数
export async function destroyCSV_core(  ){
  if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
  setTimeout(()=>{
    errorCount = 0;
    allCount = 0;
    csvSize = 0;
    progressMessage = "何も処理をしていません";
  },500);
  if(parserStream){
    if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
    return "CSVのアップロード処理を中断しました。";
  }
  else{
    if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
    return "現在、何も実行されていません。";
  }
}
