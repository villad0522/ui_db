import {
  startUp_core,  // プログラム起動
  createRecord_core,  // レコードを作成
  updateRecords_core,  // レコードを上書き
  deleteTable_core,  // 不可逆的にテーブルを削除
  deleteRecords_core,  // レコードを一括削除
  disableTable_core,  // テーブルを無効化
  enableTable_core,  // テーブルを再度有効化
  disableColumn_core,  // カラムを無効化
  enableColumn_core,  // カラムを再度有効化
  autoCorrect_core,  // レコードの予測変換
  autoCorrectFromArray_core,  // 配列の予測変換
  scanKeywords_core,  // 検索用キーワードをスキャンする
  getScanKeywordsProgress_core,  // 変換の進捗状況を取得する関数
  stopScanKeywords_core,  // キーワードのスキャンを中断する関数
} from "./104_search_text.js";


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
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : search_text\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : search_text\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : search_text\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : search_text\n関数 : startUp`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : startUp`);
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
// 関数「createRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  if( recordData===null || recordData===undefined ){
    throw new Error(`recordDataがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
  }
  else if( typeof recordData !== "object" ){
    throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : search_text\n関数 : createRecord`);
  }
  else if( recordData.constructor !== Object ){
    throw new Error(`recordDataが辞書型ではありません。\nレイヤー : search_text\n関数 : createRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : createRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  if( typeof result.recordId !== "number" ){
    if( !result.recordId ){
      throw new Error(`result.recordIdがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.recordIdが数値ではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  else if( isNaN(result.recordId) ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : search_text\n関数 : createRecord`);
  }
  if( typeof result.userMessage !== "string" ){
    if( !result.userMessage ){
      throw new Error(`result.userMessageがNULLです。\nレイヤー : search_text\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.userMessageが文字列ではありません。\nレイヤー : search_text\n関数 : createRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「updateRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateRecords( tableId, records ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : updateRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecords`);
    }
  }
  if( !Array.isArray(records) ){
    if( !records ){
      throw new Error(`recordsがNULLです。\nレイヤー : search_text\n関数 : updateRecords`);
    }
    else{
      throw new Error(`recordsが配列ではありません。\nレイヤー : search_text\n関数 : updateRecords`);
    }
  }
  for( let i=0; i<records.length; i++ ){
    if( records[i]===null || records[i]===undefined ){
      throw new Error(`records[${i}]がNULLです。\nレイヤー : search_text\n関数 : updateRecords`);
    }
    else if( typeof records[i] !== "object" ){
      throw new Error(`records[${i}]がオブジェクトではありません。\nレイヤー : search_text\n関数 : updateRecords`);
    }
    else if( records[i].constructor !== Object ){
      throw new Error(`records[${i}]が辞書型ではありません。\nレイヤー : search_text\n関数 : updateRecords`);
    }
    for( const j in records[i] ){
      if( typeof j !== "string" ){
        throw new Error(`records[${i}]のキーが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecords`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateRecords_core( tableId, records );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : updateRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : updateRecords`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : updateRecords`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : deleteTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : deleteTable`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : deleteTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : deleteTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : deleteTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「deleteRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteRecords( tableId, recordIdList ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : deleteRecords`);
    }
  }
  if( !Array.isArray(recordIdList) ){
    if( !recordIdList ){
      throw new Error(`recordIdListがNULLです。\nレイヤー : search_text\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`recordIdListが配列ではありません。\nレイヤー : search_text\n関数 : deleteRecords`);
    }
  }
  for( let i=0; i<recordIdList.length; i++ ){
    if( typeof recordIdList[i] !== "number" ){
      if( !recordIdList[i] ){
        throw new Error(`recordIdList[${i}]がNULLです。\nレイヤー : search_text\n関数 : deleteRecords`);
      }
      else{
        throw new Error(`recordIdList[${i}]が数値ではありません。\nレイヤー : search_text\n関数 : deleteRecords`);
      }
    }
    else if( isNaN(recordIdList[i]) ){
      throw new Error(`recordIdList[${i}]が数値ではありません。\nレイヤー : search_text\n関数 : deleteRecords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteRecords_core( tableId, recordIdList );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : deleteRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : deleteRecords`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : disableTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : disableTable`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : disableTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : disableTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : disableTable`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : enableTable`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : enableTable`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : enableTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : enableTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : enableTable`);
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
      throw new Error(`columnIdがNULLです。\nレイヤー : search_text\n関数 : disableColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : search_text\n関数 : disableColumn`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : disableColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : disableColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : disableColumn`);
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
      throw new Error(`columnIdがNULLです。\nレイヤー : search_text\n関数 : enableColumn`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : search_text\n関数 : enableColumn`);
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
      throw new Error(`${error}\nレイヤー : search_text\n関数 : enableColumn`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : enableColumn`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : enableColumn`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「autoCorrect_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrect( tableId, columnId, inputText, conditions ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
  }
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
  }
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
  }
  if( conditions===null || conditions===undefined ){
    throw new Error(`conditionsがNULLです。\nレイヤー : search_text\n関数 : autoCorrect`);
  }
  else if( typeof conditions !== "object" ){
    throw new Error(`conditionsがオブジェクトではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
  }
  else if( conditions.constructor !== Object ){
    throw new Error(`conditionsが辞書型ではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
  }
  for( const i in conditions ){
    if( typeof i !== "string" ){
      throw new Error(`conditionsのキーが文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrect_core( tableId, columnId, inputText, conditions );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : autoCorrect`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : search_text\n関数 : autoCorrect`);
    }
  }
  for( let i=0; i<result.length; i++ ){
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「autoCorrectFromArray_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function autoCorrectFromArray( inputText, candidateArray ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
    }
  }
  if( !Array.isArray(candidateArray) ){
    if( !candidateArray ){
      throw new Error(`candidateArrayがNULLです。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
    }
    else{
      throw new Error(`candidateArrayが配列ではありません。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
    }
  }
  for( let i=0; i<candidateArray.length; i++ ){
    if( typeof candidateArray[i] !== "string" ){
      if( !candidateArray[i] ){
        throw new Error(`candidateArray[${i}]がNULLです。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
      }
      else{
        throw new Error(`candidateArray[${i}]が文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await autoCorrectFromArray_core( inputText, candidateArray );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : search_text\n関数 : autoCorrectFromArray`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「scanKeywords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function scanKeywords( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : search_text\n関数 : scanKeywords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : search_text\n関数 : scanKeywords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await scanKeywords_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : scanKeywords`);
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
// 関数「getScanKeywordsProgress_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getScanKeywordsProgress(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getScanKeywordsProgress_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
  }
  if( typeof result.progressMessage !== "string" ){
    if( !result.progressMessage ){
      throw new Error(`result.progressMessageがNULLです。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
    else{
      throw new Error(`result.progressMessageが文字列ではありません。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
  }
  if( typeof result.progress !== "number" ){
    if( !result.progress ){
      throw new Error(`result.progressがNULLです。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
    else{
      throw new Error(`result.progressが数値ではありません。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
  }
  else if( isNaN(result.progress) ){
    throw new Error(`result.progressが数値ではありません。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
  }
  if( typeof result.rowSize !== "number" ){
    if( !result.rowSize ){
      throw new Error(`result.rowSizeがNULLです。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
    else{
      throw new Error(`result.rowSizeが数値ではありません。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
    }
  }
  else if( isNaN(result.rowSize) ){
    throw new Error(`result.rowSizeが数値ではありません。\nレイヤー : search_text\n関数 : getScanKeywordsProgress`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「stopScanKeywords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function stopScanKeywords(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await stopScanKeywords_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : search_text\n関数 : stopScanKeywords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : search_text\n関数 : stopScanKeywords`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : search_text\n関数 : stopScanKeywords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


