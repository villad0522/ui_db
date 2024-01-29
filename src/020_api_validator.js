// APIバリデーター
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
} from "./022_auto_correct_validate.js";
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
    if (!endpointInfo.httpMethod) {
        throw `エンドポイント「${endpointPath}」のHTTPメソッドが未定義です。`;
    }
    if (endpointInfo.httpMethod !== httpMethod) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        console.log("\n\n");
        console.log(JSON.stringify(endpointInfo, null, 2));
        console.log("\n\n");
        throw `HTTPメソッドが不正です。正：${endpointInfo.httpMethod}  誤：${httpMethod}`;
    }
    //
    // リクエストボディをチェックする（可能なら変換も行う）
    // requestBody を requestBody2 に変換する
    const requestBody2 = {};
    for (const parentKey in endpointInfo.requestBody) {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        const parentInfo = endpointInfo.requestBody[parentKey];
        let parentValue = requestBody[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (parentInfo.isArray) {
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            // 配列の場合
            if (parentInfo.isRequired === false && !parentValue) {
                if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
                continue; // 空欄かつ空欄OKの場合
            }
            requestBody2[parentKey] = _validatorArray({
                array: parentValue,
                parentKey,
                arrayInfo: parentInfo,
                allData: requestBody,
                endpointPath,
            });
        }
        else {
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            // 配列ではない場合
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}"`;
            }
            try {
                parentValue = _validator({
                    value: parentValue,
                    dataType: parentInfo.dataType,
                    isRequired: parentInfo.isRequired,
                });
                requestBody2[parentKey] = parentValue;
            }
            catch (err) {
                // 記入漏れや書式エラーが発生した場合
                if (!isRequestFormData) throw err;
                // FormData形式の場合
                console.error(`リクエストボディの項目「${parentKey}」が不正な書式です。${err}  endpointPath="${endpointPath}"`);
                return {
                    ...requestBody,
                    userMessage: String(err),
                    [parentKey + "_error"]: String(err),
                };
            }
        }
    }
    //
    // APIのメイン処理を実行する
    let response = await runApi( httpMethod, endpointPath, queryParameters, requestBody2, isRequestFormData, isResponseFormData );
    //
    // レスポンスデータをチェックする
    response = _validateResponseData({ endpointPath, endpointInfo, response });
    //
    return response;
}




function _validatorArray({ array, parentKey, arrayInfo, allData, endpointPath }) {
    // 配列の場合
    if (!Array.isArray(array)) {
        console.error("\n\n");
        console.error(JSON.stringify(allData, null, 2));
        console.error("\n\n");
        throw `パラメータ「${parentKey}」を配列にしてください。`;
    }
    newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'object') {
            // 配列の要素がオブジェクトではない場合
            console.error("\n\n");
            console.error(JSON.stringify(allData, null, 2));
            console.error("\n\n");
            throw `配列の要素（${parentKey}[${i}]）をオブジェクトにしてください。`;
        }
        if (!arrayInfo.children || typeof arrayInfo.children !== 'object') {
            throw `仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        newArray[i] = {};
        for (const childKey in arrayInfo.children) {
            if (childKey === "flag") {
                throw `Keyには文字列「flag」を使用できません。endpointPath=${endpointPath} key=${parentKey}`;
            }
            if( childKey.endsWith("_option") ){
                // 予測変換の候補の場合
                const childValue = array[i][childKey];
                if(childValue){
                    newArray[i][childKey] = childValue;
                }
                continue;
            }
            const childInfo = arrayInfo.children[childKey];
            if (!childInfo || typeof childInfo !== 'object') {
                throw `仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
            }
            if (childInfo.example === null || childInfo.example === undefined) {
                throw `仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
            }
            try {
                let childValue = array[i][childKey];
                childValue = _validator({
                    value: childValue,
                    dataType: childInfo.dataType,
                    isRequired: childInfo.isRequired,
                });
                newArray[i][childKey] = childValue;
            }
            catch (err) {
                console.error("\n\n");
                console.error(JSON.stringify(allData, null, 2));
                console.error("\n\n");
                throw `配列の中身（${parentKey}[${i}]）が不正な書式です。${err}`;
            }
        }
    }
    return newArray;
}



function _validator({ value, dataType, isRequired }) {
    switch (dataType) {
        case "INTEGER":
            if (!isNaN(value)) {
                // 数値に変換できる場合
                value = Number(value);
                if (!Number.isInteger(value)) {
                    throw "小数は指定できません。指定できるのは整数のみです。";
                }
                return value;
            }
            // 数値に変換できない場合
            if (value) {
                // 空欄ではない場合
                throw "指定できるのは整数のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        case "REAL":
            if (!isNaN(value)) {
                // 数値に変換できる場合
                return Number(value);
            }
            // 数値に変換できない場合
            if (value) {
                // 空欄ではない場合
                throw "指定できるのは整数のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        case "TEXT":
            if (value) {
                // 空欄ではない場合
                // 文字列に変換して、前後の空白を切り取って、よく確かめる。
                value = String(value).trim();
                if (value) {
                    // やっぱり空欄ではない場合
                    return String(value);
                }
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            throw "必須項目が空欄です。";
        case "BOOL":
            if (value === true) {
                return true;
            }
            else if (value === false) {
                return false;
            }
            if (String(value).toLowerCase() === "true") {
                return true;
            }
            else if (String(value).toLowerCase() === "false") {
                return false;
            }
            if (!isNaN(value)) {
                // 数値に変換できる場合
                return Number(value) !== 0;
            }
            // 数値に変換できない場合
            if (value) {
                // 空欄ではない場合
                throw "指定できるのはBOOL値のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        default:
            throw `サポートされていないデータ型です。detaType="${childInfo.dataType}"`;
    }
}



//【サブ関数】レスポンスデータをチェックする関数
function _validateResponseData({ endpointPath, endpointInfo, response }) {
    // response を response2 に変換する
    const response2 = {};
    for (const parentKey in endpointInfo.response) {
        const parentInfo = endpointInfo.response[parentKey];
        let parentValue = response[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if( parentKey.includes("_option") ){
            // 予測変換の候補の場合
            if(parentValue){
                response2[parentKey] = parentValue;
            }
            continue;
        }
        if (parentInfo.isArray) {
            // 配列の場合
            if (parentInfo.isRequired === false && !parentValue) {
                continue; // 空欄の場合
            }
            response2[parentKey] = _validatorArray({
                array: parentValue,
                parentKey,
                arrayInfo: parentInfo,
                allData: response,
                endpointPath,
            });
        }
        else {
            // 配列ではない場合
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}"`;
            }
            try {
                parentValue = _validator({
                    value: parentValue,
                    dataType: parentInfo.dataType,
                    isRequired: parentInfo.isRequired,
                });
                response2[parentKey] = parentValue;
            }
            catch (err) {
                console.error("\n\n");
                console.error(JSON.stringify(response, null, 2));
                console.error("\n\n");
                throw `レスポンスデータの項目「${parentKey}」が不正な書式です。${err}  endpointPath="${endpointPath}"`;
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
