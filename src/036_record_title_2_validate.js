import {
  startUp_core,  // プログラム起動
  setTitleColumn_core,  // 見出しの役割を果たすカラムを登録する
  getTitleColumnId_core,  // 見出しの役割を果たすカラムを取得する
  listTables_core,  // テーブルの一覧を取得(重)
  deleteTable_core,  // 不可逆的にテーブルを削除
  clearCache_core,  // インメモリキャッシュを削除する
} from "./037_record_title_2.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : record_title_2\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : record_title_2\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : record_title_2\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : record_title_2\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : record_title_2\n関数 : startUp`);
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
// 関数「setTitleColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function setTitleColumn( columnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : record_title_2\n関数 : setTitleColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : record_title_2\n関数 : setTitleColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await setTitleColumn_core( columnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title_2\n関数 : setTitleColumn`);
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
// 関数「getTitleColumnId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTitleColumnId( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_2\n関数 : getTitleColumnId`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_2\n関数 : getTitleColumnId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTitleColumnId_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title_2\n関数 : getTitleColumnId`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( (result===null) || (result===undefined) ){
    // resultは空欄OK。
  }
  else if( typeof result !== "string" ){
    throw new Error(`resultが文字列ではありません。\nレイヤー : record_title_2\n関数 : getTitleColumnId`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listTables_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listTables( pageNumber, onePageMaxSize, isTrash ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageNumber !== "number" ){
    if( !pageNumber ){
      throw new Error(`pageNumberがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
    }
    else{
      throw new Error(`pageNumberが数値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
    }
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listTables_core( pageNumber, onePageMaxSize, isTrash );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title_2\n関数 : listTables`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title_2\n関数 : listTables`);
    }
  }
  if( !Array.isArray(result.tables) ){
    if( !result.tables ){
      throw new Error(`result.tablesがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
    }
    else{
      throw new Error(`result.tablesが配列ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
    }
  }
  for( let i=0; i<result.tables.length; i++ ){
    if( typeof result.tables[i] !== "object" ){
      if( !result.tables[i] ){
        throw new Error(`result.tables[${i}]がNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}]がオブジェクトではありません。\nレイヤー : record_title_2\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].id !== "string" ){
      if( !result.tables[i].id ){
        throw new Error(`result.tables[${i}].idがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].idが文字列ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].name !== "string" ){
      if( !result.tables[i].name ){
        throw new Error(`result.tables[${i}].nameがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].nameが文字列ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].titleColumnId !== "string" ){
      if( !result.tables[i].titleColumnId ){
        throw new Error(`result.tables[${i}].titleColumnIdがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].titleColumnIdが文字列ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
      }
    }
  }
  if( typeof result.total !== "number" ){
    if( !result.total ){
      throw new Error(`result.totalがNULLです。\nレイヤー : record_title_2\n関数 : listTables`);
    }
    else{
      throw new Error(`result.totalが数値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
    }
  }
  else if( isNaN(result.total) ){
    throw new Error(`result.totalが数値ではありません。\nレイヤー : record_title_2\n関数 : listTables`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「deleteTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteTable( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_2\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_2\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteTable_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title_2\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_2\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : record_title_2\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : record_title_2\n関数 : clearCache`);
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


