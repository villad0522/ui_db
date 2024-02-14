// CSVインポート
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  _getParentValue,
  _getRecordOffset,
} from "./082_record_title_validate.js";
import {
  getLocalIp,
} from "./133_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./121_transaction_lower_validate.js";
import {
  getPath,
} from "./130_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./127_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./106_column_name_validate.js";
import {
  getTimestamp,
} from "./124_timezone_validate.js";
import {
  getPrimaryKey,
} from "./118_primary_key_validate.js";
import {
  listDataTypes,
} from "./115_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./097_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./103_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
} from "./100_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./109_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./112_sort_validate.js";
import {
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./094_system_auto_correct_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  deleteViewInput,
  changeInputType,
  _fillMasterData,
  getInputType,
  updateRecordsFromView,
  createRecordFromView,
  _convertToRecord,
} from "./085_input_element_validate.js";


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
let stmt;



// CSVファイルインポート
export async function createRecordsFromCsv_core( fileName, filePath ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  if( parserStream ){
    throw `既に別の処理が動いています`;
  }
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
  // テーブル名を決める
  let fileName2 = fileName;
  if(fileName.includes(".")){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    fileName2 = fileName.substring(0, fileName.lastIndexOf("."));
  }
  let tableName = "CSV_" + fileName2;
  if( await getTableIdFromName(tableName) ){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    progressMessage = `CSVファイル「${fileName}」は既にアップロード済みです。`;
    throw `CSVファイル「${fileName}」は既にアップロード済みです。`;
  }
  //
  //==============================================================================
  // テーブルとカラムを作る
  progressMessage = `【処理中】トランザクション処理を開始しています。`;
  await startTransaction();  // 開始
  progressMessage = `【処理中】表を用意しています。`;
  const { tableId } = await createTable(tableName);
  const columnIdList = [];
  for (let i = 0; i < columnSize; i++) {
    if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    const { columnId } = await createColumn( tableId, "列"+i, "TEXT", null );
    columnIdList.push( columnId );
  }
  progressMessage = `【処理中】トランザクション処理を終了しています。のちに再開する予定です。`;
  await endTransaction();    // 終了
  //
  //
  //==============================================================================
  // データ移行の準備を行う
  progressMessage = `【処理中】ファイルストリームを準備しています。`;
  parserStream = fs.createReadStream(filePath)
    .pipe(iconv.decodeStream('Shift_JIS'));
  const sql = `
    INSERT INTO ${tableId} (
        sort_number,
        created_at,
        updated_at,
        ${columnIdList.join(", ")}
      )
      VALUES ( ?, ?, ?, ${new Array(columnSize).fill("?").join(", ")} );`;
  let sortNumber = 128 + ( csvSize * 8 );
  const timestamp = await getTimestamp();
  const createdAt = timestamp;
  const updatedAt = timestamp;
  //
  //==============================================================================
  // 1000行をまとめてデータベースへ移行する
  let isInterval = false;
  let datas = [];
  async function intervalFunc(){
    progressMessage = `【処理中】トランザクション処理を開始しています。`;
    await startTransaction();  // 開始
    if(stmt){
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      progressMessage = `【処理中】データベースに送信した命令の完了を待っています。`;
      await stmt.finalize();
    }
    progressMessage = `【処理中】SQLの命令文を準備しています。`;
    stmt = await db.prepare(sql);
    progressMessage = `【処理中】データベースに命令を送信しています。`;
    const buf = datas;
    datas = [];       // グローバル変数に代入
    //
    // データベースに挿入する処理
    for( const cells of buf ){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      const cells2 = [];
      for(const value of cells){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        cells2.push(await _convertData(value));
      }
      await stmt.run([
        sortNumber,
        createdAt,
        updatedAt,
        ...cells2,
      ]);
      sortNumber -= 8;
      successCount++;
    }
    progressMessage = `【処理中】データベースに送信した${buf.length}件の命令の完了を待っています。`;
    await stmt.finalize();
    stmt = null;
    progressMessage = `【処理中】トランザクション処理を確定させています。`;
    await endTransaction();    // 終了
    isInterval = false;
    if(parserStream){
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      progressMessage = `【処理中】CSVファイルからの読み出しを再開しています。`;
      parserStream.resume();
      progressMessage = `【処理中】CSVファイルから読み出しています。`;
    }
    else{
      if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      try{
        if( cells.length === columnSize ){
          if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
          datas.push(cells);
        }
        else{
          if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if (allCount % 1000 === 0) {
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        // 1000行に一度、実行する
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
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error("処理が中断されました");
        return;
      }
      const results = splitLastNewline( rest + text1 );
      if(results[0]){
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        oneLine( results[0] );
      }
      rest = results[1];
    }).on('end', () => {
        resolve();
    });
  });
  if( rest.length > 0 ){
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    oneLine( rest );
  }
  //==============================================================================
  await Promise.all(threads);
  if( datas.length>0 ){
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    await intervalFunc();
  }
  progressMessage = `【最終処理中】ファイルストリームを破棄しています。`;
  parserStream.destroy();
  parserStream = null;
  progressMessage = `完了しました。`;
}


const regexDate = /^((\d{1,2}\/\d{1,2}\/\d{4})|(\d{4}\/\d{1,2}\/\d{1,2})|(\d{1,2}-\d{1,2}-\d{4})|(\d{4}-\d{1,2}-\d{1,2}))( \d{1,2}:\d{1,2}(:\d{1,2})?)?$/g;


async function _convertData(inputText){
  if(inputText===""){
    return "";
  }
  else if(!isNaN(inputText)){
    return Number(inputText);
  }
  regexDate.lastIndex = 0; // lastIndexをリセット
  if( regexDate.test(inputText) ){
    const date = new Date(inputText);
    const timestamp = await getTimestamp(date);
    if( timestamp>=100000000000 && !isNaN(timestamp) ){
      return timestamp;
    }
  }
  return String( inputText ?? "" );
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
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
  return {
    "progressMessage": progressMessage,
    "successCount": successCount,
    "errorCount": errorCount,
    "csvSize": csvSize,
  }
}


// インポートを中断する関数
export async function destroyCSV_core(  ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
  setTimeout(()=>{
    errorCount = 0;
    allCount = 0;
    successCount = 0;
    csvSize = 0;
    progressMessage = "何も処理をしていません";
  },500);
  if(parserStream){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
    return "CSVのアップロード処理を中断しました。";
  }
  else{
    if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    return "現在、何も実行されていません。";
  }
}


// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
  if(parserStream){
    if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    // ストリームを中断・破棄
    parserStream.pause();
    parserStream.resume();
    parserStream.destroy();
    parserStream = null;
  }
  if(stmt){
    if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
    progressMessage = `【処理中】データベースに送信した命令の完了を待っています。`;
    await stmt.finalize();
    stmt = null;
  }
  await close();   // 下層の関数を呼び出す
  errorCount = 0;
  allCount = 0;
  successCount = 0;
  csvSize = 0;
  progressMessage = "何も処理をしていません";
}