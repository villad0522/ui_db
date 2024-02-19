// リレーション
//
import {
  startUp,
  createRecord,
  updateRecords,
  deleteTable,
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
} from "./103_search_text_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
} from "./118_data_type_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./115_sort_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  //
  // テーブルを作成する（リレーションを保存するため）
  await reserveWord("relations"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS relations (
      child_column_id TEXT PRIMARY KEY,
      child_table_id TEXT NOT NULL,
      parent_table_id TEXT NOT NULL
    );`,
    {},
  );
  await _reload();    // メモリに再読み込み
}

let cacheData1 = {
  // 代入例
  //  "c23": "t4",
  //  "c56": "t6",
  //  "c98": "t6",
  // 参照元のカラム名 : 参照先のテーブル名
  //    childColumnId : parentTableId
};

let cacheData2 = {
  // 代入例
  //  "t4": [ "c23" ],
  //  "t6": [ "c56", "c98" ]
  // 参照先のテーブル名 : 参照元のカラム名の配列
  //      parentTableId : [ childColumnId ]
};


//【サブ関数】メモリに再読み込み
async function _reload() {
  const matrix = await runSqlReadOnly(
    `SELECT
      child_column_id AS childColumnId,
      child_table_id AS childTableId,
      parent_table_id AS parentTableId
    FROM relations;`,
    {},
  );
  cacheData1 = {};
  cacheData2 = {};
  for( const { childColumnId, childTableId, parentTableId } of matrix ){
    if(!cacheData2[parentTableId]){
      cacheData2[parentTableId] = [];
    }
    cacheData1[childColumnId] = parentTableId;
    cacheData2[parentTableId].push( childColumnId );
  }
}


// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  if( dataType !== "POINTER" && !parentTableId ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 外部キーではない場合
    return await createColumn( tableId, columnName, dataType );
  }
  // 外部キーの場合
  if( dataType !== "POINTER" ){
    throw `外部キーを作成する際は、dataTypeに"POINTER"を指定したうえで、parentTableIdも指定してください。`;
  }
  if( !parentTableId ){
    throw `外部キーを作成する際は、dataTypeに"POINTER"を指定したうえで、parentTableIdも指定してください。`;
  }
  const result = await createColumn( tableId, columnName, "INTEGER" );
  await runSqlWriteOnly(
    `INSERT INTO relations( child_column_id, child_table_id, parent_table_id )
        VALUES ( :childColumnId, :childTableId, :parentTableId );`,
    {
        ":childColumnId": result.columnId,
        ":childTableId": tableId,
        ":parentTableId": parentTableId
    },
  );
  await _reload();    // メモリに再読み込み
  return result;
}


// カラムの一覧を取得(GUI)
export async function listColumnsForGUI_core( tableId, pageNumber, onePageMaxSize, isTrash ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  // 下層の関数を実行する
  const { columns, total } = await listColumnsForGUI( tableId, pageNumber, onePageMaxSize, isTrash );
  //
  // 参照先が有効なカラムだけに絞り込む
  const columns2 = [];
  for (const columnData of columns ) {
    if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    const parentTableId = cacheData1[columnData.id];
    if(!parentTableId){ 
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし外部キーではなかったら、一覧に残す
      columns2.push(columnData);
      continue;
    }
    const isEnabled = await checkTableEnabled(parentTableId);
    if( isEnabled === false ){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし参照先が無効なテーブルだったら、一覧から取り除く
      continue;
    }
    // もし参照先が無効なテーブルだったら、一覧に残す
    columns2.push(columnData);
    continue;
  }
  //
  // 下層から得たカラムの一覧に、「parentTableId」を付け加えて上層に提供する
  for (let i = 0; i < columns2.length; i++ ) {
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = columns2[i].id;
    columns2[i].parentTableId = cacheData1[ columnId ] ?? null;
    if(cacheData1[columnId]){
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      columns2[i].dataType = "POINTER";
    }
  }
  return {
    "columns": columns2,
    "total": total,
  }
}


// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}


// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  //
  // 参照先を失った外部キーを無効化する
  const childrenColumns = await runSqlReadOnly(
    `SELECT
        child_column_id AS childColumnId
      FROM relations
      WHERE parent_table_id = :parentTableId;`,
    {
      ":parentTableId": tableId,
    },
  );
  for( const { childColumnId } of childrenColumns ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    await disableColumn( childColumnId );
  }
  //
  // 参照先を失った外部キーは、「relations」のデータを消すことで
  // ただの整数型に変化する
  await runSqlWriteOnly(
    `DELETE FROM relations
        WHERE child_table_id = :childTableId;`,
    {
      ":childTableId": tableId,
    },
  );
  await runSqlWriteOnly(
    `DELETE FROM relations
        WHERE parent_table_id = :parentTableId;`,
    {
      ":parentTableId": tableId,
    },
  );
  await _reload();    // メモリに再読み込み
  return await deleteTable( tableId );  // 下層の関数を実行する
}


// カラムの一覧を取得
export async function listColumnsAll_core( tableId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
  // 下層の関数を実行する
  const columns = structuredClone( await listColumnsAll( tableId ) );
  //
  // 参照先が有効なカラムだけに絞り込む
  const columns2 = [];
  for (const columnData of columns ) {
    if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    const parentTableId = cacheData1[columnData.id];
    if(!parentTableId){ 
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし外部キーではなかったら、一覧に残す
      columns2.push(columnData);
      continue;
    }
    const isEnabled = await checkTableEnabled(parentTableId);
    if( isEnabled === false ){
      if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし参照先が無効なテーブルだったら、一覧から取り除く
      continue;
    }
    // もし参照先が無効なテーブルだったら、一覧に残す
    columns2.push(columnData);
    continue;
  }
  //
  // 下層から得たカラムの一覧に、「parentTableId」を付け加えて上層に提供する
  for (let i = 0; i < columns2.length; i++ ) {
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = columns2[i].id;
    columns2[i].parentTableId = cacheData1[ columnId ] ?? null;
    if(cacheData1[columnId]){
      if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
      columns2[i].dataType = "POINTER";
    }
  }
  return columns2;
}

// 参照先のテーブルIDを取得する
export async function getParentTableId_core( columnId ){
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData1[columnId];
}



// データ型を取得
export async function getDataType_core( columnId ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
  if(cacheData1[columnId]){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    return "POINTER";
  }
  else{
    if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    return await getDataType( columnId );
  }
}


// フィールドを検証
export async function checkField_core( columnId, value ){
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
  const {isOK,message} =  await _checkField( columnId, value );
  if(isOK===false){
    if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
      isOK: false,
      message: message,
    };
  }
  return await checkField( columnId, value ); // 下層の関数を呼び出す
}


// フィールドを検証
async function _checkField( columnId, value ){
  const parentTableId = cacheData1[columnId];
  if( !parentTableId ){
    return {
      isOK: true,
      message: "外部キーではありません",
    };
  }
  // 外部キーの場合
  if( value===0 ){
    // 空欄の場合
    return {
      isOK: true,
      message: "データ型に適合しています。",
    };
  }
  if( typeof value !== "number" || isNaN(value) ){
    return {
      isOK: false,
      message: "数値ではありません。",
    };
  }
  const parentColumnId = await getPrimaryKey(parentTableId);
  const matrix = await runSqlReadOnly(
    `SELECT *
    FROM ${parentTableId}
    WHERE ${parentColumnId} = :recordId
    LIMIT 1;`,
    {
      ":recordId": value,
    },
  );
  if(matrix.length===0){
    const parentTableName = await getTableName( parentTableId );
    return {
      isOK: false,
      message: `参照先のデータが見つかりません。\nテーブル : ${parentTableName}(${parentTableId})\n主キー : ${parentColumnId}\nレコードID : ${value}`,
    };
  }
  return {
    isOK: true,
    message: "データ型に適合しています。",
  };
}


// レコードを検証
async function _checkRecord( tableId, recordData ){
  for( const columnId in recordData){
    const {isOK,message} = await _checkField( columnId, recordData[columnId] );
    if(isOK===false){
      return {
        isOK: false,
        message: message,
      };
    }
  }
  return await checkRecord( tableId, recordData );  // 下層の関数を呼び出す
}


// レコードを検証
export async function checkRecord_core( tableId, recordData ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
  return await _checkRecord( tableId, recordData );
}

// レコードを作成
export async function createRecord_core( tableId, recordData ){
  if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
  // レコードのデータ型を検証する
  const {isOK,message} = await _checkRecord( tableId, recordData );
  if( isOK===false ){
      throw message;
  }
  return await createRecord( tableId, recordData ); // 下層の関数を呼び出す
}

// レコードを上書き
export async function updateRecords_core( tableId, records ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
  for( const recordData of records ){
    if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
    // レコードのデータ型を検証する
    const {isOK,message} = await _checkRecord( tableId, recordData );
    if( isOK===false ){
        throw message;
    }
  }
  return await updateRecords( tableId, records ); // 下層の関数を呼び出す
}