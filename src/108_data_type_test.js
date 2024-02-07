import fs from 'fs';
import path from 'path';
import {
  close,
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
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
import {
  startUp,  // プログラム起動
  clearCache,  // インメモリキャッシュを削除する
  createColumn,  // カラムを作成
  listDataTypes,  // データ型の一覧を取得
  createRecord,  // レコードを作成
  updateRecords,  // レコードを上書き
  checkField,  // フィールドを検証
  checkRecord,  // レコードを検証
  createTable,  // テーブルを作成
  deleteTable,  // 不可逆的にテーブルを削除
  getDataType,  // データ型を取得
  deleteRecords,  // レコードを一括削除
  reload,  // 【サブ関数】メモリに再読み込み
} from "./109_data_type_validate.js";
import { setBugMode } from "./110_data_type.js";


export async function test108() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 41; i++ ) {
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
        console.log(`レイヤー「data_type」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「data_type」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    //
    await createTable("t88");
    await createColumn( "t88", "c1", "FILE" );
    //
    await createTable("t67");
    await createColumn( "t67", "c2", "INTEGER" );
    await createColumn( "t67", "c3", "REAL" );
    await createColumn( "t67", "c4", "TEXT" );
    await createColumn( "t67", "c5", "BOOL" );
    //
    if( await getDataType("c1") !== "FILE" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( await getDataType("c2") !== "INTEGER" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( await getDataType("c3") !== "REAL" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( await getDataType("c4") !== "TEXT" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( await getDataType("c5") !== "BOOL" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    await clearCache();
    //
    const dataTypes = await listDataTypes("t67");
    if( dataTypes["c2"] !== "INTEGER" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( dataTypes["c3"] !== "REAL" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( dataTypes["c4"] !== "TEXT" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    if( dataTypes["c5"] !== "BOOL" ){
        throw "関数が想定通りの動作をしませんでした。";
    }
    //
    await checkField( "c2", 23 );
    await checkField( "c3", 3.14 );
    await checkField( "c4", "hello" );
    await checkField( "c5", false );
    await checkRecord( "t67", {
        "c2": 23,
        "c3": 3.14,
        "c4": "hello",
        "c5": false,
    });
    const { recordId } = await createRecord( "t67", {
        "c2": 23,
        "c3": 3.14,
        "c4": "hello",
        "c5": false,
    });
    await updateRecords( "t67", [{
        "id": recordId,
        "c2": 13,
        "c3": 6.14,
        "c4": "good",
        "c5": true,
    }]);
    await deleteRecord( "t67", [{
        "t67_id": recordId,
    }]);
    const { recordId: recordId2 } = await createRecord( "t67", {
        "c2": 23,
        "c3": 3.14,
        "c4": "hello",
        "c5": false,
    });
    const { recordId: recordId3 } = await createRecord( "t67", {
        "c2": 23,
        "c3": 3.14,
        "c4": "hello",
        "c5": false,
    });
    await deleteTable("t67");
    //
    await close();

}