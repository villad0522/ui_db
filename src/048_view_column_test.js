import fs from 'fs';
import path from 'path';
import {
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
  listAllPages,
  listStaticChildren,
  listChildrenView,
  getParentPage,
  listChildrenPage,
  _movePage,
  _generatePageSortNumber,
  _copyPage,
} from "./052_page_and_view_validate.js";
import {
  getLocalIp,
} from "./118_ip_address_validate.js";
import {
  getPath,
} from "./115_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./112_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./094_column_name_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./106_csv_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./109_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./103_primary_key_validate.js";
import {
  clearCache,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./076_record_title_2_validate.js";
import {
  listDataTypes,
} from "./100_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./073_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./091_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./085_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./088_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./097_table_name_validate.js";
import {
  formatField,
} from "./082_db_formatter_validate.js";
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
} from "./079_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./067_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./064_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./061_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./058_generate_sql1_validate.js";
import {
  generateSQL,
} from "./055_generate_sql_validate.js";
import {
  startUp,  // プログラム起動
  _generateViewColumnSortNumber,  // 【サブ関数】ソート番号を発行する
  addViewColumn,  // ビューカラムを作成
  createColumn,  // カラムを作成
  createView,  // ビューを作成
  listViewColumns,  // ビューカラムの一覧を取得
  deleteView,  // ビューを削除
  _deleteViewColumns,  // 【サブ関数】ビューカラムを一括削除
  listViewColumnsForExcel,  // ビューカラムの一覧を取得(Excel向け)
} from "./049_view_column_validate.js";
import { setBugMode } from "./050_view_column.js";


export async function test048() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 25; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「view_column」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「view_column」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    //
    const { tableId: tableId1 } = await createTable("学年");
    const { columnId: columnId1 } = await createColumn( tableId1, "学年", "INTEGER", null );
    // 見出しの役割を果たすカラムを登録する
    await setTitleColumn( columnId1 );
    //
    const { tableId: tableId2 } = await createTable("名簿");
    const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
    const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
    //
    // ページを作成
    const { pageId: pageId1 } = await createPage( 1, "ページ１" );
    //
    // ページにビューを追加
    const { viewId: viewId1 } = await createView( pageId1, "名簿" );
    //
    const columns = await listColumnsAll( tableId2 );
    if( columns.length !== 2 ){
        console.error(columns);
        throw `カラムの個数が想定外です`;
    }
    //
    // ビューカラムの一覧を取得
    const viewColumns = await listViewColumns( viewId1 );
    if( viewColumns.length !== 2 ){
        console.error(viewColumns);
        throw `ビューカラムの個数が想定外です`;
    }
    //
    await close();

}