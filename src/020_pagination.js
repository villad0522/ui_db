// ページネーション
//
import {
  startUp,
  createTemplate,
  deleteTemplate,
  updateTemplateName,
  listTemplates,
  getTemplateName,
} from "./031_excel_template_validate.js";
import {
  getLocalIp,
} from "./133_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./049_frontend_files_validate.js";
import {
  getPath,
} from "./130_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./127_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./106_column_name_validate.js";
import {
  getTimestamp,
} from "./124_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./121_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./118_primary_key_validate.js";
import {
  clearCache,
  getEndpointInfo,
  listEndpoints,
} from "./025_get_api_info_validate.js";
import {
  createColumn,
  updateView,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
} from "./058_view_column_validate.js";
import {
  listDataTypes,
} from "./115_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./097_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./103_reserved_word_validate.js";
import {
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
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
} from "./100_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./109_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./112_sort_validate.js";
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
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./094_system_auto_correct_validate.js";
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
  updateExcel,
  openExcel,
} from "./034_excel_edit_validate.js";
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
  runApi,
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
    if (!isResponseFormData) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスデータをFormDataの形式に変換する必要がなければ
        // （HTML側にすり合わせる必要がなければ）
        //  何もしない（下層の機能をそのまま上層に提供する）
        return await runApi( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData );
    }
    //
    // エンドポイントの情報を取得する
    const endpointInfo = await getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData );
    //
    // APIのメイン処理を実行する
    let response = await runApi( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData );
    //
    // レスポンスデータに、ページネーションの情報を加える
    response = _convertResponseData({ endpointPath, endpointInfo, response, queryParameters });
    //
    return response;
}


//【サブ関数】レスポンスデータに、ページネーションの情報を加える関数
function _convertResponseData({ endpointPath, endpointInfo, response, queryParameters }) {
    // response を response2 に変換する
    const response2 = {
        ...response,
    };
    for (const parentKey in endpointInfo.response) {
        // レスポンスの規格
        const parentRule = endpointInfo.response[parentKey];
        if (!parentRule || typeof parentRule !== 'object') {
            throw `レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        //
        const parentValue = response[parentKey];
        //
        // 配列ではない場合、何もしない
        if (!parentRule.isArray) continue;
        if (!Array.isArray(parentValue)) {
            console.error("\n");
            console.error(JSON.stringify(response, null, 2));
            console.error("\n");
            throw `想定外のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (parentRule.onePageMaxSize < parentValue.length) {
            throw `配列がサイズオーバーです。endpointPath=${endpointPath} key=${parentKey} 現在の長さ=${parentValue.length} 上限=${parentRule.onePageMaxSize}`;
        }
        //
        // 仮に全件を取得していた場合の、配列の長さ
        const totalKey = String(parentKey) + "_total";
        let totalArrayLength = response[totalKey];
        if (isNaN(totalArrayLength)) {
            throw `レスポンスデータが不足しています。仮に配列「${parentKey}」を全件を取得していた場合の件数を${totalKey}に返却してください。 endpointPath=${endpointPath}`;
        }
        totalArrayLength = Number(totalArrayLength);
        //
        // １ページあたり表示できる件数
        const onePageMaxSize = parentRule.onePageMaxSize;
        //
        // 全部で何ページあるのか
        const maxPageNumber = Math.ceil(totalArrayLength / onePageMaxSize);
        //
        // 現在のページ番号
        const queryParameterKey = "page_" + String(parentKey);
        let pageNumber = queryParameters[queryParameterKey];
        if( response[queryParameterKey] ){
            pageNumber = response[queryParameterKey] ?? 1;
        }
        if (isNaN(pageNumber)) {
            pageNumber = 1;
        }
        else {
            pageNumber = Number(pageNumber);
            if (pageNumber <= 0) {
                pageNumber = 1;
            }
            if (pageNumber > maxPageNumber) {
                pageNumber = maxPageNumber;
            }
        }
        //
        response2[String(parentKey) + "_pageFirst_flag"] = (pageNumber >= 3) ? true : false;
        //
        response2[String(parentKey) + "_pagePrev_flag"] = (pageNumber >= 2) ? true : false;
        response2[String(parentKey) + "_pagePrev"] = pageNumber - 1;
        //
        response2[String(parentKey) + "_pageNow_flag"] = (maxPageNumber >= 2) ? true : false;
        response2[String(parentKey) + "_pageNow"] = pageNumber;
        //
        response2[String(parentKey) + "_pageNext_flag"] = (pageNumber < maxPageNumber) ? true : false;
        response2[String(parentKey) + "_pageNext"] = pageNumber + 1;
        //
        response2[String(parentKey) + "_pageLast_flag"] = (pageNumber < maxPageNumber - 1) ? true : false;
        response2[String(parentKey) + "_pageLast"] = maxPageNumber;
    }
    for (const parentKey in endpointInfo.response) {
        delete response2["page_" + String(parentKey)];
    }
    return response2;
}


// エンドポイントの情報を取得
export async function getEndpointInfo_core( endpointPath, isRequestFormData, isResponseFormData ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    if (!isResponseFormData) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスデータをFormDataの形式に変換する必要がなければ
        // （HTML側にすり合わせる必要がなければ）
        //  何もしない（下層の機能をそのまま上層に提供する）
        return await getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData );
    }
    const endpointInfo1 = await getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData );
    const endpointInfo = structuredClone(endpointInfo1);
    //
    for (const parentKey in endpointInfo.response) {
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        // レスポンスの規格
        const parentRule = endpointInfo.response[parentKey];
        if (!parentRule || typeof parentRule !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        //
        // 配列ではない場合、何もしない
        if (!parentRule.isArray) continue;
        //
        if (!parentRule.title) {
            throw `[${LAYER_CODE}層] 配列のタイトル（日本語）が未定義です。endpointPath="${endpointPath}", key="${parentKey}.title"`;
        }
        endpointInfo.response[String(parentKey) + "_pageFirst_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に「先頭ページにジャンプする」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、先頭ページを表示しているときにはfalseになります。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pagePrev_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に「１つ前のページに戻る」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、先頭ページを表示しているときにはfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pagePrev"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 2,
            "description": `「${parentRule.title}」を表示する際の、１つ前のページのページ番号。例えば、５ページめを表示しているときは「4」です。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pageNow_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に、現在のページ番号を表示するか否か。（true...表示する。false...表示しない。）全部で１ページしか存在しない場合はfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pageNow"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 3,
            "description": `「${parentRule.title}」を表示する際の、現在のページ番号。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pageNext_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に「次のページに進む」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、最終ページを表示しているときにはfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pageNext"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 4,
            "description": `「${parentRule.title}」を表示する際の、次のページのページ番号。例えば、５ページめを表示しているときは「6」です。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pageLast_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": false,
            "description": `「${parentRule.title}」を表示する際に「最終ページにジャンプする」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、最終ページを表示しているときにはfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pageLast"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 4,
            "description": `「${parentRule.title}」を表示する際の、最後のページのページ番号。`,
        };
    }
    return endpointInfo;
}


