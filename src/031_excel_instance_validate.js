import {
  openExcel_core,  // Excelを開く
} from "./032_excel_instance.js";


//#######################################################################################
// 関数「openExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function openExcel( clientIpAddress, pageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof clientIpAddress !== "string" ){
    if( !clientIpAddress ){
      throw new Error(`clientIpAddressがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`clientIpAddressが文字列ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  if( queryParameters===null || queryParameters===undefined ){
    throw new Error(`queryParametersがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  else if( typeof queryParameters !== "object" ){
    throw new Error(`queryParametersがオブジェクトではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  else if( queryParameters.constructor !== Object ){
    throw new Error(`queryParametersが辞書型ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
  }
  for( const i in queryParameters ){
    if( typeof i !== "string" ){
      throw new Error(`queryParametersのキーが文字列ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await openExcel_core( clientIpAddress, pageId, queryParameters );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_instance\n関数 : openExcel`);
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
      throw new Error(`resultがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  if( typeof result.fileName !== "string" ){
    if( !result.fileName ){
      throw new Error(`result.fileNameがNULLです。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
    else{
      throw new Error(`result.fileNameが文字列ではありません。\nレイヤー : excel_instance\n関数 : openExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


