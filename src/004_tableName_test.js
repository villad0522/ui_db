import {
  startUp_core,  // プログラム起動
  clearCache_core,  // インメモリキャッシュを削除する
  createTable_core,  // テーブルを作成
  deleteTable_core,  // 不可逆的にテーブルを削除
  disableTable_core,  // テーブルを無効化
  enableTable_core,  // テーブルを再度有効化
  updateTableName_core,  // テーブル名を変更
  listTables_core,  // テーブルの一覧を取得
  runSqlReadOnly_core,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly_core,  // SQLクエリ実行（書き込み専用）
} from "./005_tableName.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : tableName\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : tableName\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : tableName\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : tableName\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : tableName\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : tableName\n関数 : clearCache`);
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
// 関数「createTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createTable( tableName, isSystemTable ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : tableName\n関数 : createTable`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : tableName\n関数 : createTable`);
    }
  }
  if( typeof isSystemTable !== "boolean" ){
    if( !isSystemTable ){
      throw new Error(`isSystemTableがNULLです。\nレイヤー : tableName\n関数 : createTable`);
    }
    else{
      throw new Error(`isSystemTableがブール値ではありません。\nレイヤー : tableName\n関数 : createTable`);
    }
  }
  else if( isNaN(isSystemTable) ){
    throw new Error(`isSystemTableがブール値ではありません。\nレイヤー : tableName\n関数 : createTable`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createTable_core( tableName, isSystemTable );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : tableName\n関数 : createTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : createTable`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : tableName\n関数 : createTable`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : tableName\n関数 : createTable`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : tableName\n関数 : createTable`);
    }
  }
  if( typeof result.tableId !== "string" ){
    if( !result.tableId ){
      throw new Error(`result.tableIdがNULLです。\nレイヤー : tableName\n関数 : createTable`);
    }
    else{
      throw new Error(`result.tableIdが文字列ではありません。\nレイヤー : tableName\n関数 : createTable`);
    }
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
      throw new Error(`tableIdがNULLです。\nレイヤー : tableName\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : tableName\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : tableName\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : tableName\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「disableTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function disableTable( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : tableName\n関数 : disableTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : tableName\n関数 : disableTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await disableTable_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : tableName\n関数 : disableTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : disableTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : tableName\n関数 : disableTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「enableTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function enableTable( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : tableName\n関数 : enableTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : tableName\n関数 : enableTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await enableTable_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : tableName\n関数 : enableTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : enableTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : tableName\n関数 : enableTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateTableName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateTableName( tables ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(tables) ){
    if( !tables ){
      throw new Error(`tablesがNULLです。\nレイヤー : tableName\n関数 : updateTableName`);
    }
    else{
      throw new Error(`tablesが配列ではありません。\nレイヤー : tableName\n関数 : updateTableName`);
    }
  }
  for( let i=0; i<tables.length; i++ ){
    if( typeof tables[i] !== "object" ){
      if( !tables[i] ){
        throw new Error(`tables[${i}]がNULLです。\nレイヤー : tableName\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}]がオブジェクトではありません。\nレイヤー : tableName\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].id !== "string" ){
      if( !tables[i].id ){
        throw new Error(`tables[${i}].idがNULLです。\nレイヤー : tableName\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].idが文字列ではありません。\nレイヤー : tableName\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].name !== "string" ){
      if( !tables[i].name ){
        throw new Error(`tables[${i}].nameがNULLです。\nレイヤー : tableName\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].nameが文字列ではありません。\nレイヤー : tableName\n関数 : updateTableName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateTableName_core( tables );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : tableName\n関数 : updateTableName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : updateTableName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : tableName\n関数 : updateTableName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listTables_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listTables( pageNumber_tables, onePageMaxSize, isTrash ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageNumber_tables !== "number" ){
    if( !pageNumber_tables ){
      throw new Error(`pageNumber_tablesがNULLです。\nレイヤー : tableName\n関数 : listTables`);
    }
    else{
      throw new Error(`pageNumber_tablesが数値ではありません。\nレイヤー : tableName\n関数 : listTables`);
    }
  }
  else if( isNaN(pageNumber_tables) ){
    throw new Error(`pageNumber_tablesが数値ではありません。\nレイヤー : tableName\n関数 : listTables`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : tableName\n関数 : listTables`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : tableName\n関数 : listTables`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : tableName\n関数 : listTables`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : tableName\n関数 : listTables`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : tableName\n関数 : listTables`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : tableName\n関数 : listTables`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listTables_core( pageNumber_tables, onePageMaxSize, isTrash );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : tableName\n関数 : listTables`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : listTables`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : tableName\n関数 : listTables`);
    }
  }
  if( !Array.isArray(result.tables) ){
    if( !result.tables ){
      throw new Error(`result.tablesがNULLです。\nレイヤー : tableName\n関数 : listTables`);
    }
    else{
      throw new Error(`result.tablesが配列ではありません。\nレイヤー : tableName\n関数 : listTables`);
    }
  }
  for( let i=0; i<result.tables.length; i++ ){
    if( typeof result.tables[i] !== "object" ){
      if( !result.tables[i] ){
        throw new Error(`result.tables[${i}]がNULLです。\nレイヤー : tableName\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}]がオブジェクトではありません。\nレイヤー : tableName\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].id !== "string" ){
      if( !result.tables[i].id ){
        throw new Error(`result.tables[${i}].idがNULLです。\nレイヤー : tableName\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].idが文字列ではありません。\nレイヤー : tableName\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].name !== "string" ){
      if( !result.tables[i].name ){
        throw new Error(`result.tables[${i}].nameがNULLです。\nレイヤー : tableName\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].nameが文字列ではありません。\nレイヤー : tableName\n関数 : listTables`);
      }
    }
  }
  if( typeof result.tables_total !== "number" ){
    if( !result.tables_total ){
      throw new Error(`result.tables_totalがNULLです。\nレイヤー : tableName\n関数 : listTables`);
    }
    else{
      throw new Error(`result.tables_totalが数値ではありません。\nレイヤー : tableName\n関数 : listTables`);
    }
  }
  else if( isNaN(result.tables_total) ){
    throw new Error(`result.tables_totalが数値ではありません。\nレイヤー : tableName\n関数 : listTables`);
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
      throw new Error(`sqlがNULLです。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
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
      throw new Error(`${error}\nレイヤー : tableName\n関数 : runSqlReadOnly`);
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
      throw new Error(`resultがNULLです。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( !Array.isArray(result[i]) ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
      }
      else{
        throw new Error(`result[${i}]が配列ではありません。\nレイヤー : tableName\n関数 : runSqlReadOnly`);
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
      throw new Error(`sqlがNULLです。\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
    }
  }
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
    }
  }
  else if( typeof params[Symbol.iterator] !== "function" ){
    throw new Error(`paramsが反復可能オブジェクトではありません。\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
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
      throw new Error(`${error}\nレイヤー : tableName\n関数 : runSqlWriteOnly`);
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


