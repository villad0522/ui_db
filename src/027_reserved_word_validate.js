import {
  createColumn_core,  // カラムを作成
  updateColumnName_core,  // カラム名を変更
  createTable_core,  // テーブルを作成
  updateTableName_core,  // テーブル名を変更
  reserveWord_core,  // 予約語を追加
} from "./028_reserved_word.js";


//#######################################################################################
// 関数「createColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createColumn( tableId, columnName, dataType ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createColumn_core( tableId, columnName, dataType );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "object" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : reserved_word\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateColumnName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateColumnName( columns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(columns) ){
    if( !columns ){
      throw new Error(`columnsがNULLです。\nレイヤー : reserved_word\n関数 : updateColumnName`);
    }
    else{
      throw new Error(`columnsが配列ではありません。\nレイヤー : reserved_word\n関数 : updateColumnName`);
    }
  }
  for( let i=0; i<columns.length; i++ ){
    if( typeof columns[i] !== "object" ){
      if( !columns[i] ){
        throw new Error(`columns[${i}]がNULLです。\nレイヤー : reserved_word\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}]がオブジェクトではありません。\nレイヤー : reserved_word\n関数 : updateColumnName`);
      }
    }
    if( typeof columns[i].id !== "string" ){
      if( !columns[i].id ){
        throw new Error(`columns[${i}].idがNULLです。\nレイヤー : reserved_word\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}].idが文字列ではありません。\nレイヤー : reserved_word\n関数 : updateColumnName`);
      }
    }
    if( typeof columns[i].name !== "string" ){
      if( !columns[i].name ){
        throw new Error(`columns[${i}].nameがNULLです。\nレイヤー : reserved_word\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}].nameが文字列ではありません。\nレイヤー : reserved_word\n関数 : updateColumnName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateColumnName_core( columns );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : reserved_word\n関数 : updateColumnName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "string" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : reserved_word\n関数 : updateColumnName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : reserved_word\n関数 : updateColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createTable( tableName, isSystemTable ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : reserved_word\n関数 : createTable`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : reserved_word\n関数 : createTable`);
    }
  }
  if( typeof isSystemTable !== "boolean" ){
    if( !isSystemTable ){
      throw new Error(`isSystemTableがNULLです。\nレイヤー : reserved_word\n関数 : createTable`);
    }
    else{
      throw new Error(`isSystemTableがブール値ではありません。\nレイヤー : reserved_word\n関数 : createTable`);
    }
  }
  else if( isNaN(isSystemTable) ){
    throw new Error(`isSystemTableがブール値ではありません。\nレイヤー : reserved_word\n関数 : createTable`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createTable_core( tableName, isSystemTable );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : reserved_word\n関数 : createTable`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "object" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : reserved_word\n関数 : createTable`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : reserved_word\n関数 : createTable`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : reserved_word\n関数 : createTable`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : reserved_word\n関数 : createTable`);
    }
  }
  if( typeof result.tableId !== "string" ){
    if( !result.tableId ){
      throw new Error(`result.tableIdがNULLです。\nレイヤー : reserved_word\n関数 : createTable`);
    }
    else{
      throw new Error(`result.tableIdが文字列ではありません。\nレイヤー : reserved_word\n関数 : createTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateTableName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateTableName( tables ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(tables) ){
    if( !tables ){
      throw new Error(`tablesがNULLです。\nレイヤー : reserved_word\n関数 : updateTableName`);
    }
    else{
      throw new Error(`tablesが配列ではありません。\nレイヤー : reserved_word\n関数 : updateTableName`);
    }
  }
  for( let i=0; i<tables.length; i++ ){
    if( typeof tables[i] !== "object" ){
      if( !tables[i] ){
        throw new Error(`tables[${i}]がNULLです。\nレイヤー : reserved_word\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}]がオブジェクトではありません。\nレイヤー : reserved_word\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].id !== "string" ){
      if( !tables[i].id ){
        throw new Error(`tables[${i}].idがNULLです。\nレイヤー : reserved_word\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].idが文字列ではありません。\nレイヤー : reserved_word\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].name !== "string" ){
      if( !tables[i].name ){
        throw new Error(`tables[${i}].nameがNULLです。\nレイヤー : reserved_word\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].nameが文字列ではありません。\nレイヤー : reserved_word\n関数 : updateTableName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateTableName_core( tables );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : reserved_word\n関数 : updateTableName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "string" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : reserved_word\n関数 : updateTableName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : reserved_word\n関数 : updateTableName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「reserveWord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function reserveWord( word ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof word !== "string" ){
    if( !word ){
      throw new Error(`wordがNULLです。\nレイヤー : reserved_word\n関数 : reserveWord`);
    }
    else{
      throw new Error(`wordが文字列ではありません。\nレイヤー : reserved_word\n関数 : reserveWord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await reserveWord_core( word );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : reserved_word\n関数 : reserveWord`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  //
  //--------------------------------------------------------------------------
  return result;
}


