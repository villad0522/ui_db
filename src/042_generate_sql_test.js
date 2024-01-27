import fs from 'fs';
import path from 'path';
import {
  startUp,
} from "./058_sort_validate.js";
import {
  getLocalIp,
} from "./100_ip_address_validate.js";
import {
  getPath,
} from "./097_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./094_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./082_column_name_validate.js";
import {
  getPrimaryKey,
} from "./091_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./064_record_title_2_validate.js";
import {
  listDataTypes,
} from "./088_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./061_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./079_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./073_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./076_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./085_table_name_validate.js";
import {
  formatField,
} from "./070_db_formatter_validate.js";
import {
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
} from "./067_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./055_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./052_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./049_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./046_generate_sql1_validate.js";
import {
  generateSQL,  // SQLクエリを生成
} from "./043_generate_sql_validate.js";
import { setBugMode } from "./044_generate_sql.js";


export async function test042() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 4; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「generate_sql」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「generate_sql」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
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
  await createRecord( tableId2, {
    [columnId2]: recordId,
    [columnId3]: "田中太郎",
  });
  //
  const { sql, parameters } = await generateSQL(
    tableId2,
    [
      {
        viewColumnId: "d1",
        viewColumnType: "RAW",
        columnPath: `main.${columnId2} > ${columnId1}`,
        viewColumnName: "学年",
      },
      {
        viewColumnId: "d2",
        viewColumnType: "RAW",
        columnPath: `main.${columnId3}`,
        viewColumnName: "氏名",
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
  const { sql: sql2, parameters: parameters2 } = await generateSQL(
    tableId1,
    [
      {
        viewColumnId: "d1",
        viewColumnType: "RAW",
        columnPath: `main.${columnId1}`,
        viewColumnName: "学年",
      },
      {
        viewColumnId: "d2",
        viewColumnType: "COUNT",
        columnPath: `${columnId2} > main`,
        viewColumnName: "人数",
      },
    ],
    [],
    []
  );
  const matrix2 = await runSqlReadOnly( sql2, parameters2 );
  console.log(matrix2);
  await close();

}