// ページデータのやり取り
//
import {
  startUp,
  generateSQL,
  deleteView,
} from "./052_joinedTable_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./112_csv_validate.js";
import {
  getPath,
} from "./121_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./118_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./097_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./109_primary_key_validate.js";
import {
  deleteRecords,
} from "./106_delete_record_validate.js";
import {
  clearCache,
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
  listAllPages,
  listStaticChildren,
  listChildrenView,
  getParentPage,
  listChildrenPage,
  _movePage,
  _generatePageSortNumber,
  _copyPage,
  getViewInfo,
} from "./058_page_and_view_validate.js";
import {
  createColumn,
  createView,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./055_view_column_validate.js";
import {
  listDataTypes,
} from "./103_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./088_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./094_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./079_record_title_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./091_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./100_table_name_validate.js";
import {
  formatField,
} from "./085_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  deleteViewInput,
  changeInputType,
  _fillMasterData,
  getInputType,
  updateRecordsFromView,
  createRecordFromView,
  _convertToRecord,
} from "./082_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./073_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./070_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./067_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./064_generate_sql1_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// データを取得
export async function getPageData_core( pageId, queryParameters ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  const results = {};
  const views = await listChildrenView( pageId );
  for( const { viewId } of views ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const { sql, parameters } = await generateSQL( viewId, queryParameters );
    results["view" + viewId + "_"] = await runSqlReadOnly( sql, parameters );;
  }
  return results;
}