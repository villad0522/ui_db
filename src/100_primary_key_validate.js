import {
  getPrimaryKey_core,  // プライマリキーを取得する関数
} from "./101_primary_key.js";


//#######################################################################################
// 関数「getPrimaryKey_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPrimaryKey( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : primary_key\n関数 : getPrimaryKey`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : primary_key\n関数 : getPrimaryKey`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPrimaryKey_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : primary_key\n関数 : getPrimaryKey`);
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
      throw new Error(`resultがNULLです。\nレイヤー : primary_key\n関数 : getPrimaryKey`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : primary_key\n関数 : getPrimaryKey`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


