import {
  startUp_core,  // プログラム起動
  createPage_core,  // ページを作成
  deleteTemplate_core,  // 不可逆的にテンプレートを削除
  updateTemplateName_core,  // テンプレート名を変更
  listTemplates_core,  // テンプレートの一覧を取得(重)
  getExcelTemplate_core,  // Excelテンプレートを取得
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
// 関数「createPage_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createPage( parentPageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof parentPageId !== "number" ){
    if( !parentPageId ){
      throw new Error(`parentPageIdがNULLです。\nレイヤー : excel_template\n関数 : createPage`);
    }
    else{
      throw new Error(`parentPageIdが数値ではありません。\nレイヤー : excel_template\n関数 : createPage`);
    }
  }
  else if( isNaN(parentPageId) ){
    throw new Error(`parentPageIdが数値ではありません。\nレイヤー : excel_template\n関数 : createPage`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createPage_core( parentPageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : createPage`);
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
      throw new Error(`resultがNULLです。\nレイヤー : excel_template\n関数 : createPage`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : excel_template\n関数 : createPage`);
    }
  }
  if( typeof result.pageId !== "number" ){
    if( !result.pageId ){
      throw new Error(`result.pageIdがNULLです。\nレイヤー : excel_template\n関数 : createPage`);
    }
    else{
      throw new Error(`result.pageIdが数値ではありません。\nレイヤー : excel_template\n関数 : createPage`);
    }
  }
  else if( isNaN(result.pageId) ){
    throw new Error(`result.pageIdが数値ではありません。\nレイヤー : excel_template\n関数 : createPage`);
  }
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
// 関数「updateTemplateName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function updateTemplateName( templates ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(templates) ){
    if( !templates ){
      throw new Error(`templatesがNULLです。\nレイヤー : excel_template\n関数 : updateTemplateName`);
    }
    else{
      throw new Error(`templatesが配列ではありません。\nレイヤー : excel_template\n関数 : updateTemplateName`);
    }
  }
  for( let i=0; i<templates.length; i++ ){
    if( typeof templates[i] !== "object" ){
      if( !templates[i] ){
        throw new Error(`templates[${i}]がNULLです。\nレイヤー : excel_template\n関数 : updateTemplateName`);
      }
      else{
        throw new Error(`templates[${i}]がオブジェクトではありません。\nレイヤー : excel_template\n関数 : updateTemplateName`);
      }
    }
    if( typeof templates[i].id !== "string" ){
      if( !templates[i].id ){
        throw new Error(`templates[${i}].idがNULLです。\nレイヤー : excel_template\n関数 : updateTemplateName`);
      }
      else{
        throw new Error(`templates[${i}].idが文字列ではありません。\nレイヤー : excel_template\n関数 : updateTemplateName`);
      }
    }
    if( typeof templates[i].name !== "string" ){
      if( !templates[i].name ){
        throw new Error(`templates[${i}].nameがNULLです。\nレイヤー : excel_template\n関数 : updateTemplateName`);
      }
      else{
        throw new Error(`templates[${i}].nameが文字列ではありません。\nレイヤー : excel_template\n関数 : updateTemplateName`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await updateTemplateName_core( templates );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : updateTemplateName`);
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
      throw new Error(`resultがNULLです。\nレイヤー : excel_template\n関数 : updateTemplateName`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : excel_template\n関数 : updateTemplateName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「listTemplates_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listTemplates( pageNumber, onePageMaxSize, isTrash ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( (pageNumber===null) || (pageNumber===undefined) ){
    // pageNumberは空欄OK。
  }
  else if( typeof pageNumber !== "number" ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
  }
  if( typeof isTrash !== "boolean" ){
    if( !isTrash ){
      throw new Error(`isTrashがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
    else{
      throw new Error(`isTrashがブール値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
  }
  else if( isNaN(isTrash) ){
    throw new Error(`isTrashがブール値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listTemplates_core( pageNumber, onePageMaxSize, isTrash );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : listTemplates`);
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
      throw new Error(`resultがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
  }
  if( !Array.isArray(result.templates) ){
    if( !result.templates ){
      throw new Error(`result.templatesがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
    else{
      throw new Error(`result.templatesが配列ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
  }
  for( let i=0; i<result.templates.length; i++ ){
    if( typeof result.templates[i] !== "object" ){
      if( !result.templates[i] ){
        throw new Error(`result.templates[${i}]がNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
      }
      else{
        throw new Error(`result.templates[${i}]がオブジェクトではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
      }
    }
    if( typeof result.templates[i].id !== "string" ){
      if( !result.templates[i].id ){
        throw new Error(`result.templates[${i}].idがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
      }
      else{
        throw new Error(`result.templates[${i}].idが文字列ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
      }
    }
    if( typeof result.templates[i].name !== "string" ){
      if( !result.templates[i].name ){
        throw new Error(`result.templates[${i}].nameがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
      }
      else{
        throw new Error(`result.templates[${i}].nameが文字列ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
      }
    }
  }
  if( typeof result.total !== "number" ){
    if( !result.total ){
      throw new Error(`result.totalがNULLです。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
    else{
      throw new Error(`result.totalが数値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
    }
  }
  else if( isNaN(result.total) ){
    throw new Error(`result.totalが数値ではありません。\nレイヤー : excel_template\n関数 : listTemplates`);
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


