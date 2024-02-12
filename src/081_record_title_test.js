import fs from 'fs';
import path from 'path';
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  deleteViewInput,
  changeInputType,
  _fillMasterData,
  getInputType,
  updateRecordsFromView,
  createRecordFromView,
  _convertToRecord,
} from "./085_input_element_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./121_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./103_column_name_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./094_relation_validate.js";
import {
  listDataTypes,
} from "./112_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./100_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./106_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./109_sort_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
import {
} from "./088_records_validate.js";
import {
  startUp,  // プログラム起動
  setTitleColumn,  // 【サブ】見出しの役割を果たすカラムを登録する
  getTitleColumnId,  // 【サブ】見出しの役割を果たすカラムを取得する
  listTables,  // テーブルの一覧を取得(重)
  deleteTable,  // 不可逆的にテーブルを削除
  clearCache,  // インメモリキャッシュを削除する
  _getRecordIdFromTitle,  // 【サブ】文字列からレコードIDを取得
  createColumn,  // カラムを作成
  setTitleColumnsFromUI,  // 見出しの役割を果たすカラムを登録する
  _deleteTitleColumn,  // 【サブ】見出しを登録解除する
  listRecords,  // レコードの一覧を取得(GUI)
  _getParentValue,  // 【サブ】親テーブルの値を取得
  createRecordFromUI,  // レコードを追加
  _getRecordOffset,  // 【サブ】親テーブルのスクロール位置を取得
} from "./082_record_title_validate.js";
import { setBugMode } from "./083_record_title.js";


export async function test081() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 42; i++ ) {
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
        console.log(`レイヤー「record_title」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「record_title」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  await startUp("http://localhost:3000/", true);
  await createTable("クラス一覧");
  await listTables( 1, 35, false );
  await close();

}