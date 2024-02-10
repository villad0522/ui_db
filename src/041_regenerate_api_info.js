// API情報を生成
//
import {
  startUp,
  close,
  createDirectories,
} from "./049_frontend_files_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
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
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
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
  createColumn,
  createView,
  deletePage,
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
  deleteTable,
  generateSQL,
  deleteView,
} from "./055_joinedTable_validate.js";
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
  _getParentOffset,
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
  getPageData,
} from "./052_page_data_validate.js";
import {
  generateViewHTML,
} from "./046_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./043_regenerate_html_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// APIを再生成(予測変換)
export async function regenerateAPI_autoCorrect_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    const requestBody = {};
    const response = {};
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // リクエストボディ
        requestBody[viewColumnId] = {
            "dataType": "TEXT",
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
        // レスポンス（自動入力）
        response[viewColumnId] = {
            "dataType": "TEXT",
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
        // レスポンス（予測変換の候補）
        response[viewColumnId+"_option"] = {
            "dataType": "TEXT",
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
    }
    return {
        "viewId": viewId,
        "httpMethod": "POST",
        "description": "予測変換を取得します。",
        "commandName": "AUTO_CORRECT",
        "queryParameters": {},
        "requestBody": requestBody,
        "response": response
    };
}


const exampleCache = {};
// 【サブ関数】入力例を取得
export async function _getExample_core( viewId, viewColumnId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    return "---";
}


// APIを再生成(CREATE)
export async function regenerateAPI_create_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    const requestBody = {};
    const response = {};
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        // リクエストボディ
        requestBody[viewColumnId] = {
            "dataType": "TEXT",
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
        // レスポンス（エラーメッセージ）
        response[viewColumnId+"_message"] = {
            "dataType": "TEXT",
            "description": "入力に不備があった際に、テキストボックスの下に表示するメッセージ。",
            "isRequired": false,
            "example": "数字ではありません",
        };
    }
    return {
        "viewId": viewId,
        "httpMethod": "POST",
        "description": "レコードを追加します。",
        "commandName": "CREATE_RECORD_FROM_VIEW",
        "queryParameters": {},
        "requestBody": requestBody,
        "response": {
            ...response,
            "recordId": {
                "dataType": "INTEGER",
                "description": "新しく生成したレコードのID",
                "example": 230,
                "isRequired": true,
            },
            "userMessage": {
                "dataType": "TEXT",
                "description": "成否を表すメッセージ",
                "example": "入力内容に不備があったため、登録できませんでした。",
                "isRequired": false,
            },
            "nextUrl": {
                "dataType": "TEXT",
                "description": "完了した場合に、移動すべきURL",
                "example": "../",
                "isRequired": false,
            },
            "isSuccess": {
                "dataType": "BOOL",
                "description": "レコードの追加に成功したか否か",
                "example": true,
                "isRequired": true,
            }
        },
    };
}


// APIを再生成(READ)
export async function regenerateAPI_read_core( pageId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    const response = {};
    //
    // ビューの一覧
    const views = await listChildrenView( pageId );
    //
    for( const { viewId, tableId, onePageMaxSize, viewType, childPageId } of views ){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        const viewColumns = await listViewColumns( viewId );
        const children = {};
        for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
            if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
            // レスポンス
            children[viewColumnId] = {
                "dataType": "TEXT",
                "description": viewColumnName,
                "isRequired": false,
                "example": await _getExample_core( viewId, viewColumnId ),
            };
        }
        response["view" + viewId + "_"] = {
            "title": "レコードの一覧",
            "isArray": true,
            "onePageMaxSize": onePageMaxSize,
            "children": {
                ...children,
                "id": {
                    "dataType": "INTEGER",
                    "description": "レコードID",
                    "example": 2,
                    "isRequired": true,
                }
            }
        };
        response["view" + viewId + "__total"] = {
            "dataType": "INTEGER",
            "description": `view${viewId}の件数`,
            "example": 2000,
            "isRequired": true,
        };
    }
    return {
        "pageId": pageId,
        "httpMethod": "GET",
        "description": "データを１ページぶん取得します。",
        "commandName": "GET_PAGE_DATA",
        "queryParameters": {},
        "requestBody": {},
        "response": response,
    };
}


// APIを再生成(UPDATE)
export async function regenerateAPI_update_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    const requestBody = {};
    const response = {};
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        // リクエストボディ
        requestBody[viewColumnId] = {
            "dataType": "TEXT",
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
        // レスポンス（エラーメッセージ）
        response[viewColumnId+"_message"] = {
            "dataType": "TEXT",
            "description": "入力に不備があった際に、テキストボックスの下に表示するメッセージ。",
            "isRequired": false,
            "example": "数字ではありません",
        };
    }
    return {
        "viewId": viewId,
        "httpMethod": "POST",
        "description": "レコードを上書きします。",
        "commandName": "UPDATE_RECORDS",
        "queryParameters": {},
        "requestBody": {
            ["view" + viewId + "_"]: {
                "title": "レコードの一覧",
                "isArray": true,
                "onePageMaxSize": onePageMaxSize,
                "children": {
                    ...requestBody,
                    "id": {
                        "dataType": "INTEGER",
                        "description": "レコードID",
                        "example": 2,
                        "isRequired": true,
                    }
                }
            },
        },
        "response": {
            ["view" + viewId + "_"]: {
                "title": "レコードの一覧",
                "isArray": true,
                "onePageMaxSize": onePageMaxSize,
                "children": {
                    ...response,
                    "id": {
                        "dataType": "INTEGER",
                        "description": "レコードID",
                        "example": 2,
                        "isRequired": true,
                    }
                }
            },
            ["view" + viewId + "__total"]: {
                "dataType": "INTEGER",
                "description": `view${viewId}の件数`,
                "example": onePageMaxSize,
                "isRequired": true,
            },
            "userMessage": {
                "dataType": "TEXT",
                "description": "完了メッセージ",
                "example": "再接続しました。",
                "isRequired": false,
            },
            "nextUrl": {
                "dataType": "TEXT",
                "description": "完了した場合に、移動すべきURL",
                "example": "../",
                "isRequired": false,
            },
            "isSuccess": {
                "dataType": "BOOL",
                "description": "上書きに成功したか否か",
                "example": true,
                "isRequired": true,
            }
        },
    };
}


// APIを再生成(DELETE)
export async function regenerateAPI_delete_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
        "tableId": tableId,
        "httpMethod": "POST",
        "description": "レコードを削除します。",
        "commandName": "DELETE_RECORDS",
        "queryParameters": {},
        "requestBody": {
            ["view" + viewId + "_"]: {
                "title": "レコードの一覧",
                "isArray": true,
                "onePageMaxSize": onePageMaxSize,
                "children": {
                    "id": {
                        "dataType": "INTEGER",
                        "description": "レコードID",
                        "example": 2,
                        "isRequired": true,
                    },
                    "checked": {
                        "dataType": "BOOL",
                        "description": "削除するか否か。削除する場合はtrue、削除しない場合はfalse。",
                        "example": true,
                        "isRequired": true,
                    }
                }
            },
        },
        "response": {
            "userMessage": {
                "dataType": "TEXT",
                "description": "完了メッセージ",
                "example": "再接続しました。",
                "isRequired": false,
            },
            "nextUrl": {
                "dataType": "TEXT",
                "description": "完了した場合に、移動すべきURL",
                "example": "../",
                "isRequired": false,
            }
        },
    };
}
