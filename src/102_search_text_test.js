import fs from 'fs';
import path from 'path';
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
} from "./118_data_type_validate.js";
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
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  startUp,  // プログラム起動
  createRecord,  // レコードを作成
  updateRecords,  // レコードを上書き
  deleteTable,  // 不可逆的にテーブルを削除
  deleteRecords,  // レコードを一括削除
  disableTable,  // テーブルを無効化
  enableTable,  // テーブルを再度有効化
  disableColumn,  // カラムを無効化
  enableColumn,  // カラムを再度有効化
  autoCorrect,  // レコードの予測変換
  autoCorrectFromArray,  // 配列の予測変換
  scanTexts,  // 文字列を再スキャンする
  getConvertProgress,  // 変換の進捗状況を取得する関数
} from "./103_search_text_validate.js";
import { setBugMode } from "./104_search_text.js";


export async function test102() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 41; i++ ) {
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
        console.log(`レイヤー「search_text」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「search_text」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  await startUp("http://localhost:3000/", true);
  const { tableId: tableId } = await createTable("名簿");
  await scanTexts( tableId );
  const { columnId: columnId1 } = await createColumn( tableId, "学年", "INTEGER", null );
  const { columnId: columnId2 } = await createColumn( tableId, "氏名", "TEXT", null );
  await createRecord( tableId, {
    [columnId1]: 3,
    [columnId2]: "田中次郎",
  });
  await createRecord( tableId, {
    [columnId1]: 1,
    [columnId2]: "田中太郎",
  });
  await createRecord( tableId, {
    [columnId1]: 3,
    [columnId2]: "佐藤",
  });
  const suggestions = await autoCorrect( 
    tableId, 
    columnId2, 
    "た",
    {
      [columnId1]: 3,
    }
  );
  await close();

}