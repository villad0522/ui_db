// ページデータのやり取り
//
import {
  startUp,
  deleteTable,
  _getConditions,
  generateSQL,
  deleteView,
  getExtractionsAsJP,
  autoCorrectConditionalValue,
  deleteCondition,
  addCondition,
} from "./061_extract_and_sort_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./085_csv_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./133_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./112_column_name_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  createView,
  deletePage,
  updateView,
  _createViewColumnOuter,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  getViewColumnFromColumn,
  getViewColumnName,
  getViewColumnFromName,
  _autoCorrectColumnsToParents,
  _autoCorrectColumnsToChildren,
  getViewColumnInfo,
  addColumnPath,
  autoCorrectColumnPath,
  createViewColumn,
} from "./064_view_column_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  listChildrenColumnId,
} from "./103_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
  scanKeywords,
  getScanKeywordsProgress,
  stopScanKeywords,
} from "./106_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./115_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./118_sort_validate.js";
import {
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  getParentValue,
  _getRecordOffset,
} from "./088_record_title_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
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
} from "./091_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./082_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./079_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./076_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./073_generate_sql1_validate.js";
import {
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
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
  isExistView,
} from "./067_page_and_view_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// データを取得(GUI向け)
export async function getPageDataForGUI_core( pageId, queryParameters ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  let results = {};
  const views = await listChildrenView( pageId );
  const viewColumnNames = {};
  for( const { viewId } of views ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const { normalSQL, countSQL, normalParameters, countParameters } = await generateSQL( viewId, queryParameters, false );
    //
    const [{ "total": total }] = await runSqlReadOnly( countSQL, countParameters );
    if( isNaN(total) ){
      throw "件数を取得できません";
    }
    const extractions = await getExtractionsAsJP( viewId, queryParameters );
    const viewColumns = await listViewColumns(viewId);
    viewColumnNames[viewId] = viewColumns.map( ({viewColumnName})=>viewColumnName);
    //
    results = {
      ...await autoFill( viewId, {}, false ),
      ...results,
      [`extraction${viewId}_`]: extractions,
      [`extraction${viewId}__total`]: extractions.length,
      ["view" + viewId + "_"]: await runSqlReadOnly( normalSQL, normalParameters ),
      ["view" + viewId + "__total"]: total,
    };
  }
  return {
    ...results,
    "views": views.map( ({ viewId }) => ({
      "viewId": viewId,
      "newExtractionTarget_option": viewColumnNames[viewId],
    }) ),
    "views_total": views.length,
  };
}




// データを取得(Excel向け)
export async function getPageDataForExcel_core( nowPageId, excelPageId, queryParameters ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  return await _getDataList_core( nowPageId, excelPageId, queryParameters, 0 );
}




// 【サブ】Excel向けのデータを取得1
export async function _getDataList_core( nowPageId, excelPageId, queryParameters, nestLevel ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  if(nestLevel>6){
    if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    return [];
  }
  if( nowPageId === excelPageId ){
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    const sheetDatas = await _getSheetDatas_core( excelPageId, queryParameters );
    return [ sheetDatas ];
  }
  //
  const views = await listChildrenView( pageId );
  for( const { viewId, tableId, childPageId } of views ){
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const { normalSQL, countSQL, normalParameters } = await generateSQL( viewId, queryParameters, true );
    const records = await runSqlReadOnly( normalSQL, normalParameters );
    //
    let dataList = [];
    for( const {id} of records ){
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      const newQueryParameters = {
        ...queryParameters,
        [`p${nowPageId}${tableId}`]: id,
      };
      // 再帰呼び出し
      const newDataList = await _getDataList_core( childPageId, excelPageId, newQueryParameters, nestLevel+1 );
      dataList = dataList.concat(newDataList);
      if(dataList.length>1000){
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        return dataList;
      }
    }
  }
  return dataList;
}




// 【サブ】Excel向けのデータを取得2
export async function _getSheetDatas_core( pageId, queryParameters ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
  const sheetDatas = {};
  const views = await listChildrenView( pageId );
  for( const { viewId } of views ){
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    const { normalSQL, countSQL, normalParameters } = await generateSQL( viewId, queryParameters, true );
    sheetDatas[viewId] = await runSqlReadOnly( normalSQL, normalParameters );
  }
  return sheetDatas;
}
