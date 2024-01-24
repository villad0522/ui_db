import fs from 'fs';
import path from 'path';
import {
} from "./058_sort_validate.js";
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
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./076_column_name_validate.js";
import {
  getPrimaryKey,
} from "./085_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./067_relation_validate.js";
import {
  listDataTypes,
} from "./082_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./061_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./073_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./064_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./079_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./070_record_title_2_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./055_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./052_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./049_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./046_generate_sql1_validate.js";
import {
  generateSQL,
} from "./043_generate_sql_validate.js";
import {
  startUp,  // プログラム起動
  createPage,  // ページを作成
  updatePageName,  // ページ名やメモを変更
  getPageInfo,  // １ページの情報を取得
  listPagesFromTableId,  // テーブルIDからページIDを取得する
  getTableFromPage,  // ページIDからテーブルIDを取得する
  createJoinedTable,  // 結合済みテーブルを作成
  deleteJoinedTable,  // 結合済みテーブルを削除
  deletePage,  // ページを削除
  getBreadcrumbs,  // パンくずリストを再帰的に取得
  cutPage,  // ページを切り取る
  copyPage,  // ページをコピーする
  pastePage,  // ページを貼り付ける
  getCuttingPage,  // 切り取り中のページを取得する
  getCopyingPage,  // コピー中のページを取得する
} from "./040_pages_validate.js";
import { setBugMode } from "./041_pages.js";


export async function test039() {
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
        console.log(`レイヤー「pages」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「pages」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  await startUp("http://localhost:3000/", true);
  const { pageId: pageId1 } = await createPage( null, "ページ１", false );
  const { pageId: pageId2 } = await createPage( pageId1, "ページ2", false );
  const { pageId: pageId3 } = await createPage( pageId2, "ページ3", false );
  const { pageId: pageId4 } = await createPage( pageId3, "ページ4", false );
  const { pageId: pageId5 } = await createPage( pageId4, "ページ5", false );
  const { pageId: pageId6 } = await createPage( pageId5, "ページ6", false );
  const { pageId: pageId7 } = await createPage( pageId6, "ページ7", false );
  await updatePageName([
    {
      id: pageId1,
      name: "ページ１改",
      memo: "メモ",
    }
  ]);
  const info1 = await getPageInfo();
  const info2 = await getPageInfo( pageId1 );
  const info5 = await getPageInfo( pageId5 );
  console.log(info5);
  await close();

}