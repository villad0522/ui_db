// レコードの見出し(下)
//
import {
  startUp,
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  deleteTable,
  disableColumn,
  enableColumn,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
} from "./064_column_name_validate.js";
import {
  getLocalIp,
} from "./082_ip_address_validate.js";
import {
  getPath,
} from "./079_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./076_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./073_primary_key_validate.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./061_reserved_word_validate.js";
import {
  listDataTypes,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  getDataType,
  deleteRecord,
} from "./070_data_type_validate.js";
import {
  disableTable,
  enableTable,
  listTables,
  checkTableEnabled,
  getTableName,
} from "./067_table_name_validate.js";


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
  // テーブルを作成する（見出しの役割を果たすカラムを登録するため）
  await reserveWord("title_columns"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS title_columns (
      table_id TEXT PRIMARY KEY,
      title_column_id TEXT NOT NULL
    );`,
    {},
  );
  await _reload();    // メモリに再読み込み
}

let cacheData = {};

//【サブ関数】メモリに再読み込み
async function _reload() {
  const matrix = await runSqlReadOnly(
    `SELECT
      table_id AS tableId,
      title_column_id AS titleColumnId
    FROM title_columns;`,
    {},
  );
  cacheData = {};
  for( const { tableId, titleColumnId } of matrix ){
    cacheData[tableId] = titleColumnId;
  }
}

// 見出しの役割を果たすカラムを登録する
export async function setTitleColumn_core( columnId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  const tableId = await getTableId( columnId );
  await runSqlWriteOnly(
    `INSERT OR REPLACE INTO title_columns ( table_id, title_column_id )
        VALUES ( :tableId, :titleColumnId );`,
    {
        ":tableId": tableId,
        ":titleColumnId": columnId,   // 見出しの役割を果たすカラム
    },
  );
  await _reload();    // メモリに再読み込み
}

// 見出しの役割を果たすカラムを取得する
export async function getTitleColumnId_core( tableId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData[tableId];
}

// テーブルの一覧を取得(重)
export async function listTables_core( pageNumber, onePageMaxSize, isTrash ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  // 下層の関数を実行する
  const { tables, total } = await listTables( pageNumber, onePageMaxSize, isTrash );
  // 下層から得たテーブルの一覧に、「titleColumnId」を付け加えて上層に提供する
  for( let i=0; i<tables.length; i++ ){
    if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = tables[i].id;
    tables[i].titleColumnId = cacheData[tableId];
  }
  return {
    "tables": tables,
    "total": total,
  }
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM title_columns
            WHERE table_id = :tableId;`,
        {
            ":tableId": tableId,
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTable( tableId );  // 下層の関数を実行する
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}


// 文字列からレコードIDを取得
export async function getRecordIdFromTitle_core( tableId, titleText ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  const titleColumnId = cacheData[tableId];
  if(!titleColumnId){
    throw `文字列からマスターデータのIDを取得しようとしましたが、見出しの役割を果たすカラムが未設定です。\nテーブルID = ${tableId}`;
  }
  const primaryKey = await getPrimaryKey( tableId );
  const matrix = await runSqlReadOnly(
    `SELECT ${primaryKey} AS "recordId"
    FROM ${tableId}
    WHERE ${titleColumnId} = :title
    LIMIT 2;`,
    {
      ":title" : titleText,
    },
  );
  if(matrix.length===0){
    if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    return null;
  }
  else if(matrix.length===1){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    return matrix[0]["recordId"];
  }
  else{
    throw `文字列からマスターデータのIDを取得しようとしましたが、複数のマスターデータが見つかりました。\nテーブルID = ${tableId}\n文字列="${titleText}"`;
  }
}
