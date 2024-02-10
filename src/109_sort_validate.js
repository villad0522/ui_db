import {
  cutRecord_core,  // レコードを切り取る
  copyRecord_core,  // レコードをコピーする
  pasteRecord_core,  // レコードを貼り付ける
  getCuttingRecord_core,  // 切り取り中のレコードを取得する
  getCopyingRecord_core,  // コピー中のレコードを取得する
  _moveRecord_core,  // 【サブ関数】レコードを移動する
  _copyRecord_core,  // 【サブ関数】レコードをコピーする
  _generateRecordSortNumber_core,  // 【サブ関数】ソート番号を発行する
  deleteRecords_core,  // レコードを一括削除
} from "./110_sort.js";


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


//#######################################################################################
// 関数「deleteRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteRecords( tableId, recordIdList ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : sort\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : sort\n関数 : deleteRecords`);
    }
  }
  if( !Array.isArray(recordIdList) ){
    if( !recordIdList ){
      throw new Error(`recordIdListがNULLです。\nレイヤー : sort\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`recordIdListが配列ではありません。\nレイヤー : sort\n関数 : deleteRecords`);
    }
  }
  for( let i=0; i<recordIdList.length; i++ ){
    if( typeof recordIdList[i] !== "number" ){
      if( !recordIdList[i] ){
        throw new Error(`recordIdList[${i}]がNULLです。\nレイヤー : sort\n関数 : deleteRecords`);
      }
      else{
        throw new Error(`recordIdList[${i}]が数値ではありません。\nレイヤー : sort\n関数 : deleteRecords`);
      }
    }
    else if( isNaN(recordIdList[i]) ){
      throw new Error(`recordIdList[${i}]が数値ではありません。\nレイヤー : sort\n関数 : deleteRecords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteRecords_core( tableId, recordIdList );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : sort\n関数 : deleteRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : sort\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : sort\n関数 : deleteRecords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


