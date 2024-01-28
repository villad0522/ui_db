import {
  formatField_core,  // データを整形
} from "./071_db_formatter.js";


//#######################################################################################
// 関数「formatField_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function formatField( inputText, columnId, isRequired ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : db_formatter\n関数 : formatField`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : db_formatter\n関数 : formatField`);
    }
  }
  if( typeof isRequired !== "boolean" ){
    if( !isRequired ){
      throw new Error(`isRequiredがNULLです。\nレイヤー : db_formatter\n関数 : formatField`);
    }
    else{
      throw new Error(`isRequiredがブール値ではありません。\nレイヤー : db_formatter\n関数 : formatField`);
    }
  }
  else if( isNaN(isRequired) ){
    throw new Error(`isRequiredがブール値ではありません。\nレイヤー : db_formatter\n関数 : formatField`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await formatField_core( inputText, columnId, isRequired );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : db_formatter\n関数 : formatField`);
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


