// API情報
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
  createJoinedTable,
  deleteJoinedTable,
  addJoinedColumn,
} from "./037_joined_table_validate.js";
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
  listPagesFromTableId,
  getTableFromPage,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
} from "./040_pages_validate.js";
import {
  regenerateHTML,
} from "./031_regenerate_html_validate.js";


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