// プライマリキー
//
import {
  startUp,
  getDebugMode,
  startTransaction,
  endTransaction,
  runSqlReadOnly,
  runSqlWriteOnly,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./028_connect_database_test.js";
import {
  getLocalIp,
} from "./032_ip_address_test.js";
import {
  getPath,
} from "./030_directory_test.js";

// プライマリキーを取得する関数
export async function getPrimaryKey_core( tableId ){
    if( !String(tableId).startsWith("t") ){
        throw `テーブルIDに無効な文字列「${tableId}」が指定されました。`;
    }
    const tableNumber = String(tableId).replace("t","");
    if( isNaN(tableNumber) ){
        throw `テーブルIDに無効な文字列「${tableId}」が指定されました。`;
    }
    return `t${tableNumber}_id`;
}
