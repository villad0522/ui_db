import {
  regeneratePage_core,  // ページを再生成する
  createPage_core,  // ページを作成
  createView_core,  // ビューを作成
  startUp_core,  // プログラム起動
} from "./032_regenerate_html.js";


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
export async function createView( pageId, tableId, sqlQuery ){
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
  if( typeof sqlQuery !== "string" ){
    if( !sqlQuery ){
      throw new Error(`sqlQueryがNULLです。\nレイヤー : regenerate_html\n関数 : createView`);
    }
    else{
      throw new Error(`sqlQueryが文字列ではありません。\nレイヤー : regenerate_html\n関数 : createView`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createView_core( pageId, tableId, sqlQuery );
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


