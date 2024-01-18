import {
  startUp_core,  // プログラム起動
  clearCache_core,  // インメモリキャッシュを削除する
  createColumn_core,  // カラムを作成
  listDataTypes_core,  // データ型の一覧を取得
  createRecord_core,  // レコードを作成
  updateRecord_core,  // レコードを上書き
  checkField_core,  // フィールドを検証
  checkRecord_core,  // レコードを検証
  createTable_core,  // テーブルを作成
  deleteTable_core,  // 不可逆的にテーブルを削除
} from "./025_data_type.js";


//#######################################################################################
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl, isDebug ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : data_type\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : data_type\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : data_type\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : data_type\n関数 : startUp`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await startUp_core( localUrl, isDebug );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : data_type\n関数 : clearCache`);
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
// 関数「createColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createColumn( tableId, columnId, dataType ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : createColumn`);
    }
  }
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : data_type\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : data_type\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : data_type\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : data_type\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createColumn_core( tableId, columnId, dataType );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : data_type\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : data_type\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : data_type\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : data_type\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : data_type\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listDataTypes_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listDataTypes( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : listDataTypes`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : listDataTypes`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listDataTypes_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : listDataTypes`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : listDataTypes`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : data_type\n関数 : listDataTypes`);
    }
  }
  else if( typeof result[Symbol.iterator] !== "function" ){
    throw new Error(`resultが反復可能オブジェクトではありません。\nレイヤー : data_type\n関数 : listDataTypes`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : data_type\n関数 : listDataTypes`);
    }
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result["${i}"]がNULLです。\nレイヤー : data_type\n関数 : listDataTypes`);
      }
      else{
        throw new Error(`result["${i}"]が文字列ではありません。\nレイヤー : data_type\n関数 : listDataTypes`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : createRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : createRecord`);
    }
  }
  if( typeof recordData !== "object" ){
    if( !recordData ){
      throw new Error(`recordDataがNULLです。\nレイヤー : data_type\n関数 : createRecord`);
    }
    else{
      throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : data_type\n関数 : createRecord`);
    }
  }
  else if( typeof recordData[Symbol.iterator] !== "function" ){
    throw new Error(`recordDataが反復可能オブジェクトではありません。\nレイヤー : data_type\n関数 : createRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : data_type\n関数 : createRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecord_core( tableId, recordData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : createRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : createRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : data_type\n関数 : createRecord`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : data_type\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : data_type\n関数 : createRecord`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : data_type\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : data_type\n関数 : createRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateRecord( tableId, recordId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : updateRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : updateRecord`);
    }
  }
  if( typeof recordId !== "string" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : data_type\n関数 : updateRecord`);
    }
    else{
      throw new Error(`recordIdが文字列ではありません。\nレイヤー : data_type\n関数 : updateRecord`);
    }
  }
  if( typeof recordData !== "object" ){
    if( !recordData ){
      throw new Error(`recordDataがNULLです。\nレイヤー : data_type\n関数 : updateRecord`);
    }
    else{
      throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : data_type\n関数 : updateRecord`);
    }
  }
  else if( typeof recordData[Symbol.iterator] !== "function" ){
    throw new Error(`recordDataが反復可能オブジェクトではありません。\nレイヤー : data_type\n関数 : updateRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : data_type\n関数 : updateRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateRecord_core( tableId, recordId, recordData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : updateRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : updateRecord`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_type\n関数 : updateRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「checkField_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkField( tableId, columnId, value ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : checkField`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : checkField`);
    }
  }
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : data_type\n関数 : checkField`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : data_type\n関数 : checkField`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkField_core( tableId, columnId, value );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : checkField`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : checkField`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : data_type\n関数 : checkField`);
    }
  }
  if( typeof result.isOK !== "boolean" ){
    if( !result.isOK ){
      throw new Error(`result.isOKがNULLです。\nレイヤー : data_type\n関数 : checkField`);
    }
    else{
      throw new Error(`result.isOKがブール値ではありません。\nレイヤー : data_type\n関数 : checkField`);
    }
  }
  else if( isNaN(result.isOK) ){
    throw new Error(`result.isOKがブール値ではありません。\nレイヤー : data_type\n関数 : checkField`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : data_type\n関数 : checkField`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : data_type\n関数 : checkField`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「checkRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : checkRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : checkRecord`);
    }
  }
  if( typeof recordData !== "object" ){
    if( !recordData ){
      throw new Error(`recordDataがNULLです。\nレイヤー : data_type\n関数 : checkRecord`);
    }
    else{
      throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : data_type\n関数 : checkRecord`);
    }
  }
  else if( typeof recordData[Symbol.iterator] !== "function" ){
    throw new Error(`recordDataが反復可能オブジェクトではありません。\nレイヤー : data_type\n関数 : checkRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : data_type\n関数 : checkRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkRecord_core( tableId, recordData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : checkRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : checkRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : data_type\n関数 : checkRecord`);
    }
  }
  if( typeof result.isOK !== "boolean" ){
    if( !result.isOK ){
      throw new Error(`result.isOKがNULLです。\nレイヤー : data_type\n関数 : checkRecord`);
    }
    else{
      throw new Error(`result.isOKがブール値ではありません。\nレイヤー : data_type\n関数 : checkRecord`);
    }
  }
  else if( isNaN(result.isOK) ){
    throw new Error(`result.isOKがブール値ではありません。\nレイヤー : data_type\n関数 : checkRecord`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : data_type\n関数 : checkRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : data_type\n関数 : checkRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createTable( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : createTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : createTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createTable_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_type\n関数 : createTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : createTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_type\n関数 : createTable`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : data_type\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : data_type\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : data_type\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_type\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_type\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


