import {
  startUp_core,  // プログラム起動
  createRecordsFromCsv_core,  // CSVファイルインポート
  runSqlWriteOnly_core,  // SQLクエリ実行（書き込み専用）
  createRecord_core,  // レコードを作成
  updateRecord_core,  // レコードを上書き
  delete_table_core,  // 不可逆的にテーブルを削除
} from "./037_search_text.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : search_text\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : search_text\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : search_text\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : search_text\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : startUp`);
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
// 関数「createRecordsFromCsv_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecordsFromCsv( tableId, filePath, columnSize ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
  }
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
  }
  if( typeof columnSize !== "number" ){
    if( !columnSize ){
      throw new Error(`columnSizeがNULLです。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`columnSizeが数値ではありません。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
  }
  else if( isNaN(columnSize) ){
    throw new Error(`columnSizeが数値ではありません。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecordsFromCsv_core( tableId, filePath, columnSize );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : createRecordsFromCsv`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「runSqlWriteOnly_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function runSqlWriteOnly( sql, params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof sql !== "string" ){
    if( !sql ){
      throw new Error(`sqlがNULLです。\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await runSqlWriteOnly_core( sql, params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : runSqlWriteOnly`);
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
// 関数「createRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  if( typeof recordData !== "object" ){
    if( !recordData ){
      throw new Error(`recordDataがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  else if( typeof recordData[Symbol.iterator] !== "function" ){
    throw new Error(`recordDataが反復可能オブジェクトではありません。\nレイヤー : search_text\n関数 : createRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : createRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : updateRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecord`);
    }
  }
  if( typeof recordId !== "string" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : search_text\n関数 : updateRecord`);
    }
    else{
      throw new Error(`recordIdが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecord`);
    }
  }
  if( typeof recordData !== "object" ){
    if( !recordData ){
      throw new Error(`recordDataがNULLです。\nレイヤー : search_text\n関数 : updateRecord`);
    }
    else{
      throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : search_text\n関数 : updateRecord`);
    }
  }
  else if( typeof recordData[Symbol.iterator] !== "function" ){
    throw new Error(`recordDataが反復可能オブジェクトではありません。\nレイヤー : search_text\n関数 : updateRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecord`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : updateRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : updateRecord`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「delete_table_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function delete_table( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : delete_table`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : delete_table`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await delete_table_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : delete_table`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : delete_table`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : delete_table`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


