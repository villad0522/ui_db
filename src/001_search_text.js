// 文字列検索
//
import {
  startUp,
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  createColumn,
  listColumns,
  disableColumn,
  enableColumn,
  updateColumnName,
} from "./002_columnName_test.js";
import {
  getLocalIp,
} from "./012_ip_address_test.js";
import {
  getPath,
} from "./010_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./008_connect_database_test.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./006_data_type_test.js";
import {
  createTable,
  deleteTable,
  disableTable,
  enableTable,
  updateTableName,
  listTables,
} from "./004_tableName_test.js";

// CSVファイルインポート
export async function createRecordsFromCsv_core( tableId, filePath, columnSize ){
  throw "この関数は未実装です。";
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
  throw "この関数は未実装です。";
}

// レコードを作成
export async function createRecord_core( tableId, recordData ){
  throw "この関数は未実装です。";
}

// レコードを上書き
export async function updateRecord_core( tableId, recordId, recordData ){
  throw "この関数は未実装です。";
}

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  try {
    // テーブルを作成する（検索のため）
    await createTable("search_text");
    //
    // テーブルを作成する（検索テーブルの情報が最新かどうかを保存するため）
    await createTable("is_search_text_latest");
    await runSqlWriteOnly(
      `CREATE TABLE IF NOT EXISTS is_search_text_latest (
        "table_id" INTEGER NOT NULL,
        "data_type" TEXT NOT NULL,
        "created_at" INTEGER NOT NULL
      );`,
      {},
    );
  }
  catch (err) {
    throw `システム管理用テーブルの作成に失敗しました。\n${String(err)}`;
  }
}

// 不可逆的にテーブルを削除
export async function delete_table_core( tableId ){
  await runSqlWriteOnly(
    `DELETE FROM data_types
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,
    },
  );
  return await delete_table( tableId );  // 下層の関数を呼び出す
}
