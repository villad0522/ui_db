// CSVインポート
//
import {
  startUp,
  close,
  startTransaction,
  endTransaction,
} from "./103_transaction_lower_validate.js";
import {
  getLocalIp,
} from "./112_ip_address_validate.js";
import {
  getPath,
} from "./109_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./106_connect_database_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import iconv from 'iconv-lite';
import readline from 'readline';
import fs from 'fs';

// 使用したnpmパッケージ「sqlite」
//  https://github.com/kriasoft/node-sqlite#readme


//【グローバル変数】CSVファイルを読み込む進捗
let errorCount = 0;
let allCount = 0;
let csvSize = 0;
let progressMessage = "何も処理をしていません";
let parserStream;




// CSVファイルインポート
export async function createRecordsFromCsv_core( filePath ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  if (!fs.existsSync(filePath)) {
    throw 'ファイルが見つかりません。';
  }
  const db = await getDB();
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  errorCount = 0;
  allCount = 0;
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
      if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
      columnSize = Object.keys(line.split(",")).length;
      isFirstLine = false;
    }
    csvSize++;
  }
  if(csvSize===0){
    throw "CSVがゼロ行です。";
  }
  if (columnSize === 0) {
    throw `CSVファイルを読み込もうとしましたが、列が存在しません。`;
  }
  readline1.close();
  readline1 = null;       // メモリを開放する
  //
  //==============================================================================
  // テーブルを作り直す
  progressMessage = `【処理中】トランザクション処理を開始しています。`;
  await startTransaction();  // 開始
  progressMessage = `【処理中】表「csv_data」を作り直しています。`;
  await db.run(`DROP TABLE IF EXISTS csv_data;`);
  const columnNames = [];
  for (let i = 0; i < columnSize; i++) {
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
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
  let interval = 100;   // 100から10000まで増やす
  for await (const line of readline2) {
    if(!parserStream) {
      throw new Error("処理が中断されました");
    }
    let cells = [];
    try {
      array = parseCsvLine(line);
      // データベースに挿入する処理
      await stmt.run(array);
    }
    catch (err) {
      if( array.length !== columnSize ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`\n本来の列のサイズと異なります。\n現状: ${array.length}\n本来: ${columnSize}`);
        console.error(array);
      }
      else{
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`\nエラー`);
        console.error(line);
      }
    }
    allCount++;
    if (allCount % interval === 0) {
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      if(interval<=500){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        interval += 100;
      }
      progressMessage = `【処理中】現時点までにデータベースに送った命令が、全て実行されるのを待っています。`;
      await stmt.finalize();
      // トランザクション処理で処理を高速化する。
      //   開始と終了は、先頭と末尾に記述してあるので、
      //   ここでは１万行ごとの再接続のみを行う。
      progressMessage = `【処理中】トランザクション処理を終了しています。のちに再開する予定です。`;
      await endTransaction();    // 終了
      progressMessage = `【処理中】トランザクション処理を開始しています。`;
      await startTransaction();  // 開始
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
  await endTransaction();    // 終了
  progressMessage = `完了しました。`;
}



// CSV行を配列へ変換する関数
//  参考：https://zenn.dev/itte/articles/516228940932a5
const parseCsvLine = line => line.split(',').reduce(([data, isInQuotes], text) => {
  if (isInQuotes) {
    data[data.length - 1] += ',' + text.replace(/\"+/g, m => '"'.repeat(m.length / 2))
    return [data, !(text.match(/\"*$/)[0].length % 2)]
  } else {
    const match = text.match(/^(\"?)((.*?)(\"*))$/)
    data.push(match[1] ? match[2].replace(/\"+/g, m => '"'.repeat(m.length / 2)) : match[2])
    return [data, match[1] && !(match[4].length % 2)]
  }
}, [[]])[0]


// インポートの進捗状況を取得する関数
export async function getCsvProgress_core(  ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  return {
    "progressMessage": progressMessage,
    "successCount": allCount - errorCount,
    "errorCount": errorCount,
    "csvSize": csvSize,
  }
}


// インポートを中断する関数
export async function destroyCSV_core(  ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  setTimeout(()=>{
    errorCount = 0;
    allCount = 0;
    csvSize = 0;
    progressMessage = "何も処理をしていません";
  },500);
  if(parserStream){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
    return "CSVのアップロード処理を中断しました。";
  }
  else{
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    return "現在、何も実行されていません。";
  }
}


// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
  errorCount = 0;
  allCount = 0;
  csvSize = 0;
  progressMessage = "何も処理をしていません";
  if(parserStream){
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
  }
  await close();   // 下層の関数を呼び出す
}