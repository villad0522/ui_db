import {
  regenerateHTML_core,  // HTMLを再生成
  escapeHTML_core,  // HTMLエスケープ
} from "./047_regenerate_html.js";


//#######################################################################################
// 関数「regenerateHTML_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function regenerateHTML( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_html\n関数 : regenerateHTML`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : regenerateHTML`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_html\n関数 : regenerateHTML`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await regenerateHTML_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_html\n関数 : regenerateHTML`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_html\n関数 : regenerateHTML`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_html\n関数 : regenerateHTML`);
    }
  }
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


