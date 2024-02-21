// Excel内容
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


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import ExcelJS from 'exceljs';

// エクセルファイルを更新する関数
export async function updateExcel_core( fileData, sheetInfos, dataList ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    // エクセルファイルを開く
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileData);
    await _updateExcelSheet_core( workbook, sheetInfos, dataList );
    try {
        return await workbook.xlsx.writeBuffer();
    }
    catch (e) {
        throw `エクセルファイルの構築中にエラーが発生しました。`;
    }
}


// 【サブ】シート１個を編集する関数
export async function _updateExcelSheet_core( workbook, sheetInfos, dataList ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // シート「日付とページ番号」を削除する
    const metaSheet = workbook.getWorksheet("日付とページ番号")
    if (metaSheet ) {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // シートが０枚になるとエラーを吐くので、使わないシートを生成する。
        if ( workbook.worksheets.length <= 1 ) {
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            workbook.addWorksheet("Gw21b1re3e3T5");
        }
        workbook.removeWorksheet(metaSheet.id);
    }
    //
    //##############################################################################################
    // 【事前準備】行数と、表の下端を調べる処理（以下の２つの変数を埋める）
    let pageRowSize = 0;      // １ページあたりの行数（空白のテンプレートを印刷したときの行数）
    const tableLastRows = {};   // 表の下端（シートごとに計算する）
    const tableSizes = {};      // 表の行数（シートごとに計算する）
    const sheetNames = new Set();
    //
    // ビューごとに繰り返す
    for( const sheetInfo of sheetInfos ){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        const viewId = sheetInfo.viewId;
        const sheetName = sheetInfo.sheetName;          // シート名
        const tableStartRow = sheetInfo.excelStartRow;  // 表の上端
        const isTableHeader = sheetInfo.isTableHeader;  // 表に見出しをつけるか（true:つける false:つけない）
        const viewColumns = sheetInfo.viewColumns;      // 列の一覧
        let worksheet = workbook.getWorksheet(sheetName);   // 書き込み先のオブジェクト
        sheetNames.add(sheetName);
        if (!worksheet) {
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            // もしシートが存在していない場合
            worksheet = workbook.addWorksheet(sheetName);
            tableSizes[viewId] = 50;
            if( isTableHeader ){
                if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[viewId] = tableStartRow + 50;
            }
            else{
                if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[viewId] = tableStartRow + 49;
            }
            if( pageRowSize < tableLastRows[viewId] + 2 ){
                if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
                pageRowSize = tableLastRows[viewId] + 2;
            }
            continue;
        }
        const rowSize = worksheet.rowCount;
        //
        // 表の下端を調べる
        tableLastRows[viewId] = tableStartRow + 50;
        for(let k=tableStartRow; k<=rowSize; k++){   // Excelの行ごとに繰り返す
            if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
            for( const { excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
                if( ! /^[A-Z]+$/g.test(excelColumnText) ){
                    throw `Excelの列番号が不正です。\nexcelColumnText = ${excelColumnText}`;
                }
                const value = worksheet.getRow(k).getCell(excelColumnText).value;
                if( value === "<END_OF_TABLE>" ){
                    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
                    // 表の下端を見つけた！
                    tableLastRows[viewId] = k - 1;
                    k = rowSize+1;
                    break;
                }
            }
        }
        //
        // 表の行数を調べる
        if( isTableHeader ){
            if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
            tableSizes[viewId] = tableLastRows[viewId] - tableStartRow;
        }
        else{
            if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
            tableSizes[viewId] = tableLastRows[viewId] - tableStartRow + 1;
        }
        //
        // 最低限の書き込むスペースを確保する
        if( tableSizes[viewId] === 0 ){
            if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
            tableSizes[viewId] = 1;
            if( isTableHeader ){
                if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[viewId] = tableStartRow + 1;
            }
            else{
                if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[viewId] = tableStartRow;
            }
        }
        //
        // 印刷したときの１ページの行数を調べる
        if( pageRowSize < tableLastRows[viewId] + 2 ){
            if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
            pageRowSize = tableLastRows[viewId] + 2;
        }
        //
        // ページの下端を調べる
        for(let k=tableStartRow; k<=rowSize; k++){   // Excelの行ごとに繰り返す
            if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
            for( const { excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
                const value = worksheet.getRow(k).getCell(excelColumnText).value;
                if( value === "<END_OF_PAGE>" ){
                    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
                    // 表の下端を見つけた！
                    if( pageRowSize < k ){
                        if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
                        pageRowSize = k;
                    }
                    k = rowSize+1;
                    break;
                }
            }
        }
    }
    if(pageRowSize===0){
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        pageRowSize = 1;
    }
    //
    //##############################################################################################
    // 【本処理】
    let actualPageCount = 0;    // 実際のページ番号
    //
    for( const sheetDatas of dataList ){  // 冊子ごとに繰り返す
        if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
        const inputIndexes = {          // 各シートにおいて、配列の何行目まで書き込んだのかを記録する
            // "シート名": 320,
        };
        let completeCount = 0;          // 各シートで、全データを書き終わるとカウントアップする
        const isComplete = {            // 各シートで、全データを書き終わるとフラグを立てる
            // "シート名": true,
        };
        //
        // ページごとに繰り返す（全てのシートで全データを書き終えると冊子が完成する。）
        //                     （全シートのうち、何シートの書き込みが完了したのかをcompleteCountに保存している。）
        let displayPageCount=0;
        for( displayPageCount=0; (displayPageCount<100)&&(completeCount<sheetInfos.length); displayPageCount++){
            if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
            //
            // Excelのテンプレートを貼り付ける
            if( actualPageCount !== 1 ){
                if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
                // もし１ページ目以外なら
                //
                // Excelのシートごとに繰り返す
                const sheetArray = Array.from(sheetNames);
                for( const sheetName of sheetArray ){
                    if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
                    const worksheet = workbook.getWorksheet(sheetName);   // 書き込み先のオブジェクト
                    const columnCount = worksheet.columnCount;
                    for( let i=1; i<pageRowSize; i++ ){
                        if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
                        const excelIndex = pageRowSize * (actualPageCount+displayPageCount);    // Excelの何行目に書き込むのか
                        for( let j=1; j<=columnCount; j++ ){  // 列ごとに繰り返す
                            if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
                            const sourceCell = worksheet.getRow(i).getCell(j);
                            const targetCell = worksheet.getRow(excelIndex + i).getCell(j);
                            const formula = String(sourceCell.formula);
                            if( /[A-Z]{1,2}[1-9][0-9]*$/g.test(formula) ){
                                if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
                                const match2 = formula.match(/[1-9][0-9]*$/g);
                                const pastRowNumber = Number(match2[0]);
                                const nextRowNumber = Number(match2[0]) + excelIndex;
                                targetCell.value = { 
                                    formula: formula.replace( String(pastRowNumber), String(nextRowNumber) ),
                                };
                            }
                            else{
                                if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
                                targetCell.value = sourceCell.value;
                            }
                            targetCell.style = sourceCell.style;
                        }
                    }
                }
            }
            //
            // ビューごとに繰り返す
            for( const sheetInfo of sheetInfos ){
                if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
                const viewId = sheetInfo.viewId;
                const sheetName = sheetInfo.sheetName;          // シート名
                const tableSize = tableSizes[viewId];           // 表の行数
                let tableStartRow = sheetInfo.excelStartRow;    // 表の上端
                const tableLastRow = tableLastRows[viewId];     // 表の下端
                const isTableHeader = sheetInfo.isTableHeader;  // 表に見出しをつけるか（true:つける false:つけない）
                const viewColumns = sheetInfo.viewColumns;      // 列の一覧
                const rowDatas = sheetDatas[viewId];            // 書き込みたい内容（行の一覧）
                const worksheet = workbook.getWorksheet(sheetName);   // 書き込み先のオブジェクト
                //
                if(tableStartRow<=0 || pageRowSize<tableStartRow || tableLastRow<tableStartRow || isNaN(tableStartRow)){
                    throw `Excelデータの開始行が、有効な数値ではありません。\ntableStartRow = ${tableStartRow}\npageRowSize = ${pageRowSize}\ntableLastRow = ${tableLastRow}`;
                }
                if(tableLastRow<=0 || pageRowSize<tableLastRow || tableLastRow<tableStartRow || isNaN(tableLastRow)){
                    throw `Excelデータの末尾の行が、有効な数値ではありません。\ntableLastRow = ${tableLastRow}\npageRowSize = ${pageRowSize}\ntableStartRow = ${tableStartRow}`;
                }
                //
                // 列名
                if( isTableHeader ){
                    if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
                    const excelIndex = ( pageRowSize * (actualPageCount+displayPageCount) ) + tableStartRow;    // Excelの何行目に書き込むのか
                    for( const { viewColumnName, excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                        if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
                        if( ! /^[A-Z]+$/g.test(excelColumnText) ){
                            throw `Excelの列番号が不正です。\nexcelColumnText = ${excelColumnText}`;
                        }
                        // Excelファイルのセルに書き込む
                        worksheet.getRow(excelIndex).getCell(excelColumnText).value = viewColumnName;
                    }
                    tableStartRow++;
                }
                //
                if( !inputIndexes[viewId] ){
                    if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
                    inputIndexes[viewId] = 0;     // 配列の何行目のデータを書き込むのか
                }
                //
                // Excelの行ごとに繰り返す
                for(let k=tableStartRow; k<=tableLastRow; k++){
                    if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
                    const excelIndex =  ( pageRowSize * (actualPageCount+displayPageCount) ) + k;    // Excelの何行目に書き込むのか
                    const inputIndex = inputIndexes[viewId];                   // 配列の何行目のデータを書き込むのか
                    const rowData = (inputIndex<rowDatas.length)? rowDatas[inputIndex] : {};    // 書き込みたいデータ
                    for( const { viewColumnId, excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                        if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
                        const text = String( rowData[viewColumnId] ?? "" );
                        // Excelファイルのセルに書き込む
                        worksheet.getRow(excelIndex).getCell(excelColumnText).value = text;
                    }
                    inputIndexes[viewId]++;  // 「配列の何行目のデータを書き込むのか」を次に進める
                }
                //
                // 終端文字を入れる
                const lastTableRowIndex = pageRowSize * (actualPageCount+displayPageCount) + tableLastRow;  // Excelファイルにおける、表の最後の行
                for( const { excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                    if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
                    const cell = worksheet.getRow(lastTableRowIndex+1).getCell(excelColumnText);
                    cell.value = "<END_OF_TABLE>";
                    cell.font = {
                        color: { argb: 'FFFFFFFF' },
                        size: 8,
                    };
                }
                //
                // 改ページを入れる
                const lastRowIndex = pageRowSize * (actualPageCount+displayPageCount+1);  // Excelファイルにおける、ページの最後の行
                worksheet.getRow(lastRowIndex).addPageBreak();
                //
                // 終端文字を入れる
                const cell = worksheet.getRow(lastRowIndex).getCell(1);
                cell.value = "<END_OF_PAGE>";
                cell.font = {
                    color: { argb: 'FFFFFFFF' },
                    size: 8,
                };
                //
                if( rowDatas.length <= inputIndexes[viewId] ){
                    if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
                    // 全データを一通り書き込み終わったら
                    if( rowDatas.length<=tableSize ){
                        if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
                        // データが１ページに収まった場合は、次のページにも書き込む
                        inputIndexes[viewId] = 0;
                    }
                    if( !isComplete[viewId] ){
                        if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
                        completeCount++;   // 完了カウントを増やす
                    }
                    isComplete[viewId] = true;   // 完了フラグを立てる
                }
            }
        }
        //=========================================================================
        //
        const pageLength = displayPageCount;  // 冊子全体のページ数
        //
        // シート「日付とページ番号」を追加する
        let metaSheet = workbook.getWorksheet("日付とページ番号");
        if (!metaSheet) {
            if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
            metaSheet = workbook.addWorksheet("日付とページ番号");
        }
        const bufSheet = workbook.getWorksheet("Gw21b1re3e3T5");
        if (bufSheet) {
            if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
            workbook.removeWorksheet(bufSheet.id);
        }
        //
        //=========================================================================
        // 【シート「日付とページ番号」にページ番号を入れる処理】
        //
        // ページごとに繰り返す
        for( let i=0; i<pageLength; i++){
            if(bugMode === 44) throw "MUTATION44";  // 意図的にバグを混入させる（ミューテーション解析）
            //
            // シート「日付とページ番号」を生成する
            const excelIndex = ( pageRowSize * (actualPageCount+i) ) + 1;    // Excelの何行目に書き込むのか
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;  // 月は0から始まるため、+1して実際の月に合わせます。
            const day = today.getDate();
            metaSheet.getRow(excelIndex).getCell(1).value = year;
            metaSheet.getRow(excelIndex).getCell(2).value = "年";
            metaSheet.getRow(excelIndex).getCell(3).value = month;
            metaSheet.getRow(excelIndex).getCell(4).value = "月";
            metaSheet.getRow(excelIndex).getCell(5).value = day;
            metaSheet.getRow(excelIndex).getCell(6).value = "日";
            metaSheet.getRow(excelIndex).getCell(7).value = "更新";
            metaSheet.getRow(excelIndex+1).getCell(1).value = i+1;
            metaSheet.getRow(excelIndex+1).getCell(2).value = "/";
            metaSheet.getRow(excelIndex+1).getCell(3).value = pageLength;
            metaSheet.getRow(excelIndex+1).getCell(4).value = "ページ";
            //
            // 改ページを入れる
            const lastRowIndex = pageRowSize * (actualPageCount+i+1);  // Excelファイルにおける、ページの最後の行
            const lastRow = metaSheet.getRow( lastRowIndex );
            lastRow.addPageBreak();
            lastRow.border = {
                bottom: {style:'double', color: {argb:'FF000000'}},
            };
            //
            // 終端文字を入れる
            metaSheet.getRow(lastRowIndex).getCell(1).value = "<END_OF_PAGE>";
        }
        //=========================================================================
        actualPageCount += pageLength * pageRowSize;   // 実際のページ番号
    }
    //##############################################################################################
}



// テンプレートを抽出する関数
export async function extractTemplate_core( fileData, sheetInfos ){
  if(bugMode === 45) throw "MUTATION45";  // 意図的にバグを混入させる（ミューテーション解析）
    // エクセルファイルを開く
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileData);
    //
    const metaSheet = workbook.getWorksheet("日付とページ番号");
    //
    let metaLastRowIndex = 10;
    if( metaSheet ){
        if(bugMode === 46) throw "MUTATION46";  // 意図的にバグを混入させる（ミューテーション解析）
        // Excelの行ごとに繰り返す
        for( let i=1; i<1000; i++ ){
            if(bugMode === 47) throw "MUTATION47";  // 意図的にバグを混入させる（ミューテーション解析）
            const value = metaSheet.getRow(i).getCell(1).value;
            if( value === "<END_OF_PAGE>" ){
                if(bugMode === 48) throw "MUTATION48";  // 意図的にバグを混入させる（ミューテーション解析）
                metaLastRowIndex = i;
                break;
            }
        }
    }
    //
    // Excelのシートごとに繰り返す
    for( const sheetInfo of sheetInfos ){   
        if(bugMode === 49) throw "MUTATION49";  // 意図的にバグを混入させる（ミューテーション解析）
        const sheetName = sheetInfo.sheetName;          // シート名
        const worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) {
            if(bugMode === 50) throw "MUTATION50";  // 意図的にバグを混入させる（ミューテーション解析）
            // もしシートが存在していない場合
            continue;
        }
        //
        // Excelの行ごとに繰り返す
        let lastRowIndex = metaLastRowIndex;
        for( let i=1; i<1000; i++ ){
            if(bugMode === 51) throw "MUTATION51";  // 意図的にバグを混入させる（ミューテーション解析）
            const value = worksheet.getRow(i).getCell(1).value;
            if( value === "<END_OF_PAGE>" ){
                if(bugMode === 52) throw "MUTATION52";  // 意図的にバグを混入させる（ミューテーション解析）
                lastRowIndex = i;
                break;
            }
        }
        const maxRow = worksheet.rowCount;
        for( let i=maxRow; i>lastRowIndex; i--){
            if(bugMode === 53) throw "MUTATION53";  // 意図的にバグを混入させる（ミューテーション解析）
            worksheet.spliceRows(i, 1);
        }
        //
        // 終端文字を入れる
        worksheet.getRow(lastRowIndex).getCell(1).value = "<END_OF_PAGE>";
    }
    //
    // シート「日付とページ番号」を削除する
    if ( metaSheet ) {
        if(bugMode === 54) throw "MUTATION54";  // 意図的にバグを混入させる（ミューテーション解析）
        // シートが０枚になるとエラーを吐くので、使わないシートを生成する。
        if ( workbook.worksheets.length <= 1 ) {
            if(bugMode === 55) throw "MUTATION55";  // 意図的にバグを混入させる（ミューテーション解析）
            workbook.addWorksheet("Gw21b1re3e3T5");
        }
        workbook.removeWorksheet(metaSheet.id);
    }
    //
    try {
        return await workbook.xlsx.writeBuffer();
    }
    catch (e) {
        throw `エクセルファイルの構築中にエラーが発生しました。`;
    }
}
