// テーブル結合
//
import {
  startUp,
  createColumn,
  deleteTable,
  createView,
  deleteView,
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
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./079_csv_validate.js";
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
  _getRecordOffset,
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
} from "./064_generate_sql_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    await reserveWord("conditions"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS conditions (
            "condition_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "view_column_id" INTEGER NOT NULL,
            "conditional_expression" TEXT NOT NULL,
            "conditional_value" TEXT NOT NULL,
            FOREIGN KEY (view_column_id) REFERENCES view_columns(view_column_id)
        );`,
        {},
    );
    //
    await reserveWord("sort_orders"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS sort_orders (
            "view_column_id" INTEGER PRIMARY KEY,
            "is_ascending" INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (view_column_id) REFERENCES view_columns(view_column_id)
        );`,
        {},
    );
}



// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    // 外部キー制約があるため、消す順番に注意！
    await runSqlWriteOnly(
        `DELETE FROM sort_orders
            WHERE sort_orders.view_column_id IN
            (
                SELECT view_columns.view_column_id
                FROM view_columns
                WHERE view_columns.view_id = :viewId
            );`,
        {
            ":viewId": viewId,
        },
    );
    await runSqlWriteOnly(
        `DELETE FROM conditions
            WHERE view_column_id IN
            (
                SELECT view_column_id
                FROM view_columns
                WHERE view_id = :viewId
            );`,
        {
            ":viewId": viewId,
        },
    );
    return await deleteView( viewId );  // 下層の関数を実行する
}



// SQLクエリを生成
export async function generateSQL_core( viewId, queryParameters ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = await getTableFromView( viewId );
    if( !tableId ){
        throw `指定されたページには、動的リストが登録されていません。\nviewId = ${viewId}`;
    }
    let viewColumns = await listViewColumns(viewId);
    for( let i=0; i<viewColumns.length; i++ ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnPath = viewColumns[i].columnPath;
        viewColumns[i].pathLength = await getPathLength(columnPath);
        viewColumns[i].columnId = await pathToColumnId(columnPath);
    }
    viewColumns = viewColumns.sort((a,b)=>{
        if( a.pathLength > b.pathLength ){
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            return 1;
        }
        else{
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            return -1;
        }
    });
    const buf = {
        //  "c78": [ "d45", "d99" ],
        //  "c6": [ "d12" ],
    };
    for( const { viewColumnId, columnId } of viewColumns ){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        if( !buf[columnId] ){
            if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
            buf[columnId] = [];
        }
        buf[columnId].push(viewColumnId);
    }
    const parameters = {};
    for( const key in queryParameters ){
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        // クエリパラメータ―のキーは「p4c8」などの形式。
        if (!/^p(\d+)c(\d+)$/.test(key)) continue;
        const match = key.match(/\d+/g);
        if (!match || match.length!==2)continue;
        const pageNumber = parseInt(match[0], 10);
        const columnNumber = parseInt(match[1], 10);
        const columnId = "c" + columnNumber;
        if( !buf[columnId] ) continue;
        if( !Array.isArray(buf[columnId]) ) continue;
        const viewColumnId = buf[columnId][0];
        buf[columnId].shift();  // 先頭を削除
        const inputText = queryParameters[key];
        const value = await formatField( inputText, columnId, false );
        parameters[viewColumnId] = value;
        conditionInfoList.push({
            "viewColumnId" : viewColumnId,
            "conditionalExpression": "=",
        });
    }
    const conditionInfoList = await runSqlReadOnly(
        `SELECT
            "d" || conditions.view_column_id AS viewColumnId,
            conditions.conditional_expression AS conditionalExpression,
            conditions.conditional_value AS conditionalValue,
            view_columns.view_column_type AS viewColumnType,
            view_columns.column_path AS columnPath
        FROM conditions
        INNER JOIN view_columns
            ON conditions.view_column_id = view_columns.view_column_id
        WHERE view_columns.view_id = :viewId;`,
        {
            ":viewId": viewId,
        },
    );
    for( const { viewColumnId, conditionalValue, viewColumnType, columnPath } of conditionInfoList ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        if( viewColumnType==="RAW" ){
            if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = await pathToColumnId(columnPath);
            const value = await formatField( conditionalValue, columnId, false );
            parameters[viewColumnId] = value;
        }
        else{
            if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
            // MAX や SUM などの集合関数の場合
            if(isNaN(conditionalValue))continue;
            parameters[viewColumnId] = Number(conditionalValue);
        }
    }
    const sortOrders = await runSqlReadOnly(
        `SELECT
            "d" || sort_orders.view_column_id AS viewColumnId,
            sort_orders.is_ascending AS isAscending
        FROM sort_orders
        INNER JOIN view_columns
            ON sort_orders.view_column_id = view_columns.view_column_id
        WHERE view_columns.view_id = :viewId;`,
        {
            ":viewId": viewId,
        },
    );
    const { normalSQL, countSQL } = await generateSQL(
        tableId,
        viewColumns,
        conditionInfoList,
        sortOrders
    );
    return {  normalSQL, countSQL, parameters };
}



// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    const views = await listViewsFromTableId( tableId );
    for( const viewId of views ){
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        // 外部キー制約があるため、消す順番に注意！
        await runSqlWriteOnly(
            `DELETE FROM sort_orders
                WHERE sort_orders.view_column_id IN
                (
                    SELECT view_columns.view_column_id
                    FROM view_columns
                    WHERE view_columns.view_id = :viewId
                );`,
            {
                ":viewId": viewId,
            },
        );
        await runSqlWriteOnly(
            `DELETE FROM conditions
                WHERE view_column_id IN
                (
                    SELECT view_column_id
                    FROM view_columns
                    WHERE view_id = :viewId
                );`,
            {
                ":viewId": viewId,
            },
        );
    }
    return await deleteTable( tableId );    // 下層の関数を呼び出す
}
