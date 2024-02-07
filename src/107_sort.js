// 並び替え
//
import {
  startUp,
  clearCache,
  createColumn,
  listDataTypes,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  createTable,
  deleteTable,
  getDataType,
  deleteRecords,
  reload,
} from "./109_data_type_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  getPath,
} from "./121_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./118_connect_database_validate.js";
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




// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
}

// レコードを切り取る
export async function cutRecord_core( tableId, recordId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// レコードをコピーする
export async function copyRecord_core( tableId, recordId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// レコードを貼り付ける
export async function pasteRecord_core( tableId, beforeRecordId, afterRecordId ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// 切り取り中のレコードを取得する
export async function getCuttingRecord_core( tableId ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// コピー中のレコードを取得する
export async function getCopyingRecord_core( tableId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// 【サブ関数】レコードを移動する
export async function _moveRecord_core( tableId, recordId, beforeRecordId, afterRecordId ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// 【サブ関数】レコードをコピーする
export async function _copyRecord_core( tableId, recordId, beforeRecordId, afterRecordId ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// 【サブ関数】ソート番号を発行する
export async function _generateRecordSortNumber_core( tableId, beforeRecordId, afterRecordId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  if( afterRecordId ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // 特定のページの直前に挿入する場合
    const pages = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM pages
        WHERE static_parent_id = :parentId
          AND sort_number <= ( SELECT sort_number FROM pages WHERE page_id = :afterId )
        ORDER BY sort_number DESC
        LIMIT 2;`,
      {
        ":afterId" : afterRecordId,
        ":tableId": tableId,
      },
    );
    if( pages.length===2 ){
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の、直前と直後のページが両方取得できた場合
      const sortNumberBefore = pages[1]["sortNumber"];
      const sortNumberAfter = pages[0]["sortNumber"];
      if( sortNumberBefore > sortNumberAfter ){
        throw `ソート番号の大小関係が想定外です。`;
      }
      return sortNumberBefore + ((sortNumberAfter-sortNumberBefore)/2);
    }
    else if( pages.length===1 ){
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の直後のページしか取得できなかった場合
      // （先頭に挿入する場合）
      const sortNumberAfter = pages[0]["sortNumber"];
      if( sortNumberAfter < 0 ){
        throw `ソート番号が負の数です。`;
      }
      return sortNumberAfter / 2;
    }
    else{
      throw `ページを移動しようとしましたが、移動先の「直後のページ」が取得できませんでした`;
    }
  }
  else{
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾に追加する場合
    const pages = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM pages
        WHERE static_parent_id = :parentId
        ORDER BY sort_number DESC
        LIMIT 1;`,
      {
        ":tableId": tableId,
      },
    );
    if( pages.length===0 ){
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      // 兄弟が存在しない場合
      // （空のページに挿入する場合）
      return 64;
    }
    else{
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      // 既に兄弟が存在する場合
      const sortNumberBefore = pages[0]["sortNumber"];
      return sortNumberBefore + 8;
    }
  }
}
