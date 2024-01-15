// リレーション
//
import {
  startUp,
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  disableColumn,
  enableColumn,
  listColumns,
  getTableId,
} from "./006_column_name_test.js";
import {
  getLocalIp,
} from "./018_ip_address_test.js";
import {
  getPath,
} from "./016_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./014_connect_database_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./010_search_text_test.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./004_reserved_word_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./012_data_type_test.js";
import {
  deleteTable,
  disableTable,
  enableTable,
  listTables,
} from "./008_table_name_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  //
  // テーブルを作成する（リレーションを保存するため）
  await reserveWord("relations"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS relations (
      child_column_id TEXT PRIMARY KEY,
      child_table_id TEXT NOT NULL,
      parent_table_id TEXT NOT NULL
    );`,
    {},
  );
  //
  // テーブルを作成する（タイトルキーを保存するため）
  await reserveWord("titles"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS titles (
      table_id TEXT PRIMARY KEY,
      title_column_id TEXT NOT NULL
    );`,
    {},
  );
  await _reload();    // メモリに再読み込み
}

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if( dataType !== "POINTER" && !parentTableId ){
    // 外部キーではない場合
    return await createColumn( tableId, columnName, dataType );
  }
  // 外部キーの場合
  if( dataType !== "POINTER" ){
    throw `外部キーを作成する際は、dataTypeに"POINTER"を指定したうえで、parentTableIdも指定してください。`;
  }
  if( !parentTableId ){
    throw `外部キーを作成する際は、dataTypeに"POINTER"を指定したうえで、parentTableIdも指定してください。`;
  }
  const result = await createColumn( tableId, columnName, "INTEGER" );
  await runSqlWriteOnly(
    `INSERT INTO relations( child_column_id, child_table_id, parent_table_id )
        VALUES ( :childColumnId, :childTableId, :parentTableId );`,
    {
        ":childColumnId": result.columnId,
        ":childTableId": tableId,
        ":parentTableId": parentTableId
    },
  );
  await _reload();    // メモリに再読み込み
  return result;
}
