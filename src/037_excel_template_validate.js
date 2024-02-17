import {
  startUp_core,  // プログラム起動
  deleteTemplate_core,  // 不可逆的にテンプレートを削除
  getExcelTemplate_core,  // Excelテンプレートを取得
  updateExcelTemplate_core,  // Excelテンプレートを保存
} from "./038_excel_template.js";


//#######################################################################################
// 関数「startUp_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function startUp( localUrl, isDebug ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (localUrl===null) || (localUrl===undefined) ){
    // localUrlは空欄OK。
  }
  else if( typeof localUrl !== "string" ){
    throw new Error(`localUrlが文字列ではありません。\nレイヤー : excel_template\n関数 : startUp`);
  }
  if( typeof isDebug !== "boolean" ){
    if( !isDebug ){
      throw new Error(`isDebugがNULLです。\nレイヤー : excel_template\n関数 : startUp`);
    }
    else{
      throw new Error(`isDebugがブール値ではありません。\nレイヤー : excel_template\n関数 : startUp`);
    }
  }
  else if( isNaN(isDebug) ){
    throw new Error(`isDebugがブール値ではありません。\nレイヤー : excel_template\n関数 : startUp`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await startUp_core( localUrl, isDebug );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : startUp`);
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
// 関数「deleteTemplate_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteTemplate( templateId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof templateId !== "string" ){
    if( !templateId ){
      throw new Error(`templateIdがNULLです。\nレイヤー : excel_template\n関数 : deleteTemplate`);
    }
    else{
      throw new Error(`templateIdが文字列ではありません。\nレイヤー : excel_template\n関数 : deleteTemplate`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteTemplate_core( templateId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : deleteTemplate`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( typeof result !== "string" ){
    if( !result ){
      throw new Error(`resultがNULLです。\nレイヤー : excel_template\n関数 : deleteTemplate`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : excel_template\n関数 : deleteTemplate`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「getExcelTemplate_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getExcelTemplate( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : excel_template\n関数 : getExcelTemplate`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_template\n関数 : getExcelTemplate`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_template\n関数 : getExcelTemplate`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getExcelTemplate_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : getExcelTemplate`);
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
// 関数「updateExcelTemplate_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateExcelTemplate( pageId, excelFileData ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : excel_template\n関数 : updateExcelTemplate`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_template\n関数 : updateExcelTemplate`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_template\n関数 : updateExcelTemplate`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateExcelTemplate_core( pageId, excelFileData );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : updateExcelTemplate`);
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


