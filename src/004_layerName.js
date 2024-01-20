// 新しいレイヤー
//
import {
  startUp,
} from "./024_sort_validate.js";
import {
  getLocalIp,
} from "./057_ip_address_validate.js";
import {
  getPath,
} from "./054_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./051_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./039_column_name_validate.js";
import {
  getPrimaryKey,
} from "./048_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./030_relation_validate.js";
import {
  listDataTypes,
} from "./045_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
  generateSQL,
} from "./006_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./036_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./027_search_text_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./033_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./042_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./021_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./018_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./015_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./012_generate_sql1_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}

