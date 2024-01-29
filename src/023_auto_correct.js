// 予測変換
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
} from "./037_regenerate_html_validate.js";
import {
  getLocalIp,
} from "./109_ip_address_validate.js";
import {
  getPath,
} from "./106_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./103_connect_database_validate.js";
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
  getPrimaryKey,
} from "./100_primary_key_validate.js";
import {
  clearCache,
  listEndpoints,
} from "./034_api_info_validate.js";
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
  getEndpointInfo,
  runApi,
} from "./025_convert_array_validate.js";
import {
  convertQuery,
} from "./031_run_api_validate.js";


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
    //
    // エンドポイントの情報を取得する
    const endpointInfo = await getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData );
    //
    // APIのメイン処理を実行する
    let response = await runApi( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData );
    //
    if (isResponseFormData) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスデータに、予測変換のデータを付け加える
        response = _convertResponseData({ endpointPath, endpointInfo, response });
    }
    //
    return response;
}

//【サブ関数】レスポンスデータを、配列からFormDataに変換する関数
function _convertResponseData({ endpointPath, endpointInfo, response }) {
    // response を response2 に変換する
    const response2 = {};
    for (const parentKey in endpointInfo.response) {
        const parentInfo = endpointInfo.response[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        const parentValue = response[parentKey];
        //
        if( !parentKey.endsWith("_option") ){
            // 予測変換ではない場合
            response2[parentKey] = parentValue;
            continue;
        }
        // 予測変換の場合
        if (!parentValue) {
            throw `空のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (!Array.isArray(parentValue)) {
            throw `想定外のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        for (let i = 0; i < parentValue.length; i++) {
            const childValue = parentValue[i];
            const newKey = parentKey.replace( "_option","_option"+i );
            response2[newKey] = childValue;
        }
    }
    return response2;
}


// エンドポイントの情報を取得
export async function getEndpointInfo_core( endpointPath, isRequestFormData, isResponseFormData ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    const endpointInfo1 = await getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData );
    const endpointInfo2 = structuredClone(endpointInfo1);
    if (isResponseFormData) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスデータをFormDataの形式に変換する必要がある場合
        endpointInfo2.response = _convertResponseInfo({
            endpointPath: endpointPath,
            oldResponseInfo: endpointInfo1.response,
        })
    }
    return endpointInfo2;
}

function _convertResponseInfo({ endpointPath, oldResponseInfo }) {
    const newResponseInfo = {};
    for (const parentKey in oldResponseInfo) {
        const parentInfo = oldResponseInfo[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if( !parentKey.endsWith("_option") ){
            // 予測変換ではない場合
            newResponseInfo[parentKey] = parentInfo;
            continue;
        }
        // 予測変換の場合
        for (let i = 0; i < 10; i++) {
            const newKey = parentKey.replace( "_option", "_option"+i );
            newResponseInfo[newKey] = parentInfo;
        }
    }
    return newResponseInfo;
}
