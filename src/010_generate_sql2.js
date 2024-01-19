// SQL生成(重複無し)
//
import {
  startUp,
} from "./018_sort_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  getPath,
} from "./048_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./030_column_name_validate.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./036_search_text_validate.js";
import {
  getPrimaryKey,
} from "./042_layerName_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./021_relation_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./039_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./027_reserved_word_validate.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./033_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./024_record_title_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./015_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./012_convert_sql_data_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


// SQLクエリを生成
export async function generateSQLwithoutDuplication_core( tableId, selectData, joinData, whereData, orderData ){
  throw "この関数は未実装です。";
}