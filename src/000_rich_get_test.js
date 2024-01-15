import {
  startUp_core,  // プログラム起動
  listRecords_core,  // レコードの一覧を取得
} from "./001_rich_get.js";


//#######################################################################################
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl, isDebug ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : rich_get\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : rich_get\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : rich_get\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : rich_get\n関数 : startUp`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await startUp_core( localUrl, isDebug );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : rich_get\n関数 : startUp`);
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
// 関数「listRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listRecords( tableId, pageNumber_records, onePageMaxSize, isTrash ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  if( typeof pageNumber_records !== "number" ){
    if( !pageNumber_records ){
      throw new Error(`pageNumber_recordsがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`pageNumber_recordsが数値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  else if( isNaN(pageNumber_records) ){
    throw new Error(`pageNumber_recordsが数値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listRecords_core( tableId, pageNumber_records, onePageMaxSize, isTrash );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : rich_get\n関数 : listRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  if( !Array.isArray(result.records) ){
    if( !result.records ){
      throw new Error(`result.recordsがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.recordsが配列ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  for( let i=0; i<result.records.length; i++ ){
    if( typeof result.records[i] !== "object" ){
      if( !result.records[i] ){
        throw new Error(`result.records[${i}]がNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.records[${i}]がオブジェクトではありません。\nレイヤー : rich_get\n関数 : listRecords`);
      }
    }
    else if( typeof result.records[i][Symbol.iterator] !== "function" ){
      throw new Error(`result.records[${i}]が反復可能オブジェクトではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    for( const j in result.records[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result.records[${i}]のキーが文字列ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
      }
    }
  }
  if( typeof result.records_total !== "number" ){
    if( !result.records_total ){
      throw new Error(`result.records_totalがNULLです。\nレイヤー : rich_get\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.records_totalが数値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
    }
  }
  else if( isNaN(result.records_total) ){
    throw new Error(`result.records_totalが数値ではありません。\nレイヤー : rich_get\n関数 : listRecords`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


