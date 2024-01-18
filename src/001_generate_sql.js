// SQL生成
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
import {
  generateSQLwithDuplication,
} from "./002_generate_sql1_test.js";


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
  //       type: "COUNT",           // RAW, MAX, SUM, COUNT のいずれか
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
    // 重複しているテーブルを結合する場合、「テーブル名 AS 別名」と記入する必要がある。
    return await generateSQLwithDuplication( tableId, countTableIdList );
  }
  else{
    // テーブルが重複していない場合
    return await generateSQLwithoutDuplication( tableId, countTableIdList );
  }
}


