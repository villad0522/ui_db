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
  addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  regeneratePage,
} from "./040_regenerate_page_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./052_frontend_files_validate.js";
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
  clearCache,
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
} from "./064_page_and_view_validate.js";
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
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
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
} from "./085_record_title_validate.js";
import {
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
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
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./082_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./079_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./076_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./073_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./070_generate_sql1_validate.js";
import {
  generateSQL,
} from "./058_joinedTable_validate.js";
import {
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
} from "./061_view_column_validate.js";
import {
  getPageDataForGUI,
  getPageDataForExcel,
  myFunc,
} from "./055_page_data_validate.js";
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
    const excelPath = path.join(staticPath,"light/template.xlsm");
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
