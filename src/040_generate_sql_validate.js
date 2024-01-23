import {
  generateSQL_core,  // SQLクエリを生成
} from "./041_generate_sql.js";


//#######################################################################################
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( tableId, joinedColumns, conditionInfoList, sortOrder ){
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
  if( !Array.isArray(joinedColumns) ){
    if( !joinedColumns ){
      throw new Error(`joinedColumnsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`joinedColumnsが配列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<joinedColumns.length; i++ ){
    if( typeof joinedColumns[i] !== "object" ){
      if( !joinedColumns[i] ){
        throw new Error(`joinedColumns[${i}]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`joinedColumns[${i}]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof joinedColumns[i].joinedColumnId !== "string" ){
      if( !joinedColumns[i].joinedColumnId ){
        throw new Error(`joinedColumns[${i}].joinedColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`joinedColumns[${i}].joinedColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof joinedColumns[i].joinedColumnType !== "string" ){
      if( !joinedColumns[i].joinedColumnType ){
        throw new Error(`joinedColumns[${i}].joinedColumnTypeがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`joinedColumns[${i}].joinedColumnTypeが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof joinedColumns[i].columnPath !== "string" ){
      if( !joinedColumns[i].columnPath ){
        throw new Error(`joinedColumns[${i}].columnPathがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`joinedColumns[${i}].columnPathが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof joinedColumns[i].joinedColumnName !== "string" ){
      if( !joinedColumns[i].joinedColumnName ){
        throw new Error(`joinedColumns[${i}].joinedColumnNameがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`joinedColumns[${i}].joinedColumnNameが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
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
    if( typeof conditionInfoList[i].joinedColumnId !== "string" ){
      if( !conditionInfoList[i].joinedColumnId ){
        throw new Error(`conditionInfoList[${i}].joinedColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditionInfoList[${i}].joinedColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
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
    if( typeof sortOrder[i].joinedColumnId !== "string" ){
      if( !sortOrder[i].joinedColumnId ){
        throw new Error(`sortOrder[${i}].joinedColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}].joinedColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
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
    result = await generateSQL_core( tableId, joinedColumns, conditionInfoList, sortOrder );
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
  if( typeof result !== "object" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  if( typeof result.sql !== "string" ){
    if( !result.sql ){
      throw new Error(`result.sqlがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`result.sqlが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


