import {
  startUp_core,  // プログラム起動
  createColumn_core,  // カラムを作成
} from "./003_relation.js";


//#######################################################################################
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl, isDebug ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : relation\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : relation\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : relation\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : relation\n関数 : startUp`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await startUp_core( localUrl, isDebug );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : startUp`);
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


//#######################################################################################
// 関数「createColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createColumn( tableId, columnName, dataType, parentTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createColumn_core( tableId, columnName, dataType, parentTableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "object" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


