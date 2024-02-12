// API処理
//
import {
  startUp,
  deleteTable,
  createPage,
  updatePageName,
  createView,
  deleteView,
  deletePage,
  pastePage,
  regeneratePage,
} from "./037_regenerate_page_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./049_frontend_files_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./121_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./103_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
import {
  clearCache,
  getEndpointInfo,
  listEndpoints,
} from "./031_get_api_info_validate.js";
import {
  createColumn,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./058_view_column_validate.js";
import {
  listDataTypes,
} from "./112_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./094_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./100_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./106_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./109_sort_validate.js";
import {
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  _getParentValue,
  _getRecordOffset,
} from "./082_record_title_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
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
} from "./085_input_element_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./079_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./076_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./073_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./070_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./067_generate_sql1_validate.js";
import {
  generateSQL,
} from "./055_joinedTable_validate.js";
import {
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  getBreadcrumbs,
  cutPage,
  copyPage,
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
} from "./061_page_and_view_validate.js";
import {
  getPageData,
} from "./052_page_data_validate.js";
import {
  generateViewHTML,
} from "./046_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./043_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
} from "./040_regenerate_api_info_validate.js";
import {
  transferData,
  masterFaculty,
  masterLab,
  masterUser,
  masterSpecies,
  masterPhylogeny,
  masterCompany,
  masterOrigin,
  masterProductType,
  masterItem,
  masterPayment,
  masterRoom,
  masterPrice,
  masterAction,
  masterSex,
  buyData,
  broodbookData,
  historyData,
  increaseAndDecreaseData,
  numberOfAnimalData,
  budgetData,
  billData,
  _clearTable,
  _checkSourceTable,
} from "./034_data_transfer_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// APIを実行する関数
export async function runApi_core( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  const apiInfo = await getEndpointInfo( endpointPath );
  switch(apiInfo.commandName){
    //======================================================================
    case "START_UP":{
      if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
      await startUp( null, false );
      return {
        "userMessage": "再接続しました。"
      };
    }
    //======================================================================
    case "SET_TITLE_COLUMNS":{
      if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
      await setTitleColumnsFromUI( requestBody.columns );
      return {
        "nextUrl": `./?` + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "DELETE_TABLE":{
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      return {
        "userMessage": await deleteTable( queryParameters.table ),
        "nextUrl": `/default/tables/index.html`,
      };
    }
    //======================================================================
    case "TRANSFER_DATA":{
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      return {
        "userMessage": await transferData( requestBody.processName ),
        "nextUrl": `/default/tables/index.html`,
      };
    }
    //======================================================================
    case "GET_CSV_PROGRESS":{
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      return await getCsvProgress();
    }
    //======================================================================
    case "DESTROY_CSV_PROGRESS":{
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      return {
        "userMessage": await destroyCSV(),
      };
    }
    //======================================================================
    case "CLEAR_CACHE":{
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      await clearCache();
      return {
        "userMessage": "キャッシュデータを削除しました。"
      };
    }
    //======================================================================
    case "LIST_TABLES":{
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      const { tables, total } = await listTables(
        queryParameters["page_tables"],
        35,
        false, //isTrash
      );
      return {
        "tables": tables,
        "tables_total": total,
      };
    }
    //======================================================================
    case "CREATE_RECORD":{
      if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
      const tableId = queryParameters["table"];
      const columns = requestBody["columns"];
      const { recordId, userMessage } = await createRecordFromUI( tableId, columns );
      return {
        "recordId": recordId,
        "userMessage": userMessage,
        "nextUrl": `/default/records/index.html?table=${tableId}&record=${recordId}`,
      };
    }
    //======================================================================
    case "LIST_RECORDS":{
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      const focusRecordId = queryParameters["record"];
      const pasteRecordId = queryParameters["paste"];
      const oldPageNumber = queryParameters["page_records"];
      const onePageMaxSize = apiInfo?.response?.records?.onePageMaxSize;
      const tableId = queryParameters["table"];
      const { columns, records, recordsTotal, pageNumber, recordOffset } = await listRecords( tableId, oldPageNumber, onePageMaxSize, focusRecordId, pasteRecordId );
      // 親テーブルを選ぶときのセレクトボックスを構築する
      const { tables, total:tablesTotal } = await listTables(
        1,
        1000,
        false, //isTrash
      );
      return {
        "tableName": await getTableName(tableId),
        "columns": columns,
        "columns_total": columns.length,
        "tables": tables,
        "tables_total": tablesTotal,
        "recordOffset": recordOffset,
        "records": records,
        "records_total": recordsTotal,
        "page_records": pageNumber,
      };
    }
    //======================================================================
    case "COPY_RECORD":{
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageNumber = queryParameters["page_records"];
      const tableId = queryParameters["table"];
      const recordId = queryParameters["record_id"];
      await copyRecord( tableId, recordId );
      return {
        "nextUrl": `/default/records/index.html?table=${tableId}&page_records=${pageNumber ?? 1}`,
      };
    }
    //======================================================================
    case "CUT_RECORD":{
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageNumber = queryParameters["page_records"];
      const tableId = queryParameters["table"];
      const recordId = queryParameters["record_id"];
      await cutRecord( tableId, recordId );
      return {
        "nextUrl": `/default/records/index.html?table=${tableId}&page_records=${pageNumber ?? 1}`,
      };
    }
    //======================================================================
    case "PASTE_RECORD":{
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      const tableId = queryParameters["table"];
      const pageNumber = queryParameters["page_records"];
      const beforeRecordId = queryParameters["before_id"];
      const afterRecordId = queryParameters["after_id"];
      const recordId = await pasteRecord( tableId, beforeRecordId, afterRecordId );
      return {
        "nextUrl": `./?table=${tableId}&paste=${recordId}&page_records=${pageNumber ?? 1}`,
      };
    }
    //======================================================================
    case "CREATE_TABLE":{
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      const { tableId, message } = await createTable( requestBody["tableName"] );
      return {
        "tableId": tableId,
        "userMessage": message,
        "nextUrl": "../",
      };
    }
    //======================================================================
    case "CREATE_COLUMN":{
      if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
      const columnType = requestBody["columnType"];
      const tables = requestBody["tables"];
      let dataType = "";
      let parentTableId = null;
      if( isNaN(columnType) ){
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
        dataType = columnType;
        parentTableId = null;
      }
      else{
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
        dataType = "POINTER";
        parentTableId = tables[Number(columnType)]?.id;
      }
      const { columnId, message } = await createColumn(
        queryParameters["table"],
        requestBody["columnName"],
        dataType,
        parentTableId
      );
      const result = {
        "columnId": columnId,
        "userMessage": message,
        "nextUrl": `./?table=${queryParameters["table"]}`,
      };
      return result;
    }
    //======================================================================
    case "UPDATE_TABLE_NAME":{
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      const message = await updateTableName(
        requestBody["tables"],
      );
      return {
        "userMessage": message,
        "nextUrl": "../",
      };
    }
    //======================================================================
    case "UPDATE_COLUMN_NAME":{
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
      const message = await updateColumnName(
        requestBody["columns"],
      );
      return {
        "userMessage": message,
        "nextUrl": `../?table=${queryParameters["table"]??""}`,
      };
    }
    //======================================================================
    case "REGENERATE_PAGE":{
      if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      await regeneratePage( pageId );
      return {
        "nextUrl": `/custom/${pageId}/index.html?` + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "CREATE_PAGE":{
      if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
      const parentId = Number(queryParameters["page_id"]);
      await createPage( parentId );
      return {
        "nextUrl": "./?" + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "RENAME_PAGE":{
      if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      const pageName = requestBody["pageName"];
      const memo = requestBody["memo"] ?? "";
      await updatePageName( pageId, pageName, memo );
      return {
        "nextUrl": `/custom/${pageId}/index.html?` + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "DELETE_PAGE":{
      if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      const newQueryParameters = {
        ...queryParameters,
        "page_id": await getParentPage(pageId),
      };
      await deletePage( pageId );
      return {
        "nextUrl": `/default/page_editor/index.html?` + await convertQuery_core(newQueryParameters),
      };
    }
    //======================================================================
    case "COPY_PAGE":{
      if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      await copyPage( pageId );
      return {};
    }
    //======================================================================
    case "CUT_PAGE":{
      if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      await cutPage( pageId );
      return {};
    }
    //======================================================================
    case "PASTE_PAGE":{
      if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
      const parentPageId = Number(queryParameters["page_id"]);
      const afterPageId = Number(queryParameters["after_id"]);
      await pastePage( parentPageId, afterPageId );
      return {
        "nextUrl": "./?" + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "GET_PAGE_INFO":{
      if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      const { pageName, memo } = await getPageInfo( pageId );
      const staticChildren = await listStaticChildren( pageId );
      const views = await listChildrenView( pageId );
      const breadcrumbs = await getBreadcrumbs( pageId );
      return {
        "pageName": pageName,
        "memo": memo ?? "",
        "breadcrumbs": breadcrumbs,
        "breadcrumbs_total": breadcrumbs.length,
        "staticChildren": staticChildren,
        "staticChildren_total": staticChildren.length,
        "tableName_option": await listTableNamesAll(),
        "views": views,
        "views_total": views.length,
        "copyingPageId": await getCopyingPage(),
        "cuttingPageId": await getCuttingPage()
      };
    }
    //======================================================================
    case "CREATE_RECORD_FROM_VIEW":{
      if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
      const result = await createRecordFromView( apiInfo.viewId, requestBody );
      let nextUrl = null;
      if(result.isSuccess){
        if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
        nextUrl = "./?" + await convertQuery_core(queryParameters);
      }
      return {
        ...result.outputTexts,
        "isSuccess": result.isSuccess,
        "recordId": result.recordId,
        "userMessage": result.userMessage,
        "nextUrl": nextUrl,
      };
    }
    //======================================================================
    case "UPDATE_RECORDS":{
      if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
      const viewId = Number(apiInfo.viewId);
      const result = await updateRecordsFromView( viewId, requestBody["view" + viewId + "_"] );
      let nextUrl = null;
      if(result.isSuccess){
        if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
        nextUrl = "./?" + await convertQuery_core(queryParameters);
      }
      return {
        ["view" + viewId + "_"]: result.outputTexts,
        ["view" + viewId + "__total"]: result.outputTexts.length,
        "isSuccess": result.isSuccess,
        "userMessage": result.userMessage,
        "nextUrl": nextUrl,
      };
    }
    //======================================================================
    case "DELETE_RECORD":{
      if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
      const tableId = apiInfo.tableId ?? queryParameters["table"];
      const recordId = Number(queryParameters["record_id"]);
      return {
        "userMessage": await deleteRecords( tableId, [ recordId ] ),
        "nextUrl": "./?" + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "GET_PAGE_DATA":{
      if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
      return await getPageData( apiInfo.pageId, queryParameters );
    }
    //======================================================================
    case "AUTO_CORRECT":{
      if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
      const isClick = queryParameters["is_click"] ? true : false;
      return await autoFill(
        apiInfo.viewId,
        {
          //  入力例
          //  "vc9": "田",
          //  "vc10": 3,
          ...requestBody,
        },
        isClick
      );
    }
    //======================================================================
    case "CREATE_VIEW":{
      if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      const tableName = requestBody["tableName"];
      await  createView( pageId, tableName );
      return {
        "nextUrl": "./?" + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    default:
      throw `サポートされていないAPIコマンドです。\ncommandName = ${apiInfo.commandName}`;
  }
}



// 連想配列をクエリパラメータに変換
export async function convertQuery_core( obj ){
  if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}
