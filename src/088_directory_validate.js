import {
  getPath_core,  // ディレクトリのパスを提供する関数
  startUp_core,  // プログラム起動
} from "./089_directory.js";


//#######################################################################################
// 関数「getPath_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPath( directoryCode ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof directoryCode !== "string" ){
    if( !directoryCode ){
      throw new Error(`directoryCodeがNULLです。\nレイヤー : directory\n関数 : getPath`);
    }
    else{
      throw new Error(`directoryCodeが文字列ではありません。\nレイヤー : directory\n関数 : getPath`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPath_core( directoryCode );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : directory\n関数 : getPath`);
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
      throw new Error(`resultがNULLです。\nレイヤー : directory\n関数 : getPath`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : directory\n関数 : getPath`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : directory\n関数 : startUp`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await startUp_core( localUrl );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : directory\n関数 : startUp`);
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


