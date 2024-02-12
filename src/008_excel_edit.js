// Excelファイル操作
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
  listEndpoints,
} from "./031_get_api_info_validate.js";
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
  masterOrigin,
  masterProductType,
  masterItem,
  masterCompany,
  masterPayment,
  masterRoom,
  masterPrice,
  broodbookData,
  historyData,
  increaseAndDecreaseData,
  numberOfAnimalData,
  budgetData,
  billData,
  buyData,
  _clearTable,
  _checkSourceTable,
} from "./034_data_transfer_validate.js";
import {
  getEndpointInfo,
} from "./019_auto_correct_validate.js";
import {
  runApi,
} from "./010_transaction_upper_validate.js";
import {
  convertQuery,
} from "./028_run_api_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import XlsxPopulate from "xlsx-populate";
import fs from 'fs';
import path from 'path';
import util from 'util';
import childProcess from 'child_process';
import { PDFDocument } from 'pdf-lib'

const exec = util.promisify(childProcess.exec);

// エクセルファイルを更新する関数
export async function updateExcel_core( filePath, sheetDatas, parameters ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // エクセルファイルを、上書き保存モードで開く
    const workbook = await XlsxPopulate.fromFileAsync(filePath);
    //
    // シート「metadata」を白紙にする
    if (workbook.sheet("metadata")) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // シートが０枚になるとエラーを吐くので、使わないシートを生成する。
        if (!workbook.sheet("Gw21b1re3e3T5")) {
            if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
            workbook.addSheet("Gw21b1re3e3T5");
        }
        workbook.deleteSheet("metadata");
    }
    workbook.addSheet("metadata");
    if (workbook.sheet("Gw21b1re3e3T5")) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        workbook.deleteSheet("Gw21b1re3e3T5");
    }
    //
    // データシートを生成する
    for (const sheetName in sheetDatas) {
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        await _updateSqlSheet({
            workbook,
            sheetName: sheetName,
            rows: sheetDatas[sheetName],
        });
    }
    //
    // シート「metadata」を生成する
    const metaSheet = workbook.sheet("metadata");
    metaSheet.cell(1, 1).style("bold", true);
    metaSheet.cell(1, 1).value(`このシートは、ファイルを開くたびに初期化されます。`);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;  // 月は0から始まるため、+1して実際の月に合わせます。
    const day = today.getDate();
    metaSheet.cell(2, 1).value(year);
    metaSheet.cell(2, 2).value("年");
    metaSheet.cell(2, 3).value(month);
    metaSheet.cell(2, 4).value("月");
    metaSheet.cell(2, 5).value(day);
    metaSheet.cell(2, 6).value("日");
    metaSheet.cell(2, 7).value("更新");
    //
    const questions = Object.keys(parameters);
    for (let i = 0; i < questions.length; i++) {
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        metaSheet.cell(5 + i, 3).value(questions[i]);
        metaSheet.cell(5 + i, 3).style("horizontalAlignment", "right");
        metaSheet.cell(5 + i, 4).value(parameters[questions[i]]);
    }
    //
    if (!workbook.sheets()[0].usedRange()) {
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        // pdfに変換すると、白紙になる場合
        workbook.sheets()[0].cell(1, 1).value(" ");
    }
    try {
        await workbook.toFileAsync(filePath);
    }
    catch (e) {
        throw `エクセルファイル「${filePath}」の構築中にエラーが発生しました。`;
    }
}


async function _updateSqlSheet({ workbook, sheetName, rows }) {
    //
    // シートを白紙にする
    if (workbook.sheet(sheetName)) {
        // シートが０枚になるとエラーを吐くが、シート「metadata」があるので問題ないはず。
        workbook.deleteSheet(sheetName);
    }
    workbook.addSheet(sheetName);
    //
    const sheet = workbook.sheet(sheetName);
    //
    sheet.cell(1, 1).style("bold", true);
    sheet.cell(1, 1).value(`このシートは、ファイルを開くたびに初期化されます。`);
    //
    if (!Array.isArray(rows) || (rows.length == 0)) {
        throw "[ERROR_108] rows[0]を読み取れません";
    }
    const columns = Object.keys(rows[0]);
    //
    // 列名
    for (let j = 0; j < columns.length; j++) {
        const cell = sheet.cell(2, j + 1);
        cell.value(columns[j]);
        cell.style("fill", "e0e0e0");
    }
    //
    // SQLの実行結果
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < columns.length; j++) {
            const columnName = columns[j];
            if (!columnName) continue;
            const value = rows[i][columnName];
            sheet.cell(i + 3, j + 1).value(value);
        }
    }
}



// Excelファイルを開く関数
export async function openExcel_core( filePath ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    if(!fs.existsSync(filePath)){
        throw `ファイルが存在しません`;
    }
}




// 変数「pageDatas」の内容をPDF形式の書類に変換する
async function _convertToPdf(params) {
    const [
        results0,
        results1,
        results2,
    ] = await Promise.all([
        _oneThread({
            threadNumber: 0,
            ...params,
        }),
        _oneThread({
            threadNumber: 1,
            ...params,
        }),
        _oneThread({
            threadNumber: 2,
            ...params,
        }),
    ]);
    const results = {
        ...results0,
        ...results1,
        ...results2,
    };
    //
    // 結合後のPDFファイル
    const mergedPdf = await PDFDocument.create();
    //
    for (let i = 0; i < params.pageDatas.length; i++) {
        const pdfDoc = results[i];
        //
        // ページを結合する
        const [firstPage] = await mergedPdf.copyPages(pdfDoc, [0]);
        mergedPdf.addPage(firstPage);
    }
    return mergedPdf;
}

// 変数「pageDatas」の内容をPDF形式の書類に変換する
async function _oneThread({ db, threadNumber, pageDatas, questionAnswers, questionInfos, temp, instanceId, itemInfo }) {
    const results = {};
    for (let i = 0; i < pageDatas.length; i++) {
        if ((i % 3) != threadNumber) continue;
        //
        // LibreOfficePortableのパス
        let libreOfficePath = path.join(process.cwd(), myPath(`../LibreOfficePortable${threadNumber}/LibreOfficeCalcPortable.exe`));
        libreOfficePath = libreOfficePath.replaceAll("\\", "/");
        //
        // １ページだけPDFに変換する
        results[i] = await _onePage({
            db,
            pageIndex: i,
            pageLength: pageDatas.length,
            pageData: pageDatas[i],
            libreOfficePath,
            questionAnswers,
            questionInfos,
            temp,
            instanceId,
            itemInfo,
        });
    }
    return results;
}

// １ページだけPDFに変換する関数
async function _onePage({ db, pageIndex, pageLength, pageData, libreOfficePath, questionAnswers, questionInfos, temp, instanceId, itemInfo }) {
    // エクセル２のパス
    const xlsx2Path = path.join(temp, `${instanceId}_${pageIndex}.xlsm`);
    //
    // 「エクセル２」を生成する。
    await fsPromises.writeFile(xlsx2Path, itemInfo["excel_file_data"]);
    //
    // エクセル２を更新
    await updateXlsx({
        db,
        filePath: xlsx2Path,
        pageData: pageData,
        pageIndex: pageIndex,
        pageLength: pageLength,
        questionAnswers: questionAnswers,
        questionInfos: questionInfos,
    });
    //
    // エクセル２をPDFに変換する
    let srcFilePath = path.join(process.cwd(), xlsx2Path);
    srcFilePath = srcFilePath.replaceAll("\\", "/");
    let outDirPath = path.join(process.cwd(), temp);
    outDirPath = outDirPath.replaceAll("\\", "/");
    try {
        const command = `${libreOfficePath} --headless --convert-to pdf --outdir "${outDirPath}" "${srcFilePath}"`;
        await exec(command);
    }
    catch (e) {
        throw `[ERROR_085]「${instanceId}」の${pageIndex}ページ目をpdfへ変換中にエラー発生しました。データベースに保存されているエクセルテンプレートが破損している恐れがあります。書類を作り直してください。\n\n${String(e)}`;
    }
    //
    const pdfPath = path.join(process.cwd(), temp, `${instanceId}_${pageIndex}.pdf`);
    //
    try {
        await _waitFile(pdfPath);   // ファイルが生成されるまで待機する
    }
    catch (err) {
        throw `[ERROR_124] ファイルが生成されるまで待ちましたが、タイムアウトしました。\n${pdfPath}\n`;
    }
    //
    // PDFファイルを読み込む
    const bytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(bytes);
    //
    return pdfDoc;
}

// ファイルが生成されるまで待機する関数
async function _waitFile(path) {
    for (let j = 0; j < 500; j++) {
        if (fs.existsSync(path)) {
            // フォルダが存在したら
            return;
        }
        await sleep(100);
    }
    throw `[ERROR_119] ファイルが生成されるまで待ちましたが、タイムアウトしました。\n${path}\n`;
}