// Excelテンプレート
//
import {
  startUp,
  createColumn,
  deleteTable,
  createPage,
  updatePageName,
  createView,
  deleteView,
  deletePage,
  pastePage,
  updateView,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  regeneratePage,
  addViewColumn,
} from "./040_regenerate_page_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./052_frontend_files_validate.js";
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
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  clearCache,
  _createViewColumnOuter,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  getViewColumnFromColumn,
  getViewColumnName,
  getViewColumnFromName,
  _autoCorrectColumnsToParents,
  _autoCorrectColumnsToChildren,
  getViewColumnInfo,
  addColumnPath,
  autoCorrectColumnPath,
  createViewColumn,
} from "./064_view_column_validate.js";
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
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
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
  _getConditions,
  generateSQL,
  getExtractionsAsJP,
  autoCorrectConditionalValue,
  deleteCondition,
  addCondition,
} from "./061_extract_and_sort_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./085_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./082_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./079_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./076_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./073_generate_sql1_validate.js";
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
} from "./067_page_and_view_validate.js";
import {
  getPageDataForGUI,
  getPageDataForExcel,
  _getDataList,
  _getSheetDatas,
} from "./058_page_data_validate.js";
import {
  getExcelId,
} from "./055_excel_multiple_validate.js";
import {
  generateViewHTML_table,
  generateViewHTML_card,
  generateViewHTML_button,
} from "./049_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./046_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
  _getDataType,
} from "./043_regenerate_api_info_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



import path from 'path';
import fs from 'fs';


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    await reserveWord("excel_templates"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS excel_templates (
            "page_id" INTEGER PRIMARY KEY,
            "excel_file_data" BLOB
        );`,
        {},
    );
}


// 不可逆的にテンプレートを削除
export async function deleteTemplate_core( templateId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM excel_templates
            WHERE template_id = :templateNumber;`,
        {
            ":templateNumber": templateId.replace("t",""),
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTemplate( templateId );  // 下層の関数を実行する
}



// Excelテンプレートを取得
export async function getExcelTemplate_core( pageId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // データベースからファイルデータを読み込んで、ローカルフォルダに書き出す
    const files = await runSqlReadOnly(
      `SELECT
          excel_file_data AS excelFileData
        FROM excel_templates
        WHERE page_id = :pageId
        LIMIT 1;`,
        {
            ":pageId": pageId,
        },
    );
    if(files.length>=1){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        // Excelファイルが見つかった場合
        return files[0]["excelFileData"];
    }
    // Excelファイルが見つからない場合
    const staticPath = await getPath( "STATIC_DATA" );
    const excelPath = path.join(staticPath,"light/template.xlsx");
    const excelFileData = await fs.promises.readFile(excelPath);
    //
    await runSqlWriteOnly(
        `INSERT INTO excel_templates (page_id, excel_file_data )
            VALUES ( :pageId, :excelFileData );`,
        {
            ":pageId": pageId,
            ":excelFileData": excelFileData,
        },
    );
    return excelFileData;
}




// Excelテンプレートを保存
export async function updateExcelTemplate_core( pageId, excelFileData ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `INSERT OR REPLACE INTO excel_templates (page_id, excel_file_data )
            VALUES ( :pageId, :excelFileData );`,
        {
            ":pageId": pageId,
            ":excelFileData": excelFileData,
        },
    );
}
