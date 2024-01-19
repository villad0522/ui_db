// メイン
//
import {
  startUp,
} from "./012_sort_test.js";
import {
  getLocalIp,
} from "./034_ip_address_test.js";
import {
  getPath,
} from "./032_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./030_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./020_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./024_search_text_test.js";
import {
  getPrimaryKey,
} from "./028_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./014_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./026_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./018_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./022_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./016_record_title_test.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./010_columnPath_test.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./008_convert_sql_data_test.js";
import {
  generateSQLwithoutDuplication,
} from "./006_generate_sql2_test.js";
import {
  generateSQLwithDuplication,
} from "./004_generate_sql1_test.js";
import {
  generateSQL,
} from "./002_generate_sql_test.js";

// メイン関数
export async function main_core() {
  try {
  }
  catch (err) {
    console.error(err);
  }
  console.log("\n\nテストが終了しました\n");
}

main_core();
