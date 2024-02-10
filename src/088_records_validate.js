import {
  listRecords_core,  // レコードの一覧を取得(GUI)
  createRecordFromUI_core,  // レコードを追加
} from "./089_records.js";


//#######################################################################################
// 関数「listRecords_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function listRecords( tableId, pageNumber, onePageMaxSize ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  if( (pageNumber===null) || (pageNumber===undefined) ){
    // pageNumberは空欄OK。
  }
  else if( typeof pageNumber !== "number" ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : records\n関数 : listRecords`);
  }
  else if( isNaN(pageNumber) ){
    throw new Error(`pageNumberが数値ではありません。\nレイヤー : records\n関数 : listRecords`);
  }
  if( typeof onePageMaxSize !== "number" ){
    if( !onePageMaxSize ){
      throw new Error(`onePageMaxSizeがNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else{
      throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  else if( isNaN(onePageMaxSize) ){
    throw new Error(`onePageMaxSizeが数値ではありません。\nレイヤー : records\n関数 : listRecords`);
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await listRecords_core( tableId, pageNumber, onePageMaxSize );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : records\n関数 : listRecords`);
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
      throw new Error(`resultがNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  if( !Array.isArray(result.columns) ){
    if( !result.columns ){
      throw new Error(`result.columnsがNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.columnsが配列ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  for( let i=0; i<result.columns.length; i++ ){
    if( typeof result.columns[i] !== "object" ){
      if( !result.columns[i] ){
        throw new Error(`result.columns[${i}]がNULLです。\nレイヤー : records\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}]がオブジェクトではありません。\nレイヤー : records\n関数 : listRecords`);
      }
    }
    if( typeof result.columns[i].id !== "string" ){
      if( !result.columns[i].id ){
        throw new Error(`result.columns[${i}].idがNULLです。\nレイヤー : records\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].idが文字列ではありません。\nレイヤー : records\n関数 : listRecords`);
      }
    }
    if( typeof result.columns[i].name !== "string" ){
      if( !result.columns[i].name ){
        throw new Error(`result.columns[${i}].nameがNULLです。\nレイヤー : records\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].nameが文字列ではありません。\nレイヤー : records\n関数 : listRecords`);
      }
    }
    if( typeof result.columns[i].dataType !== "string" ){
      if( !result.columns[i].dataType ){
        throw new Error(`result.columns[${i}].dataTypeがNULLです。\nレイヤー : records\n関数 : listRecords`);
      }
      else{
        throw new Error(`result.columns[${i}].dataTypeが文字列ではありません。\nレイヤー : records\n関数 : listRecords`);
      }
    }
    if( (result.columns[i].parentTableId===null) || (result.columns[i].parentTableId===undefined) ){
      // result.columns[i].parentTableIdは空欄OK。
    }
    else if( typeof result.columns[i].parentTableId !== "string" ){
      throw new Error(`result.columns[${i}].parentTableIdが文字列ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  if( !Array.isArray(result.records) ){
    if( !result.records ){
      throw new Error(`result.recordsがNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.recordsが配列ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  for( let i=0; i<result.records.length; i++ ){
    if( result.records[i]===null || result.records[i]===undefined ){
      throw new Error(`result.records[${i}]がNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else if( typeof result.records[i] !== "object" ){
      throw new Error(`result.records[${i}]がオブジェクトではありません。\nレイヤー : records\n関数 : listRecords`);
    }
    else if( result.records[i].constructor !== Object ){
      throw new Error(`result.records[${i}]が辞書型ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
    for( const j in result.records[i] ){
      if( typeof j !== "string" ){
        throw new Error(`result.records[${i}]のキーが文字列ではありません。\nレイヤー : records\n関数 : listRecords`);
      }
    }
  }
  if( typeof result.recordsTotal !== "number" ){
    if( !result.recordsTotal ){
      throw new Error(`result.recordsTotalがNULLです。\nレイヤー : records\n関数 : listRecords`);
    }
    else{
      throw new Error(`result.recordsTotalが数値ではありません。\nレイヤー : records\n関数 : listRecords`);
    }
  }
  else if( isNaN(result.recordsTotal) ){
    throw new Error(`result.recordsTotalが数値ではありません。\nレイヤー : records\n関数 : listRecords`);
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「createRecordFromUI_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function createRecordFromUI( tableId, columns ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableId !== "string" ){
    if( !tableId ){
      throw new Error(`tableIdがNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`tableIdが文字列ではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
  }
  if( !Array.isArray(columns) ){
    if( !columns ){
      throw new Error(`columnsがNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`columnsが配列ではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
  }
  for( let i=0; i<columns.length; i++ ){
    if( typeof columns[i] !== "object" ){
      if( !columns[i] ){
        throw new Error(`columns[${i}]がNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
      }
      else{
        throw new Error(`columns[${i}]がオブジェクトではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
      }
    }
    if( typeof columns[i].id !== "string" ){
      if( !columns[i].id ){
        throw new Error(`columns[${i}].idがNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
      }
      else{
        throw new Error(`columns[${i}].idが文字列ではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await createRecordFromUI_core( tableId, columns );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : records\n関数 : createRecordFromUI`);
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
      throw new Error(`resultがNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`resultがオブジェクトではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
  }
  if( typeof result.recordId !== "number" ){
    if( !result.recordId ){
      throw new Error(`result.recordIdがNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`result.recordIdが数値ではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
  }
  else if( isNaN(result.recordId) ){
    throw new Error(`result.recordIdが数値ではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
  }
  if( typeof result.userMessage !== "string" ){
    if( !result.userMessage ){
      throw new Error(`result.userMessageがNULLです。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
    else{
      throw new Error(`result.userMessageが文字列ではありません。\nレイヤー : records\n関数 : createRecordFromUI`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


