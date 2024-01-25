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
  addViewColumn,
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
  checkReservedWord,
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
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const folderPath = path.join( customDirPath, String(pageId) );
    if (  !fs.existsSync( folderPath )  ) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        await fs.promises.mkdir( folderPath );
    }
    //#######################################################################################
    let mainHtmlText = ``;
    // ファイルを生成
    const htmlPath = path.join( folderPath, `index.html` );
    await fs.promises.writeFile( htmlPath, mainHtmlText );
    //
    //
    //
    //
    //
    //#######################################################################################
    let settingHtmlText = `<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>webページのタイトル</title>
        <!--  -->
        <!-- bootstrap5.3を読み込む -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
        <!-- bootstrapのドキュメントはこちら -->
        <!-- https://getbootstrap.jp/docs/5.3/getting-started/introduction/ -->
        <!--  -->
        <link rel="stylesheet" href="./style.css" type="text/css">
        <script src="./script.js" type="module"></script>
    </head>
    <body style="background: #eee;">
        <header style="position: sticky; top: 0; padding: 5px; width: max-content; box-sizing: border-box; background: #eee; z-index: 999;">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">${ await _getBreadcrumbHTML( pageId ) }
                </ol>
            </nav>
            ${ (pageId===1) ? "" : `
            <button onclick="backButton();" type="button" class="btn btn-outline-primary">
                戻る
            </button>`
            }
        </header>
        <main class="container">
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
                <div class="row">
                    <!-- リンク集 -->
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>
                <hr>
                <!-- 基本データここまで -->
                <!--  -->
                <!--  -->
                <div class="collapse" id="search_block">
                    <h4>抽出／並び替え</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" id="inputEmail4">
                        </div>
                        <div class="col-md-6">
                            <label for="inputPassword4" class="form-label">Password</label>
                            <input type="password" class="form-control" id="inputPassword4">
                        </div>
                        <div class="col-12">
                            <label for="inputAddress" class="form-label">Address</label>
                            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                        </div>
                        <div class="col-12">
                            <label for="inputAddress2" class="form-label">Address 2</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
                        </div>
                        <div class="col-md-6">
                            <label for="inputCity" class="form-label">City</label>
                            <input type="text" class="form-control" id="inputCity">
                        </div>
                        <div class="col-md-4">
                            <label for="inputState" class="form-label">State</label>
                            <select id="inputState" class="form-select">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label for="inputZip" class="form-label">Zip</label>
                            <input type="text" class="form-control" id="inputZip">
                        </div>
                    </div>
                    <br>
                    <div style="text-align: right;">
                        <button type="button" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                            検索
                        </button>
                    </div>
                    <hr>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <h4 style="display: inline-block;">検索結果</h4>
                        （
                        <input type="number" id="inputEmail4" disabled style="background: none; border: none; width: 50px;">
                        件）
                    </div>
                    <div class="col-sm-6" style="text-align: right;">
                        <button data-bs-toggle="collapse" data-bs-target="#search_block" class="btn btn-outline-primary" type="button">
                            抽出／並び替え
                        </button>
                        <button onclick="overwriteButton();" type="button" class="btn btn-outline-primary">
                            上書き
                        </button>
                        <button onclick="addButton();" class="btn btn-primary" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            追加
                        </button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
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
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck" disabled>
                                <label class="form-check-label" for="gridCheck">
                                    Check me out
                                </label>
                            </div>
                        </div>
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body row">
                        <div class="col-12" style="text-align: right;">
                            <button type="button" class="btn btn-outline-danger btn-sm">
                                削除
                            </button>
                        </div>
                    </div>
                </div>
                <br>
                <br>
                <br>
                <br>
            </form>
        </main>
        <footer>
            <div class="container">
                <a href="/default" class="btn btn-dark" target="_blank">
                    管理画面
                </a>
                <button onclick="myFetch('/default/regenerate_page/json?page_id=${pageId}');" type="button" class="btn btn-outline-dark">
                    ページを再生成
                </button>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="edit_mode_switch">
                    <label class="form-check-label" for="edit_mode_switch">
                        ページを編集
                    </label>
                </div>
                <br>
                <br>
            </div>
        </footer>
    </body>
</html>`;
    // ファイルを生成
    const settingPath = path.join( folderPath, `setting.html` );
    await fs.promises.writeFile( settingPath, settingHtmlText );
    //
    //
    //
    //
    //
    //#######################################################################################
    let cssText = `
hr {
    margin: 50px 0;
}
.card {
    background: #fafafa;
    margin: 20px 0;
}
.form-control,
.form-select {
    margin-bottom: 10px;
}
.form-control:disabled,
.form-select:disabled {
    border: none;
    background: none;
    margin-bottom: 30px;
    padding: 0 0 0 15px;
}
`;
    const cssPath = path.join( folderPath, `style.css` );
    await fs.promises.writeFile( cssPath, cssText );
    //
    //
    //
    //
    //
    //#######################################################################################
    let jsText = `
import myFetch from "/default/my_fetch.js";
// 一か所でも編集されたかどうかを記録する変数
let isEdit = false;
//
//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
    //
    // 変更された項目を水色にする
    const formElements = document.querySelectorAll("input,select,textarea");
    for (const formElement of formElements) {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        formElement.addEventListener("change", () => {
            formElement.style.background = "#ddffff";
            isEdit = true;
        });
    }
});
//###############################################################
// 「戻る」ボタンがクリックされたときに実行する関数
window.backButton = function () {
    if (isEdit) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        if (confirm("編集内容は破棄されます。よろしいですか？") == false) {
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            return;
        }
    }
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "../index.html" + window.location.search;
}
//
//###############################################################
// 「キャンセル」ボタンがクリックされたときに実行する関数
window.cancelButton = function () {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "../index.html" + window.location.search;
}
//
//###############################################################
// 「表の名前を変更」ボタンがクリックされたときに実行する関数
window.renameButton = function () {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "./rename" + window.location.search;
}
//
//###############################################################
// テーブルがクリックされたときに実行する関数
window.tableButton = function (i) {
    // テーブル名
    let tableId = document.getElementsByName(\`tables\${i}_id\`)[0].value;
    //
    // 別のページに移動する
    tableId = encodeURIComponent(tableId);
    window.location.href = \`../records?table=\${tableId}\`;
}
//
//###############################################################
// ページネーションボタンの「First」がクリックされたときに実行する関数
window.paginationButtonFirst = function (arrayName) {
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", 1);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Prev」がクリックされたときに実行する関数
window.paginationButtonPrev = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("tables_pagePrev")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Next」がクリックされたときに実行する関数
window.paginationButtonNext = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("tables_pageNext")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Last」がクリックされたときに実行する関数
window.paginationButtonLast = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("tables_pageLast")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
`;
    const jsPath = path.join( folderPath, `script.js` );
    await fs.promises.writeFile( jsPath, jsText );
    //
    //
    //
    //
    //
    //#######################################################################################
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
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createPage( parentPageId );
    await regeneratePage_core( result.pageId );
    return result;
}



// ビューを作成
export async function createView_core( pageId, tableId, sqlQuery ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createPage( parentPageId, pageName );
    await regeneratePage_core( result.pageId );
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
