import {
  setBugMode,
  main_core,  // メイン関数
} from "./001_main.js";


    
//#######################################################################################
// テストを実行する関数

async function _test(){
    
}

export async function test000() {
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
            userMessage: `レイヤー「main」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    return {
        userMessage: `レイヤー「main」からバグは見つかりませんでした。また、意図的に${ i }件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}



//#######################################################################################
// 関数「main_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function main(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await main_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : main\n関数 : main`);
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


