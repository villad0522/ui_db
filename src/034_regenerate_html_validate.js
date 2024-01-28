import {
  regeneratePage_core,  // ページを再生成する
  createPage_core,  // ページを作成
  createView_core,  // ビューを作成
  startUp_core,  // プログラム起動
  escapeHTML_core,  // HTMLエスケープ
  updatePageName_core,  // ページ名やメモを変更
  deleteView_core,  // ビューを削除
  deletePage_core,  // ページを再帰的に削除
  pastePage_core,  // ページを貼り付ける
} from "./035_regenerate_html.js";


//#######################################################################################
// 関数「regeneratePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function regeneratePage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_html\n関数 : regeneratePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : regeneratePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : regeneratePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await regeneratePage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : regeneratePage`);
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
// 関数「createPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createPage( parentPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof parentPageId !== "number" ){
    if( !parentPageId ){
      throw new Error(`parentPageIdがNULLです。\nレイヤー : regenerate_html\n関数 : createPage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : createPage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : createPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createPage_core( parentPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : createPage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_html\n関数 : createPage`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : regenerate_html\n関数 : createPage`);
    }
  }
  if( typeof result.pageId !== "number" ){
    if( !result.pageId ){
      throw new Error(`result.pageIdがNULLです。\nレイヤー : regenerate_html\n関数 : createPage`);
    }
    else{
      throw new Error(`result.pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : createPage`);
    }
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : createPage`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createView( pageId, tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_html\n関数 : createView`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : createView`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : createView`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_html\n関数 : createView`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_html\n関数 : createView`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createView_core( pageId, tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : createView`);
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
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl, isDebug ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : regenerate_html\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : regenerate_html\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : regenerate_html\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : regenerate_html\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : startUp`);
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
// 関数「escapeHTML_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function escapeHTML( text ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof text !== "string" ){
    if( !text ){
      throw new Error(`textがNULLです。\nレイヤー : regenerate_html\n関数 : escapeHTML`);
    }
    else{
      throw new Error(`textが文字列ではありません。\nレイヤー : regenerate_html\n関数 : escapeHTML`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await escapeHTML_core( text );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : escapeHTML`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_html\n関数 : escapeHTML`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_html\n関数 : escapeHTML`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updatePageName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updatePageName( pageId, pageName, memo ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : updatePageName`);
  }
  if( typeof pageName !== "string" ){
    if( !pageName ){
      throw new Error(`pageNameがNULLです。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pageNameが文字列ではありません。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
  }
  if( typeof memo !== "string" ){
    if( !memo ){
      throw new Error(`memoがNULLです。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
    else{
      throw new Error(`memoが文字列ではありません。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updatePageName_core( pageId, pageName, memo );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : updatePageName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_html\n関数 : updatePageName`);
    }
  }
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
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_html\n関数 : deleteView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : deleteView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : deleteView`);
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
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : deleteView`);
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
// 関数「deletePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deletePage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_html\n関数 : deletePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : deletePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : deletePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deletePage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : deletePage`);
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
// 関数「pastePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function pastePage( newParentId, afterPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof newParentId !== "number" ){
    if( !newParentId ){
      throw new Error(`newParentIdがNULLです。\nレイヤー : regenerate_html\n関数 : pastePage`);
    }
    else{
      throw new Error(`newParentIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : pastePage`);
    }
  }
  else if( isNaN(newParentId) ){
    throw new Error(`newParentIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : pastePage`);
  }
  if( (afterPageId===null) || (afterPageId===undefined) ){
    // afterPageIdは空欄OK。
  }
  else if( typeof afterPageId !== "number" ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : pastePage`);
  }
  else if( isNaN(afterPageId) ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : pastePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await pastePage_core( newParentId, afterPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : pastePage`);
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


