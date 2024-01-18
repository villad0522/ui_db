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
export async function generateSQLwithDuplication_core( tableId, selectData, joinData, whereData ){




  //
  let sql = "";
  sql += `SELECT\n`;
  sql += await _selectCommand({ columns });
  sql += `  sort_numbers.sort_number AS sort_number\n`;
  sql += `FROM ${tableId} AS main_table\n`;
  sql += `  LEFT OUTER JOIN sort_numbers\n`;
  sql += `    ON ( main_table.record_id = sort_numbers.record_id\n`;
  sql += `          AND sort_numbers.table_id = '${tableId}' )\n`;
  sql += await _joinCommand({ columns });
  sql += `  WHERE ${await _whereCommand({ columns })}\n`
  sql += `  LIMIT ${limit};\n`;
  //
  // ダブルクォーテーションを、バッククォートに置き換える
  sql = sql.replace(/"/g, '`');
  //
  console.log( sql );
}


async function _selectCommand({ columns }){
  // 重複しているテーブルを結合する場合
  //   「テーブルの別名.カラム名」と記入する必要がある。
  let sql = "";
  for( const { id, name, dataType, parentTableId } of columns ){
    sql += `  main_table.${name} AS ${name},\n`;
    if( !parentTableId ){
      // 通常のカラムの場合
      sql += `  main_table.${name} AS ${name}_text,\n`;
      continue;
    }
    // 外部キーの場合
    //
    const parentTitleColumnId = await getTitleColumn( parentTableId );
    if( !parentTitleColumnId ){
      // 親テーブルにタイトルキーが設定されていない場合
      sql += `  main_table.${name} AS ${name}_text,\n`;
      continue;
    }
    const parentTitleColumnName = getColumnName( parentTitleColumnId );
    const columnNumber = id.replace("c","");
    sql += `  v${columnNumber}.${parentTitleColumnName} AS ${name}_text,\n`;
  }
  return sql;
}


async function _joinCommand({ columns }){
  let sql = "";
  for( const { id, name, parentTableId } of columns ){
    if( !parentTableId ){
      // 通常のカラムの場合
      continue;
    }
    // 外部キーの場合
    const parentTableName = await getTableName( parentTableId );
    const parentPrimaryKey = await getPrimaryKey( parentTableId );
    const columnNumber = id.replace("c","");
    sql += `  LEFT OUTER JOIN ${parentTableName} AS v${columnNumber}\n`;
    sql += `    ON ( main_table.${name} = v${columnNumber}.${parentPrimaryKey} )\n`;
  }
  return sql;
}


async function _whereCommand({ columns }){

}

