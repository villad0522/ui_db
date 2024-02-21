import {
  getPageDataForGUI_core,  // データを取得(GUI向け)
  getPageDataForExcel_core,  // データを取得(Excel向け)
  _getDataList_core,  // 【サブ】Excel向けのデータを取得1
  _getSheetDatas_core,  // 【サブ】Excel向けのデータを取得2
} from "./059_page_data.js";


//#######################################################################################
// 関数「getPageDataForGUI_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPageDataForGUI( pageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPageDataForGUI_core( pageId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_data\n関数 : getPageDataForGUI`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( result===null || result===undefined ){
    throw new Error(`resultがNULLです。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  else if( typeof result !== "object" ){
    throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  else if( result.constructor !== Object ){
    throw new Error(`resultが辞書型ではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForGUI`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getPageDataForExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getPageDataForExcel( nowPageId, excelPageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof nowPageId !== "number" ){
    if( !nowPageId ){
      throw new Error(`nowPageIdがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    else{
      throw new Error(`nowPageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
  }
  else if( isNaN(nowPageId) ){
    throw new Error(`nowPageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
  }
  if( typeof excelPageId !== "number" ){
    if( !excelPageId ){
      throw new Error(`excelPageIdがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    else{
      throw new Error(`excelPageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
  }
  else if( isNaN(excelPageId) ){
    throw new Error(`excelPageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getPageDataForExcel_core( nowPageId, excelPageId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_data\n関数 : getPageDataForExcel`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
  }
  for( let i=0; i<result.length; i++ ){
    if( result[i]===null || result[i]===undefined ){
      throw new Error(`result[${i}]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    else if( typeof result[i] !== "object" ){
      throw new Error(`result[${i}]がオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    else if( result[i].constructor !== Object ){
      throw new Error(`result[${i}]が辞書型ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    for( const j in result[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result[${i}]のキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
      }
      if( !Array.isArray(result[i][j]) ){
        if( !result[i][j] ){
          throw new Error(`result[${i}]["${j}"]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}]["${j}"]が配列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      for( let k=0; k<result[i][j].length; k++ ){
        if( result[i][j][k]===null || result[i][j][k]===undefined ){
          throw new Error(`result[${i}]["${j}"][${k}]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else if( typeof result[i][j][k] !== "object" ){
          throw new Error(`result[${i}]["${j}"][${k}]がオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else if( result[i][j][k].constructor !== Object ){
          throw new Error(`result[${i}]["${j}"][${k}]が辞書型ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        for( const l in result[i][j][k] ){
          if( typeof l !== "string" ){
            throw new Error(`result[${i}]["${j}"][${k}]のキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
        }
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_getDataList_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getDataList( nowPageId, excelPageId, queryParameters, nestLevel ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof nowPageId !== "number" ){
    if( !nowPageId ){
      throw new Error(`nowPageIdがNULLです。\nレイヤー : page_data\n関数 : _getDataList`);
    }
    else{
      throw new Error(`nowPageIdが数値ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
    }
  }
  else if( isNaN(nowPageId) ){
    throw new Error(`nowPageIdが数値ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
  }
  if( typeof excelPageId !== "number" ){
    if( !excelPageId ){
      throw new Error(`excelPageIdがNULLです。\nレイヤー : page_data\n関数 : _getDataList`);
    }
    else{
      throw new Error(`excelPageIdが数値ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
    }
  }
  else if( isNaN(excelPageId) ){
    throw new Error(`excelPageIdが数値ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : page_data\n関数 : _getDataList`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : page_data\n関数 : _getDataList`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
    }
  }
  if( typeof nestLevel !== "number" ){
    if( !nestLevel ){
      throw new Error(`nestLevelがNULLです。\nレイヤー : page_data\n関数 : _getDataList`);
    }
    else{
      throw new Error(`nestLevelが数値ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
    }
  }
  else if( isNaN(nestLevel) ){
    throw new Error(`nestLevelが数値ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getDataList_core( nowPageId, excelPageId, queryParameters, nestLevel );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_data\n関数 : _getDataList`);
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
      throw new Error(`resultがNULLです。\nレイヤー : page_data\n関数 : _getDataList`);
    }
    else{
      throw new Error(`resultが配列ではありません。\nレイヤー : page_data\n関数 : _getDataList`);
    }
  }
  for( let i=0; i<result.length; i++ ){
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_getSheetDatas_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _getSheetDatas( pageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_data\n関数 : _getSheetDatas`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _getSheetDatas_core( pageId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_data\n関数 : _getSheetDatas`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( result===null || result===undefined ){
    throw new Error(`resultがNULLです。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  else if( typeof result !== "object" ){
    throw new Error(`resultがオブジェクトではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  else if( result.constructor !== Object ){
    throw new Error(`resultが辞書型ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
  }
  for( const i in result ){
    if( typeof i !== "string" ){
      throw new Error(`resultのキーが文字列ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
    }
    if( !Array.isArray(result[i]) ){
      if( !result[i] ){
        throw new Error(`result["${i}"]がNULLです。\nレイヤー : page_data\n関数 : _getSheetDatas`);
      }
      else{
        throw new Error(`result["${i}"]が配列ではありません。\nレイヤー : page_data\n関数 : _getSheetDatas`);
      }
    }
    for( let j=0; j<result[i].length; j++ ){
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


