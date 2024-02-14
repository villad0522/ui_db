// 時刻とタイムゾーン
//
import {
  startUp,
  close,
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./127_connect_database_validate.js";
import {
  getLocalIp,
} from "./133_ip_address_validate.js";
import {
  getPath,
} from "./130_directory_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// 協定世界時(UTC)のタイムスタンプを取得する
export async function getTimestamp_core( dateObject ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    if(!dateObject){
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        dateObject = new Date();
    }
    return dateObject.getTime();
}
