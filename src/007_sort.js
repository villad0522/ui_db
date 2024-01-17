// 並び替え
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./008_relation_test.js";
import {
  getLocalIp,
} from "./028_ip_address_test.js";
import {
  getPath,
} from "./026_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./024_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./014_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./018_search_text_test.js";
import {
  getPrimaryKey,
} from "./022_layerName_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./020_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./012_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./016_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./010_record_title_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  try {
    // テーブルを作成する（ソート番号を保存するため）
    await reserveWord("sort_numbers"); // 予約語に登録
    await runSqlWriteOnly(
      `CREATE TABLE IF NOT EXISTS sort_numbers (
        table_id TEXT NOT NULL,
        record_id INTEGER NOT NULL,
        sort_number REAL NOT NULL DEFAULT '1',
        UNIQUE( table_id, record_id )
      );`,
      {},
    );
  }
  catch (err) {
    throw `システム管理用テーブルの作成に失敗しました。${String(err)}`;
  }
  await _reload();    // メモリに再読み込み
}


//【サブ関数】メモリに再読み込み
async function _reload() {
  throw "この関数は未実装です。";
}
