import fs from 'fs';
import path from 'path';
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
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./088_reserved_word_validate.js";
import {
  listDataTypes,
} from "./097_data_type_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
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
  updateRecord,  // レコードを上書き
} from "./082_relation_validate.js";
import { setBugMode } from "./083_relation.js";


export async function test081() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 27; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
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
    await listColumnsAll( tableId2 );
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