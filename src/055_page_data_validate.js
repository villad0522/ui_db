import {
  getPageDataForGUI_core,  // データを取得(GUI向け)
  getPageDataForExcel_core,  // データを取得(Excel向け)
  myFunc_core,  // 新しい関数
} from "./056_page_data.js";


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
export async function getPageDataForExcel( pageId, queryParameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
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
    result = await getPageDataForExcel_core( pageId, queryParameters );
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
    if( !Array.isArray(result[i]) ){
      if( !result[i] ){
        throw new Error(`result[${i}]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
      }
      else{
        throw new Error(`result[${i}]が配列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
      }
    }
    for( let j=0; j<result[i].length; j++ ){
      if( typeof result[i][j] !== "object" ){
        if( !result[i][j] ){
          throw new Error(`result[${i}][${j}]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}][${j}]がオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      if( typeof result[i][j].sheetName !== "string" ){
        if( !result[i][j].sheetName ){
          throw new Error(`result[${i}][${j}].sheetNameがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}][${j}].sheetNameが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      if( typeof result[i][j].excelStartRow !== "number" ){
        if( !result[i][j].excelStartRow ){
          throw new Error(`result[${i}][${j}].excelStartRowがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}][${j}].excelStartRowが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      else if( isNaN(result[i][j].excelStartRow) ){
        throw new Error(`result[${i}][${j}].excelStartRowが数値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
      }
      if( typeof result[i][j].isTableHeader !== "boolean" ){
        if( !result[i][j].isTableHeader ){
          throw new Error(`result[${i}][${j}].isTableHeaderがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}][${j}].isTableHeaderがブール値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      else if( isNaN(result[i][j].isTableHeader) ){
        throw new Error(`result[${i}][${j}].isTableHeaderがブール値ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
      }
      if( !Array.isArray(result[i][j].viewColumns) ){
        if( !result[i][j].viewColumns ){
          throw new Error(`result[${i}][${j}].viewColumnsがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}][${j}].viewColumnsが配列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      for( let k=0; k<result[i][j].viewColumns.length; k++ ){
        if( typeof result[i][j].viewColumns[k] !== "object" ){
          if( !result[i][j].viewColumns[k] ){
            throw new Error(`result[${i}][${j}].viewColumns[${k}]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
          else{
            throw new Error(`result[${i}][${j}].viewColumns[${k}]がオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
        }
        if( typeof result[i][j].viewColumns[k].viewColumnId !== "string" ){
          if( !result[i][j].viewColumns[k].viewColumnId ){
            throw new Error(`result[${i}][${j}].viewColumns[${k}].viewColumnIdがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
          else{
            throw new Error(`result[${i}][${j}].viewColumns[${k}].viewColumnIdが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
        }
        if( typeof result[i][j].viewColumns[k].viewColumnName !== "string" ){
          if( !result[i][j].viewColumns[k].viewColumnName ){
            throw new Error(`result[${i}][${j}].viewColumns[${k}].viewColumnNameがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
          else{
            throw new Error(`result[${i}][${j}].viewColumns[${k}].viewColumnNameが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
        }
        if( typeof result[i][j].viewColumns[k].excelColumnText !== "string" ){
          if( !result[i][j].viewColumns[k].excelColumnText ){
            throw new Error(`result[${i}][${j}].viewColumns[${k}].excelColumnTextがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
          else{
            throw new Error(`result[${i}][${j}].viewColumns[${k}].excelColumnTextが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
          }
        }
      }
      if( !Array.isArray(result[i][j].rowDatas) ){
        if( !result[i][j].rowDatas ){
          throw new Error(`result[${i}][${j}].rowDatasがNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else{
          throw new Error(`result[${i}][${j}].rowDatasが配列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
      }
      for( let k=0; k<result[i][j].rowDatas.length; k++ ){
        if( result[i][j].rowDatas[k]===null || result[i][j].rowDatas[k]===undefined ){
          throw new Error(`result[${i}][${j}].rowDatas[${k}]がNULLです。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else if( typeof result[i][j].rowDatas[k] !== "object" ){
          throw new Error(`result[${i}][${j}].rowDatas[${k}]がオブジェクトではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        else if( result[i][j].rowDatas[k].constructor !== Object ){
          throw new Error(`result[${i}][${j}].rowDatas[${k}]が辞書型ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
        }
        for( const l in result[i][j].rowDatas[k] ){
          if( typeof l !== "string" ){
            throw new Error(`result[${i}][${j}].rowDatas[${k}]のキーが文字列ではありません。\nレイヤー : page_data\n関数 : getPageDataForExcel`);
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
// 関数「myFunc_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function myFunc(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await myFunc_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : page_data\n関数 : myFunc`);
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


