// SQL生成(重複あり)
//
import {
  startUp,
} from "./027_sort_validate.js";
import {
  getLocalIp,
} from "./060_ip_address_validate.js";
import {
  getPath,
} from "./057_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./054_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./042_column_name_validate.js";
import {
  getPrimaryKey,
} from "./051_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./033_relation_validate.js";
import {
  listDataTypes,
} from "./048_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./030_search_text_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./039_reserved_word_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./036_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./045_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./024_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./021_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./018_generate_sql2_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// SQLクエリを生成
export async function generateSQLwithDuplication_core( tableId, selectData, joinData, whereData, orderData ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  //
  let sql = "";
  const parameters = {};
  //===================================================================================
  if(selectData.length===0){
    throw "SELECT句の長さがゼロです。";
  }
  const selectList = [];
  for( const { displayColumnId, type, joinId, columnName, as } of selectData ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    switch(type){
      case "RAW":
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        selectList.push(`${joinId}.${columnName} AS "${as}"`);
        break;
      case "SUM":
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        selectList.push(`SUM(${joinId}.${columnName}) AS "${as}"`);
        break;
      case "MAX":
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        selectList.push(`MAX(${joinId}.${columnName}) AS "${as}"`);
        break;
      case "MIN":
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        selectList.push(`MIN(${joinId}.${columnName}) AS "${as}"`);
        break;
      case "AVG":
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        selectList.push(`AVG(${joinId}.${columnName}) AS "${as}"`);
        break;
      case "COUNT":
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        selectList.push(`COUNT(${joinId}.${columnName}) AS "${as}"`);
        break;
      default:
        throw `サポートされていない集合関数が指定されました。type=${type}`;
    }
  }
  sql += `SELECT ${selectList.join(",\n  ")}\n`;
  sql += `\n`;
  //===================================================================================
  sql += `FROM ${tableId} AS main\n`;
  sql += `  LEFT OUTER JOIN sort_numbers AS sort_main\n`;
  sql += `    ON ( main.${primaryKey} = sort_main.record_id ) AND ( sort_main.table_id = '${tableId}' )\n`;
  //
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnName } of joinData ){
    if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `  \n`;
    sql += `  LEFT OUTER JOIN ${toTableName} AS ${toJoinId}\n`;
    sql += `    ON ${fromJoinId}.${fromColumnName} = ${toJoinId}.${toColumnName}\n`;
    //
    sql += `  LEFT OUTER JOIN sort_numbers AS sort_${toJoinId}\n`;
    sql += `    ON ( ${toJoinId}.${toColumnName} = sort_${toJoinId}.record_id ) AND ( sort_${toJoinId}.table_id = '${toTableName}' )\n`;
  }
  sql += `\n`;
  //===================================================================================
  const whereList = [];
  for( const { displayColumnId, type, joinId, columnName, value } of whereData ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    parameters[":"+displayColumnId] = value;
    switch(type.trim()){
      case "=":
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} = :${displayColumnId} )`);
        break;
      case "!=":
        if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} != :${displayColumnId} )`);
        break;
      case ">":
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} > :${displayColumnId} )`);
        break;
      case "<":
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} < :${displayColumnId} )`);
        break;
      case ">=":
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} >= :${displayColumnId} )`);
        break;
      case "<=":
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} <= :${displayColumnId} )`);
        break;
      default:
        throw `サポートされていない条件演算子が指定されました。type=${type}`;
    }
    parameterCount++;
  }
  if( whereList.length > 0 ){
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `WHERE ${whereList.join("\n  AND ")}\n`;
    sql += `\n`;
  }
  //===================================================================================
  sql += `GROUP BY main.${primaryKey}\n`;
  sql += `\n`;
  //===================================================================================
  const orderByList = [];
  for( const { joinId, columnName, isAscending } of orderData ){
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    if(isAscending){
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      orderByList.push(`${joinId}.${columnName} ASC`);
    }
    else{
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
      orderByList.push(`${joinId}.${columnName} DESC`);
    }
  }
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnId } of joinData ){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    orderByList.push(`sort_${toJoinId}.sort_number ASC`);
  }
  if( orderByList.length > 0 ){
    if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `ORDER BY ${orderByList.join(",\n  ")}\n`;
    sql += `\n`;
  }
  //===================================================================================
  //
  return {
    sql: sql,
    parameters: parameters,
  };
}
