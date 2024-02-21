// Excelファイル
//
import {
  startUp,
  deleteTemplate,
  getExcelTemplate,
  updateExcelTemplate,
} from "./037_excel_template_validate.js";
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
  _addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  getViewColumnFromColumn,
  getViewColumnName,
  getViewColumnFromName,
  _autoCorrectColumnsToParents,
  _autoCorrectColumnsToChildren,
  getViewColumnInfo,
  addColumnPath,
  autoCorrectColumnPath,
  createViewColumn,
} from "./061_view_column_validate.js";
import {
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
  listChildrenColumnId,
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
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  formatField,
} from "./094_db_formatter_validate.js";
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
} from "./088_input_element_validate.js";
import {
  _getConditions,
  generateSQL,
  getExtractionsAsJP,
  autoCorrectConditionalValue,
  deleteCondition,
  addCondition,
} from "./058_extract_and_sort_validate.js";
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
  _getDataType,
} from "./043_regenerate_api_info_validate.js";
import {
  updateExcel,
  _updateExcelSheet,
  extractTemplate,
} from "./034_excel_content_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import childProcess from 'child_process';
import iconv from 'iconv-lite';

const watchers = {};

// Excelを開く
export async function openExcel_core( clientIpAddress, pageId, queryParameters ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const { pageName } = await getPageInfo( pageId );
    //
    // テンプレートを取得する
    const templateData = await getExcelTemplate( pageId );
    //
    // データを取得する
    const dataList = await getPageDataForExcel( pageId, queryParameters );
    const sheetInfos = [];
    const views = await listChildrenView( pageId );
    for( const { viewId, sheetName, isTableHeader, excelStartRow } of views ){
      if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
      const viewColumns = await listViewColumns( viewId );
      sheetInfos.push({
        "viewId": viewId,
        "sheetName": sheetName,
        "excelStartRow": excelStartRow,
        "isTableHeader": isTableHeader,
        "viewColumns": viewColumns,
      });
    }
    //
    // Excelファイルに情報を追記する
    const fileData = await updateExcel( templateData, sheetInfos, dataList );
    //
    const serverIpAddress = await getLocalIp();
    if( clientIpAddress !== serverIpAddress && clientIpAddress!=="127.0.0.1" ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // 子機からシステムにアクセスしている場合、Excelをダウンロードさせる
        const fileName = pageName + "(閲覧専用).xlsx";
        return {
            "fileContents": fileData,
            "fileName": fileName,
        };
    }
    // 親機からシステムにアクセスしている場合、Excelアプリを起動する
    //
    const fileName = pageName + "(編集可).xlsx";
    if( watchers[fileName] ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        // ファイルの監視を停止する
        await watchers[fileName].close();
    }
    //
    // Excelデータをファイルとして保存する
    const cacheDirPath = await getPath("CACHE");
    const filePath = path.join( cacheDirPath, fileName );
    try{
        await fs.promises.writeFile( filePath, fileData );
    }
    catch (error) {
        console.error(`既にファイルを開いています。Excelファイル「${fileName}」を閉じて再試行してください。`);
        throw `既にファイルを開いています。Excelファイル「${fileName}」を閉じて再試行してください。`;
    }
    //
    // ファイルの監視をスタートする
    const watcher = chokidar.watch(filePath, {
        persistent: true,
    });
    watchers[fileName] = watcher;
    await new Promise((resolve, reject) => watcher.on('ready', resolve ));
    watcher.on('change', function (filePath, stats) {
        //console.log(`\nExcelファイルが編集されました。\n${filePath}`);
        _handleEditExcelFile_core( filePath, pageId, sheetInfos );
    });
    watcher.on('error', function (path) {
        //console.error(`\nExcelファイルの監視中にエラーが発生しました。\n${path}`);
    });
    await _launchExcelApp_core( filePath );
    return {
        "fileContents": null,
        "fileName": fileName,
    };
}




// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug ); // 下層の関数を呼び出す
}



// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  for(const fileName in watchers){
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    await watchers[fileName].close();
  }
  await close(); // 下層の関数を呼び出す
}



// 【サブ】Excelアプリを起動
export async function _launchExcelApp_core( filePath ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    if(!fs.existsSync(filePath)){
        throw `ファイルが存在しません`;
    }
    const command = `"C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE" "${filePath}"`;
    childProcess.exec(
        command,
        {encoding:"Shift_JIS"},
        (err, stdout, stderr) => {
            if (err) {
                if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
                console.error(`stderr:${iconv.decode(stderr,"Shift_JIS")}`);
                console.error(command);
                return;
            }
            // console.log(`stdout:${iconv.decode(stdout,"Shift_JIS")}`);
        }
    );
}



// 【サブ】ファイルが編集されたとき
export async function _handleEditExcelFile_core( filePath, pageId, sheetInfos ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    try{
        let excelFileData = await fs.promises.readFile( filePath );
        excelFileData = await extractTemplate( excelFileData, sheetInfos );
        await updateExcelTemplate( pageId, excelFileData );
        //
        // 以下、デバッグ用にファイルを保存する処理
        const cacheDirPath = await getPath("CACHE");
        const filePath2 = path.join( cacheDirPath, "テンプレート.xlsx" );
        await fs.promises.writeFile( filePath2, excelFileData );
    }
    catch( error ){
        console.error(`\nエラーが発生しました`);
        console.error(`レイヤー : excel_file`);
        console.error(`関数 : _handleEditExcelFile`);
        console.error(error);
    }
}
