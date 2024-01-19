// SQL生成(重複あり)
//
import {
  startUp,
} from "./010_sort_test.js";
import {
  getLocalIp,
} from "./032_ip_address_test.js";
import {
  getPath,
} from "./030_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./028_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./018_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./022_search_text_test.js";
import {
  getPrimaryKey,
} from "./026_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./012_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./024_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./016_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./020_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./014_record_title_test.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./008_columnPath_test.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./006_convert_sql_data_test.js";
import {
  generateSQLwithoutDuplication,
} from "./004_generate_sql2_test.js";

// SQLクエリを生成
export async function generateSQLwithDuplication_core( tableId, selectData, joinData, whereData, orderData ){
  const primaryKey = await getPrimaryKey( tableId );
  //
  let sql = "";
  //===================================================================================
  sql += `SELECT\n`;
  for( const { type, joinId, columnName, as } of selectData ){
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
    if(isAscending){
      orderByList.push(`${joinId}.${columnName} ASC`);
    }
    else{
      orderByList.push(`${joinId}.${columnName} DESC`);
    }
  }
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnName } of joinData ){
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
