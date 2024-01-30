// API処理
//
import {
  startUp,
  deleteView,
  createPage,
  updatePageName,
  createView,
  deletePage,
  pastePage,
  regeneratePage,
  escapeHTML,
} from "./034_regenerate_html_validate.js";
import {
  getLocalIp,
} from "./115_ip_address_validate.js";
import {
  getPath,
} from "./112_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./109_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./091_column_name_validate.js";
import {
  close,
  createDirectories,
} from "./040_frontend_files_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./106_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./103_csv_validate.js";
import {
  getPrimaryKey,
} from "./100_primary_key_validate.js";
import {
  clearCache,
  getEndpointInfo,
  listEndpoints,
} from "./031_api_info_validate.js";
import {
  createColumn,
  generateSQL,
  addViewColumn,
} from "./046_view_validate.js";
import {
  listDataTypes,
} from "./097_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./070_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./088_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./073_record_title_2_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./082_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./085_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
import {
  formatField,
} from "./079_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  changeInputType,
  _fillMasterData,
} from "./076_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./064_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./061_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./058_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./055_generate_sql1_validate.js";
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
} from "./049_pages_validate.js";
import {
  getPageData,
} from "./043_page_data_validate.js";
import {
  generateViewHTML,
} from "./037_regenerate_view_html_validate.js";


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
    case "GET_CSV_PROGRESS":{
      if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
      return await getCsvProgress();
    }
    //======================================================================
    case "DESTROY_CSV_PROGRESS":{
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      return {
        "userMessage": await destroyCSV(),
      };
    }
    //======================================================================
    case "CLEAR_CACHE":{
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      await clearCache();
      return {
        "userMessage": "キャッシュデータを削除しました。"
      };
    }
    //======================================================================
    case "LIST_TABLES":{
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
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
    case "LIST_COLUMNS":{
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      const { columns, total } = await listColumnsForGUI(
        queryParameters["table"],
        queryParameters["page_columns"],
        35,
        false, //isTrash
      );
      return {
        "columns": columns,
        "columns_total": total,
      };
    }
    //======================================================================
    case "CREATE_TABLE":{
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      const { tableId, message } = await createTable( requestBody["tableName"] );
      return {
        "tableId": tableId,
        "userMessage": message,
        "nextUrl": "../",
      };
    }
    //======================================================================
    case "CREATE_PRIMITIVE_COLUMN":{
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      const { columnId, message } = await createColumn(
        queryParameters["table"],
        requestBody["columnName"],
        requestBody["dataType"],
        null
      );
      return {
        "columnId": columnId,
        "userMessage": message,
        "nextUrl": `../?table=${queryParameters["table"]}`,
      };
    }
    //======================================================================
    case "CREATE_POINTER_COLUMN":{
      if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
      const { columnId, message } = await createColumn(
        queryParameters["table"],
        requestBody["columnName"],
        "POINTER",
        requestBody["parentTableId"]
      );
      return {
        "columnId": columnId,
        "userMessage": message,
        "nextUrl": `../?table=${queryParameters["table"]}`,
      };
    }
    //======================================================================
    case "UPDATE_TABLE_NAME":{
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      const message = await updateColumnName(
        requestBody["columns"],
      );
      return {
        "userMessage": message,
        "nextUrl": `../?table=${queryParameters["table"]}`,
      };
    }
    //======================================================================
    case "REGENERATE_PAGE":{
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      await regeneratePage( pageId );
      return {
        "nextUrl": `/custom/${pageId}/index.html?` + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "CREATE_PAGE":{
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      const parentId = Number(queryParameters["page_id"]);
      await createPage( parentId );
      return {
        "nextUrl": "./?" + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "RENAME_PAGE":{
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      await copyPage( pageId );
      return {};
    }
    //======================================================================
    case "CUT_PAGE":{
      if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
      const pageId = Number(queryParameters["page_id"]);
      await cutPage( pageId );
      return {};
    }
    //======================================================================
    case "PASTE_PAGE":{
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      const parentPageId = Number(queryParameters["page_id"]);
      const afterPageId = Number(queryParameters["after_id"]);
      await pastePage( parentPageId, afterPageId );
      return {
        "nextUrl": "./?" + await convertQuery_core(queryParameters),
      };
    }
    //======================================================================
    case "GET_PAGE_INFO":{
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
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
    case "AUTO_FILL":{
      if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
      const viewId = Number(queryParameters["view_id"]);
      const isClick = queryParameters["is_click"] ? true : false;
      return await autoFill(
        viewId,
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
      if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}
