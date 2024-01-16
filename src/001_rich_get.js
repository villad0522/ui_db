// 結合して一覧表示
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  listColumns,
} from "./002_relation_test.js";
import {
  getLocalIp,
} from "./022_ip_address_test.js";
import {
  getPath,
} from "./020_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./018_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
} from "./008_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./012_search_text_test.js";
import {
  getPrimaryKey,
} from "./016_layerName_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./014_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./006_reserved_word_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumn,
} from "./004_record_title_test.js";
import {
  checkTableEnabled,
} from "./010_table_name_test.js";

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
async function _reload() 
{ throw "この関数は未実装です。";
}

// レコードの一覧を取得
export async function listRecords_core( tableId, pageNumber_records, onePageMaxSize, isTrash ){
     //
    let sql = "";
    sql += `SELECT\n`;
    sql += `  sort_numbers.sort_number AS sort_number\n`;
    sql += `FROM "${tableId}" AS main_table\n`;
    sql += `  LEFT OUTER JOIN sort_numbers\n`;
    sql += `    ON ( main_table.record_id = sort_numbers.record_id AND sort_numbers.table_id = '${tableId}' )\n`;
    sql += joinCommand;
    sql += `  WHERE ${await _whereCommand()}\n`
    sql += `  LIMIT ${limit};\n`;
    //
    // ダブルクォーテーションを、バッククォートに置き換える
    sql = sql.replace(/"/g, '`');
    //
    console.log( sql );
}

async function _whereCommand(){

}