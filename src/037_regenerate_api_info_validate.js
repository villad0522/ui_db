import {
  regenerateAPI_autoCorrect_core,  // 予測変換のAPIを再生成
} from "./038_regenerate_api_info.js";


//#######################################################################################
// 関数「regenerateAPI_autoCorrect_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function regenerateAPI_autoCorrect( viewId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof viewId !== "number" ){
    if( !viewId ){
      throw new Error(`viewIdがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else{
      throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  else if( isNaN(viewId) ){
    throw new Error(`viewIdが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await regenerateAPI_autoCorrect_core( viewId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
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
      throw new Error(`resultがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  if( typeof result.viewId !== "number" ){
    if( !result.viewId ){
      throw new Error(`result.viewIdがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else{
      throw new Error(`result.viewIdが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  else if( isNaN(result.viewId) ){
    throw new Error(`result.viewIdが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  if( typeof result.httpMethod !== "string" ){
    if( !result.httpMethod ){
      throw new Error(`result.httpMethodがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else{
      throw new Error(`result.httpMethodが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  if( typeof result.description !== "string" ){
    if( !result.description ){
      throw new Error(`result.descriptionがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else{
      throw new Error(`result.descriptionが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  if( typeof result.commandName !== "string" ){
    if( !result.commandName ){
      throw new Error(`result.commandNameがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else{
      throw new Error(`result.commandNameが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  if( result.queryParameters===null || result.queryParameters===undefined ){
    throw new Error(`result.queryParametersがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  else if( typeof result.queryParameters !== "object" ){
    throw new Error(`result.queryParametersがオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  else if( result.queryParameters.constructor !== Object ){
    throw new Error(`result.queryParametersが辞書型ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  for( const i in result.queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`result.queryParametersのキーが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( typeof result.queryParameters[i] !== "object" ){
      if( !result.queryParameters[i] ){
        throw new Error(`result.queryParameters["${i}"]がNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
      }
      else{
        throw new Error(`result.queryParameters["${i}"]がオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
      }
    }
    if( (result.queryParameters[i].dataType===null) || (result.queryParameters[i].dataType===undefined) ){
      // result.queryParameters[i].dataTypeは空欄OK。
    }
    else if( typeof result.queryParameters[i].dataType !== "string" ){
      throw new Error(`result.queryParameters["${i}"].dataTypeが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.queryParameters[i].description===null) || (result.queryParameters[i].description===undefined) ){
      // result.queryParameters[i].descriptionは空欄OK。
    }
    else if( typeof result.queryParameters[i].description !== "string" ){
      throw new Error(`result.queryParameters["${i}"].descriptionが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.queryParameters[i].isRequired===null) || (result.queryParameters[i].isRequired===undefined) ){
      // result.queryParameters[i].isRequiredは空欄OK。
    }
    else if( typeof result.queryParameters[i].isRequired !== "boolean" ){
      throw new Error(`result.queryParameters["${i}"].isRequiredがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.queryParameters[i].isRequired) ){
      throw new Error(`result.queryParameters["${i}"].isRequiredがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.queryParameters[i].title===null) || (result.queryParameters[i].title===undefined) ){
      // result.queryParameters[i].titleは空欄OK。
    }
    else if( typeof result.queryParameters[i].title !== "string" ){
      throw new Error(`result.queryParameters["${i}"].titleが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.queryParameters[i].isArray===null) || (result.queryParameters[i].isArray===undefined) ){
      // result.queryParameters[i].isArrayは空欄OK。
    }
    else if( typeof result.queryParameters[i].isArray !== "boolean" ){
      throw new Error(`result.queryParameters["${i}"].isArrayがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.queryParameters[i].isArray) ){
      throw new Error(`result.queryParameters["${i}"].isArrayがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.queryParameters[i].onePageMaxSize===null) || (result.queryParameters[i].onePageMaxSize===undefined) ){
      // result.queryParameters[i].onePageMaxSizeは空欄OK。
    }
    else if( typeof result.queryParameters[i].onePageMaxSize !== "number" ){
      throw new Error(`result.queryParameters["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.queryParameters[i].onePageMaxSize) ){
      throw new Error(`result.queryParameters["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  if( result.requestBody===null || result.requestBody===undefined ){
    throw new Error(`result.requestBodyがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  else if( typeof result.requestBody !== "object" ){
    throw new Error(`result.requestBodyがオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  else if( result.requestBody.constructor !== Object ){
    throw new Error(`result.requestBodyが辞書型ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  for( const i in result.requestBody ){
    if( typeof i !== "string" ){
      throw new Error(`result.requestBodyのキーが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( typeof result.requestBody[i] !== "object" ){
      if( !result.requestBody[i] ){
        throw new Error(`result.requestBody["${i}"]がNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
      }
      else{
        throw new Error(`result.requestBody["${i}"]がオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
      }
    }
    if( (result.requestBody[i].dataType===null) || (result.requestBody[i].dataType===undefined) ){
      // result.requestBody[i].dataTypeは空欄OK。
    }
    else if( typeof result.requestBody[i].dataType !== "string" ){
      throw new Error(`result.requestBody["${i}"].dataTypeが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.requestBody[i].description===null) || (result.requestBody[i].description===undefined) ){
      // result.requestBody[i].descriptionは空欄OK。
    }
    else if( typeof result.requestBody[i].description !== "string" ){
      throw new Error(`result.requestBody["${i}"].descriptionが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.requestBody[i].isRequired===null) || (result.requestBody[i].isRequired===undefined) ){
      // result.requestBody[i].isRequiredは空欄OK。
    }
    else if( typeof result.requestBody[i].isRequired !== "boolean" ){
      throw new Error(`result.requestBody["${i}"].isRequiredがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.requestBody[i].isRequired) ){
      throw new Error(`result.requestBody["${i}"].isRequiredがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.requestBody[i].title===null) || (result.requestBody[i].title===undefined) ){
      // result.requestBody[i].titleは空欄OK。
    }
    else if( typeof result.requestBody[i].title !== "string" ){
      throw new Error(`result.requestBody["${i}"].titleが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.requestBody[i].isArray===null) || (result.requestBody[i].isArray===undefined) ){
      // result.requestBody[i].isArrayは空欄OK。
    }
    else if( typeof result.requestBody[i].isArray !== "boolean" ){
      throw new Error(`result.requestBody["${i}"].isArrayがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.requestBody[i].isArray) ){
      throw new Error(`result.requestBody["${i}"].isArrayがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.requestBody[i].onePageMaxSize===null) || (result.requestBody[i].onePageMaxSize===undefined) ){
      // result.requestBody[i].onePageMaxSizeは空欄OK。
    }
    else if( typeof result.requestBody[i].onePageMaxSize !== "number" ){
      throw new Error(`result.requestBody["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.requestBody[i].onePageMaxSize) ){
      throw new Error(`result.requestBody["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  if( result.response===null || result.response===undefined ){
    throw new Error(`result.responseがNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  else if( typeof result.response !== "object" ){
    throw new Error(`result.responseがオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  else if( result.response.constructor !== Object ){
    throw new Error(`result.responseが辞書型ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
  }
  for( const i in result.response ){
    if( typeof i !== "string" ){
      throw new Error(`result.responseのキーが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( typeof result.response[i] !== "object" ){
      if( !result.response[i] ){
        throw new Error(`result.response["${i}"]がNULLです。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
      }
      else{
        throw new Error(`result.response["${i}"]がオブジェクトではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
      }
    }
    if( (result.response[i].dataType===null) || (result.response[i].dataType===undefined) ){
      // result.response[i].dataTypeは空欄OK。
    }
    else if( typeof result.response[i].dataType !== "string" ){
      throw new Error(`result.response["${i}"].dataTypeが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.response[i].description===null) || (result.response[i].description===undefined) ){
      // result.response[i].descriptionは空欄OK。
    }
    else if( typeof result.response[i].description !== "string" ){
      throw new Error(`result.response["${i}"].descriptionが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.response[i].title===null) || (result.response[i].title===undefined) ){
      // result.response[i].titleは空欄OK。
    }
    else if( typeof result.response[i].title !== "string" ){
      throw new Error(`result.response["${i}"].titleが文字列ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.response[i].isArray===null) || (result.response[i].isArray===undefined) ){
      // result.response[i].isArrayは空欄OK。
    }
    else if( typeof result.response[i].isArray !== "boolean" ){
      throw new Error(`result.response["${i}"].isArrayがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.response[i].isArray) ){
      throw new Error(`result.response["${i}"].isArrayがブール値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    if( (result.response[i].onePageMaxSize===null) || (result.response[i].onePageMaxSize===undefined) ){
      // result.response[i].onePageMaxSizeは空欄OK。
    }
    else if( typeof result.response[i].onePageMaxSize !== "number" ){
      throw new Error(`result.response["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
    else if( isNaN(result.response[i].onePageMaxSize) ){
      throw new Error(`result.response["${i}"].onePageMaxSizeが数値ではありません。\nレイヤー : regenerate_api_info\n関数 : regenerateAPI_autoCorrect`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


