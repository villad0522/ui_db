import fs from 'fs';
import path from 'path';
import {
  close,
  createDirectories,
} from "./034_frontend_files_validate.js";
import {
  getLocalIp,
} from "./094_ip_address_validate.js";
import {
  getPath,
} from "./091_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
} from "./088_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./076_column_name_validate.js";
import {
  getPrimaryKey,
} from "./085_primary_key_validate.js";
import {
  clearCache,
  listEndpoints,
} from "./028_api_info_validate.js";
import {
  createColumn,
  generateSQL,
  createJoinedTable,
  deleteJoinedTable,
  addJoinedColumn,
} from "./037_joined_table_validate.js";
import {
  listDataTypes,
} from "./082_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./061_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./073_reserved_word_validate.js";
import {
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./067_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./064_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./079_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./070_record_title_2_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./055_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./052_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./049_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./046_generate_sql1_validate.js";
import {
  createPage,
  updatePageName,
  getPageInfo,
  listPagesFromTableId,
  getTableFromPage,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
} from "./040_pages_validate.js";
import {
  regenerateHTML,
} from "./031_regenerate_html_validate.js";
import {
  getEndpointInfo,
} from "./019_convert_array_validate.js";
import {
  runApi,
} from "./010_transaction_validate.js";
import {
  updateExcel,
  openExcel,
} from "./007_excel_edit_validate.js";
import {
  startUp,  // プログラム起動
  createTemplate,  // テンプレートを作成
  deleteTemplate,  // 不可逆的にテンプレートを削除
  updateTemplateName,  // テンプレート名を変更
  listTemplates,  // テンプレートの一覧を取得(重)
  getTemplateName,  // IDからテンプレート名を取得
} from "./004_excel_template_validate.js";
import { setBugMode } from "./005_excel_template.js";


export async function test003() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 12; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「excel_template」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「excel_template」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    await close();

}