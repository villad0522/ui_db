// レコードの見出し
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
  test020,
} from "./020_column_name_test.js";
import {
  getLocalIp,
  test034,
} from "./034_ip_address_test.js";
import {
  getPath,
  test032,
} from "./032_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
  test030,
} from "./030_connect_database_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
  test024,
} from "./024_search_text_test.js";
import {
  getPrimaryKey,
  test028,
} from "./028_layerName_test.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  test018,
} from "./018_reserved_word_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
  test026,
} from "./026_data_type_test.js";
import {
  disableTable,
  enableTable,
  listTables,
  checkTableEnabled,
  getTableName,
  test022,
} from "./022_table_name_test.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
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
  await runSqlWriteOnly(
    `INSERT INTO title_columns ( table_id, title_column_id )
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
  return cacheData[tableId];
}

// テーブルの一覧を取得(重)
export async function listTables_core( pageNumber, onePageMaxSize, isTrash ){
  // 下層の関数を実行する
  const { tables, total } = await listTables( pageNumber, onePageMaxSize, isTrash );
  // 下層から得たテーブルの一覧に、「titleColumnId」を付け加えて上層に提供する
  for (const { id } of tables) {
    if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    tables.titleColumnId = cacheData[id];
  }
  return {
    "tables": tables,
    "total": total,
  }
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
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
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}