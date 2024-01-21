// 並び替え
//
import {
  startUp,
  createRecord,
  updateRecord,
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./052_search_text_validate.js";
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
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./064_column_name_validate.js";
import {
  getPrimaryKey,
} from "./073_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./055_relation_validate.js";
import {
  listDataTypes,
} from "./070_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./061_reserved_word_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./058_record_title_2_validate.js";
import {
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
}
