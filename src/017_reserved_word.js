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
} from "./018_column_name_test.js";
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
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./022_search_text_test.js";
import {
  getPrimaryKey,
} from "./026_layerName_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
} from "./024_data_type_test.js";
import {
  createTable,
  disableTable,
  enableTable,
  updateTableName,
  listTables,
  checkTableEnabled,
  getTableName,
} from "./020_table_name_test.js";

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType ){
  if ( columnName.includes(' ') || columnName.includes('　') ) {
    throw `空白文字は使用できません。`;
  }
  const name2 = String(columnName).toUpperCase();
  if( reservedWords.includes(name2) ){
    throw `カラム名「${columnName}」は、予約語のため使用できません。`;
  }
  return await createColumn( tableId, columnName, dataType );
}

// カラム名を変更
export async function updateColumnName_core( columns ){
  for( const { id, name } of columns ){
    if ( name.includes(' ') || name.includes('　') ) {
      throw `空白文字は使用できません。`;
    }
    const name2 = String(name).toUpperCase();
    if( reservedWords.includes(name2) ){
      throw `カラム名「${name}」は、予約語のため使用できません。`;
    }
  }
  return await updateColumnName( columns );
}

// テーブルを作成
export async function createTable_core( tableName, isSystemTable ){
  if ( tableName.includes(' ') || tableName.includes('　') ) {
    throw `空白文字は使用できません。`;
  }
  const name2 = String(tableName).toUpperCase();
  if( reservedWords.includes(name2) ){
    throw `テーブル名「${tableName}」は、予約語のため使用できません。`;
  }
  return await createTable( tableName, isSystemTable );
}

// テーブル名を変更
export async function updateTableName_core( tables ){
  for( const { id, name } of tables ){
    if ( name.includes(' ') || name.includes('　') ) {
      throw `空白文字は使用できません。`;
    }
    const name2 = String(name).toUpperCase();
    if( reservedWords.includes(name2) ){
      throw `テーブル名「${name}」は、予約語のため使用できません。`;
    }
  }
  return await updateTableName( tables );
}

// 予約語を追加
export async function reserveWord_core( word ){
  const word2 = String(word).toUpperCase();
  reservedWords.push(word2);
}

const reservedWords = [
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