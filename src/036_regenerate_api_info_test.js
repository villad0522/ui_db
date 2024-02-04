import fs from 'fs';
import path from 'path';
import {
  startUp,
  close,
  createDirectories,
} from "./046_frontend_files_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
import {
  getPath,
} from "./121_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./118_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./097_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./112_csv_validate.js";
import {
  getPrimaryKey,
} from "./109_primary_key_validate.js";
import {
  deleteRecords,
} from "./106_delete_record_validate.js";
import {
  clearCache,
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
  getViewInfo,
} from "./058_page_and_view_validate.js";
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
} from "./055_view_column_validate.js";
import {
  listDataTypes,
} from "./103_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./088_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./094_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./079_record_title_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./091_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./100_table_name_validate.js";
import {
  formatField,
} from "./085_db_formatter_validate.js";
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
} from "./082_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./073_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./070_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./067_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./064_generate_sql1_validate.js";
import {
  generateSQL,
  deleteView,
} from "./052_joinedTable_validate.js";
import {
  getPageData,
} from "./049_page_data_validate.js";
import {
  generateViewHTML,
} from "./043_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./040_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,  // APIを再生成(予測変換)
  _getExample,  // 【サブ関数】入力例を取得
  regenerateAPI_create,  // APIを再生成(CREATE)
  regenerateAPI_read,  // APIを再生成(READ)
  regenerateAPI_update,  // APIを再生成(UPDATE)
  regenerateAPI_delete,  // APIを再生成(DELETE)
} from "./037_regenerate_api_info_validate.js";
import { setBugMode } from "./038_regenerate_api_info.js";


export async function test036() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 8; i++ ) {
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
        console.log(`レイヤー「regenerate_api_info」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「regenerate_api_info」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    

}