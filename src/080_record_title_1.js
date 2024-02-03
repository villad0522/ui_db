// レコードの見出し1
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./082_record_title_2_validate.js";
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
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./091_relation_validate.js";
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
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./103_table_name_validate.js";
import {
  formatField,
} from "./088_db_formatter_validate.js";
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
  updateRecords,
  createRecordFromView,
  _convertToRecord,
} from "./085_input_element_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// レコードを作成
export async function createRecord_core( tableId, recordData ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  const columns = await listColumnsAll( tableId );
  const newRecordData = {};
  for( const { id, name, dataType, parentTableId } of columns ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    if( dataType!=="POINTER" ){
      if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
      newRecordData[id] = recordData[id];
      continue;
    }
    if( !parentTableId ){
      throw `親テーブルが不明です。\nテーブルID=${tableId}\nカラムID=${id}`;
    }
    const value = recordData[id];
    const text = recordData[id+"_text"];
    if( value && text ){
      throw `レコードを追加しようとしましたが、リクエストが不正です。マスターデータのIDと文字列が両方指定されています。\nテーブルID=${tableId}\nカラムID=${id}`;
    }
    else if(value){
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      newRecordData[id] = recordData[id];
      continue;
    }
    if(!text){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      // 空欄の場合
      continue;
    }
    // 文字列でマスターデータを指定された場合
    if( typeof text !== "string" ){
      throw `レコードを追加しようとしましたが、リクエストが不正です。「${id}_text」に文字列以外が指定されました。`;
    }
    const parentRecordId = await getRecordIdFromTitle( parentTableId, text );
    if(!parentRecordId){
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      const parentTableName = await getTableName(parentTableId);
      throw `「${text}」は「${parentTableName}」に登録されていません。`;
    }
    newRecordData[id] = parentRecordId;
  }
  return await createRecord( tableId, newRecordData );  // 下層の関数を呼び出す
}


// レコードを上書き
export async function updateRecord_core( tableId, records ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  const columns = await listColumnsAll( tableId );
  const newRecords = [];
  const primaryKey = await getPrimaryKey( tableId );
  for( let i=0; i<records.length; i++ ){
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    newRecords[i] = {
      [primaryKey]: records[i][primaryKey],
    };
    for( const { id: columnId, name, dataType, parentTableId } of columns ){
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      if( dataType!=="POINTER" ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        newRecords[i][columnId] = records[i][columnId];
        continue;
      }
      if( !parentTableId ){
        throw `親テーブルが不明です。\nテーブルID=${tableId}\nカラムID=${columnId}`;
      }
      const value = records[i][columnId];
      const text = records[i][columnId+"_text"];
      if( value && text ){
        throw `レコードを上書きしようとしましたが、リクエストが不正です。マスターデータのIDと文字列が両方指定されています。\nテーブルID=${tableId}\nカラムID=${columnId}`;
      }
      else if(value){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        newRecords[i][columnId] = records[i][columnId];
        continue;
      }
      if(!text){
        if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
        // 空欄の場合
        continue;
      }
      // 文字列でマスターデータを指定された場合
      if( typeof text !== "string" ){
        throw `レコードを上書きしようとしましたが、リクエストが不正です。「${columnId}_text」に文字列以外が指定されました。`;
      }
      const parentRecordId = await getRecordIdFromTitle( parentTableId, text );
      if(!parentRecordId){
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
        const parentTableName = await getTableName(parentTableId);
        throw `「${text}」は「${parentTableName}」に登録されていません。`;
      }
      newRecords[i][columnId] = parentRecordId;
    }
  }
  return await updateRecord( tableId, newRecords );  // 下層の関数を呼び出す
}

// フィールドを検証
export async function checkField_core( columnId, value ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// レコードを検証
export async function checkRecord_core( tableId, recordData ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}