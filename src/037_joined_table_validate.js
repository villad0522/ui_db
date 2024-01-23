import {
  startUp_core,  // プログラム起動
  createJoinedTable_core,  // 結合済みテーブルを作成
  deleteJoinedTable_core,  // 結合済みテーブルを削除
  generateSQL_core,  // SQLクエリを生成
} from "./038_joined_table.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : joined_table\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : joined_table\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : joined_table\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : joined_table\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : startUp`);
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
// 関数「createJoinedTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createJoinedTable( pageId, tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : joined_table\n関数 : createJoinedTable`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : joined_table\n関数 : createJoinedTable`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : joined_table\n関数 : createJoinedTable`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : joined_table\n関数 : createJoinedTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : joined_table\n関数 : createJoinedTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createJoinedTable_core( pageId, tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : createJoinedTable`);
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
// 関数「deleteJoinedTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteJoinedTable( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteJoinedTable_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
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
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : joined_table\n関数 : generateSQL`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : generateSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
  }
  if( typeof result.sql !== "string" ){
    if( !result.sql ){
      throw new Error(`result.sqlがNULLです。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
    else{
      throw new Error(`result.sqlが文字列ではありません。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


