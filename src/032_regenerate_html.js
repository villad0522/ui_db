// HTML
//
import {
  startUp,
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
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./067_relation_validate.js";
import {
  createColumn,
  generateSQL,
  createView,
  deleteView,
  addJoinedColumn,
  getSimpleSQL,
} from "./037_view_validate.js";
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
  listJoinsFromTableId,
  getTableFromJoin,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
  listAllPages,
} from "./040_pages_validate.js";


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
    let htmlText = `<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>システム管理</title>
        <!--  -->
        <!-- bootstrap5.3を読み込む -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
        <!-- bootstrapのドキュメントはこちら -->
        <!-- https://getbootstrap.jp/docs/5.3/getting-started/introduction/ -->
        <!--  -->
        <script src="/default/my_fetch.js" type="module"></script>
    </head>
    <body style="background: #eee;">
        <header>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">${ await _getBreadcrumbHTML( pageId ) }
                </ol>
            </nav>
        </header>
        <main class="container">
        </main>
        <footer>
            <div class="container">
                <a href="/default" class="btn btn-dark" target="_blank">
                    管理画面
                </a>
                <button onclick="myFetch('/default/regenerate_page/json?page_id=${pageId}');" type="button" class="btn btn-outline-dark">
                    ページを再生成
                </button>
                <br>
                <br>
            </div>
        </footer>
    </body>
</html>`;
    let cssText = ``;
    let jsText = ``;
    //
    // ファイルを生成
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const folderPath = path.join( customDirPath, String(pageId) );
    if (  !fs.existsSync( folderPath )  ) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        await fs.promises.mkdir( folderPath );
    }
    const htmlPath = path.join( folderPath, `index.html` );
    await fs.promises.writeFile( htmlPath, htmlText );
    const cssPath = path.join( folderPath, `style.css` );
    await fs.promises.writeFile( cssPath, cssText );
    const jsPath = path.join( folderPath, `script.js` );
    await fs.promises.writeFile( jsPath, jsText );
}


// パンくずリストを生成する関数
async function _getBreadcrumbHTML( pageId ){
    let htmlText = "";
    const breadcrumbs = await getBreadcrumbs( pageId );
    for( const { pageId, pageName } of breadcrumbs ){
      htmlText += `
                    <li class="breadcrumb-item"><a href="./${pageId}.html">${pageName}</a></li>`;
    }
    return htmlText;
}

// ページを作成
export async function createPage_core( parentPageId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createPage( parentPageId );
    await regeneratePage_core( result.pageId );
    return result;
}



// ビューを作成
export async function createView_core( pageId, tableId, sqlQuery ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createPage( parentPageId, pageName );
    await regeneratePage_core( result.pageId );
    return result;
}


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const customFilePath = path.join(customDirPath, "1.html");
    if ( !fs.existsSync(customFilePath)) {
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        // ./src/frontend/custom/1.html が存在しない場合
        await regeneratePage_core( 1 );
    }
}
