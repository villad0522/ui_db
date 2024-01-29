// テーブル結合
//
import {
  startUp,
  deleteView,
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  createView,
  deletePage,
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
} from "./046_pages_validate.js";
import {
  getLocalIp,
} from "./112_ip_address_validate.js";
import {
  getPath,
} from "./109_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./106_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./088_column_name_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./100_csv_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./103_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./097_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./070_record_title_2_validate.js";
import {
  listDataTypes,
} from "./094_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./067_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./085_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./079_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./082_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./091_table_name_validate.js";
import {
  formatField,
} from "./076_db_formatter_validate.js";
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
} from "./073_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./061_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./058_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./055_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./052_generate_sql1_validate.js";
import {
  generateSQL,
} from "./049_generate_sql_validate.js";


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
    await reserveWord("view_columns"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS view_columns (
            "view_column_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "view_id" INTEGER NOT NULL,
            "view_column_type" TEXT NOT NULL,
            "column_path" TEXT NOT NULL,
            "view_column_name" TEXT NOT NULL,
            "excel_column_index" INTEGER NOT NULL,
            FOREIGN KEY (view_id) REFERENCES views(view_id),
            UNIQUE (view_id, excel_column_index)
        );`,
        {},
    );
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



// ビューを作成
export async function createView_core( pageId, tableName ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = await getTableIdFromName(tableName);
    const result = await createView( pageId, tableId );  // 下層の関数を実行する
    //
    // 自動的に列を表示設定にしてあげる
    await _deleteViewColumns( result.viewId );
    const columns = await listColumnsAll( tableId );
    for( const { id, name, dataType, parentTableId } of columns ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // 文字列からアンダーバー（_）以降を切り取る
        const columnName = _cutStringAfterUnderscore(name);
        if( dataType !== "POINTER" ){
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            // 列を表示設定にする
            await addViewColumn_core(
                result.viewId,
                "RAW",
                `main.${id}`,
                columnName,
            );
            continue;
        }
        if( !parentTableId ){
            throw `親テーブルが不明です。\nテーブルID=${tableId}\nカラムID=${id}`;
        }
        const parentColumnId = await getTitleColumnId( parentTableId );
        if(!parentColumnId){
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            console.error(`createView > タイトル列が設定されていません。${parentTableId}`);
            continue;
        }
        // 列を表示設定にする
        await addViewColumn_core(
            result.viewId,
            "RAW",
            `main.${id} > ${parentColumnId}`,
            columnName,
        );
    }
    return result;
}

// 文字列からアンダーバー（_）以降を切り取る関数
function _cutStringAfterUnderscore(inputString) {
    // アンダーバーのインデックスを検索
    const underscoreIndex = inputString.indexOf('_');
    // アンダーバーが見つかった場合
    if (underscoreIndex !== -1) {
        // アンダーバー以降の部分を取得して出力
        const resultString = inputString.substring(underscoreIndex + 1);
        return resultString;
    } else {
        // アンダーバーが見つからなかった場合はそのまま出力
        return inputString;
    }
}


// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    await _deleteViewColumns( viewId );
    return await deleteView( viewId );  // 下層の関数を実行する
}



// ビューを削除
async function _deleteViewColumns( viewId ){
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
    await runSqlWriteOnly(
        `DELETE FROM view_columns
            WHERE view_id = :viewId;`,
        {
            ":viewId": viewId,
        },
    );
}





// SQLクエリを生成
export async function generateSQL_core( viewId, queryParameters ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = await getTableFromView( viewId );
    if( !tableId ){
        throw `指定されたページには、動的リストが登録されていません。\nviewId = ${viewId}`;
    }
    let viewColumns = await runSqlReadOnly(
        `SELECT
            "d" || view_column_id AS viewColumnId,
            view_column_type AS viewColumnType,
            column_path AS columnPath,
            view_column_name AS viewColumnName,
            excel_column_index AS excelColumnIndex
        FROM view_columns
        WHERE view_id = :viewId
        ORDER BY excel_column_index ASC;`,
        {
            ":viewId": viewId,
        },
    );
    for( let i=0; i<viewColumns.length; i++ ){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnPath = viewColumns[i].columnPath;
        viewColumns[i].pathLength = await getPathLength(columnPath);
        viewColumns[i].columnId = await pathToColumnId(columnPath);
    }
    viewColumns = viewColumns.sort((a,b)=>{
        if( a.pathLength > b.pathLength ){
            if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
            return 1;
        }
        else{
            if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
            return -1;
        }
    });
    const buf = {
        //  "c78": [ "d45", "d99" ],
        //  "c6": [ "d12" ],
    };
    for( const { viewColumnId, columnId } of viewColumns ){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        if( !buf[columnId] ){
            if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
            buf[columnId] = [];
        }
        buf[columnId].push(viewColumnId);
    }
    console.log(buf);
    const parameters = {};
    for( const key in queryParameters ){
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        if( viewColumnType==="RAW" ){
            if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = await pathToColumnId(columnPath);
            const value = await formatField( conditionalValue, columnId, false );
            parameters[viewColumnId] = value;
        }
        else{
            if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
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
    const sql = await generateSQL(
        tableId,
        viewColumns,
        conditionInfoList,
        sortOrders
    );
    return { sql, parameters };
}


// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createColumn( tableId, columnName, dataType, parentTableId );    // 下層の関数を呼び出す
    //
    const viewIdList = await listViewsFromTableId( tableId );
    if( dataType !== "POINTER" ){
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
        // 列を表示設定にする
        for( const viewId of viewIdList ){
            if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
            await addViewColumn_core({ 
                viewId: viewId,
                viewColumnType: "RAW",
                columnPath: `main.${result.columnId}`,
                viewColumnName: columnName,
            });
        }
        return result;
    }
    const parentColumnId = await getTitleColumnId( parentTableId );
    if(!parentColumnId){
        if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`タイトル列が設定されていません。${parentTableId}`);
        return result;
    }
    // 列を表示設定にする
    for( const viewId of viewIdList ){
        if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
        await addViewColumn_core({ 
            viewId: viewId,
            viewColumnType: "RAW",
            columnPath: `main.${result.columnId} > ${parentColumnId}`,
            viewColumnName: columnName,
        });
    }
    return result;
}



// 結合済み列を作成
export async function addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    if( typeof viewId !== "number" || isNaN(viewId) ){
        throw `ページIDが数値ではありません`;
    }
    //
    // excelの空いている列を見つける
    const matrix = await runSqlReadOnly(
        `SELECT excel_column_index AS excelColumnIndex
            FROM view_columns
            WHERE view_id = :viewId
            ORDER BY excel_column_index ASC;`,
        {
            ":viewId": viewId,
        },
    );
    const numbers = new Set();
    for( const { excelColumnIndex } of matrix ){
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        numbers.add( excelColumnIndex );
    }
    let excelColumnIndex;
    for( let i=0; i<=numbers.size; i++ ){
        if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
        if(!numbers.has(i)){
            if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
            excelColumnIndex = i;
            break;
        }
    }
    // 列を表示設定にする
    await runSqlWriteOnly(
        `INSERT INTO view_columns(
            view_id,
            view_column_type,
            column_path,
            view_column_name,
            excel_column_index
        ) VALUES (
            :viewId,
            :viewColumnType,
            :columnPath,
            :viewColumnName,
            :excelColumnIndex
        );`,
        {
            ":viewId": viewId,
            ":viewColumnType": viewColumnType,
            ":columnPath": columnPath,
            ":viewColumnName": viewColumnName,
            ":excelColumnIndex": excelColumnIndex,
        },
    );
}