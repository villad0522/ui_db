import fs from 'fs';
import path from 'path';
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./024_relation_validate.js";
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
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./033_column_name_validate.js";
import {
  getPrimaryKey,
} from "./042_primary_key_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./039_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./030_reserved_word_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./036_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./027_record_title_validate.js";
import {
  startUp,  // プログラム起動
  createRecord,  // レコードを作成
  updateRecord,  // レコードを上書き
  delete_table,  // 不可逆的にテーブルを削除
  deleteRecord,  // レコードを削除
  disableTable,  // テーブルを無効化
  enableTable,  // テーブルを再度有効化
  disableColumn,  // カラムを無効化
  enableColumn,  // カラムを再度有効化
} from "./021_search_text_validate.js";
import { setBugMode } from "./022_search_text.js";


export async function test020() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 17; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「search_text」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「search_text」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  await startUp("http://localhost:3000/", true);
  const { tableId: tableId } = await createTable("名簿");
  const { columnId: columnId } = await createColumn( tableId, "氏名", "TEXT", null );
  await createRecord( tableId, {
    [columnId]: "データベースの最大サイズの項目によれば、データベースは最大281TBまでとなっています。",
  });
  //
  await close();

}