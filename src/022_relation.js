// リレーション
//
import {
  startUp,
  clearCache,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./024_record_title_validate.js";
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
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
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
} from "./042_primary_key_validate.js";
import {
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./027_reserved_word_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
  getDataType,
  deleteRecord,
} from "./039_data_type_validate.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./033_table_name_validate.js";


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
  const columns2 = Array(columns).filter( async ({ id, name, dataType }) => {
    const parentTableId = cacheData1[id];
    if(!parentTableId){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし外部キーではなかったら、一覧に残す
      return true;
    }
    const isEnabled = await checkTableEnabled(parentTableId);
    if( isEnabled === false ){
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし参照先が無効なテーブルだったら、一覧から取り除く
      return false;
    }
      // もし参照先が無効なテーブルだったら、一覧に残す
    return true;
  });
  //
  // 下層から得たカラムの一覧に、「parentTableId」を付け加えて上層に提供する
  for (const { id, name, dataType } of columns2) {
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    columns2.parentTableId = cacheData1( id ) ?? null;
    if(cacheData1[id]){
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      columns2.dataType = "POINTER";
    }
  }
  return {
    "columns": columns2,
    "total": total,
  }
}


// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}


// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  // 下層の関数を実行する
  const columns = await listColumnsAll( tableId );
  //
  // 参照先が有効なカラムだけに絞り込む
  const columns2 = Array(columns).filter( async ({ id, name, dataType }) => {
    const parentTableId = cacheData1[id];
    if(!parentTableId){ 
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし外部キーではなかったら、一覧に残す
      return true;
    }
    const isEnabled = await checkTableEnabled(parentTableId);
    if( isEnabled === false ){
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      // もし参照先が無効なテーブルだったら、一覧から取り除く
      return false;
    }
      // もし参照先が無効なテーブルだったら、一覧に残す
    return true; 
  });
  //
  // 下層から得たカラムの一覧に、「parentTableId」を付け加えて上層に提供する
  for (const { id, name, dataType } of columns2) {
    if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    columns2.parentTableId = cacheData1( id ) ?? null;
    if(cacheData1[id]){
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      columns2.dataType = "POINTER";
    }
  }
  return columns2;
}

// 参照先のテーブルIDを取得する
export async function getParentTableId_core( columnId ){
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData1[columnId];
}



// データ型を取得
export async function getDataType_core( columnId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
  if(cacheData1[columnId]){
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    return "POINTER";
  }
  else{
    if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
    return await getDataType( columnId );
  }
}
