// フロントエンドファイル
//
import {
  startUp,
} from "./058_sort_validate.js";
import {
  getLocalIp,
} from "./091_ip_address_validate.js";
import {
  getPath,
} from "./088_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./085_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./073_column_name_validate.js";
import {
  getPrimaryKey,
} from "./082_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./064_relation_validate.js";
import {
  listDataTypes,
} from "./079_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./040_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./070_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./061_search_text_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./067_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./076_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./055_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./052_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./049_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./046_generate_sql1_validate.js";
import {
  generateSQL,
} from "./043_generate_sql_validate.js";


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
