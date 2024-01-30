// HTML(全体)
//
import {
  startUp,
  close,
  createDirectories,
} from "./040_frontend_files_validate.js";
import {
  getLocalIp,
} from "./115_ip_address_validate.js";
import {
  getPath,
} from "./112_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./109_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./091_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./106_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./103_csv_validate.js";
import {
  getPrimaryKey,
} from "./100_primary_key_validate.js";
import {
  clearCache,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./073_record_title_2_validate.js";
import {
  createColumn,
  deleteView,
  generateSQL,
  createView,
  addViewColumn,
} from "./046_view_validate.js";
import {
  listDataTypes,
} from "./097_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./070_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./088_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./082_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./085_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
import {
  formatField,
} from "./079_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  changeInputType,
  _fillMasterData,
} from "./076_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./064_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./061_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./058_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./055_generate_sql1_validate.js";
import {
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  deletePage,
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
} from "./049_pages_validate.js";
import {
  getPageData,
} from "./043_page_data_validate.js";
import {
  generateViewHTML,
} from "./037_regenerate_view_html_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import fs from 'fs';
import path from 'path';


// ページを再生成する
export async function regeneratePage_core( pageId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const staticDirPath = await getPath("STATIC_DATA");
    const templateDirPath = path.join( staticDirPath, "./light/page_template" );
    //
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const pagePath = path.join( customDirPath, String(pageId) );
    if (  !fs.existsSync( pagePath )  ) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        await fs.promises.mkdir( pagePath );
    }
    //
    // CSSを生成する（テンプレートからコピーする）
    const cssSrcPath = path.join( templateDirPath, `style.css` );
    const cssDestPath = path.join( pagePath, `style.css` );
    await fs.promises.copyFile( cssSrcPath, cssDestPath );
    //
    // JavaScriptを生成する（テンプレートからコピーする）
    const jsSrcPath = path.join( templateDirPath, `script.js` );
    const jsDestPath = path.join( pagePath, `script.js` );
    let jsText = await fs.promises.readFile( jsSrcPath, { encoding: "utf8" } );
    jsText = jsText.replaceAll( "PAGE_ID", pageId );
    await fs.promises.writeFile( jsDestPath, jsText );
    //
    // ページの情報を取得する
    const { pageName, memo } = await getPageInfo( pageId );
    //
    // パンくずリストを取得する
    const breadcrumbs = await getBreadcrumbs( pageId );
    let parentPageId = null;
    if( breadcrumbs.length >= 2 ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
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
        <!--  -->
        <!-- 自作JavaScriptを読み込む -->
        <script src="./script.js" type="module"></script>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid">
                <button ${ parentPageId ? "" : "disabled" } onclick="jumpWithQuery('/custom/${parentPageId}/index.html')" type="button" class="btn btn-light me-2">
                    戻る
                </button>
                <div class="d-flex" role="search" style="width: 300px;">
                    <div class="input-group">
                        <span class="input-group-text" style="background: none; color: #fff;">
                            <i class="bi bi-search"></i>
                        </span>
                        <input class="form-control search_box" type="search" placeholder="検索" aria-label="Search">
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input onchange="handleEditSwitch(event)" class="form-check-input" type="checkbox" role="switch" id="edit_mode_switch">
                    <label class="form-check-label" for="edit_mode_switch" style="color:#fff">
                        表示設定
                    </label>
                </div>
                <a href="/default/tables/index.html" class="btn btn-dark me-2" target="_blank">
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
            <pre>${ await  escapeHTML_core( memo ) }</pre>
            <!--  -->
            <!--  -->
            <!-- 子ページへのリンクここから -->
            <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
                <!-- 正方形のアイコンをクリックすると、クエリパラメータ―を維持したまま別のページへジャンプする -->`;
    //
    for( const { pageId, pageName } of staticChildren ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
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
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" disabled>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" disabled>
                    </div>
                    <div class="col-12">
                        <label for="inputAddress2" class="form-label">Address 2</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" disabled>
                    </div>
                    <div class="col-md-6">
                        <label for="inputCity" class="form-label">City</label>
                        <input type="text" class="form-control" id="inputCity" disabled>
                    </div>
                    <div class="col-md-4">
                        <label for="inputState" class="form-label">State</label>
                        <select id="inputState" class="form-select" disabled>
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="inputZip" disabled>
                    </div>
                </div>
                <!-- 基本データここまで -->
                <!--  -->
                <!--  -->`;
    //
    for( const { viewId, tableId, onePageMaxSize, viewType, childPageId } of views ){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        switch( viewType ){
            default:
                mainHtmlText += await generateViewHTML( viewId, tableId, onePageMaxSize, childPageId );
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
    //
    // HTMLファイルを生成
    const htmlPath = path.join( pagePath, `index.html` );
    await fs.promises.writeFile( htmlPath, mainHtmlText );
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



// ページを作成
export async function createPage_core( parentPageId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createPage( parentPageId );
    //
    // 作ったばかりの子ページのHTMLを生成する
    await regeneratePage_core( result.pageId );
    //
    // 親ページのHTMLを再生成する
    await regeneratePage_core( parentPageId );
    //
    return result;
}



// ビューを作成
export async function createView_core( pageId, tableName ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createView( pageId, tableName );
    await regeneratePage_core( pageId );
    return result;
}


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const customFilePath = path.join(customDirPath, "1.html");
    if ( !fs.existsSync(customFilePath)) {
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        // ./src/frontend/custom/1.html が存在しない場合
        await regeneratePage_core( 1 );
    }
}





// HTMLエスケープ
export async function escapeHTML_core( text ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
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


// ページ名やメモを変更
export async function updatePageName_core( pageId, pageName, memo ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    // 下層の関数を呼び出す
    const result = await updatePageName( pageId, pageName, memo );
    //
    // 名前を変更したページのHTMLを生成する
    await regeneratePage_core( pageId );
    //
    // 親ページのHTMLを再生成する
    const parentPageId = await getParentPage( pageId );
    if( parentPageId >= 1 ){
        if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
        await regeneratePage_core( parentPageId );
    }
    //
    // 子ページのHTMLを再生成する（パンくずリストに表示されるため）
    const children = await listChildrenPage( pageId );
    for( const pageId of children ){
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
        await regeneratePage_core( pageId );
    }
    //
    return result;
}



// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    // 下層の関数を呼び出す
    const result = await deleteView( viewId );
    //
    // 子ページを取得する（１個のはず）
    const pages = await runSqlReadOnly(
        `SELECT page_id AS pageId
        FROM pages
        WHERE dynamic_parent_id = :viewId;`,
        {
        ":viewId": viewId,
        },
    );
    for( const { pageId } of pages ){
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        // 子ページを再帰的に削除する
        await deletePage_core( pageId );
    }
    return result;
}


// ページを再帰的に削除
export async function deletePage_core( pageId ){
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    // 下層の関数を呼び出す
    const result = await deletePage( pageId );
    // 子ページの一覧を取得する
    const children = await listChildrenPage( pageId );
    // 子ページを削除する
    //  （子→親の順番になるように削除する）
    for( let i=children.length-1; i>=0; i-- ){
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
        await _deletePageFolder( children[i] );
    }
    // 対象のページを削除する
    await _deletePageFolder( pageId );
    //
    return result;
}




async function _deletePageFolder( pageId ){
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const pagePath = path.join( customDirPath, String(pageId) );
    if (  fs.existsSync( pagePath )  ) {
        await fs.promises.rm( pagePath,  { recursive: true } );
    }
}



// ページを貼り付ける
export async function pastePage_core( newParentId, afterPageId ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // 親ページ（切り取り元）を調べる
    const cuttingPageId = await getCuttingPage();
    let pastParentId = null;
    if(cuttingPageId){
        if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
        pastParentId = await getParentPage( cuttingPageId );
    }
    //
    // 下層の関数を呼び出す
    const result = await pastePage( newParentId, afterPageId );
    if(! result.pageId ){
        throw `result.pageIdがNULLです。`;
    }
    //
    if( pastParentId !== newParentId ){
        if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
        // 親ページ（切り取り元）のHTMLを再生成する
        if( pastParentId >= 1 ){
            if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
            await regeneratePage_core( pastParentId );
        }
    }
    //
    // 移動したページのHTMLを再生成する（パンくずリストを更新するため）
    await regeneratePage_core( result.pageId );
    //
    // 親ページ（貼り付け先）のHTMLを再生成する
    await regeneratePage_core( newParentId );
    //
    // 子ページのHTMLを再生成する（パンくずリストを更新するため）
    const children = await listChildrenPage( result.pageId );
    for( const pageId of children ){
        if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
        await regeneratePage_core( pageId );
    }
    //
    return result;
}
