import {
  startUp_core,  // プログラム起動
  addViewColumn_core,  // ビューカラムを作成
  createColumn_core,  // カラムを作成
  createView_core,  // ビューを作成
  listViewColumns_core,  // ビューカラムの一覧を取得
  deleteView_core,  // ビューを削除
  _deleteViewColumns_core,  // 【サブ関数】ビューカラムを一括削除
  regenerateInputElements_core,  // 【サブ関数】入力要素を全て作り直す
  _addViewColumn_core,  // 【サブ関数】ビューカラムを作成
  deletePage_core,  // ページを削除
  deleteTable_core,  // 不可逆的にテーブルを削除
  updateView_core,  // ビューの情報を更新
  deleteViewColumn_core,  // ビューカラムを削除
  reorderViewColumnToRight_core,  // ビューカラムを右へ移動
  reorderViewColumnToLeft_core,  // ビューカラムを左へ移動
  getViewColumnFromColumn_core,  // カラムIDからビューカラムIDを取得
  clearCache_core,  // インメモリキャッシュを削除する
  getViewColumnName_core,  // ビューカラムの名前を取得
  getViewColumnFromName_core,  // 名前からビューカラムの情報を取得
  autoCorrectColumnsToParents_core,  // 新しいビューカラムの予測を取得（子→親）
  autoCorrectColumnsToChild_core,  // 新しいビューカラムの予測を取得（親→子）
  getViewColumnInfo_core,  // ビューカラムの情報を取得
} from "./062_view_column.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : view_column\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : view_column\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : view_column\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : view_column\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : view_column\n関数 : startUp`);
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
// 関数「addViewColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function addViewColumn( viewId, viewColumnType, columnPath, viewColumnName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : addViewColumn`);
  }
  if( typeof viewColumnType !== "string" ){
    if( !viewColumnType ){
      throw new Error(`viewColumnTypeがNULLです。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`viewColumnTypeが文字列ではありません。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
  }
  if( typeof columnPath !== "string" ){
    if( !columnPath ){
      throw new Error(`columnPathがNULLです。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`columnPathが文字列ではありません。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
  }
  if( typeof viewColumnName !== "string" ){
    if( !viewColumnName ){
      throw new Error(`viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : addViewColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : addViewColumn`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : view_column\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : view_column\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : view_column\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : view_column\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : view_column\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : view_column\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : view_column\n関数 : createColumn`);
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
      throw new Error(`${error}\nレイヤー : view_column\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : view_column\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : view_column\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : view_column\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : view_column\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : view_column\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createView( pageId, tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : view_column\n関数 : createView`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : view_column\n関数 : createView`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : view_column\n関数 : createView`);
  }
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : view_column\n関数 : createView`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : view_column\n関数 : createView`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createView_core( pageId, tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : createView`);
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
// 関数「listViewColumns_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listViewColumns( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listViewColumns_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : listViewColumns`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
    }
    if( typeof result[i].viewColumnId !== "string" ){
      if( !result[i].viewColumnId ){
        throw new Error(`result[${i}].viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
      else{
        throw new Error(`result[${i}].viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
    }
    if( typeof result[i].viewColumnType !== "string" ){
      if( !result[i].viewColumnType ){
        throw new Error(`result[${i}].viewColumnTypeがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
      else{
        throw new Error(`result[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
    }
    if( typeof result[i].columnPath !== "string" ){
      if( !result[i].columnPath ){
        throw new Error(`result[${i}].columnPathがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
      else{
        throw new Error(`result[${i}].columnPathが文字列ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
    }
    if( typeof result[i].viewColumnName !== "string" ){
      if( !result[i].viewColumnName ){
        throw new Error(`result[${i}].viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
      else{
        throw new Error(`result[${i}].viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
    }
    if( typeof result[i].excelColumnText !== "string" ){
      if( !result[i].excelColumnText ){
        throw new Error(`result[${i}].excelColumnTextがNULLです。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
      else{
        throw new Error(`result[${i}].excelColumnTextが文字列ではありません。\nレイヤー : view_column\n関数 : listViewColumns`);
      }
    }
  }
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
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : deleteView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : deleteView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : deleteView`);
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
      throw new Error(`${error}\nレイヤー : view_column\n関数 : deleteView`);
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
// 関数「_deleteViewColumns_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _deleteViewColumns( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : _deleteViewColumns`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : _deleteViewColumns`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : _deleteViewColumns`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _deleteViewColumns_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : _deleteViewColumns`);
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
// 関数「regenerateInputElements_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function regenerateInputElements( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : regenerateInputElements`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : regenerateInputElements`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : regenerateInputElements`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await regenerateInputElements_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : regenerateInputElements`);
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
// 関数「_addViewColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _addViewColumn( viewId, viewColumnType, columnPath, viewColumnName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : _addViewColumn`);
  }
  if( typeof viewColumnType !== "string" ){
    if( !viewColumnType ){
      throw new Error(`viewColumnTypeがNULLです。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
    else{
      throw new Error(`viewColumnTypeが文字列ではありません。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
  }
  if( typeof columnPath !== "string" ){
    if( !columnPath ){
      throw new Error(`columnPathがNULLです。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
    else{
      throw new Error(`columnPathが文字列ではありません。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
  }
  if( typeof viewColumnName !== "string" ){
    if( !viewColumnName ){
      throw new Error(`viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
    else{
      throw new Error(`viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : _addViewColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : _addViewColumn`);
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
// 関数「deletePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deletePage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : view_column\n関数 : deletePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : view_column\n関数 : deletePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : view_column\n関数 : deletePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deletePage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : deletePage`);
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
// 関数「deleteTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteTable( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : view_column\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : view_column\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : view_column\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : view_column\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateView_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateView( params ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof params !== "object" ){
    if( !params ){
      throw new Error(`paramsがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  if( typeof params.viewName !== "string" ){
    if( !params.viewName ){
      throw new Error(`params.viewNameがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.viewNameが文字列ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  if( typeof params.isTableHeader !== "boolean" ){
    if( !params.isTableHeader ){
      throw new Error(`params.isTableHeaderがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.isTableHeaderがブール値ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  else if( isNaN(params.isTableHeader) ){
    throw new Error(`params.isTableHeaderがブール値ではありません。\nレイヤー : view_column\n関数 : updateView`);
  }
  if( typeof params.sheetName !== "string" ){
    if( !params.sheetName ){
      throw new Error(`params.sheetNameがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.sheetNameが文字列ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  if( typeof params.viewType !== "string" ){
    if( !params.viewType ){
      throw new Error(`params.viewTypeがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.viewTypeが文字列ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  if( typeof params.excelStartRow !== "number" ){
    if( !params.excelStartRow ){
      throw new Error(`params.excelStartRowがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.excelStartRowが数値ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  else if( isNaN(params.excelStartRow) ){
    throw new Error(`params.excelStartRowが数値ではありません。\nレイヤー : view_column\n関数 : updateView`);
  }
  if( typeof params.excelStartColumn !== "number" ){
    if( !params.excelStartColumn ){
      throw new Error(`params.excelStartColumnがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.excelStartColumnが数値ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  else if( isNaN(params.excelStartColumn) ){
    throw new Error(`params.excelStartColumnが数値ではありません。\nレイヤー : view_column\n関数 : updateView`);
  }
  if( !Array.isArray(params.viewColumns) ){
    if( !params.viewColumns ){
      throw new Error(`params.viewColumnsがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`params.viewColumnsが配列ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  for( let i=0; i<params.viewColumns.length; i++ ){
    if( typeof params.viewColumns[i] !== "object" ){
      if( !params.viewColumns[i] ){
        throw new Error(`params.viewColumns[${i}]がNULLです。\nレイヤー : view_column\n関数 : updateView`);
      }
      else{
        throw new Error(`params.viewColumns[${i}]がオブジェクトではありません。\nレイヤー : view_column\n関数 : updateView`);
      }
    }
    if( typeof params.viewColumns[i].viewColumnId !== "string" ){
      if( !params.viewColumns[i].viewColumnId ){
        throw new Error(`params.viewColumns[${i}].viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : updateView`);
      }
      else{
        throw new Error(`params.viewColumns[${i}].viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : updateView`);
      }
    }
    if( typeof params.viewColumns[i].viewColumnName !== "string" ){
      if( !params.viewColumns[i].viewColumnName ){
        throw new Error(`params.viewColumns[${i}].viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : updateView`);
      }
      else{
        throw new Error(`params.viewColumns[${i}].viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : updateView`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateView_core( params );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : updateView`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : updateView`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : view_column\n関数 : updateView`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「deleteViewColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteViewColumn( viewId, viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : deleteViewColumn`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : deleteViewColumn`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : deleteViewColumn`);
  }
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : deleteViewColumn`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : deleteViewColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteViewColumn_core( viewId, viewColumnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : deleteViewColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : deleteViewColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : view_column\n関数 : deleteViewColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「reorderViewColumnToRight_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function reorderViewColumnToRight( viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : reorderViewColumnToRight`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : reorderViewColumnToRight`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await reorderViewColumnToRight_core( viewColumnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : reorderViewColumnToRight`);
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
// 関数「reorderViewColumnToLeft_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function reorderViewColumnToLeft( viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : reorderViewColumnToLeft`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : reorderViewColumnToLeft`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await reorderViewColumnToLeft_core( viewColumnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : reorderViewColumnToLeft`);
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
// 関数「getViewColumnFromColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getViewColumnFromColumn( columnId, viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
    }
  }
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getViewColumnFromColumn_core( columnId, viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromColumn`);
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
      throw new Error(`${error}\nレイヤー : view_column\n関数 : clearCache`);
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
// 関数「getViewColumnName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getViewColumnName( viewId, viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : getViewColumnName`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : getViewColumnName`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : getViewColumnName`);
  }
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : getViewColumnName`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getViewColumnName_core( viewId, viewColumnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : getViewColumnName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : getViewColumnName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getViewColumnFromName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getViewColumnFromName( viewColumnName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewColumnName !== "string" ){
    if( !viewColumnName ){
      throw new Error(`viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
    else{
      throw new Error(`viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getViewColumnFromName_core( viewColumnName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : getViewColumnFromName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
  }
  if( typeof result.viewColumnType !== "string" ){
    if( !result.viewColumnType ){
      throw new Error(`result.viewColumnTypeがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
    else{
      throw new Error(`result.viewColumnTypeが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
  }
  if( typeof result.columnPath !== "string" ){
    if( !result.columnPath ){
      throw new Error(`result.columnPathがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
    else{
      throw new Error(`result.columnPathが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
  }
  if( typeof result.viewColumnName !== "string" ){
    if( !result.viewColumnName ){
      throw new Error(`result.viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
    else{
      throw new Error(`result.viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
  }
  if( typeof result.excelColumnText !== "string" ){
    if( !result.excelColumnText ){
      throw new Error(`result.excelColumnTextがNULLです。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
    else{
      throw new Error(`result.excelColumnTextが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnFromName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「autoCorrectColumnsToParents_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectColumnsToParents( viewId, inputText, columnNames ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
  }
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
  }
  if( !Array.isArray(columnNames) ){
    if( !columnNames ){
      throw new Error(`columnNamesがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
    else{
      throw new Error(`columnNamesが配列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
  }
  for( let i=0; i<columnNames.length; i++ ){
    if( typeof columnNames[i] !== "number" ){
      if( !columnNames[i] ){
        throw new Error(`columnNames[${i}]がNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
      }
      else{
        throw new Error(`columnNames[${i}]が数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
      }
    }
    else if( isNaN(columnNames[i]) ){
      throw new Error(`columnNames[${i}]が数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectColumnsToParents_core( viewId, inputText, columnNames );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToParents`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「autoCorrectColumnsToChild_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectColumnsToChild( viewId, inputText, columnNames ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
  }
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
  }
  if( !Array.isArray(columnNames) ){
    if( !columnNames ){
      throw new Error(`columnNamesがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
    else{
      throw new Error(`columnNamesが配列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
  }
  for( let i=0; i<columnNames.length; i++ ){
    if( typeof columnNames[i] !== "number" ){
      if( !columnNames[i] ){
        throw new Error(`columnNames[${i}]がNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
      }
      else{
        throw new Error(`columnNames[${i}]が数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
      }
    }
    else if( isNaN(columnNames[i]) ){
      throw new Error(`columnNames[${i}]が数値ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectColumnsToChild_core( viewId, inputText, columnNames );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : view_column\n関数 : autoCorrectColumnsToChild`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getViewColumnInfo_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getViewColumnInfo( viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getViewColumnInfo_core( viewColumnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : view_column\n関数 : getViewColumnInfo`);
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
      throw new Error(`resultがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  if( typeof result.viewColumnId !== "string" ){
    if( !result.viewColumnId ){
      throw new Error(`result.viewColumnIdがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`result.viewColumnIdが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  if( typeof result.viewColumnType !== "string" ){
    if( !result.viewColumnType ){
      throw new Error(`result.viewColumnTypeがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`result.viewColumnTypeが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  if( typeof result.columnPath !== "string" ){
    if( !result.columnPath ){
      throw new Error(`result.columnPathがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`result.columnPathが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  if( typeof result.viewColumnName !== "string" ){
    if( !result.viewColumnName ){
      throw new Error(`result.viewColumnNameがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`result.viewColumnNameが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  if( typeof result.excelColumnText !== "string" ){
    if( !result.excelColumnText ){
      throw new Error(`result.excelColumnTextがNULLです。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
    else{
      throw new Error(`result.excelColumnTextが文字列ではありません。\nレイヤー : view_column\n関数 : getViewColumnInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


