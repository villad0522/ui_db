// レコードの見出し(上)
//
import {
  startUp,
} from "./027_sort_validate.js";
import {
  getLocalIp,
} from "./060_ip_address_validate.js";
import {
  getPath,
} from "./057_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./054_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./042_column_name_validate.js";
import {
  getPrimaryKey,
} from "./051_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./033_relation_validate.js";
import {
  listDataTypes,
} from "./048_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./030_search_text_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./039_reserved_word_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./036_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./045_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./024_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./021_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./018_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./015_generate_sql1_validate.js";
import {
  generateSQL,
} from "./012_generate_sql_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// レコードを作成
export async function createRecord_core( tableId, recordData ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}


// レコードを上書き
export async function updateRecord_core( tableId, records ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// フィールドを検証
export async function checkField_core( columnId, value ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// レコードを検証
export async function checkRecord_core( tableId, recordData ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// SQLクエリを生成
export async function generateSQL_core( tableId, displayColumns, conditions, sortOrder ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}



// 予測変換
export async function autoCorrect_core( tableId, columnId, inputText, conditions ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}
