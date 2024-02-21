import {
  generateViewHTML_table_core,  // ビューのHTMLを生成（表）
  generateViewHTML_card_core,  // ビューのHTMLを生成（カード）
  generateViewHTML_button_core,  // ビューのHTMLを生成（ボタン）
} from "./050_regenerate_view_html.js";


//#######################################################################################
// 関数「generateViewHTML_table_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateViewHTML_table( viewId, tableId, onePageMaxSize, childPageId, viewIndex ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
  }
  if( typeof childPageId !== "number" ){
    if( !childPageId ){
      throw new Error(`childPageIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
    else{
      throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
  }
  else if( isNaN(childPageId) ){
    throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
  }
  if( typeof viewIndex !== "number" ){
    if( !viewIndex ){
      throw new Error(`viewIndexがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
    else{
      throw new Error(`viewIndexが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
  }
  else if( isNaN(viewIndex) ){
    throw new Error(`viewIndexが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateViewHTML_table_core( viewId, tableId, onePageMaxSize, childPageId, viewIndex );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_table`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「generateViewHTML_card_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateViewHTML_card( viewId, tableId, onePageMaxSize, childPageId, viewIndex ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
  }
  if( typeof childPageId !== "number" ){
    if( !childPageId ){
      throw new Error(`childPageIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
    else{
      throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
  }
  else if( isNaN(childPageId) ){
    throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
  }
  if( typeof viewIndex !== "number" ){
    if( !viewIndex ){
      throw new Error(`viewIndexがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
    else{
      throw new Error(`viewIndexが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
  }
  else if( isNaN(viewIndex) ){
    throw new Error(`viewIndexが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateViewHTML_card_core( viewId, tableId, onePageMaxSize, childPageId, viewIndex );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_card`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「generateViewHTML_button_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateViewHTML_button( pageId, viewId, tableId, onePageMaxSize, childPageId, viewIndex ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
  }
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
  }
  if( typeof childPageId !== "number" ){
    if( !childPageId ){
      throw new Error(`childPageIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  else if( isNaN(childPageId) ){
    throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
  }
  if( typeof viewIndex !== "number" ){
    if( !viewIndex ){
      throw new Error(`viewIndexがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`viewIndexが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  else if( isNaN(viewIndex) ){
    throw new Error(`viewIndexが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateViewHTML_button_core( pageId, viewId, tableId, onePageMaxSize, childPageId, viewIndex );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML_button`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


