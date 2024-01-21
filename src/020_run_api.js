// API処理
//
import {
  startUp,
  createPage,
  updatePageName,
  getPageInfo,
} from "./025_pages_validate.js";
import {
  getLocalIp,
} from "./082_ip_address_validate.js";
import {
  getPath,
} from "./079_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
} from "./076_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./064_column_name_validate.js";
import {
  close,
} from "./028_frontend_files_validate.js";
import {
  getPrimaryKey,
} from "./073_primary_key_validate.js";
import {
  clearCache,
  getEndpointInfo,
  listEndpoints,
} from "./022_api_info_validate.js";
import {
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./055_relation_validate.js";
import {
  listDataTypes,
} from "./070_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
  generateSQL,
} from "./031_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./061_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./052_search_text_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./058_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./067_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./046_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./043_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./040_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./037_generate_sql1_validate.js";


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
    case "CLEAR_CACHE":{
      if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
      await clearCache();
      return {
        "userMessage": "キャッシュデータを削除しました。"
      };
    }
    //======================================================================
    case "LIST_TABLES":{
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      const { tableId, message } = await createTable( requestBody["tableName"] );
      return {
        "tableId": tableId,
        "userMessage": message,
        "nextUrl": "../",
      };
    }
    //======================================================================
    case "CREATE_PRIMITIVE_COLUMN":{
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
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
      if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
      const message = await updateColumnName(
        requestBody["columns"],
      );
      return {
        "userMessage": message,
        "nextUrl": `../?table=${queryParameters["table"]}`,
      };
    }
    //======================================================================
    default:
      throw `サポートされていないAPIコマンドです。\ncommandName = ${apiInfo.commandName}`;
  }
}
