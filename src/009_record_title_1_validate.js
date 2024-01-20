import {
  createRecord_core,  // レコードを作成
  updateRecord_core,  // レコードを上書き
  checkField_core,  // フィールドを検証
  checkRecord_core,  // レコードを検証
  generateSQL_core,  // SQLクエリを生成
  autoCorrect_core,  // 予測変換
} from "./010_record_title_1.js";


//#######################################################################################
// 関数「createRecord_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecord( tableId, recordData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
  }
  if( recordData===null || recordData===undefined ){
    throw new Error(`recordDataがNULLです。\nレイヤー : record_title_1\n関数 : createRecord`);
  }
  else if( typeof recordData !== "object" ){
    throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
  }
  else if( recordData.constructor !== Object ){
    throw new Error(`recordDataが辞書型ではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
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
      throw new Error(`${error}\nレイヤー : record_title_1\n関数 : createRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
  }
  if( typeof result.recordId !== "number" ){
    if( !result.recordId ){
      throw new Error(`result.recordIdがNULLです。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.recordIdが数値ではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
  }
  else if( isNaN(result.recordId) ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : record_title_1\n関数 : createRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : record_title_1\n関数 : createRecord`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
  }
  if( !Array.isArray(records) ){
    if( !records ){
      throw new Error(`recordsがNULLです。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
    else{
      throw new Error(`recordsが配列ではありません。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
  }
  for( let i=0; i<records.length; i++ ){
    if( records[i]===null || records[i]===undefined ){
      throw new Error(`records[${i}]がNULLです。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
    else if( typeof records[i] !== "object" ){
      throw new Error(`records[${i}]がオブジェクトではありません。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
    else if( records[i].constructor !== Object ){
      throw new Error(`records[${i}]が辞書型ではありません。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
    for( const j in records[i] ){
      if( typeof j !== "string" ){
        throw new Error(`records[${i}]のキーが文字列ではありません。\nレイヤー : record_title_1\n関数 : updateRecord`);
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
      throw new Error(`${error}\nレイヤー : record_title_1\n関数 : updateRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_1\n関数 : updateRecord`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : record_title_1\n関数 : updateRecord`);
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
      throw new Error(`columnIdがNULLです。\nレイヤー : record_title_1\n関数 : checkField`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : checkField`);
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
      throw new Error(`${error}\nレイヤー : record_title_1\n関数 : checkField`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_1\n関数 : checkField`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : checkField`);
    }
  }
  if( typeof result.isOK !== "boolean" ){
    if( !result.isOK ){
      throw new Error(`result.isOKがNULLです。\nレイヤー : record_title_1\n関数 : checkField`);
    }
    else{
      throw new Error(`result.isOKがブール値ではありません。\nレイヤー : record_title_1\n関数 : checkField`);
    }
  }
  else if( isNaN(result.isOK) ){
    throw new Error(`result.isOKがブール値ではありません。\nレイヤー : record_title_1\n関数 : checkField`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : record_title_1\n関数 : checkField`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : record_title_1\n関数 : checkField`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
  }
  if( recordData===null || recordData===undefined ){
    throw new Error(`recordDataがNULLです。\nレイヤー : record_title_1\n関数 : checkRecord`);
  }
  else if( typeof recordData !== "object" ){
    throw new Error(`recordDataがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
  }
  else if( recordData.constructor !== Object ){
    throw new Error(`recordDataが辞書型ではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
  }
  for( const i in recordData ){
    if( typeof i !== "string" ){
      throw new Error(`recordDataのキーが文字列ではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
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
      throw new Error(`${error}\nレイヤー : record_title_1\n関数 : checkRecord`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
  }
  if( typeof result.isOK !== "boolean" ){
    if( !result.isOK ){
      throw new Error(`result.isOKがNULLです。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
    else{
      throw new Error(`result.isOKがブール値ではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
  }
  else if( isNaN(result.isOK) ){
    throw new Error(`result.isOKがブール値ではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : record_title_1\n関数 : checkRecord`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( tableId, displayColumns, conditions, sortOrder ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  if( !Array.isArray(displayColumns) ){
    if( !displayColumns ){
      throw new Error(`displayColumnsがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
    else{
      throw new Error(`displayColumnsが配列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<displayColumns.length; i++ ){
    if( typeof displayColumns[i] !== "object" ){
      if( !displayColumns[i] ){
        throw new Error(`displayColumns[${i}]がNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}]がオブジェクトではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].displayColumnId !== "string" ){
      if( !displayColumns[i].displayColumnId ){
        throw new Error(`displayColumns[${i}].displayColumnIdがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].displayColumnIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].type !== "string" ){
      if( !displayColumns[i].type ){
        throw new Error(`displayColumns[${i}].typeがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].typeが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].path !== "string" ){
      if( !displayColumns[i].path ){
        throw new Error(`displayColumns[${i}].pathがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].pathが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].as !== "string" ){
      if( !displayColumns[i].as ){
        throw new Error(`displayColumns[${i}].asがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].asが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
  }
  if( !Array.isArray(conditions) ){
    if( !conditions ){
      throw new Error(`conditionsがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
    else{
      throw new Error(`conditionsが配列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<conditions.length; i++ ){
    if( typeof conditions[i] !== "object" ){
      if( !conditions[i] ){
        throw new Error(`conditions[${i}]がNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}]がオブジェクトではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].displayColumnId !== "string" ){
      if( !conditions[i].displayColumnId ){
        throw new Error(`conditions[${i}].displayColumnIdがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}].displayColumnIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].type !== "string" ){
      if( !conditions[i].type ){
        throw new Error(`conditions[${i}].typeがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}].typeが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].value !== "number" ){
      if( !conditions[i].value ){
        throw new Error(`conditions[${i}].valueがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}].valueが数値ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    else if( isNaN(conditions[i].value) ){
      throw new Error(`conditions[${i}].valueが数値ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  if( !Array.isArray(sortOrder) ){
    if( !sortOrder ){
      throw new Error(`sortOrderがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
    else{
      throw new Error(`sortOrderが配列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<sortOrder.length; i++ ){
    if( typeof sortOrder[i] !== "object" ){
      if( !sortOrder[i] ){
        throw new Error(`sortOrder[${i}]がNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}]がオブジェクトではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof sortOrder[i].displayColumnId !== "string" ){
      if( !sortOrder[i].displayColumnId ){
        throw new Error(`sortOrder[${i}].displayColumnIdがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}].displayColumnIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    if( typeof sortOrder[i].isAscending !== "boolean" ){
      if( !sortOrder[i].isAscending ){
        throw new Error(`sortOrder[${i}].isAscendingがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}].isAscendingがブール値ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
      }
    }
    else if( isNaN(sortOrder[i].isAscending) ){
      throw new Error(`sortOrder[${i}].isAscendingがブール値ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( tableId, displayColumns, conditions, sortOrder );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : record_title_1\n関数 : generateSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
  }
  if( typeof result.sql !== "string" ){
    if( !result.sql ){
      throw new Error(`result.sqlがNULLです。\nレイヤー : record_title_1\n関数 : generateSQL`);
    }
    else{
      throw new Error(`result.sqlが文字列ではありません。\nレイヤー : record_title_1\n関数 : generateSQL`);
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
      throw new Error(`tableIdがNULLです。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
  }
  if( typeof columnId !== "string" ){
    if( !columnId ){
      throw new Error(`columnIdがNULLです。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`columnIdが文字列ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
  }
  if( typeof inputText !== "string" ){
    if( !inputText ){
      throw new Error(`inputTextがNULLです。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`inputTextが文字列ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
  }
  if( conditions===null || conditions===undefined ){
    throw new Error(`conditionsがNULLです。\nレイヤー : record_title_1\n関数 : autoCorrect`);
  }
  else if( typeof conditions !== "object" ){
    throw new Error(`conditionsがオブジェクトではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
  }
  else if( conditions.constructor !== Object ){
    throw new Error(`conditionsが辞書型ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
  }
  for( const i in conditions ){
    if( typeof i !== "string" ){
      throw new Error(`conditionsのキーが文字列ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
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
      throw new Error(`${error}\nレイヤー : record_title_1\n関数 : autoCorrect`);
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
      throw new Error(`resultがNULLです。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "string" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : record_title_1\n関数 : autoCorrect`);
      }
      else{
        throw new Error(`result[${i}]が文字列ではありません。\nレイヤー : record_title_1\n関数 : autoCorrect`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


