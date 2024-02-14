import {
  getTimestamp_core,  // 協定世界時(UTC)のタイムスタンプを取得する
} from "./125_timezone.js";


//#######################################################################################
// 関数「getTimestamp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTimestamp( dateObject ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTimestamp_core( dateObject );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : timezone\n関数 : getTimestamp`);
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
      throw new Error(`resultがNULLです。\nレイヤー : timezone\n関数 : getTimestamp`);
    }
    else{
      throw new Error(`resultが数値ではありません。\nレイヤー : timezone\n関数 : getTimestamp`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : timezone\n関数 : getTimestamp`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


