import {
  generateSQL_core,  // SQLクエリを生成
} from "./053_generate_sql.js";


//#######################################################################################
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( tableId, viewColumns, conditionInfoList, sortOrder ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  if( !Array.isArray(viewColumns) ){
    if( !viewColumns ){
      throw new Error(`viewColumnsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`viewColumnsが配列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<viewColumns.length; i++ ){
    if( typeof viewColumns[i] !== "object" ){
      if( !viewColumns[i] ){
        throw new Error(`viewColumns[${i}]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`viewColumns[${i}]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof viewColumns[i].viewColumnId !== "string" ){
      if( !viewColumns[i].viewColumnId ){
        throw new Error(`viewColumns[${i}].viewColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof viewColumns[i].viewColumnType !== "string" ){
      if( !viewColumns[i].viewColumnType ){
        throw new Error(`viewColumns[${i}].viewColumnTypeがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnTypeが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof viewColumns[i].columnPath !== "string" ){
      if( !viewColumns[i].columnPath ){
        throw new Error(`viewColumns[${i}].columnPathがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`viewColumns[${i}].columnPathが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof viewColumns[i].viewColumnName !== "string" ){
      if( !viewColumns[i].viewColumnName ){
        throw new Error(`viewColumns[${i}].viewColumnNameがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`viewColumns[${i}].viewColumnNameが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
  }
  if( !Array.isArray(conditionInfoList) ){
    if( !conditionInfoList ){
      throw new Error(`conditionInfoListがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`conditionInfoListが配列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<conditionInfoList.length; i++ ){
    if( typeof conditionInfoList[i] !== "object" ){
      if( !conditionInfoList[i] ){
        throw new Error(`conditionInfoList[${i}]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditionInfoList[${i}]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditionInfoList[i].viewColumnId !== "string" ){
      if( !conditionInfoList[i].viewColumnId ){
        throw new Error(`conditionInfoList[${i}].viewColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditionInfoList[${i}].viewColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditionInfoList[i].conditionalExpression !== "string" ){
      if( !conditionInfoList[i].conditionalExpression ){
        throw new Error(`conditionInfoList[${i}].conditionalExpressionがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditionInfoList[${i}].conditionalExpressionが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
  }
  if( !Array.isArray(sortOrder) ){
    if( !sortOrder ){
      throw new Error(`sortOrderがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`sortOrderが配列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<sortOrder.length; i++ ){
    if( typeof sortOrder[i] !== "object" ){
      if( !sortOrder[i] ){
        throw new Error(`sortOrder[${i}]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof sortOrder[i].viewColumnId !== "string" ){
      if( !sortOrder[i].viewColumnId ){
        throw new Error(`sortOrder[${i}].viewColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}].viewColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof sortOrder[i].isAscending !== "boolean" ){
      if( !sortOrder[i].isAscending ){
        throw new Error(`sortOrder[${i}].isAscendingがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}].isAscendingがブール値ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    else if( isNaN(sortOrder[i].isAscending) ){
      throw new Error(`sortOrder[${i}].isAscendingがブール値ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( tableId, viewColumns, conditionInfoList, sortOrder );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : generate_sql\n関数 : generateSQL`);
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
      throw new Error(`resultがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


