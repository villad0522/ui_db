// 予約語フィルター
//
import {
  startUp,
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  createColumn,
  deleteTable,
  disableColumn,
  enableColumn,
  updateColumnName,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
  getColumnIdFromName,
} from "./103_column_name_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./121_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
import {
  listDataTypes,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
} from "./112_data_type_validate.js";
import {
  createTable,
  reload,
  disableTable,
  enableTable,
  updateTableName,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./106_table_name_validate.js";
import {
  deleteRecords,
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./109_sort_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// カラムを作成
export async function createColumn_core( tableId, columnName, dataType ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await checkReservedWord_core( columnName );
  return await createColumn( tableId, columnName, dataType );
}


// カラム名を変更
export async function updateColumnName_core( columns ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  for( const { id, name } of columns ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    await checkReservedWord_core( name );
  }
  return await updateColumnName( columns );
}


// テーブルを作成
export async function createTable_core( tableName ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  await checkReservedWord_core( tableName );
  return await createTable( tableName );
}


// テーブル名を変更
export async function updateTableName_core( tables ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  for( const { id, name } of tables ){
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    await checkReservedWord_core( name );
  }
  return await updateTableName( tables );
}



// 予約語を追加
export async function reserveWord_core( word ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  const word2 = String(word).toUpperCase();
  reservedWords.push(word2);
}


// 予約語かどうか判定
export async function checkReservedWord_core( word ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  if ( /^[\x20-\x7e]*$/.test(word) ){
    if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    // 半角文字の場合
    if( word.length <= 2 ) {
      throw new Error(`「${word}」は登録できません。２文字以上の全角文字 または ３文字以上の英数字で登録してください。`);
    }
  }
  else{
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // 全角文字の場合
    if( word.length <= 1 ) {
      throw new Error(`「${word}」は登録できません。２文字以上の全角文字 または ３文字以上の英数字で登録してください。`);
    }
  }
  if ( word.includes(' ') || word.includes('　') ) {
    throw new Error(`空白文字は使用できません。`);
  }
  const name2 = String(word).toUpperCase();
  for( const reservedWord of reservedWords ){
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    if( reservedWord.includes(name2) ){
      throw new Error(`テーブル名「${word}」は、予約語「${reserveWord}」と被るため使用できません。`);
    }
  }
}



const reservedWords = [
  "ID",
  "RECORDID",
  //
  "ABORT",
  "ACTION",
  "ADD",
  "AFTER",
  "ALL",
  "ALTER",
  "ALWAYS",
  "ANALYZE",
  "AND",
  "AS",
  "ASC",
  "ATTACH",
  "AUTOINCREMENT",
  "BEFORE",
  "BEGIN",
  "BETWEEN",
  "BY",
  "CASCADE",
  "CASE",
  "CAST",
  "CHECK",
  "COLLATE",
  "COLUMN",
  "COMMIT",
  "CONFLICT",
  "CONSTRAINT",
  "CREATE",
  "CROSS",
  "CURRENT",
  "CURRENT_DATE",
  "CURRENT_TIME",
  "CURRENT_TIMESTAMP",
  "DATABASE",
  "DEFAULT",
  "DEFERRABLE",
  "DEFERRED",
  "DELETE",
  "DESC",
  "DETACH",
  "DISTINCT",
  "DO",
  "DROP",
  "EACH",
  "ELSE",
  "END",
  "ESCAPE",
  "EXCEPT",
  "EXCLUDE",
  "EXCLUSIVE",
  "EXISTS",
  "EXPLAIN",
  "FAIL",
  "FILTER",
  "FIRST",
  "FOLLOWING",
  "FOR",
  "FOREIGN",
  "FROM",
  "FULL",
  "GENERATED",
  "GLOB",
  "GROUP",
  "GROUPS",
  "HAVING",
  "IF",
  "IGNORE",
  "IMMEDIATE",
  "IN",
  "INDEX",
  "INDEXED",
  "INITIALLY",
  "INNER",
  "INSERT",
  "INSTEAD",
  "INTERSECT",
  "INTO",
  "IS",
  "ISNULL",
  "JOIN",
  "KEY",
  "LAST",
  "LEFT",
  "LIKE",
  "LIMIT",
  "MATCH",
  "MATERIALIZED",
  "NATURAL",
  "NO",
  "NOT",
  "NOTHING",
  "NOTNULL",
  "NULL",
  "NULLS",
  "OF",
  "OFFSET",
  "ON",
  "OR",
  "ORDER",
  "OTHERS",
  "OUTER",
  "OVER",
  "PARTITION",
  "PLAN",
  "PRAGMA",
  "PRECEDING",
  "PRIMARY",
  "QUERY",
  "RAISE",
  "RANGE",
  "RECURSIVE",
  "REFERENCES",
  "REGEXP",
  "REINDEX",
  "RELEASE",
  "RENAME",
  "REPLACE",
  "RESTRICT",
  "RETURNING",
  "RIGHT",
  "ROLLBACK",
  "ROW",
  "ROWS",
  "SAVEPOINT",
  "SELECT",
  "SET",
  "TABLE",
  "TEMP",
  "TEMPORARY",
  "THEN",
  "TIES",
  "TO",
  "TRANSACTION",
  "TRIGGER",
  "UNBOUNDED",
  "UNION",
  "UNIQUE",
  "UPDATE",
  "USING",
  "VACUUM",
  "VALUES",
  "VIEW",
  "VIRTUAL",
  "WHEN",
  "WHERE",
  "WINDOW",
  "WITH",
  "WITHOUT",
];

