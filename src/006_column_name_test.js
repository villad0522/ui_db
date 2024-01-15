import {
  startUp_core,  // プログラム起動
  clearCache_core,  // インメモリキャッシュを削除する
  createColumn_core,  // カラムを作成
  disableColumn_core,  // カラムを無効化
  enableColumn_core,  // カラムを再度有効化
  updateColumnName_core,  // カラム名を変更
  listColumns_core,  // カラムの一覧を取得
  runSqlReadOnly_core,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly_core,  // SQLクエリ実行（書き込み専用）
  getTableId_core,  // カラムIDからテーブルIDを調べる
} from "./007_column_name.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : column_name\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : column_name\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : column_name\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : column_name\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : column_name\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : column_name\n関数 : clearCache`);
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
export async function createColumn( tableId, columnName, dataType ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : column_name\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : column_name\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : column_name\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : column_name\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : column_name\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : column_name\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createColumn_core( tableId, columnName, dataType );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : column_name\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : column_name\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : column_name\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : column_name\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : column_name\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「disableColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function disableColumn( columnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : column_name\n関数 : disableColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : column_name\n関数 : disableColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await disableColumn_core( columnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : disableColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : disableColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : column_name\n関数 : disableColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「enableColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function enableColumn( columnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : column_name\n関数 : enableColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : column_name\n関数 : enableColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await enableColumn_core( columnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : enableColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : enableColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : column_name\n関数 : enableColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateColumnName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateColumnName( columns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(columns) ){
    if( !columns ){
      throw new Error(`columnsがNULLです。\nレイヤー : column_name\n関数 : updateColumnName`);
    }
    else{
      throw new Error(`columnsが配列ではありません。\nレイヤー : column_name\n関数 : updateColumnName`);
    }
  }
  for( let i=0; i<columns.length; i++ ){
    if( typeof columns[i] !== "object" ){
      if( !columns[i] ){
        throw new Error(`columns[${i}]がNULLです。\nレイヤー : column_name\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}]がオブジェクトではありません。\nレイヤー : column_name\n関数 : updateColumnName`);
      }
    }
    if( typeof columns[i].id !== "string" ){
      if( !columns[i].id ){
        throw new Error(`columns[${i}].idがNULLです。\nレイヤー : column_name\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}].idが文字列ではありません。\nレイヤー : column_name\n関数 : updateColumnName`);
      }
    }
    if( typeof columns[i].name !== "string" ){
      if( !columns[i].name ){
        throw new Error(`columns[${i}].nameがNULLです。\nレイヤー : column_name\n関数 : updateColumnName`);
      }
      else{
        throw new Error(`columns[${i}].nameが文字列ではありません。\nレイヤー : column_name\n関数 : updateColumnName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateColumnName_core( columns );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : updateColumnName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : updateColumnName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : column_name\n関数 : updateColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listColumns_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listColumns( tableId, pageNumber, onePageMaxSize, isTrash ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  if( typeof pageNumber !== "number" ){
    if( !pageNumber ){
      throw new Error(`pageNumberがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`pageNumberが数値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listColumns_core( tableId, pageNumber, onePageMaxSize, isTrash );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : listColumns`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  if( !Array.isArray(result.columns) ){
    if( !result.columns ){
      throw new Error(`result.columnsがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`result.columnsが配列ではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  for( let i=0; i<result.columns.length; i++ ){
    if( typeof result.columns[i] !== "object" ){
      if( !result.columns[i] ){
        throw new Error(`result.columns[${i}]がNULLです。\nレイヤー : column_name\n関数 : listColumns`);
      }
      else{
        throw new Error(`result.columns[${i}]がオブジェクトではありません。\nレイヤー : column_name\n関数 : listColumns`);
      }
    }
    if( typeof result.columns[i].id !== "string" ){
      if( !result.columns[i].id ){
        throw new Error(`result.columns[${i}].idがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
      }
      else{
        throw new Error(`result.columns[${i}].idが文字列ではありません。\nレイヤー : column_name\n関数 : listColumns`);
      }
    }
    if( typeof result.columns[i].name !== "string" ){
      if( !result.columns[i].name ){
        throw new Error(`result.columns[${i}].nameがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
      }
      else{
        throw new Error(`result.columns[${i}].nameが文字列ではありません。\nレイヤー : column_name\n関数 : listColumns`);
      }
    }
    if( typeof result.columns[i].type !== "string" ){
      if( !result.columns[i].type ){
        throw new Error(`result.columns[${i}].typeがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
      }
      else{
        throw new Error(`result.columns[${i}].typeが文字列ではありません。\nレイヤー : column_name\n関数 : listColumns`);
      }
    }
  }
  if( typeof result.total !== "number" ){
    if( !result.total ){
      throw new Error(`result.totalがNULLです。\nレイヤー : column_name\n関数 : listColumns`);
    }
    else{
      throw new Error(`result.totalが数値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
    }
  }
  else if( isNaN(result.total) ){
    throw new Error(`result.totalが数値ではありません。\nレイヤー : column_name\n関数 : listColumns`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「runSqlReadOnly_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function runSqlReadOnly( sql, params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof sql !== "string" ){
    if( !sql ){
      throw new Error(`sqlがNULLです。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await runSqlReadOnly_core( sql, params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : runSqlReadOnly`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( !Array.isArray(result[i]) ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
      }
      else{
        throw new Error(`result[${i}]が配列ではありません。\nレイヤー : column_name\n関数 : runSqlReadOnly`);
      }
    }
    for( let j=0; i<result[i].length; i++ ){
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「runSqlWriteOnly_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function runSqlWriteOnly( sql, params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof sql !== "string" ){
    if( !sql ){
      throw new Error(`sqlがNULLです。\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await runSqlWriteOnly_core( sql, params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : runSqlWriteOnly`);
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
// 関数「getTableId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTableId( columnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : column_name\n関数 : getTableId`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : column_name\n関数 : getTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTableId_core( columnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : column_name\n関数 : getTableId`);
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
      throw new Error(`resultがNULLです。\nレイヤー : column_name\n関数 : getTableId`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : column_name\n関数 : getTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


