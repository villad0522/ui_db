// データ移行
//
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
} from "./127_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./049_frontend_files_validate.js";
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
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
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
} from "./112_data_type_validate.js";
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
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
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
    case "由来マスタ":
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterOrigin_core();
    case "購入規格マスタ":
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterProductType_core();
    case "購入品マスタ":
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterItem_core();
    case "業者マスタ":
      if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterCompany_core();
    case "支払マスタ":
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterPayment_core();
    case "Roomマスタ":
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterRoom_core();
    case "管理費単価マスタ":
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      return await masterPrice_core();
    case "飼育台帳データ":
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      return await broodbookData_core();
    case "飼育履歴データ":
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      return await historyData_core();
    case "動物増減データ":
      if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
      return await increaseAndDecreaseData_core();
    case "飼育数データ":
      if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
      return await numberOfAnimalData_core();
    case "予算実績データ":
      if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
      return await budgetData_core();
    case "請求データ":
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      return await billData_core();
    case "購入データ":
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
      return await buyData_core();
    default:
      throw "データを移行しようとしましたが失敗しました。サポートされていない処理名です。";
  }
}


// 学部マスタ
export async function masterFaculty_core(  ){
  if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
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
          MAX(sort_number),
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
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_教室マスタ", "学部マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("教室マスタ");
  await createColumn( t1, "教室コード", "TEXT", null );
  await createColumn( t1, "謎の数字", "INTEGER", null );
  await createColumn( t1, "所属学部", "POINTER", await getTableIdFromName("学部マスタ") );
  await createColumn( t1, "基礎/臨床", "TEXT", null );
  await createColumn( t1, "並び順？", "REAL", null );
  await createColumn( t1, "教室略称", "TEXT", null );
  await createColumn( t1, "教室名", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 教室マスタ (
        教室コード,
        謎の数字,
        所属学部,
        基礎/臨床,
        並び順？,
        教室略称,
        教室名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          列0,
          列1,
          ${await getTableIdFromName("学部マスタ")}_id,
          列3,
          列4,
          列5,
          列6,
          MAX(csv.sort_number),
          MAX(csv.created_at),
          MAX(csv.updated_at)
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
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_実験者マスタ", "教室マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("実験者マスタ");
  await createColumn( t1, "所属教室", "POINTER", await getTableIdFromName("教室マスタ") );
  await createColumn( t1, "実験者コード", "TEXT", null );
  await createColumn( t1, "氏名", "TEXT", null );
  //
  // データを移行する
  await runSqlWriteOnly(
    `INSERT INTO 実験者マスタ (
        所属教室,
        実験者コード,
        氏名,
        sort_number,
        created_at,
        updated_at
      ) SELECT
          ${await getTableIdFromName("教室マスタ")}_id,
          列1,
          列2,
          MAX(csv.sort_number),
          MAX(csv.created_at),
          MAX(csv.updated_at)
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
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_動物種マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("動物種マスタ");
  await createColumn( t1, "動物種番号", "INTEGER", null );
  await createColumn( t1, "動物種名", "TEXT", null );
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
          MAX(csv.sort_number),
          MAX(csv.created_at),
          MAX(csv.updated_at)
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
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
  // 処理に必要なテーブルが揃っているかをチェックする
  await _checkSourceTable_core([ "CSV_系統マスタ", "動物種マスタ" ]);
  //
  // 結果を書き込むテーブルとカラムを準備する
  const t1 = await _clearTable_core("系統マスタ");
  await createColumn( t1, "系統番号", "INTEGER", null );
  await createColumn( t1, "系統名", "TEXT", null );
  await createColumn( t1, "動物種", "POINTER", await getTableIdFromName("動物種マスタ") );
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
          MAX(csv.sort_number),
          MAX(csv.created_at),
          MAX(csv.updated_at)
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

// 由来マスタ
export async function masterOrigin_core(  ){
  if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 購入規格マスタ
export async function masterProductType_core(  ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 購入品マスタ
export async function masterItem_core(  ){
  if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 業者マスタ
export async function masterCompany_core(  ){
  if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 支払マスタ
export async function masterPayment_core(  ){
  if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// Roomマスタ
export async function masterRoom_core(  ){
  if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 管理費単価マスタ
export async function masterPrice_core(  ){
  if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 飼育台帳データ
export async function broodbookData_core(  ){
  if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 飼育履歴データ
export async function historyData_core(  ){
  if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 動物増減データ
export async function increaseAndDecreaseData_core(  ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 飼育数データ
export async function numberOfAnimalData_core(  ){
  if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 予算実績データ
export async function budgetData_core(  ){
  if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 請求データ
export async function billData_core(  ){
  if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 購入データ
export async function buyData_core(  ){
  if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
  return "データの移行が完了しました。";
}

// 【サブ】テーブルを作り直す
export async function _clearTable_core( tableName ){
  if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
  const oldTableId = await getTableIdFromName(tableName);
  if( oldTableId ){
    if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
    await deleteTable(oldTableId);
  }
  const { tableId: newTableId } = await createTable(tableName);
  return newTableId;
}

// 【サブ】テーブルの存在をチェックする
export async function _checkSourceTable_core( tableNames ){
  if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
  for( const tableName of tableNames ){
    if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
    if(!await getTableIdFromName(tableName)){
      if(bugMode === 44) throw "MUTATION44";  // 意図的にバグを混入させる（ミューテーション解析）
      if(String(tableName).startsWith("CSV_")){
        throw `テーブル「${tableName}」が存在しません。先にCSVファイルをアップロードしてください。`;
      }
      else{
        throw `テーブル「${tableName}」が存在しません。先にマスターデータを構築してください。`;
      }
    }
  }
}
