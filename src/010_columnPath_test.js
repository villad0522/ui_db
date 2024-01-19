import {
  setBugMode,
  getPathLength_core,  // カラムパスの長さを取得する
  slicePath_core,  // パスを途中まで切り取る関数
  checkPath_core,  // パスの文法をチェックする関数
  pathToColumnId_core,  // パスをカラムIDに変換
} from "./011_columnPath.js";


    
//#######################################################################################
// テストを実行する関数

async function _test(){
    
}

export async function test010() {
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
            userMessage: `レイヤー「columnPath」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    return {
        userMessage: `レイヤー「columnPath」からバグは見つかりませんでした。また、意図的に${ i }件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}



//#######################################################################################
// 関数「getPathLength_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPathLength( pathText ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pathText !== "string" ){
    if( !pathText ){
      throw new Error(`pathTextがNULLです。\nレイヤー : columnPath\n関数 : getPathLength`);
    }
    else{
      throw new Error(`pathTextが文字列ではありません。\nレイヤー : columnPath\n関数 : getPathLength`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPathLength_core( pathText );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : columnPath\n関数 : getPathLength`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "number" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : columnPath\n関数 : getPathLength`);
    }
    else{
      throw new Error(`resultが数値ではありません。\nレイヤー : columnPath\n関数 : getPathLength`);
    }
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : columnPath\n関数 : getPathLength`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「slicePath_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function slicePath( pathText, length ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pathText !== "string" ){
    if( !pathText ){
      throw new Error(`pathTextがNULLです。\nレイヤー : columnPath\n関数 : slicePath`);
    }
    else{
      throw new Error(`pathTextが文字列ではありません。\nレイヤー : columnPath\n関数 : slicePath`);
    }
  }
  if( typeof length !== "number" ){
    if( !length ){
      throw new Error(`lengthがNULLです。\nレイヤー : columnPath\n関数 : slicePath`);
    }
    else{
      throw new Error(`lengthが数値ではありません。\nレイヤー : columnPath\n関数 : slicePath`);
    }
  }
  else if( isNaN(length) ){
    throw new Error(`lengthが数値ではありません。\nレイヤー : columnPath\n関数 : slicePath`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await slicePath_core( pathText, length );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : columnPath\n関数 : slicePath`);
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
      throw new Error(`resultがNULLです。\nレイヤー : columnPath\n関数 : slicePath`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : columnPath\n関数 : slicePath`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「checkPath_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function checkPath( pathText ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pathText !== "string" ){
    if( !pathText ){
      throw new Error(`pathTextがNULLです。\nレイヤー : columnPath\n関数 : checkPath`);
    }
    else{
      throw new Error(`pathTextが文字列ではありません。\nレイヤー : columnPath\n関数 : checkPath`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await checkPath_core( pathText );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : columnPath\n関数 : checkPath`);
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
// 関数「pathToColumnId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function pathToColumnId( pathText ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pathText !== "string" ){
    if( !pathText ){
      throw new Error(`pathTextがNULLです。\nレイヤー : columnPath\n関数 : pathToColumnId`);
    }
    else{
      throw new Error(`pathTextが文字列ではありません。\nレイヤー : columnPath\n関数 : pathToColumnId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await pathToColumnId_core( pathText );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : columnPath\n関数 : pathToColumnId`);
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
      throw new Error(`resultがNULLです。\nレイヤー : columnPath\n関数 : pathToColumnId`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : columnPath\n関数 : pathToColumnId`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


