import fs from 'fs';
import path from 'path';
import {
  createTable,
  reload,
  disableTable,
  enableTable,
  updateTableName,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
import {
  getLocalIp,
} from "./109_ip_address_validate.js";
import {
  getPath,
} from "./106_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
  destroyCSV,
} from "./103_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./100_primary_key_validate.js";
import {
  listDataTypes,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  getDataType,
  deleteRecord,
} from "./097_data_type_validate.js";
import {
  startUp,  // プログラム起動
  clearCache,  // インメモリキャッシュを削除する
  createColumn,  // カラムを作成
  disableColumn,  // カラムを無効化
  enableColumn,  // カラムを再度有効化
  updateColumnName,  // カラム名を変更
  listColumnsForGUI,  // カラムの一覧を取得(GUI)
  runSqlReadOnly,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly,  // SQLクエリ実行（書き込み専用）
  getTableId,  // カラムIDからテーブルIDを調べる
  deleteTable,  // 不可逆的にテーブルを削除
  checkColumnEnabled,  // カラムが有効なのか判定
  listColumnsAll,  // カラムの一覧を取得（高速）
  getColumnName,  // IDからカラム名を取得
} from "./091_column_name_validate.js";
import { setBugMode } from "./092_column_name.js";


export async function test090() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 29; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「column_name」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「column_name」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    

}