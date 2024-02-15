import {
  updateExcel_core,  // エクセルファイルを更新する関数
  openExcel_core,  // Excelファイルを開く関数
} from "./038_excel_file.js";


//#######################################################################################
// 関数「updateExcel_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateExcel( filePath, sheetDatas, parameters ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof filePath !== "string" ){
    if( !filePath ){
      throw new Error(`filePathがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
    }
    else{
      throw new Error(`filePathが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
    }
  }
  if( sheetDatas===null || sheetDatas===undefined ){
    throw new Error(`sheetDatasがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
  }
  else if( typeof sheetDatas !== "object" ){
    throw new Error(`sheetDatasがオブジェクトではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
  }
  else if( sheetDatas.constructor !== Object ){
    throw new Error(`sheetDatasが辞書型ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
  }
  for( const i in sheetDatas ){
    if( typeof i !== "string" ){
      throw new Error(`sheetDatasのキーが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
    }
    if( !Array.isArray(sheetDatas[i]) ){
      if( !sheetDatas[i] ){
        throw new Error(`sheetDatas["${i}"]がNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
      }
      else{
        throw new Error(`sheetDatas["${i}"]が配列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
      }
    }
    for( let j=0; j<sheetDatas[i].length; j++ ){
      if( !Array.isArray(sheetDatas[i][j]) ){
        if( !sheetDatas[i][j] ){
          throw new Error(`sheetDatas["${i}"][${j}]がNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
        else{
          throw new Error(`sheetDatas["${i}"][${j}]が配列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
        }
      }
      for( let k=0; k<sheetDatas[i][j].length; k++ ){
      }
    }
  }
  if( parameters===null || parameters===undefined ){
    throw new Error(`parametersがNULLです。\nレイヤー : excel_file\n関数 : updateExcel`);
  }
  else if( typeof parameters !== "object" ){
    throw new Error(`parametersがオブジェクトではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
  }
  else if( parameters.constructor !== Object ){
    throw new Error(`parametersが辞書型ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
  }
  for( const i in parameters ){
    if( typeof i !== "string" ){
      throw new Error(`parametersのキーが文字列ではありません。\nレイヤー : excel_file\n関数 : updateExcel`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateExcel_core( filePath, sheetDatas, parameters );
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


