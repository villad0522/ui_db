import {
  getJoinIdMap_core,  // joinIdを決定
  checkTableDuplication_core,  // テーブルの重複を確認
  getSelectData_core,  // SELECT句のデータ構築
  getJoinData_core,  // JOIN句のデータ構築
  getWhereData_core,  // WHERE句のデータ構築
  getOrderData_core,  // ORDER句のデータ構築
} from "./007_convert_sql_data.js";


//#######################################################################################
// 関数「getJoinIdMap_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getJoinIdMap( displayColumns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(displayColumns) ){
    if( !displayColumns ){
      throw new Error(`displayColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
    }
    else{
      throw new Error(`displayColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
    }
  }
  for( let i=0; i<displayColumns.length; i++ ){
    if( typeof displayColumns[i] !== "object" ){
      if( !displayColumns[i] ){
        throw new Error(`displayColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`displayColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof displayColumns[i].displayColumnId !== "string" ){
      if( !displayColumns[i].displayColumnId ){
        throw new Error(`displayColumns[${i}].displayColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`displayColumns[${i}].displayColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof displayColumns[i].type !== "string" ){
      if( !displayColumns[i].type ){
        throw new Error(`displayColumns[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`displayColumns[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof displayColumns[i].path !== "string" ){
      if( !displayColumns[i].path ){
        throw new Error(`displayColumns[${i}].pathがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`displayColumns[${i}].pathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof displayColumns[i].as !== "string" ){
      if( !displayColumns[i].as ){
        throw new Error(`displayColumns[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`displayColumns[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getJoinIdMap_core( displayColumns );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
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
// 関数「checkTableDuplication_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkTableDuplication( tableId, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
  }
  if( typeof joinIdMap !== "object" ){
    if( !joinIdMap ){
      throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
    else{
      throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
  }
  else if( typeof joinIdMap[Symbol.iterator] !== "function" ){
    throw new Error(`joinIdMapが反復可能オブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
  }
  for( const i in joinIdMap ){
    if( typeof i !== "string" ){
      throw new Error(`joinIdMapのキーが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
    if( typeof joinIdMap[i] !== "string" ){
      if( !joinIdMap[i] ){
        throw new Error(`joinIdMap["${i}"]がNULLです。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
      }
      else{
        throw new Error(`joinIdMap["${i}"]が文字列ではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkTableDuplication_core( tableId, joinIdMap );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
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
      throw new Error(`resultがNULLです。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
    else{
      throw new Error(`resultがブール値ではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultがブール値ではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getSelectData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getSelectData( displayColumns, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(displayColumns) ){
    if( !displayColumns ){
      throw new Error(`displayColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
    else{
      throw new Error(`displayColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
  }
  for( let i=0; i<displayColumns.length; i++ ){
    if( typeof displayColumns[i] !== "object" ){
      if( !displayColumns[i] ){
        throw new Error(`displayColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`displayColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof displayColumns[i].displayColumnId !== "string" ){
      if( !displayColumns[i].displayColumnId ){
        throw new Error(`displayColumns[${i}].displayColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`displayColumns[${i}].displayColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof displayColumns[i].type !== "string" ){
      if( !displayColumns[i].type ){
        throw new Error(`displayColumns[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`displayColumns[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof displayColumns[i].path !== "string" ){
      if( !displayColumns[i].path ){
        throw new Error(`displayColumns[${i}].pathがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`displayColumns[${i}].pathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof displayColumns[i].as !== "string" ){
      if( !displayColumns[i].as ){
        throw new Error(`displayColumns[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`displayColumns[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
  }
  if( typeof joinIdMap !== "object" ){
    if( !joinIdMap ){
      throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
    else{
      throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
  }
  else if( typeof joinIdMap[Symbol.iterator] !== "function" ){
    throw new Error(`joinIdMapが反復可能オブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
  }
  for( const i in joinIdMap ){
    if( typeof i !== "string" ){
      throw new Error(`joinIdMapのキーが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
    if( typeof joinIdMap[i] !== "string" ){
      if( !joinIdMap[i] ){
        throw new Error(`joinIdMap["${i}"]がNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`joinIdMap["${i}"]が文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getSelectData_core( displayColumns, joinIdMap );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : convert_sql_data\n関数 : getSelectData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof result[i].type !== "string" ){
      if( !result[i].type ){
        throw new Error(`result[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof result[i].joinId !== "string" ){
      if( !result[i].joinId ){
        throw new Error(`result[${i}].joinIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].joinIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof result[i].columnName !== "string" ){
      if( !result[i].columnName ){
        throw new Error(`result[${i}].columnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].columnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof result[i].as !== "string" ){
      if( !result[i].as ){
        throw new Error(`result[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getJoinData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getJoinData( joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof joinIdMap !== "object" ){
    if( !joinIdMap ){
      throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
    }
    else{
      throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
    }
  }
  else if( typeof joinIdMap[Symbol.iterator] !== "function" ){
    throw new Error(`joinIdMapが反復可能オブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
  }
  for( const i in joinIdMap ){
    if( typeof i !== "string" ){
      throw new Error(`joinIdMapのキーが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
    }
    if( typeof joinIdMap[i] !== "string" ){
      if( !joinIdMap[i] ){
        throw new Error(`joinIdMap["${i}"]がNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`joinIdMap["${i}"]が文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getJoinData_core( joinIdMap );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : convert_sql_data\n関数 : getJoinData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
    if( typeof result[i].fromJoinId !== "string" ){
      if( !result[i].fromJoinId ){
        throw new Error(`result[${i}].fromJoinIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`result[${i}].fromJoinIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
    if( typeof result[i].fromColumnName !== "string" ){
      if( !result[i].fromColumnName ){
        throw new Error(`result[${i}].fromColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`result[${i}].fromColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
    if( typeof result[i].toJoinId !== "string" ){
      if( !result[i].toJoinId ){
        throw new Error(`result[${i}].toJoinIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`result[${i}].toJoinIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
    if( typeof result[i].toTableName !== "string" ){
      if( !result[i].toTableName ){
        throw new Error(`result[${i}].toTableNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`result[${i}].toTableNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
    if( typeof result[i].toColumnName !== "string" ){
      if( !result[i].toColumnName ){
        throw new Error(`result[${i}].toColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
      else{
        throw new Error(`result[${i}].toColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getWhereData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getWhereData( displayColumns, conditions, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(displayColumns) ){
    if( !displayColumns ){
      throw new Error(`displayColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    else{
      throw new Error(`displayColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  for( let i=0; i<displayColumns.length; i++ ){
    if( typeof displayColumns[i] !== "object" ){
      if( !displayColumns[i] ){
        throw new Error(`displayColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`displayColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof displayColumns[i].displayColumnId !== "string" ){
      if( !displayColumns[i].displayColumnId ){
        throw new Error(`displayColumns[${i}].displayColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`displayColumns[${i}].displayColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof displayColumns[i].type !== "string" ){
      if( !displayColumns[i].type ){
        throw new Error(`displayColumns[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`displayColumns[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof displayColumns[i].path !== "string" ){
      if( !displayColumns[i].path ){
        throw new Error(`displayColumns[${i}].pathがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`displayColumns[${i}].pathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof displayColumns[i].as !== "string" ){
      if( !displayColumns[i].as ){
        throw new Error(`displayColumns[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`displayColumns[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
  }
  if( !Array.isArray(conditions) ){
    if( !conditions ){
      throw new Error(`conditionsがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    else{
      throw new Error(`conditionsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  for( let i=0; i<conditions.length; i++ ){
    if( typeof conditions[i] !== "object" ){
      if( !conditions[i] ){
        throw new Error(`conditions[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditions[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof conditions[i].displayColumnId !== "string" ){
      if( !conditions[i].displayColumnId ){
        throw new Error(`conditions[${i}].displayColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditions[${i}].displayColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof conditions[i].type !== "string" ){
      if( !conditions[i].type ){
        throw new Error(`conditions[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditions[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof conditions[i].value !== "number" ){
      if( !conditions[i].value ){
        throw new Error(`conditions[${i}].valueがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditions[${i}].valueが数値ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    else if( isNaN(conditions[i].value) ){
      throw new Error(`conditions[${i}].valueが数値ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  if( typeof joinIdMap !== "object" ){
    if( !joinIdMap ){
      throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    else{
      throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  else if( typeof joinIdMap[Symbol.iterator] !== "function" ){
    throw new Error(`joinIdMapが反復可能オブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
  }
  for( const i in joinIdMap ){
    if( typeof i !== "string" ){
      throw new Error(`joinIdMapのキーが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    if( typeof joinIdMap[i] !== "string" ){
      if( !joinIdMap[i] ){
        throw new Error(`joinIdMap["${i}"]がNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`joinIdMap["${i}"]が文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getWhereData_core( displayColumns, conditions, joinIdMap );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : convert_sql_data\n関数 : getWhereData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof result[i].type !== "string" ){
      if( !result[i].type ){
        throw new Error(`result[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof result[i].joinId !== "string" ){
      if( !result[i].joinId ){
        throw new Error(`result[${i}].joinIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].joinIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof result[i].columnName !== "string" ){
      if( !result[i].columnName ){
        throw new Error(`result[${i}].columnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].columnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof result[i].as !== "string" ){
      if( !result[i].as ){
        throw new Error(`result[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getOrderData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getOrderData( displayColumns, sortOrder, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(displayColumns) ){
    if( !displayColumns ){
      throw new Error(`displayColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
    else{
      throw new Error(`displayColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  for( let i=0; i<displayColumns.length; i++ ){
    if( typeof displayColumns[i] !== "object" ){
      if( !displayColumns[i] ){
        throw new Error(`displayColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`displayColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof displayColumns[i].displayColumnId !== "string" ){
      if( !displayColumns[i].displayColumnId ){
        throw new Error(`displayColumns[${i}].displayColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`displayColumns[${i}].displayColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof displayColumns[i].type !== "string" ){
      if( !displayColumns[i].type ){
        throw new Error(`displayColumns[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`displayColumns[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof displayColumns[i].path !== "string" ){
      if( !displayColumns[i].path ){
        throw new Error(`displayColumns[${i}].pathがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`displayColumns[${i}].pathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof displayColumns[i].as !== "string" ){
      if( !displayColumns[i].as ){
        throw new Error(`displayColumns[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`displayColumns[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
  }
  if( !Array.isArray(sortOrder) ){
    if( !sortOrder ){
      throw new Error(`sortOrderがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
    else{
      throw new Error(`sortOrderが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  for( let i=0; i<sortOrder.length; i++ ){
    if( typeof sortOrder[i] !== "object" ){
      if( !sortOrder[i] ){
        throw new Error(`sortOrder[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`sortOrder[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof sortOrder[i].displayColumnId !== "string" ){
      if( !sortOrder[i].displayColumnId ){
        throw new Error(`sortOrder[${i}].displayColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`sortOrder[${i}].displayColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof sortOrder[i].isAscending !== "boolean" ){
      if( !sortOrder[i].isAscending ){
        throw new Error(`sortOrder[${i}].isAscendingがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`sortOrder[${i}].isAscendingがブール値ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    else if( isNaN(sortOrder[i].isAscending) ){
      throw new Error(`sortOrder[${i}].isAscendingがブール値ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  if( typeof joinIdMap !== "object" ){
    if( !joinIdMap ){
      throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
    else{
      throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  else if( typeof joinIdMap[Symbol.iterator] !== "function" ){
    throw new Error(`joinIdMapが反復可能オブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
  }
  for( const i in joinIdMap ){
    if( typeof i !== "string" ){
      throw new Error(`joinIdMapのキーが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
    if( typeof joinIdMap[i] !== "string" ){
      if( !joinIdMap[i] ){
        throw new Error(`joinIdMap["${i}"]がNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`joinIdMap["${i}"]が文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getOrderData_core( displayColumns, sortOrder, joinIdMap );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : convert_sql_data\n関数 : getOrderData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof result[i].type !== "string" ){
      if( !result[i].type ){
        throw new Error(`result[${i}].typeがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`result[${i}].typeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof result[i].joinId !== "string" ){
      if( !result[i].joinId ){
        throw new Error(`result[${i}].joinIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`result[${i}].joinIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof result[i].columnName !== "string" ){
      if( !result[i].columnName ){
        throw new Error(`result[${i}].columnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`result[${i}].columnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof result[i].as !== "string" ){
      if( !result[i].as ){
        throw new Error(`result[${i}].asがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`result[${i}].asが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


