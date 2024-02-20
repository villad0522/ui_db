import {
  startUp_core,  // プログラム起動
  deleteView_core,  // ビューを削除
  generateSQL_core,  // SQLクエリを生成
  deleteTable_core,  // 不可逆的にテーブルを削除
  getExtractionsAsJP_core,  // 抽出条件を日本語で取得
  _getExtractions_core,  // 【サブ】抽出条件を取得
} from "./059_extract_and_sort.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : extract_and_sort\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : extract_and_sort\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : extract_and_sort\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : extract_and_sort\n関数 : startUp`);
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
// 関数「deleteView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteView( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : extract_and_sort\n関数 : deleteView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : deleteView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : deleteView`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteView_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : extract_and_sort\n関数 : deleteView`);
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
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( viewId, queryParameters, isExcel ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  if( typeof isExcel !== "boolean" ){
    if( !isExcel ){
      throw new Error(`isExcelがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
    else{
      throw new Error(`isExcelがブール値ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  else if( isNaN(isExcel) ){
    throw new Error(`isExcelがブール値ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( viewId, queryParameters, isExcel );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : extract_and_sort\n関数 : generateSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  if( typeof result.normalSQL !== "string" ){
    if( !result.normalSQL ){
      throw new Error(`result.normalSQLがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
    else{
      throw new Error(`result.normalSQLが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  if( typeof result.countSQL !== "string" ){
    if( !result.countSQL ){
      throw new Error(`result.countSQLがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
    else{
      throw new Error(`result.countSQLが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  if( result.normalParameters===null || result.normalParameters===undefined ){
    throw new Error(`result.normalParametersがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  else if( typeof result.normalParameters !== "object" ){
    throw new Error(`result.normalParametersがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  else if( result.normalParameters.constructor !== Object ){
    throw new Error(`result.normalParametersが辞書型ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  for( const i in result.normalParameters ){
    if( typeof i !== "string" ){
      throw new Error(`result.normalParametersのキーが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
    }
  }
  if( result.countParameters===null || result.countParameters===undefined ){
    throw new Error(`result.countParametersがNULLです。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  else if( typeof result.countParameters !== "object" ){
    throw new Error(`result.countParametersがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  else if( result.countParameters.constructor !== Object ){
    throw new Error(`result.countParametersが辞書型ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
  }
  for( const i in result.countParameters ){
    if( typeof i !== "string" ){
      throw new Error(`result.countParametersのキーが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : generateSQL`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : extract_and_sort\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : extract_and_sort\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : extract_and_sort\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getExtractionsAsJP_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getExtractionsAsJP( viewId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getExtractionsAsJP_core( viewId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
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
      throw new Error(`resultがNULLです。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
      }
    }
    if( typeof result[i].viewColumnId !== "string" ){
      if( !result[i].viewColumnId ){
        throw new Error(`result[${i}].viewColumnIdがNULLです。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
      }
      else{
        throw new Error(`result[${i}].viewColumnIdが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
      }
    }
    if( typeof result[i].text !== "string" ){
      if( !result[i].text ){
        throw new Error(`result[${i}].textがNULLです。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
      }
      else{
        throw new Error(`result[${i}].textが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : getExtractionsAsJP`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_getExtractions_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getExtractions( viewId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getExtractions_core( viewId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( result===null || result===undefined ){
    throw new Error(`resultがNULLです。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  else if( typeof result !== "object" ){
    throw new Error(`resultがオブジェクトではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  else if( result.constructor !== Object ){
    throw new Error(`resultが辞書型ではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : extract_and_sort\n関数 : _getExtractions`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


