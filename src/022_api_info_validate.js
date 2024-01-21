import {
  getEndpointInfo_core,  // エンドポイントの情報を取得
  listEndpoints_core,  // エンドポイントを全て取得
  clearCache_core,  // インメモリキャッシュを削除する
} from "./023_api_info.js";


//#######################################################################################
// 関数「getEndpointInfo_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getEndpointInfo( endpointPath ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof endpointPath !== "string" ){
    if( !endpointPath ){
      throw new Error(`endpointPathがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`endpointPathが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getEndpointInfo_core( endpointPath );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : api_info\n関数 : getEndpointInfo`);
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
      throw new Error(`resultがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.httpMethod !== "string" ){
    if( !result.httpMethod ){
      throw new Error(`result.httpMethodがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.httpMethodが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.description !== "string" ){
    if( !result.description ){
      throw new Error(`result.descriptionがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.descriptionが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.commandName !== "string" ){
    if( !result.commandName ){
      throw new Error(`result.commandNameがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.commandNameが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  if( result.queryParameters===null || result.queryParameters===undefined ){
    throw new Error(`result.queryParametersがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
  }
  else if( typeof result.queryParameters !== "object" ){
    throw new Error(`result.queryParametersがオブジェクトではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
  }
  else if( result.queryParameters.constructor !== Object ){
    throw new Error(`result.queryParametersが辞書型ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
  }
  for( const i in result.queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`result.queryParametersのキーが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    if( typeof result.queryParameters[i] !== "object" ){
      if( !result.queryParameters[i] ){
        throw new Error(`result.queryParameters["${i}"]がNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"]がオブジェクトではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
    }
    if( typeof result.queryParameters[i].dataType !== "string" ){
      if( !result.queryParameters[i].dataType ){
        throw new Error(`result.queryParameters["${i}"].dataTypeがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"].dataTypeが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
    }
    if( typeof result.queryParameters[i].description !== "string" ){
      if( !result.queryParameters[i].description ){
        throw new Error(`result.queryParameters["${i}"].descriptionがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"].descriptionが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
    }
    if( typeof result.queryParameters[i].isRequired !== "boolean" ){
      if( !result.queryParameters[i].isRequired ){
        throw new Error(`result.queryParameters["${i}"].isRequiredがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"].isRequiredがブール値ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
    }
    else if( isNaN(result.queryParameters[i].isRequired) ){
      throw new Error(`result.queryParameters["${i}"].isRequiredがブール値ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  if( typeof result.requestBody !== "object" ){
    if( !result.requestBody ){
      throw new Error(`result.requestBodyがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else{
      throw new Error(`result.requestBodyがオブジェクトではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  if( result.response===null || result.response===undefined ){
    throw new Error(`result.responseがNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
  }
  else if( typeof result.response !== "object" ){
    throw new Error(`result.responseがオブジェクトではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
  }
  else if( result.response.constructor !== Object ){
    throw new Error(`result.responseが辞書型ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
  }
  for( const i in result.response ){
    if( typeof i !== "string" ){
      throw new Error(`result.responseのキーが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    if( typeof result.response[i] !== "object" ){
      if( !result.response[i] ){
        throw new Error(`result.response["${i}"]がNULLです。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
      else{
        throw new Error(`result.response["${i}"]がオブジェクトではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
      }
    }
    if( (result.response[i].title===null) || (result.response[i].title===undefined) ){
      // result.response[i].titleは空欄OK。
    }
    else if( typeof result.response[i].title !== "string" ){
      throw new Error(`result.response["${i}"].titleが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].isArray===null) || (result.response[i].isArray===undefined) ){
      // result.response[i].isArrayは空欄OK。
    }
    else if( typeof result.response[i].isArray !== "boolean" ){
      throw new Error(`result.response["${i}"].isArrayがブール値ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else if( isNaN(result.response[i].isArray) ){
      throw new Error(`result.response["${i}"].isArrayがブール値ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].onePageMaxSize===null) || (result.response[i].onePageMaxSize===undefined) ){
      // result.response[i].onePageMaxSizeは空欄OK。
    }
    else if( typeof result.response[i].onePageMaxSize !== "number" ){
      throw new Error(`result.response["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    else if( isNaN(result.response[i].onePageMaxSize) ){
      throw new Error(`result.response["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].dataType===null) || (result.response[i].dataType===undefined) ){
      // result.response[i].dataTypeは空欄OK。
    }
    else if( typeof result.response[i].dataType !== "string" ){
      throw new Error(`result.response["${i}"].dataTypeが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
    if( (result.response[i].description===null) || (result.response[i].description===undefined) ){
      // result.response[i].descriptionは空欄OK。
    }
    else if( typeof result.response[i].description !== "string" ){
      throw new Error(`result.response["${i}"].descriptionが文字列ではありません。\nレイヤー : api_info\n関数 : getEndpointInfo`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listEndpoints_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listEndpoints(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listEndpoints_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : api_info\n関数 : listEndpoints`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( !Array.isArray(result) ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : api_info\n関数 : listEndpoints`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : api_info\n関数 : listEndpoints`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( typeof result[i] !== "object" ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
      else{
        throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
    }
    if( typeof result[i].endpointPath !== "string" ){
      if( !result[i].endpointPath ){
        throw new Error(`result[${i}].endpointPathがNULLです。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
      else{
        throw new Error(`result[${i}].endpointPathが文字列ではありません。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
    }
    if( typeof result[i].httpMethod !== "string" ){
      if( !result[i].httpMethod ){
        throw new Error(`result[${i}].httpMethodがNULLです。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
      else{
        throw new Error(`result[${i}].httpMethodが文字列ではありません。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
    }
    if( typeof result[i].description !== "string" ){
      if( !result[i].description ){
        throw new Error(`result[${i}].descriptionがNULLです。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
      else{
        throw new Error(`result[${i}].descriptionが文字列ではありません。\nレイヤー : api_info\n関数 : listEndpoints`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「clearCache_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function clearCache(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await clearCache_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : api_info\n関数 : clearCache`);
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


