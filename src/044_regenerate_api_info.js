// API情報を生成
//
import {
  startUp,
  close,
  createDirectories,
} from "./052_frontend_files_validate.js";
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
  createColumn,
  createView,
  deletePage,
  updateView,
  _createViewColumnOuter,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
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
  deleteTable,
  _getConditions,
  generateSQL,
  deleteView,
  getExtractionsAsJP,
  autoCorrectConditionalValue,
  deleteCondition,
  addCondition,
} from "./061_extract_and_sort_validate.js";
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
} from "./067_page_and_view_validate.js";
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
  generateViewHTML_table,
  generateViewHTML_card,
  generateViewHTML_button,
} from "./049_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./046_regenerate_html_validate.js";


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
        const columnId = await pathToColumnId( columnPath );
        // リクエストボディ
        requestBody[viewColumnId] = {
            "dataType": "TEXT",
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
        // レスポンス（自動入力）
        response[viewColumnId] = {
            "dataType": await _getDataType_core( columnId ),
            "description": viewColumnName,
            "isRequired": false,
            "example": await _getExample_core( viewId, viewColumnId ),
        };
        // レスポンス（予測変換の候補）
        response[viewColumnId+"_option"] = {
            "dataType": await _getDataType_core( columnId ),
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
                "isRequired": false,
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
    const queryParameters = {};
    //
    for( const { viewId } of views ){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        queryParameters[`page_view${viewId}_`] = {
            "dataType": "INTEGER",
            "description": "ページ番号。１ページに収まらなかった場合に活用します。このパラメータを2,3,4...と増やすことで、次のページを閲覧できます。",
            "isRequired": false,
            "example": 1
        }
    }
    //
    for( let i=0; i<views.length; i++ ){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        const { viewId, name, tableId, onePageMaxSize, viewType, childPageId } = views[i];
        const viewColumns = await listViewColumns( viewId );
        const tableName = await getTableName(tableId);
        const children = {};
        for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
            if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = await pathToColumnId( columnPath );
            // レスポンス
            children[viewColumnId] = {
                "dataType": "TEXT",
                "description": viewColumnName,
                "isRequired": false,
                "example": await _getExample_core( viewId, viewColumnId ),
            };
            // レスポンス（自動入力）
            response[viewColumnId] = {
                "dataType": await _getDataType_core( columnId ),
                "description": viewColumnName,
                "example": await _getExample_core( viewId, viewColumnId ),
                "isRequired": false,
            };
            // レスポンス（予測変換の候補）
            response[viewColumnId+"_option"] = {
                "dataType": await _getDataType_core( columnId ),
                "description": viewColumnName,
                "example": await _getExample_core( viewId, viewColumnId ),
                "isRequired": false,
            };
        }
        response["view" + viewId + "_"] = {
            "title": `${name}(view${viewId})`,
            "isArray": true,
            "onePageMaxSize": onePageMaxSize,
            "children": {
                ...children,
                "id": {
                    "dataType": "INTEGER",
                    "description": `テーブル「${tableName}」のレコードのID`,
                    "example": 2,
                    "isRequired": true,
                }
            }
        };
        // レコードの件数
        response["view" + viewId + "__total"] = {
            "dataType": "INTEGER",
            "description": `${name}(view${viewId})の件数`,
            "example": 2000,
            "isRequired": true,
        };
        // 抽出条件
        response["extraction" + viewId + "_"] = {
            "title": `${name}(view${viewId})を集計する際の抽出条件。`,
            "isArray": true,
            "onePageMaxSize": 10,
            "children": {
                "conditionId": {
                    "dataType": "TEXT",
                    "description": `抽出条件ごとに固有の識別子。`,
                    "example": "p3c6",
                    "isRequired": true,
                },
                "text": {
                    "dataType": "TEXT",
                    "description": `抽出条件を分かりやすく表現した文字列。`,
                    "example": "身長が230より大きい",
                    "isRequired": true,
                }
            }
        };
        // 抽出条件の個数
        response["extraction" + viewId + "__total"] = {
            "dataType": "INTEGER",
            "description": `${name}(view${viewId})を集計する際の、抽出条件の個数。`,
            "example": 2,
            "isRequired": true,
        };
    }
    return {
        "pageId": pageId,
        "httpMethod": "GET",
        "description": "データを１ページぶん取得します。",
        "commandName": "GET_PAGE_DATA",
        "queryParameters": queryParameters,
        "requestBody": {},
        "response": {
            ...response,
            "views": {
                "title": "ビューの一覧",
                "isArray": true,
                "onePageMaxSize": 5,
                "children": {
                    "viewId": {
                        "dataType": "INTEGER",
                        "description": "ビューのID",
                        "example": 5
                    },
                    "newExtractionTarget_option": {
                        "dataType": "TEXT",
                        "description": `ビューカラム名の一覧。`,
                        "example": "",
                        "isRequired": false,
                    }
                }
            },
            "views_total": {
                "dataType": "INTEGER",
                "description": `ビューの個数。`,
                "example": 2,
                "isRequired": true,
            }
        },
    };
}


// APIを再生成(UPDATE)
export async function regenerateAPI_update_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    const requestBody = {};
    const response = {};
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
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

// 【サブ】データ型を取得する関数
export async function _getDataType_core( columnId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    const dataType = await getDataType( columnId );
    switch (dataType) {
        case "POINTER":
            if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
            const parentTableId = await getTableId( columnId );
            const parentColumnId = await getTitleColumnId( parentTableId );
            return await _getDataType_core( parentColumnId );
        case "INTEGER":
            if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
            return "INTEGER";
        case "REAL":
            if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
            return "REAL";
        case "TEXT":
            if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
            return "TEXT";
        case "BOOL":
            if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
            return "BOOL";
        default:
            throw `サポートされていないデータ型です。detaType="${dataType}"`;
    }
}
