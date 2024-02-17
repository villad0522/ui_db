// データ移行
//
import {
  startUp,
  close,
  openExcel,
  _launchExcelApp,
  _handleEditExcelFile,
} from "./031_excel_instance_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
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
  createColumn,
  deleteTable,
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
  createPage,
  deleteTemplate,
  updateTemplateName,
  listTemplates,
  getExcelTemplate,
} from "./034_excel_template_validate.js";
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
  createDirectories,
} from "./052_frontend_files_validate.js";
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
import {
  updateExcel,
  _updateExcelSheet,
} from "./037_excel_file_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// データ移行
export async function transferData_core( processName ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  switch( processName ){
    case "学部マスタ":
      if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterFaculty_core();
    case "教室マスタ":
      if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterLab_core();
    case "実験者マスタ":
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterUser_core();
    case "動物種マスタ":
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterSpecies_core();
    case "系統マスタ":
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterPhylogeny_core();
    case "業者マスタ":
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterCompany_core();
    case "由来マスタ":
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterOrigin_core();
    case "購入規格マスタ":
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterProductType_core();
    case "購入品マスタ":
      if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterItem_core();
    case "支払マスタ":
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterPayment_core();
    case "飼育室マスタ":
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterRoom_core();
    case "管理費単価マスタ":
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterPrice_core();
    case "飼育操作マスタ":
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterAction_core();
    case "性別マスタ":
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterSex_core();
    case "購入データ":
      if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
      return await buyData_core();
    case "飼育台帳データ":
      if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
      return await broodbookData_core();
    case "飼育履歴データ":
      if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
      return await historyData_core();
    case "動物増減データ":
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      return await increaseAndDecreaseData_core();
    case "飼育数データ":
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
      return await numberOfAnimalData_core();
    case "予算実績データ":
      if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
      return await budgetData_core();
    case "請求データ":
      if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
      return await billData_core();
    default:
      throw "データを移行しようとしましたが失敗しました。サポートされていない処理名です。";
  }
}


// 学部マスタ
export async function masterFaculty_core(  ){
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_教室マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("学部マスタ");
  await createColumn( t1, "学部名", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 学部マスタ (
        学部名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列2,
          IFNULL( 100 / CAST(列1 AS REAL), MAX(sort_number) / 1000 ) AS sort_number2,
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_教室マスタ
        GROUP BY 列2;`,
    {},
  );
  return "データの移行が完了しました。";
}

// 教室マスタ
export async function masterLab_core(  ){
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_教室マスタ", "学部マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("教室マスタ");
  await createColumn( t1, "教室名", "TEXT", null );
  await createColumn( t1, "有効／無効", "BOOL", null );
  await createColumn( t1, "所属学部", "POINTER", await getTableIdFromName("学部マスタ") );
  await createColumn( t1, "基礎/臨床", "TEXT", null );
  await createColumn( t1, "教室コード", "TEXT", null );
  await createColumn( t1, "教室略称", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 教室マスタ (
        教室コード,
        有効／無効,
        所属学部,
        基礎/臨床,
        教室略称,
        教室名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列0,
          1,
          IFNULL( ${await getTableIdFromName("学部マスタ")}_id, 列2 ),
          列3,
          列5,
          列6,
          IFNULL( 100 / CAST(列4 AS REAL), MAX(csv.sort_number) / 1000 ) AS sort_number2,
          csv.created_at,
          csv.updated_at
        FROM CSV_教室マスタ AS csv
        LEFT OUTER JOIN 学部マスタ
          ON 列2 = 学部名
        GROUP BY csv.sort_number;`,
    {},
  );
  //
  // 不要になったテーブルを削除する
  await deleteTable(await getTableIdFromName("CSV_教室マスタ"));
  return "データの移行が完了しました。";
}

// 実験者マスタ
export async function masterUser_core(  ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_実験者マスタ", "教室マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("実験者マスタ");
  await createColumn( t1, "氏名", "TEXT", null );
  await createColumn( t1, "所属教室", "POINTER", await getTableIdFromName("教室マスタ") );
  await createColumn( t1, "有効／無効2", "BOOL", null );
  await createColumn( t1, "実験者コード", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 実験者マスタ (
        所属教室,
        実験者コード,
        氏名,
        有効／無効2,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          IFNULL( ${await getTableIdFromName("教室マスタ")}_id, 列0 ),
          列1,
          列2,
          1,
          csv.sort_number,
          csv.created_at,
          csv.updated_at
        FROM CSV_実験者マスタ AS csv
        LEFT OUTER JOIN 教室マスタ
          ON 列0 = 教室コード
        GROUP BY csv.sort_number;`,
    {},
  );
  //
  // 不要になったテーブルを削除する
  await deleteTable(await getTableIdFromName("CSV_実験者マスタ"));
  return "データの移行が完了しました。";
}

// 動物種マスタ
export async function masterSpecies_core(  ){
  if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_動物種マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("動物種マスタ");
  await createColumn( t1, "動物種名", "TEXT", null );
  await createColumn( t1, "動物種番号", "INTEGER", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 動物種マスタ (
        動物種番号,
        動物種名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列0,
          列1,
          csv.sort_number,
          csv.created_at,
          csv.updated_at
        FROM CSV_動物種マスタ AS csv
        GROUP BY csv.sort_number;`,
    {},
  );
  //
  // 不要になったテーブルを削除する
  await deleteTable(await getTableIdFromName("CSV_動物種マスタ"));
  return "データの移行が完了しました。";
}

// 系統マスタ
export async function masterPhylogeny_core(  ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_系統マスタ", "動物種マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("系統マスタ");
  await createColumn( t1, "系統名", "TEXT", null );
  await createColumn( t1, "動物種", "POINTER", await getTableIdFromName("動物種マスタ") );
  await createColumn( t1, "系統番号", "INTEGER", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 系統マスタ (
        系統番号,
        系統名,
        動物種,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列0,
          列1,
          ${await getTableIdFromName("動物種マスタ")}_id,
          csv.sort_number,
          csv.created_at,
          csv.updated_at
        FROM CSV_系統マスタ AS csv
        LEFT OUTER JOIN 動物種マスタ
          ON 列2 = 動物種番号
        GROUP BY csv.sort_number;`,
    {},
  );
  //
  // 不要になったテーブルを削除する
  await deleteTable(await getTableIdFromName("CSV_系統マスタ"));
  return "データの移行が完了しました。";
}

// 業者マスタ
export async function masterCompany_core(  ){
  if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_由来マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("業者マスタ");
  await createColumn( t1, "業者名", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 業者マスタ (
        業者名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列1,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_由来マスタ
        GROUP BY 列1;`,
    {},
  );
  await runSqlWriteOnly(
    `INSERT INTO 業者マスタ (
        業者名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列11,
          MAX(sort_number) * 100,
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_購入データ
        GROUP BY 列11;`,
    {},
  );
  return "データの移行が完了しました。";
}

// 由来マスタ
export async function masterOrigin_core(  ){
  if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_由来マスタ", "動物種マスタ", "業者マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("由来マスタ");
  await createColumn( t1, "動物種", "POINTER", await getTableIdFromName("動物種マスタ") );
  await createColumn( t1, "仕入業者", "POINTER", await getTableIdFromName("業者マスタ") );
  await createColumn( t1, "由来番号", "INTEGER", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 由来マスタ (
        動物種,
        仕入業者,
        由来番号,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          ${await getTableIdFromName("動物種マスタ")}_id,
          ${await getTableIdFromName("業者マスタ")}_id,
          列0,
          MAX(csv.sort_number),
          MAX(csv.created_at),
          MAX(csv.updated_at)
        FROM CSV_由来マスタ AS csv
        LEFT OUTER JOIN 動物種マスタ
          ON 列2 = 動物種番号
        LEFT OUTER JOIN 業者マスタ
          ON 列1 = 業者名
        GROUP BY csv.sort_number;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_由来マスタ"));
  return "データの移行が完了しました。";
}

// 購入規格マスタ
export async function masterProductType_core(  ){
  if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_購入規格マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("購入規格マスタ");
  await createColumn( t1, "規格名", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 購入規格マスタ (
        規格名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列0,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_購入規格マスタ
        GROUP BY sort_number;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_購入規格マスタ"));
  return "データの移行が完了しました。";
}

// 購入品マスタ
export async function masterItem_core(  ){
  if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_購入品マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("購入品マスタ");
  await createColumn( t1, "購入品名", "TEXT", null );
  await createColumn( t1, "単価", "REAL", null );
  await createColumn( t1, "消費税を自動計算する？", "BOOL", null );
  await createColumn( t1, "購入品コード", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 購入品マスタ (
        購入品名,
        単価,
        消費税を自動計算する？,
        購入品コード,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列1,
          列2,
          列3,
          列0,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_購入品マスタ
        GROUP BY sort_number;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_購入品マスタ"));
  return "データの移行が完了しました。";
}

// 支払マスタ
export async function masterPayment_core(  ){
  if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_支払マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("支払マスタ");
  await createColumn( t1, "支払い方法", "TEXT", null );
  await createColumn( t1, "オンオフ？", "BOOL", null );
  await createColumn( t1, "支払い方法ID", "INTEGER", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 支払マスタ (
        支払い方法,
        オンオフ？,
        支払い方法ID,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列1,
          列2,
          列0,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_支払マスタ
        GROUP BY sort_number;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_支払マスタ"));
  return "データの移行が完了しました。";
}

// 飼育室マスタ
export async function masterRoom_core(  ){
  if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_Roomマスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("フロアマスタ");
  await createColumn( t1, "フロア（１階～４階）", "INTEGER", null );
  const t2 = await _clearTable_core("飼育室マスタ");
  await createColumn( t2, "飼育室名", "TEXT", null );
  await createColumn( t2, "フロア", "POINTER", t1 );
  await createColumn( t2, "有効／無効", "BOOL", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 飼育室マスタ (
        飼育室名,
        有効／無効,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列0,
          1,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_Roomマスタ
        GROUP BY sort_number;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_Roomマスタ"));
  return "データの移行が完了しました。";
}

// 管理費単価マスタ
export async function masterPrice_core(  ){
  if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_管理費単価マスタ", "動物種マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("管理費単価マスタ");
  await createColumn( t1, "飼料規格名", "TEXT", null );
  await createColumn( t1, "単価", "REAL", null );
  await createColumn( t1, "動物種", "POINTER", await getTableIdFromName("動物種マスタ") );
  await createColumn( t1, "飼料コード", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 管理費単価マスタ (
        飼料規格名,
        単価,
        動物種,
        飼料コード,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列2,
          列3,
          ${await getTableIdFromName("動物種マスタ")}_id,
          列0,
          MAX(csv.sort_number),
          MAX(csv.created_at),
          MAX(csv.updated_at)
        FROM CSV_管理費単価マスタ AS csv
        LEFT OUTER JOIN 動物種マスタ
          ON 列4 = 動物種番号
        GROUP BY csv.sort_number;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_管理費単価マスタ"));
  return "データの移行が完了しました。";
}



// 飼育操作マスタ
export async function masterAction_core(  ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_コンスタントマスタ", "CSV_飼育台帳データ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("飼育操作マスタ");
  await createColumn( t1, "操作名", "TEXT", null );
  await createColumn( t1, "操作番号（1～10）", "INTEGER", null );
  await createColumn( t1, "操作番号（1～A）", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 飼育操作マスタ (
        操作名,
        操作番号（1～10）,
        操作番号（1～A）,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列6,
          列2,
          列5,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_コンスタントマスタ
        GROUP BY sort_number;`,
    {},
  );
  await runSqlWriteOnly(
    `INSERT INTO 飼育操作マスタ (
        操作名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列27,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_飼育台帳データ
        GROUP BY 列27;`,
    {},
  );
  await deleteTable(await getTableIdFromName("CSV_コンスタントマスタ"));
  return "データの移行が完了しました。";
}


// 性別マスタ
export async function masterSex_core(  ){
  if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_飼育台帳データ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("性別マスタ");
  await createColumn( t1, "性別", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 性別マスタ (
        性別,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列7,
          MAX(sort_number),
          MAX(created_at),
          MAX(updated_at)
        FROM CSV_飼育台帳データ
        GROUP BY 列7;`,
    {},
  );
  return "データの移行が完了しました。";
}






// 購入データ
export async function buyData_core(  ){
  if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([
    "CSV_購入データ",
    "支払マスタ",
    "教室マスタ",
    "実験者マスタ",
    "購入品マスタ",
    "系統マスタ",
    "購入規格マスタ",
    "性別マスタ",
    "業者マスタ",
  ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("購入データ");
  await createColumn( t1, "発注番号", "INTEGER", null );
  await createColumn( t1, "請求年度", "INTEGER", null );
  await createColumn( t1, "請求月", "INTEGER", null );
  await createColumn( t1, "請求日時", "INTEGER", null );
  await createColumn( t1, "支払区分", "POINTER", await getTableIdFromName("支払マスタ") );
  await createColumn( t1, "教室", "POINTER", await getTableIdFromName("教室マスタ") );
  await createColumn( t1, "実験者", "POINTER", await getTableIdFromName("実験者マスタ") );
  await createColumn( t1, "入荷日時", "INTEGER", null );
  await createColumn( t1, "購入品", "POINTER", await getTableIdFromName("購入品マスタ") );
  await createColumn( t1, "系統", "POINTER", await getTableIdFromName("系統マスタ") );
  await createColumn( t1, "購入規格", "POINTER", await getTableIdFromName("購入規格マスタ") );
  await createColumn( t1, "性別2", "POINTER", await getTableIdFromName("性別マスタ") );
  await createColumn( t1, "業者", "POINTER", await getTableIdFromName("業者マスタ") );
  await createColumn( t1, "数量", "REAL", null );
  await createColumn( t1, "単価2", "REAL", null );
  await createColumn( t1, "金額", "REAL", null );
  await createColumn( t1, "消費税", "REAL", null );
  await createColumn( t1, "税込額", "REAL", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 購入データ (
        支払区分,
        教室,
        実験者,
        請求年度,
        請求月,
        請求日時,
        入荷日時,
        発注番号,
        購入品,
        系統,
        購入規格,
        性別2,
        業者,
        数量,
        単価2,
        金額,
        消費税,
        税込額,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          IFNULL( ${await getTableIdFromName("支払マスタ")}_id, 列0 ),
          IFNULL( ${await getTableIdFromName("教室マスタ")}_id, 列1 ),
          IFNULL( ${await getTableIdFromName("実験者マスタ")}_id, 列2 ),
          CAST( STRFTIME( '%Y', 列3 / 1000, 'UNIXEPOCH', 'LOCALTIME', '-3 MONTHS', 'START OF YEAR' ) AS INTEGER ) AS '請求年度',
          CAST( STRFTIME('%m', 列3 / 1000, 'UNIXEPOCH', 'LOCALTIME' ) AS INTEGER ) AS '請求月',
          列3,
          列4,
          CAST( 列5 AS INTEGER ),
          IFNULL( ${await getTableIdFromName("購入品マスタ")}_id, 列6 ),
          IFNULL( ${await getTableIdFromName("系統マスタ")}_id, 列8 ),
          IFNULL( ${await getTableIdFromName("購入規格マスタ")}_id, 列9 ),
          IFNULL( ${await getTableIdFromName("性別マスタ")}_id, 列10 ),
          IFNULL( ${await getTableIdFromName("業者マスタ")}_id, 列11 ),
          CAST( 列14 AS INTEGER ),
          CAST( LTRIM( 列15, '\\' ) AS REAL ),
          CAST( LTRIM( 列16, '\\' ) AS REAL ),
          CAST( LTRIM( 列17, '\\' ) AS REAL ),
          CAST( LTRIM( 列18, '\\' ) AS REAL ),
          csv.sort_number,
          csv.created_at,
          csv.updated_at
        FROM CSV_購入データ AS csv
        LEFT OUTER JOIN 支払マスタ
          ON 列0 = 支払い方法ID
        LEFT OUTER JOIN 教室マスタ
          ON 列1 = 教室コード
        LEFT OUTER JOIN 実験者マスタ
          ON 列2 = 実験者コード
        LEFT OUTER JOIN 購入品マスタ
          ON 列6 = 購入品コード
        LEFT OUTER JOIN 系統マスタ
          ON 列8 = 系統名
        LEFT OUTER JOIN 購入規格マスタ
          ON 列9 = 規格名
        LEFT OUTER JOIN 性別マスタ
          ON 列10 = 性別
        LEFT OUTER JOIN 業者マスタ
          ON 列11 = 業者名
        GROUP BY csv.sort_number;`,
    {},
  );
  return "データの移行が完了しました。";
}








// 飼育台帳データ
export async function broodbookData_core(  ){
  if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([
    "CSV_飼育台帳データ",
    "支払マスタ",
    "教室マスタ",
    "実験者マスタ",
    "動物種マスタ",
    "系統マスタ",
    "性別マスタ",
    "管理費単価マスタ",
    "飼育室マスタ",
    "購入規格マスタ",
    "業者マスタ",
    "購入データ",
  ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("飼育台帳データ");
  await createColumn( t1, "入舎年度", "INTEGER", null );
  await createColumn( t1, "入舎月", "INTEGER", null );
  await createColumn( t1, "入舎日時", "INTEGER", null );
  await createColumn( t1, "支払区分", "POINTER", await getTableIdFromName("支払マスタ") );
  await createColumn( t1, "教室", "POINTER", await getTableIdFromName("教室マスタ") );
  await createColumn( t1, "実験者", "POINTER", await getTableIdFromName("実験者マスタ") );
  await createColumn( t1, "動物種2", "POINTER", await getTableIdFromName("動物種マスタ") );
  await createColumn( t1, "系統", "POINTER", await getTableIdFromName("系統マスタ") );
  await createColumn( t1, "ケージ番号", "TEXT", null );
  await createColumn( t1, "ケージサブ番号", "TEXT", null );
  await createColumn( t1, "性別2", "POINTER", await getTableIdFromName("性別マスタ") );
  await createColumn( t1, "飼料", "POINTER", await getTableIdFromName("管理費単価マスタ") );
  await createColumn( t1, "飼育室", "POINTER", await getTableIdFromName("飼育室マスタ") );
  await createColumn( t1, "床（C）", "TEXT", null );
  await createColumn( t1, "退舎年度", "INTEGER", null );
  await createColumn( t1, "退舎月", "INTEGER", null );
  await createColumn( t1, "退舎日時", "INTEGER", null );
  await createColumn( t1, "餌期", "INTEGER", null );
  await createColumn( t1, "退舎予定日", "INTEGER", null );
  await createColumn( t1, "出生日", "INTEGER", null );
  await createColumn( t1, "購入規格", "POINTER", await getTableIdFromName("購入規格マスタ") );
  await createColumn( t1, "業者", "POINTER", await getTableIdFromName("業者マスタ") );
  await createColumn( t1, "コメント", "TEXT", null );
  await createColumn( t1, "アニマルセンター備考欄", "TEXT", null );
  await createColumn( t1, "発注番号2", "POINTER", await getTableIdFromName("購入データ") );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 飼育台帳データ (
        支払区分,
        教室,
        実験者,
        動物種2,
        系統,
        ケージ番号,
        ケージサブ番号,
        性別2,
        飼料,
        飼育室,
        床（C）,
        入舎日時,
        入舎年度,
        入舎月,
        退舎日時,
        退舎年度,
        退舎月,
        餌期,
        退舎予定日,
        出生日,
        購入規格,
        業者,
        発注番号2,
        コメント,
        アニマルセンター備考欄,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          IFNULL( ${await getTableIdFromName("支払マスタ")}_id, 列0 ),
          IFNULL( ${await getTableIdFromName("教室マスタ")}_id, 列1 ),
          IFNULL( ${await getTableIdFromName("実験者マスタ")}_id, 列2 ),
          IFNULL( ${await getTableIdFromName("動物種マスタ")}_id, 列3 ),
          IFNULL( ${await getTableIdFromName("系統マスタ")}_id, 列4 ),
          列5,
          列6,
          IFNULL( ${await getTableIdFromName("性別マスタ")}_id, 列7 ),
          IFNULL( ${await getTableIdFromName("管理費単価マスタ")}_id, 列8 ),
          IFNULL( ${await getTableIdFromName("飼育室マスタ")}_id, 列9 ),
          列11,
          列14,
          CAST( STRFTIME( '%Y', 列14 / 1000, 'UNIXEPOCH', 'LOCALTIME', '-3 MONTHS', 'START OF YEAR' ) AS INTEGER ),
          CAST( STRFTIME( '%m', 列14 / 1000, 'UNIXEPOCH', 'LOCALTIME' ) AS INTEGER ),
          列15,
          CAST( STRFTIME( '%Y', 列15 / 1000, 'UNIXEPOCH', 'LOCALTIME', '-3 MONTHS', 'START OF YEAR' ) AS INTEGER ),
          CAST( STRFTIME( '%m', 列15 / 1000, 'UNIXEPOCH', 'LOCALTIME' ) AS INTEGER ),
          列16,
          列17,
          列18,
          IFNULL( ${await getTableIdFromName("購入規格マスタ")}_id, 列20 ),
          IFNULL( ${await getTableIdFromName("業者マスタ")}_id, 列21 ),
          IFNULL( ${await getTableIdFromName("購入データ")}_id, 列25 ),
          列23,
          列24,
          csv.sort_number,
          csv.created_at,
          csv.updated_at
        FROM CSV_飼育台帳データ AS csv
        LEFT OUTER JOIN 支払マスタ
          ON 列0 = 支払い方法ID
        LEFT OUTER JOIN 教室マスタ
          ON 列1 = 教室コード
        LEFT OUTER JOIN 実験者マスタ
          ON 列2 = 実験者コード
        LEFT OUTER JOIN 動物種マスタ
          ON 列3 = 動物種番号
        LEFT OUTER JOIN 系統マスタ
          ON 列4 = 系統番号
        LEFT OUTER JOIN 性別マスタ
          ON 列7 = 性別
        LEFT OUTER JOIN 管理費単価マスタ
          ON 列8 = 飼料コード
        LEFT OUTER JOIN 飼育室マスタ
          ON 列9 = 飼育室名
        LEFT OUTER JOIN 購入規格マスタ
          ON 列20 = 規格名
        LEFT OUTER JOIN 業者マスタ
          ON 列21 = 業者名
        LEFT OUTER JOIN 購入データ
          ON 列25 = 発注番号
        GROUP BY csv.sort_number;`,
    {},
  );
  return "データの移行が完了しました。";
}

// 飼育履歴データ
export async function historyData_core(  ){
  if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 動物増減データ
export async function increaseAndDecreaseData_core(  ){
  if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 飼育数データ
export async function numberOfAnimalData_core(  ){
  if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 予算実績データ
export async function budgetData_core(  ){
  if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 請求データ
export async function billData_core(  ){
  if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 【サブ】テーブルを作り直す
export async function _clearTable_core( tableName ){
  if(bugMode === 44) throw "MUTATION44";  // 意図的にバグを混入させる（ミューテーション解析）
  const oldTableId = await getTableIdFromName(tableName);
  if( oldTableId ){
    if(bugMode === 45) throw "MUTATION45";  // 意図的にバグを混入させる（ミューテーション解析）
    await deleteTable(oldTableId);
  }
  const { tableId: newTableId } = await createTable(tableName);
  return newTableId;
}

// 【サブ】テーブルの存在をチェックする
export async function _checkSourceTable_core( tableNames ){
  if(bugMode === 46) throw "MUTATION46";  // 意図的にバグを混入させる（ミューテーション解析）
  for( const tableName of tableNames ){
    if(bugMode === 47) throw "MUTATION47";  // 意図的にバグを混入させる（ミューテーション解析）
    if(!await getTableIdFromName(tableName)){
      if(bugMode === 48) throw "MUTATION48";  // 意図的にバグを混入させる（ミューテーション解析）
      if(String(tableName).startsWith("CSV_")){
        throw `テーブル「${tableName}」が存在しません。先にCSVファイルをアップロードしてください。`;
      }
      else{
        throw `テーブル「${tableName}」が存在しません。先にマスターデータを構築してください。`;
      }
    }
  }
}