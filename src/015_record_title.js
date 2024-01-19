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
} from "./018_column_name_test.js";
import {
  getLocalIp,
} from "./032_ip_address_test.js";
import {
  getPath,
} from "./030_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./028_connect_database_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./022_search_text_test.js";
import {
  getPrimaryKey,
} from "./026_layerName_test.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./016_reserved_word_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
} from "./024_data_type_test.js";
import {
  disableTable,
  enableTable,
  listTables,
  checkTableEnabled,
  getTableName,
} from "./020_table_name_test.js";

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