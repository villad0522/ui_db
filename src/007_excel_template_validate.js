import {
  startUp_core,  // プログラム起動
  createTemplate_core,  // テンプレートを作成
  deleteTemplate_core,  // 不可逆的にテンプレートを削除
  updateTemplateName_core,  // テンプレート名を変更
  listTemplates_core,  // テンプレートの一覧を取得(重)
  getTemplateName_core,  // IDからテンプレート名を取得
} from "./008_excel_template.js";


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
// 関数「createTemplate_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createTemplate( templateName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof templateName !== "string" ){
    if( !templateName ){
      throw new Error(`templateNameがNULLです。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
    else{
      throw new Error(`templateNameが文字列ではありません。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createTemplate_core( templateName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : createTemplate`);
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
      throw new Error(`resultがNULLです。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
  }
  if( typeof result.message !== "string" ){
    if( !result.message ){
      throw new Error(`result.messageがNULLです。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
    else{
      throw new Error(`result.messageが文字列ではありません。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
  }
  if( typeof result.templateId !== "string" ){
    if( !result.templateId ){
      throw new Error(`result.templateIdがNULLです。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
    else{
      throw new Error(`result.templateIdが文字列ではありません。\nレイヤー : excel_template\n関数 : createTemplate`);
    }
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
// 関数「getTemplateName_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getTemplateName( templateId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof templateId !== "string" ){
    if( !templateId ){
      throw new Error(`templateIdがNULLです。\nレイヤー : excel_template\n関数 : getTemplateName`);
    }
    else{
      throw new Error(`templateIdが文字列ではありません。\nレイヤー : excel_template\n関数 : getTemplateName`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getTemplateName_core( templateId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_template\n関数 : getTemplateName`);
    }
    else{
      throw error;
    }
  }
  //
  //--------------------------------------------------------------------------
  // 戻り値を検証
  if( (result===null) || (result===undefined) ){
    // resultは空欄OK。
  }
  else if( typeof result !== "string" ){
    throw new Error(`resultが文字列ではありません。\nレイヤー : excel_template\n関数 : getTemplateName`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


