// SQL用のデータ構築
//
import {
  startUp,
} from "./012_sort_test.js";
import {
  getLocalIp,
} from "./034_ip_address_test.js";
import {
  getPath,
} from "./032_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./030_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./020_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./024_search_text_test.js";
import {
  getPrimaryKey,
} from "./028_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./014_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./026_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./018_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./022_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./016_record_title_test.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./010_columnPath_test.js";


// joinIdを決定
export async function getJoinIdMap_core( displayColumns ){
  // 【変換前】
  // main.c12
  // main.c45 > c88 > c66
  // main.c2 > c53 > c1
  // main.c2 > c53 > c67
  // c89 > main
  //
  const foreignKeys = new Set();
  for( const { displayColumnId, type, path, as } of displayColumns ){
    const pathLength = await getPathLength( path );
    if( type==="RAW" ){
      if(pathLength>=2){
        for( let i = 1; i < pathLength; i++ ){
          const path2 = await slicePath( path, i );
          foreignKeys.add(path2);
        }
      }
    }
    else{
      for( let i = 2; i < pathLength; i++ ){
        const path2 = await slicePath( path, i );
        foreignKeys.add(path2);
      }
    }
  }
  const array = Array.from(foreignKeys);
  // 例
  // array = [
  //   "main.c45",
  //   "main.c45 > c88",
  //   "main.c2",
  //   "main.c2 > c53",
  //   "c89 > main",
  // ];
  const joinMap = {};
  for( let i=0; i<array.length; i++ ){
    joinMap[array[i]] =  "j" + i;
  }
  // 例
  // joinMap = {
  //   "main.c45" : "j0",
  //   "main.c45 > c88" : "j1",
  //   "main.c2" : "j2",
  //   "main.c2 > c53" : "j3",
  //   "c89 > main" : "j4",
  // };
  return joinMap;
}



// テーブルの重複を確認
export async function checkTableDuplication_core( tableId, joinIdMap ){
  const tables = new Set();
  tables.add(tableId);
  for( const path in joinIdMap ){
    const columnId = await pathToColumnId( path );
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




// SELECT句のデータ構築
export async function getSelectData_core( displayColumns, joinIdMap ){
  const selectData = [];
  for( const { type, path, as } of displayColumns ){
    const pathLength = await getPathLength( path );
    let joinId;
    if( pathLength >= 2 ){
      const path2 = await slicePath( path, pathLength-1 );
      joinId = joinIdMap[path2];
      if(!joinId) throw "表別名(joinId)が未定義です";
    }
    else{
      joinId = "main";
    }
    const columnId = await pathToColumnId( path );
    selectData.push({
      type: type,
      joinId: joinId,
      columnName: await getColumnName( columnId ),
      as: as
    });
  }
  return selectData;
  // 戻り値の例
  //  [
  //    {
  //      type: "COUNT",    // RAW, SUM、MAX、MIN、AVG、COUNT のいずれか
  //      joinId: "j2",
  //      columnName: "実際の列の名前",
  //      as: "表示する際の列の名前"
  //    },
  //  ]
}



// JOIN句のデータ構築
export async function getJoinData_core( joinIdMap ){
  const joinData = [];
  for( const path in joinIdMap ){
    const pathLength = await getPathLength( path );
    let fromJoinId;
    if( pathLength >= 2 ){
      const path2 = await slicePath( path, pathLength-1 );
      fromJoinId = joinIdMap[path2];
      if(!fromJoinId) throw "表別名(fromJoinId)が未定義です";
    }
    else{
      fromJoinId = "main";
    }
    const toJoinId = joinIdMap[path];
    if(!toJoinId) throw "表別名(toJoinId)が未定義です";
    const fromColumnId = await pathToColumnId( path );
    const toTableId = await getParentTableId(fromColumnId);
    const toColumnId = await getPrimaryKey( toTableId );
    joinData.push({
      fromJoinId: fromJoinId,
      fromColumnName: await getColumnName(fromColumnId),
      toJoinId: toJoinId,
      toTableName: await getTableName( toTableId ),
      toColumnName:  await getColumnName(toColumnId),
    });
  }
  return joinData;
  // 戻り値の例
  //  [
  //    {
  //      fromJoinId: "j1",
  //      fromColumnName: "参照元のカラム名（外部キー）",
  //      toJoinId: "j2",
  //      toTableName: "参照先のテーブル名（マスターテーブル）",
  //      toColumnName: "参照先のカラム名（プライマリキー）",
  //    }
  //  ]
}





// WHERE句のデータ構築
export async function getWhereData_core( displayColumns, conditions, joinIdMap ){
  const pathMap = {
    // 代入例
    //  "d34": "c45 > c56 > main",
    //  "d99": "c45 > c56 > main",
  };
  for( const { displayColumnId, type, path, as } of displayColumns ){
    pathMap[displayColumnId] = path;
  }
  //-------------------------------------------------------
  const whereData = [];
  for( const { displayColumnId, type, value } of conditions ){
    const path = pathMap[displayColumnId];
    const pathLength = await getPathLength( path );
    let joinId;
    if( pathLength >= 2 ){
      const path2 = await slicePath( path, pathLength-1 );
      joinId = joinIdMap[path2];
      if(!joinId) throw "表別名(joinId)が未定義です";
    }
    else{
      joinId = "main";
    }
    whereData.push({
      displayColumnId: displayColumnId,
      joinId: joinId,
      columnName: await pathToColumnId( path ),
      type: type,
      value: value,
    });
  }
  return whereData;
  // 戻り値の例
  //  [
  //    {
  //      displayColumnId: "d3",
  //      joinId: "j2",
  //      columnName: "カラム名",
  //      type: "=",
  //      value: 32,
  //    }
  //  ]
}




// ORDER句のデータ構築
export async function getOrderData_core( displayColumns, sortOrder, joinIdMap ){
  const pathMap = {
    // 代入例
    //  "d34": "c45 > c56 > main",
    //  "d99": "c45 > c56 > main",
  };
  for( const { displayColumnId, type, path, as } of displayColumns ){
    pathMap[displayColumnId] = path;
  }
  //-------------------------------------------------------
  const orderData = [];
  for( const { displayColumnId, isAscending } of sortOrder ){
    const path = pathMap[displayColumnId];
    const pathLength = await getPathLength( path );
    let joinId;
    if( pathLength >= 2 ){
      const path2 = await slicePath( path, pathLength-1 );
      joinId = joinIdMap[path2];
      if(!joinId) throw "表別名(joinId)が未定義です";
    }
    else{
      joinId = "main";
    }
    orderData.push({
      joinId: joinId,
      columnName: await pathToColumnId( path ),
      isAscending: isAscending,
    });
  }
  return orderData;
  // 戻り値の例
  //  [
  //    {
  //      joinId: "j2",
  //      columnName: "カラム名",
  //      isAscending: true,
  //    }
  //  ]
}
