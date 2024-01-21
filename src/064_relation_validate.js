import {
  startUp_core,  // プログラム起動
  createColumn_core,  // カラムを作成
  listColumnsForGUI_core,  // カラムの一覧を取得(GUI)
  clearCache_core,  // インメモリキャッシュを削除する
  deleteTable_core,  // 不可逆的にテーブルを削除
  listColumnsAll_core,  // カラムの一覧を取得
  getParentTableId_core,  // 参照先のテーブルIDを取得する
  getDataType_core,  // データ型を取得
  checkField_core,  // フィールドを検証
  checkRecord_core,  // レコードを検証
  createRecord_core,  // レコードを作成
  updateRecord_core,  // レコードを上書き
} from "./065_relation.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : relation\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : relation\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : relation\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : relation\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : relation\n関数 : startUp`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof columnName !== "string" ){
    if( !columnName ){
      throw new Error(`columnNameがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`columnNameが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof dataType !== "string" ){
    if( !dataType ){
      throw new Error(`dataTypeがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`dataTypeが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( (parentTableId===null) || (parentTableId===undefined) ){
    // parentTableIdは空欄OK。
  }
  else if( typeof parentTableId !== "string" ){
    throw new Error(`parentTableIdが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
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
      throw new Error(`${error}\nレイヤー : relation\n関数 : createColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  if( typeof result.columnId !== "string" ){
    if( !result.columnId ){
      throw new Error(`result.columnIdがNULLです。\nレイヤー : relation\n関数 : createColumn`);
    }
    else{
      throw new Error(`result.columnIdが文字列ではありません。\nレイヤー : relation\n関数 : createColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listColumnsForGUI_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listColumnsForGUI( tableId, pageNumber, onePageMaxSize, isTrash ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  if( (pageNumber===null) || (pageNumber===undefined) ){
    // pageNumberは空欄OK。
  }
  else if( typeof pageNumber !== "number" ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listColumnsForGUI_core( tableId, pageNumber, onePageMaxSize, isTrash );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : listColumnsForGUI`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  if( !Array.isArray(result.columns) ){
    if( !result.columns ){
      throw new Error(`result.columnsがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
    else{
      throw new Error(`result.columnsが配列ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  for( let i=0; i<result.columns.length; i++ ){
    if( typeof result.columns[i] !== "object" ){
      if( !result.columns[i] ){
        throw new Error(`result.columns[${i}]がNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
      else{
        throw new Error(`result.columns[${i}]がオブジェクトではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
    }
    if( typeof result.columns[i].id !== "string" ){
      if( !result.columns[i].id ){
        throw new Error(`result.columns[${i}].idがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
      else{
        throw new Error(`result.columns[${i}].idが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
    }
    if( typeof result.columns[i].name !== "string" ){
      if( !result.columns[i].name ){
        throw new Error(`result.columns[${i}].nameがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
      else{
        throw new Error(`result.columns[${i}].nameが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
    }
    if( typeof result.columns[i].dataType !== "string" ){
      if( !result.columns[i].dataType ){
        throw new Error(`result.columns[${i}].dataTypeがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
      else{
        throw new Error(`result.columns[${i}].dataTypeが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
      }
    }
    if( (result.columns[i].parentTableId===null) || (result.columns[i].parentTableId===undefined) ){
      // result.columns[i].parentTableIdは空欄OK。
    }
    else if( typeof result.columns[i].parentTableId !== "string" ){
      throw new Error(`result.columns[${i}].parentTableIdが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  if( typeof result.total !== "number" ){
    if( !result.total ){
      throw new Error(`result.totalがNULLです。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
    else{
      throw new Error(`result.totalが数値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
    }
  }
  else if( isNaN(result.total) ){
    throw new Error(`result.totalが数値ではありません。\nレイヤー : relation\n関数 : listColumnsForGUI`);
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
      throw new Error(`${error}\nレイヤー : relation\n関数 : clearCache`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : relation\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : relation\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listColumnsAll_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listColumnsAll( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : listColumnsAll`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listColumnsAll_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : listColumnsAll`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : listColumnsAll`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
    }
    if( typeof result[i].id !== "string" ){
      if( !result[i].id ){
        throw new Error(`result[${i}].idがNULLです。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
      else{
        throw new Error(`result[${i}].idが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
    }
    if( typeof result[i].name !== "string" ){
      if( !result[i].name ){
        throw new Error(`result[${i}].nameがNULLです。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
      else{
        throw new Error(`result[${i}].nameが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
    }
    if( typeof result[i].dataType !== "string" ){
      if( !result[i].dataType ){
        throw new Error(`result[${i}].dataTypeがNULLです。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
      else{
        throw new Error(`result[${i}].dataTypeが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
      }
    }
    if( (result[i].parentTableId===null) || (result[i].parentTableId===undefined) ){
      // result[i].parentTableIdは空欄OK。
    }
    else if( typeof result[i].parentTableId !== "string" ){
      throw new Error(`result[${i}].parentTableIdが文字列ではありません。\nレイヤー : relation\n関数 : listColumnsAll`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getParentTableId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getParentTableId( columnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : relation\n関数 : getParentTableId`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : relation\n関数 : getParentTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getParentTableId_core( columnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : getParentTableId`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : getParentTableId`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : relation\n関数 : getParentTableId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getDataType_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getDataType( columnId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : relation\n関数 : getDataType`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : relation\n関数 : getDataType`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getDataType_core( columnId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : getDataType`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : getDataType`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : relation\n関数 : getDataType`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「checkField_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkField( columnId, value ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : relation\n関数 : checkField`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : relation\n関数 : checkField`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkField_core( columnId, value );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : checkField`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : checkField`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : relation\n関数 : checkField`);
    }
  }
  if( typeof result.isOK !== "boolean" ){
    if( !result.isOK ){
      throw new Error(`result.isOKがNULLです。\nレイヤー : relation\n関数 : checkField`);
    }
    else{
      throw new Error(`result.isOKがブール値ではありません。\nレイヤー : relation\n関数 : checkField`);
    }
  }
  else if( isNaN(result.isOK) ){
    throw new Error(`result.isOKがブール値ではありません。\nレイヤー : relation\n関数 : checkField`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : relation\n関数 : checkField`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : relation\n関数 : checkField`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「checkRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : checkRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : checkRecord`);
    }
  }
  if( recordData===null || recordData===undefined ){
    throw new Error(`recordDataがNULLです。\nレイヤー : relation\n関数 : checkRecord`);
  }
  else if( typeof recordData !== "object" ){
    throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : relation\n関数 : checkRecord`);
  }
  else if( recordData.constructor !== Object ){
    throw new Error(`recordDataが辞書型ではありません。\nレイヤー : relation\n関数 : checkRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : relation\n関数 : checkRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkRecord_core( tableId, recordData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : checkRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : checkRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : relation\n関数 : checkRecord`);
    }
  }
  if( typeof result.isOK !== "boolean" ){
    if( !result.isOK ){
      throw new Error(`result.isOKがNULLです。\nレイヤー : relation\n関数 : checkRecord`);
    }
    else{
      throw new Error(`result.isOKがブール値ではありません。\nレイヤー : relation\n関数 : checkRecord`);
    }
  }
  else if( isNaN(result.isOK) ){
    throw new Error(`result.isOKがブール値ではありません。\nレイヤー : relation\n関数 : checkRecord`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : relation\n関数 : checkRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : relation\n関数 : checkRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : createRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : createRecord`);
    }
  }
  if( recordData===null || recordData===undefined ){
    throw new Error(`recordDataがNULLです。\nレイヤー : relation\n関数 : createRecord`);
  }
  else if( typeof recordData !== "object" ){
    throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : relation\n関数 : createRecord`);
  }
  else if( recordData.constructor !== Object ){
    throw new Error(`recordDataが辞書型ではありません。\nレイヤー : relation\n関数 : createRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : relation\n関数 : createRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecord_core( tableId, recordData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : createRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : createRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : relation\n関数 : createRecord`);
    }
  }
  if( typeof result.recordId !== "number" ){
    if( !result.recordId ){
      throw new Error(`result.recordIdがNULLです。\nレイヤー : relation\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.recordIdが数値ではありません。\nレイヤー : relation\n関数 : createRecord`);
    }
  }
  else if( isNaN(result.recordId) ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : relation\n関数 : createRecord`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : relation\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : relation\n関数 : createRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateRecord( tableId, records ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : relation\n関数 : updateRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : relation\n関数 : updateRecord`);
    }
  }
  if( !Array.isArray(records) ){
    if( !records ){
      throw new Error(`recordsがNULLです。\nレイヤー : relation\n関数 : updateRecord`);
    }
    else{
      throw new Error(`recordsが配列ではありません。\nレイヤー : relation\n関数 : updateRecord`);
    }
  }
  for( let i=0; i<records.length; i++ ){
    if( records[i]===null || records[i]===undefined ){
      throw new Error(`records[${i}]がNULLです。\nレイヤー : relation\n関数 : updateRecord`);
    }
    else if( typeof records[i] !== "object" ){
      throw new Error(`records[${i}]がオブジェクトではありません。\nレイヤー : relation\n関数 : updateRecord`);
    }
    else if( records[i].constructor !== Object ){
      throw new Error(`records[${i}]が辞書型ではありません。\nレイヤー : relation\n関数 : updateRecord`);
    }
    for( const j in records[i] ){
      if( typeof j !== "string" ){
        throw new Error(`records[${i}]のキーが文字列ではありません。\nレイヤー : relation\n関数 : updateRecord`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateRecord_core( tableId, records );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : relation\n関数 : updateRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : relation\n関数 : updateRecord`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : relation\n関数 : updateRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


