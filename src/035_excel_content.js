// Excel内容
//
import {
  startUp,
  createPage,
  deleteTemplate,
  updateTemplateName,
  listTemplates,
  getExcelTemplate,
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




import XlsxPopulate from "xlsx-populate";

// エクセルファイルを更新する関数
export async function updateExcel_core( fileData, sheetInfos, dataList ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // エクセルファイルを、上書き保存モードで開く
    const workbook = await XlsxPopulate.fromDataAsync(fileData);
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
    await _updateExcelSheet_core( workbook, sheetInfos, dataList );
    //
    try {
        return await workbook.outputAsync();
    }
    catch (e) {
        throw `エクセルファイルの構築中にエラーが発生しました。`;
    }
}


// 【サブ】シート１個を編集する関数
export async function _updateExcelSheet_core( workbook, sheetInfos, dataList ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    //##############################################################################################
    // 【事前準備】行数と、表の下端を調べる処理（以下の２つの変数を埋める）
    let pageRowSize = 0;      // １ページあたりの行数（空白のテンプレートを印刷したときの行数）
    const tableLastRows = {};   // 表の下端（シートごとに計算する）
    const tableSizes = {};      // 表の行数（シートごとに計算する）
    //
    // Excelのシートごとに繰り返す
    for( const sheetInfo of sheetInfos ){   
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        const sheetName = sheetInfo.sheetName;          // シート名
        const tableStartRow = sheetInfo.excelStartRow;  // 表の上端
        const isTableHeader = sheetInfo.isTableHeader;  // 表に見出しをつけるか（true:つける false:つけない）
        const viewColumns = sheetInfo.viewColumns;      // 列の一覧
        if (!workbook.sheet(sheetName)) {
            if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
            // もしシートが存在していない場合
            workbook.addSheet(sheetName);
            tableSizes[sheetName] = 50;
            if( isTableHeader ){
                if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[sheetName] = tableStartRow + 50;
            }
            else{
                if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[sheetName] = tableStartRow + 49;
            }
            if( pageRowSize < tableLastRows[sheetName] ){
                if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
                pageRowSize = tableLastRows[sheetName];
            }
            continue;
        }
        const sheet = workbook.sheet(sheetName);        // 書き込み先のオブジェクト
        const rowSize =  sheet?.usedRange()?.endCell()?.rowNumber() ?? 0;
        //
        // 印刷したときの１ページの行数を調べる
        if( pageRowSize < rowSize ){
            if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
            pageRowSize = rowSize;
        }
        if( pageRowSize < tableStartRow ){
            if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
            pageRowSize = tableStartRow;
        }
        //
        // 表の下端を調べる
        tableLastRows[sheetName] = tableStartRow + 50;
        for(let k=tableStartRow; k<=rowSize; k++){   // Excelの行ごとに繰り返す
            if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
            for( const { excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
                if( ! /^[A-Z]+$/g.test(excelColumnText) ){
                    throw `Excelの列番号が不正です。\nexcelColumnText = ${excelColumnText}`;
                }
                const cell = sheet.cell( k, excelColumnText );
                if( String(cell.value())==="[↓表ここまで]" ){
                    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
                    // 表の下端を見つけた！
                    tableLastRows[sheetName] = k;
                    k = rowSize+1;
                    break;
                }
            }
        }
        //
        // 表の行数を調べる
        if( isTableHeader ){
            if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
            tableSizes[sheetName] = tableLastRows[sheetName] - tableStartRow;
        }
        else{
            if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
            tableSizes[sheetName] = tableLastRows[sheetName] - tableStartRow + 1;
        }
        //
        // 最低限の書き込むスペースを確保する
        if( tableSizes[sheetName] === 0 ){
            if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
            tableSizes[sheetName] = 1;
            if( isTableHeader ){
                if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[sheetName] = tableStartRow + 1;
            }
            else{
                if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
                tableLastRows[sheetName] = tableStartRow;
            }
        }
        //
        // 印刷したときの１ページの行数を調べる
        if( pageRowSize < tableLastRows[sheetName] ){
            if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
            pageRowSize = tableLastRows[sheetName];
        }
    }
    if(pageRowSize===0){
        if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
        pageRowSize = 1;
    }
    //
    //##############################################################################################
    // 【本処理】
    let actualPageCount = 0;    // 実際のページ番号
    //
    for( const sheetDatas of dataList ){  // 冊子ごとに繰り返す
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
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
            if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
            //
            // Excelのシートごとに繰り返す
            for( const sheetInfo of sheetInfos ){   
                if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
                const sheetName = sheetInfo.sheetName;          // シート名
                const tableSize = tableSizes[sheetName];        // 表の行数
                let tableStartRow = sheetInfo.excelStartRow;    // 表の上端
                const tableLastRow = tableLastRows[sheetName];  // 表の下端
                const isTableHeader = sheetInfo.isTableHeader;  // 表に見出しをつけるか（true:つける false:つけない）
                const viewColumns = sheetInfo.viewColumns;      // 列の一覧
                const rowDatas = sheetDatas[sheetName];            // 書き込みたい内容（行の一覧）
                const sheet = workbook.sheet(sheetName);        // 書き込み先のオブジェクト
                //
                if(tableStartRow<=0 || pageRowSize<tableStartRow || tableLastRow<tableStartRow || isNaN(tableStartRow)){
                    throw `Excelデータの開始行が、有効な数値ではありません。\ntableStartRow = ${tableStartRow}\npageRowSize = ${pageRowSize}\ntableLastRow = ${tableLastRow}`;
                }
                if(tableLastRow<=0 || pageRowSize<tableLastRow || tableLastRow<tableStartRow || isNaN(tableLastRow)){
                    throw `Excelデータの末尾の行が、有効な数値ではありません。\ntableLastRow = ${tableLastRow}\npageRowSize = ${pageRowSize}\ntableStartRow = ${tableStartRow}`;
                }
                //
                // Excelのテンプレートを貼り付ける
                //
                // 列名
                if( isTableHeader ){
                    if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
                    const excelIndex = ( pageRowSize * (actualPageCount+displayPageCount) ) + tableStartRow;    // Excelの何行目に書き込むのか
                    for( const { viewColumnName, excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                        if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
                        if( ! /^[A-Z]+$/g.test(excelColumnText) ){
                            throw `Excelの列番号が不正です。\nexcelColumnText = ${excelColumnText}`;
                        }
                        const cell = sheet.cell( excelIndex, excelColumnText );
                        cell.value( viewColumnName );
                    }
                    tableStartRow++;
                }
                //
                if( !inputIndexes[sheetName] ){
                    if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
                    inputIndexes[sheetName] = 0;     // 配列の何行目のデータを書き込むのか
                }
                //
                // Excelの行ごとに繰り返す
                for(let k=tableStartRow; k<=tableLastRow; k++){
                    if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
                    const excelIndex =  ( pageRowSize * (actualPageCount+displayPageCount) ) + k;    // Excelの何行目に書き込むのか
                    const inputIndex = inputIndexes[sheetName];                   // 配列の何行目のデータを書き込むのか
                    const rowData = (inputIndex<rowDatas.length)? rowDatas[inputIndex] : {};    // 書き込みたいデータ
                    for( const { viewColumnId, excelColumnText } of viewColumns ){  // 列ごとに繰り返す
                        if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
                        const cell = sheet.cell( excelIndex, excelColumnText );
                        const text = String( rowData[viewColumnId] ?? "" );
                        cell.value( text );                                      // Excelファイルのセルに書き込む
                    }
                    inputIndexes[sheetName]++;  // 「配列の何行目のデータを書き込むのか」を次に進める
                }
                console.log(`${inputIndexes[sheetName]}行目を書き込んでいます...`);
                //
                // 改ページを入れる
                const lastRowIndex = pageRowSize * (actualPageCount+displayPageCount+1);  // Excelファイルにおける、ページの最後の行
                sheet.verticalPageBreaks().add( lastRowIndex );
                const lastRow = sheet.row( lastRowIndex );
                lastRow.style("bottomBorderStyle",'thin');
                lastRow.style("bottomBorderColor", "a0a0a0");
                //
                if( rowDatas.length <= inputIndexes[sheetName] ){
                    if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
                    // 全データを一通り書き込み終わったら
                    console.log(`シート「${sheetName}」の書き込みが完了しました`);
                    if( rowDatas.length<=tableSize ){
                        if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
                        // データが１ページに収まった場合は、次のページにも書き込む
                        inputIndexes[sheetName] = 0;
                    }
                    if( !isComplete[sheetName] ){
                        if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
                        completeCount++;   // 完了カウントを増やす
                    }
                    isComplete[sheetName] = true;   // 完了フラグを立てる
                }
            }
        }
        //=========================================================================
        //
        const pageLength = displayPageCount;  // 冊子全体のページ数
        //
        //=========================================================================
        // 【シート「metadata」にページ番号を入れる処理】
        //
        // ページごとに繰り返す
        for( let i=0; i<pageLength; i++){
            if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
            //
            // シート「metadata」を生成する
            const excelIndex = ( pageRowSize * (actualPageCount+i) ) + 1;    // Excelの何行目に書き込むのか
            const metaSheet = workbook.sheet("metadata");
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;  // 月は0から始まるため、+1して実際の月に合わせます。
            const day = today.getDate();
            metaSheet.cell(excelIndex, 1).value(year);
            metaSheet.cell(excelIndex, 2).value("年");
            metaSheet.cell(excelIndex, 3).value(month);
            metaSheet.cell(excelIndex, 4).value("月");
            metaSheet.cell(excelIndex, 5).value(day);
            metaSheet.cell(excelIndex, 6).value("日");
            metaSheet.cell(excelIndex, 7).value("更新");
            metaSheet.cell(excelIndex+1, 1).value(i);
            metaSheet.cell(excelIndex+1, 2).value("/");
            metaSheet.cell(excelIndex+1, 3).value(pageLength);
            metaSheet.cell(excelIndex+1, 4).value("ページ");
            //
            // 改ページを入れる
            const lastRowIndex = pageRowSize * (actualPageCount+i+1);  // Excelファイルにおける、ページの最後の行
            metaSheet.verticalPageBreaks().add( lastRowIndex );
            const lastRow = metaSheet.row( lastRowIndex );
            lastRow.style("bottomBorderStyle",'thin');
            lastRow.style("bottomBorderColor", "000000");
        }
        //=========================================================================
        actualPageCount += pageLength;   // 実際のページ番号
    }
    //##############################################################################################
}
