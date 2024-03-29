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
  listTablesInSQL,
} from "./115_table_name_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./133_connect_database_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  listDataTypes,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
} from "./121_data_type_validate.js";
import {
  deleteRecords,
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./118_sort_validate.js";
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
  getColumnIdFromName,  // カラム名からIDを取得
} from "./112_column_name_validate.js";
import { setBugMode } from "./113_column_name.js";


export async function test111() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 36; i++ ) {
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