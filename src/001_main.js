// メイン
//
import {
  startUp,
  test012,
} from "./012_sort_test.js";
import {
  getLocalIp,
  test034,
} from "./034_ip_address_test.js";
import {
  getPath,
  test032,
} from "./032_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
  test030,
} from "./030_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  test020,
} from "./020_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
  test024,
} from "./024_search_text_test.js";
import {
  getPrimaryKey,
  test028,
} from "./028_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  test014,
} from "./014_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  test026,
} from "./026_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  test018,
} from "./018_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
  test022,
} from "./022_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  test016,
} from "./016_record_title_test.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
  test010,
} from "./010_columnPath_test.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
  test008,
} from "./008_convert_sql_data_test.js";
import {
  generateSQLwithoutDuplication,
  test006,
} from "./006_generate_sql2_test.js";
import {
  generateSQLwithDuplication,
  test004,
} from "./004_generate_sql1_test.js";
import {
  generateSQL,
  test002,
} from "./002_generate_sql_test.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// メイン関数
export async function main_core(  ){
  try {
  }
  catch (err) {
    console.error(err);
  }
  console.log("\n\nテストが終了しました\n");
}

main_core();
