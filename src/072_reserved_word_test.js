import fs from 'fs';
import path from 'path';
import {
  startUp,
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  deleteTable,
  disableColumn,
  enableColumn,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
} from "./076_column_name_validate.js";
import {
  getLocalIp,
} from "./094_ip_address_validate.js";
import {
  getPath,
} from "./091_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./088_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./085_primary_key_validate.js";
import {
  listDataTypes,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  getDataType,
  deleteRecord,
} from "./082_data_type_validate.js";
import {
  reload,
  disableTable,
  enableTable,
  listTables,
  checkTableEnabled,
  getTableName,
} from "./079_table_name_validate.js";
import {
  createColumn,  // カラムを作成
  updateColumnName,  // カラム名を変更
  createTable,  // テーブルを作成
  updateTableName,  // テーブル名を変更
  reserveWord,  // 予約語を追加
} from "./073_reserved_word_validate.js";
import { setBugMode } from "./074_reserved_word.js";


export async function test072() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 7; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「reserved_word」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「reserved_word」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    

}