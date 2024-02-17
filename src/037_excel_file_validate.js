import {
  updateExcel_core,  // エクセルファイルを更新する関数
  openExcel_core,  // Excelファイルを開く関数
  _updateExcelSheet_core,  // 【サブ】シート１個を編集する関数
} from "./038_excel_file.js";


//#######################################################################################
// 関数「updateExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateExcel( fileData, dataList ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(dataList) ){
    if( !dataList ){
      throw new Error(`dataListがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
    }
    else{
      throw new Error(`dataListが配列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
    }
  }
  for( let i=0; i<dataList.length; i++ ){
    if( !Array.isArray(dataList[i]) ){
      if( !dataList[i] ){
        throw new Error(`dataList[${i}]がNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
      }
      else{
        throw new Error(`dataList[${i}]が配列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
      }
    }
    for( let j=0; j<dataList[i].length; j++ ){
      if( typeof dataList[i][j] !== "object" ){
        if( !dataList[i][j] ){
          throw new Error(`dataList[${i}][${j}]がNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}][${j}]がオブジェクトではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      if( typeof dataList[i][j].sheetName !== "string" ){
        if( !dataList[i][j].sheetName ){
          throw new Error(`dataList[${i}][${j}].sheetNameがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].sheetNameが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      if( typeof dataList[i][j].excelStartRow !== "number" ){
        if( !dataList[i][j].excelStartRow ){
          throw new Error(`dataList[${i}][${j}].excelStartRowがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].excelStartRowが数値ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      else if( isNaN(dataList[i][j].excelStartRow) ){
        throw new Error(`dataList[${i}][${j}].excelStartRowが数値ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
      }
      if( typeof dataList[i][j].isTableHeader !== "boolean" ){
        if( !dataList[i][j].isTableHeader ){
          throw new Error(`dataList[${i}][${j}].isTableHeaderがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].isTableHeaderがブール値ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      else if( isNaN(dataList[i][j].isTableHeader) ){
        throw new Error(`dataList[${i}][${j}].isTableHeaderがブール値ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
      }
      if( !Array.isArray(dataList[i][j].viewColumns) ){
        if( !dataList[i][j].viewColumns ){
          throw new Error(`dataList[${i}][${j}].viewColumnsがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].viewColumnsが配列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      for( let k=0; k<dataList[i][j].viewColumns.length; k++ ){
        if( typeof dataList[i][j].viewColumns[k] !== "object" ){
          if( !dataList[i][j].viewColumns[k] ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}]がNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}]がオブジェクトではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
        }
        if( typeof dataList[i][j].viewColumns[k].viewColumnId !== "string" ){
          if( !dataList[i][j].viewColumns[k].viewColumnId ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnIdがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnIdが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
        }
        if( typeof dataList[i][j].viewColumns[k].viewColumnName !== "string" ){
          if( !dataList[i][j].viewColumns[k].viewColumnName ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnNameがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnNameが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
        }
        if( typeof dataList[i][j].viewColumns[k].excelColumnText !== "string" ){
          if( !dataList[i][j].viewColumns[k].excelColumnText ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].excelColumnTextがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].excelColumnTextが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
          }
        }
      }
      if( !Array.isArray(dataList[i][j].rowDatas) ){
        if( !dataList[i][j].rowDatas ){
          throw new Error(`dataList[${i}][${j}].rowDatasがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].rowDatasが配列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      for( let k=0; k<dataList[i][j].rowDatas.length; k++ ){
        if( dataList[i][j].rowDatas[k]===null || dataList[i][j].rowDatas[k]===undefined ){
          throw new Error(`dataList[${i}][${j}].rowDatas[${k}]がNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else if( typeof dataList[i][j].rowDatas[k] !== "object" ){
          throw new Error(`dataList[${i}][${j}].rowDatas[${k}]がオブジェクトではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else if( dataList[i][j].rowDatas[k].constructor !== Object ){
          throw new Error(`dataList[${i}][${j}].rowDatas[${k}]が辞書型ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        for( const l in dataList[i][j].rowDatas[k] ){
          if( typeof l !== "string" ){
            throw new Error(`dataList[${i}][${j}].rowDatas[${k}]のキーが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
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
    result = await updateExcel_core( fileData, dataList );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_file\n関数 : updateExcel`);
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
// 関数「openExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function openExcel( filePath ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : excel_file\n関数 : openExcel`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : excel_file\n関数 : openExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await openExcel_core( filePath );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_file\n関数 : openExcel`);
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
export async function _updateExcelSheet( workbook, dataList ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(dataList) ){
    if( !dataList ){
      throw new Error(`dataListがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
    }
    else{
      throw new Error(`dataListが配列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
    }
  }
  for( let i=0; i<dataList.length; i++ ){
    if( !Array.isArray(dataList[i]) ){
      if( !dataList[i] ){
        throw new Error(`dataList[${i}]がNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
      }
      else{
        throw new Error(`dataList[${i}]が配列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
      }
    }
    for( let j=0; j<dataList[i].length; j++ ){
      if( typeof dataList[i][j] !== "object" ){
        if( !dataList[i][j] ){
          throw new Error(`dataList[${i}][${j}]がNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}][${j}]がオブジェクトではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
      }
      if( typeof dataList[i][j].sheetName !== "string" ){
        if( !dataList[i][j].sheetName ){
          throw new Error(`dataList[${i}][${j}].sheetNameがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].sheetNameが文字列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
      }
      if( typeof dataList[i][j].excelStartRow !== "number" ){
        if( !dataList[i][j].excelStartRow ){
          throw new Error(`dataList[${i}][${j}].excelStartRowがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].excelStartRowが数値ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
      }
      else if( isNaN(dataList[i][j].excelStartRow) ){
        throw new Error(`dataList[${i}][${j}].excelStartRowが数値ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
      }
      if( typeof dataList[i][j].isTableHeader !== "boolean" ){
        if( !dataList[i][j].isTableHeader ){
          throw new Error(`dataList[${i}][${j}].isTableHeaderがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].isTableHeaderがブール値ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
      }
      else if( isNaN(dataList[i][j].isTableHeader) ){
        throw new Error(`dataList[${i}][${j}].isTableHeaderがブール値ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
      }
      if( !Array.isArray(dataList[i][j].viewColumns) ){
        if( !dataList[i][j].viewColumns ){
          throw new Error(`dataList[${i}][${j}].viewColumnsがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].viewColumnsが配列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
      }
      for( let k=0; k<dataList[i][j].viewColumns.length; k++ ){
        if( typeof dataList[i][j].viewColumns[k] !== "object" ){
          if( !dataList[i][j].viewColumns[k] ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}]がNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}]がオブジェクトではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
        }
        if( typeof dataList[i][j].viewColumns[k].viewColumnId !== "string" ){
          if( !dataList[i][j].viewColumns[k].viewColumnId ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnIdがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnIdが文字列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
        }
        if( typeof dataList[i][j].viewColumns[k].viewColumnName !== "string" ){
          if( !dataList[i][j].viewColumns[k].viewColumnName ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnNameがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].viewColumnNameが文字列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
        }
        if( typeof dataList[i][j].viewColumns[k].excelColumnText !== "string" ){
          if( !dataList[i][j].viewColumns[k].excelColumnText ){
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].excelColumnTextがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
          else{
            throw new Error(`dataList[${i}][${j}].viewColumns[${k}].excelColumnTextが文字列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
          }
        }
      }
      if( !Array.isArray(dataList[i][j].rowDatas) ){
        if( !dataList[i][j].rowDatas ){
          throw new Error(`dataList[${i}][${j}].rowDatasがNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else{
          throw new Error(`dataList[${i}][${j}].rowDatasが配列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
      }
      for( let k=0; k<dataList[i][j].rowDatas.length; k++ ){
        if( dataList[i][j].rowDatas[k]===null || dataList[i][j].rowDatas[k]===undefined ){
          throw new Error(`dataList[${i}][${j}].rowDatas[${k}]がNULLです。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else if( typeof dataList[i][j].rowDatas[k] !== "object" ){
          throw new Error(`dataList[${i}][${j}].rowDatas[${k}]がオブジェクトではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        else if( dataList[i][j].rowDatas[k].constructor !== Object ){
          throw new Error(`dataList[${i}][${j}].rowDatas[${k}]が辞書型ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
        }
        for( const l in dataList[i][j].rowDatas[k] ){
          if( typeof l !== "string" ){
            throw new Error(`dataList[${i}][${j}].rowDatas[${k}]のキーが文字列ではありません。\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
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
    result = await _updateExcelSheet_core( workbook, dataList );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_file\n関数 : _updateExcelSheet`);
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


