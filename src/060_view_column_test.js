import fs from 'fs';
import path from 'path';
import {
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
} from "./064_page_and_view_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./082_csv_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
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
} from "./085_record_title_validate.js";
import {
  listDataTypes,
} from "./118_data_type_validate.js";
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
} from "./100_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
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
} from "./103_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./115_sort_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  formatField,
} from "./094_db_formatter_validate.js";
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
} from "./088_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./079_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./076_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./073_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./070_generate_sql1_validate.js";
import {
  generateSQL,
} from "./067_generate_sql_validate.js";
import {
  startUp,  // プログラム起動
  _addViewColumn,  // 【サブ】ビューカラムを作成
  createColumn,  // カラムを作成
  createView,  // ビューを作成
  listViewColumns,  // ビューカラムの一覧を取得
  deleteView,  // ビューを削除
  _deleteViewColumns,  // 【サブ関数】ビューカラムを一括削除
  regenerateInputElements,  // 【サブ関数】入力要素を全て作り直す
  _addViewColumn,  // 【サブ関数】ビューカラムを作成
  deletePage,  // ページを削除
  deleteTable,  // 不可逆的にテーブルを削除
  updateView,  // ビューの情報を更新
  deleteViewColumn,  // ビューカラムを削除
  reorderViewColumnToRight,  // ビューカラムを右へ移動
  reorderViewColumnToLeft,  // ビューカラムを左へ移動
  getViewColumnFromColumn,  // カラムIDからビューカラムIDを取得
  clearCache,  // インメモリキャッシュを削除する
  getViewColumnName,  // ビューカラムの名前を取得
  getViewColumnFromName,  // 名前からビューカラムの情報を取得
  _autoCorrectColumnsToParents,  // 新しいビューカラムの予測を取得（子→親）
  _autoCorrectColumnsToChildren,  // 新しいビューカラムの予測を取得（親→子）
  getViewColumnInfo,  // ビューカラムの情報を取得
  addColumnPath,  // カラムパスを伸ばす
  autoCorrectColumnPath,  // カラムパスの予測変換
  createViewColumn,  // ビューカラムを新規作成
} from "./061_view_column_validate.js";
import { setBugMode } from "./062_view_column.js";


export async function test060() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 78; i++ ) {
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
    const { tableId: tableId1 } = await createTable("学年テーブル");
    const { columnId: columnId1 } = await createColumn( tableId1, "学年", "INTEGER", null );
    await setTitleColumn( columnId1 );    // 見出しの役割を果たすカラムを登録する
    const { recordId: recordId } = await createRecord( tableId1, {
        [columnId1]: 3,
    });
    //
    const { tableId: tableId2 } = await createTable("名簿テーブル");
    const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
    const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
    await setTitleColumn( columnId3 );    // 見出しの役割を果たすカラムを登録する
    const { recordId: recordId2 } = await createRecord( tableId2, {
        [columnId2]: recordId,
        [columnId3]: "田中太郎",
    });
    //
    const { tableId: tableId3 } = await createTable("成績表テーブル");
    const { columnId: columnId4  } = await createColumn( tableId3, "学生", "POINTER", tableId2 );
    const { columnId: columnId5  } = await createColumn( tableId3, "科目", "TEXT", null );
    const { columnId: columnId6  } = await createColumn( tableId3, "得点", "INTEGER", null );
    await createRecord( tableId3, {
        [columnId4]: recordId2,
        [columnId5]: "国語",
        [columnId6]: 34,
    });
    //
    // ページを作成（親ページのIDを指定する。この場合はトップページ。）
    const { pageId: pageId3 } = await createPage( 1 );
    //
    // ページにビューを追加
    const { viewId: viewId3 } = await createView( pageId3, "成績表テーブル" );
    //
    // ビューカラムを追加
    await addViewColumn(
        viewId3,
        "RAW",  // viewColumnType
        `main.${columnId4} > ${columnId2} > ${columnId1}`,     // columnPath
        "学年",   // viewColumnName
    );
    //
    // ビューカラムの一覧を取得
    const viewColumns3 = await listViewColumns( viewId3 );
    if( viewColumns3.length !== 4 ){
        console.error(viewColumns3);
        throw `ビューカラムの個数が想定外です`;
    }
    //
    // 予測変換
    const inputTexts = {};
    for( const { viewColumnId, viewColumnName } of viewColumns3 ){
        if( viewColumnName === "氏名" ){
            inputTexts[viewColumnId] = "田";
        }
        else if( viewColumnName === "学年" ){
            inputTexts[viewColumnId] = 3;
        }
    }
    const result3 = await autoFill(
        viewId3,
        inputTexts,
        true, // isClick
    );
    /*
    これが返ってくるはず。
    {
        "d3": "田中太郎",
        "d4": 3,
        "d4_option": [
            3
        ],
        "d3_option": [
            "田中太郎"
        ],
        "d1": "",
        "d2": "",
        "d1_option": [
            34
        ],
        "d2_option": [
            "国語"
        ]
    }  */
    for( const { viewColumnId, viewColumnName } of viewColumns3 ){
        if( viewColumnName === "氏名" ){
            if( result3[viewColumnId]!=="田中太郎" ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
            if( result3[viewColumnId+"_option"][0]!=="田中太郎" ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
        }
        else if( viewColumnName === "学年" ){
            if( result3[viewColumnId]!==3 ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
            if( result3[viewColumnId+"_option"][0]!==3 ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
        }
        else if( viewColumnName === "科目" ){
            if( result3[viewColumnId]!=="" ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
            if( result3[viewColumnId+"_option"][0]!=="国語" ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
        }
        else if( viewColumnName === "得点" ){
            if( result3[viewColumnId]!=="" ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
            if( result3[viewColumnId+"_option"][0]!==34 ){
                throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result3, null, 2));
            }
        }
    }
    //
    //
    await close();

}