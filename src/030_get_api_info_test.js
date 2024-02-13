import fs from 'fs';
import path from 'path';
import {
  startUp,
  deleteTable,
  createPage,
  updatePageName,
  createView,
  deleteView,
  deletePage,
  pastePage,
  regeneratePage,
} from "./037_regenerate_page_validate.js";
import {
  getLocalIp,
} from "./130_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./049_frontend_files_validate.js";
import {
  getPath,
} from "./127_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./124_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./106_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./121_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./118_primary_key_validate.js";
import {
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  getBreadcrumbs,
  cutPage,
  copyPage,
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
  isExistView,
} from "./061_page_and_view_validate.js";
import {
  createColumn,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./058_view_column_validate.js";
import {
  listDataTypes,
} from "./115_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./097_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./103_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
} from "./100_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./109_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./112_sort_validate.js";
import {
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  _getParentValue,
  _getRecordOffset,
} from "./082_record_title_validate.js";
import {
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./094_system_auto_correct_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
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
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./079_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./076_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./073_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./070_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./067_generate_sql1_validate.js";
import {
  generateSQL,
} from "./055_joinedTable_validate.js";
import {
  getPageData,
} from "./052_page_data_validate.js";
import {
  generateViewHTML,
} from "./046_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./043_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
} from "./040_regenerate_api_info_validate.js";
import {
  transferData,
  masterFaculty,
  masterLab,
  masterUser,
  masterSpecies,
  masterPhylogeny,
  masterCompany,
  masterOrigin,
  masterProductType,
  masterItem,
  masterPayment,
  masterRoom,
  masterPrice,
  masterAction,
  masterSex,
  buyData,
  broodbookData,
  historyData,
  increaseAndDecreaseData,
  numberOfAnimalData,
  budgetData,
  billData,
  _clearTable,
  _checkSourceTable,
} from "./034_data_transfer_validate.js";
import {
  getEndpointInfo,  // エンドポイントの情報を取得
  listEndpoints,  // エンドポイントを全て取得
  clearCache,  // インメモリキャッシュを削除する
} from "./031_get_api_info_validate.js";
import { setBugMode } from "./032_get_api_info.js";


export async function test030() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 7; i++ ) {
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
        console.log(`レイヤー「get_api_info」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「get_api_info」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    await getEndpointInfo( "/default/tables" );
    await getEndpointInfo( "/default/page_editor" );
    await listEndpoints();
    await close();

}