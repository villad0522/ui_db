import fs from 'fs';
import path from 'path';
import {
  generateSQL,
  deleteView,
} from "./046_joinedTable_validate.js";
import {
  getLocalIp,
} from "./118_ip_address_validate.js";
import {
  getPath,
} from "./115_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./112_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./094_column_name_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./106_csv_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./109_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./103_primary_key_validate.js";
import {
  clearCache,
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
} from "./073_input_element_validate.js";
import {
  createColumn,
  createView,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./049_view_column_validate.js";
import {
  listDataTypes,
} from "./100_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./079_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./091_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./082_record_title_2_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./085_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./088_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./097_table_name_validate.js";
import {
  formatField,
} from "./076_db_formatter_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./067_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./064_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./061_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./058_generate_sql1_validate.js";
import {
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
  listAllPages,
  listStaticChildren,
  listChildrenView,
  getParentPage,
  listChildrenPage,
  _movePage,
  _generatePageSortNumber,
  _copyPage,
} from "./052_page_and_view_validate.js";
import {
  getPageData,
} from "./043_page_data_validate.js";
import {
  startUp,  // プログラム起動
  close,  // バックエンドプログラム終了
  createDirectories,  // フォルダを再帰的に作成
} from "./040_frontend_files_validate.js";
import { setBugMode } from "./041_frontend_files.js";


export async function test039() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 8; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「frontend_files」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「frontend_files」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
  await startUp("http://localhost:3000/", false);
  const customDirPath = await getPath("FRONTEND_CUSTOM");
  // フォルダを作成
  if (  !fs.existsSync(path.join(customDirPath,"qwert"))  ) {
    await fs.promises.mkdir(path.join(customDirPath,"qwert"));
  }
  // ファイルを作成
  await fs.promises.writeFile(path.join(customDirPath,"this_is_test.txt"),"ああああ");
  // ファイルを作成
  await fs.promises.writeFile(path.join(customDirPath,"./qwert/this_is_test.html"),"ああああ");
  // 監視イベントが反応するのを待つ
  await sleep(1000);
  // 再起動
  await close();
  await startUp("http://localhost:3000/", false);
  if (  !fs.existsSync(path.join(customDirPath,"./qwert/this_is_test.html"))  ) {
    throw "作ったはずのファイルが存在しません";
  }
  // フォルダを削除
  await fs.promises.rm(path.join(customDirPath,"qwert"),{recursive: true});
  // ファイルを削除
  await fs.promises.rm(path.join(customDirPath,"this_is_test.txt"));
  // 監視イベントが反応するのを待つ
  await sleep(1000);
  //
  await close();

}