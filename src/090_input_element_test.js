import fs from 'fs';
import path from 'path';
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
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
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
  listTables,
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
  listRecords,
  createRecordFromUI,
} from "./094_records_validate.js";
import {
  startUp,  // プログラム起動
  autoFill,  // 自動入力
  _autoFill,  // 【サブ関数】予測変換と自動入力
  _getConditions,  // 【サブ関数】絞り込み条件を生成する
  _listPredictions,  // 【サブ関数】予測変換を取得する
  _listRecords,  // 【サブ関数】レコードを取得
  clearCache,  // インメモリキャッシュを削除する
  createInputGroup,  // 入力グループを作成
  createInputElement,  // 入力要素を作成
  deleteViewInput,  // ビューを削除
  changeInputType,  // 入力方式を変更
  _fillMasterData,  // 【サブ関数】マスターデータの入力欄を埋める
  getInputType,  // 入力方式を取得
  updateRecordsFromView,  // レコードを上書き
  createRecordFromView,  // レコードを追加
  _convertToRecord,  // 【サブ関数】入力データをレコードに変換
  deleteTable,  // 不可逆的にテーブルを削除
} from "./091_input_element_validate.js";
import { setBugMode } from "./092_input_element.js";


export async function test090() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 67; i++ ) {
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
        console.log(`レイヤー「input_element」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「input_element」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  await startUp("http://localhost:3000/", true);
  //
  const { tableId: tableId1 } = await createTable("学年");
  const { columnId: columnId1 } = await createColumn( tableId1, "学年", "INTEGER", null );
  const { recordId: recordId } = await createRecord( tableId1, {
    [columnId1]: 3,
  });
  //
  const { tableId: tableId2 } = await createTable("名簿");
  const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
  const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
  const { recordId: recordId2 } = await createRecord( tableId2, {
    [columnId2]: recordId,
    [columnId3]: "田中太郎",
  });
  const { recordId: recordId3 } = await createRecord( tableId2, {
    [columnId2]: recordId,
    [columnId3]: "鈴木信也",
  });
  //
  const { tableId: tableId3 } = await createTable("成績表");
  const { columnId: columnId4  } = await createColumn( tableId3, "学生", "POINTER", tableId2 );
  const { columnId: columnId5  } = await createColumn( tableId3, "科目", "TEXT", null );
  const { columnId: columnId6  } = await createColumn( tableId3, "得点", "INTEGER", null );
  const { recordId: recordId4 } = await createRecord( tableId3, {
    [columnId4]: recordId2,
    [columnId5]: "国語",
    [columnId6]: 34,
  });
  //
  // 入力グループを作成（成績表）
  await createInputGroup(
    "group3", // inputGroupId
    89, // viewId
    tableId3, // tableId
    null, // nextGroupId
    null, // nextColumnId
    3 // processingOrder
  );
  //
  // 入力要素を作成（科目）
  await createInputElement(
    "d8", // viewColumnId
    "group3", // inputGroupId
    columnId5, // columnId
    "TEXTBOX", // inputType
  );
  //
  // 入力要素を作成（得点）
  await createInputElement(
    "d7", // viewColumnId
    "group3", // inputGroupId
    columnId6, // columnId
    "TEXTBOX", // inputType
  );
  //
  //===================================
  //
  // 入力グループを作成（名簿）
  await createInputGroup(
    "group1", // inputGroupId
    89, // viewId
    tableId2, // tableId
    "group3", // nextGroupId
    columnId4, // nextColumnId
    2 // processingOrder
  );
  //
  // 入力要素を作成（氏名）
  await createInputElement(
    "d9", // viewColumnId
    "group1", // inputGroupId
    columnId3, // columnId
    "TEXTBOX", // inputType
  );
  //
  //===================================
  //
  // 入力グループを作成（学年）
  await createInputGroup(
    "group2", // inputGroupId
    89, // viewId
    tableId1, // tableId
    "group1", // nextGroupId
    columnId2, // nextColumnId
    1 // processingOrder
  );
  //
  // 入力要素を作成（学年）
  await createInputElement(
    "d10", // viewColumnId
    "group2", // inputGroupId
    columnId1, // columnId
    "TEXTBOX", // inputType
  );
  //
  const result1 = await _autoFill({ 
    viewColumnIdList: ["d10"],
    isClick: true,
    tableId: tableId1,
    inputTexts: {
      "d10": 3,
    },
    conditions:{},
    isAutoFill: true,
  });
  if( result1.recordId !== recordId ){
    throw new Error(`実行結果が想定外です。\n${JSON.stringify(result1, null, 2)}`);
  }
  //
  const result2 = await _autoFill({ 
    viewColumnIdList: ["d9"],
    isClick: true,
    tableId: tableId2,
    inputTexts: {
      "d9": "田",
    },
    conditions:{
      [columnId2]: recordId,
    },
    isAutoFill: true,
  });
  const result3 = await autoFill(
    89, // viewId
    {
      "d9": "田",
      "d10": 3,
    },
    true,// isClick
  );
  /*
  これが返ってくるはず。
  {
    d9: '田中太郎',
    d10: 3,
    d10_option: [ 3 ],
    d9_option: [ '田中太郎' ],
    d7: '',
    d8: '',
    d7_option: [ 34 ],
    d8_option: [ '国語' ]
  }  */
  if( result3["d9"]!=="田中太郎" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d10"]!==3 ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d10_option"][0]!==3 ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d9_option"][0]!=="田中太郎" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d7"]!=="" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d8"]!=="" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d7_option"][0]!==34 ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["d8_option"][0]!=="国語" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  const { isSuccess: flag1, recordId: recordId5 } = await createRecordFromView(
    89, // viewId
    {
      "d7": 99,
      "d8": "国語",
      "d9": "鈴木信也",
      "d10": 3,
    },
  );
  if( flag1!==true ){
    throw new Error(`実行結果が想定外です。`);
  }
  const result5 = await updateRecordsFromView(
    89, // viewId
    [
      {
        "id": recordId5,
        "d7": 9,
        "d8": "国語",
        "d9": "鈴木信也",
        "d10": 3,
      },
    ]
  );
  if( result5.isSuccess!==true ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result5, null, 2));
  }
  const { isSuccess: flag3 } = await updateRecordsFromView(
    89, // viewId
    [
      {
        "id": recordId4,
        "d7": "a",
        "d8": "国語",
        "d9": "鈴木信也2",
        "d10": 3,
      },
      {
        "id": recordId5,
        "d7": 99,
        "d8": "国語",
        "d9": "鈴木信也2",
        "d10": 3,
      },
    ]
  );
  if( flag3!==false ){
    throw new Error(`実行結果が想定外です。`);
  }
  //
  // 入力要素を削除
  await deleteViewInput( 89 );
  await close();

}