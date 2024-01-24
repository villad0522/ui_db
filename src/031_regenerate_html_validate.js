import {
  regenerateHTML_core,  // HTMLを再生成する
} from "./032_regenerate_html.js";


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
  //
  //--------------------------------------------------------------------------
  return result;
}


