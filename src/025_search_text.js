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
  test026,
} from "./026_data_type_test.js";
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
  runSqlReadOnly,
  runSqlWriteOnly,
  createRecordsFromCsv,
  getCsvProgress,
  close,
  test030,
} from "./030_connect_database_test.js";
import {
  getPrimaryKey,
  test028,
} from "./028_layerName_test.js";


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
