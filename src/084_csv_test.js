import fs from 'fs';
import path from 'path';
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  getParentValue,
  _getRecordOffset,
} from "./088_record_title_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
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
  listDataTypes,
} from "./121_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  listChildrenColumnId,
} from "./103_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
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
  reload,
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
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";
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
} from "./091_input_element_validate.js";
import {
  createRecordsFromCsv,  // CSVファイルインポート
  getCsvProgress,  // インポートの進捗状況を取得する関数
  destroyCSV,  // インポートを中断する関数
  close,  // バックエンドプログラム終了
} from "./085_csv_validate.js";
import { setBugMode } from "./086_csv.js";


export async function test084() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 25; i++ ) {
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
        console.log(`レイヤー「csv」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「csv」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    await getDebugMode();
    await startTransaction();
    await endTransaction();
    await close();
    //
    //
    await startUp("http://localhost:3000/", true);
    //
    // CSVファイルに書き込むデータ
    const data = [
        ['John Doe', 25, 'New York'],
        ['Jane Smith', 30, 'San Francisco'],
        ['Bob Johnson', 22, 'Los Angeles']
    ];
    const csvText = data.map(row => row.join(',')).join('\n');
    //
    // CSVファイルのパス
    const cachePath = await getPath("CACHE");
    const csvFilePath = path.join(cachePath, 'test.csv');
    //
    // CSVファイルを作成してデータを書き込む
    await fs.promises.writeFile(csvFilePath, csvText, 'utf8');
    //
    // CSVファイルからデータベースに読み込む
    await createRecordsFromCsv( "テスト用CSVデータ", csvFilePath );
    //
    // テーブルから読み出す
    const matrix = await runSqlReadOnly(`SELECT * FROM テスト用CSVデータ;`,{});
    if (matrix.length !== data.length) {
        console.log(matrix);
        throw `インポートしたはずの件数と合致しません`;
    }
    if (matrix[0]["c1"] !== data[0][0]) {
        console.log(matrix);
        throw `インポートしたはずの内容と合致しません`;
    }
    //
    // CSVファイルを削除
    await fs.promises.rm(csvFilePath);
    //
    // テスト用のテーブルを削除
    await runSqlWriteOnly(`
        DROP TABLE IF EXISTS テスト用CSVデータ;
    `,{});
    //
    // わざと再接続
    await startUp("localhost:3000", true);
    //
    await close();

}