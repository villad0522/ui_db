import {
  generateSQLwithoutDuplication_core,  // SQLクエリを生成
} from "./005_generate_sql2.js";


//#######################################################################################
// 関数「generateSQLwithoutDuplication_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQLwithoutDuplication( tableId, countTableIdList ){
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
  if( typeof countTableIdList !== "string" ){
    if( !countTableIdList ){
      throw new Error(`countTableIdListがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`countTableIdListが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQLwithoutDuplication_core( tableId, countTableIdList );
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
  if( typeof result !== "object" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  if( typeof result.sql !== "string" ){
    if( !result.sql ){
      throw new Error(`result.sqlがNULLです。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
    else{
      throw new Error(`result.sqlが文字列ではありません。\nレイヤー : generate_sql2\n関数 : generateSQLwithoutDuplication`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


