import {
  deleteRecords_core,  // レコードを削除
} from "./110_delete_record.js";


//#######################################################################################
// 関数「deleteRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function deleteRecords( tableId, records ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : delete_record\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
    }
  }
  if( !Array.isArray(records) ){
    if( !records ){
      throw new Error(`recordsがNULLです。\nレイヤー : delete_record\n関数 : deleteRecords`);
    }
    else{
      throw new Error(`recordsが配列ではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
    }
  }
  for( let i=0; i<records.length; i++ ){
    if( typeof records[i] !== "object" ){
      if( !records[i] ){
        throw new Error(`records[${i}]がNULLです。\nレイヤー : delete_record\n関数 : deleteRecords`);
      }
      else{
        throw new Error(`records[${i}]がオブジェクトではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
      }
    }
    if( typeof records[i].id !== "number" ){
      if( !records[i].id ){
        throw new Error(`records[${i}].idがNULLです。\nレイヤー : delete_record\n関数 : deleteRecords`);
      }
      else{
        throw new Error(`records[${i}].idが数値ではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
      }
    }
    else if( isNaN(records[i].id) ){
      throw new Error(`records[${i}].idが数値ではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
    }
    if( typeof records[i].checked !== "boolean" ){
      if( !records[i].checked ){
        throw new Error(`records[${i}].checkedがNULLです。\nレイヤー : delete_record\n関数 : deleteRecords`);
      }
      else{
        throw new Error(`records[${i}].checkedがブール値ではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
      }
    }
    else if( isNaN(records[i].checked) ){
      throw new Error(`records[${i}].checkedがブール値ではありません。\nレイヤー : delete_record\n関数 : deleteRecords`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await deleteRecords_core( tableId, records );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : delete_record\n関数 : deleteRecords`);
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


