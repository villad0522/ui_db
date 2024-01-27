// 入力要素
//
import {
  startUp,
  clearCache,
  createColumn,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./073_relation_validate.js";
import {
  getLocalIp,
} from "./100_ip_address_validate.js";
import {
  getPath,
} from "./097_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./094_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./082_column_name_validate.js";
import {
  getPrimaryKey,
} from "./091_primary_key_validate.js";
import {
  listDataTypes,
} from "./088_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./079_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./076_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
} from "./085_table_name_validate.js";
import {
  formatField,
} from "./070_db_formatter_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  //
  // テーブルを作成する
  await reserveWord("input_group"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS input_group (
      input_group_id INTEGER PRIMARY KEY AUTOINCREMENT,
      view_id INTEGER NOT NULL,
      table_id TEXT NOT NULL,
      next_group_id INTEGER,
      next_column_id TEXT,
      processing_order INTEGER NOT NULL,
      UNIQUE (view_id, processing_order),
      UNIQUE (next_group_id, next_column_id),
      FOREIGN KEY (next_group_id) REFERENCES input_group(input_group_id)
    );`,
    {},
  );
  //
  await reserveWord("input_elements"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS input_elements (
      view_column_id INTEGER PRIMARY KEY,
      input_group_id INTEGER NOT NULL,
      column_id TEXT NOT NULL,
      input_type TEXT NOT NULL,
      FOREIGN KEY (input_group_id) REFERENCES input_group(input_group_id)
    );`,
    {},
  );
  await _reload();    // メモリに再読み込み
}



let cacheData1 = {
  // ビューカラムID: カラムID
  //  34: "c6",
};

//【サブ関数】メモリに再読み込み
async function _reload() {
  cacheData1 = {};
  const inputElements = await runSqlReadOnly(
    `SELECT
      view_column_id AS viewColumnId,
      column_id AS columnId
      FROM input_elements;`,
    {},
  );
  for( const { viewColumnId, columnId } of inputElements ){
    cacheData1[viewColumnId] = columnId;
  }
}



// 【サブ関数】自動入力
export async function _autoFill_core( params ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  let { viewColumnIdList, isClick, inputTexts } = params;
  //
  const results = {
    //  "vc8": "a",
    //  "vc8_autocorrection": [ "aaa", "aaaaaa" ],
  };
  //
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    results[ "vc" + viewColumnId ] = inputText;  // 結果
  }
  //
  // 絞り込み条件を生成する
  const conditions = await _getConditions_core({ viewColumnIdList, inputTexts });
  //
  // 自動入力する？
  let isAutoInput = true;
  //
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    const dataType = await getDataType( columnId );
    const inputText = inputTexts[ "vc" + viewColumnId ];
    if( dataType==="FILE" || dataType==="BOOL" || dataType==="POINTER" ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      continue; // 予測変換を生成しない
    }
    else if( dataType==="INTEGER" || dataType==="REAL" || dataType==="TEXT" ){
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      // 予測変換を生成する
      const predictions = await _listPredictions_core({
        inputText,
        tableId,
        columnId,
        conditions
      });
      results[ "vc" + viewColumnId + "_autocorrection" ] = predictions;  // 結果
    }
    else{
      throw `サポートされていないデータ型です。`;
    }
    //
    // キーボード入力 かつ 予測が２件以上 の場合、自動入力しない
    if( !isClick && predictions.length>=2 ){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      isAutoInput = false;
    }
  }
  if(isAutoInput===false){
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
      inputTextsAndAutocorrection: results,
      recordId: null,
    };
  }
  //
  const records = await _listRecords_core( tableId, conditions );
  if( records.length === 1 ){
    if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    // 合致するデータが１件ではない場合
    return {
      inputTextsAndAutocorrection: results,
      recordId: null,
    };
  }
  // 合致するデータが１件だけ存在する場合
  //
  const primaryKey = await getPrimaryKey( tableId );
  const recordId = records[0][primaryKey];
  if(!recordId){
    throw `レコードIDを取得できませんでした`;
  }
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    // 自動入力を行う
    results[ "vc" + viewColumnId ] = String(records[0][columnId]);  // 結果
  }
  return {
    inputTextsAndAutocorrection: results,
    recordId: recordId,
  };
}







// 【サブ関数】絞り込み条件を生成する
export async function _getConditions_core( params ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  let { viewColumnIdList, inputTexts } = params;
  const conditions = {};
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    const dataType = await getDataType( columnId );
    const inputText = inputTexts[ "vc" + viewColumnId ];
    if( dataType==="FILE" ){
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      continue; // 条件には含めない
    }
    else if( dataType==="INTEGER" || dataType==="REAL" || dataType==="POINTER" || dataType==="BOOL" || dataType==="TEXT" ){
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      if(!inputText && isNaN(inputText)) continue; // 空欄は条件には含めない
      const data = await formatField( inputText, columnId, false );
      if(!data) continue; // 空欄は条件には含めない
      conditions[columnId] = data;  // 条件に加える
    }
    else{
      throw `サポートされていないデータ型です。`;
    }
  }
  return conditions;
}





// 【サブ関数】予測変換を取得する
export async function _listPredictions_core( params ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
  let { inputText, tableId, columnId, conditions } = params;
  //
  const dataType = await getDataType( columnId );
  if( dataType==="FILE" ){
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    return []; // 予測変換を取得しない
  }
  else if( dataType==="BOOL" ){
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    return ["true","false"];
  }
  else if( dataType==="INTEGER" || dataType==="REAL" || dataType==="POINTER" || dataType==="TEXT" ){
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    inputText = String(inputText);
  }
  else{
    throw `サポートされていないデータ型です。`;
  }
  //
  const newConditions = structuredClone(conditions);
  delete newConditions[columnId];
  //
  // 予測変換
  return await autoCorrect( tableId, columnId, inputText, newConditions );
}



// 【サブ関数】レコードを取得
export async function _listRecords_core( tableId, conditions ){
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
  let sql = `
    SELECT * AS recordsCount
      FROM ${tableId}`;
  const whereTexts = [];
  const statements = {};
  for( const columnId in conditions ){
    if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
    whereTexts.push( `${columnId} = :${columnId}`);
    statements[`:${columnId}`] = conditions[columnId];
  }
  if(whereTexts.length>0){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `\n        WHERE ` + whereTexts.join(`\n        AND `);
  }
  sql += `
      LIMIT 10;`;
  return await runSqlReadOnly( sql, statements );
}



// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}
