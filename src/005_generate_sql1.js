// SQL生成(重複あり)
//
import {
  startUp,
  test012,
} from "./012_sort_test.js";
import {
  getLocalIp,
  test034,
} from "./034_ip_address_test.js";
import {
  getPath,
  test032,
} from "./032_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
  test030,
} from "./030_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  test020,
} from "./020_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
  test024,
} from "./024_search_text_test.js";
import {
  getPrimaryKey,
  test028,
} from "./028_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  test014,
} from "./014_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  test026,
} from "./026_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  test018,
} from "./018_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
  test022,
} from "./022_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  test016,
} from "./016_record_title_test.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
  test010,
} from "./010_columnPath_test.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
  test008,
} from "./008_convert_sql_data_test.js";
import {
  generateSQLwithoutDuplication,
  test006,
} from "./006_generate_sql2_test.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


// SQLクエリを生成
export async function generateSQLwithDuplication_core( tableId, selectData, joinData, whereData, orderData ){
  const primaryKey = await getPrimaryKey( tableId );
  //
  let sql = "";
  //===================================================================================
  sql += `SELECT\n`;
  for( const { type, joinId, columnName, as } of selectData ){
    if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    switch(type){
      case "RAW":
        sql += `  ${joinId}.${columnName} AS '${as}'\n`;
        break;
      case "SUM":
        sql += `  SUM(${joinId}.${columnName}) AS '${as}'\n`;
        break;
      case "MAX":
        sql += `  MAX(${joinId}.${columnName}) AS '${as}'\n`;
        break;
      case "MIN":
        sql += `  MIN(${joinId}.${columnName}) AS '${as}'\n`;
        break;
      case "AVG":
        sql += `  AVG(${joinId}.${columnName}) AS '${as}'\n`;
        break;
      case "COUNT":
        sql += `  COUNT(${joinId}.${columnName}) AS '${as}'\n`;
        break;
      default:
        throw `サポートされていない集合関数が指定されました。type=${type}`;
    }
  }
  sql += `\n`;
  //===================================================================================
  sql += `FROM ${tableId} AS main\n`;
  sql += `  LEFT OUTER JOIN sort_numbers AS sort_main\n`;
  sql += `    ON ( main.${primaryKey} = sort_main.record_id ) AND ( sort_main.table_id = '${tableId}' )\n`;
  //
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnName } of joinData ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `  \n`;
    sql += `  LEFT OUTER JOIN ${toTableName} AS ${toJoinId}\n`;
    sql += `    ON ${fromJoinId}.${fromColumnName} = ${toJoinId}.${toColumnName}\n`;
    //
    sql += `  LEFT OUTER JOIN sort_numbers AS sort_${toJoinId}\n`;
    sql += `    ON ( ${toJoinId}.${toColumnName} = sort_${toJoinId}.record_id ) AND ( sort_${toJoinId}.table_id = '${toTableName}' )\n`;
  }
  sql += `\n`;
  //===================================================================================
  const parameters = {};
  const whereList = [];
  for( const { displayColumnId, type, joinId, columnName, value } of whereData ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    parameters[":"+displayColumnId] = value;
    switch(type.trim()){
      case "=":
        whereList.push(`( ${joinId}.${columnName} = :${displayColumnId} )`);
        break;
      case "!=":
        whereList.push(`( ${joinId}.${columnName} != :${displayColumnId} )`);
        break;
      case ">":
        whereList.push(`( ${joinId}.${columnName} > :${displayColumnId} )`);
        break;
      case "<":
        whereList.push(`( ${joinId}.${columnName} < :${displayColumnId} )`);
        break;
      case ">=":
        whereList.push(`( ${joinId}.${columnName} >= :${displayColumnId} )`);
        break;
      case "<=":
        whereList.push(`( ${joinId}.${columnName} <= :${displayColumnId} )`);
        break;
      default:
        throw `サポートされていない条件演算子が指定されました。type=${type}`;
    }
    parameterCount++;
  }
  sql += `WHERE ${whereList.join("\n  AND ")}\n`;
  sql += `\n`;
  //===================================================================================
  sql += `GROUP BY main.${primaryKey}\n`;
  sql += `\n`;
  //===================================================================================
  const orderByList = [];
  for( const { joinId, columnName, isAscending } of orderData ){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    if(isAscending){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      orderByList.push(`${joinId}.${columnName} ASC`);
    }
    else{
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      orderByList.push(`${joinId}.${columnName} DESC`);
    }
  }
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnName } of joinData ){
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    orderByList.push(`sort_${toJoinId}.sort_number ASC`);
  }
  sql += `ORDER BY ${orderByList.join(",\n  ")}\n`;
  sql += `\n`;
  //===================================================================================
  //
  return {
    sql: sql,
    parameters: {},
  };
}
