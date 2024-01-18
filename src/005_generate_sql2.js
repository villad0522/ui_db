// SQL生成(重複無し)
//
import {
  startUp,
} from "./010_sort_test.js";
import {
  getLocalIp,
} from "./032_ip_address_test.js";
import {
  getPath,
} from "./030_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./028_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./018_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./022_search_text_test.js";
import {
  getPrimaryKey,
} from "./026_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./012_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./024_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./016_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./020_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./014_record_title_test.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./008_columnPath_test.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./006_convert_sql_data_test.js";

// SQLクエリを生成
export async function generateSQLwithoutDuplication_core( tableId, countTableIdList ){
  throw "この関数は未実装です。";
}
