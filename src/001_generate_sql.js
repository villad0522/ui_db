// SQL生成
//
import {
  startUp,
} from "./006_sort_test.js";
import {
  getLocalIp,
} from "./028_ip_address_test.js";
import {
  getPath,
} from "./026_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./024_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./014_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./018_search_text_test.js";
import {
  getPrimaryKey,
} from "./022_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./008_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./020_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./012_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./016_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./010_record_title_test.js";
import {
  generateSQLwithoutDuplication,
} from "./004_generate_sql2_test.js";
import {
  generateSQLwithDuplication,
} from "./002_generate_sql1_test.js";


// SQLクエリを生成
export async function generateSQL_core( tableId, parentColumnLists, childColumnLists, conditions ){
  // parentColumnLists の例
  //   {
  //     "ASで表示する文字列" : [ c8 ],
  //     "○○○" : [ c5 ],
  //     "○○○" : [ c4 ],
  //     "○○○" : [ c2 > c51 ],
  //     "○○○" : [ c2 > c52 ],
  //     "○○○" : [ c2 > c53 > c1 ]
  //   }
  //
  // childColumnLists の例
  //   {
  //     "○○の件数" : {
  //       type: "COUNT",
  //       path: [ c89 > c67 > メインテーブル ],
  //     },
  //     "○○の最大値" : {
  //       type: "MAX",
  //       path: [ c45 > c56 > メインテーブル ],
  //     }
  //   }
  //
  // conditions の例
  //   {
  //     "ASで表示する文字列" : {
  //       type: "=",
  //       value: 0,
  //     },
  //   }
  //
  // テーブルを結合するために、外部キーの一覧を作成する（重複しないように）
  const foreignKeys = new Set();
  for( const parentColumnList of parentColumnLists ){
    // 配列「parentColumnLists」の例  …  [ "c2", "c53", "c1" ]
    //   テーブルを結合させるために、配列の最後から二番目まで繰り返す
    for( let i=0; i<parentColumnList.length - 1; i++ ){
      const pathText = parentColumnList.slice(0, i+1).join(">");
      foreignKeys.add(pathText);
    }
  }
  //
  // 結合しているテーブルが重複しているか（ true:重複あり、false:重複無し ）
  const isDuplication = _checkTableDuplication( tableId, foreignKeys );
  //
  for( const foreignKey of foreignKeys ){
    const columns = foreignKey.slice(">");
    const columnId = columns[columns.length-1];
    const parentTableId = await getParentTableId( columnId );
  }
  //
  // カラムの一覧を取得
  const columns = await listColumnsAll( tableId );
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


// 結合しているテーブルが重複しているかチェックする関数
function _checkTableDuplication( tableId, foreignKeys ){
  const tables = new Set();
  tables.add(tableId);
  for( const foreignKey of foreignKeys ){
    const columns = foreignKey.slice(">");
    const columnId = columns[columns.length-1];
    const parentTableId = await getParentTableId( columnId );
    if( !parentTableId ){
      // 通常のカラムの場合
      continue;
    }
    // 外部キーの場合
    if( tables.has(parentTableId) ){
      // 重複あり
      return true;
    }
    tables.add(parentTableId);
  }
  // 重複無し
  return false;
}