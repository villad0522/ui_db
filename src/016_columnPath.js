// カラムパス
//
import {
  startUp,
} from "./018_sort_validate.js";
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
  getTableId,
  checkColumnEnabled,
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
} from "./042_layerName_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./021_relation_validate.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./039_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./027_reserved_word_validate.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./033_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./024_record_title_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


// パスの例
// main.c12
// main.c45 > c88 > c66
// main.c2 > c53 > c1
// main.c2 > c53 > c67
// c89 > main


// カラムパスの長さを取得する
export async function getPathLength_core( pathText ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  // （例）  main.c2 > c53 > c1   長さ3
  // （例）  c2 > c53 > c1 > main   長さ4
  const pathArray = String(pathText).split(">");
  return pathArray.length;
}


// パスを途中まで切り取る関数
export async function slicePath_core( pathText, length ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  let pathArray = String(pathText).split(">");
  pathArray = pathArray.map( text => text.trim() );
  if( pathArray[0].startsWith("main.") ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 先頭がメインテーブルの場合、先頭から途中まで切り取る。
    return pathArray.slice(0, length).join(" > ");
  }
  else if( pathArray[pathArray.length-1] === "main" ){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾がメインテーブルの場合、途中から末尾まで切り取る。
    const startIndex = pathArray.length - length;
    return pathArray.slice(startIndex).join(" > ");
  }
  else{
    throw "カラムパスの文法が不正です。先頭か末尾に「main」を書く必要があります。";
  }
}


// パスの文法をチェックする関数
export async function checkPath_core( pathText ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  let pathArray = String(pathText).split(">");
  pathArray = pathArray.map( text => text.trim() );
  if(pathArray.length===0){
    throw "カラムパスの長さが足りません";
  }
  if( pathArray[0].startsWith("main.") ){
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    // 先頭がメインテーブルの場合
    pathArray = pathArray[0].replace( "main.", "" );
  }
  else if( pathArray.pop() === "main" ){
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾がメインテーブルの場合
    if(pathArray.length===0){
      throw "カラムパスの長さが足りません";
    }
  }
  else{
    throw "カラムパスの文法が不正です。先頭か末尾に「main」を書く必要があります。";
  }
  // この時点で、pathArrayの中身は全てカラムIDの形式（例：c55）になっているはず。
  for( let columnId of pathArray ){
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    if( !columnId.startsWith("c") ){
      throw "カラムパスの文法が不正です。カラムIDの先頭に「c」が見つかりません。";
    }
    columnId = columnId.replace("c","");
    if(isNaN(columnId)){
      throw "カラムパスの文法が不正です。カラムIDを数値に変換できません。";
    }
  }
}

// パスをカラムIDに変換
export async function pathToColumnId_core( pathText ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  let pathArray = String(pathText).split(">");
  pathArray = pathArray.map( text => text.trim() );
  if( pathArray[0].startsWith("main.") ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // 先頭がメインテーブルの場合
    return pathArray.pop().replace( "main.", "" );
  }
  else if( pathArray[pathArray.length-1] === "main" ){
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾がメインテーブルの場合
    return pathArray[0];
  }
  else{
    throw "カラムパスの文法が不正です。先頭か末尾に「main」を書く必要があります。";
  }
}
