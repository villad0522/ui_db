// SQL用のデータ構築
//
import {
  startUp,
} from "./048_sort_validate.js";
import {
  getLocalIp,
} from "./081_ip_address_validate.js";
import {
  getPath,
} from "./078_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./075_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./063_column_name_validate.js";
import {
  getPrimaryKey,
} from "./072_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./054_relation_validate.js";
import {
  listDataTypes,
} from "./069_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./051_search_text_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./060_reserved_word_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./057_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./066_table_name_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./045_columnPath_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



// joinIdを決定
export async function getJoinIdMap_core( displayColumns ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  // 【変換前】
  // main.c12
  // main.c45 > c88 > c66
  // main.c2 > c53 > c1
  // main.c2 > c53 > c67
  // c89 > main
  //
  const foreignKeys = new Set();
  for( const { displayColumnId, type, path, as } of displayColumns ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const pathLength = await getPathLength( path );
    if( type==="RAW" ){
      if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
      if(pathLength>=2){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        for( let i = 1; i < pathLength; i++ ){
          if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
          const path2 = await slicePath( path, i );
          foreignKeys.add(path2);
        }
      }
    }
    else{
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      for( let i = 2; i <= pathLength; i++ ){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
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
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  const tables = new Set();
  tables.add(tableId);
  for( const path in joinIdMap ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = await pathToColumnId( path );
    const parentTableId = await getParentTableId( columnId );
    if( !parentTableId ){
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      // 通常のカラムの場合
      continue;
    }
    // 外部キーの場合
    if( tables.has(parentTableId) ){
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
  const selectData = [];
  for( const { displayColumnId, type, path, as } of displayColumns ){
    if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    const pathLength = await getPathLength( path );
    let joinId;
    if( type==="RAW" ){
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
      if( pathLength >= 2 ){
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        const path2 = await slicePath( path, pathLength-1 );
        joinId = joinIdMap[path2];
        if(!joinId) throw `表別名(joinId)が未定義です。path2 = ${path2}`;
      if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
      }
      else{
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
        joinId = "main";
      }
    }
    else{
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      const path2 = await slicePath( path, pathLength );
      joinId = joinIdMap[path2];
      if(!joinId) throw `表別名(joinId)が未定義です。path2 = ${path2}`;
    if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
    }
    const columnId = await pathToColumnId( path );
    selectData.push({
      displayColumnId: displayColumnId,
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
  if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
  const joinData = [];
  for( const path in joinIdMap ){
    if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    const pathLength = await getPathLength( path );
    let fromJoinId;
    if( path.startsWith("main") ){
      if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
      if( pathLength >= 2 ){
        if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
        const path2 = await slicePath( path, pathLength-1 );
        fromJoinId = joinIdMap[path2];
        if(!fromJoinId) throw `表別名(fromJoinId)が未定義です。path2 = ${path2}`;
      if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
      }
      else{
        if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
        fromJoinId = "main";
      }
    }
    else{
      if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
      if( pathLength >= 3 ){
        if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
        const path2 = await slicePath( path, pathLength-1 );
        fromJoinId = joinIdMap[path2];
        if(!fromJoinId) throw `表別名(fromJoinId)が未定義です。path2 = ${path2}`;
      if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
      }
      else{
        if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
        fromJoinId = "main";
      }
    }
    const toJoinId = joinIdMap[path];
    if(!toJoinId) throw `表別名(toJoinId)が未定義です。path = ${path}`;
    if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    let fromColumnName;
    let toTableId;
    let toColumnName;
    if( path.startsWith("main") ){
      if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
      const fromColumnId = await pathToColumnId( path );
      fromColumnName = await getColumnName(fromColumnId);
      toTableId = await getParentTableId(fromColumnId);
      toColumnName = await getPrimaryKey( toTableId );
    }
    else{
      if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
      const toColumnId = await pathToColumnId( path );
      const fromTableId = await getParentTableId(toColumnId);
      fromColumnName = await getPrimaryKey( fromTableId );
      toTableId = await getTableId(toColumnId);
      toColumnName = await getColumnName(toColumnId);
    }
    joinData.push({
      fromJoinId: fromJoinId,
      fromColumnName: fromColumnName,
      toJoinId: toJoinId,
      toTableName: await getTableName( toTableId ),
      toColumnName: toColumnName,
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
  //      toColumnId: "参照先のカラム名（プライマリキー）",
  //    }
  //  ]
}





// WHERE句のデータ構築
export async function getWhereData_core( displayColumns, conditions, joinIdMap ){
  if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
  const pathMap = {
    // 代入例
    //  "d34": "c45 > c56 > main",
    //  "d99": "c45 > c56 > main",
  };
  for( const { displayColumnId, type, path, as } of displayColumns ){
    if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
    pathMap[displayColumnId] = path;
  }
  //-------------------------------------------------------
  const whereData = [];
  for( const { displayColumnId, type, value } of conditions ){
    if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
    const path = pathMap[displayColumnId];
    const pathLength = await getPathLength( path );
    let joinId;
    if( pathLength >= 2 ){
      if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
      const path2 = await slicePath( path, pathLength-1 );
      joinId = joinIdMap[path2];
      if(!joinId) throw "表別名(joinId)が未定義です";
    }
    else{
      if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
  const pathMap = {
    // 代入例
    //  "d34": "c45 > c56 > main",
    //  "d99": "c45 > c56 > main",
  };
  for( const { displayColumnId, type, path, as } of displayColumns ){
    if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
    pathMap[displayColumnId] = path;
  }
  //-------------------------------------------------------
  const orderData = [];
  for( const { displayColumnId, isAscending } of sortOrder ){
    if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
    const path = pathMap[displayColumnId];
    const pathLength = await getPathLength( path );
    let joinId;
    if( pathLength >= 2 ){
      if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
      const path2 = await slicePath( path, pathLength-1 );
      joinId = joinIdMap[path2];
      if(!joinId) throw "表別名(joinId)が未定義です";
    }
    else{
      if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
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
