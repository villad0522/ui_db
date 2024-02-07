// 本体データ
//
import {
  startUp,
  clearCache,
  createColumn,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./091_relation_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./115_csv_validate.js";
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
} from "./100_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./112_primary_key_validate.js";
import {
  deleteRecords,
} from "./109_delete_record_validate.js";
import {
  listDataTypes,
} from "./106_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./097_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./094_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./103_table_name_validate.js";
import {
  formatField,
} from "./088_db_formatter_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// レコードの一覧を取得(GUI)
export async function listRecords_core( tableId, pageNumber, onePageMaxSize, orderByColumnId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const primaryKey = await getPrimaryKey( tableId );
    const columns = await listColumnsAll( tableId );
    if ( !pageNumber ) {
        if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    if (!(pageNumber >= 1)) {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    const [{ "COUNT(*)": recordsTotal }] = await runSqlReadOnly(
        `SELECT COUNT(*) FROM ${tableId};`,
        {},
    );
    let offset = onePageMaxSize * (pageNumber - 1);
    if( offset >= recordsTotal ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        offset = recordsTotal;
    }
    // 「sqlite_master」と結合させることで、実際に存在するテーブルのみに絞り込む
    const oldRecords = await runSqlReadOnly(
        `SELECT *
            FROM ${tableId}
            LIMIT :limit OFFSET :offset;`,
        {
            ":limit": onePageMaxSize,
            ":offset": offset,
        },
    );
    const newRecords = [];
    for( const oldRecord of oldRecords ){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        const newRecord = {
            "id": String(oldRecord[primaryKey]),
        };
        for( let i=0; i<columns.length; i++ ){
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = columns[i]["id"];
            let value = oldRecord[columnId];
            newRecord[ "field" + i ] = String( value ?? "" );
        }
        newRecords.push(newRecord);
    }
    return {
        "columns": columns,
        "records": newRecords,
        "recordsTotal": recordsTotal
    };
}



// レコードを追加
export async function createRecord_core( tableId, columns ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    const newFields = {};
    for( let i=0; i<columns.length; i++ ){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnId = columns[i]["id"];
        const inputText = columns[i]["newField"];
        newFields[columnId] = await formatField( inputText, columnId, false );
    }
    return await createRecord( tableId, newFields );
}
