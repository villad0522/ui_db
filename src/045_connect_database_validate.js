import {
  startUp_core,  // プログラム起動
  getDebugMode_core,  // デバッグモード判定
  startTransaction_core,  // トランザクション処理開始
  endTransaction_core,  // トランザクション処理終了
  runSqlReadOnly_core,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly_core,  // SQLクエリ実行（書き込み専用）
  createRecordsFromCsv_core,  // CSVファイルインポート
  getCsvProgress_core,  // インポートの進捗状況を取得する関数
  close_core,  // バックエンドプログラム終了
} from "./046_connect_database.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : connect_database\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : connect_database\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : connect_database\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : connect_database\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : startUp`);
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
// 関数「getDebugMode_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getDebugMode(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getDebugMode_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : getDebugMode`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "boolean" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : connect_database\n関数 : getDebugMode`);
    }
    else{
      throw new Error(`resultがブール値ではありません。\nレイヤー : connect_database\n関数 : getDebugMode`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultがブール値ではありません。\nレイヤー : connect_database\n関数 : getDebugMode`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「startTransaction_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startTransaction(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await startTransaction_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : startTransaction`);
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
// 関数「endTransaction_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function endTransaction(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await endTransaction_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : endTransaction`);
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
// 関数「runSqlReadOnly_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function runSqlReadOnly( sql, params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof sql !== "string" ){
    if( !sql ){
      throw new Error(`sqlがNULLです。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await runSqlReadOnly_core( sql, params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
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
      throw new Error(`resultがNULLです。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( !Array.isArray(result[i]) ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
      }
      else{
        throw new Error(`result[${i}]が配列ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
      }
    }
    for( let j=0; i<result[i].length; i++ ){
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
      throw new Error(`sqlがNULLです。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
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
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
  }
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
  }
  if( typeof columnSize !== "number" ){
    if( !columnSize ){
      throw new Error(`columnSizeがNULLです。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`columnSizeが数値ではありません。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
  }
  else if( isNaN(columnSize) ){
    throw new Error(`columnSizeが数値ではありません。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
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
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
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
      throw new Error(`resultがNULLです。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getCsvProgress_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getCsvProgress(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getCsvProgress_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "number" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`resultが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「close_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function close(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await close_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : close`);
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


