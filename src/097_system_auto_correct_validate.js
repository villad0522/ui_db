import {
  autoCorrectTableName_core,  // テーブル名を入力させる
  autoCorrectColumnName_core,  // カラム名を入力させる
  clearCache_core,  // インメモリキャッシュを削除する
  createTable_core,  // テーブルを作成
  updateTableName_core,  // テーブル名を変更
  deleteTable_core,  // 不可逆的にテーブルを削除
  createColumn_core,  // カラムを作成
  updateColumnName_core,  // カラム名を変更
} from "./098_system_auto_correct.js";


//#######################################################################################
// 関数「autoCorrectTableName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectTableName( inputText ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectTableName_core( inputText );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( !Array.isArray(result) ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「autoCorrectColumnName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectColumnName( inputText, tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
  }
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectColumnName_core( inputText, tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( !Array.isArray(result) ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「clearCache_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function clearCache(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await clearCache_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : clearCache`);
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


//#######################################################################################
// 関数「createTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createTable( tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createTable_core( tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : createTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
  }
  if( typeof result.tableId !== "string" ){
    if( !result.tableId ){
      throw new Error(`result.tableIdがNULLです。\nレイヤー : system_auto_correct\n関数 : createTable`);
    }
    else{
      throw new Error(`result.tableIdが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createTable`);
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
      throw new Error(`tablesがNULLです。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
    }
    else{
      throw new Error(`tablesが配列ではありません。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
    }
  }
  for( let i=0; i<tables.length; i++ ){
    if( typeof tables[i] !== "object" ){
      if( !tables[i] ){
        throw new Error(`tables[${i}]がNULLです。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}]がオブジェクトではありません。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].id !== "string" ){
      if( !tables[i].id ){
        throw new Error(`tables[${i}].idがNULLです。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].idが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].name !== "string" ){
      if( !tables[i].name ){
        throw new Error(`tables[${i}].nameがNULLです。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].nameが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
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
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : updateTableName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : updateTableName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「deleteTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteTable( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : system_auto_correct\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteTable_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createColumn( tableId, columnName, dataType, parentTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createColumn_core( tableId, columnName, dataType, parentTableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : system_auto_correct\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : createColumn`);
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
      throw new Error(`columnsがNULLです。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
    }
    else{
      throw new Error(`columnsが配列ではありません。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
    }
  }
  for( let i=0; i<columns.length; i++ ){
    if( typeof columns[i] !== "object" ){
      if( !columns[i] ){
        throw new Error(`columns[${i}]がNULLです。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}]がオブジェクトではありません。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
      }
    }
    if( typeof columns[i].id !== "string" ){
      if( !columns[i].id ){
        throw new Error(`columns[${i}].idがNULLです。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}].idが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
      }
    }
    if( typeof columns[i].name !== "string" ){
      if( !columns[i].name ){
        throw new Error(`columns[${i}].nameがNULLです。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}].nameが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
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
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : updateColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


