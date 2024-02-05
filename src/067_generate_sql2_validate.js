import {
  generateSQLwithoutDuplication_core,  // SQLクエリを生成
} from "./068_generate_sql2.js";


//#######################################################################################
// 関数「generateSQLwithoutDuplication_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQLwithoutDuplication( tableId, selectData, joinData, whereData, orderData, isCount ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  if( !Array.isArray(selectData) ){
    if( !selectData ){
      throw new Error(`selectDataがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`selectDataが配列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  for( let i=0; i<selectData.length; i++ ){
    if( typeof selectData[i] !== "object" ){
      if( !selectData[i] ){
        throw new Error(`selectData[${i}]がNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`selectData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof selectData[i].viewColumnId !== "string" ){
      if( !selectData[i].viewColumnId ){
        throw new Error(`selectData[${i}].viewColumnIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].viewColumnIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof selectData[i].viewColumnType !== "string" ){
      if( !selectData[i].viewColumnType ){
        throw new Error(`selectData[${i}].viewColumnTypeがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof selectData[i].joinId !== "string" ){
      if( !selectData[i].joinId ){
        throw new Error(`selectData[${i}].joinIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].joinIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof selectData[i].columnName !== "string" ){
      if( !selectData[i].columnName ){
        throw new Error(`selectData[${i}].columnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].columnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof selectData[i].viewColumnName !== "string" ){
      if( !selectData[i].viewColumnName ){
        throw new Error(`selectData[${i}].viewColumnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].viewColumnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
  }
  if( !Array.isArray(joinData) ){
    if( !joinData ){
      throw new Error(`joinDataがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`joinDataが配列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  for( let i=0; i<joinData.length; i++ ){
    if( typeof joinData[i] !== "object" ){
      if( !joinData[i] ){
        throw new Error(`joinData[${i}]がNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`joinData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof joinData[i].fromJoinId !== "string" ){
      if( !joinData[i].fromJoinId ){
        throw new Error(`joinData[${i}].fromJoinIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].fromJoinIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof joinData[i].fromColumnName !== "string" ){
      if( !joinData[i].fromColumnName ){
        throw new Error(`joinData[${i}].fromColumnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].fromColumnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof joinData[i].toJoinId !== "string" ){
      if( !joinData[i].toJoinId ){
        throw new Error(`joinData[${i}].toJoinIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].toJoinIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof joinData[i].toTableName !== "string" ){
      if( !joinData[i].toTableName ){
        throw new Error(`joinData[${i}].toTableNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].toTableNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof joinData[i].toColumnName !== "string" ){
      if( !joinData[i].toColumnName ){
        throw new Error(`joinData[${i}].toColumnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].toColumnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
  }
  if( !Array.isArray(whereData) ){
    if( !whereData ){
      throw new Error(`whereDataがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`whereDataが配列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  for( let i=0; i<whereData.length; i++ ){
    if( typeof whereData[i] !== "object" ){
      if( !whereData[i] ){
        throw new Error(`whereData[${i}]がNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`whereData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof whereData[i].viewColumnId !== "string" ){
      if( !whereData[i].viewColumnId ){
        throw new Error(`whereData[${i}].viewColumnIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].viewColumnIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof whereData[i].conditionalExpression !== "string" ){
      if( !whereData[i].conditionalExpression ){
        throw new Error(`whereData[${i}].conditionalExpressionがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].conditionalExpressionが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof whereData[i].joinId !== "string" ){
      if( !whereData[i].joinId ){
        throw new Error(`whereData[${i}].joinIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].joinIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof whereData[i].columnName !== "string" ){
      if( !whereData[i].columnName ){
        throw new Error(`whereData[${i}].columnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].columnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof whereData[i].viewColumnName !== "string" ){
      if( !whereData[i].viewColumnName ){
        throw new Error(`whereData[${i}].viewColumnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].viewColumnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
  }
  if( !Array.isArray(orderData) ){
    if( !orderData ){
      throw new Error(`orderDataがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`orderDataが配列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  for( let i=0; i<orderData.length; i++ ){
    if( typeof orderData[i] !== "object" ){
      if( !orderData[i] ){
        throw new Error(`orderData[${i}]がNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`orderData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof orderData[i].joinId !== "string" ){
      if( !orderData[i].joinId ){
        throw new Error(`orderData[${i}].joinIdがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].joinIdが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof orderData[i].columnName !== "string" ){
      if( !orderData[i].columnName ){
        throw new Error(`orderData[${i}].columnNameがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].columnNameが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    if( typeof orderData[i].isAscending !== "boolean" ){
      if( !orderData[i].isAscending ){
        throw new Error(`orderData[${i}].isAscendingがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].isAscendingがブール値ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
      }
    }
    else if( isNaN(orderData[i].isAscending) ){
      throw new Error(`orderData[${i}].isAscendingがブール値ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  if( typeof isCount !== "boolean" ){
    if( !isCount ){
      throw new Error(`isCountがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`isCountがブール値ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  else if( isNaN(isCount) ){
    throw new Error(`isCountがブール値ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQLwithoutDuplication_core( tableId, selectData, joinData, whereData, orderData, isCount );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
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
      throw new Error(`resultがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


