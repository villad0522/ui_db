import fs from 'fs';
import path from 'path';
import {
} from "./064_sort_validate.js";
import {
  getLocalIp,
} from "./106_ip_address_validate.js";
import {
  getPath,
} from "./103_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./100_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./088_column_name_validate.js";
import {
  getPrimaryKey,
} from "./097_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./070_record_title_2_validate.js";
import {
  listDataTypes,
} from "./094_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./067_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./085_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./079_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./082_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./091_table_name_validate.js";
import {
  formatField,
} from "./076_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  changeInputType,
  _fillMasterData,
} from "./073_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./061_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./058_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./055_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./052_generate_sql1_validate.js";
import {
  generateSQL,
} from "./049_generate_sql_validate.js";
import {
  startUp,  // プログラム起動
  createPage,  // ページを作成
  updatePageName,  // ページ名やメモを変更
  getPageInfo,  // １ページの情報を取得
  listViewsFromTableId,  // テーブルIDからviewIdを取得する
  getTableFromView,  // viewIdからテーブルIDを取得する
  createView,  // ビューを作成
  deleteView,  // ビューを削除
  deletePage,  // ページを再帰的に削除
  getBreadcrumbs,  // パンくずリストを再帰的に取得
  cutPage,  // ページを切り取る
  copyPage,  // ページをコピーする
  pastePage,  // ページを貼り付ける
  getCuttingPage,  // 切り取り中のページを取得する
  getCopyingPage,  // コピー中のページを取得する
  listAllPages,  // ページを全て取得する関数
  listStaticChildren,  // 子ページの一覧を取得
  listChildrenView,  // ビューの一覧を取得
  getParentPage,  // 親ページのIDを取得
  listChildrenPage,  // 子ページの一覧を再帰的に取得
  _movePage,  // 【サブ関数】ページを移動する
  _generatePageSortNumber,  // 【サブ関数】ソート番号を発行する
  _copyPage,  // 【サブ関数】ページをコピーする
} from "./046_pages_validate.js";
import { setBugMode } from "./047_pages.js";


export async function test045() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 43; i++ ) {
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
  //
  // テーブルを作成
  const { tableId: tableId1 } = await createTable("学年");
  // カラムを作成
  const { columnId: columnId1 } = await createColumn( tableId1, "学年", "INTEGER", null );
  // レコードを作成
  const { recordId: recordId } = await createRecord( tableId1, {
    [columnId1]: 3,
  });
  //
  // テーブルを作成
  const { tableId: tableId2 } = await createTable("名簿");
  // カラムを作成
  const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
  const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
  // レコードを作成
  await createRecord( tableId2, {
    [columnId2]: recordId,
    [columnId3]: "田中太郎",
  });
  //
  // ページを作成
  const { pageId: pageId1 } = await createPage( 1 );
  await updatePageName( pageId1, "ページ1",  "メモ" );
  //
  const { pageId: pageId2 } = await createPage( pageId1 );
  await updatePageName( pageId2, "ページ2",  "メモ" );
  //
  const { pageId: pageId3 } = await createPage( pageId2 );
  await updatePageName( pageId3, "ページ3",  "メモ" );
  //
  const { pageId: pageId4 } = await createPage( pageId3 );
  await updatePageName( pageId4, "ページ4",  "メモ" );
  //
  const { pageId: pageId5 } = await createPage( pageId4 );
  await updatePageName( pageId5, "ページ5",  "メモ" );
  //
  const { pageId: pageId6 } = await createPage( pageId5 );
  await updatePageName( pageId6, "ページ6",  "メモ" );
  //
  const { pageId: pageId7 } = await createPage( pageId6 );
  await updatePageName( pageId7, "ページ7",  "メモ" );
  //
  //
  await getBreadcrumbs( pageId7 );
  //
  // ビューを作成
  const { viewId: viewId1 } = await createView( pageId6, tableId1, `SELECT * FROM ${tableId1};` );
  //
  const views = await listViewsFromTableId( tableId1 );
  if(views[0] !== viewId1 ){
    throw `関数「listViewsFromTableId」の実行結果が想定とは異なります。\nviews = ${JSON.stringify(views)}`;
  }
  if( (await getTableFromView( viewId1 )) !== tableId1 ){
    throw `関数「getTableFromView」の実行結果が想定とは異なります。`;
  }
  //
  // ビューを削除
  await deleteView( viewId1 );
  //
  // 子ページの一覧を再帰的に取得
  const children = await listChildrenPage( pageId1 );
  if( children[0] !== pageId2 ){
    throw `関数「listChildrenPage」の実行結果が想定とは異なります。`;
  }
  if( children[1] !== pageId3 ){
    throw `関数「listChildrenPage」の実行結果が想定とは異なります。`;
  }
  if( children[2] !== pageId4 ){
    throw `関数「listChildrenPage」の実行結果が想定とは異なります。`;
  }
  if( children[3] !== pageId5 ){
    throw `関数「listChildrenPage」の実行結果が想定とは異なります。`;
  }
  if( children[4] !== pageId6 ){
    throw `関数「listChildrenPage」の実行結果が想定とは異なります。`;
  }
  if( children[5] !== pageId7 ){
    throw `関数「listChildrenPage」の実行結果が想定とは異なります。`;
  }
  //
  // ページの情報を取得
  const info1 = await getPageInfo( pageId1 );
  const info5 = await getPageInfo( pageId5 );
  //
  // ページ５をページ３の直下に移動
  await cutPage( pageId5 );
  await pastePage( pageId3, null );
  //
  // ページ５をページ４の直前に移動
  await cutPage( pageId5 );
  await pastePage( pageId3, pageId4 );
  //
  // ページを削除
  await deletePage( pageId2 );
  //
  await close();

}