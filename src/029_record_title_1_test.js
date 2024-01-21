import fs from 'fs';
import path from 'path';
import {
  startUp,
} from "./048_sort_validate.js";
import {
  getLocalIp,
} from "./081_ip_address_validate.js";
import {
  getPath,
} from "./078_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./075_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./063_column_name_validate.js";
import {
  getPrimaryKey,
} from "./072_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./054_relation_validate.js";
import {
  listDataTypes,
} from "./069_data_type_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./051_search_text_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./060_reserved_word_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./057_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./066_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./045_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./042_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./039_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./036_generate_sql1_validate.js";
import {
} from "./033_generate_sql_validate.js";
import {
  createRecord,  // レコードを作成
  updateRecord,  // レコードを上書き
  checkField,  // フィールドを検証
  checkRecord,  // レコードを検証
  generateSQL,  // SQLクエリを生成
  autoCorrect,  // 予測変換
} from "./030_record_title_1_validate.js";
import { setBugMode } from "./031_record_title_1.js";


export async function test029() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 17; i++ ) {
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
  const { sql, parameters } = await generateSQL(
    tableId2,
    [
      {
        displayColumnId: "d1",
        type: "RAW",
        path: `main.${columnId2} > ${columnId1}`,
        as: "学年",
      },
      {
        displayColumnId: "d2",
        type: "RAW",
        path: `main.${columnId3}`,
        as: "氏名",
      },
    ],
    [],
    []
  );
  const matrix = await runSqlReadOnly(sql,parameters);
  if( matrix.length !== 1 ){
    throw "テスト結果が想定とは異なります。";
  }
  if( matrix[0]['学年'] !== 3 ){
    throw "テスト結果が想定とは異なります。";
  }
  if( matrix[0]['氏名'] !== "田中太郎" ){
    throw "テスト結果が想定とは異なります。";
  }
  await updateRecord( tableId2, [
    {
      "id": recordId,
      [columnId2+"_text"]: "2",
      [columnId3]: "佐藤太郎",
    }
  ]);
  const matrix3 = await runSqlReadOnly(sql,parameters);
  if( matrix3.length !== 1 ){
    throw "テスト結果が想定とは異なります。";
  }
  if( matrix3[0]['学年'] !== 2 ){
    throw "テスト結果が想定とは異なります。";
  }
  if( matrix3[0]['氏名'] !== "佐藤太郎" ){
    throw "テスト結果が想定とは異なります。";
  }
  const { sql: sql2, parameters: parameters2 } = await generateSQL(
    tableId1,
    [
      {
        displayColumnId: "d1",
        type: "RAW",
        path: `main.${columnId1}`,
        as: "学年",
      },
      {
        displayColumnId: "d2",
        type: "COUNT",
        path: `${columnId2} > main`,
        as: "人数",
      },
    ],
    [],
    []
  );
  const matrix2 = await runSqlReadOnly( sql2, parameters2 );
  console.log(matrix2);
  await close();

}