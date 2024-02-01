import {
  generateViewHTML_core,  // ビューのHTMLを生成
} from "./044_regenerate_view_html.js";


//#######################################################################################
// 関数「generateViewHTML_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateViewHTML( viewId, tableId, onePageMaxSize, childPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
  }
  if( typeof childPageId !== "number" ){
    if( !childPageId ){
      throw new Error(`childPageIdがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
    else{
      throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
  }
  else if( isNaN(childPageId) ){
    throw new Error(`childPageIdが数値ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateViewHTML_core( viewId, tableId, onePageMaxSize, childPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_view_html\n関数 : generateViewHTML`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


