// ページを再生成
//
import {
  startUp,
  close,
  createDirectories,
} from "./046_frontend_files_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
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
} from "./100_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./115_csv_validate.js";
import {
  getPrimaryKey,
} from "./112_primary_key_validate.js";
import {
  deleteRecords,
} from "./109_delete_record_validate.js";
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
} from "./058_page_and_view_validate.js";
import {
  createColumn,
  createView,
  deletePage,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./055_view_column_validate.js";
import {
  listDataTypes,
} from "./106_data_type_validate.js";
import {
  createRecord,
  listRecords,
} from "./085_records_validate.js";
import {
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./091_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./097_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./079_record_title_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./094_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./103_table_name_validate.js";
import {
  formatField,
} from "./088_db_formatter_validate.js";
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
} from "./082_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./073_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./070_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./067_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./064_generate_sql1_validate.js";
import {
  generateSQL,
  deleteView,
} from "./052_joinedTable_validate.js";
import {
  getPageData,
} from "./049_page_data_validate.js";
import {
  generateViewHTML,
} from "./043_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./040_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
} from "./037_regenerate_api_info_validate.js";


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
    // HTMLを再生成する
    const mainHtmlText = await regenerateHTML( pageId );
    const htmlPath = path.join( pagePath, `index.html` );
    await fs.promises.writeFile( htmlPath, mainHtmlText );
    //
    // ビューの一覧
    const views = await listChildrenView( pageId );
    //
    // API情報を再生成する
    //
    // 取得
    const apiInfoRead = await regenerateAPI_read( pageId );
    const apiPathRead = path.join( pagePath, `api.json` );
    await fs.promises.writeFile( apiPathRead, JSON.stringify( apiInfoRead, null, 2 ) );
    //
    for( const { viewId, tableId, onePageMaxSize, viewType, childPageId } of views ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        //
        // 予測変換
        const apiInfoAutoCorrect = await regenerateAPI_autoCorrect( viewId, tableId, onePageMaxSize, childPageId );
        const dirPathAutoCorrect = path.join( pagePath, `./auto_correct_view${viewId}/` );
        if( !fs.existsSync(dirPathAutoCorrect) ){
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            await fs.promises.mkdir(dirPathAutoCorrect);
        }
        const apiPathAutoCorrect = path.join( dirPathAutoCorrect, `api.json` );
        await fs.promises.writeFile( apiPathAutoCorrect, JSON.stringify( apiInfoAutoCorrect, null, 2 ) );
        //
        // 作成
        const apiInfoCreate = await regenerateAPI_create( viewId, tableId, onePageMaxSize, childPageId );
        const dirPathCreate = path.join( pagePath, `./create_from_view${viewId}/` );
        if( !fs.existsSync(dirPathCreate) ){
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            await fs.promises.mkdir(dirPathCreate);
        }
        const apiPathCreate = path.join( dirPathCreate, `api.json` );
        await fs.promises.writeFile( apiPathCreate, JSON.stringify( apiInfoCreate, null, 2 ) );
        //
        // 上書き
        const apiInfoUpdate = await regenerateAPI_update( viewId, tableId, onePageMaxSize, childPageId );
        const dirPathUpdate = path.join( pagePath, `./update_from_view${viewId}/` );
        if( !fs.existsSync(dirPathUpdate) ){
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            await fs.promises.mkdir(dirPathUpdate);
        }
        const apiPathUpdate = path.join( dirPathUpdate, `api.json` );
        await fs.promises.writeFile( apiPathUpdate, JSON.stringify( apiInfoUpdate, null, 2 ) );
        //
        // 削除
        const apiInfoDelete = await regenerateAPI_delete( viewId, tableId, onePageMaxSize, childPageId );
        const dirPathDelete = path.join( pagePath, `./delete_from_view${viewId}/` );
        if( !fs.existsSync(dirPathDelete) ){
            if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
            await fs.promises.mkdir(dirPathDelete);
        }
        const apiPathDelete = path.join( dirPathDelete, `api.json` );
        await fs.promises.writeFile( apiPathDelete, JSON.stringify( apiInfoDelete, null, 2 ) );
    }
}


// ページを作成
export async function createPage_core( parentPageId ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createView( pageId, tableName );
    await regeneratePage_core( pageId );
    return result;
}


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const customFilePath = path.join(customDirPath, "1.html");
    if ( !fs.existsSync(customFilePath)) {
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        // ./src/frontend/custom/1.html が存在しない場合
        await regeneratePage_core( 1 );
    }
}


// ページ名やメモを変更
export async function updatePageName_core( pageId, pageName, memo ){
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    // 下層の関数を呼び出す
    const result = await updatePageName( pageId, pageName, memo );
    //
    // 名前を変更したページのHTMLを生成する
    await regeneratePage_core( pageId );
    //
    // 親ページのHTMLを再生成する
    const parentPageId = await getParentPage( pageId );
    if( parentPageId >= 1 ){
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
        await regeneratePage_core( parentPageId );
    }
    //
    // 子ページのHTMLを再生成する（パンくずリストに表示されるため）
    const children = await listChildrenPage( pageId );
    for( const pageId of children ){
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        await regeneratePage_core( pageId );
    }
    //
    return result;
}



// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        // 子ページを再帰的に削除する
        await deletePage_core( pageId );
    }
    return result;
}


// ページを再帰的に削除
export async function deletePage_core( pageId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    // 下層の関数を呼び出す
    const result = await deletePage( pageId );
    // 子ページの一覧を取得する
    const children = await listChildrenPage( pageId );
    // 子ページを削除する
    //  （子→親の順番になるように削除する）
    for( let i=children.length-1; i>=0; i-- ){
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // 親ページ（切り取り元）を調べる
    const cuttingPageId = await getCuttingPage();
    let pastParentId = null;
    if(cuttingPageId){
        if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
        // 親ページ（切り取り元）のHTMLを再生成する
        if( pastParentId >= 1 ){
            if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        await regeneratePage_core( pageId );
    }
    //
    return result;
}
