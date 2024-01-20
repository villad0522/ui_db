// 文字列検索
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./024_relation_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  getPath,
} from "./048_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./033_column_name_validate.js";
import {
  getPrimaryKey,
} from "./042_primary_key_validate.js";
import {
  listDataTypes,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  deleteRecord,
} from "./039_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./030_reserved_word_validate.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./036_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./027_record_title_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import Kuroshiro from "kuroshiro";
// 形態素解析器
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const kuroshiro = new Kuroshiro();


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  try {
    // テーブルを作成する（検索のため）
    await reserveWord("search_text"); // 予約語に登録
    await runSqlWriteOnly(
      `CREATE TABLE IF NOT EXISTS search_text (
        table_id TEXT NOT NULL,
        column_id TEXT NOT NULL,
        record_id TEXT NOT NULL,
        original_text TEXT NOT NULL,
        roman_alphabet TEXT NOT NULL
      );`,
      {},
    );
  }
  catch (err) {
    throw `システム管理用テーブルの作成に失敗しました。\n${String(err)}`;
  }
  await kuroshiro.init(new KuromojiAnalyzer());
}


// 検索ワードを登録する関数
async function _saveKeyword({ tableId, recordId, recordData }){
  // 過去に登録したデータを削除する
  await runSqlWriteOnly(
    `DELETE FROM search_text
    WHERE table_id = :tableId
      AND record_id = :recordId;`,
    {
      ":tableId": tableId,
      ":recordId": recordId,
    },
  );
  //
  const columns = await listColumnsAll( tableId );
  //
  // カラムごとに繰り返す
  for( const columnData of columns ){
    switch(columnData.dataType){
      case "INTEGER":
        break;    // 文字列検索に登録する（処理を続行する）
      case "REAL":
        break;    // 文字列検索に登録する（処理を続行する）
      case "TEXT":
        break;    // 文字列検索に登録する（処理を続行する）
      case "BOOL":
        continue; // 文字列検索に登録しない
      case "FILE":
        continue; // 文字列検索に登録しない
      default:
        throw `データ型「${columnData.dataType}」はサポートされていません。`;
    }
    const value = recordData[columnData.id];
    if (!value && value !== 0) {
      continue;
    }
    const originalText = String(value);
    //
    // 文字列をローマ字に変換する
    const romanAlphabet = await kuroshiro.convert(
      originalText,
      {
        to: "hiragana",
        mode: "spaced",
      }
    );
    const words = romanAlphabet.split(" ");
    console.log(words);
    //
    // 検索ワードを登録する
    await runSqlWriteOnly(
      `INSERT INTO search_text (
        table_id,
        column_id,
        record_id,
        original_text,
        roman_alphabet
      ) VALUES (
        :tableId,
        :columnId,
        :recordId,
        :originalText,
        :romanAlphabet
      );`,
      {
        ":tableId": tableId,
        ":columnId": columnData.id,
        ":recordId": recordId,
        ":originalText": originalText,
        ":romanAlphabet": romanAlphabet
      },
    );
  }
}


// レコードを作成
export async function createRecord_core( tableId, recordData ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  const result = await createRecord( tableId, recordData ); // 下層の関数を呼び出す
  // 検索キーワードを登録する
  await _saveKeyword({
    tableId: tableId,
    recordId: result.recordId,
    recordData: recordData,
  });
  return result;
}


// レコードを上書き
export async function updateRecord_core( tableId, records ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  const result = await updateRecord( tableId, records );  // 下層の関数を呼び出す
  const primaryKey = await getPrimaryKey( tableId );
  //
  // 上書きしたいレコードごとに繰り返す
  for( const recordData of records ){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    let recordId;
    if( recordData[primaryKey] ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      recordId = recordData[primaryKey];
    }
    else if( recordData["recordId"] ){
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      recordId = recordData["recordId"];
    }
    else if( recordData["id"] ){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      recordId = recordData["id"];
    }
    else{
      throw "削除対象のプライマリキーが指定されていません。";
    }
    // 検索キーワードを登録する
    await _saveKeyword({
      tableId: tableId,
      recordId: recordId,
      recordData: recordData,
    });
  }
  return result;
}



// 不可逆的にテーブルを削除
export async function delete_table_core( tableId ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `DELETE FROM search_text
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,
    },
  );
  return await delete_table( tableId );  // 下層の関数を呼び出す
}



// レコードを削除
export async function deleteRecord_core( tableId, records ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  for( const recordData of records ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    let recordId;
    if( recordData[primaryKey] ){
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      recordId = recordData[primaryKey];
    }
    else if( recordData["recordId"] ){
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      recordId = recordData["recordId"];
    }
    else if( recordData["id"] ){
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      recordId = recordData["id"];
    }
    else{
      throw "削除対象のプライマリキーが指定されていません。";
    }
    await runSqlWriteOnly(
      `DELETE FROM search_text
      WHERE table_id = :tableId
        AND record_id = :recordId;`,
      {
        ":tableId": tableId,
        ":recordId": recordId,
      },
    );
  }
  return await deleteRecord( tableId, records );  // 下層の関数を呼び出す
}


// テーブルを無効化
export async function disableTable_core( tableId ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}



// テーブルを再度有効化
export async function enableTable_core( tableId ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}



// カラムを無効化
export async function disableColumn_core( columnId ){
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}



// カラムを再度有効化
export async function enableColumn_core( columnId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}
