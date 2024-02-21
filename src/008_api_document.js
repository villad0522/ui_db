// API仕様書
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
} from "./013_api_auto_correct_validate.js";
import {
  runApi,
} from "./010_api_validator_validate.js";
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
    if (endpointPath === "/default/api_doc/detail") {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // APIの詳細な仕様を返す
        if (isResponseFormData) {
            throw `API仕様書は、JSONのみで提供しています。`;
        }
        const infoJson = await getEndpointInfo( queryParameters?.endpoint, false, false );
        const infoForm = await getEndpointInfo( queryParameters?.endpoint, true, true );
        const newInfo = {
            ...infoJson,
            //-------------------------------------------------------
            queryParameters: infoJson.queryParameters,
            queryParametersExample: "?" + _getExampleUrlencoded(infoJson.queryParameters),
            //-------------------------------------------------------
            requestJson: {
                ...infoJson.requestBody,
            },
            requestJsonExample: _getExampleJson(infoJson.requestBody),
            //-------------------------------------------------------
            requestForm: {
                ...infoForm.requestBody,
            },
            requestFormExample: _getExampleUrlencoded(infoForm.requestBody),
            //-------------------------------------------------------
            responseJson: _convertResponseInfo({
                endpointPath,
                oldResponseInfo: infoJson.response,
            }),
            responseJsonExample: _getExampleJson(infoJson.response),
            //-------------------------------------------------------
            responseForm: {
                ...infoForm.response,
            },
            responseFormExample: _getExampleUrlencoded(infoForm.response),
            //-------------------------------------------------------
        };
        delete newInfo.requestBody;
        delete newInfo.response;
        return newInfo;
    }
    else if (endpointPath === "/default/api_doc") {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // APIエンドポイントの一覧を返す
        return await listEndpoints();
    }
    else {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        // 通常動作
        return await runApi( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData );
    }
}



function _getExampleJson(info) {
    const exampleJson = {};
    for (const parentKey in info) {
        const parentInfo = info[parentKey];
        if (parentKey.endsWith("_option")) {
            exampleJson[parentKey] = [
                parentInfo.example,
                parentInfo.example,
                parentInfo.example,
            ];
        }
        else if (parentInfo.isArray) {
            exampleJson[parentKey] = [
                {},
            ];
            for (const childKey in parentInfo.children) {
                const childInfo = parentInfo.children[childKey];
                if (childInfo.example === null || childInfo.example === undefined) {
                    throw `記入例(example)が未定義です。key="${parentKey}[0].${childKey}"`;
                }
                exampleJson[parentKey][0][childKey] = childInfo.example;
            }
        }
        else {
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `記入例(example)が未定義です。key=${parentKey}`;
            }
            exampleJson[parentKey] = parentInfo.example;
        }
    }
    return exampleJson;
}




function _getExampleUrlencoded(info) {
    const rows = [];
    for (const key in info) {
        const paramInfo = info[key];
        if (paramInfo.isArray) {
            throw `formDataに配列が含まれています。key=${key}`;
        }
        if (paramInfo.example === null || paramInfo.example === undefined) {
            throw `記入例(example)が未定義です。key=${key}`;
        }
        const text = key + "=" + paramInfo.example;
        rows.push(text);
    }
    return rows.join("\n&");
}


function _convertResponseInfo({ endpointPath, oldResponseInfo }) {
    const newResponseInfo = {};
    for (const parentKey in oldResponseInfo) {
        const parentInfo = oldResponseInfo[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if( parentKey.endsWith("_option") ){
            // 予測変換の場合
            newResponseInfo[parentKey] = {
                ...parentInfo,
                dataType: parentInfo.dataType + "の配列",
            };
            continue;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            newResponseInfo[parentKey] = parentInfo;
            continue;
        }
        // 配列の場合
        if (!parentInfo.children || typeof parentInfo.children !== 'object') {
            throw `レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        for (const childKey in parentInfo.children) {
            const childInfo = parentInfo.children[childKey];
            if( childKey.endsWith("_option") ){
                // 予測変換の場合
                newResponseInfo[parentKey][childKey] = {
                    ...childInfo,
                    dataType: childInfo.dataType + "の配列",
                };
            }
        }
    }
    return newResponseInfo;
}
