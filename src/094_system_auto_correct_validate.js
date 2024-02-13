import {
  autoCorrectTableName_core,  // テーブル名を入力させる
  autoCorrectColumnName_core,  // カラム名を入力させる
  clearCache_core,  // インメモリキャッシュを削除する
} from "./095_system_auto_correct.js";


//#######################################################################################
// 関数「autoCorrectTableName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectTableName( inputText ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectTableName_core( inputText );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( !Array.isArray(result) ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectTableName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「autoCorrectColumnName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectColumnName( inputText, tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
  }
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectColumnName_core( inputText, tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( !Array.isArray(result) ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : system_auto_correct\n関数 : autoCorrectColumnName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「clearCache_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function clearCache(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await clearCache_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : system_auto_correct\n関数 : clearCache`);
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


