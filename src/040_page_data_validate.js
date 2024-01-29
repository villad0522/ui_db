import {
  getPageData_core,  // データを取得
} from "./041_page_data.js";


//#######################################################################################
// 関数「getPageData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPageData( pageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_data\n関数 : getPageData`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageData`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageData`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : page_data\n関数 : getPageData`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageData`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : page_data\n関数 : getPageData`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPageData_core( pageId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_data\n関数 : getPageData`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( result===null || result===undefined ){
    throw new Error(`resultがNULLです。\nレイヤー : page_data\n関数 : getPageData`);
  }
  else if( typeof result !== "object" ){
    throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageData`);
  }
  else if( result.constructor !== Object ){
    throw new Error(`resultが辞書型ではありません。\nレイヤー : page_data\n関数 : getPageData`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


