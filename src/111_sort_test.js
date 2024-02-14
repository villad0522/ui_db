import fs from 'fs';
import path from 'path';
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
  reload,
} from "./115_data_type_validate.js";
import {
  getLocalIp,
} from "./133_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./121_transaction_lower_validate.js";
import {
  getPath,
} from "./130_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./127_connect_database_validate.js";
import {
  getTimestamp,
} from "./124_timezone_validate.js";
import {
  getPrimaryKey,
} from "./118_primary_key_validate.js";
import {
  cutRecord,  // レコードを切り取る
  copyRecord,  // レコードをコピーする
  pasteRecord,  // レコードを貼り付ける
  getCuttingRecord,  // 切り取り中のレコードを取得する
  getCopyingRecord,  // コピー中のレコードを取得する
  _moveRecord,  // 【サブ関数】レコードを移動する
  _copyRecord,  // 【サブ関数】レコードをコピーする
  _generateRecordSortNumber,  // 【サブ関数】ソート番号を発行する
  deleteRecords,  // レコードを一括削除
} from "./112_sort_validate.js";
import { setBugMode } from "./113_sort.js";


export async function test111() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 21; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            // 意図的に埋め込んだバグを正常に検出できた場合。
            while(true){
                try{
                    // 次のテストに影響を与えないように、データベースを閉じる。
                    await close();
                }
                catch(err) {}
                break;
            }
            continue;
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「sort」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「sort」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    

}