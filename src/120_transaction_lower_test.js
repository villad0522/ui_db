import fs from 'fs';
import path from 'path';
import {
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
import {
  getTimestamp,
} from "./124_timezone_validate.js";
import {
  startUp,  // プログラム起動
  startTransaction,  // トランザクション処理開始
  endTransaction,  // トランザクション処理終了
  close,  // バックエンドプログラム終了
} from "./121_transaction_lower_validate.js";
import { setBugMode } from "./122_transaction_lower.js";


export async function test120() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 8; i++ ) {
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
        console.log(`レイヤー「transaction_lower」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「transaction_lower」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    await getDebugMode();
    for( let i=0; i<100; i++ ){
      if( Math.random()<0.5 ){
        await startTransaction();
      }
      else{
        await endTransaction();
      }
    }
    await close();
    //
    await startUp("http://localhost:3000/", true);
    //
    // わざと再接続
    await startUp("localhost:3000", true);
    //
    await close();

}