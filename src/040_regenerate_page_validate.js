import {
  regeneratePage_core,  // ページを再生成する
  createPage_core,  // ページを作成
  createView_core,  // ビューを作成
  startUp_core,  // プログラム起動
  updatePageName_core,  // ページ名やメモを変更
  deleteView_core,  // ビューを削除
  deletePage_core,  // ページを再帰的に削除
  pastePage_core,  // ページを貼り付ける
  deleteTable_core,  // 不可逆的にテーブルを削除
  updateView_core,  // ビューの情報を更新
  addViewColumn_core,  // ビューカラムを作成
  createColumn_core,  // カラムを作成
  reorderViewColumnToLeft_core,  // ビューカラムを左へ移動
  reorderViewColumnToRight_core,  // ビューカラムを右へ移動
  deleteViewColumn_core,  // ビューカラムを削除
} from "./041_regenerate_page.js";


//#######################################################################################
// 関数「regeneratePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function regeneratePage( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_page\n関数 : regeneratePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : regeneratePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : regeneratePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await regeneratePage_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : regeneratePage`);
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
// 関数「createPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createPage( parentPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof parentPageId !== "number" ){
    if( !parentPageId ){
      throw new Error(`parentPageIdがNULLです。\nレイヤー : regenerate_page\n関数 : createPage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : createPage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : createPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createPage_core( parentPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : createPage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_page\n関数 : createPage`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : regenerate_page\n関数 : createPage`);
    }
  }
  if( typeof result.pageId !== "number" ){
    if( !result.pageId ){
      throw new Error(`result.pageIdがNULLです。\nレイヤー : regenerate_page\n関数 : createPage`);
    }
    else{
      throw new Error(`result.pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : createPage`);
    }
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : createPage`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_page\n関数 : createView`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : createView`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : createView`);
  }
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : regenerate_page\n関数 : createView`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createView`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : createView`);
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
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl, isDebug ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : regenerate_page\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : regenerate_page\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : regenerate_page\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : regenerate_page\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : startUp`);
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
// 関数「updatePageName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updatePageName( pageId, pageName, memo, isExcel ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
  }
  if( typeof pageName !== "string" ){
    if( !pageName ){
      throw new Error(`pageNameがNULLです。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
    else{
      throw new Error(`pageNameが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
  }
  if( typeof memo !== "string" ){
    if( !memo ){
      throw new Error(`memoがNULLです。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
    else{
      throw new Error(`memoが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
  }
  if( typeof isExcel !== "boolean" ){
    if( !isExcel ){
      throw new Error(`isExcelがNULLです。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
    else{
      throw new Error(`isExcelがブール値ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
  }
  else if( isNaN(isExcel) ){
    throw new Error(`isExcelがブール値ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updatePageName_core( pageId, pageName, memo, isExcel );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : updatePageName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_page\n関数 : updatePageName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updatePageName`);
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
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_page\n関数 : deleteView`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : deleteView`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : deleteView`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : deleteView`);
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
      throw new Error(`pageIdがNULLです。\nレイヤー : regenerate_page\n関数 : deletePage`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : deletePage`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : deletePage`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : deletePage`);
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
// 関数「pastePage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function pastePage( newParentId, afterPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof newParentId !== "number" ){
    if( !newParentId ){
      throw new Error(`newParentIdがNULLです。\nレイヤー : regenerate_page\n関数 : pastePage`);
    }
    else{
      throw new Error(`newParentIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : pastePage`);
    }
  }
  else if( isNaN(newParentId) ){
    throw new Error(`newParentIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : pastePage`);
  }
  if( (afterPageId===null) || (afterPageId===undefined) ){
    // afterPageIdは空欄OK。
  }
  else if( typeof afterPageId !== "number" ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : pastePage`);
  }
  else if( isNaN(afterPageId) ){
    throw new Error(`afterPageIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : pastePage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await pastePage_core( newParentId, afterPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : pastePage`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_page\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_page\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_page\n関数 : deleteTable`);
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
      throw new Error(`paramsがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`paramsがオブジェクトではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  if( typeof params.viewName !== "string" ){
    if( !params.viewName ){
      throw new Error(`params.viewNameがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`params.viewNameが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  if( typeof params.isTableHeader !== "boolean" ){
    if( !params.isTableHeader ){
      throw new Error(`params.isTableHeaderがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`params.isTableHeaderがブール値ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  else if( isNaN(params.isTableHeader) ){
    throw new Error(`params.isTableHeaderがブール値ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
  }
  if( typeof params.sheetName !== "string" ){
    if( !params.sheetName ){
      throw new Error(`params.sheetNameがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`params.sheetNameが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  if( typeof params.viewType !== "string" ){
    if( !params.viewType ){
      throw new Error(`params.viewTypeがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`params.viewTypeが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  if( typeof params.excelStartRow !== "number" ){
    if( !params.excelStartRow ){
      throw new Error(`params.excelStartRowがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`params.excelStartRowが数値ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  else if( isNaN(params.excelStartRow) ){
    throw new Error(`params.excelStartRowが数値ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
  }
  if( typeof params.excelStartColumn !== "number" ){
    if( !params.excelStartColumn ){
      throw new Error(`params.excelStartColumnがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`params.excelStartColumnが数値ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
  else if( isNaN(params.excelStartColumn) ){
    throw new Error(`params.excelStartColumnが数値ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : updateView`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_page\n関数 : updateView`);
    }
  }
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
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
  }
  if( typeof viewColumnType !== "string" ){
    if( !viewColumnType ){
      throw new Error(`viewColumnTypeがNULLです。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`viewColumnTypeが文字列ではありません。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
  }
  if( typeof columnPath !== "string" ){
    if( !columnPath ){
      throw new Error(`columnPathがNULLです。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`columnPathが文字列ではありません。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
  }
  if( typeof viewColumnName !== "string" ){
    if( !viewColumnName ){
      throw new Error(`viewColumnNameがNULLです。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
    }
    else{
      throw new Error(`viewColumnNameが文字列ではありません。\nレイヤー : regenerate_page\n関数 : addViewColumn`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : addViewColumn`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : createColumn`);
    }
  }
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
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : regenerate_page\n関数 : reorderViewColumnToLeft`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : reorderViewColumnToLeft`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : reorderViewColumnToLeft`);
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
// 関数「reorderViewColumnToRight_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function reorderViewColumnToRight( viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : regenerate_page\n関数 : reorderViewColumnToRight`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : reorderViewColumnToRight`);
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
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : reorderViewColumnToRight`);
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
// 関数「deleteViewColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteViewColumn( viewColumnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewColumnId !== "string" ){
    if( !viewColumnId ){
      throw new Error(`viewColumnIdがNULLです。\nレイヤー : regenerate_page\n関数 : deleteViewColumn`);
    }
    else{
      throw new Error(`viewColumnIdが文字列ではありません。\nレイヤー : regenerate_page\n関数 : deleteViewColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteViewColumn_core( viewColumnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_page\n関数 : deleteViewColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_page\n関数 : deleteViewColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : regenerate_page\n関数 : deleteViewColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


