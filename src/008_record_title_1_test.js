import fs from 'fs';
import path from 'path';
import {
  startUp,
} from "./027_sort_validate.js";
import {
  getLocalIp,
} from "./060_ip_address_validate.js";
import {
  getPath,
} from "./057_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./054_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./042_column_name_validate.js";
import {
  getPrimaryKey,
} from "./051_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./033_relation_validate.js";
import {
  listDataTypes,
} from "./048_data_type_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./030_search_text_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./039_reserved_word_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./036_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./045_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./024_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./021_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./018_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./015_generate_sql1_validate.js";
import {
} from "./012_generate_sql_validate.js";
import {
  createRecord,  // レコードを作成
  updateRecord,  // レコードを上書き
  checkField,  // フィールドを検証
  checkRecord,  // レコードを検証
  generateSQL,  // SQLクエリを生成
  autoCorrect,  // 予測変換
} from "./009_record_title_1_validate.js";
import { setBugMode } from "./010_record_title_1.js";


export async function test008() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 6; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「record_title_1」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「record_title_1」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    

}