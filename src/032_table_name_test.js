import fs from 'fs';
import path from 'path';
import {
  createRecord,
  updateRecord,
  deleteRecord,
  delete_table,
} from "./036_search_text_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  getPath,
} from "./048_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./042_primary_key_validate.js";
import {
  createColumn,
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
} from "./039_data_type_validate.js";
import {
  startUp,  // プログラム起動
  clearCache,  // インメモリキャッシュを削除する
  createTable,  // テーブルを作成
  deleteTable,  // 不可逆的にテーブルを削除
  disableTable,  // テーブルを無効化
  enableTable,  // テーブルを再度有効化
  updateTableName,  // テーブル名を変更
  listTables,  // テーブルの一覧を取得(重)
  runSqlReadOnly,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly,  // SQLクエリ実行（書き込み専用）
  checkTableEnabled,  // テーブルが有効なのか判定
  getTableName,  // IDからテーブル名を取得
} from "./033_table_name_validate.js";
import { setBugMode } from "./034_table_name.js";


export async function test032() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 20; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「table_name」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「table_name」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    await createTable("クラス一覧");
    const {tableId} = await createTable("名簿");
    await createColumn( tableId, "c1", "INTEGER" );
    await createColumn( tableId, "c2", "REAL" );
    await createColumn( tableId, "c3", "TEXT" );
    await createColumn( tableId, "c4", "BOOL" );
    await checkTableEnabled( tableId );
    await disableTable( tableId );
    await enableTable( tableId );
    await checkTableEnabled( tableId );
    await clearCache();
    await updateTableName({
        "id": tables,
        "name": "変更後のテーブル名",
    });
    const { tables } = await listTables( 1, 100, false );
    if(tables.length!==2){
        throw "テーブルの個数が想定外です";
    }
    const matrix = await runSqlReadOnly(`SELECT * FROM 変更後のテーブル名`,{});
    await runSqlWriteOnly(`SELECT * FROM 変更後のテーブル名`,{});
    await listDataTypes( tableId );
    const tableName = await getTableName( tableId );
    if(tableName!=="変更後のテーブル名"){
        throw "想定外のテーブル名です";
    }
    await deleteTable(tableId);
    await close();

}