// SQL生成(重複無し)
//
import {
  startUp,
} from "./006_sort_test.js";
import {
  getLocalIp,
} from "./028_ip_address_test.js";
import {
  getPath,
} from "./026_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./024_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./014_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./018_search_text_test.js";
import {
  getPrimaryKey,
} from "./022_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./008_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./020_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./012_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./016_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./010_record_title_test.js";

// SQLクエリを生成
export async function generateSQLwithoutDuplication_core( tableId, countTableIdList ){
  throw "この関数は未実装です。";
}
