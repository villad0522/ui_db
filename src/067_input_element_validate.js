import {
  startUp_core,  // プログラム起動
  _autoFill_core,  // 【サブ関数】自動入力
  _getConditions_core,  // 【サブ関数】絞り込み条件を生成する
  _listPredictions_core,  // 【サブ関数】予測変換を取得する
  _listRecords_core,  // 【サブ関数】レコードを取得
  clearCache_core,  // インメモリキャッシュを削除する
} from "./068_input_element.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : input_element\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : input_element\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : input_element\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : input_element\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : input_element\n関数 : startUp`);
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
// 関数「_autoFill_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _autoFill( params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  if( !Array.isArray(params.viewColumnIdList) ){
    if( !params.viewColumnIdList ){
      throw new Error(`params.viewColumnIdListがNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
    }
    else{
      throw new Error(`params.viewColumnIdListが配列ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  for( let i=0; i<params.viewColumnIdList.length; i++ ){
    if( typeof params.viewColumnIdList[i] !== "number" ){
      if( !params.viewColumnIdList[i] ){
        throw new Error(`params.viewColumnIdList[${i}]がNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
      }
      else{
        throw new Error(`params.viewColumnIdList[${i}]が数値ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
      }
    }
    else if( isNaN(params.viewColumnIdList[i]) ){
      throw new Error(`params.viewColumnIdList[${i}]が数値ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  if( typeof params.isClick !== "boolean" ){
    if( !params.isClick ){
      throw new Error(`params.isClickがNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
    }
    else{
      throw new Error(`params.isClickがブール値ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  else if( isNaN(params.isClick) ){
    throw new Error(`params.isClickがブール値ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  if( params.inputTexts===null || params.inputTexts===undefined ){
    throw new Error(`params.inputTextsがNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  else if( typeof params.inputTexts !== "object" ){
    throw new Error(`params.inputTextsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  else if( params.inputTexts.constructor !== Object ){
    throw new Error(`params.inputTextsが辞書型ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  for( const i in params.inputTexts ){
    if( typeof i !== "string" ){
      throw new Error(`params.inputTextsのキーが文字列ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _autoFill_core( params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : input_element\n関数 : _autoFill`);
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
      throw new Error(`resultがNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  if( result.inputTextsAndAutocorrection===null || result.inputTextsAndAutocorrection===undefined ){
    throw new Error(`result.inputTextsAndAutocorrectionがNULLです。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  else if( typeof result.inputTextsAndAutocorrection !== "object" ){
    throw new Error(`result.inputTextsAndAutocorrectionがオブジェクトではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  else if( result.inputTextsAndAutocorrection.constructor !== Object ){
    throw new Error(`result.inputTextsAndAutocorrectionが辞書型ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  for( const i in result.inputTextsAndAutocorrection ){
    if( typeof i !== "string" ){
      throw new Error(`result.inputTextsAndAutocorrectionのキーが文字列ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
    }
  }
  if( (result.recordId===null) || (result.recordId===undefined) ){
    // result.recordIdは空欄OK。
  }
  else if( typeof result.recordId !== "number" ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  else if( isNaN(result.recordId) ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : input_element\n関数 : _autoFill`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_getConditions_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getConditions( params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : input_element\n関数 : _getConditions`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _getConditions`);
    }
  }
  if( !Array.isArray(params.viewColumnIdList) ){
    if( !params.viewColumnIdList ){
      throw new Error(`params.viewColumnIdListがNULLです。\nレイヤー : input_element\n関数 : _getConditions`);
    }
    else{
      throw new Error(`params.viewColumnIdListが配列ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
    }
  }
  for( let i=0; i<params.viewColumnIdList.length; i++ ){
    if( typeof params.viewColumnIdList[i] !== "number" ){
      if( !params.viewColumnIdList[i] ){
        throw new Error(`params.viewColumnIdList[${i}]がNULLです。\nレイヤー : input_element\n関数 : _getConditions`);
      }
      else{
        throw new Error(`params.viewColumnIdList[${i}]が数値ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
      }
    }
    else if( isNaN(params.viewColumnIdList[i]) ){
      throw new Error(`params.viewColumnIdList[${i}]が数値ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
    }
  }
  if( params.inputTexts===null || params.inputTexts===undefined ){
    throw new Error(`params.inputTextsがNULLです。\nレイヤー : input_element\n関数 : _getConditions`);
  }
  else if( typeof params.inputTexts !== "object" ){
    throw new Error(`params.inputTextsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _getConditions`);
  }
  else if( params.inputTexts.constructor !== Object ){
    throw new Error(`params.inputTextsが辞書型ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
  }
  for( const i in params.inputTexts ){
    if( typeof i !== "string" ){
      throw new Error(`params.inputTextsのキーが文字列ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getConditions_core( params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : input_element\n関数 : _getConditions`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( result===null || result===undefined ){
    throw new Error(`resultがNULLです。\nレイヤー : input_element\n関数 : _getConditions`);
  }
  else if( typeof result !== "object" ){
    throw new Error(`resultがオブジェクトではありません。\nレイヤー : input_element\n関数 : _getConditions`);
  }
  else if( result.constructor !== Object ){
    throw new Error(`resultが辞書型ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : input_element\n関数 : _getConditions`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_listPredictions_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _listPredictions( params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
  }
  if( typeof params.inputText !== "string" ){
    if( !params.inputText ){
      throw new Error(`params.inputTextがNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
    else{
      throw new Error(`params.inputTextが文字列ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
  }
  if( typeof params.tableId !== "string" ){
    if( !params.tableId ){
      throw new Error(`params.tableIdがNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
    else{
      throw new Error(`params.tableIdが文字列ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
  }
  if( typeof params.columnId !== "string" ){
    if( !params.columnId ){
      throw new Error(`params.columnIdがNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
    else{
      throw new Error(`params.columnIdが文字列ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
  }
  if( params.conditions===null || params.conditions===undefined ){
    throw new Error(`params.conditionsがNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
  }
  else if( typeof params.conditions !== "object" ){
    throw new Error(`params.conditionsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
  }
  else if( params.conditions.constructor !== Object ){
    throw new Error(`params.conditionsが辞書型ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
  }
  for( const i in params.conditions ){
    if( typeof i !== "string" ){
      throw new Error(`params.conditionsのキーが文字列ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _listPredictions_core( params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : input_element\n関数 : _listPredictions`);
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
      throw new Error(`resultがNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : input_element\n関数 : _listPredictions`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : input_element\n関数 : _listPredictions`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_listRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _listRecords( tableId, conditions ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : input_element\n関数 : _listRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : input_element\n関数 : _listRecords`);
    }
  }
  if( conditions===null || conditions===undefined ){
    throw new Error(`conditionsがNULLです。\nレイヤー : input_element\n関数 : _listRecords`);
  }
  else if( typeof conditions !== "object" ){
    throw new Error(`conditionsがオブジェクトではありません。\nレイヤー : input_element\n関数 : _listRecords`);
  }
  else if( conditions.constructor !== Object ){
    throw new Error(`conditionsが辞書型ではありません。\nレイヤー : input_element\n関数 : _listRecords`);
  }
  for( const i in conditions ){
    if( typeof i !== "string" ){
      throw new Error(`conditionsのキーが文字列ではありません。\nレイヤー : input_element\n関数 : _listRecords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _listRecords_core( tableId, conditions );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : input_element\n関数 : _listRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : input_element\n関数 : _listRecords`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : input_element\n関数 : _listRecords`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( result[i]===null || result[i]===undefined ){
      throw new Error(`result[${i}]がNULLです。\nレイヤー : input_element\n関数 : _listRecords`);
    }
    else if( typeof result[i] !== "object" ){
      throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : input_element\n関数 : _listRecords`);
    }
    else if( result[i].constructor !== Object ){
      throw new Error(`result[${i}]が辞書型ではありません。\nレイヤー : input_element\n関数 : _listRecords`);
    }
    for( const j in result[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result[${i}]のキーが文字列ではありません。\nレイヤー : input_element\n関数 : _listRecords`);
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
      throw new Error(`${error}\nレイヤー : input_element\n関数 : clearCache`);
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


