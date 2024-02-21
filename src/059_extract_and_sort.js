// 抽出と並び変え
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  createView,
  deleteView,
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
} from "./061_view_column_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./082_csv_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  listDataTypes,
} from "./118_data_type_validate.js";
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
} from "./100_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
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
} from "./103_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./115_sort_validate.js";
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
} from "./085_record_title_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  formatField,
} from "./094_db_formatter_validate.js";
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
} from "./088_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./079_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./076_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./073_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./070_generate_sql1_validate.js";
import {
  generateSQL,
} from "./067_generate_sql_validate.js";
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
} from "./064_page_and_view_validate.js";


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
            "saved_condition_id" INTEGER PRIMARY KEY AUTOINCREMENT,
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
export async function generateSQL_core( viewId, queryParameters, isExcel ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    const  {
        childPageId,
        tableId,
        onePageMaxSize,
        viewType
    } = await getViewInfo( viewId );
    if( !tableId ){
        throw `指定されたページには、動的リストが登録されていません。\nviewId = ${viewId}`;
    }
    const conditionInfoList = await _getConditions_core( viewId, queryParameters );
    const parameters = {};
    for( const { conditionId, conditionalValue } of conditionInfoList ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        parameters[":"+conditionId] = conditionalValue;
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
    const viewColumns = await listViewColumns(viewId);
    const { normalSQL, countSQL } = await generateSQL(
        tableId,
        viewColumns,
        conditionInfoList,
        sortOrders,
        isExcel ? null : onePageMaxSize,
    );
    let pageNumber = Number(queryParameters[`page_view${viewId}_`] ?? 1);
    if(isNaN(pageNumber)){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    if(pageNumber<=0){
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    const normalParameters = {
        ...parameters,
        ":offset": onePageMaxSize * (pageNumber - 1),
    };
    const countParameters = parameters;
    return {  normalSQL, countSQL, normalParameters, countParameters };
}



// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const views = await listViewsFromTableId( tableId );
    for( const viewId of views ){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
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





// 抽出条件を日本語で取得
export async function getExtractionsAsJP_core( viewId, queryParameters ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    const extractions = [];
    const conditionInfoList = await _getConditions_core( viewId, queryParameters );
    for( const { conditionId, viewColumnId, conditionalExpression, conditionalValue } of conditionInfoList ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        const viewColumnName = await getViewColumnName( viewId, viewColumnId );
        let text = "";
        switch( conditionalExpression ){
            case "LIKE":
                if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}を含む`;
                break;
            case "=":
                if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}と等しい`;
                break;
            case "!=":
                if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}以外`;
                break;
            case "<":
                if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}より小さい`;
                break;
            case ">":
                if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}より大きい`;
                break;
            case "<=":
                if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}以下`;
                break;
            case ">=":
                if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
                text = `${viewColumnName}が${conditionalValue}以上`;
                break;
            default:
                throw `サポートされていない条件演算子です`;
        }
        extractions.push({
            "conditionId" : conditionId,
            "text": text,
        });
    }
    return extractions;
}



// 【サブ】抽出条件を取得
export async function _getConditions_core( viewId, queryParameters ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    const conditionInfoList = [];
    //
    //############################################################
    // 予めデータベースに保存されている抽出条件を取り出す
    const matrix = await runSqlReadOnly(
        `SELECT
            conditions.saved_condition_id AS savedConditionId,
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
    for( const { savedConditionId, viewColumnId, conditionalValue, viewColumnType, columnPath, conditionalExpression } of matrix ){
        if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
        let value;
        if( viewColumnType==="RAW" ){
            if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = await pathToColumnId(columnPath);
            value = await formatField( conditionalValue, columnId, false );
        }
        else{
            if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
            // MAX や SUM などの集合関数の場合
            if(isNaN(conditionalValue))continue;
            value = Number(conditionalValue);
        }
        conditionInfoList.push({
            "conditionId": "e" + savedConditionId,
            "savedConditionId": savedConditionId,
            "queryParameterKey": null,
            "viewColumnType": viewColumnType,
            "viewColumnId": viewColumnId,
            "conditionalExpression": conditionalExpression,
            "conditionalValue": value,
        });
    }
    //
    //############################################################
    // その場で指定されたクエリパラメータ―から、抽出条件を求める
    let viewColumns = await listViewColumns(viewId);
    for( let i=0; i<viewColumns.length; i++ ){
        if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnPath = viewColumns[i].columnPath;
        viewColumns[i].pathLength = await getPathLength(columnPath);
        viewColumns[i].columnId = await pathToColumnId(columnPath);
    }
    viewColumns = viewColumns.sort((a,b)=>{
        if( a.pathLength > b.pathLength ){
            if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
            return 1;
        }
        else{
            if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
            return -1;
        }
    });
    const buf = {
        //  "c78": [ "d45", "d99" ],
        //  "c6": [ "d12" ],
    };
    for( const { viewColumnId, columnId } of viewColumns ){
        if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
        if( !buf[columnId] ){
            if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
            buf[columnId] = [];
        }
        buf[columnId].push(viewColumnId);
    }
    for( const key in queryParameters ){
        if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
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
        const inputText = queryParameters[key];
        buf[columnId].shift();  // 先頭を削除
        conditionInfoList.push({
            "conditionId": key,
            "savedConditionId": null,
            "queryParameterKey": key,
            "viewColumnType": "RAW",
            "viewColumnId": viewColumnId,
            "conditionalExpression": "=",
            "conditionalValue": await formatField( inputText, columnId, false ),
        });
    }
    return conditionInfoList;
}


// 条件値の候補を取得する
export async function autoCorrectConditionalValue_core( viewColumnName, inputText ){
  if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumnInfo = await getViewColumnFromName( viewColumnName );
    const columnId = await pathToColumnId(viewColumnInfo.columnPath);
    const tableId = await getTableId(columnId);
    return await autoCorrect( tableId, columnId, inputText, {} );
}



// 抽出条件を削除する
export async function deleteCondition_core( viewId, targetConditionId, oldQueryParameters ){
  if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
    const conditionInfoList = await _getConditions_core( viewId, oldQueryParameters );
    const newQueryParameters = {};
    for( const { conditionId, savedConditionId, queryParameterKey } of conditionInfoList ){
        if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
        if(targetConditionId!==conditionId){
            if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
            // 削除対象の「条件」ではない場合
            if(oldQueryParameters[queryParameterKey]){
                if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
                newQueryParameters[queryParameterKey] = oldQueryParameters[queryParameterKey];
            }
            continue;
        }
        // 削除対象の「条件」の場合
        //
        if(!savedConditionId){
            if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
            // データベースに保存されていない場合（クエリパラメータ―で指定されていた場合）
            continue;
        }
        // 抽出条件がデータベースに保存されている場合
        await runSqlWriteOnly(
            `DELETE FROM conditions
                WHERE saved_condition_id = :savedConditionId;`,
            {
                ":savedConditionId": savedConditionId,
            },
        );
    }
    return newQueryParameters;
}



// 抽出条件を追加する
export async function addCondition_core( viewColumnName, conditionalExpression, conditionalValue ){
  if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
    switch( conditionalExpression ){
        case "LIKE":
            if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        case "=":
            if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        case "!=":
            if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        case "<":
            if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        case ">":
            if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        case "<=":
            if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        case ">=":
            if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
            break;
        default:
            throw `サポートされていない条件演算子です`;
    }
    const viewColumnInfo = await getViewColumnFromName( viewColumnName );
    await runSqlWriteOnly(
        `INSERT INTO conditions ( "view_column_id", "conditional_expression", "conditional_value" )
            VALUES ( :viewColumnId, :conditionalExpression, :conditionalValue );`,
        {
            ":viewColumnId": viewColumnInfo.viewColumnId.replace("d",""),
            ":conditionalExpression": conditionalExpression,
            ":conditionalValue": conditionalValue,
        },
    );
}
