import {
  setBugMode,
  generateSQLwithDuplication_core,  // SQLクエリを生成
} from "./005_generate_sql1.js";


    
//#######################################################################################
// テストを実行する関数

async function _test(){
    
}

export async function test004() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 7; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        return {
            userMessage: `レイヤー「generate_sql1」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    return {
        userMessage: `レイヤー「generate_sql1」からバグは見つかりませんでした。また、意図的に${ i }件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}



//#######################################################################################
// 関数「generateSQLwithDuplication_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQLwithDuplication( tableId, selectData, joinData, whereData, orderData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  if( !Array.isArray(selectData) ){
    if( !selectData ){
      throw new Error(`selectDataがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`selectDataが配列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  for( let i=0; i<selectData.length; i++ ){
    if( typeof selectData[i] !== "object" ){
      if( !selectData[i] ){
        throw new Error(`selectData[${i}]がNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`selectData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof selectData[i].type !== "string" ){
      if( !selectData[i].type ){
        throw new Error(`selectData[${i}].typeがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].typeが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof selectData[i].joinId !== "string" ){
      if( !selectData[i].joinId ){
        throw new Error(`selectData[${i}].joinIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].joinIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof selectData[i].columnName !== "string" ){
      if( !selectData[i].columnName ){
        throw new Error(`selectData[${i}].columnNameがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].columnNameが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof selectData[i].as !== "string" ){
      if( !selectData[i].as ){
        throw new Error(`selectData[${i}].asがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`selectData[${i}].asが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
  }
  if( !Array.isArray(joinData) ){
    if( !joinData ){
      throw new Error(`joinDataがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`joinDataが配列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  for( let i=0; i<joinData.length; i++ ){
    if( typeof joinData[i] !== "object" ){
      if( !joinData[i] ){
        throw new Error(`joinData[${i}]がNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`joinData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof joinData[i].fromJoinId !== "string" ){
      if( !joinData[i].fromJoinId ){
        throw new Error(`joinData[${i}].fromJoinIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].fromJoinIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof joinData[i].fromColumnName !== "string" ){
      if( !joinData[i].fromColumnName ){
        throw new Error(`joinData[${i}].fromColumnNameがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].fromColumnNameが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof joinData[i].toJoinId !== "string" ){
      if( !joinData[i].toJoinId ){
        throw new Error(`joinData[${i}].toJoinIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].toJoinIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof joinData[i].toTableName !== "string" ){
      if( !joinData[i].toTableName ){
        throw new Error(`joinData[${i}].toTableNameがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].toTableNameが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof joinData[i].toColumnName !== "string" ){
      if( !joinData[i].toColumnName ){
        throw new Error(`joinData[${i}].toColumnNameがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`joinData[${i}].toColumnNameが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
  }
  if( !Array.isArray(whereData) ){
    if( !whereData ){
      throw new Error(`whereDataがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`whereDataが配列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  for( let i=0; i<whereData.length; i++ ){
    if( typeof whereData[i] !== "object" ){
      if( !whereData[i] ){
        throw new Error(`whereData[${i}]がNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`whereData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof whereData[i].displayColumnId !== "string" ){
      if( !whereData[i].displayColumnId ){
        throw new Error(`whereData[${i}].displayColumnIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].displayColumnIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof whereData[i].type !== "string" ){
      if( !whereData[i].type ){
        throw new Error(`whereData[${i}].typeがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].typeが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof whereData[i].joinId !== "string" ){
      if( !whereData[i].joinId ){
        throw new Error(`whereData[${i}].joinIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].joinIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof whereData[i].columnName !== "string" ){
      if( !whereData[i].columnName ){
        throw new Error(`whereData[${i}].columnNameがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].columnNameが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof whereData[i].as !== "string" ){
      if( !whereData[i].as ){
        throw new Error(`whereData[${i}].asがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`whereData[${i}].asが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
  }
  if( !Array.isArray(orderData) ){
    if( !orderData ){
      throw new Error(`orderDataがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`orderDataが配列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  for( let i=0; i<orderData.length; i++ ){
    if( typeof orderData[i] !== "object" ){
      if( !orderData[i] ){
        throw new Error(`orderData[${i}]がNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`orderData[${i}]がオブジェクトではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof orderData[i].type !== "string" ){
      if( !orderData[i].type ){
        throw new Error(`orderData[${i}].typeがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].typeが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof orderData[i].joinId !== "string" ){
      if( !orderData[i].joinId ){
        throw new Error(`orderData[${i}].joinIdがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].joinIdが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof orderData[i].columnName !== "string" ){
      if( !orderData[i].columnName ){
        throw new Error(`orderData[${i}].columnNameがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].columnNameが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
    if( typeof orderData[i].as !== "string" ){
      if( !orderData[i].as ){
        throw new Error(`orderData[${i}].asがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
      else{
        throw new Error(`orderData[${i}].asが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await generateSQLwithDuplication_core( tableId, selectData, joinData, whereData, orderData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
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
      throw new Error(`resultがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  if( typeof result.sql !== "string" ){
    if( !result.sql ){
      throw new Error(`result.sqlがNULLです。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
    else{
      throw new Error(`result.sqlが文字列ではありません。\nレイヤー : generate_sql1\n関数 : generateSQLwithDuplication`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


