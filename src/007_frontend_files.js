// フロントエンドファイル
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
  checkField,
  checkRecord,
  autoCorrect,
  generateSQL,
} from "./009_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./039_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./030_search_text_validate.js";
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


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import fs from 'fs';


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug ); // 下層の関数を呼び出す
  //
  const customDirPath = await getPath("FRONTEND_CUSTOM");
  //
  // フォルダ「./src/frontend/custom」を削除する
  await fs.promises.rm(customDirPath, { recursive: true });
  //
  // フォルダ「./src/frontend/custom」を作成する
  if (!fs.existsSync(customDirPath)) {
      if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
      fs.mkdirSync(customDirPath);   // フォルダが存在しなかったら、作成する
  }
}

// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  const customDirPath = await getPath("FRONTEND_CUSTOM");
  //
  // フォルダ「./src/frontend/custom」を削除する
  await fs.promises.rm(customDirPath, { recursive: true, force: true });
  //
  await close(); // 下層の関数を呼び出す
}
