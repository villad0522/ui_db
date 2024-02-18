// 管理画面上の予測変換
//
import {
  startUp,
  clearCache,
  createColumn,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./100_relation_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  listDataTypes,
} from "./118_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
} from "./103_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./115_sort_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



let cacheTableNames = {};

// テーブル名を入力させる
export async function autoCorrectTableName_core( inputText ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  // もしキャッシュデータが残っていたら、計算せずにそのデータを返す。
  if(cacheTableNames[inputText] ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    return cacheTableNames[inputText];
  }
  //
  // テーブル名を全て取得する
  const tableNames1 = await listTableNamesAll();
  //
  // 入力された文字と部分一致するテーブル名だけに絞り込む
  const tableNames2 = await autoCorrectFromArray( inputText, tableNames1 );
  //
  // 配列の長さを最大20件に制限する
  const tableNames3 = [];
  for( let i=0; (i<20)&&(i<tableNames2.length); i++){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    tableNames3[i] = tableNames2[i];
  }
  //
  // 次回の処理を高速化するために、キャッシュデータを残す
  cacheTableNames[inputText] = tableNames3;
  return tableNames3;
}

// カラム名を入力させる
export async function autoCorrectColumnName_core( inputText, tableName ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  const columns = await listColumnsAll( tableId );
  const columnNames = columns.map( ({name})=>name );
  return columnNames;
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  cacheTableNames = {};
    return await clearCache();   // 下層の関数を呼び出す
}

// テーブルを作成
export async function createTable_core( tableName ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  cacheTableNames = {};
  return await createTable( tableName );
}

// テーブル名を変更
export async function updateTableName_core( tables ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  cacheTableNames = {};
  return await updateTableName( tables );
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  cacheTableNames = {};
  return await deleteTable( tableId );
}

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  cacheTableNames = {};
  return await createColumn( tableId, columnName, dataType, parentTableId );
}

// カラム名を変更
export async function updateColumnName_core( columns ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
  cacheTableNames = {};
  return await updateColumnName( columns );
}
