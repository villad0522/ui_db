import {
  startUp_core,  // プログラム起動
  clearCache_core,  // インメモリキャッシュを削除する
  createTable_core,  // テーブルを作成
  deleteTable_core,  // 不可逆的にテーブルを削除
  disableTable_core,  // テーブルを無効化
  enableTable_core,  // テーブルを再度有効化
  updateTableName_core,  // テーブル名を変更
  listTables_core,  // テーブルの一覧を取得(GUI)
  runSqlReadOnly_core,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly_core,  // SQLクエリ実行（書き込み専用）
  checkTableEnabled_core,  // テーブルが有効なのか判定
  getTableName_core,  // IDからテーブル名を取得
  reload_core,  // 【サブ関数】メモリに再読み込み
  listTableNamesAll_core,  // テーブルの一覧を取得（高速）
  getTableIdFromName_core,  // テーブル名からIDを取得
} from "./104_table_name.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : table_name\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : table_name\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : table_name\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : table_name\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : clearCache`);
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
export async function createTable( tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : table_name\n関数 : createTable`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : table_name\n関数 : createTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createTable_core( tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : table_name\n関数 : createTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : createTable`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : table_name\n関数 : createTable`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : table_name\n関数 : createTable`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : table_name\n関数 : createTable`);
    }
  }
  if( typeof result.tableId !== "string" ){
    if( !result.tableId ){
      throw new Error(`result.tableIdがNULLです。\nレイヤー : table_name\n関数 : createTable`);
    }
    else{
      throw new Error(`result.tableIdが文字列ではありません。\nレイヤー : table_name\n関数 : createTable`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : table_name\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : table_name\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : table_name\n関数 : deleteTable`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : table_name\n関数 : disableTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : table_name\n関数 : disableTable`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : disableTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : disableTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : table_name\n関数 : disableTable`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : table_name\n関数 : enableTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : table_name\n関数 : enableTable`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : enableTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : enableTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : table_name\n関数 : enableTable`);
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
      throw new Error(`tablesがNULLです。\nレイヤー : table_name\n関数 : updateTableName`);
    }
    else{
      throw new Error(`tablesが配列ではありません。\nレイヤー : table_name\n関数 : updateTableName`);
    }
  }
  for( let i=0; i<tables.length; i++ ){
    if( typeof tables[i] !== "object" ){
      if( !tables[i] ){
        throw new Error(`tables[${i}]がNULLです。\nレイヤー : table_name\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}]がオブジェクトではありません。\nレイヤー : table_name\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].id !== "string" ){
      if( !tables[i].id ){
        throw new Error(`tables[${i}].idがNULLです。\nレイヤー : table_name\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].idが文字列ではありません。\nレイヤー : table_name\n関数 : updateTableName`);
      }
    }
    if( typeof tables[i].name !== "string" ){
      if( !tables[i].name ){
        throw new Error(`tables[${i}].nameがNULLです。\nレイヤー : table_name\n関数 : updateTableName`);
      }
      else{
        throw new Error(`tables[${i}].nameが文字列ではありません。\nレイヤー : table_name\n関数 : updateTableName`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : updateTableName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : updateTableName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : table_name\n関数 : updateTableName`);
    }
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
  if( (pageNumber===null) || (pageNumber===undefined) ){
    // pageNumberは空欄OK。
  }
  else if( typeof pageNumber !== "number" ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : table_name\n関数 : listTables`);
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : table_name\n関数 : listTables`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : table_name\n関数 : listTables`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : table_name\n関数 : listTables`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : table_name\n関数 : listTables`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : table_name\n関数 : listTables`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : table_name\n関数 : listTables`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : table_name\n関数 : listTables`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : listTables`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : listTables`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : table_name\n関数 : listTables`);
    }
  }
  if( !Array.isArray(result.tables) ){
    if( !result.tables ){
      throw new Error(`result.tablesがNULLです。\nレイヤー : table_name\n関数 : listTables`);
    }
    else{
      throw new Error(`result.tablesが配列ではありません。\nレイヤー : table_name\n関数 : listTables`);
    }
  }
  for( let i=0; i<result.tables.length; i++ ){
    if( typeof result.tables[i] !== "object" ){
      if( !result.tables[i] ){
        throw new Error(`result.tables[${i}]がNULLです。\nレイヤー : table_name\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}]がオブジェクトではありません。\nレイヤー : table_name\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].id !== "string" ){
      if( !result.tables[i].id ){
        throw new Error(`result.tables[${i}].idがNULLです。\nレイヤー : table_name\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].idが文字列ではありません。\nレイヤー : table_name\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].name !== "string" ){
      if( !result.tables[i].name ){
        throw new Error(`result.tables[${i}].nameがNULLです。\nレイヤー : table_name\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].nameが文字列ではありません。\nレイヤー : table_name\n関数 : listTables`);
      }
    }
  }
  if( typeof result.total !== "number" ){
    if( !result.total ){
      throw new Error(`result.totalがNULLです。\nレイヤー : table_name\n関数 : listTables`);
    }
    else{
      throw new Error(`result.totalが数値ではありません。\nレイヤー : table_name\n関数 : listTables`);
    }
  }
  else if( isNaN(result.total) ){
    throw new Error(`result.totalが数値ではありません。\nレイヤー : table_name\n関数 : listTables`);
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
      throw new Error(`sqlがNULLです。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
  }
  if( params===null || params===undefined ){
    throw new Error(`paramsがNULLです。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
  }
  else if( typeof params !== "object" ){
    throw new Error(`paramsがオブジェクトではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
  }
  else if( params.constructor !== Object ){
    throw new Error(`paramsが辞書型ではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : runSqlReadOnly`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( result[i]===null || result[i]===undefined ){
      throw new Error(`result[${i}]がNULLです。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
    else if( typeof result[i] !== "object" ){
      throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
    else if( result[i].constructor !== Object ){
      throw new Error(`result[${i}]が辞書型ではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
    }
    for( const j in result[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result[${i}]のキーが文字列ではありません。\nレイヤー : table_name\n関数 : runSqlReadOnly`);
      }
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
      throw new Error(`sqlがNULLです。\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
    }
    else{
      throw new Error(`sqlが文字列ではありません。\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
    }
  }
  if( params===null || params===undefined ){
    throw new Error(`paramsがNULLです。\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
  }
  else if( typeof params !== "object" ){
    throw new Error(`paramsがオブジェクトではありません。\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
  }
  else if( params.constructor !== Object ){
    throw new Error(`paramsが辞書型ではありません。\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
  }
  for( const i in params ){
    if( typeof i !== "string" ){
      throw new Error(`paramsのキーが文字列ではありません。\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
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
      throw new Error(`${error}\nレイヤー : table_name\n関数 : runSqlWriteOnly`);
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
// 関数「checkTableEnabled_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkTableEnabled( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : table_name\n関数 : checkTableEnabled`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : table_name\n関数 : checkTableEnabled`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkTableEnabled_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : table_name\n関数 : checkTableEnabled`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "boolean" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : checkTableEnabled`);
    }
    else{
      throw new Error(`resultがブール値ではありません。\nレイヤー : table_name\n関数 : checkTableEnabled`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultがブール値ではありません。\nレイヤー : table_name\n関数 : checkTableEnabled`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getTableName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTableName( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : table_name\n関数 : getTableName`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : table_name\n関数 : getTableName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTableName_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : table_name\n関数 : getTableName`);
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
    throw new Error(`resultが文字列ではありません。\nレイヤー : table_name\n関数 : getTableName`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「reload_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function reload(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await reload_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : table_name\n関数 : reload`);
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
// 関数「listTableNamesAll_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listTableNamesAll(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listTableNamesAll_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : table_name\n関数 : listTableNamesAll`);
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
      throw new Error(`resultがNULLです。\nレイヤー : table_name\n関数 : listTableNamesAll`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : table_name\n関数 : listTableNamesAll`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : table_name\n関数 : listTableNamesAll`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : table_name\n関数 : listTableNamesAll`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getTableIdFromName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTableIdFromName( tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : table_name\n関数 : getTableIdFromName`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : table_name\n関数 : getTableIdFromName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTableIdFromName_core( tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : table_name\n関数 : getTableIdFromName`);
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
    throw new Error(`resultが文字列ではありません。\nレイヤー : table_name\n関数 : getTableIdFromName`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


