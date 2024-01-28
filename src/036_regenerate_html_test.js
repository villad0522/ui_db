import fs from 'fs';
import path from 'path';
import {
  close,
  createDirectories,
} from "./040_frontend_files_validate.js";
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
} from "./103_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./091_column_name_validate.js";
import {
  getPrimaryKey,
} from "./100_primary_key_validate.js";
import {
  clearCache,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./073_record_title_2_validate.js";
import {
  createColumn,
  generateSQL,
  addViewColumn,
} from "./046_view_validate.js";
import {
  listDataTypes,
} from "./097_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./070_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./088_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./082_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./085_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
import {
  formatField,
} from "./079_db_formatter_validate.js";
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
} from "./076_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./064_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./061_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./058_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./055_generate_sql1_validate.js";
import {
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  getBreadcrumbs,
  cutPage,
  copyPage,
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
} from "./049_pages_validate.js";
import {
  getPageData,
} from "./043_page_data_validate.js";
import {
  regeneratePage,  // ページを再生成する
  createPage,  // ページを作成
  createView,  // ビューを作成
  startUp,  // プログラム起動
  escapeHTML,  // HTMLエスケープ
  updatePageName,  // ページ名やメモを変更
  deleteView,  // ビューを削除
  deletePage,  // ページを再帰的に削除
  pastePage,  // ページを貼り付ける
} from "./037_regenerate_html_validate.js";
import { setBugMode } from "./038_regenerate_html.js";


export async function test036() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 21; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「regenerate_html」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「regenerate_html」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
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
    const { recordId: recordId } = await createRecord( tableId1, {
        [columnId1]: 3,
    });
    //
    const { tableId: tableId2 } = await createTable("名簿");
    const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
    const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
    await createRecord( tableId2, {
        [columnId2]: recordId,
        [columnId3]: "田中太郎",
    });
    //
    // ページを作成
    const { pageId: pageId1 } = await createPage( 1 );
    //
    // ページに動的リストを追加
    const { viewId: viewId1 } = await createView( pageId1, tableId2 );
    await regeneratePage( pageId1 );
    await close();

}