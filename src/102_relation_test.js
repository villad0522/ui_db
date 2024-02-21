import fs from 'fs';
import path from 'path';
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
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
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
  startUp,  // プログラム起動
  createColumn,  // カラムを作成
  listColumnsForGUI,  // カラムの一覧を取得(GUI)
  clearCache,  // インメモリキャッシュを削除する
  deleteTable,  // 不可逆的にテーブルを削除
  listColumnsAll,  // カラムの一覧を取得
  getParentTableId,  // 参照先のテーブルIDを取得する
  getDataType,  // データ型を取得
  checkField,  // フィールドを検証
  checkRecord,  // レコードを検証
  createRecord,  // レコードを作成
  updateRecords,  // レコードを上書き
  listChildrenColumnId,  // 参照元のカラムIDの一覧を取得する
} from "./103_relation_validate.js";
import { setBugMode } from "./104_relation.js";


export async function test102() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 29; i++ ) {
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
        console.log(`レイヤー「relation」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「relation」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
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
    if(await getParentTableId(columnId2)!==tableId1){
      throw "想定外のテスト結果です";
    }
    //
    const columns = await listColumnsAll( tableId2 );
    if( columns.length !== 2 ){
      console.error(columns);
      throw `カラムの個数が想定外です`;
    }
    await listColumnsForGUI( tableId2, 1, 100, false );
    //
    await disableTable( tableId2 );
    await listColumnsForGUI( tableId2, 1, 100, false );
    //
    await disableColumn( columnId2 );
    await listColumnsForGUI( tableId2, 1, 100, false );
    //
    await deleteTable(tableId2);
    await close();

}