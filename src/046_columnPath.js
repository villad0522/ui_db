// カラムパス
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
    throw `カラムパスの長さが足りません\npathText = ${pathText}`;
  }
  if( pathArray[0].startsWith("main.") ){
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    // 先頭がメインテーブルの場合
    pathArray[0] = pathArray[0].replace( "main.", "" );
  }
  else if( pathArray.pop() === "main" ){
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾がメインテーブルの場合
  }
  else{
    throw `カラムパスの文法が不正です。先頭か末尾に「main」を書く必要があります。\npathText = ${pathText}`;
  }
  if(pathArray.length===0){
    throw `カラムパスの長さが足りません\npathText = ${pathText}`;
  }
  // この時点で、pathArrayの中身は全てカラムIDの形式（例：c55）になっているはず。
  for( let columnId of pathArray ){
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    if( !columnId.startsWith("c") ){
      throw `カラムパスの文法が不正です。カラムIDの先頭に「c」が見つかりません。\npathText = ${pathText}`;
    }
    columnId = columnId.replace("c","");
    if(isNaN(columnId)){
      throw `カラムパスの文法が不正です。カラムIDを数値に変換できません。\npathText = ${pathText}`;
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
