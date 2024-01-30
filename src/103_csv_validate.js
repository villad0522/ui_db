import {
  createRecordsFromCsv_core,  // CSVファイルインポート
  getCsvProgress_core,  // インポートの進捗状況を取得する関数
  destroyCSV_core,  // インポートを中断する関数
  close_core,  // バックエンドプログラム終了
} from "./104_csv.js";


//#######################################################################################
// 関数「createRecordsFromCsv_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecordsFromCsv( filePath ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : csv\n関数 : createRecordsFromCsv`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : csv\n関数 : createRecordsFromCsv`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecordsFromCsv_core( filePath );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : csv\n関数 : createRecordsFromCsv`);
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
// 関数「getCsvProgress_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getCsvProgress(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getCsvProgress_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : csv\n関数 : getCsvProgress`);
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
      throw new Error(`resultがNULLです。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
  }
  if( typeof result.progressMessage !== "string" ){
    if( !result.progressMessage ){
      throw new Error(`result.progressMessageがNULLです。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.progressMessageが文字列ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
  }
  if( typeof result.successCount !== "number" ){
    if( !result.successCount ){
      throw new Error(`result.successCountがNULLです。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.successCountが数値ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result.successCount) ){
    throw new Error(`result.successCountが数値ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
  }
  if( typeof result.errorCount !== "number" ){
    if( !result.errorCount ){
      throw new Error(`result.errorCountがNULLです。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.errorCountが数値ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result.errorCount) ){
    throw new Error(`result.errorCountが数値ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
  }
  if( typeof result.csvSize !== "number" ){
    if( !result.csvSize ){
      throw new Error(`result.csvSizeがNULLです。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
    else{
      throw new Error(`result.csvSizeが数値ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
    }
  }
  else if( isNaN(result.csvSize) ){
    throw new Error(`result.csvSizeが数値ではありません。\nレイヤー : csv\n関数 : getCsvProgress`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「destroyCSV_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function destroyCSV(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await destroyCSV_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : csv\n関数 : destroyCSV`);
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
      throw new Error(`resultがNULLです。\nレイヤー : csv\n関数 : destroyCSV`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : csv\n関数 : destroyCSV`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「close_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function close(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await close_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : csv\n関数 : close`);
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


