// SQL生成
//
import {
  startUp,
} from "./018_sort_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  getPath,
} from "./048_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./030_column_name_validate.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./036_search_text_validate.js";
import {
  getPrimaryKey,
} from "./042_layerName_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./021_relation_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./039_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./027_reserved_word_validate.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./033_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./024_record_title_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./015_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./012_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./009_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./006_generate_sql1_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



// SQLクエリを生成
export async function generateSQL_core( tableId, displayColumns, conditions, sortOrder ){
  // displayColumns の例
  //   [
  //     {
  //       displayColumnId: "d28",
  //       type: "RAW",
  //       path: "main.c2 > c53 > c1",
  //       as: "○○",
  //     },
  //     {
  //       displayColumnId: "d66",
  //       type: "COUNT",           // 集合関数。RAW, SUM、MAX、MIN、AVG、COUNT のいずれか。関数を使用しない場合はRAWを代入する。
  //       path: "c89 > c67 > main",
  //       as: "○○の件数",
  //     },
  //     {
  //       displayColumnId: "d43",
  //       type: "MAX",
  //       path: "c45 > c56 > main",
  //       as: "○○の最大値",
  //     }
  //   ]
  //
  // conditions の例
  //   [
  //     {
  //       displayColumnId: "d66",
  //       type: "=",       // !=, =, >, <, <=, >= のいずれか
  //       value: 0,
  //     }
  //   ]
  //
  // sortOrder の例
  //   [
  //     {
  //       displayColumnId: "d78",
  //       isAscending: true,
  //     }
  //   ]
  for( const { path } of displayColumns ){
    if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    // パスの文法をチェックする
    await checkPath( path );
  }
  //
  // テーブルを結合するために、外部キーの一覧を作成する（重複しないように）
  const joinIdMap = await getJoinIdMap( displayColumns );
  //
  // 結合しているテーブルが重複しているか（ true:重複あり、false:重複無し ）
  const isDuplication = await checkTableDuplication( tableId, joinMap );
  //
  const selectData = await getSelectData( displayColumns, joinIdMap );
  const joinData = await getJoinData( joinIdMap );
  const whereData = await getWhereData( displayColumns, conditions, joinIdMap );
  const orderData = await getOrderData( displayColumns, sortOrder, joinIdMap );
  //
  if( isDuplication === true ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    // 重複しているテーブルを結合する場合、「テーブル名 AS 別名」と記入する必要がある。
    return await generateSQLwithDuplication( tableId, selectData, joinData, whereData, orderData );
  }
  else{
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // テーブルが重複していない場合
    return await generateSQLwithDuplication( tableId, selectData, joinData, whereData, orderData );
    //return await generateSQLwithoutDuplication( tableId, selectData, joinData, whereData, orderData );
  }
}


