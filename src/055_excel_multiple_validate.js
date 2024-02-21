import {
  getExcelId_core,  // 表示すべきExcelのIDを取得する
} from "./056_excel_multiple.js";


//#######################################################################################
// 関数「getExcelId_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function getExcelId( pageId ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof pageId !== "number" ){
    if( !pageId ){
      throw new Error(`pageIdがNULLです。\nレイヤー : excel_multiple\n関数 : getExcelId`);
    }
    else{
      throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_multiple\n関数 : getExcelId`);
    }
  }
  else if( isNaN(pageId) ){
    throw new Error(`pageIdが数値ではありません。\nレイヤー : excel_multiple\n関数 : getExcelId`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await getExcelId_core( pageId );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : excel_multiple\n関数 : getExcelId`);
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
  else if( typeof result !== "number" ){
    throw new Error(`resultが数値ではありません。\nレイヤー : excel_multiple\n関数 : getExcelId`);
  }
  else if( isNaN(result) ){
    throw new Error(`resultが数値ではありません。\nレイヤー : excel_multiple\n関数 : getExcelId`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


