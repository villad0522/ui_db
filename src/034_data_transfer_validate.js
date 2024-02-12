import {
  transferData_core,  // データ移行
  masterFaculty_core,  // 学部マスタ
  masterLab_core,  // 教室マスタ
  masterUser_core,  // 実験者マスタ
  masterSpecies_core,  // 動物種マスタ
  masterPhylogeny_core,  // 系統マスタ
  masterCompany_core,  // 業者マスタ
  masterOrigin_core,  // 由来マスタ
  masterProductType_core,  // 購入規格マスタ
  masterItem_core,  // 購入品マスタ
  masterPayment_core,  // 支払マスタ
  masterRoom_core,  // 飼育室マスタ
  masterPrice_core,  // 管理費単価マスタ
  masterAction_core,  // 飼育操作マスタ
  masterSex_core,  // 性別マスタ
  buyData_core,  // 購入データ
  broodbookData_core,  // 飼育台帳データ
  historyData_core,  // 飼育履歴データ
  increaseAndDecreaseData_core,  // 動物増減データ
  numberOfAnimalData_core,  // 飼育数データ
  budgetData_core,  // 予算実績データ
  billData_core,  // 請求データ
  _clearTable_core,  // 【サブ】テーブルを作り直す
  _checkSourceTable_core,  // 【サブ】テーブルの存在をチェックする
} from "./035_data_transfer.js";


//#######################################################################################
// 関数「transferData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function transferData( processName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await transferData_core( processName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : transferData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : transferData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : transferData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterFaculty_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterFaculty(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterFaculty_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterFaculty`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterFaculty`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterFaculty`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterLab_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterLab(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterLab_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterLab`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterLab`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterLab`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterUser_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterUser(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterUser_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterUser`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterUser`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterUser`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterSpecies_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterSpecies(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterSpecies_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterSpecies`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterSpecies`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterSpecies`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterPhylogeny_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterPhylogeny(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterPhylogeny_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterPhylogeny`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterPhylogeny`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterPhylogeny`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterCompany_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterCompany(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterCompany_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterCompany`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterCompany`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterCompany`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterOrigin_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterOrigin(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterOrigin_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterOrigin`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterOrigin`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterOrigin`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterProductType_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterProductType(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterProductType_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterProductType`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterProductType`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterProductType`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterItem_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterItem(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterItem_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterItem`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterItem`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterItem`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterPayment_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterPayment(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterPayment_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterPayment`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterPayment`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterPayment`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterRoom_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterRoom(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterRoom_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterRoom`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterRoom`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterRoom`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterPrice_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterPrice(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterPrice_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterPrice`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterPrice`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterPrice`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterAction_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterAction(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterAction_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterAction`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterAction`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterAction`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「masterSex_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function masterSex(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await masterSex_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : masterSex`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : masterSex`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : masterSex`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「buyData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function buyData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await buyData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : buyData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : buyData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : buyData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「broodbookData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function broodbookData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await broodbookData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : broodbookData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : broodbookData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : broodbookData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「historyData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function historyData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await historyData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : historyData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : historyData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : historyData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「increaseAndDecreaseData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function increaseAndDecreaseData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await increaseAndDecreaseData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : increaseAndDecreaseData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : increaseAndDecreaseData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : increaseAndDecreaseData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「numberOfAnimalData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function numberOfAnimalData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await numberOfAnimalData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : numberOfAnimalData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : numberOfAnimalData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : numberOfAnimalData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「budgetData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function budgetData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await budgetData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : budgetData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : budgetData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : budgetData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「billData_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function billData(  ){
  //--------------------------------------------------------------------------
  // 引数を検証
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await billData_core(  );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : billData`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : billData`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : billData`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_clearTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _clearTable( tableName ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( typeof tableName !== "string" ){
    if( !tableName ){
      throw new Error(`tableNameがNULLです。\nレイヤー : data_transfer\n関数 : _clearTable`);
    }
    else{
      throw new Error(`tableNameが文字列ではありません。\nレイヤー : data_transfer\n関数 : _clearTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _clearTable_core( tableName );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : _clearTable`);
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
      throw new Error(`resultがNULLです。\nレイヤー : data_transfer\n関数 : _clearTable`);
    }
    else{
      throw new Error(`resultが文字列ではありません。\nレイヤー : data_transfer\n関数 : _clearTable`);
    }
  }
  //
  //--------------------------------------------------------------------------
  return result;
}


//#######################################################################################
// 関数「_checkSourceTable_core」に、引数と戻り値のチェック機能を追加した関数
//
export async function _checkSourceTable( tableNames ){
  //--------------------------------------------------------------------------
  // 引数を検証
  if( !Array.isArray(tableNames) ){
    if( !tableNames ){
      throw new Error(`tableNamesがNULLです。\nレイヤー : data_transfer\n関数 : _checkSourceTable`);
    }
    else{
      throw new Error(`tableNamesが配列ではありません。\nレイヤー : data_transfer\n関数 : _checkSourceTable`);
    }
  }
  for( let i=0; i<tableNames.length; i++ ){
    if( typeof tableNames[i] !== "string" ){
      if( !tableNames[i] ){
        throw new Error(`tableNames[${i}]がNULLです。\nレイヤー : data_transfer\n関数 : _checkSourceTable`);
      }
      else{
        throw new Error(`tableNames[${i}]が文字列ではありません。\nレイヤー : data_transfer\n関数 : _checkSourceTable`);
      }
    }
  }
  //
  //--------------------------------------------------------------------------
  // メイン処理を実行
  let result;
  try{
    result = await _checkSourceTable_core( tableNames );
  }
  catch(error){
    if( typeof error === "string" ){
      throw new Error(`${error}\nレイヤー : data_transfer\n関数 : _checkSourceTable`);
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


