import {
  transferData_core,  // データ移行
} from "./035_data_transfer.js";


//#######################################################################################
// 関数「transferData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function transferData( processName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await transferData_core( processName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : transferData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : transferData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : transferData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


