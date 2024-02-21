// HTML(ビュー)
//
import {
  startUp,
  close,
  createDirectories,
} from "./052_frontend_files_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./133_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./112_column_name_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  createView,
  deletePage,
  updateView,
  _createViewColumnOuter,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  getViewColumnFromColumn,
  getViewColumnName,
  getViewColumnFromName,
  _autoCorrectColumnsToParents,
  _autoCorrectColumnsToChildren,
  getViewColumnInfo,
  addColumnPath,
  autoCorrectColumnPath,
  createViewColumn,
} from "./064_view_column_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
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
} from "./103_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
import {
  deleteTable,
  _getConditions,
  generateSQL,
  deleteView,
  getExtractionsAsJP,
  autoCorrectConditionalValue,
  deleteCondition,
  addCondition,
} from "./061_extract_and_sort_validate.js";
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
} from "./106_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./115_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./118_sort_validate.js";
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
} from "./088_record_title_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";
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
} from "./091_input_element_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./085_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./082_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./079_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./076_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./073_generate_sql1_validate.js";
import {
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
} from "./067_page_and_view_validate.js";
import {
  getPageDataForGUI,
  getPageDataForExcel,
  _getDataList,
  _getSheetDatas,
} from "./058_page_data_validate.js";
import {
  getExcelId,
} from "./055_excel_multiple_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// ビューのHTMLを生成（表）
export async function generateViewHTML_table_core( viewId, tableId, onePageMaxSize, childPageId, viewIndex ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    let mainHtmlText = "";
    mainHtmlText += `
        <input type="checkbox" name="views${viewIndex}_flag" style="display: none;">
        <input type="text" name="views${viewIndex}_viewId" style="display: none;">
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
                        <span name="extraction${viewId}__total" class="badge text-bg-secondary"></span>
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
                                <select name="views${viewIndex}_newExtractionTarget" class="form-select">
                                </select>
                                <span class="input-group-text">が</span>
                                <input oninput="myFetch('/default/conditions/auto_correct_condition/form');" name="views${viewIndex}_newExtractionValue" type="text" class="form-control">
                                <select name="views${viewIndex}_newExtractionExpression" class="form-select" style="max-width: 150px;">
                                    <option value="LIKE" selected>を含む</option>
                                    <option value="=">と等しい</option>
                                    <option value="!=">以外</option>
                                    <option value="<">より小さい</option>
                                    <option value=">">より大きい</option>
                                    <option value="<=">以下</option>
                                    <option value=">-">以上</option>
                                </select>
                                <button onclick="myFetch('/default/conditions/add_condition/form?view=${viewId}');" type="button" class="btn btn-primary">
                                    <i class="bi bi-plus"></i>
                                    条件追加
                                </button>
                            </div>
                        </div>`;
    //
    for( let i=0; i<10; i++ ){
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
        mainHtmlText += `
                        <div class="col-lg-6" name="extraction${viewId}_${i}_flag">
                            <input name="extraction${viewId}_${i}_conditionId" type="text" style="display: none;">
                            <div class="input-group flex-nowrap">
                                <input name="extraction${viewId}_${i}_text" disabled type="text" class="form-control" style="border: solid 1px #aaa;">
                                <button onclick="deleteCondition(${viewId},${i})" type="button" class="btn btn-outline-danger">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>`;
    }
    //
    mainHtmlText += `
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
export async function generateViewHTML_card_core( viewId, tableId, onePageMaxSize, childPageId, viewIndex ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    return "";
}



// ビューのHTMLを生成（ボタン）
export async function generateViewHTML_button_core( pageId, viewId, tableId, onePageMaxSize, childPageId, viewIndex ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await listViewColumns( viewId );
    let titleViewColumnId = null;
    let titleColumnId = null;
    let numberViewColumnId = null;
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        if( viewColumnType!=="RAW" ){
            if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
            numberViewColumnId = numberViewColumnId ?? viewColumnId;
            continue;
        }
        const columnId = await pathToColumnId(columnPath);
        const dataType = await getDataType( columnId );
        switch (dataType) {
            case "POINTER":
                if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
                break;
            case "INTEGER":
                if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
                numberViewColumnId = numberViewColumnId ?? viewColumnId;
                break;
            case "REAL":
                if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
                numberViewColumnId = numberViewColumnId ?? viewColumnId;
                break;
            case "TEXT":
                if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
                titleViewColumnId = titleViewColumnId ?? viewColumnId;
                titleColumnId = titleColumnId ?? columnId;
                break;
            case "BOOL":
                if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
                break;
            default:
                throw `サポートされていないデータ型です。detaType="${dataType}"`;
        }
    }
    //
    let mainHtmlText = "";
    mainHtmlText += `
        <input type="checkbox" name="views${viewIndex}_flag" style="display: none;">
        <input type="text" name="views${viewIndex}_viewId" style="display: none;">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
            <div class="tile" onclick="jumpWithQuery('/custom/${childPageId}/index.html')">
                全て
            </div>`;
    //
    if( titleViewColumnId && titleColumnId){
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        for( let i=0; i<onePageMaxSize; i++ ){
            if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
            const titleKey = `view${viewId}_${i}_${ titleViewColumnId }`;
            const numberKey = `view${viewId}_${i}_${numberViewColumnId}`;
            mainHtmlText += `
            <!--  -->
            <div name="view${viewId}_${i}_flag" class="tile" onclick="clickDynamicButton(event,${childPageId},${pageId},'${titleColumnId}')">
                <span name="${titleKey}"></span>
            </div>`;
        }
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
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>`;
    mainHtmlText = mainHtmlText.replaceAll("\n",`\n        `);
    return mainHtmlText;
}
