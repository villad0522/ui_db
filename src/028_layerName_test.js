import {
  setBugMode,
  getPrimaryKey_core,  // プライマリキーを取得する関数
} from "./029_layerName.js";


    
//#######################################################################################
// テストを実行する関数

async function _test(){
    
}

export async function test028() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 0; i++ ) {
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
            userMessage: `レイヤー「layerName」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    return {
        userMessage: `レイヤー「layerName」からバグは見つかりませんでした。また、意図的に${ i }件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}



//#######################################################################################
// 関数「getPrimaryKey_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPrimaryKey( tableId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : layerName\n関数 : getPrimaryKey`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : layerName\n関数 : getPrimaryKey`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPrimaryKey_core( tableId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : layerName\n関数 : getPrimaryKey`);
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
      throw new Error(`resultがNULLです。\nレイヤー : layerName\n関数 : getPrimaryKey`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : layerName\n関数 : getPrimaryKey`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


