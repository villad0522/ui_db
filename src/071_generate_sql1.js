// SQL生成(重複あり)
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
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
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./082_csv_validate.js";
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


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// SQLクエリを生成
export async function generateSQLwithDuplication_core( tableId, selectData, joinData, whereData, orderData, isCount, onePageMaxSize ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  //
  let sql = "";
  //===================================================================================
  if(isCount){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `SELECT COUNT(*) AS 'total'\n`;
    sql += `FROM (\n`;
    sql += `SELECT *\n`;
  }
  else{
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    if(selectData.length===0){
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      // SELECT句の長さがゼロの場合
      return `SELECT * FROM ${tableId} WHERE 0 LIMIT 0 OFFSET :offset`;
    }
    const selectList = [];
    selectList.push(`main.${primaryKey} AS 'id'`);
    for( const { conditionId, viewColumnId, viewColumnType, joinId, columnName, viewColumnName } of selectData ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      switch(viewColumnType){
        case "RAW":
          if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
          selectList.push(`${joinId}.${columnName} AS '${conditionId}'`);
          break;
        case "SUM":
          if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
          selectList.push(`SUM(${joinId}.${columnName}) AS '${conditionId}'`);
          break;
        case "MAX":
          if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
          selectList.push(`MAX(${joinId}.${columnName}) AS '${conditionId}'`);
          break;
        case "MIN":
          if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
          selectList.push(`MIN(${joinId}.${columnName}) AS '${conditionId}'`);
          break;
        case "AVG":
          if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
          selectList.push(`AVG(${joinId}.${columnName}) AS '${conditionId}'`);
          break;
        case "COUNT":
          if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
          selectList.push(`COUNT(${joinId}.${columnName}) AS '${conditionId}'`);
          break;
        default:
          throw `サポートされていない集合関数が指定されました。viewColumnType = ${viewColumnType}`;
      }
    }
    sql += `SELECT ${selectList.join(",\n  ")}\n`;
  }
  //===================================================================================
  sql += `FROM ${tableId} AS main\n`;
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnName } of joinData ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `  LEFT OUTER JOIN ${toTableName} AS ${toJoinId}\n`;
    sql += `    ON ${fromJoinId}.${fromColumnName} = ${toJoinId}.${toColumnName}\n`;
  }
  //===================================================================================
  const whereList = [];
  for( const { viewColumnId, conditionalExpression, joinId, columnName } of whereData ){
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    switch(conditionalExpression.trim()){
      case "=":
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} = :${viewColumnId} )`);
        break;
      case "!=":
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} != :${viewColumnId} )`);
        break;
      case ">":
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} > :${viewColumnId} )`);
        break;
      case "<":
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} < :${viewColumnId} )`);
        break;
      case ">=":
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} >= :${viewColumnId} )`);
        break;
      case "<=":
        if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
        whereList.push(`( ${joinId}.${columnName} <= :${viewColumnId} )`);
        break;
      default:
        throw `サポートされていない条件演算子が指定されました。conditionalExpression = ${conditionalExpression}`;
    }
  }
  if( whereList.length > 0 ){
    if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `WHERE ${whereList.join("\n  AND ")}\n`;
  }
  //===================================================================================
  sql += `GROUP BY main.${primaryKey}\n`;
  //===================================================================================
  const orderByList = [];
  for( const { joinId, columnName, isAscending } of orderData ){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    if(isAscending){
      if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
      orderByList.push(`${joinId}.${columnName} ASC`);
    }
    else{
      if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
      orderByList.push(`${joinId}.${columnName} DESC`);
    }
  }
  for( const { fromJoinId, fromColumnName, toJoinId, toTableName, toColumnId } of joinData ){
    if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    orderByList.push(`${toJoinId}.sort_number DESC`);
  }
  if( orderByList.length > 0 ){
    if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `ORDER BY ${orderByList.join(",\n  ")}\n`;
  }
  //===================================================================================
  if(isCount){
    if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `)`;
  }
  else {
    if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
    if(onePageMaxSize){
      if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
      sql += `LIMIT ${onePageMaxSize} OFFSET :offset`;
    }
    else{
      if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
      sql += `LIMIT 10000 OFFSET :offset`;
    }
  }
  //
  return sql;
}
