import {
  startUp_core,  // プログラム起動
  createJoinedTable_core,  // 結合済みテーブルを作成
  deleteJoinedTable_core,  // 結合済みテーブルを削除
  generateSQL_core,  // SQLクエリを生成
  createColumn_core,  // カラムを作成
  addJoinedColumn_core,  // 結合済み列を作成
  getSimpleSQL_core,  // 最低限のSQLクエリを生成する
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
export async function deleteJoinedTable( joinedTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof joinedTableId !== "number" ){
    if( !joinedTableId ){
      throw new Error(`joinedTableIdがNULLです。\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
    }
    else{
      throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
    }
  }
  else if( isNaN(joinedTableId) ){
    throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : joined_table\n関数 : deleteJoinedTable`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteJoinedTable_core( joinedTableId );
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
export async function generateSQL( joinedTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof joinedTableId !== "number" ){
    if( !joinedTableId ){
      throw new Error(`joinedTableIdがNULLです。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
    else{
      throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : joined_table\n関数 : generateSQL`);
    }
  }
  else if( isNaN(joinedTableId) ){
    throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : joined_table\n関数 : generateSQL`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( joinedTableId );
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


//#######################################################################################
// 関数「createColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createColumn( tableId, columnName, dataType, parentTableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : joined_table\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : joined_table\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : joined_table\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : joined_table\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : joined_table\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : joined_table\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : joined_table\n関数 : createColumn`);
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
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : joined_table\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : joined_table\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : joined_table\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : joined_table\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : joined_table\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : joined_table\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「addJoinedColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function addJoinedColumn( joinedTableId, joinedColumnType, columnPath, joinedColumnName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof joinedTableId !== "number" ){
    if( !joinedTableId ){
      throw new Error(`joinedTableIdがNULLです。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
  }
  else if( isNaN(joinedTableId) ){
    throw new Error(`joinedTableIdが数値ではありません。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
  }
  if( typeof joinedColumnType !== "string" ){
    if( !joinedColumnType ){
      throw new Error(`joinedColumnTypeがNULLです。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`joinedColumnTypeが文字列ではありません。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
  }
  if( typeof columnPath !== "string" ){
    if( !columnPath ){
      throw new Error(`columnPathがNULLです。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`columnPathが文字列ではありません。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
  }
  if( typeof joinedColumnName !== "string" ){
    if( !joinedColumnName ){
      throw new Error(`joinedColumnNameがNULLです。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`joinedColumnNameが文字列ではありません。\nレイヤー : joined_table\n関数 : addJoinedColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await addJoinedColumn_core( joinedTableId, joinedColumnType, columnPath, joinedColumnName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : addJoinedColumn`);
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
// 関数「getSimpleSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getSimpleSQL( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : joined_table\n関数 : getSimpleSQL`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : joined_table\n関数 : getSimpleSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getSimpleSQL_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : joined_table\n関数 : getSimpleSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : joined_table\n関数 : getSimpleSQL`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : joined_table\n関数 : getSimpleSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


