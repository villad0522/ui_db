// 並び替え
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./064_record_title_2_validate.js";
import {
  getLocalIp,
} from "./100_ip_address_validate.js";
import {
  getPath,
} from "./097_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./094_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./082_column_name_validate.js";
import {
  getPrimaryKey,
} from "./091_primary_key_validate.js";
import {
  listDataTypes,
} from "./088_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./061_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./079_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./073_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./076_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./085_table_name_validate.js";
import {
  formatField,
} from "./070_db_formatter_validate.js";
import {
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
} from "./067_input_element_validate.js";


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
