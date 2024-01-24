import {
  startUp_core,  // プログラム起動
  createView_core,  // ビューを作成
  deleteView_core,  // ビューを削除
  generateSQL_core,  // SQLクエリを生成
  createColumn_core,  // カラムを作成
  addJoinedColumn_core,  // 結合済み列を作成
  getSimpleSQL_core,  // 最低限のSQLクエリを生成する
} from "./038_view.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : view\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : view\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : view\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : view\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : view\n関数 : startUp`);
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
// 関数「createView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createView( pageId, tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : view\n関数 : createView`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : view\n関数 : createView`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : view\n関数 : createView`);
  }
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : view\n関数 : createView`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : view\n関数 : createView`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createView_core( pageId, tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view\n関数 : createView`);
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
// 関数「deleteView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteView( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view\n関数 : deleteView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view\n関数 : deleteView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view\n関数 : deleteView`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteView_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view\n関数 : deleteView`);
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
export async function generateSQL( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view\n関数 : generateSQL`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view\n関数 : generateSQL`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view\n関数 : generateSQL`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view\n関数 : generateSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view\n関数 : generateSQL`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : view\n関数 : generateSQL`);
    }
  }
  if( typeof result.sql !== "string" ){
    if( !result.sql ){
      throw new Error(`result.sqlがNULLです。\nレイヤー : view\n関数 : generateSQL`);
    }
    else{
      throw new Error(`result.sqlが文字列ではありません。\nレイヤー : view\n関数 : generateSQL`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : view\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : view\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : view\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : view\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : view\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : view\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : view\n関数 : createColumn`);
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
      throw new Error(`${error}\nレイヤー : view\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : view\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : view\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : view\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : view\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : view\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「addJoinedColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function addJoinedColumn( viewId, joinedColumnType, columnPath, joinedColumnName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view\n関数 : addJoinedColumn`);
  }
  if( typeof joinedColumnType !== "string" ){
    if( !joinedColumnType ){
      throw new Error(`joinedColumnTypeがNULLです。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`joinedColumnTypeが文字列ではありません。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
  }
  if( typeof columnPath !== "string" ){
    if( !columnPath ){
      throw new Error(`columnPathがNULLです。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`columnPathが文字列ではありません。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
  }
  if( typeof joinedColumnName !== "string" ){
    if( !joinedColumnName ){
      throw new Error(`joinedColumnNameがNULLです。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
    else{
      throw new Error(`joinedColumnNameが文字列ではありません。\nレイヤー : view\n関数 : addJoinedColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await addJoinedColumn_core( viewId, joinedColumnType, columnPath, joinedColumnName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view\n関数 : addJoinedColumn`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : view\n関数 : getSimpleSQL`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : view\n関数 : getSimpleSQL`);
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
      throw new Error(`${error}\nレイヤー : view\n関数 : getSimpleSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view\n関数 : getSimpleSQL`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : view\n関数 : getSimpleSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


