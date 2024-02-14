import {
  startUp_core,  // プログラム起動
  createPage_core,  // ページを作成
  updatePageName_core,  // ページ名やメモを変更
  getPageInfo_core,  // １ページの情報を取得
  listViewsFromTableId_core,  // テーブルIDからviewIdを取得する
  getTableFromView_core,  // viewIdからテーブルIDを取得する
  createView_core,  // ビューを作成
  deleteView_core,  // ビューを削除
  deletePage_core,  // ページを削除
  getBreadcrumbs_core,  // パンくずリストを再帰的に取得
  cutPage_core,  // ページを切り取る
  copyPage_core,  // ページをコピーする
  pastePage_core,  // ページを貼り付ける
  getCuttingPage_core,  // 切り取り中のページを取得する
  getCopyingPage_core,  // コピー中のページを取得する
  listAllPages_core,  // ページを全て取得する関数
  listStaticChildren_core,  // 子ページの一覧を取得
  listChildrenView_core,  // ビューの一覧を取得
  getParentPage_core,  // 親ページのIDを取得
  listChildrenPage_core,  // 子ページの一覧を再帰的に取得
  _movePage_core,  // 【サブ関数】ページを移動する
  _generatePageSortNumber_core,  // 【サブ関数】ソート番号を発行する
  _copyPage_core,  // 【サブ関数】ページをコピーする
  getViewInfo_core,  // ビューの情報を取得
  clearCache_core,  // インメモリキャッシュを削除する
  isExistView_core,  // ビューの存在を確認
  deleteTable_core,  // 不可逆的にテーブルを削除
} from "./062_page_and_view.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : page_and_view\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : page_and_view\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : page_and_view\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : page_and_view\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : startUp`);
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
      throw new Error(`parentPageIdがNULLです。\nレイヤー : page_and_view\n関数 : createPage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : createPage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : createPage`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : createPage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : createPage`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_and_view\n関数 : createPage`);
    }
  }
  if( typeof result.pageId !== "number" ){
    if( !result.pageId ){
      throw new Error(`result.pageIdがNULLです。\nレイヤー : page_and_view\n関数 : createPage`);
    }
    else{
      throw new Error(`result.pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : createPage`);
    }
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : createPage`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : updatePageName`);
  }
  if( typeof pageName !== "string" ){
    if( !pageName ){
      throw new Error(`pageNameがNULLです。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pageNameが文字列ではありません。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
  }
  if( typeof memo !== "string" ){
    if( !memo ){
      throw new Error(`memoがNULLです。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
    else{
      throw new Error(`memoが文字列ではありません。\nレイヤー : page_and_view\n関数 : updatePageName`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : updatePageName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : page_and_view\n関数 : updatePageName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getPageInfo_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPageInfo( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getPageInfo`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPageInfo_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getPageInfo`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
  }
  if( typeof result.pageName !== "string" ){
    if( !result.pageName ){
      throw new Error(`result.pageNameがNULLです。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.pageNameが文字列ではありません。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
  }
  if( typeof result.memo !== "string" ){
    if( !result.memo ){
      throw new Error(`result.memoがNULLです。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.memoが文字列ではありません。\nレイヤー : page_and_view\n関数 : getPageInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listViewsFromTableId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listViewsFromTableId( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listViewsFromTableId_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "number" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
      }
      else{
        throw new Error(`result[${i}]が数値ではありません。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
      }
    }
    else if( isNaN(result[i]) ){
      throw new Error(`result[${i}]が数値ではありません。\nレイヤー : page_and_view\n関数 : listViewsFromTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getTableFromView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTableFromView( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : page_and_view\n関数 : getTableFromView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getTableFromView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getTableFromView`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTableFromView_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getTableFromView`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : getTableFromView`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : page_and_view\n関数 : getTableFromView`);
    }
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
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : createView`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : createView`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : createView`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : page_and_view\n関数 : createView`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : page_and_view\n関数 : createView`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : createView`);
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
      throw new Error(`viewIdがNULLです。\nレイヤー : page_and_view\n関数 : deleteView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : deleteView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : deleteView`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : deleteView`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : deletePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : deletePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : deletePage`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : deletePage`);
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
// 関数「getBreadcrumbs_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getBreadcrumbs( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getBreadcrumbs_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
      }
    }
    if( typeof result[i].pageId !== "number" ){
      if( !result[i].pageId ){
        throw new Error(`result[${i}].pageIdがNULLです。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
      }
      else{
        throw new Error(`result[${i}].pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
      }
    }
    else if( isNaN(result[i].pageId) ){
      throw new Error(`result[${i}].pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
    }
    if( typeof result[i].pageName !== "string" ){
      if( !result[i].pageName ){
        throw new Error(`result[${i}].pageNameがNULLです。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
      }
      else{
        throw new Error(`result[${i}].pageNameが文字列ではありません。\nレイヤー : page_and_view\n関数 : getBreadcrumbs`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「cutPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function cutPage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : cutPage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : cutPage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : cutPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await cutPage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : cutPage`);
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
// 関数「copyPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function copyPage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : copyPage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : copyPage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : copyPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await copyPage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : copyPage`);
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
export async function pastePage( parentPageId, afterPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof parentPageId !== "number" ){
    if( !parentPageId ){
      throw new Error(`parentPageIdがNULLです。\nレイヤー : page_and_view\n関数 : pastePage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
  }
  if( (afterPageId===null) || (afterPageId===undefined) ){
    // afterPageIdは空欄OK。
  }
  else if( typeof afterPageId !== "number" ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
  }
  else if( isNaN(afterPageId) ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await pastePage_core( parentPageId, afterPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : pastePage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : pastePage`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
    }
  }
  if( typeof result.pageId !== "number" ){
    if( !result.pageId ){
      throw new Error(`result.pageIdがNULLです。\nレイヤー : page_and_view\n関数 : pastePage`);
    }
    else{
      throw new Error(`result.pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
    }
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : pastePage`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getCuttingPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getCuttingPage(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getCuttingPage_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getCuttingPage`);
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
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : getCuttingPage`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : getCuttingPage`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getCopyingPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getCopyingPage(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getCopyingPage_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getCopyingPage`);
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
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : getCopyingPage`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : getCopyingPage`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listAllPages_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listAllPages(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listAllPages_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : listAllPages`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : listAllPages`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_and_view\n関数 : listAllPages`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "number" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_and_view\n関数 : listAllPages`);
      }
      else{
        throw new Error(`result[${i}]が数値ではありません。\nレイヤー : page_and_view\n関数 : listAllPages`);
      }
    }
    else if( isNaN(result[i]) ){
      throw new Error(`result[${i}]が数値ではありません。\nレイヤー : page_and_view\n関数 : listAllPages`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listStaticChildren_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listStaticChildren( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listStaticChildren_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : listStaticChildren`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
      }
    }
    if( typeof result[i].pageId !== "number" ){
      if( !result[i].pageId ){
        throw new Error(`result[${i}].pageIdがNULLです。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
      }
      else{
        throw new Error(`result[${i}].pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
      }
    }
    else if( isNaN(result[i].pageId) ){
      throw new Error(`result[${i}].pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
    }
    if( typeof result[i].pageName !== "string" ){
      if( !result[i].pageName ){
        throw new Error(`result[${i}].pageNameがNULLです。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
      }
      else{
        throw new Error(`result[${i}].pageNameが文字列ではありません。\nレイヤー : page_and_view\n関数 : listStaticChildren`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listChildrenView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listChildrenView( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listChildrenView_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : listChildrenView`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    if( typeof result[i].viewId !== "number" ){
      if( !result[i].viewId ){
        throw new Error(`result[${i}].viewIdがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    else if( isNaN(result[i].viewId) ){
      throw new Error(`result[${i}].viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
    if( typeof result[i].name !== "string" ){
      if( !result[i].name ){
        throw new Error(`result[${i}].nameがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].nameが文字列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    if( typeof result[i].childPageId !== "number" ){
      if( !result[i].childPageId ){
        throw new Error(`result[${i}].childPageIdがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].childPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    else if( isNaN(result[i].childPageId) ){
      throw new Error(`result[${i}].childPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
    if( typeof result[i].tableId !== "string" ){
      if( !result[i].tableId ){
        throw new Error(`result[${i}].tableIdがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].tableIdが文字列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    if( typeof result[i].onePageMaxSize !== "number" ){
      if( !result[i].onePageMaxSize ){
        throw new Error(`result[${i}].onePageMaxSizeがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].onePageMaxSizeが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    else if( isNaN(result[i].onePageMaxSize) ){
      throw new Error(`result[${i}].onePageMaxSizeが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
    if( typeof result[i].viewType !== "string" ){
      if( !result[i].viewType ){
        throw new Error(`result[${i}].viewTypeがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].viewTypeが文字列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    if( typeof result[i].excelStartRow !== "number" ){
      if( !result[i].excelStartRow ){
        throw new Error(`result[${i}].excelStartRowがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].excelStartRowが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    else if( isNaN(result[i].excelStartRow) ){
      throw new Error(`result[${i}].excelStartRowが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
    }
    if( typeof result[i].excelStartColumn !== "string" ){
      if( !result[i].excelStartColumn ){
        throw new Error(`result[${i}].excelStartColumnがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].excelStartColumnが文字列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
    if( typeof result[i].iframe !== "string" ){
      if( !result[i].iframe ){
        throw new Error(`result[${i}].iframeがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
      else{
        throw new Error(`result[${i}].iframeが文字列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenView`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getParentPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getParentPage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : getParentPage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getParentPage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getParentPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getParentPage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getParentPage`);
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
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : getParentPage`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : getParentPage`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listChildrenPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listChildrenPage( parentId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof parentId !== "number" ){
    if( !parentId ){
      throw new Error(`parentIdがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
    }
    else{
      throw new Error(`parentIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
    }
  }
  else if( isNaN(parentId) ){
    throw new Error(`parentIdが数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listChildrenPage_core( parentId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : listChildrenPage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "number" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
      }
      else{
        throw new Error(`result[${i}]が数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
      }
    }
    else if( isNaN(result[i]) ){
      throw new Error(`result[${i}]が数値ではありません。\nレイヤー : page_and_view\n関数 : listChildrenPage`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_movePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _movePage( pageId, destParentPageId, destAfterPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : _movePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _movePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _movePage`);
  }
  if( typeof destParentPageId !== "number" ){
    if( !destParentPageId ){
      throw new Error(`destParentPageIdがNULLです。\nレイヤー : page_and_view\n関数 : _movePage`);
    }
    else{
      throw new Error(`destParentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _movePage`);
    }
  }
  else if( isNaN(destParentPageId) ){
    throw new Error(`destParentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _movePage`);
  }
  if( (destAfterPageId===null) || (destAfterPageId===undefined) ){
    // destAfterPageIdは空欄OK。
  }
  else if( typeof destAfterPageId !== "number" ){
    throw new Error(`destAfterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _movePage`);
  }
  else if( isNaN(destAfterPageId) ){
    throw new Error(`destAfterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _movePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _movePage_core( pageId, destParentPageId, destAfterPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : _movePage`);
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
// 関数「_generatePageSortNumber_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _generatePageSortNumber( destParentPageId, destAfterPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof destParentPageId !== "number" ){
    if( !destParentPageId ){
      throw new Error(`destParentPageIdがNULLです。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
    }
    else{
      throw new Error(`destParentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
    }
  }
  else if( isNaN(destParentPageId) ){
    throw new Error(`destParentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
  }
  if( (destAfterPageId===null) || (destAfterPageId===undefined) ){
    // destAfterPageIdは空欄OK。
  }
  else if( typeof destAfterPageId !== "number" ){
    throw new Error(`destAfterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
  }
  else if( isNaN(destAfterPageId) ){
    throw new Error(`destAfterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _generatePageSortNumber_core( destParentPageId, destAfterPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
    }
    else{
      throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : page_and_view\n関数 : _generatePageSortNumber`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_copyPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _copyPage( pageId, destParentPageId, destAfterPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_and_view\n関数 : _copyPage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _copyPage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _copyPage`);
  }
  if( typeof destParentPageId !== "number" ){
    if( !destParentPageId ){
      throw new Error(`destParentPageIdがNULLです。\nレイヤー : page_and_view\n関数 : _copyPage`);
    }
    else{
      throw new Error(`destParentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _copyPage`);
    }
  }
  else if( isNaN(destParentPageId) ){
    throw new Error(`destParentPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _copyPage`);
  }
  if( (destAfterPageId===null) || (destAfterPageId===undefined) ){
    // destAfterPageIdは空欄OK。
  }
  else if( typeof destAfterPageId !== "number" ){
    throw new Error(`destAfterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _copyPage`);
  }
  else if( isNaN(destAfterPageId) ){
    throw new Error(`destAfterPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : _copyPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _copyPage_core( pageId, destParentPageId, destAfterPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : _copyPage`);
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
// 関数「getViewInfo_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getViewInfo( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getViewInfo_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : getViewInfo`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  if( typeof result.viewId !== "number" ){
    if( !result.viewId ){
      throw new Error(`result.viewIdがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  else if( isNaN(result.viewId) ){
    throw new Error(`result.viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
  }
  if( typeof result.childPageId !== "number" ){
    if( !result.childPageId ){
      throw new Error(`result.childPageIdがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.childPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  else if( isNaN(result.childPageId) ){
    throw new Error(`result.childPageIdが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
  }
  if( typeof result.tableId !== "string" ){
    if( !result.tableId ){
      throw new Error(`result.tableIdがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.tableIdが文字列ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  if( typeof result.onePageMaxSize !== "number" ){
    if( !result.onePageMaxSize ){
      throw new Error(`result.onePageMaxSizeがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.onePageMaxSizeが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  else if( isNaN(result.onePageMaxSize) ){
    throw new Error(`result.onePageMaxSizeが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
  }
  if( typeof result.viewType !== "string" ){
    if( !result.viewType ){
      throw new Error(`result.viewTypeがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.viewTypeが文字列ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  if( typeof result.name !== "string" ){
    if( !result.name ){
      throw new Error(`result.nameがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.nameが文字列ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  if( typeof result.excelStartRow !== "number" ){
    if( !result.excelStartRow ){
      throw new Error(`result.excelStartRowがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.excelStartRowが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
  }
  else if( isNaN(result.excelStartRow) ){
    throw new Error(`result.excelStartRowが数値ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
  }
  if( typeof result.excelStartColumn !== "string" ){
    if( !result.excelStartColumn ){
      throw new Error(`result.excelStartColumnがNULLです。\nレイヤー : page_and_view\n関数 : getViewInfo`);
    }
    else{
      throw new Error(`result.excelStartColumnが文字列ではありません。\nレイヤー : page_and_view\n関数 : getViewInfo`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : clearCache`);
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
// 関数「isExistView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function isExistView( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : page_and_view\n関数 : isExistView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : isExistView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : page_and_view\n関数 : isExistView`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await isExistView_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : isExistView`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : isExistView`);
    }
    else{
      throw new Error(`resultがブール値ではありません。\nレイヤー : page_and_view\n関数 : isExistView`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultがブール値ではありません。\nレイヤー : page_and_view\n関数 : isExistView`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : page_and_view\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : page_and_view\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : page_and_view\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_and_view\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : page_and_view\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


