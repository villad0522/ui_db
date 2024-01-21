// API仕様書
//
import {
  startUp,
  createPage,
  updatePageName,
  getPageInfo,
} from "./024_pages_validate.js";
import {
  getLocalIp,
} from "./081_ip_address_validate.js";
import {
  getPath,
} from "./078_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
} from "./075_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./063_column_name_validate.js";
import {
  close,
} from "./027_frontend_files_validate.js";
import {
  getPrimaryKey,
} from "./072_primary_key_validate.js";
import {
  clearCache,
  listEndpoints,
} from "./021_api_info_validate.js";
import {
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./054_relation_validate.js";
import {
  listDataTypes,
} from "./069_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
  generateSQL,
} from "./030_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./060_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./051_search_text_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./057_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./066_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./045_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./042_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./039_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./036_generate_sql1_validate.js";
import {
  getEndpointInfo,
} from "./012_convert_array_validate.js";
import {
  runApi,
} from "./009_api_validator_validate.js";


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
            responseJson: {
                ...infoJson.response,
            },
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
        if (parentInfo.isArray) {
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
