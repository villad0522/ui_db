// カラムパス
//
import {
  startUp,
} from "./010_sort_test.js";
import {
  getLocalIp,
} from "./032_ip_address_test.js";
import {
  getPath,
} from "./030_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./028_connect_database_test.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  disableColumn,
  enableColumn,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./018_column_name_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./022_search_text_test.js";
import {
  getPrimaryKey,
} from "./026_layerName_test.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./012_relation_test.js";
import {
  listDataTypes,
  checkField,
  checkRecord,
} from "./024_data_type_test.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./016_reserved_word_test.js";
import {
  disableTable,
  enableTable,
  checkTableEnabled,
  getTableName,
} from "./020_table_name_test.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
} from "./014_record_title_test.js";

// パスの例
// main.c12
// main.c45 > c88 > c66
// main.c2 > c53 > c1
// main.c2 > c53 > c67
// c89 > main


// カラムパスの長さを取得する
export async function getPathLength_core( pathText ){
  // （例）  main.c2 > c53 > c1   長さ3
  // （例）  c2 > c53 > c1 > main   長さ4
  const pathArray = String(pathText).split(">");
  return pathArray.length;
}


// パスを途中まで切り取る関数
export async function slicePath_core( pathText, length ){
  let pathArray = String(pathText).split(">");
  pathArray = pathArray.map( text => text.trim() );
  if( pathArray[0].startsWith("main.") ){
    // 先頭がメインテーブルの場合、先頭から途中まで切り取る。
    return pathArray.slice(0, length).join(" > ");
  }
  else if( pathArray[pathArray.length-1] === "main" ){
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
  let pathArray = String(pathText).split(">");
  pathArray = pathArray.map( text => text.trim() );
  if(pathArray.length===0){
    throw "カラムパスの長さが足りません";
  }
  if( pathArray[0].startsWith("main.") ){
    // 先頭がメインテーブルの場合
    pathArray = pathArray[0].replace( "main.", "" );
  }
  else if( pathArray.pop() === "main" ){
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
  let pathArray = String(pathText).split(">");
  pathArray = pathArray.map( text => text.trim() );
  if( pathArray[0].startsWith("main.") ){
    // 先頭がメインテーブルの場合
    return pathArray.pop().replace( "main.", "" );
  }
  else if( pathArray[pathArray.length-1] === "main" ){
    // 末尾がメインテーブルの場合
    return pathArray[0];
  }
  else{
    throw "カラムパスの文法が不正です。先頭か末尾に「main」を書く必要があります。";
  }
}
