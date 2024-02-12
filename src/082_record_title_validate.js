import {
  startUp_core,  // プログラム起動
  setTitleColumn_core,  // 【サブ】見出しの役割を果たすカラムを登録する
  getTitleColumnId_core,  // 【サブ】見出しの役割を果たすカラムを取得する
  listTables_core,  // テーブルの一覧を取得(重)
  deleteTable_core,  // 不可逆的にテーブルを削除
  clearCache_core,  // インメモリキャッシュを削除する
  _getRecordIdFromTitle_core,  // 【サブ】文字列からレコードIDを取得
  createColumn_core,  // カラムを作成
  setTitleColumnsFromUI_core,  // 見出しの役割を果たすカラムを登録する
  _deleteTitleColumn_core,  // 【サブ】見出しを登録解除する
  listRecords_core,  // レコードの一覧を取得(GUI)
  _getParentValue_core,  // 【サブ】親テーブルの値を取得
  createRecordFromUI_core,  // レコードを追加
  _getRecordOffset_core,  // 【サブ】親テーブルのスクロール位置を取得
} from "./083_record_title.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : record_title\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : record_title\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : record_title\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : record_title\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : startUp`);
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
      throw new Error(`columnIdがNULLです。\nレイヤー : record_title\n関数 : setTitleColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : record_title\n関数 : setTitleColumn`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : setTitleColumn`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : getTitleColumnId`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : getTitleColumnId`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : getTitleColumnId`);
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
    throw new Error(`resultが文字列ではありません。\nレイヤー : record_title\n関数 : getTitleColumnId`);
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
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : record_title\n関数 : listTables`);
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : record_title\n関数 : listTables`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : record_title\n関数 : listTables`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title\n関数 : listTables`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title\n関数 : listTables`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : record_title\n関数 : listTables`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : record_title\n関数 : listTables`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : record_title\n関数 : listTables`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : listTables`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : listTables`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title\n関数 : listTables`);
    }
  }
  if( !Array.isArray(result.tables) ){
    if( !result.tables ){
      throw new Error(`result.tablesがNULLです。\nレイヤー : record_title\n関数 : listTables`);
    }
    else{
      throw new Error(`result.tablesが配列ではありません。\nレイヤー : record_title\n関数 : listTables`);
    }
  }
  for( let i=0; i<result.tables.length; i++ ){
    if( typeof result.tables[i] !== "object" ){
      if( !result.tables[i] ){
        throw new Error(`result.tables[${i}]がNULLです。\nレイヤー : record_title\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}]がオブジェクトではありません。\nレイヤー : record_title\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].id !== "string" ){
      if( !result.tables[i].id ){
        throw new Error(`result.tables[${i}].idがNULLです。\nレイヤー : record_title\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].idが文字列ではありません。\nレイヤー : record_title\n関数 : listTables`);
      }
    }
    if( typeof result.tables[i].name !== "string" ){
      if( !result.tables[i].name ){
        throw new Error(`result.tables[${i}].nameがNULLです。\nレイヤー : record_title\n関数 : listTables`);
      }
      else{
        throw new Error(`result.tables[${i}].nameが文字列ではありません。\nレイヤー : record_title\n関数 : listTables`);
      }
    }
    if( (result.tables[i].titleColumnId===null) || (result.tables[i].titleColumnId===undefined) ){
      // result.tables[i].titleColumnIdは空欄OK。
    }
    else if( typeof result.tables[i].titleColumnId !== "string" ){
      throw new Error(`result.tables[${i}].titleColumnIdが文字列ではありません。\nレイヤー : record_title\n関数 : listTables`);
    }
  }
  if( typeof result.total !== "number" ){
    if( !result.total ){
      throw new Error(`result.totalがNULLです。\nレイヤー : record_title\n関数 : listTables`);
    }
    else{
      throw new Error(`result.totalが数値ではありません。\nレイヤー : record_title\n関数 : listTables`);
    }
  }
  else if( isNaN(result.total) ){
    throw new Error(`result.totalが数値ではありません。\nレイヤー : record_title\n関数 : listTables`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : record_title\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : clearCache`);
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
// 関数「_getRecordIdFromTitle_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getRecordIdFromTitle( tableId, titleText ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
    }
  }
  if( typeof titleText !== "string" ){
    if( !titleText ){
      throw new Error(`titleTextがNULLです。\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
    }
    else{
      throw new Error(`titleTextが文字列ではありません。\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getRecordIdFromTitle_core( tableId, titleText );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
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
  else if( typeof result !== "number" ){
    throw new Error(`resultが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordIdFromTitle`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : record_title\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : record_title\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : record_title\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : record_title\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : record_title\n関数 : createColumn`);
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
      throw new Error(`${error}\nレイヤー : record_title\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : record_title\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : record_title\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : record_title\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : record_title\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「setTitleColumnsFromUI_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function setTitleColumnsFromUI( columns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(columns) ){
    if( !columns ){
      throw new Error(`columnsがNULLです。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
    }
    else{
      throw new Error(`columnsが配列ではありません。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
    }
  }
  for( let i=0; i<columns.length; i++ ){
    if( typeof columns[i] !== "object" ){
      if( !columns[i] ){
        throw new Error(`columns[${i}]がNULLです。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
      }
      else{
        throw new Error(`columns[${i}]がオブジェクトではありません。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
      }
    }
    if( typeof columns[i].id !== "string" ){
      if( !columns[i].id ){
        throw new Error(`columns[${i}].idがNULLです。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
      }
      else{
        throw new Error(`columns[${i}].idが文字列ではありません。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
      }
    }
    if( typeof columns[i].titleColumn !== "string" ){
      if( !columns[i].titleColumn ){
        throw new Error(`columns[${i}].titleColumnがNULLです。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
      }
      else{
        throw new Error(`columns[${i}].titleColumnが文字列ではありません。\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await setTitleColumnsFromUI_core( columns );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : setTitleColumnsFromUI`);
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
// 関数「_deleteTitleColumn_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _deleteTitleColumn( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : _deleteTitleColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : _deleteTitleColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _deleteTitleColumn_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : _deleteTitleColumn`);
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
// 関数「listRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listRecords( tableId, oldPageNumber, onePageMaxSize, focusRecordId, pasteRecordId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  if( (oldPageNumber===null) || (oldPageNumber===undefined) ){
    // oldPageNumberは空欄OK。
  }
  else if( typeof oldPageNumber !== "number" ){
    throw new Error(`oldPageNumberが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  else if( isNaN(oldPageNumber) ){
    throw new Error(`oldPageNumberが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  if( (focusRecordId===null) || (focusRecordId===undefined) ){
    // focusRecordIdは空欄OK。
  }
  else if( typeof focusRecordId !== "number" ){
    throw new Error(`focusRecordIdが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  else if( isNaN(focusRecordId) ){
    throw new Error(`focusRecordIdが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  if( (pasteRecordId===null) || (pasteRecordId===undefined) ){
    // pasteRecordIdは空欄OK。
  }
  else if( typeof pasteRecordId !== "number" ){
    throw new Error(`pasteRecordIdが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  else if( isNaN(pasteRecordId) ){
    throw new Error(`pasteRecordIdが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listRecords_core( tableId, oldPageNumber, onePageMaxSize, focusRecordId, pasteRecordId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : listRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  if( !Array.isArray(result.columns) ){
    if( !result.columns ){
      throw new Error(`result.columnsがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.columnsが配列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  for( let i=0; i<result.columns.length; i++ ){
    if( typeof result.columns[i] !== "object" ){
      if( !result.columns[i] ){
        throw new Error(`result.columns[${i}]がNULLです。\nレイヤー : record_title\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}]がオブジェクトではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
    if( typeof result.columns[i].id !== "string" ){
      if( !result.columns[i].id ){
        throw new Error(`result.columns[${i}].idがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].idが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
    if( typeof result.columns[i].name !== "string" ){
      if( !result.columns[i].name ){
        throw new Error(`result.columns[${i}].nameがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].nameが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
    if( (result.columns[i].titleColumn===null) || (result.columns[i].titleColumn===undefined) ){
      // result.columns[i].titleColumnは空欄OK。
    }
    else if( typeof result.columns[i].titleColumn !== "string" ){
      throw new Error(`result.columns[${i}].titleColumnが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
    if( typeof result.columns[i].titleColumn_flag !== "boolean" ){
      if( !result.columns[i].titleColumn_flag ){
        throw new Error(`result.columns[${i}].titleColumn_flagがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].titleColumn_flagがブール値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
    else if( isNaN(result.columns[i].titleColumn_flag) ){
      throw new Error(`result.columns[${i}].titleColumn_flagがブール値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
    if( !Array.isArray(result.columns[i].titleColumn_option) ){
      if( !result.columns[i].titleColumn_option ){
        throw new Error(`result.columns[${i}].titleColumn_optionがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].titleColumn_optionが配列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
    for( let j=0; j<result.columns[i].titleColumn_option.length; j++ ){
      if( typeof result.columns[i].titleColumn_option[j] !== "string" ){
        if( !result.columns[i].titleColumn_option[j] ){
          throw new Error(`result.columns[${i}].titleColumn_option[${j}]がNULLです。\nレイヤー : record_title\n関数 : listRecords`);
        }
        else{
          throw new Error(`result.columns[${i}].titleColumn_option[${j}]が文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
        }
      }
    }
    if( typeof result.columns[i].dataType !== "string" ){
      if( !result.columns[i].dataType ){
        throw new Error(`result.columns[${i}].dataTypeがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].dataTypeが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
    if( (result.columns[i].parentTableId===null) || (result.columns[i].parentTableId===undefined) ){
      // result.columns[i].parentTableIdは空欄OK。
    }
    else if( typeof result.columns[i].parentTableId !== "string" ){
      throw new Error(`result.columns[${i}].parentTableIdが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  if( !Array.isArray(result.records) ){
    if( !result.records ){
      throw new Error(`result.recordsがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.recordsが配列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  for( let i=0; i<result.records.length; i++ ){
    if( result.records[i]===null || result.records[i]===undefined ){
      throw new Error(`result.records[${i}]がNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else if( typeof result.records[i] !== "object" ){
      throw new Error(`result.records[${i}]がオブジェクトではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else if( result.records[i].constructor !== Object ){
      throw new Error(`result.records[${i}]が辞書型ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
    for( const j in result.records[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result.records[${i}]のキーが文字列ではありません。\nレイヤー : record_title\n関数 : listRecords`);
      }
    }
  }
  if( typeof result.recordOffset !== "number" ){
    if( !result.recordOffset ){
      throw new Error(`result.recordOffsetがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.recordOffsetが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  else if( isNaN(result.recordOffset) ){
    throw new Error(`result.recordOffsetが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  if( typeof result.recordsTotal !== "number" ){
    if( !result.recordsTotal ){
      throw new Error(`result.recordsTotalがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.recordsTotalが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  else if( isNaN(result.recordsTotal) ){
    throw new Error(`result.recordsTotalが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  if( typeof result.pageNumber !== "number" ){
    if( !result.pageNumber ){
      throw new Error(`result.pageNumberがNULLです。\nレイヤー : record_title\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.pageNumberが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
    }
  }
  else if( isNaN(result.pageNumber) ){
    throw new Error(`result.pageNumberが数値ではありません。\nレイヤー : record_title\n関数 : listRecords`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_getParentValue_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getParentValue( tableId, recordId, nestLevel ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : _getParentValue`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : _getParentValue`);
    }
  }
  if( typeof recordId !== "number" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : record_title\n関数 : _getParentValue`);
    }
    else{
      throw new Error(`recordIdが数値ではありません。\nレイヤー : record_title\n関数 : _getParentValue`);
    }
  }
  else if( isNaN(recordId) ){
    throw new Error(`recordIdが数値ではありません。\nレイヤー : record_title\n関数 : _getParentValue`);
  }
  if( (nestLevel===null) || (nestLevel===undefined) ){
    // nestLevelは空欄OK。
  }
  else if( typeof nestLevel !== "number" ){
    throw new Error(`nestLevelが数値ではありません。\nレイヤー : record_title\n関数 : _getParentValue`);
  }
  else if( isNaN(nestLevel) ){
    throw new Error(`nestLevelが数値ではありません。\nレイヤー : record_title\n関数 : _getParentValue`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getParentValue_core( tableId, recordId, nestLevel );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : _getParentValue`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : _getParentValue`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : record_title\n関数 : _getParentValue`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createRecordFromUI_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecordFromUI( tableId, columns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
  }
  if( !Array.isArray(columns) ){
    if( !columns ){
      throw new Error(`columnsがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`columnsが配列ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
  }
  for( let i=0; i<columns.length; i++ ){
    if( typeof columns[i] !== "object" ){
      if( !columns[i] ){
        throw new Error(`columns[${i}]がNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
      }
      else{
        throw new Error(`columns[${i}]がオブジェクトではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
      }
    }
    if( typeof columns[i].id !== "string" ){
      if( !columns[i].id ){
        throw new Error(`columns[${i}].idがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
      }
      else{
        throw new Error(`columns[${i}].idが文字列ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
      }
    }
    if( typeof columns[i].newField !== "string" ){
      if( !columns[i].newField ){
        throw new Error(`columns[${i}].newFieldがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
      }
      else{
        throw new Error(`columns[${i}].newFieldが文字列ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecordFromUI_core( tableId, columns );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : createRecordFromUI`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
  }
  if( typeof result.recordId !== "number" ){
    if( !result.recordId ){
      throw new Error(`result.recordIdがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`result.recordIdが数値ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
  }
  else if( isNaN(result.recordId) ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
  }
  if( typeof result.userMessage !== "string" ){
    if( !result.userMessage ){
      throw new Error(`result.userMessageがNULLです。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`result.userMessageが文字列ではありません。\nレイヤー : record_title\n関数 : createRecordFromUI`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_getRecordOffset_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getRecordOffset( tableId, recordId, onePageMaxSize ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
  }
  if( typeof recordId !== "number" ){
    if( !recordId ){
      throw new Error(`recordIdがNULLです。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
    else{
      throw new Error(`recordIdが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
  }
  else if( isNaN(recordId) ){
    throw new Error(`recordIdが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getRecordOffset_core( tableId, recordId, onePageMaxSize );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "number" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
    else{
      throw new Error(`resultが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : record_title\n関数 : _getRecordOffset`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


