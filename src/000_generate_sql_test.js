import {
  generateSQL_core,  // SQLクエリを生成
} from "./001_generate_sql.js";


//#######################################################################################
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( tableId, parentColumnLists, childColumnLists, conditions ){
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
  if( typeof parentColumnLists !== "object" ){
    if( !parentColumnLists ){
      throw new Error(`parentColumnListsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`parentColumnListsがオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  else if( typeof parentColumnLists[Symbol.iterator] !== "function" ){
    throw new Error(`parentColumnListsが反復可能オブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
  }
  for( const i in parentColumnLists ){
    if( typeof i !== "string" ){
      throw new Error(`parentColumnListsのキーが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  if( typeof childColumnLists !== "object" ){
    if( !childColumnLists ){
      throw new Error(`childColumnListsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`childColumnListsがオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  else if( typeof childColumnLists[Symbol.iterator] !== "function" ){
    throw new Error(`childColumnListsが反復可能オブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
  }
  for( const i in childColumnLists ){
    if( typeof i !== "string" ){
      throw new Error(`childColumnListsのキーが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    if( typeof childColumnLists[i] !== "object" ){
      if( !childColumnLists[i] ){
        throw new Error(`childColumnLists["${i}"]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`childColumnLists["${i}"]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof childColumnLists[i].type !== "string" ){
      if( !childColumnLists[i].type ){
        throw new Error(`childColumnLists["${i}"].typeがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`childColumnLists["${i}"].typeが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof childColumnLists[i].path !== "string" ){
      if( !childColumnLists[i].path ){
        throw new Error(`childColumnLists["${i}"].pathがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`childColumnLists["${i}"].pathが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
  }
  if( typeof conditions !== "object" ){
    if( !conditions ){
      throw new Error(`conditionsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`conditionsがオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  else if( typeof conditions[Symbol.iterator] !== "function" ){
    throw new Error(`conditionsが反復可能オブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
  }
  for( const i in conditions ){
    if( typeof i !== "string" ){
      throw new Error(`conditionsのキーが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    if( typeof conditions[i] !== "object" ){
      if( !conditions[i] ){
        throw new Error(`conditions["${i}"]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions["${i}"]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].type !== "string" ){
      if( !conditions[i].type ){
        throw new Error(`conditions["${i}"].typeがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions["${i}"].typeが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].value !== "number" ){
      if( !conditions[i].value ){
        throw new Error(`conditions["${i}"].valueがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions["${i}"].valueが数値ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    else if( isNaN(conditions[i].value) ){
      throw new Error(`conditions["${i}"].valueが数値ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQL_core( tableId, parentColumnLists, childColumnLists, conditions );
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


