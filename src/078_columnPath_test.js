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
} from "./085_record_title_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./082_csv_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  listDataTypes,
} from "./118_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./100_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
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
} from "./103_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
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
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  formatField,
} from "./094_db_formatter_validate.js";
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
} from "./088_input_element_validate.js";
import {
  getPathLength,  // カラムパスの長さを取得する
  slicePath,  // パスを途中まで切り取る関数
  checkPath,  // パスの文法をチェックする関数
  pathToColumnId,  // パスをカラムIDに変換
} from "./079_columnPath_validate.js";
import { setBugMode } from "./080_columnPath.js";


export async function test078() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 11; i++ ) {
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
        console.log(`レイヤー「columnPath」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「columnPath」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  if( await getPathLength("main.c2 > c53 > c1") !== 3 ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await getPathLength("c2 > c53 > c1 > main") !== 4 ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("main.c2 > c53 > c1", 1 ) !== "main.c2" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("main.c2 > c53 > c1", 2 ) !== "main.c2 > c53" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("main.c2 > c53 > c1", 3 ) !== "main.c2 > c53 > c1" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("c2 > c53 > c1 > main", 1 ) !== "main" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("c2 > c53 > c1 > main", 2 ) !== "c1 > main" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("c2 > c53 > c1 > main", 3 ) !== "c53 > c1 > main" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await slicePath("c2 > c53 > c1 > main", 4 ) !== "c2 > c53 > c1 > main" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  await checkPath("main.c2 > c53 > c1");
  await checkPath("main.c2");
  await checkPath("c2 > c53 > c1 > main");
  //
  if( await pathToColumnId("main.c2 > c53 > c1") !== "c1" ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if( await pathToColumnId("c2 > c53 > c1 > main") !== "c2" ){
    throw "関数が想定通りの動作をしませんでした。";
  }

}