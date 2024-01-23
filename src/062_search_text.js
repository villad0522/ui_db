// 文字列検索
//
import {
  startUp,
  clearCache,
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
} from "./064_relation_validate.js";
import {
  getLocalIp,
} from "./091_ip_address_validate.js";
import {
  getPath,
} from "./088_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./085_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./073_column_name_validate.js";
import {
  getPrimaryKey,
} from "./082_primary_key_validate.js";
import {
  listDataTypes,
  deleteRecord,
} from "./079_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./070_reserved_word_validate.js";
import {
  reload,
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./076_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./067_record_title_2_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



import path from 'path';

// カタカナ変換ライブラリ
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
const kuroshiro = new Kuroshiro();

// 形態素解析ライブラリ
import kuromoji from 'kuromoji';
let tokenizer;

// 形態素解析器を初期化する関数
async function _buildTokenizer() {
  const staticPath = await getPath( "STATIC_DATA" );
  const dicPath = path.join( staticPath,'light/kuromoji_dict');
  const defaultBuilder = kuromoji.builder({ dicPath: dicPath });
  return await new Promise((resolve, reject) => {
    defaultBuilder.build((err, tokenizer) => {
      if (err) {
        reject(err);
      }
      else{
        resolve(tokenizer);
      }
    });
  });
}

// 文字列から名刺を抽出して、カタカナに変換する関数
async function _convertKeywords( originalText ) {
  if(!isNaN(originalText)){
    // 数値に変換可能な場合
    return [
      String(Number(originalText)),
    ];
  }
  if( originalText.length <= 5 ){
    // ５文字以下の場合
    return [
      await kuroshiro.convert(originalText, { to: "katakana" }),
    ];
  }
  const tokens = tokenizer.tokenize(originalText);
  const keywords = new Set();
  for( const token of tokens ){
    if( token.pos !== "名詞" ) continue;
    if( token.reading ){
      keywords.add(token.reading);
    }
    else if( token.surface_form ){
      keywords.add(token.surface_form);
    }
  }
  return Array.from(keywords);
}

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
        record_id INTEGER NOT NULL,
        original_text TEXT NOT NULL,
        keyword TEXT NOT NULL,
        is_enable_column INTEGER NOT NULL DEFAULT 1,
        is_enable_table INTEGER NOT NULL DEFAULT 1
      );`,
      {},
    );
  }
  catch (err) {
    throw `システム管理用テーブルの作成に失敗しました。\n${String(err)}`;
  }
  tokenizer = await _buildTokenizer();
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
    const value = recordData[columnData.id];
    if (!value && value !== 0) {
      continue;
    }
    let originalText = String(value);
    let keywords = [];
    switch (columnData.dataType) {
      case "INTEGER":
        keywords = [String(value)];
        break;    // 文字列検索に登録する（処理を続行する）
      case "REAL":
        keywords = [String(value)];
        break;    // 文字列検索に登録する（処理を続行する）
      case "TEXT":
        // 形態素解析を行う
        keywords = await _convertKeywords(originalText);
        break;    // 文字列検索に登録する（処理を続行する）
      case "BOOL":
        continue; // 文字列検索に登録しない
      case "FILE":
        continue; // 文字列検索に登録しない
      case "POINTER":
        continue; // 文字列検索に登録しない
      default:
        throw `データ型「${columnData.dataType}」はサポートされていません。`;
    }
    for( const keyword of keywords ){
      // 検索ワードを登録する
      await runSqlWriteOnly(
        `INSERT INTO search_text (
          table_id,
          column_id,
          record_id,
          original_text,
          keyword
        ) VALUES (
          :tableId,
          :columnId,
          :recordId,
          :originalText,
          :keyword
        );`,
        {
          ":tableId": tableId,
          ":columnId": columnData.id,
          ":recordId": recordId,
          ":originalText": originalText,
          ":keyword": keyword
        },
      );
    }
    //
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
  //
  // 上書きしたいレコードごとに繰り返す
  for( const recordData of records ){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    let recordId;
    if( recordData["id"] ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  for( const recordData of records ){
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    let recordId;
    if( recordData["id"] ){
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `UPDATE search_text
      SET is_enable_table = 0
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,
    },
  );
  return await disableTable( tableId );  // 下層の関数を呼び出す
}



// テーブルを再度有効化
export async function enableTable_core( tableId ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `UPDATE search_text
      SET is_enable_table = 1
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,
    },
  );
  return await enableTable( tableId );  // 下層の関数を呼び出す
}



// カラムを無効化
export async function disableColumn_core( columnId ){
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `UPDATE search_text
      SET is_enable_column = 0
      WHERE column_id = :columnId;`,
    {
      ":columnId": columnId,
    },
  );
  return await disableColumn( columnId );  // 下層の関数を呼び出す
}



// カラムを再度有効化
export async function enableColumn_core( columnId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `UPDATE search_text
      SET is_enable_column = 1
      WHERE column_id = :columnId;`,
    {
      ":columnId": columnId,
    },
  );
  return await enableColumn( columnId );  // 下層の関数を呼び出す
}



// 予測変換
export async function autoCorrect_core( tableId, columnId, inputText, conditions ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  //
  // 文字列から名刺を抽出して、カタカナに変換する
  const inputWords = await _convertKeywords( inputText );
  console.log(inputWords.join(", "));
  //
  let sql = `
    SELECT ${tableId}.${columnId} AS originalText
      FROM ${tableId}
      INNER JOIN search_text
        ON ${tableId}.${primaryKey} = search_text.record_id
        AND search_text.table_id = :tableId
        AND search_text.column_id = :columnId
      WHERE search_text.is_enable_table = 1
        AND search_text.is_enable_column = 1`;
  //
  const statements = {};
  const searchList = [];
  for( let i=0; i<inputWords.length; i++ ){
    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    searchList.push(`keyword LIKE :word${i}`);
    searchList.push(`original_text LIKE :word${i}`);
    statements[`:word${i}`] = "%" + inputWords[i] + "%";
  }
  if( searchList.length > 0 ){
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `\n        AND (
          ${searchList.join(`\n          OR `)}
        )`;
  }
  //
  for( const columnId in conditions ){
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `\n        AND ${columnId} = :${columnId}`;
    statements[`:${columnId}`] = conditions[columnId];
  }
  sql += `\n      GROUP BY original_text;`;
  const matrix = await runSqlReadOnly( sql, {
    ...statements,
    ":tableId": tableId,
    ":columnId": columnId,
  });
  const suggestions = new Set();
  for( const { originalText } of matrix ){
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    suggestions.add(originalText);
  }
  return Array.from(suggestions);
}
