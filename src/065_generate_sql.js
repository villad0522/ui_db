// SQL生成
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
  _getParentValue,
  _getRecordOffset,
} from "./082_record_title_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./079_csv_validate.js";
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
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
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


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



// SQLクエリを生成
export async function generateSQL_core( tableId, viewColumns, conditionInfoList, sortOrder ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  // viewColumns の例
  //   [
  //     {
  //       viewColumnId: "d28",
  //       viewColumnType: "RAW",
  //       columnPath: "main.c2 > c53 > c1",
  //       viewColumnName: "○○",
  //     },
  //     {
  //       viewColumnId: "d66",
  //       viewColumnType: "COUNT",           // 集合関数。RAW, SUM、MAX、MIN、AVG、COUNT のいずれか。関数を使用しない場合はRAWを代入する。
  //       columnPath: "c89 > c67 > main",
  //       viewColumnName: "○○の件数",
  //     },
  //     {
  //       viewColumnId: "d43",
  //       viewColumnType: "MAX",
  //       columnPath: "c45 > c56 > main",
  //       viewColumnName: "○○の最大値",
  //     }
  //   ]
  //
  // conditionInfoList の例
  //   [
  //     {
  //       viewColumnId: "d66",
  //       conditionalExpression: "=",       // !=, =, >, <, <=, >= のいずれか
  //     }
  //   ]
  //
  // sortOrder の例
  //   [
  //     {
  //       viewColumnId: "d78",
  //       isAscending: true,
  //     }
  //   ]
  for( const { columnPath } of viewColumns ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    // パスの文法をチェックする
    await checkPath( columnPath );
  }
  //
  // テーブルを結合するために、外部キーの一覧を作成する（重複しないように）
  const joinIdMap = await getJoinIdMap( viewColumns );
  //
  // 結合しているテーブルが重複しているか（ true:重複あり、false:重複無し ）
  const isDuplication = await checkTableDuplication( tableId, joinIdMap );
  //
  const selectData = await getSelectData( viewColumns, joinIdMap );
  const joinData = await getJoinData( joinIdMap );
  const whereData = await getWhereData( viewColumns, conditionInfoList, joinIdMap );
  const orderData = await getOrderData( viewColumns, sortOrder, joinIdMap );
  //
  let normalSQL;
  let countSQL;
  if( isDuplication === true ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 重複しているテーブルを結合する場合、「テーブル名 AS 別名」と記入する必要がある。
    normalSQL = await generateSQLwithDuplication( tableId, selectData, joinData, whereData, orderData, false );
    countSQL = await generateSQLwithDuplication( tableId, selectData, joinData, whereData, orderData, true );
  }
  else{
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    // テーブルが重複していない場合
    normalSQL = await generateSQLwithoutDuplication( tableId, selectData, joinData, whereData, orderData, false );
    countSQL = await generateSQLwithoutDuplication( tableId, selectData, joinData, whereData, orderData, true );
  }
  return {
    normalSQL,
    countSQL
  };
}


