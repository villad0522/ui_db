import fs from 'fs';
import path from 'path';
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./024_record_title_validate.js";
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
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./030_column_name_validate.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./036_search_text_validate.js";
import {
  getPrimaryKey,
} from "./042_primary_key_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./027_reserved_word_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  deleteRecord,
} from "./039_data_type_validate.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./033_table_name_validate.js";
import {
  startUp,  // プログラム起動
  createColumn,  // カラムを作成
  listColumnsForGUI,  // カラムの一覧を取得(GUI)
  clearCache,  // インメモリキャッシュを削除する
  deleteTable,  // 不可逆的にテーブルを削除
  listColumnsAll,  // カラムの一覧を取得
  getParentTableId,  // 参照先のテーブルIDを取得する
  getDataType,  // データ型を取得
} from "./021_relation_validate.js";
import { setBugMode } from "./022_relation.js";


export async function test020() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 19; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「relation」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「relation」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    //
    const {tableId1} = await createTable("学年");
    await createColumn( tableId1, "学年", "INTEGER", null );
    //
    const {tableId2} = await createTable("名簿");
    await createColumn( tableId2, "氏名", "TEXT", null );
    await createColumn( tableId2, "学年", "POINTER", tableId1 );
    //
    await listColumnsAll( tableId2 );
    //
    await deleteTable(tableId2);
    await close();

}