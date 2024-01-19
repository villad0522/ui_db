import {
  setBugMode,
  generateSQL_core,  // SQLクエリを生成
} from "./003_generate_sql.js";


    
//#######################################################################################
// テストを実行する関数

async function _test(){
    
}

export async function test002() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 3; i++ ) {
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
            userMessage: `レイヤー「generate_sql」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    return {
        userMessage: `レイヤー「generate_sql」からバグは見つかりませんでした。また、意図的に${ i }件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}



//#######################################################################################
// 関数「generateSQL_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function generateSQL( tableId, displayColumns, conditions, sortOrder ){
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
  if( !Array.isArray(displayColumns) ){
    if( !displayColumns ){
      throw new Error(`displayColumnsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`displayColumnsが配列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<displayColumns.length; i++ ){
    if( typeof displayColumns[i] !== "object" ){
      if( !displayColumns[i] ){
        throw new Error(`displayColumns[${i}]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].displayColumnId !== "string" ){
      if( !displayColumns[i].displayColumnId ){
        throw new Error(`displayColumns[${i}].displayColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].displayColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].type !== "string" ){
      if( !displayColumns[i].type ){
        throw new Error(`displayColumns[${i}].typeがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].typeが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].path !== "string" ){
      if( !displayColumns[i].path ){
        throw new Error(`displayColumns[${i}].pathがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].pathが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof displayColumns[i].as !== "string" ){
      if( !displayColumns[i].as ){
        throw new Error(`displayColumns[${i}].asがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`displayColumns[${i}].asが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
  }
  if( !Array.isArray(conditions) ){
    if( !conditions ){
      throw new Error(`conditionsがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
    else{
      throw new Error(`conditionsが配列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
    }
  }
  for( let i=0; i<conditions.length; i++ ){
    if( typeof conditions[i] !== "object" ){
      if( !conditions[i] ){
        throw new Error(`conditions[${i}]がNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}]がオブジェクトではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].displayColumnId !== "string" ){
      if( !conditions[i].displayColumnId ){
        throw new Error(`conditions[${i}].displayColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}].displayColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].type !== "string" ){
      if( !conditions[i].type ){
        throw new Error(`conditions[${i}].typeがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}].typeが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    if( typeof conditions[i].value !== "number" ){
      if( !conditions[i].value ){
        throw new Error(`conditions[${i}].valueがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`conditions[${i}].valueが数値ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
    }
    else if( isNaN(conditions[i].value) ){
      throw new Error(`conditions[${i}].valueが数値ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
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
    if( typeof sortOrder[i].displayColumnId !== "string" ){
      if( !sortOrder[i].displayColumnId ){
        throw new Error(`sortOrder[${i}].displayColumnIdがNULLです。\nレイヤー : generate_sql\n関数 : generateSQL`);
      }
      else{
        throw new Error(`sortOrder[${i}].displayColumnIdが文字列ではありません。\nレイヤー : generate_sql\n関数 : generateSQL`);
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
    result = await generateSQL_core( tableId, displayColumns, conditions, sortOrder );
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


