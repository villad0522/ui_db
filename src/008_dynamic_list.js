// 動的リスト
//
import {
  startUp,
  createPage,
  updatePageName,
  getPageInfo,
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
  listEndpoints,
} from "./031_api_info_validate.js";
import {
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
} from "./040_record_title_1_validate.js";
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
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./067_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./076_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./055_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./052_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./049_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./046_generate_sql1_validate.js";
import {
  generateSQL,
} from "./043_generate_sql_validate.js";
import {
  getEndpointInfo,
} from "./022_convert_array_validate.js";
import {
  runApi,
} from "./013_transaction_validate.js";
import {
  updateExcel,
  openExcel,
} from "./010_excel_edit_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




  // displayColumns の例
  //   [
  //     {
  //       displayColumnId: "d28",
  //       type: "RAW",
  //       path: "main.c2 > c53 > c1",
  //       as: "○○",
  //     },
  //     {
  //       displayColumnId: "d66",
  //       type: "COUNT",           // 集合関数。RAW, SUM、MAX、MIN、AVG、COUNT のいずれか。関数を使用しない場合はRAWを代入する。
  //       path: "c89 > c67 > main",
  //       as: "○○の件数",
  //     },
  //     {
  //       displayColumnId: "d43",
  //       type: "MAX",
  //       path: "c45 > c56 > main",
  //       as: "○○の最大値",
  //     }
  //   ]
  //
  // conditions の例
  //   [
  //     {
  //       displayColumnId: "d66",
  //       type: "=",       // !=, =, >, <, <=, >= のいずれか
  //       value: 0,
  //     }
  //   ]
  //
  // sortOrder の例
  //   [
  //     {
  //       displayColumnId: "d78",
  //       isAscending: true,
  //     }
  //   ]

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    await reserveWord("display_columns"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS display_columns (
            "display_column_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "page_id" INTEGER NOT NULL,
            "type" TEXT NOT NULL,
            "path" TEXT NOT NULL,
            "as" TEXT NOT NULL,
            "excel_column_index" INTEGER NOT NULL,
            FOREIGN KEY (page_id) REFERENCES dynamic_lists(page_id),
            UNIQUE (page_id, excel_column_index)
        );`,
        {},
    );
    //
    await reserveWord("conditions"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS conditions (
            "condition_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "display_column_id" INTEGER NOT NULL,
            "type" TEXT NOT NULL,
            FOREIGN KEY (display_column_id) REFERENCES display_columns(display_column_id)
        );`,
        {},
    );
    //
    await reserveWord("sort_orders"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS sort_orders (
            "display_column_id" INTEGER PRIMARY KEY,
            "is_ascending" INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (display_column_id) REFERENCES display_columns(display_column_id)
        );`,
        {},
    );
}



// 動的リストを作成
export async function createDynamicList_core( pageId, tableId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createDynamicList( pageId );  // 下層の関数を実行する
    await _deleteDisplayColumns( pageId );
    //
    // 自動的にカラムを表示設定にしてあげる
    const columns = await listColumnsAll( tableId );
    for( const { id, name, dataType, parentTableId } of columns ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        if( dataType !== "POINTER" ){
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            await _addDisplayColumn({ 
                pageId: pageId,
                type: "RAW",
                path: `main.${id}`,
                as: name,
            });
            continue;
        }
        if( !parentTableId ){
            throw `親テーブルが不明です。\nテーブルID=${tableId}\nカラムID=${id}`;
        }
        const parentColumnId = await getTitleColumnId( parentTableId );
        if(!parentColumnId){
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            console.error(`タイトル列が設定されていません。${parentTableId}`);
            continue;
        }
        await _addDisplayColumn({ 
            pageId: pageId,
            type: "RAW",
            path: `main.${id} > ${parentColumnId}`,
            as: name,
        });
    }
    return result;
}



async function _addDisplayColumn({ pageId, type, path, as }){
    // excelの空いている列を見つける
    const matrix = await runSqlReadOnly(
        `SELECT excel_column_index AS index
            FROM display_columns
            WHERE page_id = :pageId
            ORDER BY excel_column_index ASC;`,
        {
            ":pageId": pageId,
        },
    );
    const numbers = new Set();
    for( const {index} of matrix ){
        numbers.add(index);
    }
    let excelColumnIndex;
    for( let i=0; i<=numbers.size; i++ ){
        if(!numbers.has(i)){
            excelColumnIndex = i;
            break;
        }
    }
    //
    await runSqlWriteOnly(
      `INSERT INTO display_columns( page_id, type, path, as, excel_column_index )
          VALUES ( :pageId, :type, :path, :as, :excelColumnIndex );`,
        {
            ":pageId": pageId,
            ":type": type,
            ":path": path,
            ":as": as,
            ":excelColumnIndex": excelColumnIndex,
        },
    );
}


// 動的リストを削除
export async function deleteDynamicList_core( pageId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    await _deleteDisplayColumns( pageId );
    return await deleteDynamicList( pageId );  // 下層の関数を実行する
}


// 動的リストを削除
async function _deleteDisplayColumns( pageId ){
    await runSqlWriteOnly(
        `DELETE FROM sort_orders
            WHERE display_column_id IN
            (
                SELECT display_column_id
                FROM display_columns
                WHERE page_id = :pageId
            );`,
        {
            ":pageId": pageId,
        },
    );
    await runSqlWriteOnly(
        `DELETE FROM conditions
            WHERE display_column_id IN
            (
                SELECT display_column_id
                FROM display_columns
                WHERE page_id = :pageId
            );`,
        {
            ":pageId": pageId,
        },
    );
    await runSqlWriteOnly(
        `DELETE FROM display_columns
            WHERE page_id = :pageId;`,
        {
            ":pageId": pageId,
        },
    );
}
// SQLクエリを生成
export async function generateSQL_core( pageId, conditions ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}
