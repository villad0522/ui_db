// カラムパス
//
import {
  startUp,
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  _getParentValue,
  _getParentOffset,
} from "./082_record_title_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./079_csv_validate.js";
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
  getColumnIdFromName,
} from "./103_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
import {
  listDataTypes,
} from "./112_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./094_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./100_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./106_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./109_sort_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
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
  updateRecordsFromView,
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
