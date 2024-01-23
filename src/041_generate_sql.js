// SQL生成
//
import {
  startUp,
} from "./055_sort_validate.js";
import {
  getLocalIp,
} from "./091_ip_address_validate.js";
import {
  getPath,
} from "./088_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./085_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./073_column_name_validate.js";
import {
  getPrimaryKey,
} from "./082_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./064_relation_validate.js";
import {
  listDataTypes,
} from "./079_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./058_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./070_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./061_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./076_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./067_record_title_2_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./052_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./049_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./046_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./043_generate_sql1_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



// SQLクエリを生成
export async function generateSQL_core( tableId, joinedColumns, conditionInfoList, sortOrder ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  // joinedColumns の例
  //   [
  //     {
  //       joinedColumnId: "d28",
  //       joinedColumnType: "RAW",
  //       columnPath: "main.c2 > c53 > c1",
  //       joinedColumnName: "○○",
  //     },
  //     {
  //       joinedColumnId: "d66",
  //       joinedColumnType: "COUNT",           // 集合関数。RAW, SUM、MAX、MIN、AVG、COUNT のいずれか。関数を使用しない場合はRAWを代入する。
  //       columnPath: "c89 > c67 > main",
  //       joinedColumnName: "○○の件数",
  //     },
  //     {
  //       joinedColumnId: "d43",
  //       joinedColumnType: "MAX",
  //       columnPath: "c45 > c56 > main",
  //       joinedColumnName: "○○の最大値",
  //     }
  //   ]
  //
  // conditionInfoList の例
  //   [
  //     {
  //       joinedColumnId: "d66",
  //       conditionalExpression: "=",       // !=, =, >, <, <=, >= のいずれか
  //     }
  //   ]
  //
  // sortOrder の例
  //   [
  //     {
  //       joinedColumnId: "d78",
  //       isAscending: true,
  //     }
  //   ]
  for( const { columnPath } of joinedColumns ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    // パスの文法をチェックする
    await checkPath( columnPath );
  }
  //
  // テーブルを結合するために、外部キーの一覧を作成する（重複しないように）
  const joinIdMap = await getJoinIdMap( joinedColumns );
  //
  // 結合しているテーブルが重複しているか（ true:重複あり、false:重複無し ）
  const isDuplication = await checkTableDuplication( tableId, joinIdMap );
  //
  const selectData = await getSelectData( joinedColumns, joinIdMap );
  const joinData = await getJoinData( joinIdMap );
  const whereData = await getWhereData( joinedColumns, conditionInfoList, joinIdMap );
  const orderData = await getOrderData( joinedColumns, sortOrder, joinIdMap );
  //
  if( isDuplication === true ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 重複しているテーブルを結合する場合、「テーブル名 AS 別名」と記入する必要がある。
    return await generateSQLwithDuplication( tableId, selectData, joinData, whereData, orderData );
  }
  else{
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    // テーブルが重複していない場合
    return await generateSQLwithoutDuplication( tableId, selectData, joinData, whereData, orderData );
  }
}


