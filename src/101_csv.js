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
let successCount = 0;
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
  successCount = 0;
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
  progressMessage = `【処理中】トランザクション処理を終了しています。のちに再開する予定です。`;
  await endTransaction();    // 終了
  //
  //
  //==============================================================================
  // データ移行の準備を行う
  progressMessage = `【処理中】ファイルストリームを準備しています。`;
  parserStream = fs.createReadStream(filePath)
    .pipe(iconv.decodeStream('Shift_JIS'));
  const sql = `INSERT INTO csv_data VALUES ( ${new Array(columnSize).fill("?").join(", ")} )`;
  //
  //==============================================================================
  // 500行をまとめてデータベースへ移行する
  let isInterval = false;
  let datas = [];
  async function intervalFunc(){
    progressMessage = `【処理中】トランザクション処理を開始しています。`;
    await startTransaction();  // 開始
    progressMessage = `【処理中】SQLの命令文を準備しています。`;
    const stmt = await db.prepare(sql);
    progressMessage = `【処理中】データベースに命令を送信しています。`;
    const buf = datas;
    datas = [];       // グローバル変数に代入
    //
    // データベースに挿入する処理
    const funcs = [];
    async function func(cells){
      await stmt.run(cells);
      successCount++;
    }
    for( const cells of buf ){
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      funcs.push(func(cells));
    }
    await Promise.all(funcs);
    progressMessage = `【処理中】データベースに送信した${buf.length}件の命令の完了を待っています。`;
    await stmt.finalize();
    progressMessage = `【処理中】トランザクション処理を確定させています。`;
    await endTransaction();    // 終了
    isInterval = false;
    if(parserStream){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      progressMessage = `【処理中】CSVファイルからの読み出しを再開しています。`;
      parserStream.resume();
      progressMessage = `【処理中】CSVファイルから読み出しています。`;
    }
    else{
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      // 処理が中断された場合
      errorCount = 0;
      allCount = 0;
      successCount = 0;
      csvSize = 0;
      progressMessage = "何も処理をしていません";
    }
  }
  //
  //==============================================================================
  // １行を読み込む
  const threads = [];
  function oneLine(lineText){
    const matrix = parseCsv(lineText);
    for(const cells of matrix){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      try{
        if( cells.length === columnSize ){
          if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
          datas.push(cells);
        }
        else{
          if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
          console.error(`\n本来の列のサイズと異なります。\n現状: ${cells.length}\n本来: ${columnSize}`);
          console.error(cells);
          errorCount++;
        }
      }
      catch(err){
        console.error(`\nCSVの解析に失敗しました。`);
        console.error(line);
        console.error(err);
        errorCount++;
      }
      allCount++;
      if (allCount % 500 === 0) {
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        if( isInterval === true ) continue;
        if( datas.length===0 ) continue;
        isInterval = true;
        progressMessage = `【処理中】CSVファイルからの読み出しを一時停止しています。`;
        parserStream.pause();
        threads.push(intervalFunc());
      }
    }
  }
  //
  //==============================================================================
  // CSVファイルから読み出す
  progressMessage = `【処理中】CSVファイルから読み出しています。`;
  let rest = "";
  await new Promise((resolve, reject) => {
    parserStream.on('data', (text1) => {
      if(!parserStream) {
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error("処理が中断されました");
        return;
      }
      const results = splitLastNewline( rest + text1 );
      rest = results[1];
      oneLine( results[0] );
    }).on('end', () => {
        resolve();
    });
  });
  if( rest.length > 0 ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    oneLine( rest );
  }
  //==============================================================================
  await Promise.all(threads);
  progressMessage = `【最終処理中】ファイルストリームを破棄しています。`;
  parserStream.destroy();
  parserStream = null;
  if( datas.length>0 ){
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    await intervalFunc();
  }
  progressMessage = `完了しました。`;
}



// CSV行を配列へ変換する関数
//  参考：https://zenn.dev/itte/articles/516228940932a5
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


// "最後の改行" をもとに、文字列を２つに分割する関数
function splitLastNewline(inputString) {
  const lastNewlineIndex = inputString.lastIndexOf('\n');
  if (lastNewlineIndex !== -1) {
    return [
      inputString.substring(0, lastNewlineIndex),
      inputString.substring(lastNewlineIndex + 1)
    ];
  } else {
    // 改行が見つからない場合、元の文字列をそのまま返す
    return ["", inputString];
  }
}

// インポートの進捗状況を取得する関数
export async function getCsvProgress_core(  ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  return {
    "progressMessage": progressMessage,
    "successCount": successCount,
    "errorCount": errorCount,
    "csvSize": csvSize,
  }
}


// インポートを中断する関数
export async function destroyCSV_core(  ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
  setTimeout(()=>{
    errorCount = 0;
    allCount = 0;
    successCount = 0;
    csvSize = 0;
    progressMessage = "何も処理をしていません";
  },500);
  if(parserStream){
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
    return "CSVのアップロード処理を中断しました。";
  }
  else{
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    return "現在、何も実行されていません。";
  }
}


// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
  errorCount = 0;
  allCount = 0;
  successCount = 0;
  csvSize = 0;
  progressMessage = "何も処理をしていません";
  if(parserStream){
    if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
  }
  await close();   // 下層の関数を呼び出す
}