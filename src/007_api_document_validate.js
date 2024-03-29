import {
  runApi_core,  // APIを実行する関数
} from "./008_api_document.js";


//#######################################################################################
// 関数「runApi_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function runApi( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof httpMethod !== "string" ){
    if( !httpMethod ){
      throw new Error(`httpMethodがNULLです。\nレイヤー : api_document\n関数 : runApi`);
    }
    else{
      throw new Error(`httpMethodが文字列ではありません。\nレイヤー : api_document\n関数 : runApi`);
    }
  }
  if( typeof endpointPath !== "string" ){
    if( !endpointPath ){
      throw new Error(`endpointPathがNULLです。\nレイヤー : api_document\n関数 : runApi`);
    }
    else{
      throw new Error(`endpointPathが文字列ではありません。\nレイヤー : api_document\n関数 : runApi`);
    }
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : api_document\n関数 : runApi`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : api_document\n関数 : runApi`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : api_document\n関数 : runApi`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : api_document\n関数 : runApi`);
    }
  }
  if( requestBody===null || requestBody===undefined ){
    throw new Error(`requestBodyがNULLです。\nレイヤー : api_document\n関数 : runApi`);
  }
  else if( typeof requestBody !== "object" ){
    throw new Error(`requestBodyがオブジェクトではありません。\nレイヤー : api_document\n関数 : runApi`);
  }
  else if( requestBody.constructor !== Object ){
    throw new Error(`requestBodyが辞書型ではありません。\nレイヤー : api_document\n関数 : runApi`);
  }
  for( const i in requestBody ){
    if( typeof i !== "string" ){
      throw new Error(`requestBodyのキーが文字列ではありません。\nレイヤー : api_document\n関数 : runApi`);
    }
  }
  if( typeof isRequestFormData !== "boolean" ){
    if( !isRequestFormData ){
      throw new Error(`isRequestFormDataがNULLです。\nレイヤー : api_document\n関数 : runApi`);
    }
    else{
      throw new Error(`isRequestFormDataがブール値ではありません。\nレイヤー : api_document\n関数 : runApi`);
    }
  }
  else if( isNaN(isRequestFormData) ){
    throw new Error(`isRequestFormDataがブール値ではありません。\nレイヤー : api_document\n関数 : runApi`);
  }
  if( typeof isResponseFormData !== "boolean" ){
    if( !isResponseFormData ){
      throw new Error(`isResponseFormDataがNULLです。\nレイヤー : api_document\n関数 : runApi`);
    }
    else{
      throw new Error(`isResponseFormDataがブール値ではありません。\nレイヤー : api_document\n関数 : runApi`);
    }
  }
  else if( isNaN(isResponseFormData) ){
    throw new Error(`isResponseFormDataがブール値ではありません。\nレイヤー : api_document\n関数 : runApi`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await runApi_core( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : api_document\n関数 : runApi`);
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


