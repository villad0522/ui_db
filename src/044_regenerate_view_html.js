// HTML(ビュー)
//
import {
  startUp,
  close,
  createDirectories,
} from "./046_frontend_files_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
import {
  getPath,
} from "./121_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./118_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./097_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./112_csv_validate.js";
import {
  getPrimaryKey,
} from "./109_primary_key_validate.js";
import {
  deleteRecords,
} from "./106_delete_record_validate.js";
import {
  clearCache,
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
  getViewInfo,
} from "./058_page_and_view_validate.js";
import {
  createColumn,
  createView,
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
} from "./103_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./088_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./094_reserved_word_validate.js";
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
} from "./091_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./100_table_name_validate.js";
import {
  formatField,
} from "./085_db_formatter_validate.js";
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


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// ビューのHTMLを生成
export async function generateViewHTML_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    let mainHtmlText = "";
    mainHtmlText += `
        <hr>
        <div class="collapse" id="search_block_${ viewId }">
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
                <button data-bs-toggle="collapse" data-bs-target="#search_block_${ viewId }" class="btn btn-outline-primary" type="button">
                    抽出／並び替え
                </button>
                <button onclick="overwriteButton();" type="button" class="btn btn-outline-primary">
                    上書き
                </button>
            </div>
        </div>
        <div class="card">
            <div class="card-body row" oninput="myFetch('./auto_correct_${viewId}/form')">`;
    //
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        if( viewColumnType!=="RAW" ) continue;
        let subHtmlText = "";
        const placeholder = ""; // 入力例（未実装）
        const inputType = await getInputType( viewColumnId );
        subHtmlText = `
                    <label for="${viewColumnId}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${viewColumnId}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input name="${viewColumnId}" type="email" placeholder="${placeholder}" class="form-control" id="${viewColumnId}" list="${viewColumnId}_options">
                        <datalist id="${viewColumnId}_options">
                            <option value="読み込み中...">
                        </datalist>
                    </div>`;
        /*
        switch( inputType ){
            case "TEXTBOX":
                if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
                subHtmlText = `
                    <label for="inputEmail4" class="form-label">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" disabled>`;
                break;
            case "EMAIL":
                if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
                subHtmlText = `
                    <label for="${viewColumnId}" class="form-label">
                        ${viewColumnName}
                    </label>
                    <div class="col-sm-10">
                        <input name="${viewColumnId}" type="email" placeholder="${placeholder}" class="form-control" id="${viewColumnId}" list="${viewColumnId}_options">
                        <datalist id="${viewColumnId}_options">
                            <option value="読み込み中...">
                        </datalist>
                    </div>`;
                break;
            case "TEXTAREA":
                if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
                break;
            case "SELECT":
                if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
                break;
            case "NUMBER":
                if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
                break;
            case "DATE":
                if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
                break;
            default:
                throw `サポートされていない入力方式です。\ninputType = ${inputType}`;
        }
        */
        mainHtmlText += `
                <div class="col-xl-6 row mb-3">${subHtmlText}
                </div>`;
    }
    //
    mainHtmlText += `
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
                    <button onclick="myFetch('./create_1/form');" class="btn btn-primary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        登録
                    </button>
                </div>
            </div>
        </div>`;
    //
    for( let i=0; i<onePageMaxSize; i++ ){
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        mainHtmlText += `
        <div class="card">
            <div class="card-body row">`;
        for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
            if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
            const elementName = `view${viewId}_${i}_${viewColumnId}`;
            mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <label for="${elementName}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${elementName}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input type="text" readonly class="form-control-plaintext" name="${elementName}" id="${elementName}">
                    </div>
                </div>`;
        }
        mainHtmlText += `
                <div class="col-12" style="text-align: right;">
                    <button type="button" class="btn btn-outline-danger btn-sm">
                        削除
                    </button>
                </div>
            </div>
        </div>`;
    }
    //
    mainHtmlText += `
        <br>
        <br>
        <br>
        <br>`;
    mainHtmlText = mainHtmlText.replaceAll("\n",`\n        `);
    return mainHtmlText;
}