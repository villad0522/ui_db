import fs from 'fs';
import path from 'path';
import {
  startUp,
  close,
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./133_connect_database_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  getPrimaryKey,  // プライマリキーを取得する関数
} from "./124_primary_key_validate.js";
import { setBugMode } from "./125_primary_key.js";


export async function test123() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 1; i++ ) {
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
        console.log(`レイヤー「primary_key」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「primary_key」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    const primaryKey = await getPrimaryKey("t999");
    if(primaryKey!=="t999_id"){
        throw "想定外のプライマリキーです。";
    }

}