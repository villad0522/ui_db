import fs from 'fs';
import path from 'path';
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  deleteTable,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
} from "./094_column_name_validate.js";
import {
  getLocalIp,
} from "./118_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./106_csv_validate.js";
import {
  getPath,
} from "./115_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./112_connect_database_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./109_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./103_primary_key_validate.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./091_reserved_word_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
} from "./100_data_type_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./097_table_name_validate.js";
import {
  startUp,  // プログラム起動
  createRecord,  // レコードを作成
  updateRecord,  // レコードを上書き
  delete_table,  // 不可逆的にテーブルを削除
  deleteRecord,  // レコードを削除
  disableTable,  // テーブルを無効化
  enableTable,  // テーブルを再度有効化
  disableColumn,  // カラムを無効化
  enableColumn,  // カラムを再度有効化
  autoCorrect,  // 予測変換
} from "./088_search_text_validate.js";
import { setBugMode } from "./089_search_text.js";


export async function test087() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 17; i++ ) {
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
  console.log(suggestions);
  await close();

}