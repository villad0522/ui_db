import fs from 'fs';
import path from 'path';
import {
  createColumn,
  createView,
  deletePage,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./055_view_column_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./112_csv_validate.js";
import {
  getPath,
} from "./121_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./118_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./097_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./109_primary_key_validate.js";
import {
  deleteRecords,
} from "./106_delete_record_validate.js";
import {
  clearCache,
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
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
  getViewInfo,
  isExistView,
} from "./058_page_and_view_validate.js";
import {
  listDataTypes,
} from "./103_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./088_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./094_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./079_record_title_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./091_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./100_table_name_validate.js";
import {
  formatField,
} from "./085_db_formatter_validate.js";
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
} from "./082_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./073_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./070_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./067_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./064_generate_sql1_validate.js";
import {
} from "./061_generate_sql_validate.js";
import {
  startUp,  // プログラム起動
  deleteView,  // ビューを削除
  generateSQL,  // SQLクエリを生成
} from "./052_joinedTable_validate.js";
import { setBugMode } from "./053_joinedTable.js";


export async function test051() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 12; i++ ) {
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
        console.log(`レイヤー「joinedTable」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「joinedTable」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    //
    const { tableId: tableId1 } = await createTable("学年テーブル");
    const { columnId: columnId1 } = await createColumn( tableId1, "学年", "INTEGER", null );
    // 見出しの役割を果たすカラムを登録する
    await setTitleColumn( columnId1 );
    const { recordId: recordId } = await createRecord( tableId1, {
        [columnId1]: 3,
    });
    //
    const { tableId: tableId2 } = await createTable("名簿テーブル");
    const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
    const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
    await createRecord( tableId2, {
        [columnId2]: recordId,
        [columnId3]: "田中太郎",
    });
    //
    // ページを作成（親ページのIDを指定する。この場合はトップページ。）
    const { pageId: pageId1 } = await createPage( 1 );
    //
    // ページにビューを追加
    const { viewId: viewId1 } = await createView( pageId1, "名簿テーブル" );
    //
    const { normalSQL, parameters } = await generateSQL(
        viewId1,
        {
            ["p5"+columnId2]: recordId,
        }
    );
    const matrix = await runSqlReadOnly( normalSQL, parameters );
    if( matrix.length !== 1 ){
        console.error(matrix);
        console.error(matrix.length);
        throw "テスト結果の件数が想定とは異なります。";
    }
    if( matrix[0]['d2'] !== 3 ){
        console.error(matrix);
        console.error(matrix[0]['学年']);
        throw "テスト結果が想定とは異なります。（学年）";
    }
    if( matrix[0]['d1'] !== "田中太郎" ){
        console.error(matrix);
        throw "テスト結果が想定とは異なります。（氏名）";
    }
    await close();

}