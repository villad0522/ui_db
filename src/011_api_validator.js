// APIバリデーター
//
import {
  startUp,
  close,
  openExcel,
  _launchExcelApp,
  _handleEditExcelFile,
} from "./031_excel_file_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
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
  listEndpoints,
} from "./025_get_api_info_validate.js";
import {
  createColumn,
  deleteTable,
  createPage,
  updatePageName,
  createView,
  deleteView,
  deletePage,
  pastePage,
  updateView,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  regeneratePage,
  addViewColumn,
} from "./040_regenerate_page_validate.js";
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
  _getConditions,
  generateSQL,
  getExtractionsAsJP,
  autoCorrectConditionalValue,
  deleteCondition,
  addCondition,
} from "./061_extract_and_sort_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./085_csv_validate.js";
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
} from "./067_page_and_view_validate.js";
import {
  _createViewColumnOuter,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
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
  getPageDataForGUI,
  getPageDataForExcel,
  _getDataList,
  _getSheetDatas,
} from "./058_page_data_validate.js";
import {
  getExcelId,
} from "./055_excel_multiple_validate.js";
import {
  createDirectories,
} from "./052_frontend_files_validate.js";
import {
  generateViewHTML_table,
  generateViewHTML_card,
  generateViewHTML_button,
} from "./049_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./046_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
  _getDataType,
} from "./043_regenerate_api_info_validate.js";
import {
  deleteTemplate,
  getExcelTemplate,
  updateExcelTemplate,
} from "./037_excel_template_validate.js";
import {
  updateExcel,
  _updateExcelSheet,
  extractTemplate,
} from "./034_excel_content_validate.js";
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
} from "./028_data_transfer_validate.js";
import {
  getEndpointInfo,
  runApi,
} from "./013_api_auto_correct_validate.js";
import {
  convertQuery,
} from "./022_run_api_validate.js";


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
        throw `HTTPメソッドが不正です。正：${endpointInfo.httpMethod}  誤：${httpMethod}`;
    }
    //
    // リクエストボディをチェックする（可能なら変換も行う）
    // requestBody を requestBody2 に変換する
    const requestBody2 = {};
    const noErrors = {};
    for (const parentKey in endpointInfo.requestBody) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        const parentInfo = endpointInfo.requestBody[parentKey];
        let parentValue = requestBody[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (parentInfo.isArray) {
            if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
            // 配列の場合
            if (parentInfo.isRequired === false && !parentValue) {
                if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
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
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
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
                noErrors[parentKey + "_error"] = "";
            }
            catch (err) {
                // 記入漏れや書式エラーが発生した場合
                if (!isRequestFormData) throw err;
                // FormData形式の場合
                console.error(`リクエストボディの項目「${parentKey}」が不正な書式です。${err}  endpointPath="${endpointPath}"`);
                return {
                    ...noErrors,
                    userMessage: String(err),
                    [parentKey + "_error"]: String(err),
                };
            }
        }
    }
    //
    // クエリパラメータ―をチェックする（可能なら変換も行う）
    const queryParameters2 = _validateQueryParameters({ endpointPath, endpointInfo, queryParameters });
    //
    // APIのメイン処理を実行する
    let response = await runApi( httpMethod, endpointPath, queryParameters2, requestBody2, isRequestFormData, isResponseFormData );
    //
    // レスポンスデータをチェックする
    response = _validateResponseData({ endpointPath, endpointInfo, response });
    //
    return response;
}



function _validateQueryParameters({ endpointPath, endpointInfo, queryParameters }) {
    // クエリパラメータ―をチェックする（可能なら変換も行う）
    // queryParameters を queryParameters2 に変換する
    const queryParameters2 = structuredClone(queryParameters);
    for (const parentKey in endpointInfo.queryParameters) {
        const parentInfo = endpointInfo.queryParameters[parentKey];
        let parentValue = queryParameters[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `クエリパラメータ―の仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (parentInfo.example === null || parentInfo.example === undefined) {
            throw `仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        try {
            parentValue = _validator({
                value: parentValue,
                dataType: parentInfo.dataType,
                isRequired: parentInfo.isRequired,
            });
            if( parentValue !== null ){
                queryParameters2[parentKey] = parentValue;
            }
        }
        catch (err) {
            // 記入漏れや書式エラーが発生した場合
            console.error(`クエリパラメータ―の項目「${parentKey}」が不正な書式です。${err}  endpointPath="${endpointPath}"`);
            throw err;
        }
    }
    return queryParameters2;
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
                return "";
            }
            throw "必須項目が空欄です。";
        case "BOOL":
            if (value === true) {
                return true;
            }
            if (String(value).toLowerCase() === "on") {
                return true;
            }
            else if (String(value).toLowerCase() === "true") {
                return true;
            }
            if (!isNaN(value)) {
                // 数値に変換できる場合
                return Number(value) !== 0;
            }
            return false;
        default:
            throw `サポートされていないデータ型です。detaType="${dataType}"`;
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
