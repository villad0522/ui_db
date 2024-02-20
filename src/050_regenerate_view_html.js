// HTML(ビュー)
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
} from "./058_extract_and_sort_validate.js";
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


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// ビューのHTMLを生成（表）
export async function generateViewHTML_table_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    let mainHtmlText = "";
    mainHtmlText += `
        <div class="card" style="background: none; ">
            <div class="card-body row" oninput="myFetch('./auto_correct_view${viewId}/form?is_auto_fill=false')">`;
    //
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        if( viewColumnType!=="RAW" ) {
            if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
            mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <label for="${viewColumnId}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${viewColumnId}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input type="text" readonly class="form-control-plaintext" name="${viewColumnId}" id="${viewColumnId}">
                        <div class="invalid-feedback" name="${viewColumnId}_message" style="display: block;"></div>
                    </div>
                </div>`;
            continue;
        }
        const placeholder = ""; // 入力例（未実装）
        const inputType = await getInputType( viewColumnId );
        switch( inputType ){
            case "TEXTBOX_NUMBER":
                if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
                mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <label for="${viewColumnId}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${viewColumnId}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input name="${viewColumnId}" type="number" placeholder="${placeholder}" class="form-control" id="${viewColumnId}">
                        <div class="invalid-feedback" name="${viewColumnId}_message" style="display: block;"></div>
                    </div>
                </div>`;
                break;
            case "TEXTBOX":
                if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
                mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <label for="${viewColumnId}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${viewColumnId}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input name="${viewColumnId}" type="text" placeholder="${placeholder}" class="form-control" id="${viewColumnId}">
                        <datalist id="${viewColumnId}_options">
                        </datalist>
                        <div class="invalid-feedback" name="${viewColumnId}_message" style="display: block;"></div>
                    </div>
                </div>`;
                break;
            case "CHECKBOX":
                if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
                mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-9">
                        <div class="form-check">
                            <input name="${viewColumnId}" class="form-check-input" type="checkbox" id="${viewColumnId}">
                            <label class="form-check-label" for="${viewColumnId}">
                                ${viewColumnName}
                            </label>
                        </div>
                    </div>
                </div>`;
                break;
            default:
                throw `サポートされていない入力方式です。\ninputType = ${inputType}`;
        }
    }
    //
    mainHtmlText += `
                <div class="col-12" style="text-align: right;">
                    <button onclick="myFetch('./create_from_view${viewId}/form');" class="btn btn-primary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        新規登録
                    </button>
                </div>
            </div>
        </div>`;
    //
    for( let i=0; i<onePageMaxSize; i++ ){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        mainHtmlText += `
        <!--  -->
        <!-- 不可視のチェックボックスにチェックが入っているときだけ、直後のcard要素が表示される -->
        <input name="view${viewId}_${i}_flag" class="flag" type="checkbox" style="display: none;">
        <div class="card">
            <div class="id_box">
                ID:
                <input name="view${viewId}_${i}_id">
            </div>
            <div class="card-body row">`;
        for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
            if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
            const elementName = `view${viewId}_${i}_${viewColumnId}`;
            if( viewColumnType!=="RAW" ) {
                if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
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
                continue;
            }
            const placeholder = ""; // 入力例（未実装）
            const inputType = await getInputType( viewColumnId );
            switch( inputType ){
                case "TEXTBOX_NUMBER":
                    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
                    mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <label for="${elementName}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${elementName}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input name="${elementName}" type="number" placeholder="${placeholder}" class="form-control" id="${elementName}">
                        <div class="invalid-feedback" name="${elementName}_message" style="display: block;"></div>
                    </div>
                </div>`;
                    break;
                case "TEXTBOX":
                    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
                    mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <label for="${elementName}" class="col-md-3 form-label d-md-none">
                        ${viewColumnName}
                    </label>
                    <label for="${elementName}" class="col-md-3 form-label d-none d-md-block text-end">
                        ${viewColumnName}
                    </label>
                    <div class="col-md-9">
                        <input name="${elementName}" type="text" placeholder="${placeholder}" class="form-control" id="${elementName}">
                        <datalist id="${elementName}_options">
                        </datalist>
                        <div class="invalid-feedback" name="${elementName}_message" style="display: block;"></div>
                    </div>
                </div>`;
                    break;
                case "CHECKBOX":
                    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
                    mainHtmlText += `
                <div class="col-xl-6 row mb-3">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-9">
                        <div class="form-check">
                            <input name="${elementName}" class="form-check-input" type="checkbox" id="${elementName}">
                            <label class="form-check-label" for="${elementName}">
                                ${viewColumnName}
                            </label>
                        </div>
                    </div>
                </div>`;
                    break;
                default:
                    throw `サポートされていない入力方式です。\ninputType = ${inputType}`;
            }
        }
        mainHtmlText += `
                <div class="col-12" style="text-align: right;">
                    <button onclick="handleDeleteButton(${viewId},${i})" type="button" class="btn btn-outline-danger btn-sm">
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
        <div class="result_footer">
            <div style="display: flex; justify-content: space-between; padding-top: 5px;">
                <div style="font-size: 20px;">
                    <span name="view${viewId}__total"></span>件
                </div>
                <ul class="pagination">
                    <!--  -->
                    <!-- 不可視のチェックボックスにチェックが入っているときだけ、直後の要素が表示される -->
                    <input name="view${viewId}__pageFirst_flag" class="flag" type="checkbox" style="display: none;">
                    <li class="page-item">
                        <button onclick="paginationButtonFirst(${viewId})" type="button" class="page-link">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <!--  -->
                    <!-- 不可視のチェックボックスにチェックが入っているときだけ、直後の要素が表示される -->
                    <input name="view${viewId}__pagePrev_flag" class="flag" type="checkbox" style="display: none;">
                    <li class="page-item">
                        <button name="view${viewId}__pagePrev" onclick="paginationButtonPrev(${viewId})" type="button" class="page-link">
                        </button>
                    </li>
                    <!--  -->
                    <!-- 不可視のチェックボックスにチェックが入っているときだけ、直後の要素が表示される -->
                    <input name="view${viewId}__pageNow_flag" class="flag" type="checkbox" style="display: none;">
                    <li class="page-item active">
                        <span class="page-link" name="view${viewId}__pageNow"> </span>
                    </li>
                    <!--  -->
                    <!-- 不可視のチェックボックスにチェックが入っているときだけ、直後の要素が表示される -->
                    <input name="view${viewId}__pageNext_flag" class="flag" type="checkbox" style="display: none;">
                    <li class="page-item">
                        <button name="view${viewId}__pageNext" onclick="paginationButtonNext(${viewId})" type="button" class="page-link">
                        </button>
                    </li>
                    <!--  -->
                    <!-- 不可視のチェックボックスにチェックが入っているときだけ、直後の要素が表示される -->
                    <input name="view${viewId}__pageLast_flag" class="flag" type="checkbox" style="display: none;">
                    <li class="page-item">
                        <button onclick="paginationButtonLast(${viewId})" type="button" class="page-link">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                    <!--  -->
                    <!-- 不可視のテキストボックス -->
                    <input name="view${viewId}__pageLast" type="text" style="display: none;">
                </ul>
                <div style="text-align: right; max-height: 45px;">
                    <button data-bs-toggle="collapse" data-bs-target="#extract_collapse_${viewId}" class="btn btn-outline-secondary" type="button">
                        <i class="bi bi-funnel"></i>
                        抽出
                        <span class="badge text-bg-secondary">4</span>
                    </button>
                    <button onclick="myFetch('./update_from_view${viewId}/form');" type="button" class="btn btn-outline-primary">
                        <i class="bi bi-pen"></i>
                        上書き
                    </button>
                </div>
            </div>
            <div class="collapse" id="extract_collapse_${viewId}">
                <div class="extract_box">
                    <div class="row">
                        <div class="col-lg-10 mb-2">
                            <div class="input-group flex-nowrap">
                                <input type="text" class="form-control">
                                <span class="input-group-text">が</span>
                                <input type="text" class="form-control">
                                <select class="form-select" style="max-width: 150px;">
                                    <option selected>と等しい</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <button type="button" class="btn btn-primary">
                                    <i class="bi bi-plus"></i>
                                    条件追加
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="input-group flex-nowrap">
                                <input disabled type="text" class="form-control" style="border: solid 1px #aaa;">
                                <button type="button" class="btn btn-outline-danger">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>`;
    mainHtmlText = mainHtmlText.replaceAll("\n",`\n        `);
    return mainHtmlText;
}

// ビューのHTMLを生成（カード）
export async function generateViewHTML_card_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    return "";
}

// ビューのHTMLを生成（ボタン）
export async function generateViewHTML_button_core( viewId, tableId, onePageMaxSize, childPageId ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    return "";
}
