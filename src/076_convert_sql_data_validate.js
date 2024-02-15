import {
  getJoinIdMap_core,  // joinIdを決定
  checkTableDuplication_core,  // テーブルの重複を確認
  getSelectData_core,  // SELECT句のデータ構築
  getJoinData_core,  // JOIN句のデータ構築
  getWhereData_core,  // WHERE句のデータ構築
  getOrderData_core,  // ORDER句のデータ構築
} from "./077_convert_sql_data.js";


//#######################################################################################
// 関数「getJoinIdMap_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getJoinIdMap( viewColumns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(viewColumns) ){
    if( !viewColumns ){
      throw new Error(`viewColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
    }
    else{
      throw new Error(`viewColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
    }
  }
  for( let i=0; i<viewColumns.length; i++ ){
    if( typeof viewColumns[i] !== "object" ){
      if( !viewColumns[i] ){
        throw new Error(`viewColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`viewColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof viewColumns[i].viewColumnId !== "string" ){
      if( !viewColumns[i].viewColumnId ){
        throw new Error(`viewColumns[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof viewColumns[i].viewColumnType !== "string" ){
      if( !viewColumns[i].viewColumnType ){
        throw new Error(`viewColumns[${i}].viewColumnTypeがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof viewColumns[i].columnPath !== "string" ){
      if( !viewColumns[i].columnPath ){
        throw new Error(`viewColumns[${i}].columnPathがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`viewColumns[${i}].columnPathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
    if( typeof viewColumns[i].viewColumnName !== "string" ){
      if( !viewColumns[i].viewColumnName ){
        throw new Error(`viewColumns[${i}].viewColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinIdMap`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getJoinIdMap_core( viewColumns );
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
  if( joinIdMap===null || joinIdMap===undefined ){
    throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
  }
  else if( typeof joinIdMap !== "object" ){
    throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
  }
  else if( joinIdMap.constructor !== Object ){
    throw new Error(`joinIdMapが辞書型ではありません。\nレイヤー : convert_sql_data\n関数 : checkTableDuplication`);
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
export async function getSelectData( viewColumns, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(viewColumns) ){
    if( !viewColumns ){
      throw new Error(`viewColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
    else{
      throw new Error(`viewColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
    }
  }
  for( let i=0; i<viewColumns.length; i++ ){
    if( typeof viewColumns[i] !== "object" ){
      if( !viewColumns[i] ){
        throw new Error(`viewColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`viewColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof viewColumns[i].viewColumnId !== "string" ){
      if( !viewColumns[i].viewColumnId ){
        throw new Error(`viewColumns[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof viewColumns[i].viewColumnType !== "string" ){
      if( !viewColumns[i].viewColumnType ){
        throw new Error(`viewColumns[${i}].viewColumnTypeがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof viewColumns[i].columnPath !== "string" ){
      if( !viewColumns[i].columnPath ){
        throw new Error(`viewColumns[${i}].columnPathがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`viewColumns[${i}].columnPathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof viewColumns[i].viewColumnName !== "string" ){
      if( !viewColumns[i].viewColumnName ){
        throw new Error(`viewColumns[${i}].viewColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
  }
  if( joinIdMap===null || joinIdMap===undefined ){
    throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
  }
  else if( typeof joinIdMap !== "object" ){
    throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
  }
  else if( joinIdMap.constructor !== Object ){
    throw new Error(`joinIdMapが辞書型ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
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
    result = await getSelectData_core( viewColumns, joinIdMap );
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
    if( typeof result[i].viewColumnId !== "string" ){
      if( !result[i].viewColumnId ){
        throw new Error(`result[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
    }
    if( typeof result[i].viewColumnType !== "string" ){
      if( !result[i].viewColumnType ){
        throw new Error(`result[${i}].viewColumnTypeがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
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
    if( typeof result[i].viewColumnName !== "string" ){
      if( !result[i].viewColumnName ){
        throw new Error(`result[${i}].viewColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
      }
      else{
        throw new Error(`result[${i}].viewColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getSelectData`);
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
  if( joinIdMap===null || joinIdMap===undefined ){
    throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
  }
  else if( typeof joinIdMap !== "object" ){
    throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
  }
  else if( joinIdMap.constructor !== Object ){
    throw new Error(`joinIdMapが辞書型ではありません。\nレイヤー : convert_sql_data\n関数 : getJoinData`);
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
export async function getWhereData( viewColumns, conditionInfoList, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(viewColumns) ){
    if( !viewColumns ){
      throw new Error(`viewColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    else{
      throw new Error(`viewColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  for( let i=0; i<viewColumns.length; i++ ){
    if( typeof viewColumns[i] !== "object" ){
      if( !viewColumns[i] ){
        throw new Error(`viewColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`viewColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof viewColumns[i].viewColumnId !== "string" ){
      if( !viewColumns[i].viewColumnId ){
        throw new Error(`viewColumns[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof viewColumns[i].viewColumnType !== "string" ){
      if( !viewColumns[i].viewColumnType ){
        throw new Error(`viewColumns[${i}].viewColumnTypeがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof viewColumns[i].columnPath !== "string" ){
      if( !viewColumns[i].columnPath ){
        throw new Error(`viewColumns[${i}].columnPathがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`viewColumns[${i}].columnPathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof viewColumns[i].viewColumnName !== "string" ){
      if( !viewColumns[i].viewColumnName ){
        throw new Error(`viewColumns[${i}].viewColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
  }
  if( !Array.isArray(conditionInfoList) ){
    if( !conditionInfoList ){
      throw new Error(`conditionInfoListがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
    else{
      throw new Error(`conditionInfoListが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
    }
  }
  for( let i=0; i<conditionInfoList.length; i++ ){
    if( typeof conditionInfoList[i] !== "object" ){
      if( !conditionInfoList[i] ){
        throw new Error(`conditionInfoList[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditionInfoList[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof conditionInfoList[i].viewColumnId !== "string" ){
      if( !conditionInfoList[i].viewColumnId ){
        throw new Error(`conditionInfoList[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditionInfoList[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof conditionInfoList[i].conditionalExpression !== "string" ){
      if( !conditionInfoList[i].conditionalExpression ){
        throw new Error(`conditionInfoList[${i}].conditionalExpressionがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`conditionInfoList[${i}].conditionalExpressionが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
  }
  if( joinIdMap===null || joinIdMap===undefined ){
    throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
  }
  else if( typeof joinIdMap !== "object" ){
    throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
  }
  else if( joinIdMap.constructor !== Object ){
    throw new Error(`joinIdMapが辞書型ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
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
    result = await getWhereData_core( viewColumns, conditionInfoList, joinIdMap );
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
    if( typeof result[i].viewColumnId !== "string" ){
      if( !result[i].viewColumnId ){
        throw new Error(`result[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
    }
    if( typeof result[i].conditionalExpression !== "string" ){
      if( !result[i].conditionalExpression ){
        throw new Error(`result[${i}].conditionalExpressionがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].conditionalExpressionが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
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
    if( typeof result[i].viewColumnName !== "string" ){
      if( !result[i].viewColumnName ){
        throw new Error(`result[${i}].viewColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
      }
      else{
        throw new Error(`result[${i}].viewColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getWhereData`);
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
export async function getOrderData( viewColumns, sortOrder, joinIdMap ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(viewColumns) ){
    if( !viewColumns ){
      throw new Error(`viewColumnsがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
    else{
      throw new Error(`viewColumnsが配列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  for( let i=0; i<viewColumns.length; i++ ){
    if( typeof viewColumns[i] !== "object" ){
      if( !viewColumns[i] ){
        throw new Error(`viewColumns[${i}]がNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`viewColumns[${i}]がオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof viewColumns[i].viewColumnId !== "string" ){
      if( !viewColumns[i].viewColumnId ){
        throw new Error(`viewColumns[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof viewColumns[i].viewColumnType !== "string" ){
      if( !viewColumns[i].viewColumnType ){
        throw new Error(`viewColumns[${i}].viewColumnTypeがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof viewColumns[i].columnPath !== "string" ){
      if( !viewColumns[i].columnPath ){
        throw new Error(`viewColumns[${i}].columnPathがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`viewColumns[${i}].columnPathが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    if( typeof viewColumns[i].viewColumnName !== "string" ){
      if( !viewColumns[i].viewColumnName ){
        throw new Error(`viewColumns[${i}].viewColumnNameがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnNameが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
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
    if( typeof sortOrder[i].viewColumnId !== "string" ){
      if( !sortOrder[i].viewColumnId ){
        throw new Error(`sortOrder[${i}].viewColumnIdがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`sortOrder[${i}].viewColumnIdが文字列ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
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
  if( joinIdMap===null || joinIdMap===undefined ){
    throw new Error(`joinIdMapがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
  }
  else if( typeof joinIdMap !== "object" ){
    throw new Error(`joinIdMapがオブジェクトではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
  }
  else if( joinIdMap.constructor !== Object ){
    throw new Error(`joinIdMapが辞書型ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
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
    result = await getOrderData_core( viewColumns, sortOrder, joinIdMap );
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
    if( typeof result[i].isAscending !== "boolean" ){
      if( !result[i].isAscending ){
        throw new Error(`result[${i}].isAscendingがNULLです。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
      else{
        throw new Error(`result[${i}].isAscendingがブール値ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
      }
    }
    else if( isNaN(result[i].isAscending) ){
      throw new Error(`result[${i}].isAscendingがブール値ではありません。\nレイヤー : convert_sql_data\n関数 : getOrderData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


