import {
  runApi_core,  // APIを実行する関数
  getEndpointInfo_core,  // エンドポイントの情報を取得
} from "./020_auto_correct.js";


//#######################################################################################
// 関数「runApi_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function runApi( httpMethod, endpointPath, queryParameters, requestBody, isRequestFormData, isResponseFormData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof httpMethod !== "string" ){
    if( !httpMethod ){
      throw new Error(`httpMethodがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
    }
    else{
      throw new Error(`httpMethodが文字列ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  if( typeof endpointPath !== "string" ){
    if( !endpointPath ){
      throw new Error(`endpointPathがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
    }
    else{
      throw new Error(`endpointPathが文字列ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  if( requestBody===null || requestBody===undefined ){
    throw new Error(`requestBodyがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  else if( typeof requestBody !== "object" ){
    throw new Error(`requestBodyがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  else if( requestBody.constructor !== Object ){
    throw new Error(`requestBodyが辞書型ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  for( const i in requestBody ){
    if( typeof i !== "string" ){
      throw new Error(`requestBodyのキーが文字列ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  if( typeof isRequestFormData !== "boolean" ){
    if( !isRequestFormData ){
      throw new Error(`isRequestFormDataがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
    }
    else{
      throw new Error(`isRequestFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  else if( isNaN(isRequestFormData) ){
    throw new Error(`isRequestFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  if( typeof isResponseFormData !== "boolean" ){
    if( !isResponseFormData ){
      throw new Error(`isResponseFormDataがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
    }
    else{
      throw new Error(`isResponseFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  else if( isNaN(isResponseFormData) ){
    throw new Error(`isResponseFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
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
      throw new Error(`${error}\nレイヤー : auto_correct\n関数 : runApi`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( result===null || result===undefined ){
    throw new Error(`resultがNULLです。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  else if( typeof result !== "object" ){
    throw new Error(`resultがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  else if( result.constructor !== Object ){
    throw new Error(`resultが辞書型ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : auto_correct\n関数 : runApi`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getEndpointInfo_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getEndpointInfo( endpointPath, isRequestFormData, isResponseFormData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof endpointPath !== "string" ){
    if( !endpointPath ){
      throw new Error(`endpointPathがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`endpointPathが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  if( typeof isRequestFormData !== "boolean" ){
    if( !isRequestFormData ){
      throw new Error(`isRequestFormDataがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`isRequestFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  else if( isNaN(isRequestFormData) ){
    throw new Error(`isRequestFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  if( typeof isResponseFormData !== "boolean" ){
    if( !isResponseFormData ){
      throw new Error(`isResponseFormDataがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`isResponseFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  else if( isNaN(isResponseFormData) ){
    throw new Error(`isResponseFormDataがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getEndpointInfo_core( endpointPath, isRequestFormData, isResponseFormData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
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
      throw new Error(`resultがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.httpMethod !== "string" ){
    if( !result.httpMethod ){
      throw new Error(`result.httpMethodがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.httpMethodが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.description !== "string" ){
    if( !result.description ){
      throw new Error(`result.descriptionがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.descriptionが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  if( result.queryParameters===null || result.queryParameters===undefined ){
    throw new Error(`result.queryParametersがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  else if( typeof result.queryParameters !== "object" ){
    throw new Error(`result.queryParametersがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  else if( result.queryParameters.constructor !== Object ){
    throw new Error(`result.queryParametersが辞書型ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  for( const i in result.queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`result.queryParametersのキーが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    if( typeof result.queryParameters[i] !== "object" ){
      if( !result.queryParameters[i] ){
        throw new Error(`result.queryParameters["${i}"]がNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"]がオブジェクトではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
    }
    if( typeof result.queryParameters[i].dataType !== "string" ){
      if( !result.queryParameters[i].dataType ){
        throw new Error(`result.queryParameters["${i}"].dataTypeがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"].dataTypeが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
    }
    if( typeof result.queryParameters[i].description !== "string" ){
      if( !result.queryParameters[i].description ){
        throw new Error(`result.queryParameters["${i}"].descriptionがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"].descriptionが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
    }
    if( typeof result.queryParameters[i].isRequired !== "boolean" ){
      if( !result.queryParameters[i].isRequired ){
        throw new Error(`result.queryParameters["${i}"].isRequiredがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"].isRequiredがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
    }
    else if( isNaN(result.queryParameters[i].isRequired) ){
      throw new Error(`result.queryParameters["${i}"].isRequiredがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.requestBody !== "object" ){
    if( !result.requestBody ){
      throw new Error(`result.requestBodyがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.requestBodyがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  if( result.response===null || result.response===undefined ){
    throw new Error(`result.responseがNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  else if( typeof result.response !== "object" ){
    throw new Error(`result.responseがオブジェクトではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  else if( result.response.constructor !== Object ){
    throw new Error(`result.responseが辞書型ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
  }
  for( const i in result.response ){
    if( typeof i !== "string" ){
      throw new Error(`result.responseのキーが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    if( typeof result.response[i] !== "object" ){
      if( !result.response[i] ){
        throw new Error(`result.response["${i}"]がNULLです。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.response["${i}"]がオブジェクトではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
      }
    }
    if( (result.response[i].title===null) || (result.response[i].title===undefined) ){
      // result.response[i].titleは空欄OK。
    }
    else if( typeof result.response[i].title !== "string" ){
      throw new Error(`result.response["${i}"].titleが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].isArray===null) || (result.response[i].isArray===undefined) ){
      // result.response[i].isArrayは空欄OK。
    }
    else if( typeof result.response[i].isArray !== "boolean" ){
      throw new Error(`result.response["${i}"].isArrayがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else if( isNaN(result.response[i].isArray) ){
      throw new Error(`result.response["${i}"].isArrayがブール値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].onePageMaxSize===null) || (result.response[i].onePageMaxSize===undefined) ){
      // result.response[i].onePageMaxSizeは空欄OK。
    }
    else if( typeof result.response[i].onePageMaxSize !== "number" ){
      throw new Error(`result.response["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    else if( isNaN(result.response[i].onePageMaxSize) ){
      throw new Error(`result.response["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].dataType===null) || (result.response[i].dataType===undefined) ){
      // result.response[i].dataTypeは空欄OK。
    }
    else if( typeof result.response[i].dataType !== "string" ){
      throw new Error(`result.response["${i}"].dataTypeが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].description===null) || (result.response[i].description===undefined) ){
      // result.response[i].descriptionは空欄OK。
    }
    else if( typeof result.response[i].description !== "string" ){
      throw new Error(`result.response["${i}"].descriptionが文字列ではありません。\nレイヤー : auto_correct\n関数 : getEndpointInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}

