import fs from 'fs';
import path from 'path';
import {
  createColumn,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./082_relation_validate.js";
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
  close,
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
  listDataTypes,
} from "./097_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./088_reserved_word_validate.js";
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
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
import {
  formatField,
} from "./079_db_formatter_validate.js";
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
  deleteView,  // ビューを削除
  changeInputType,  // 入力方式を変更
  _fillMasterData,  // 【サブ関数】マスターデータの入力欄を埋める
} from "./076_input_element_validate.js";
import { setBugMode } from "./077_input_element.js";


export async function test075() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 39; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
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
  //
  const { tableId: tableId3 } = await createTable("成績表");
  const { columnId: columnId4  } = await createColumn( tableId3, "学生", "POINTER", tableId2 );
  const { columnId: columnId5  } = await createColumn( tableId3, "科目", "TEXT", null );
  const { columnId: columnId6  } = await createColumn( tableId3, "得点", "INTEGER", null );
  await createRecord( tableId3, {
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
    8, // viewColumnId
    "group3", // inputGroupId
    columnId5, // columnId
    "TEXTBOX", // inputType
  );
  //
  // 入力要素を作成（得点）
  await createInputElement(
    7, // viewColumnId
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
    9, // viewColumnId
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
    10, // viewColumnId
    "group2", // inputGroupId
    columnId1, // columnId
    "TEXTBOX", // inputType
  );
  //
  const result1 = await _autoFill({ 
    viewColumnIdList: [10],
    isClick: true,
    tableId: tableId1,
    inputTexts: {
      "vc10": 3,
    },
    conditions:{},
    isAutoFill: true,
  });
  if( result1.recordId !== recordId ){
    throw new Error(`実行結果が想定外です。\n${JSON.stringify(result1, null, 2)}`);
  }
  //
  const result2 = await _autoFill({ 
    viewColumnIdList: [9],
    isClick: true,
    tableId: tableId2,
    inputTexts: {
      "vc9": "田",
    },
    conditions:{
      [columnId2]: recordId,
    },
    isAutoFill: true,
  });
  const result3 = await autoFill(
    89, // viewId
    {
      "vc9": "田",
      "vc10": 3,
    },
    true,// isClick
  );
  /*
  これが返ってくるはず。
  {
    vc9: '田中太郎',
    vc10: 3,
    vc10_autocorrection: [ 3 ],
    vc9_autocorrection: [ '田中太郎' ],
    vc7: '',
    vc8: '',
    vc7_autocorrection: [ 34 ],
    vc8_autocorrection: [ '国語' ]
  }  */
  if( result3["vc9"]!=="田中太郎" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc10"]!==3 ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc10_autocorrection"][0]!==3 ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc9_autocorrection"][0]!=="田中太郎" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc7"]!=="" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc8"]!=="" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc7_autocorrection"][0]!==34 ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  if( result3["vc8_autocorrection"][0]!=="国語" ){
    throw new Error(`実行結果が想定外です。\n`+JSON.stringify(result1, null, 2));
  }
  //
  // 入力要素を削除
  await deleteView( 89 );
  await close();

}