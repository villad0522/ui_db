import {
  openExcel_core,  // Excelを開く
  startUp_core,  // プログラム起動
  close_core,  // バックエンドプログラム終了
  _launchExcelApp_core,  // 【サブ】Excelアプリを起動
  _handleEditExcelFile_core,  // 【サブ】ファイルが編集されたとき
} from "./032_excel_instance.js";


//#######################################################################################
// 関数「openExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function openExcel( clientIpAddress, pageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof clientIpAddress !== "string" ){
    if( !clientIpAddress ){
      throw new Error(`clientIpAddressがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`clientIpAddressが文字列ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await openExcel_core( clientIpAddress, pageId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_instance\n関数 : openExcel`);
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
      throw new Error(`resultがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  if( typeof result.fileName !== "string" ){
    if( !result.fileName ){
      throw new Error(`result.fileNameがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`result.fileNameが文字列ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : excel_instance\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : excel_instance\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : excel_instance\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : excel_instance\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : excel_instance\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : excel_instance\n関数 : close`);
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
// 関数「_launchExcelApp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _launchExcelApp( filePath ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : excel_instance\n関数 : _launchExcelApp`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : excel_instance\n関数 : _launchExcelApp`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _launchExcelApp_core( filePath );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_instance\n関数 : _launchExcelApp`);
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
// 関数「_handleEditExcelFile_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _handleEditExcelFile( filePath, pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : excel_instance\n関数 : _handleEditExcelFile`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : excel_instance\n関数 : _handleEditExcelFile`);
    }
  }
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : excel_instance\n関数 : _handleEditExcelFile`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_instance\n関数 : _handleEditExcelFile`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_instance\n関数 : _handleEditExcelFile`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _handleEditExcelFile_core( filePath, pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_instance\n関数 : _handleEditExcelFile`);
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


