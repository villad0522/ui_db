import fs from 'fs';
import path from 'path';
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./070_record_title_2_validate.js";
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
  listDataTypes,
} from "./094_data_type_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./079_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./085_reserved_word_validate.js";
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
  deleteView,
  changeInputType,
  _fillMasterData,
} from "./073_input_element_validate.js";
import {
  createRecord,  // レコードを作成
  updateRecord,  // レコードを上書き
  checkField,  // フィールドを検証
  checkRecord,  // レコードを検証
} from "./067_record_title_1_validate.js";
import { setBugMode } from "./068_record_title_1.js";


export async function test066() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 15; i++ ) {
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
    
  await startUp("http://localhost:3000/", true);
  //
  const { tableId: tableId1 } = await createTable("学年");
  const { columnId: columnId1 } = await createColumn( tableId1, "学年", "INTEGER", null );
  await setTitleColumn( columnId1 );
  await createRecord( tableId1, {
    [columnId1]: 1,
  });
  await createRecord( tableId1, {
    [columnId1]: 2,
  });
  await createRecord( tableId1, {
    [columnId1]: 3,
  });
  //
  const { tableId: tableId2 } = await createTable("名簿");
  const { columnId: columnId2  } = await createColumn( tableId2, "学年", "POINTER", tableId1 );
  const { columnId: columnId3  } = await createColumn( tableId2, "氏名", "TEXT", null );
  const { recordId: recordId } = await createRecord( tableId2, {
    [columnId2+"_text"]: "3",
    [columnId3]: "田中太郎",
  });
  //
  const matrix = await runSqlReadOnly(`SELECT * FROM ${tableId2}`,{});
  if( matrix.length !== 1 ){
    throw "テスト結果が想定とは異なります。";
  }
  if( matrix[0][columnId2] !== 3 ){
    throw "テスト結果が想定とは異なります。";
  }
  if( matrix[0][columnId3] !== "田中太郎" ){
    throw "テスト結果が想定とは異なります。";
  }
  await updateRecord( tableId2, [
    {
      [tableId2+"_id"]: recordId,
      [columnId2+"_text"]: "2",
      [columnId3]: "佐藤太郎",
    }
  ]);
  await close();

}