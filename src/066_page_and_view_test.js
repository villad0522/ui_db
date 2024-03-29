import fs from 'fs';
import path from 'path';
import {
  createColumn,
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  getParentValue,
  _getRecordOffset,
} from "./088_record_title_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./085_csv_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./133_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./112_column_name_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  listChildrenColumnId,
} from "./103_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
  scanKeywords,
  getScanKeywordsProgress,
  stopScanKeywords,
} from "./106_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./115_table_name_validate.js";
import {
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
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  deleteViewInput,
  changeInputType,
  _fillMasterData,
  getInputType,
  updateRecordsFromView,
  createRecordFromView,
  _convertToRecord,
} from "./091_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./082_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./079_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./076_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./073_generate_sql1_validate.js";
import {
  generateSQL,
} from "./070_generate_sql_validate.js";
import {
  startUp,  // プログラム起動
  createPage,  // ページを作成
  updatePageName,  // ページ名やメモを変更
  getPageInfo,  // １ページの情報を取得
  listViewsFromTableId,  // テーブルIDからviewIdを取得する
  getTableFromView,  // viewIdからテーブルIDを取得する
  createView,  // ビューを作成
  deleteView,  // ビューを削除
  deletePage,  // ページを削除
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
  getViewInfo,  // ビューの情報を取得
  clearCache,  // インメモリキャッシュを削除する
  isExistView,  // ビューの存在を確認
  deleteTable,  // 不可逆的にテーブルを削除
  updateView,  // ビューの情報を更新
} from "./067_page_and_view_validate.js";
import { setBugMode } from "./068_page_and_view.js";


export async function test066() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 55; i++ ) {
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
        console.log(`レイヤー「page_and_view」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「page_and_view」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
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