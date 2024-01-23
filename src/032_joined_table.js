// テーブル結合
//
import {
  startUp,
  createPage,
  updatePageName,
  getPageInfo,
  listPagesFromTableId,
  getTableFromPage,
  createJoinedTable,
} from "./034_pages_validate.js";
import {
  getLocalIp,
} from "./091_ip_address_validate.js";
import {
  getPath,
} from "./088_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
} from "./085_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./073_column_name_validate.js";
import {
  close,
} from "./037_frontend_files_validate.js";
import {
  getPrimaryKey,
} from "./082_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./064_relation_validate.js";
import {
  listDataTypes,
} from "./079_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./058_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./070_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./061_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./076_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./067_record_title_2_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./052_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./049_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./046_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./043_generate_sql1_validate.js";
import {
  generateSQL,
} from "./040_generate_sql_validate.js";


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
    await reserveWord("joined_columns"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS joined_columns (
            "joined_column_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "page_id" INTEGER NOT NULL,
            "joined_column_type" TEXT NOT NULL,
            "column_path" TEXT NOT NULL,
            "joined_column_name" TEXT NOT NULL,
            "excel_column_index" INTEGER NOT NULL,
            FOREIGN KEY (page_id) REFERENCES joined_tables(page_id),
            UNIQUE (page_id, excel_column_index)
        );`,
        {},
    );
    //
    await reserveWord("conditions"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS conditions (
            "condition_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "joined_column_id" INTEGER NOT NULL,
            "conditional_expression" TEXT NOT NULL,
            FOREIGN KEY (joined_column_id) REFERENCES joined_columns(joined_column_id)
        );`,
        {},
    );
    //
    await reserveWord("sort_orders"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS sort_orders (
            "joined_column_id" INTEGER PRIMARY KEY,
            "is_ascending" INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (joined_column_id) REFERENCES joined_columns(joined_column_id)
        );`,
        {},
    );
}



// 結合済みテーブルを作成
export async function createJoinedTable_core( pageId, tableId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createJoinedTable( pageId, tableId );  // 下層の関数を実行する
    await _deleteJoinedColumns( pageId );
    //
    // 自動的に列を表示設定にしてあげる
    const columns = await listColumnsAll( tableId );
    for( const { id, name, dataType, parentTableId } of columns ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // 文字列からアンダーバー（_）以降を切り取る
        const columnName = _cutStringAfterUnderscore(name);
        if( dataType !== "POINTER" ){
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            // 列を表示設定にする
            await addJoinedColumn_core(
                pageId,
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
            console.error(`createJoinedTable > タイトル列が設定されていません。${parentTableId}`);
            continue;
        }
        // 列を表示設定にする
        await addJoinedColumn_core(
            pageId,
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


// 結合済みテーブルを削除
export async function deleteJoinedTable_core( pageId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    await _deleteJoinedColumns( pageId );
    return await deleteJoinedTable( pageId );  // 下層の関数を実行する
}


// 結合済みテーブルを削除
async function _deleteJoinedColumns( pageId ){
    // 外部キー制約があるため、消す順番に注意！
    await runSqlWriteOnly(
        `DELETE FROM sort_orders
            WHERE sort_orders.joined_column_id IN
            (
                SELECT joined_columns.joined_column_id
                FROM joined_columns
                WHERE joined_columns.page_id = :pageId
            );`,
        {
            ":pageId": pageId,
        },
    );
    await runSqlWriteOnly(
        `DELETE FROM conditions
            WHERE joined_column_id IN
            (
                SELECT joined_column_id
                FROM joined_columns
                WHERE page_id = :pageId
            );`,
        {
            ":pageId": pageId,
        },
    );
    await runSqlWriteOnly(
        `DELETE FROM joined_columns
            WHERE page_id = :pageId;`,
        {
            ":pageId": pageId,
        },
    );
}



// SQLクエリを生成
export async function generateSQL_core( pageId ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = await getTableFromPage( pageId );
    if( !tableId ){
        throw `指定されたページには、動的リストが登録されていません。\npageId = ${pageId}`;
    }
    const joinedColumns = await runSqlReadOnly(
        `SELECT
            "d" || joined_column_id AS joinedColumnId,
            joined_column_type AS joinedColumnType,
            column_path AS columnPath,
            joined_column_name AS joinedColumnName,
            excel_column_index AS excelColumnIndex
        FROM joined_columns
        WHERE page_id = :pageId
        ORDER BY excel_column_index ASC;`,
        {
            ":pageId": pageId,
        },
    );
    const conditionInfoList = await runSqlReadOnly(
        `SELECT
            "d" || conditions.joined_column_id AS joinedColumnId,
            conditions.conditional_expression AS conditionalExpression
        FROM conditions
        INNER JOIN joined_columns
            ON conditions.joined_column_id = joined_columns.joined_column_id
        WHERE joined_columns.page_id = :pageId;`,
        {
            ":pageId": pageId,
        },
    );
    const sortOrders = await runSqlReadOnly(
        `SELECT
            "d" || sort_orders.joined_column_id AS joinedColumnId,
            sort_orders.is_ascending AS isAscending
        FROM sort_orders
        INNER JOIN joined_columns
            ON sort_orders.joined_column_id = joined_columns.joined_column_id
        WHERE joined_columns.page_id = :pageId;`,
        {
            ":pageId": pageId,
        },
    );
    const { sql, parameters } = await generateSQL(
        tableId,
        joinedColumns,
        conditionInfoList,
        sortOrders
    );
    return { sql, parameters };
}


// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createColumn( tableId, columnName, dataType, parentTableId );    // 下層の関数を呼び出す
    //
    const pageIdList = await listPagesFromTableId( tableId );
    if( dataType !== "POINTER" ){
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        // 列を表示設定にする
        for( const pageId of pageIdList ){
            if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
            await addJoinedColumn_core({ 
                pageId: pageId,
                joinedColumnType: "RAW",
                columnPath: `main.${result.columnId}`,
                joinedColumnName: columnName,
            });
        }
        return result;
    }
    const parentColumnId = await getTitleColumnId( parentTableId );
    if(!parentColumnId){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`タイトル列が設定されていません。${parentTableId}`);
        return result;
    }
    // 列を表示設定にする
    for( const pageId of pageIdList ){
        if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
        await addJoinedColumn_core({ 
            pageId: pageId,
            joinedColumnType: "RAW",
            columnPath: `main.${result.columnId} > ${parentColumnId}`,
            joinedColumnName: columnName,
        });
    }
    return result;
}



// 結合済み列を作成
export async function addJoinedColumn_core( pageId, joinedColumnType, columnPath, joinedColumnName ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    if( typeof pageId !== "number" || isNaN(pageId) ){
        throw `ページIDが数値ではありません`;
    }
    //
    // excelの空いている列を見つける
    const matrix = await runSqlReadOnly(
        `SELECT excel_column_index AS excelColumnIndex
            FROM joined_columns
            WHERE page_id = :pageId
            ORDER BY excel_column_index ASC;`,
        {
            ":pageId": pageId,
        },
    );
    const numbers = new Set();
    for( const { excelColumnIndex } of matrix ){
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        numbers.add( excelColumnIndex );
    }
    let excelColumnIndex;
    for( let i=0; i<=numbers.size; i++ ){
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        if(!numbers.has(i)){
            if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
            excelColumnIndex = i;
            break;
        }
    }
    // 列を表示設定にする
    await runSqlWriteOnly(
        `INSERT INTO joined_columns(
            page_id,
            joined_column_type,
            column_path,
            joined_column_name,
            excel_column_index
        ) VALUES (
            :pageId,
            :joinedColumnType,
            :columnPath,
            :joinedColumnName,
            :excelColumnIndex
        );`,
        {
            ":pageId": pageId,
            ":joinedColumnType": joinedColumnType,
            ":columnPath": columnPath,
            ":joinedColumnName": joinedColumnName,
            ":excelColumnIndex": excelColumnIndex,
        },
    );
}