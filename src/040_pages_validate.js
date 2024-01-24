import {
  startUp_core,  // プログラム起動
  createPage_core,  // ページを作成
  updatePageName_core,  // ページ名やメモを変更
  getPageInfo_core,  // １ページの情報を取得
  listJoinsFromTableId_core,  // テーブルIDからjoinedTableIdを取得する
  getTableFromJoin_core,  // joinedTableIdからテーブルIDを取得する
  createJoinedTable_core,  // 結合済みテーブルを作成
  deleteJoinedTable_core,  // 結合済みテーブルを削除
  deletePage_core,  // ページを削除
  getBreadcrumbs_core,  // パンくずリストを再帰的に取得
  cutPage_core,  // ページを切り取る
  copyPage_core,  // ページをコピーする
  pastePage_core,  // ページを貼り付ける
  getCuttingPage_core,  // 切り取り中のページを取得する
  getCopyingPage_core,  // コピー中のページを取得する
  listAllPages_core,  // ページを全て取得する関数
} from "./041_pages.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : pages\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : pages\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : pages\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : pages\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : startUp`);
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
export async function createPage( parentPageId, pageName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof parentPageId !== "number" ){
    if( !parentPageId ){
      throw new Error(`parentPageIdがNULLです。\nレイヤー : pages\n関数 : createPage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : pages\n関数 : createPage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : pages\n関数 : createPage`);
  }
  if( typeof pageName !== "string" ){
    if( !pageName ){
      throw new Error(`pageNameがNULLです。\nレイヤー : pages\n関数 : createPage`);
    }
    else{
      throw new Error(`pageNameが文字列ではありません。\nレイヤー : pages\n関数 : createPage`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createPage_core( parentPageId, pageName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : pages\n関数 : createPage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : pages\n関数 : createPage`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : pages\n関数 : createPage`);
    }
  }
  if( typeof result.pageId !== "number" ){
    if( !result.pageId ){
      throw new Error(`result.pageIdがNULLです。\nレイヤー : pages\n関数 : createPage`);
    }
    else{
      throw new Error(`result.pageIdが数値ではありません。\nレイヤー : pages\n関数 : createPage`);
    }
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : pages\n関数 : createPage`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updatePageName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updatePageName( pages ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(pages) ){
    if( !pages ){
      throw new Error(`pagesがNULLです。\nレイヤー : pages\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pagesが配列ではありません。\nレイヤー : pages\n関数 : updatePageName`);
    }
  }
  for( let i=0; i<pages.length; i++ ){
    if( typeof pages[i] !== "object" ){
      if( !pages[i] ){
        throw new Error(`pages[${i}]がNULLです。\nレイヤー : pages\n関数 : updatePageName`);
      }
      else{
        throw new Error(`pages[${i}]がオブジェクトではありません。\nレイヤー : pages\n関数 : updatePageName`);
      }
    }
    if( typeof pages[i].id !== "number" ){
      if( !pages[i].id ){
        throw new Error(`pages[${i}].idがNULLです。\nレイヤー : pages\n関数 : updatePageName`);
      }
      else{
        throw new Error(`pages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : updatePageName`);
      }
    }
    else if( isNaN(pages[i].id) ){
      throw new Error(`pages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : updatePageName`);
    }
    if( typeof pages[i].name !== "string" ){
      if( !pages[i].name ){
        throw new Error(`pages[${i}].nameがNULLです。\nレイヤー : pages\n関数 : updatePageName`);
      }
      else{
        throw new Error(`pages[${i}].nameが文字列ではありません。\nレイヤー : pages\n関数 : updatePageName`);
      }
    }
    if( typeof pages[i].memo !== "string" ){
      if( !pages[i].memo ){
        throw new Error(`pages[${i}].memoがNULLです。\nレイヤー : pages\n関数 : updatePageName`);
      }
      else{
        throw new Error(`pages[${i}].memoが文字列ではありません。\nレイヤー : pages\n関数 : updatePageName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updatePageName_core( pages );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : pages\n関数 : updatePageName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : pages\n関数 : updatePageName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : pages\n関数 : updatePageName`);
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
  if( (pageId===null) || (pageId===undefined) ){
    // pageIdは空欄OK。
  }
  else if( typeof pageId !== "number" ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : getPageInfo`);
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
      throw new Error(`resultがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  if( (result.pageId===null) || (result.pageId===undefined) ){
    // result.pageIdは空欄OK。
  }
  else if( typeof result.pageId !== "number" ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
  }
  if( typeof result.pageName !== "string" ){
    if( !result.pageName ){
      throw new Error(`result.pageNameがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.pageNameが文字列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  if( typeof result.memo !== "string" ){
    if( !result.memo ){
      throw new Error(`result.memoがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.memoが文字列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  if( !Array.isArray(result.parentPages) ){
    if( !result.parentPages ){
      throw new Error(`result.parentPagesがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.parentPagesが配列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  for( let i=0; i<result.parentPages.length; i++ ){
    if( typeof result.parentPages[i] !== "object" ){
      if( !result.parentPages[i] ){
        throw new Error(`result.parentPages[${i}]がNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.parentPages[${i}]がオブジェクトではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
    if( typeof result.parentPages[i].id !== "number" ){
      if( !result.parentPages[i].id ){
        throw new Error(`result.parentPages[${i}].idがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.parentPages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
    else if( isNaN(result.parentPages[i].id) ){
      throw new Error(`result.parentPages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    if( typeof result.parentPages[i].name !== "string" ){
      if( !result.parentPages[i].name ){
        throw new Error(`result.parentPages[${i}].nameがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.parentPages[${i}].nameが文字列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
  }
  if( !Array.isArray(result.staticPages) ){
    if( !result.staticPages ){
      throw new Error(`result.staticPagesがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.staticPagesが配列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  for( let i=0; i<result.staticPages.length; i++ ){
    if( typeof result.staticPages[i] !== "object" ){
      if( !result.staticPages[i] ){
        throw new Error(`result.staticPages[${i}]がNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.staticPages[${i}]がオブジェクトではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
    if( typeof result.staticPages[i].id !== "number" ){
      if( !result.staticPages[i].id ){
        throw new Error(`result.staticPages[${i}].idがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.staticPages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
    else if( isNaN(result.staticPages[i].id) ){
      throw new Error(`result.staticPages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    if( typeof result.staticPages[i].name !== "string" ){
      if( !result.staticPages[i].name ){
        throw new Error(`result.staticPages[${i}].nameがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.staticPages[${i}].nameが文字列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
  }
  if( !Array.isArray(result.dynamicPages) ){
    if( !result.dynamicPages ){
      throw new Error(`result.dynamicPagesがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.dynamicPagesが配列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  for( let i=0; i<result.dynamicPages.length; i++ ){
    if( typeof result.dynamicPages[i] !== "object" ){
      if( !result.dynamicPages[i] ){
        throw new Error(`result.dynamicPages[${i}]がNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.dynamicPages[${i}]がオブジェクトではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
    if( typeof result.dynamicPages[i].id !== "number" ){
      if( !result.dynamicPages[i].id ){
        throw new Error(`result.dynamicPages[${i}].idがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.dynamicPages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
    else if( isNaN(result.dynamicPages[i].id) ){
      throw new Error(`result.dynamicPages[${i}].idが数値ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    if( typeof result.dynamicPages[i].name !== "string" ){
      if( !result.dynamicPages[i].name ){
        throw new Error(`result.dynamicPages[${i}].nameがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
      }
      else{
        throw new Error(`result.dynamicPages[${i}].nameが文字列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
      }
    }
  }
  if( typeof result.joinedTableType !== "string" ){
    if( !result.joinedTableType ){
      throw new Error(`result.joinedTableTypeがNULLです。\nレイヤー : pages\n関数 : getPageInfo`);
    }
    else{
      throw new Error(`result.joinedTableTypeが文字列ではありません。\nレイヤー : pages\n関数 : getPageInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listJoinsFromTableId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listJoinsFromTableId( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listJoinsFromTableId_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : pages\n関数 : listJoinsFromTableId`);
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
      throw new Error(`resultがNULLです。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "number" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
      }
      else{
        throw new Error(`result[${i}]が数値ではありません。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
      }
    }
    else if( isNaN(result[i]) ){
      throw new Error(`result[${i}]が数値ではありません。\nレイヤー : pages\n関数 : listJoinsFromTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getTableFromJoin_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTableFromJoin( joinedTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof joinedTableId !== "number" ){
    if( !joinedTableId ){
      throw new Error(`joinedTableIdがNULLです。\nレイヤー : pages\n関数 : getTableFromJoin`);
    }
    else{
      throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : pages\n関数 : getTableFromJoin`);
    }
  }
  else if( isNaN(joinedTableId) ){
    throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : pages\n関数 : getTableFromJoin`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTableFromJoin_core( joinedTableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : pages\n関数 : getTableFromJoin`);
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
  else if( typeof result !== "string" ){
    throw new Error(`resultが文字列ではありません。\nレイヤー : pages\n関数 : getTableFromJoin`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createJoinedTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createJoinedTable( pageId, tableId, sqlQuery ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : pages\n関数 : createJoinedTable`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : createJoinedTable`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : createJoinedTable`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : pages\n関数 : createJoinedTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : pages\n関数 : createJoinedTable`);
    }
  }
  if( typeof sqlQuery !== "string" ){
    if( !sqlQuery ){
      throw new Error(`sqlQueryがNULLです。\nレイヤー : pages\n関数 : createJoinedTable`);
    }
    else{
      throw new Error(`sqlQueryが文字列ではありません。\nレイヤー : pages\n関数 : createJoinedTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createJoinedTable_core( pageId, tableId, sqlQuery );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : pages\n関数 : createJoinedTable`);
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
// 関数「deleteJoinedTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteJoinedTable( joinedTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof joinedTableId !== "number" ){
    if( !joinedTableId ){
      throw new Error(`joinedTableIdがNULLです。\nレイヤー : pages\n関数 : deleteJoinedTable`);
    }
    else{
      throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : pages\n関数 : deleteJoinedTable`);
    }
  }
  else if( isNaN(joinedTableId) ){
    throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : pages\n関数 : deleteJoinedTable`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteJoinedTable_core( joinedTableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : pages\n関数 : deleteJoinedTable`);
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
  if( typeof pageId !== "string" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : pages\n関数 : deletePage`);
    }
    else{
      throw new Error(`pageIdが文字列ではありません。\nレイヤー : pages\n関数 : deletePage`);
    }
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : deletePage`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : pages\n関数 : getBreadcrumbs`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : getBreadcrumbs`);
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
      throw new Error(`resultがNULLです。\nレイヤー : pages\n関数 : getBreadcrumbs`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : pages\n関数 : getBreadcrumbs`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
      }
    }
    if( typeof result[i].pageId !== "number" ){
      if( !result[i].pageId ){
        throw new Error(`result[${i}].pageIdがNULLです。\nレイヤー : pages\n関数 : getBreadcrumbs`);
      }
      else{
        throw new Error(`result[${i}].pageIdが数値ではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
      }
    }
    else if( isNaN(result[i].pageId) ){
      throw new Error(`result[${i}].pageIdが数値ではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
    }
    if( typeof result[i].pageName !== "string" ){
      if( !result[i].pageName ){
        throw new Error(`result[${i}].pageNameがNULLです。\nレイヤー : pages\n関数 : getBreadcrumbs`);
      }
      else{
        throw new Error(`result[${i}].pageNameが文字列ではありません。\nレイヤー : pages\n関数 : getBreadcrumbs`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : pages\n関数 : cutPage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : cutPage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : cutPage`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : cutPage`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : pages\n関数 : copyPage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : copyPage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : pages\n関数 : copyPage`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : copyPage`);
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
      throw new Error(`parentPageIdがNULLです。\nレイヤー : pages\n関数 : pastePage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : pages\n関数 : pastePage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : pages\n関数 : pastePage`);
  }
  if( (afterPageId===null) || (afterPageId===undefined) ){
    // afterPageIdは空欄OK。
  }
  else if( typeof afterPageId !== "number" ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : pages\n関数 : pastePage`);
  }
  else if( isNaN(afterPageId) ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : pages\n関数 : pastePage`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : pastePage`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : getCuttingPage`);
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
    throw new Error(`resultが数値ではありません。\nレイヤー : pages\n関数 : getCuttingPage`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : pages\n関数 : getCuttingPage`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : getCopyingPage`);
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
    throw new Error(`resultが数値ではありません。\nレイヤー : pages\n関数 : getCopyingPage`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : pages\n関数 : getCopyingPage`);
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
      throw new Error(`${error}\nレイヤー : pages\n関数 : listAllPages`);
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
      throw new Error(`resultがNULLです。\nレイヤー : pages\n関数 : listAllPages`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : pages\n関数 : listAllPages`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "number" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : pages\n関数 : listAllPages`);
      }
      else{
        throw new Error(`result[${i}]が数値ではありません。\nレイヤー : pages\n関数 : listAllPages`);
      }
    }
    else if( isNaN(result[i]) ){
      throw new Error(`result[${i}]が数値ではありません。\nレイヤー : pages\n関数 : listAllPages`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


