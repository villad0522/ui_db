// 配列変換
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
  delete_table,
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
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
} from "./034_data_transfer_validate.js";
import {
  getEndpointInfo,
  runApi,
} from "./025_pagination_validate.js";
import {
  convertQuery,
} from "./028_run_api_validate.js";


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
    let requestBody2 = structuredClone(requestBody);
    if (isRequestFormData) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // リクエストボディを、FormDataから配列に変換する
        requestBody2 = _convertRequestBody({ endpointPath, endpointInfo, requestBody });
    }
    //
    // APIのメイン処理を実行する
    let response = await runApi( httpMethod, endpointPath, queryParameters, requestBody2, isRequestFormData, isResponseFormData );
    //
    if (isResponseFormData) {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスデータを、配列からFormDataに変換する
        response = _convertResponseData({ endpointPath, endpointInfo, response });
    }
    //
    return response;
}



//【サブ関数】リクエストボディを、FormDataから配列に変換する関数
function _convertRequestBody({ endpointPath, endpointInfo, requestBody }) {
    // requestBody を requestBody2 に変換する
    const requestBody2 = {};
    for (const parentKey in endpointInfo.requestBody) {
        const parentInfo = endpointInfo.requestBody[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            requestBody2[parentKey] = requestBody[parentKey];
            continue;
        }
        // 配列の場合
        if (!parentInfo.children || typeof parentInfo.children !== 'object') {
            throw `リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        requestBody2[parentKey] = [];
        let noHitCount = 0;
        for (let i = 0; noHitCount < 100; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            if (!requestBody[flagKey]) {
                noHitCount++;
                continue;
            }
            noHitCount = 0;
            requestBody2[parentKey][i] = {};
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                requestBody2[parentKey][i][childKey] = requestBody[newKey];
            }
        }
    }
    return requestBody2;
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
        //
        const parentValue = response[parentKey];
        //
        if( parentKey.endsWith("_option") ){
            // 予測変換の候補の場合
            response2[parentKey] = parentValue;
            continue;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            response2[parentKey] = parentValue;
            continue;
        }
        // 配列の場合
        if (!parentValue) {
            throw `空のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (!Array.isArray(parentValue)) {
            throw `想定外のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (!Number.isInteger(parentInfo.onePageMaxSize)) {
            throw `１ページあたりの最大表示件数が未定義です。endpointPath="${endpointPath}", key="${parentKey}.onePageMaxSize"`;
        }
        if (parentInfo.onePageMaxSize < parentValue.length) {
            throw `配列がサイズオーバーです。endpointPath=${endpointPath} key=${parentKey} 現在の長さ=${parentValue.length} 上限=${rule.onePageMaxSize}`;
        }
        if (!parentInfo.children || typeof parentInfo.children !== 'object') {
            throw `レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        for (let i = 0; i < parentValue.length; i++) {
            if (typeof parentValue[i] !== 'object') {
                // 配列の要素がオブジェクトではない場合
                throw `想定外のレスポンスデータを返そうとしました。配列の要素はオブジェクトにしてください。endpointPath=${endpointPath} key=${parentKey}`;
            }
            const flagKey = String(parentKey) + String(i) + "_flag";
            response2[flagKey] = true;
            for (const childKey in parentInfo.children) {
                if (childKey === "flag") {
                    throw `レスポンスデータのKeyには、文字列「flag」を使用できません。endpointPath=${endpointPath} key=${parentKey}`;
                }
                const childValue = parentValue[i][childKey];
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                if( childKey.endsWith("_option") ){
                    // 予測変換の候補の場合
                    response2[newKey] = childValue;
                    continue;
                }
                response2[newKey] = childValue;
            }
        }
        for (let i = parentValue.length; i < parentInfo.onePageMaxSize; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            response2[flagKey] = false;
            if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                throw `レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
            }
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                const childInfo = parentInfo.children[childKey];
                if (!childInfo || typeof childInfo !== 'object') {
                    throw `レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                }
                if( childKey.endsWith("_option") ){
                    // 予測変換の候補の場合
                    response2[newKey] = [];
                    continue;
                }
                switch (childInfo.dataType) {
                    case "INTEGER":
                        response2[newKey] = 0;
                        break;
                    case "REAL":
                        response2[newKey] = 0;
                        break;
                    case "TEXT":
                        response2[newKey] = "";
                        break;
                    case "BOOL":
                        response2[newKey] = false;
                        break;
                    default:
                        throw `API通信で使用できないデータ型です。detaType=${childInfo.dataType}, endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                }
            }
        }
    }
    for (const parentKey in response) {
        const rule = endpointInfo.response[parentKey];
        if (!rule) {
            // もしレスポンスの規格が未定義だったら
            throw `未定義のレスポンスデータを返そうとしました。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
    }
    return response2;
}



// エンドポイントの情報を取得
export async function getEndpointInfo_core( endpointPath, isRequestFormData, isResponseFormData ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    const endpointInfo1 = await getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData );
    const endpointInfo2 = structuredClone(endpointInfo1);
    if (isRequestFormData) {
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        // リクエストデータをFormDataの形式から変換する必要がある場合
        endpointInfo2.requestBody = _convertRequestInfo({
            endpointPath: endpointPath,
            oldRequestInfo: endpointInfo1.requestBody,
        })
    }
    if (isResponseFormData) {
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスデータをFormDataの形式に変換する必要がある場合
        endpointInfo2.response = _convertResponseInfo({
            endpointPath: endpointPath,
            oldResponseInfo: endpointInfo1.response,
        })
    }
    return endpointInfo2;
}



function _convertRequestInfo({ endpointPath, oldRequestInfo }) {
    const newRequestInfo = {};
    for (const parentKey in oldRequestInfo) {
        const parentInfo = oldRequestInfo[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `リクエストの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            newRequestInfo[parentKey] = parentInfo;
            continue;
        }
        if (!Number.isInteger(parentInfo.onePageMaxSize)) {
            throw `１ページあたりの最大表示件数が未定義です。endpointPath="${endpointPath}", key="${parentKey}.onePageMaxSize"`;
        }
        if (!parentInfo.title) {
            throw `配列のタイトル（日本語）が未定義です。endpointPath="${endpointPath}", key="${parentKey}.title"`;
        }
        // 配列の場合
        for (let i = 0; i < parentInfo.onePageMaxSize; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            newRequestInfo[flagKey] = {
                "dataType": "BOOL",
                "isRequired": false,
                "example": (i === 0) ? true : false,
                "description": `${parentInfo.title}の${i}番目の項目を、サーバー側で入力データとして採用するか否か。（true...採用する。false...無視する。）`
                    + `ここでの「${i}番目」の数え方は、画面上に "実際に" 表示されている項目の先頭から数えます。`
                    + `データの件数が増えた場合は複数のページに分割されますので、「データベースの先頭から${i}番目」として解釈するわけではありません。`,
            };
            if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                throw `リクエストデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
            }
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                const childInfo = parentInfo.children[childKey];
                newRequestInfo[newKey] = {
                    ...childInfo,
                    "isRequired": false,
                    "description": `${parentInfo.title}の${i}番目の項目の` + childInfo.description
                        + `。ただし項目「${flagKey}」がtrueの場合のみ、有効なデータとして採用します。`,
                };
            }
        }
    }
    return newRequestInfo;
}

function _convertResponseInfo({ endpointPath, oldResponseInfo }) {
    const newResponseInfo = {};
    for (const parentKey in oldResponseInfo) {
        const parentInfo = oldResponseInfo[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            newResponseInfo[parentKey] = parentInfo;
            continue;
        }
        if (!Number.isInteger(parentInfo.onePageMaxSize)) {
            throw `１ページあたりの最大表示件数が未定義です。endpointPath="${endpointPath}", key="${parentKey}.onePageMaxSize"`;
        }
        if (!parentInfo.title) {
            throw `配列のタイトル（日本語）が未定義です。endpointPath="${endpointPath}", key="${parentKey}.title"`;
        }
        // 配列の場合
        for (let i = 0; i < parentInfo.onePageMaxSize; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            newResponseInfo[flagKey] = {
                "dataType": "BOOL",
                "isRequired": true,
                "example": (i === 0) ? true : false,
                "description": `「${parentInfo.title}」の${i}番目の項目を表示するべきか否か。（true...表示するべき。false...表示するべきではない。）`
                    + `ここでの「${i}番目」の数え方は、画面上に "実際に" 表示されている項目の先頭から数えてください。`
                    + `データの件数が増えた場合は複数のページに分割されますので、「データベースの先頭から${i}番目」とは限りません。`,
            };
            if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                throw `レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
            }
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                const childInfo = parentInfo.children[childKey];
                newResponseInfo[newKey] = {
                    ...childInfo,
                    "isRequired": false,
                    "description": `「${parentInfo.title}」の${i}番目の項目の` + childInfo.description
                        + `。ただし項目「${flagKey}」がtrueの場合のみ、有効なデータとして表示してください。`,
                };
            }
        }
    }
    return newResponseInfo;
}
