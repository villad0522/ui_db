// リレーション
//
import {
  startUp,
  clearCache,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./010_record_title_test.js";
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
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
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
  createColumn,
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./012_reserved_word_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./020_data_type_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./016_table_name_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
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
  if( dataType !== "POINTER" && !parentTableId ){
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
  // 下層の関数を実行する
  const { columns, total } = await listColumnsForGUI( tableId, pageNumber, onePageMaxSize, isTrash );
  //
  // 参照先が有効なカラムだけに絞り込む
  const columns2 = Array(columns).filter( ({id}) => {
    if( await checkTableEnabled(parentTableId) === false ){
      return false; // もし参照先が無効なテーブルだったら
    }
    return true;
  });
  //
  // 下層から得たカラムの一覧に、「parentTableId」を付け加えて上層に提供する
  for (const { id } of columns2) {
    columns2.parentTableId = cacheData1( id );
  }
  return {
    "columns": columns2,
    "total": total,
  }
}


// インメモリキャッシュを削除する
export async function clearCache_core(  ){
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}


// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
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
  // 下層の関数を実行する
  const columns = await listColumnsAll( tableId );
  //
  // 参照先が有効なカラムだけに絞り込む
  const columns2 = Array(columns).filter( ({id}) => {
    if( await checkTableEnabled(parentTableId) === false ){
      return false; // もし参照先が無効なテーブルだったら
    }
    return true;
  });
  //
  // 下層から得たカラムの一覧に、「parentTableId」を付け加えて上層に提供する
  for (const { id } of columns2) {
    columns2.parentTableId = cacheData1( id );
  }
  return columns2;
}

// 参照先のテーブルIDを取得する
export async function getParentTableId_core( columnId ){
  return cacheData1[columnId];
}
