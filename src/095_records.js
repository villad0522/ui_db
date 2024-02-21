// 本体データ
//
import {
  startUp,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  listChildrenColumnId,
} from "./103_relation_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./133_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./112_column_name_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  createTable,
  deleteTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
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
} from "./106_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./115_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./118_sort_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// レコードの一覧を取得(GUI)
export async function listRecords_core( tableId, pageNumber, onePageMaxSize, focusRecordId, pasteRecordId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const primaryKey = await getPrimaryKey( tableId );
    let columns = await listColumnsAll( tableId );
    columns = columns.map( columnInfo => {
        let columnName = String(columnInfo.name);
        if( columnName.startsWith(tableId+"_") ){
            if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
            columnName = columnName.replace( tableId+"_", "" );
        }
        return {
            ...columnInfo,
            "name": columnName,
        };
    });
    if ( !pageNumber ) {
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    if (!(pageNumber >= 1)) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    const [{ "COUNT(*)": recordsTotal }] = await runSqlReadOnly(
        `SELECT COUNT(*) FROM ${tableId};`,
        {},
    );
    let offset = onePageMaxSize * (pageNumber - 1);
    if( !isNaN(pasteRecordId) && pasteRecordId>=1 ){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        const [{ "COUNT(*)": offset2 }] = await runSqlReadOnly(
            `SELECT COUNT(*)
                FROM ${tableId}
                WHERE sort_number > (
                    SELECT sort_number
                        FROM ${tableId}
                        WHERE ${primaryKey} = :recordId
                        LIMIT 1
                )
                ORDER BY sort_number DESC;`,
            {
                ":recordId": pasteRecordId,
            },
        );
        offset = offset2 - (offset2 % onePageMaxSize);
    }
    else if( !isNaN(focusRecordId) && focusRecordId>=1 ){
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        const [{ "COUNT(*)": offset2 }] = await runSqlReadOnly(
            `SELECT COUNT(*)
                FROM ${tableId}
                WHERE sort_number > (
                    SELECT sort_number
                        FROM ${tableId}
                        WHERE ${primaryKey} = :recordId
                        LIMIT 1
                )
                ORDER BY sort_number DESC;`,
            {
                ":recordId": focusRecordId,
            },
        );
        offset = offset2 - (offset2 % onePageMaxSize);
    }
    if( offset >= recordsTotal ){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        offset = recordsTotal;
    }
    // 「sqlite_master」と結合させることで、実際に存在するテーブルのみに絞り込む
    const oldRecords = await runSqlReadOnly(
        `SELECT *
            FROM ${tableId}
            ORDER BY sort_number DESC
            LIMIT :limit OFFSET :offset;`,
        {
            ":limit": onePageMaxSize,
            ":offset": offset,
        },
    );
    // 切り取り中のレコードを取得する
    const cuttingRecordId = await getCuttingRecord( tableId );
    // コピー中のレコードを取得する
    const copyingRecordId = await getCopyingRecord( tableId );
    const newRecords = [];
    for( const oldRecord of oldRecords ){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        const recordId = oldRecord[primaryKey];
        const newRecord = {
            "id": String(recordId),
            "isFocus": (recordId===focusRecordId) ? true : false,
            "isCopying": (recordId===copyingRecordId) ? true : false,
            "isCutting": (recordId===cuttingRecordId) ? true : false,
            "isPaste": (recordId===pasteRecordId) ? true : false,
        };
        for( let i=0; i<columns.length; i++ ){
            if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = columns[i]["id"];
            let value = oldRecord[columnId];
            newRecord[ "field" + i ] = value;
        }
        newRecords.push(newRecord);
    }
    return {
        "columns": columns,
        "records": newRecords,
        "recordsTotal": recordsTotal,
        "pageNumber": Math.floor(offset/onePageMaxSize)+1,
    };
}



// レコードを追加
export async function createRecordFromUI_core( tableId, columns ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    const newFields = {};
    for( let i=0; i<columns.length; i++ ){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnId = columns[i]["id"];
        const inputText = columns[i]["newField"];
        newFields[columnId] = await formatField( inputText, columnId, false );
    }
    return await createRecord( tableId, newFields );
}
