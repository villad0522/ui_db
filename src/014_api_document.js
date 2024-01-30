// API仕様書
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
} from "./118_ip_address_validate.js";
import {
  getPath,
} from "./115_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./112_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./094_column_name_validate.js";
import {
  close,
  createDirectories,
} from "./040_frontend_files_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./109_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./106_csv_validate.js";
import {
  getPrimaryKey,
} from "./103_primary_key_validate.js";
import {
  clearCache,
  listEndpoints,
} from "./031_api_info_validate.js";
import {
  createColumn,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
} from "./049_view_column_validate.js";
import {
  listDataTypes,
} from "./100_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./073_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./091_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./076_record_title_2_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./085_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./088_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./097_table_name_validate.js";
import {
  formatField,
} from "./082_db_formatter_validate.js";
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
} from "./079_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./067_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./064_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./061_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./058_generate_sql1_validate.js";
import {
  generateSQL,
} from "./046_joinedTable_validate.js";
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
} from "./052_page_and_view_validate.js";
import {
  getPageData,
} from "./043_page_data_validate.js";
import {
  generateViewHTML,
} from "./037_regenerate_view_html_validate.js";
import {
  getEndpointInfo,
} from "./019_auto_correct_validate.js";
import {
  runApi,
} from "./016_api_validator_validate.js";
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
