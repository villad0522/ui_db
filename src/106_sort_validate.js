import {
  startUp_core,  // プログラム起動
  cutRecord_core,  // レコードを切り取る
  copyRecord_core,  // レコードをコピーする
  pasteRecord_core,  // レコードを貼り付ける
  getCuttingRecord_core,  // 切り取り中のレコードを取得する
  getCopyingRecord_core,  // コピー中のレコードを取得する
  _moveRecord_core,  // 【サブ関数】レコードを移動する
  _copyRecord_core,  // 【サブ関数】レコードをコピーする
  _generateRecordSortNumber_core,  // 【サブ関数】ソート番号を発行する
} from "./107_sort.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : sort\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : sort\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : sort\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : sort\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : sort\n関数 : startUp`);
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
// 関数「cutRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function cutRecord( tableId, recordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : cutRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : cutRecord`);
    }
  }
  if( typeof recordId !== "number" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : sort\n関数 : cutRecord`);
    }
    else{
      throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : cutRecord`);
    }
  }
  else if( isNaN(recordId) ){
    throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : cutRecord`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await cutRecord_core( tableId, recordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : cutRecord`);
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
// 関数「copyRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function copyRecord( tableId, recordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : copyRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : copyRecord`);
    }
  }
  if( typeof recordId !== "number" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : sort\n関数 : copyRecord`);
    }
    else{
      throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : copyRecord`);
    }
  }
  else if( isNaN(recordId) ){
    throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : copyRecord`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await copyRecord_core( tableId, recordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : copyRecord`);
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
// 関数「pasteRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function pasteRecord( tableId, beforeRecordId, afterRecordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : pasteRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : pasteRecord`);
    }
  }
  if( (beforeRecordId===null) || (beforeRecordId===undefined) ){
    // beforeRecordIdは空欄OK。
  }
  else if( typeof beforeRecordId !== "number" ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : pasteRecord`);
  }
  else if( isNaN(beforeRecordId) ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : pasteRecord`);
  }
  if( (afterRecordId===null) || (afterRecordId===undefined) ){
    // afterRecordIdは空欄OK。
  }
  else if( typeof afterRecordId !== "number" ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : pasteRecord`);
  }
  else if( isNaN(afterRecordId) ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : pasteRecord`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await pasteRecord_core( tableId, beforeRecordId, afterRecordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : pasteRecord`);
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
// 関数「getCuttingRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getCuttingRecord( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : getCuttingRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : getCuttingRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getCuttingRecord_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : getCuttingRecord`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( (result===null) || (result===undefined) ){
    // resultは空欄OK。
  }
  else if( typeof result !== "number" ){
    throw new Error(`resultが数値ではありません。\nレイヤー : sort\n関数 : getCuttingRecord`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : sort\n関数 : getCuttingRecord`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getCopyingRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getCopyingRecord( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : getCopyingRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : getCopyingRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getCopyingRecord_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : getCopyingRecord`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( (result===null) || (result===undefined) ){
    // resultは空欄OK。
  }
  else if( typeof result !== "number" ){
    throw new Error(`resultが数値ではありません。\nレイヤー : sort\n関数 : getCopyingRecord`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : sort\n関数 : getCopyingRecord`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_moveRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _moveRecord( tableId, recordId, beforeRecordId, afterRecordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : _moveRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
    }
  }
  if( typeof recordId !== "number" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : sort\n関数 : _moveRecord`);
    }
    else{
      throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
    }
  }
  else if( isNaN(recordId) ){
    throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
  }
  if( (beforeRecordId===null) || (beforeRecordId===undefined) ){
    // beforeRecordIdは空欄OK。
  }
  else if( typeof beforeRecordId !== "number" ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
  }
  else if( isNaN(beforeRecordId) ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
  }
  if( (afterRecordId===null) || (afterRecordId===undefined) ){
    // afterRecordIdは空欄OK。
  }
  else if( typeof afterRecordId !== "number" ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
  }
  else if( isNaN(afterRecordId) ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _moveRecord`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _moveRecord_core( tableId, recordId, beforeRecordId, afterRecordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : _moveRecord`);
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
// 関数「_copyRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _copyRecord( tableId, recordId, beforeRecordId, afterRecordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : _copyRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
    }
  }
  if( typeof recordId !== "number" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : sort\n関数 : _copyRecord`);
    }
    else{
      throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
    }
  }
  else if( isNaN(recordId) ){
    throw new Error(`recordIdが数値ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
  }
  if( (beforeRecordId===null) || (beforeRecordId===undefined) ){
    // beforeRecordIdは空欄OK。
  }
  else if( typeof beforeRecordId !== "number" ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
  }
  else if( isNaN(beforeRecordId) ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
  }
  if( (afterRecordId===null) || (afterRecordId===undefined) ){
    // afterRecordIdは空欄OK。
  }
  else if( typeof afterRecordId !== "number" ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
  }
  else if( isNaN(afterRecordId) ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _copyRecord`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _copyRecord_core( tableId, recordId, beforeRecordId, afterRecordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : _copyRecord`);
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
// 関数「_generateRecordSortNumber_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _generateRecordSortNumber( tableId, beforeRecordId, afterRecordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
    }
  }
  if( (beforeRecordId===null) || (beforeRecordId===undefined) ){
    // beforeRecordIdは空欄OK。
  }
  else if( typeof beforeRecordId !== "number" ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
  }
  else if( isNaN(beforeRecordId) ){
    throw new Error(`beforeRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
  }
  if( (afterRecordId===null) || (afterRecordId===undefined) ){
    // afterRecordIdは空欄OK。
  }
  else if( typeof afterRecordId !== "number" ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
  }
  else if( isNaN(afterRecordId) ){
    throw new Error(`afterRecordIdが数値ではありません。\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _generateRecordSortNumber_core( tableId, beforeRecordId, afterRecordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : _generateRecordSortNumber`);
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


