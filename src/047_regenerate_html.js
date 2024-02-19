// HTML(全体)
//
import {
  startUp,
  close,
  createDirectories,
} from "./052_frontend_files_validate.js";
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
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
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
  createView,
  deletePage,
  updateView,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
} from "./061_view_column_validate.js";
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
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
import {
  deleteTable,
  generateSQL,
  deleteView,
} from "./058_joinedTable_validate.js";
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
  getPageDataForGUI,
  getPageDataForExcel,
  myFunc,
} from "./055_page_data_validate.js";
import {
  generateViewHTML_table,
  generateViewHTML_card,
  generateViewHTML_button,
} from "./049_regenerate_view_html_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// HTMLを再生成
export async function regenerateHTML_core( pageId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // ページの情報を取得する
    const { pageName, memo, isExcel } = await getPageInfo( pageId );
    //
    // パンくずリストを取得する
    const breadcrumbs = await getBreadcrumbs( pageId );
    let parentPageId = null;
    if( breadcrumbs.length >= 2 ){
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        parentPageId = breadcrumbs[breadcrumbs.length-2].pageId;
    }
    //
    // 子ページの一覧
    const staticChildren = await listStaticChildren( pageId );
    //
    // ビューの一覧
    const views = await listChildrenView( pageId );
    //
    //
    let mainHtmlText = `<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>${pageName}</title>
        <!--  -->
        <!-- bootstrap5.3を読み込む -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
        <!-- bootstrapのドキュメントはこちら -->
        <!-- https://getbootstrap.jp/docs/5.3/getting-started/introduction/ -->
        <!--  -->
        <!--  -->
        <!-- bootstrapのアイコンを読み込む -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
        <!--  -->
        <!-- 自作CSSを読み込む -->
        <link rel="stylesheet" href="./style.css" type="text/css">
        <link rel="stylesheet" href="/default/auto_correct.css" type="text/css">
        <!--  -->
        <!-- 自作JavaScriptを読み込む -->
        <script src="./script.js" type="module"></script>
    </head>
    <body style="visibility: hidden;">
        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid">
                <button ${ parentPageId ? "" : "disabled" } onclick="jumpWithQuery('/custom/${parentPageId}/index.html')" type="button" class="btn btn-light me-2">
                    戻る
                </button>
                <div class="d-flex" role="search" style="width: 270px;">
                    <div class="input-group">
                        <span class="input-group-text" style="background: none; color: #fff;">
                            <i class="bi bi-search"></i>
                        </span>
                        <input class="form-control search_box" type="search" placeholder="検索" aria-label="Search">
                    </div>
                </div>
                <div class="form-check form-switch d-none d-md-inline">
                    <input onchange="handleEditSwitch(event)" class="form-check-input" type="checkbox" role="switch" id="edit_mode_switch">
                    <label class="form-check-label" for="edit_mode_switch" style="color:#fff">
                        表示設定
                    </label>
                </div>
                <button onclick="jumpWithQuery('/open_excel/${pageId}',{ isNewTab: true })" type="button" class="btn btn-success d-none d-md-inline" style="${isExcel ? "" : "visibility: hidden;" } margin-left: 40px; border: solid 2px #fff;">
                    Excel
                </button>
                <a href="/default/tables/index.html" class="btn btn-dark me-2 d-none d-md-inline" target="_blank">
                    本体データ
                    &nbsp;
                    <i class="bi bi-box-arrow-up-right"></i>
                </a>
            </div>
        </nav>
        <nav aria-label="breadcrumb">
            <!-- パンくずリストをクリックすると、クエリパラメータ―を維持したまま別のページへジャンプする -->
            <ol class="breadcrumb">${ _getBreadcrumbHTML({ breadcrumbs, pageId }) }
            </ol>
        </nav>
        <main class="container">
            <!--  -->
            <!--  -->
            <!-- 見出し -->
            <h1>${ await  escapeHTML_core( pageName ) }</h1>
            <!--  -->
            <!--  -->
            <!-- メモ -->
            <textarea class="form-control-plaintext" readonly>${ await  escapeHTML_core( memo ) }</textarea>
            <!--  -->
            <!--  -->
            <!-- 子ページへのリンクここから -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
                <!-- 正方形のアイコンをクリックすると、クエリパラメータ―を維持したまま別のページへジャンプする -->`;
    //
    for( const { pageId, pageName } of staticChildren ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        mainHtmlText += `
                <div class="tile" onclick="jumpWithQuery('/custom/${pageId}/index.html')">
                    ${pageName}
                </div>`;
    }
    //
    mainHtmlText += `
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
                <div class="tile_empty"></div>
            </div>
            <br>
            <form>
                <!-- 基本データここから -->
                <div class="row">
                    <div class="col-md-6">
                    </div>
                </div>
                <!-- 基本データここまで -->
                <!--  -->
                <!--  -->`;
    //
    for( const { viewId, tableId, onePageMaxSize, viewType, childPageId } of views ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        switch( viewType ){
            case "BUTTON":
                if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
                mainHtmlText += await generateViewHTML_button( viewId, tableId, onePageMaxSize, childPageId );
                break;
            case "TABLE":
                if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
                mainHtmlText += await generateViewHTML_table( viewId, tableId, onePageMaxSize, childPageId );
                break;
            case "CARD":
                if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
                mainHtmlText += await generateViewHTML_card( viewId, tableId, onePageMaxSize, childPageId );
                break;
            default:
                throw `ビューの種類(viewType)がサポートされていません。\nviewType = ${viewType}`;
        }
    }
    //
    mainHtmlText += `
            </form>
        </main>
        <footer>
            <div class="container">
                <br>
                <br>
            </div>
        </footer>
    </body>
</html>`;
    //
    return mainHtmlText;
}




// パンくずリストを生成する関数
function _getBreadcrumbHTML({ breadcrumbs, pageId }){
    let htmlText = "";
    for( let i=0; i<breadcrumbs.length; i++ ){
        const isLast = ( i === breadcrumbs.length-1 );
        const { pageId, pageName } = breadcrumbs[i];
        htmlText += `
                <li class="breadcrumb-item${ isLast ? ' active' : '' }" onclick="jumpWithQuery('/custom/${pageId}/index.html')" >
                    ${pageName}
                </li>`;
    }
    return htmlText;
}






// HTMLエスケープ
export async function escapeHTML_core( text ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  return text.replace(/[&'`"<>]/g, function(match) {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}