import {
  updateExcel_core,  // エクセルファイルを更新する関数
  _updateExcelSheet_core,  // 【サブ】シート１個を編集する関数
  extractTemplate_core,  // テンプレートを抽出する関数
} from "./035_excel_content.js";


//#######################################################################################
// 関数「updateExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateExcel( fileData, sheetInfos, dataList ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(sheetInfos) ){
    if( !sheetInfos ){
      throw new Error(`sheetInfosがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    else{
      throw new Error(`sheetInfosが配列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
  }
  for( let i=0; i<sheetInfos.length; i++ ){
    if( typeof sheetInfos[i] !== "object" ){
      if( !sheetInfos[i] ){
        throw new Error(`sheetInfos[${i}]がNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetInfos[${i}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
    }
    if( typeof sheetInfos[i].viewId !== "number" ){
      if( !sheetInfos[i].viewId ){
        throw new Error(`sheetInfos[${i}].viewIdがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetInfos[${i}].viewIdが数値ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
    }
    else if( isNaN(sheetInfos[i].viewId) ){
      throw new Error(`sheetInfos[${i}].viewIdが数値ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    if( typeof sheetInfos[i].sheetName !== "string" ){
      if( !sheetInfos[i].sheetName ){
        throw new Error(`sheetInfos[${i}].sheetNameがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetInfos[${i}].sheetNameが文字列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
    }
    if( typeof sheetInfos[i].excelStartRow !== "number" ){
      if( !sheetInfos[i].excelStartRow ){
        throw new Error(`sheetInfos[${i}].excelStartRowがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetInfos[${i}].excelStartRowが数値ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
    }
    else if( isNaN(sheetInfos[i].excelStartRow) ){
      throw new Error(`sheetInfos[${i}].excelStartRowが数値ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    if( typeof sheetInfos[i].isTableHeader !== "boolean" ){
      if( !sheetInfos[i].isTableHeader ){
        throw new Error(`sheetInfos[${i}].isTableHeaderがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetInfos[${i}].isTableHeaderがブール値ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
    }
    else if( isNaN(sheetInfos[i].isTableHeader) ){
      throw new Error(`sheetInfos[${i}].isTableHeaderがブール値ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    if( !Array.isArray(sheetInfos[i].viewColumns) ){
      if( !sheetInfos[i].viewColumns ){
        throw new Error(`sheetInfos[${i}].viewColumnsがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetInfos[${i}].viewColumnsが配列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
    }
    for( let j=0; j<sheetInfos[i].viewColumns.length; j++ ){
      if( typeof sheetInfos[i].viewColumns[j] !== "object" ){
        if( !sheetInfos[i].viewColumns[j] ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}]がNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
      }
      if( typeof sheetInfos[i].viewColumns[j].viewColumnId !== "string" ){
        if( !sheetInfos[i].viewColumns[j].viewColumnId ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnIdがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnIdが文字列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
      }
      if( typeof sheetInfos[i].viewColumns[j].viewColumnName !== "string" ){
        if( !sheetInfos[i].viewColumns[j].viewColumnName ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnNameがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnNameが文字列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
      }
      if( typeof sheetInfos[i].viewColumns[j].excelColumnText !== "string" ){
        if( !sheetInfos[i].viewColumns[j].excelColumnText ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].excelColumnTextがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].excelColumnTextが文字列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
      }
    }
  }
  if( !Array.isArray(dataList) ){
    if( !dataList ){
      throw new Error(`dataListがNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    else{
      throw new Error(`dataListが配列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
  }
  for( let i=0; i<dataList.length; i++ ){
    if( dataList[i]===null || dataList[i]===undefined ){
      throw new Error(`dataList[${i}]がNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    else if( typeof dataList[i] !== "object" ){
      throw new Error(`dataList[${i}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    else if( dataList[i].constructor !== Object ){
      throw new Error(`dataList[${i}]が辞書型ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
    }
    for( const j in dataList[i] ){
      if( typeof j !== "string" ){
        throw new Error(`dataList[${i}]のキーが文字列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
      }
      if( !Array.isArray(dataList[i][j]) ){
        if( !dataList[i][j] ){
          throw new Error(`dataList[${i}]["${j}"]がNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}]["${j}"]が配列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
      }
      for( let k=0; k<dataList[i][j].length; k++ ){
        if( dataList[i][j][k]===null || dataList[i][j][k]===undefined ){
          throw new Error(`dataList[${i}]["${j}"][${k}]がNULLです。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else if( typeof dataList[i][j][k] !== "object" ){
          throw new Error(`dataList[${i}]["${j}"][${k}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        else if( dataList[i][j][k].constructor !== Object ){
          throw new Error(`dataList[${i}]["${j}"][${k}]が辞書型ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
        }
        for( const l in dataList[i][j][k] ){
          if( typeof l !== "string" ){
            throw new Error(`dataList[${i}]["${j}"][${k}]のキーが文字列ではありません。\nレイヤー : excel_content\n関数 : updateExcel`);
          }
        }
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateExcel_core( fileData, sheetInfos, dataList );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_content\n関数 : updateExcel`);
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
// 関数「_updateExcelSheet_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _updateExcelSheet( workbook, sheetInfos, dataList ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(sheetInfos) ){
    if( !sheetInfos ){
      throw new Error(`sheetInfosがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    else{
      throw new Error(`sheetInfosが配列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
  }
  for( let i=0; i<sheetInfos.length; i++ ){
    if( typeof sheetInfos[i] !== "object" ){
      if( !sheetInfos[i] ){
        throw new Error(`sheetInfos[${i}]がNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`sheetInfos[${i}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
    }
    if( typeof sheetInfos[i].viewId !== "number" ){
      if( !sheetInfos[i].viewId ){
        throw new Error(`sheetInfos[${i}].viewIdがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`sheetInfos[${i}].viewIdが数値ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
    }
    else if( isNaN(sheetInfos[i].viewId) ){
      throw new Error(`sheetInfos[${i}].viewIdが数値ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    if( typeof sheetInfos[i].sheetName !== "string" ){
      if( !sheetInfos[i].sheetName ){
        throw new Error(`sheetInfos[${i}].sheetNameがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`sheetInfos[${i}].sheetNameが文字列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
    }
    if( typeof sheetInfos[i].excelStartRow !== "number" ){
      if( !sheetInfos[i].excelStartRow ){
        throw new Error(`sheetInfos[${i}].excelStartRowがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`sheetInfos[${i}].excelStartRowが数値ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
    }
    else if( isNaN(sheetInfos[i].excelStartRow) ){
      throw new Error(`sheetInfos[${i}].excelStartRowが数値ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    if( typeof sheetInfos[i].isTableHeader !== "boolean" ){
      if( !sheetInfos[i].isTableHeader ){
        throw new Error(`sheetInfos[${i}].isTableHeaderがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`sheetInfos[${i}].isTableHeaderがブール値ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
    }
    else if( isNaN(sheetInfos[i].isTableHeader) ){
      throw new Error(`sheetInfos[${i}].isTableHeaderがブール値ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    if( !Array.isArray(sheetInfos[i].viewColumns) ){
      if( !sheetInfos[i].viewColumns ){
        throw new Error(`sheetInfos[${i}].viewColumnsがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`sheetInfos[${i}].viewColumnsが配列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
    }
    for( let j=0; j<sheetInfos[i].viewColumns.length; j++ ){
      if( typeof sheetInfos[i].viewColumns[j] !== "object" ){
        if( !sheetInfos[i].viewColumns[j] ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}]がNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
      }
      if( typeof sheetInfos[i].viewColumns[j].viewColumnId !== "string" ){
        if( !sheetInfos[i].viewColumns[j].viewColumnId ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnIdがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnIdが文字列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
      }
      if( typeof sheetInfos[i].viewColumns[j].viewColumnName !== "string" ){
        if( !sheetInfos[i].viewColumns[j].viewColumnName ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnNameがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].viewColumnNameが文字列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
      }
      if( typeof sheetInfos[i].viewColumns[j].excelColumnText !== "string" ){
        if( !sheetInfos[i].viewColumns[j].excelColumnText ){
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].excelColumnTextがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`sheetInfos[${i}].viewColumns[${j}].excelColumnTextが文字列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
      }
    }
  }
  if( !Array.isArray(dataList) ){
    if( !dataList ){
      throw new Error(`dataListがNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    else{
      throw new Error(`dataListが配列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
  }
  for( let i=0; i<dataList.length; i++ ){
    if( dataList[i]===null || dataList[i]===undefined ){
      throw new Error(`dataList[${i}]がNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    else if( typeof dataList[i] !== "object" ){
      throw new Error(`dataList[${i}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    else if( dataList[i].constructor !== Object ){
      throw new Error(`dataList[${i}]が辞書型ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
    }
    for( const j in dataList[i] ){
      if( typeof j !== "string" ){
        throw new Error(`dataList[${i}]のキーが文字列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
      }
      if( !Array.isArray(dataList[i][j]) ){
        if( !dataList[i][j] ){
          throw new Error(`dataList[${i}]["${j}"]がNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}]["${j}"]が配列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
      }
      for( let k=0; k<dataList[i][j].length; k++ ){
        if( dataList[i][j][k]===null || dataList[i][j][k]===undefined ){
          throw new Error(`dataList[${i}]["${j}"][${k}]がNULLです。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else if( typeof dataList[i][j][k] !== "object" ){
          throw new Error(`dataList[${i}]["${j}"][${k}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        else if( dataList[i][j][k].constructor !== Object ){
          throw new Error(`dataList[${i}]["${j}"][${k}]が辞書型ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
        }
        for( const l in dataList[i][j][k] ){
          if( typeof l !== "string" ){
            throw new Error(`dataList[${i}]["${j}"][${k}]のキーが文字列ではありません。\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
          }
        }
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _updateExcelSheet_core( workbook, sheetInfos, dataList );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_content\n関数 : _updateExcelSheet`);
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
// 関数「extractTemplate_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function extractTemplate( fileData, sheetInfos ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(sheetInfos) ){
    if( !sheetInfos ){
      throw new Error(`sheetInfosがNULLです。\nレイヤー : excel_content\n関数 : extractTemplate`);
    }
    else{
      throw new Error(`sheetInfosが配列ではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
    }
  }
  for( let i=0; i<sheetInfos.length; i++ ){
    if( typeof sheetInfos[i] !== "object" ){
      if( !sheetInfos[i] ){
        throw new Error(`sheetInfos[${i}]がNULLです。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
      else{
        throw new Error(`sheetInfos[${i}]がオブジェクトではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
    }
    if( typeof sheetInfos[i].sheetName !== "string" ){
      if( !sheetInfos[i].sheetName ){
        throw new Error(`sheetInfos[${i}].sheetNameがNULLです。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
      else{
        throw new Error(`sheetInfos[${i}].sheetNameが文字列ではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
    }
    if( typeof sheetInfos[i].excelStartRow !== "number" ){
      if( !sheetInfos[i].excelStartRow ){
        throw new Error(`sheetInfos[${i}].excelStartRowがNULLです。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
      else{
        throw new Error(`sheetInfos[${i}].excelStartRowが数値ではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
    }
    else if( isNaN(sheetInfos[i].excelStartRow) ){
      throw new Error(`sheetInfos[${i}].excelStartRowが数値ではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
    }
    if( typeof sheetInfos[i].isTableHeader !== "boolean" ){
      if( !sheetInfos[i].isTableHeader ){
        throw new Error(`sheetInfos[${i}].isTableHeaderがNULLです。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
      else{
        throw new Error(`sheetInfos[${i}].isTableHeaderがブール値ではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
      }
    }
    else if( isNaN(sheetInfos[i].isTableHeader) ){
      throw new Error(`sheetInfos[${i}].isTableHeaderがブール値ではありません。\nレイヤー : excel_content\n関数 : extractTemplate`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await extractTemplate_core( fileData, sheetInfos );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_content\n関数 : extractTemplate`);
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


