// レコードを削除
//
import {
  startUp,
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./115_csv_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./121_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./112_primary_key_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


// レコードを削除
export async function deleteRecords_core( tableId, records ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}
