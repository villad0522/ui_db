// 文字列検索
//
import {
  startUp,
  clearCache,
  createColumn,
  listDataTypes,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  createTable,
  deleteTable,
  getDataType,
  deleteRecord,
} from "./039_data_type_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  getPath,
} from "./048_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  runSqlReadOnly,
  runSqlWriteOnly,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./042_primary_key_validate.js";


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
    // テーブルを作成する（検索のため）
    await runSqlWriteOnly(
      `CREATE TABLE IF NOT EXISTS search_text (
        table_id TEXT NOT NULL,
        column_id TEXT NOT NULL,
        record_id TEXT NOT NULL,
        original_text TEXT NOT NULL,
        roman_alphabet TEXT NOT NULL
      );`,
      {},
    );
  }
  catch (err) {
    throw `システム管理用テーブルの作成に失敗しました。\n${String(err)}`;
  }
}

// レコードを作成
export async function createRecord_core( tableId, recordData ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  return await createRecord( tableId, recordData ); // 下層の関数を呼び出す
}

// レコードを上書き
export async function updateRecord_core( tableId, records ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `DELETE FROM search_text
    WHERE table_id = :tableId
      AND record_id = :recordId;`,
    {
      ":tableId": tableId,
      ":recordId": recordId,
    },
  );
  return await updateRecord( tableId, records );  // 下層の関数を呼び出す
}

// 不可逆的にテーブルを削除
export async function delete_table_core( tableId ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `DELETE FROM search_text
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,
    },
  );
  return await delete_table( tableId );  // 下層の関数を呼び出す
}

// レコードを削除
export async function deleteRecord_core( tableId, records ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  return await deleteRecord( tableId, records );  // 下層の関数を呼び出す
}
