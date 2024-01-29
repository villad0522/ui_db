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
  destroyCSV_core,  // インポートを中断する関数
} from "./104_connect_database.js";


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
  if( params===null || params===undefined ){
    throw new Error(`paramsがNULLです。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
  }
  else if( typeof params !== "object" ){
    throw new Error(`paramsがオブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
  }
  else if( params.constructor !== Object ){
    throw new Error(`paramsが辞書型ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
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
    if( result[i]===null || result[i]===undefined ){
      throw new Error(`result[${i}]がNULLです。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
    else if( typeof result[i] !== "object" ){
      throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
    else if( result[i].constructor !== Object ){
      throw new Error(`result[${i}]が辞書型ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
    }
    for( const j in result[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result[${i}]のキーが文字列ではありません。\nレイヤー : connect_database\n関数 : runSqlReadOnly`);
      }
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
  if( params===null || params===undefined ){
    throw new Error(`paramsがNULLです。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
  }
  else if( typeof params !== "object" ){
    throw new Error(`paramsがオブジェクトではありません。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
  }
  else if( params.constructor !== Object ){
    throw new Error(`paramsが辞書型ではありません。\nレイヤー : connect_database\n関数 : runSqlWriteOnly`);
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
export async function createRecordsFromCsv( filePath ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : connect_database\n関数 : createRecordsFromCsv`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecordsFromCsv_core( filePath );
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
  if( typeof result !== "object" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
  }
  if( typeof result.progressMessage !== "string" ){
    if( !result.progressMessage ){
      throw new Error(`result.progressMessageがNULLです。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.progressMessageが文字列ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
  }
  if( typeof result.successCount !== "number" ){
    if( !result.successCount ){
      throw new Error(`result.successCountがNULLです。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.successCountが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result.successCount) ){
    throw new Error(`result.successCountが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
  }
  if( typeof result.errorCount !== "number" ){
    if( !result.errorCount ){
      throw new Error(`result.errorCountがNULLです。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.errorCountが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result.errorCount) ){
    throw new Error(`result.errorCountが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
  }
  if( typeof result.csvSize !== "number" ){
    if( !result.csvSize ){
      throw new Error(`result.csvSizeがNULLです。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.csvSizeが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result.csvSize) ){
    throw new Error(`result.csvSizeが数値ではありません。\nレイヤー : connect_database\n関数 : getCsvProgress`);
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


//#######################################################################################
// 関数「destroyCSV_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function destroyCSV(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await destroyCSV_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : connect_database\n関数 : destroyCSV`);
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
      throw new Error(`resultがNULLです。\nレイヤー : connect_database\n関数 : destroyCSV`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : connect_database\n関数 : destroyCSV`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


