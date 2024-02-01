// プライマリキー
//
import {
  startUp,
  startTransaction,
  endTransaction,
} from "./109_transaction_lower_validate.js";
import {
  getLocalIp,
} from "./118_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./106_csv_validate.js";
import {
  getPath,
} from "./115_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./112_connect_database_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}






// プライマリキーを取得する関数
export async function getPrimaryKey_core( tableId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    if( !String(tableId).startsWith("t") ){
        throw `テーブルIDに無効な文字列「${tableId}」が指定されました。`;
    }
    const tableNumber = String(tableId).replace("t","");
    if( isNaN(tableNumber) ){
        throw `テーブルIDに無効な文字列「${tableId}」が指定されました。`;
    }
    return `t${tableNumber}_id`;
}
