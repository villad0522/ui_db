// API情報を取得
//
import {
  startUp,
  deleteTable,
  createPage,
  updatePageName,
  createView,
  deleteView,
  deletePage,
  pastePage,
  regeneratePage,
} from "./037_regenerate_page_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createDirectories,
} from "./049_frontend_files_validate.js";
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
  getColumnIdFromName,
} from "./103_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
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
} from "./061_page_and_view_validate.js";
import {
  createColumn,
  _generateViewColumnSortNumber,
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  listViewColumnsForExcel,
  regenerateInputElements,
  _addViewColumn,
} from "./058_view_column_validate.js";
import {
  listDataTypes,
} from "./112_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./094_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./100_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./106_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./109_sort_validate.js";
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
} from "./082_record_title_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
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
} from "./085_input_element_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./079_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./076_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./073_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./070_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./067_generate_sql1_validate.js";
import {
  generateSQL,
} from "./055_joinedTable_validate.js";
import {
  getPageData,
} from "./052_page_data_validate.js";
import {
  generateViewHTML,
} from "./046_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./043_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
} from "./040_regenerate_api_info_validate.js";
import {
  transferData,
} from "./034_data_transfer_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

//【グローバル変数】キャッシュデータ
let endpointInfo = {};
let endpointList = null;



// エンドポイントの情報を取得
export async function getEndpointInfo_core( endpointPath ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    if (endpointInfo[endpointPath]) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        // キャッシュデータが残っていた場合
        // ディープコピーして返す
        return structuredClone(endpointInfo[endpointPath]);
    }
    const dirPath = await getPath( "FRONTEND" );
    const filePath = path.join(dirPath, endpointPath, "api.json");
    return await _getEndpointInfo(filePath);
}



async function _getEndpointInfo(filePath) {
    if (!fs.existsSync(filePath)) {
        throw `エンドポイントが存在しません。${filePath}`;
    }
    const text = await fs.promises.readFile(filePath, 'utf8');
    let endpointInfo;
    try {
        endpointInfo = await JSON.parse(text);
    }
    catch (err) {
        console.log("\n\n");
        console.log(text);
        console.log("\n\n");
        throw `API定義ファイルがJSON形式ではありません。${filePath}`;
    }
    const dirPath = await getPath("FRONTEND");
    const filePath2 = path.relative(dirPath, filePath);
    let endpointPath = filePath2.replaceAll("\\", "/").replaceAll("api.json", "");
    if (!String(endpointPath).startsWith("/")) {
        // 先頭にスラッシュを追加
        endpointPath = "/" + endpointPath;
    }
    if (String(endpointPath).endsWith("/")) {
        // 末尾のスラッシュを除去
        endpointPath = endpointPath.slice(0, -1);
    }
    const result = {
        ...endpointInfo,
        endpointPath: endpointPath,
    };
    // 次回のためにデータを残しておく
    endpointInfo[endpointPath] = result;
    return structuredClone(result);
}



// エンドポイントを全て取得
export async function listEndpoints_core(  ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    if (endpointList) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        // キャッシュデータが残っていた場合
        // ディープコピーして返す
        return structuredClone(endpointList);
    }
    const dirPath = await getPath( "FRONTEND" );
    if (String(dirPath).endsWith("/")) {
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        // 末尾のスラッシュを除去
        dirPath = dirPath.slice(0, -1);
    }
    const jsonfiles = await glob(dirPath + '/**/api.json');
    const list = [];
    for (const filePath of jsonfiles) {
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        const endpointInfo = await _getEndpointInfo(filePath);
        list.push({
            endpointPath: endpointInfo.endpointPath,
            httpMethod: endpointInfo.httpMethod,
            description: endpointInfo.description,
        });
    }
    // 次回のためにデータを残しておく
    endpointList = list;
    return structuredClone(list);
}



// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    endpointInfo = {};
    endpointList = null;
    return await clearCache();
}
