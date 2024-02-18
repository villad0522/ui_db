// 入力要素
//
import {
  startUp,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./100_relation_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  createTable,
  deleteTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
import {
  listDataTypes,
} from "./118_data_type_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
} from "./103_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./115_sort_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  formatField,
} from "./094_db_formatter_validate.js";
import {
  listRecords,
  createRecordFromUI,
} from "./091_records_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}





// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  //
  // テーブルを作成する
  await reserveWord("input_group"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS input_group (
      input_group_id TEXT PRIMARY KEY,
      view_id INTEGER NOT NULL,
      table_id TEXT NOT NULL,
      next_group_id TEXT,
      next_column_id TEXT,
      processing_order REAL NOT NULL,
      UNIQUE (view_id, processing_order),
      UNIQUE (next_group_id, next_column_id),
      FOREIGN KEY (next_group_id) REFERENCES input_group(input_group_id)
    );`,
    {},
  );
  //
  await reserveWord("input_elements"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS input_elements (
      view_column_id TEXT PRIMARY KEY,
      input_group_id TEXT NOT NULL,
      column_id TEXT NOT NULL,
      input_type TEXT NOT NULL,
      FOREIGN KEY (input_group_id) REFERENCES input_group(input_group_id)
    );`,
    {},
  );
  await _reload();    // メモリに再読み込み
}



let cacheData1 = {
  // ビューカラムID: カラムID
  //  34: "c6",
};

let cacheData2 = {
  //  viewId: [
  //    { ... },
  //  ],
  //  32: [
  //    {
  //      inputGroupId: "main.c8",
  //      viewColumnIdList: [ "d5", "d2", "d83", "d66" ],
  //      tableId: "t7",
  //      nextGroupId: "main",
  //      nextColumnId: "c8"
  //    }
  //  ],
};


let cacheData3 = {
  // ビューカラムID: 入力方式
  //  34: "TEXTBOX",
};

//【サブ関数】メモリに再読み込み
async function _reload() {
  cacheData1 = {};
  cacheData2 = {};
  cacheData3 = {};
  //------------------------------------------------------------
  // cacheData1に代入する
  const inputElements = await runSqlReadOnly(
    `SELECT
        view_column_id AS viewColumnId,
        column_id AS columnId,
        input_group_id AS inputGroupId,
        input_type AS inputType
      FROM input_elements;`,
    {},
  );
  for( const { viewColumnId, columnId, inputType } of inputElements ){
    cacheData1[viewColumnId] = columnId;
    cacheData3[viewColumnId] = inputType;
  }
  //
  //------------------------------------------------------------
  // cacheData2に代入する
  const viewColumnIds = {
    // 入力例
    //  inputGroupId: [ viewColumnId ],
  };
  for( const { viewColumnId, inputGroupId } of inputElements ){
    if(!viewColumnIds[inputGroupId]){
      viewColumnIds[inputGroupId] = [];
    }
    viewColumnIds[inputGroupId].push( viewColumnId );
  }
  const inputGroups = await runSqlReadOnly(
    `SELECT
        input_group_id AS inputGroupId,
        view_id AS viewId,
        table_id AS tableId,
        next_group_id AS nextGroupId,
        next_column_id AS nextColumnId
      FROM input_group
      ORDER BY view_id ASC, processing_order ASC;`,
    {},
  );
  for( const { inputGroupId, viewId, tableId, nextGroupId, nextColumnId } of inputGroups ){
    if(!cacheData2[viewId]){
      cacheData2[viewId] = [];
    }
    let viewColumnIdList = viewColumnIds[inputGroupId];
    if(!viewColumnIdList){
      viewColumnIdList = [];
    }
    for( const viewColumnId of viewColumnIdList ){
      const columnId = cacheData1[viewColumnId];
      if( tableId !== await getTableId(columnId) ){
        throw `指定されたテーブルIDとカラムIDの辻褄が合いません。\nviewColumnId = ${viewColumnId}\ntableId = ${tableId}\ncolumnId = ${columnId}\ninputGroups = ${JSON.stringify(inputGroups,null,2)}\ninputElements = ${JSON.stringify(inputElements,null,2)}`;
      }
    }
    cacheData2[viewId].push({
      inputGroupId,
      viewColumnIdList,
      tableId,
      nextGroupId,
      nextColumnId
    });
  }
  //------------------------------------------------------------
}





// 自動入力
export async function autoFill_core( viewId, inputTexts, isClick ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  const conditions = {
    // 代入例
    // inputGroupId: {
    //   columnId: マスターデータのレコードID
    //   "c7": 87
    // },
    // "main.c6": {
    //   "c99": 7
    // }
  };
  if(!Array.isArray(cacheData2[viewId])){
    throw `ビューの情報が見つかりません。`;
  }
  //
  // 入力グループごとに繰り返す
  for( let i=0; i<cacheData2[viewId].length; i++ ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    const {
      inputGroupId,
      viewColumnIdList,
      tableId,
      nextGroupId,
      nextColumnId
    } = cacheData2[viewId][i];
    //
    if( !conditions[inputGroupId] ){
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      conditions[inputGroupId] = {};
    }
    //
    const result = await _autoFill_core({ 
      viewColumnIdList: viewColumnIdList,
      isClick: isClick,
      tableId: tableId,
      inputTexts: inputTexts,
      conditions: conditions[inputGroupId],
      isAutoFill: ( i < cacheData2[viewId].length-1 ), // 自動入力と予測変換の両方を行う または 予測変換のみ
    });
    inputTexts = {
      ...structuredClone(inputTexts),
      ...result.inputTextsAndAutocorrection,
    };
    if(!result.recordId) continue;
    //
    // マスターデータの入力欄を埋める
    inputTexts = {
      ...inputTexts,
      ...await _fillMasterData_core( viewId, inputGroupId, result.recordData ),
    };
    //
    // 子に情報を伝える
    if(!nextGroupId || !nextColumnId) continue; 
    if( !conditions[nextGroupId] ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      conditions[nextGroupId] = {};
    }
    conditions[nextGroupId][nextColumnId] = result.recordId;
  }
  return structuredClone(inputTexts);
}




// 【サブ関数】予測変換と自動入力
export async function _autoFill_core( params ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  let { viewColumnIdList, tableId, isClick, inputTexts, conditions, isAutoFill } = params;
  //
  const results = {
    //  "d8": "a",
    //  "d8_option": [ "aaa", "aaaaaa" ],
  };
  //
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    results[viewColumnId ] = inputTexts[viewColumnId ] ?? "";  // 結果
  }
  //
  // 絞り込み条件を生成する
  const newConditions = structuredClone({
    ...conditions,  // 前の入力グループから引き継いだ条件
    ...await _getConditions_core({ viewColumnIdList, inputTexts }), // 入力された文字列から生成した条件
  });
  // 別のテーブルの条件を除外する
  for( const columnId in newConditions ){
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    if( tableId !== await getTableId(columnId) ){
      if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
      delete newConditions[columnId];
    }
  }
  //
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    if(!columnId){
      throw `columnIdがNULLです。`;
    }
    if( tableId !== await getTableId(columnId) ){
      throw `指定されたテーブルIDとカラムIDの辻褄が合いません。\nviewColumnId = ${viewColumnId}\ntableId = ${tableId}\ncolumnId = ${columnId}`;
    }
    const dataType = await getDataType( columnId );
    const inputText = inputTexts[ viewColumnId ];
    if( dataType==="FILE" || dataType==="BOOL" || dataType==="POINTER" ){
      if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
      continue; // 予測変換を生成しない
    }
    else if( dataType==="INTEGER" || dataType==="REAL" || dataType==="TEXT" ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    }
    else{
      throw `サポートされていないデータ型です。`;
    }
    // 予測変換を生成する
    const predictions = await _listPredictions_core({
      inputText,
      tableId,
      columnId,
      conditions: newConditions,
    });
    results[ viewColumnId + "_option" ] = predictions;  // 結果
    //
    if( predictions.length===1 ){
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      newConditions[columnId] = await formatField( predictions[0], columnId, false );
    }
    else if( predictions.length>=2 ){
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      // 予測が２件以上の場合、自動入力しない
      isAutoFill = false;
    }
  }
  if(isAutoFill===false){
    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
      inputTextsAndAutocorrection: results,
      recordId: null,
      recordData: null,
    };
  }
  //
  const records = await _listRecords_core( tableId, newConditions, 10 );
  if( records.length !== 1 ){
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    // 合致するデータが１件ではない場合
    return {
      inputTextsAndAutocorrection: results,
      recordId: null,
      recordData: null,
    };
  }
  // 合致するデータが１件だけ存在する場合
  //
  const primaryKey = await getPrimaryKey( tableId );
  const recordId = records[0][primaryKey];
  if(!recordId){
    throw `レコードIDを取得できませんでした`;
  }
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    // 自動入力を行う
    results[ viewColumnId ] = records[0][columnId];  // 結果
  }
  return {
    inputTextsAndAutocorrection: results,
    recordId: recordId,
    recordData: records[0],
  };
}







// 【サブ関数】絞り込み条件を生成する
export async function _getConditions_core( params ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
  let { viewColumnIdList, inputTexts } = params;
  const conditions = {};
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    const dataType = await getDataType( columnId );
    const inputText = inputTexts[ viewColumnId ];
    if( dataType==="FILE" ){
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
      continue; // 条件には含めない
    }
    else if( dataType==="INTEGER" || dataType==="REAL" || dataType==="POINTER" || dataType==="BOOL" || dataType==="TEXT" ){
      if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
      if(!inputText && isNaN(inputText)) continue; // 空欄は条件には含めない
      const data = await formatField( inputText, columnId, false );
      if(!data) continue; // 空欄は条件には含めない
      conditions[columnId] = data;  // 条件に加える
    }
    else{
      throw `サポートされていないデータ型です。`;
    }
  }
  return conditions;
}





// 【サブ関数】予測変換を取得する
export async function _listPredictions_core( params ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
  let { inputText, tableId, columnId, conditions } = params;
  if( tableId !== await getTableId(columnId) ){
    throw `指定されたテーブルIDとカラムIDの辻褄が合いません。`;
  }
  //
  const dataType = await getDataType( columnId );
  if( dataType==="FILE" ){
    if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
    return []; // 予測変換を取得しない
  }
  else if( dataType==="BOOL" ){
    if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    return ["true","false"];
  }
  else if( dataType==="INTEGER" || dataType==="REAL" || dataType==="POINTER" || dataType==="TEXT" ){
    if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
    inputText = String( inputText ?? "" );
  }
  else{
    throw `サポートされていないデータ型です。`;
  }
  //
  const newConditions = structuredClone(conditions);
  // 別のテーブルの条件を除外する
  for( const columnId in newConditions ){
    if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
    if( tableId !== await getTableId(columnId) ){
      if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
      delete newConditions[columnId];
    }
  }
  //
  // 予測変換
  if( inputText ){
    if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
    delete newConditions[columnId];
    return await autoCorrect( tableId, columnId, inputText, newConditions );
  }
  else{
    if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
    const records = await _listRecords_core( tableId, newConditions, 10 );
    return records.map( recordData => recordData[columnId] );
  }
}



// 【サブ関数】レコードを取得
export async function _listRecords_core( tableId, conditions, limitSize ){
  if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
  let sql = `
    SELECT *
      FROM ${tableId}`;
  const whereTexts = [];
  const statements = {};
  for( const columnId in conditions ){
    if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    whereTexts.push( `${columnId} = :${columnId}`);
    statements[`:${columnId}`] = conditions[columnId];
  }
  if(whereTexts.length>0){
    if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
    sql += `\n        WHERE ` + whereTexts.join(`\n        AND `);
  }
  sql += `
      LIMIT ${limitSize};`;
  const result = await runSqlReadOnly( sql, statements );
  return result;
}



// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}


// 入力グループを作成
export async function createInputGroup_core( inputGroupId, viewId, tableId, nextGroupId, nextColumnId, processingOrder ){
  if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
  const inputGroups1 = await runSqlReadOnly(
    `SELECT input_group_id AS inputGroupId
      FROM input_group
      WHERE input_group_id = :inputGroupId;`,
    {
      ":inputGroupId": inputGroupId,
    },
  );
  if( inputGroups1.length >= 1 ){
    throw `入力グループを作成しようとしましたが失敗しました。入力グループIDが重複しています。`;
  }
  const inputGroups2 = await runSqlReadOnly(
    `SELECT *
      FROM input_group
      WHERE view_id != :viewId
      AND input_group_id = :nextGroupId;`,
    {
      ":viewId": viewId,
      ":nextGroupId": nextGroupId,
    },
  );
  if( inputGroups2.length >= 1 ){
    throw `入力グループを作成しようとしましたが失敗しました。入力グループは、異なるビューに属する入力グループに情報を送ることはできません。`;
  }
  await runSqlWriteOnly(
    `INSERT INTO input_group (
      input_group_id,
      view_id,
      table_id,
      next_group_id,
      next_column_id,
      processing_order
    ) VALUES (
      :inputGroupId,
      :viewId,
      :tableId,
      :nextGroupId,
      :nextColumnId,
      :processingOrder
    );`,
    {
      ":inputGroupId": inputGroupId,
      ":viewId": viewId,
      ":tableId": tableId,
      ":nextGroupId": nextGroupId,
      ":nextColumnId": nextColumnId,
      ":processingOrder": processingOrder,
    },
  );
  await _reload();    // メモリに再読み込み
}



// 入力要素を作成
export async function createInputElement_core( viewColumnId, inputGroupId, columnId, inputType ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
  const inputGroups = await runSqlReadOnly(
    `SELECT
        table_id AS tableId
      FROM input_group
      WHERE input_group_id = :inputGroupId
      LIMIT 1;`,
    {
      ":inputGroupId": inputGroupId,
    },
  );
  if( inputGroups.length===0 ){
    throw `入力要素を作り直そうとしましたが、所属している入力グループが見つかりません。\ninputGroupId = ${inputGroupId}`;
  }
  const tableId = inputGroups[0].tableId;
  if( tableId !== await getTableId(columnId) ){
    throw `入力要素を作成しようとしましたが、指定されたテーブルIDとカラムIDの辻褄が合いません。\nviewColumnId = ${viewColumnId}\ntableId = ${tableId}\ncolumnId = ${columnId}`;
  }
  await runSqlWriteOnly(
    `INSERT INTO input_elements (
      view_column_id,
      input_group_id,
      column_id,
      input_type
    ) VALUES (
      :viewColumnId,
      :inputGroupId,
      :columnId,
      :inputType
    );`,
    {
      ":viewColumnId": viewColumnId,
      ":inputGroupId": inputGroupId,
      ":columnId": columnId,
      ":inputType": inputType,
    },
  );
  await _reload();    // メモリに再読み込み
}



// ビューを削除
export async function deleteViewInput_core( viewId ){
  if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
  const inputGroups = await runSqlReadOnly(
    `SELECT *
      FROM input_group
      WHERE view_id != :viewId
      AND next_group_id IN (
        SELECT input_group_id
        FROM input_group
        WHERE view_id = :viewId
      );`,
    {
      ":viewId": viewId,
    },
  );
  if( inputGroups.length >= 1 ){
    throw `ビューを削除しようとしましたが失敗しました。異なるビューの間で、入力グループが参照しています。このままビューを削除すると、外部キー制約違反が置きます。`;
  }
  await runSqlWriteOnly(
    `DELETE FROM input_elements
      WHERE input_group_id IN (
        SELECT input_group_id
        FROM input_group
        WHERE view_id = :viewId
      );`,
    {
      ":viewId": viewId,
    },
  );
  await runSqlWriteOnly(
    `DELETE FROM input_group
      WHERE view_id = :viewId;`,
    {
      ":viewId": viewId,
    },
  );
  await _reload();    // メモリに再読み込み
}




// 入力方式を変更
export async function changeInputType_core( viewColumnId, inputType ){
  if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
  switch( inputType ){
    case "TEXTBOX":
      if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
      break;
    case "TEXTAREA":
      if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
      break;
    case "SELECT":
      if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
      break;
    case "NUMBER":
      if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
      break;
    case "DATE":
      if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
      break;
    default:
      throw `入力方式を変更しようとしましたが、サポートされていない入力方式が指定されました。\ninputType = ${inputType}`;
  }
  await runSqlWriteOnly(
    `UPDATE input_elements
      SET input_type = :inputType
      WHERE view_column_id = :viewColumnId;`,
    {
      ":inputType": inputType,
      ":viewColumnId": viewColumnId,
    },
  );
  await _reload();    // メモリに再読み込み
}




// 【サブ関数】マスターデータの入力欄を埋める
export async function _fillMasterData_core( viewId, childGroupId, childRecordData ){
  if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
  return {};
}

// 入力方式を取得
export async function getInputType_core( viewColumnId ){
  if(bugMode === 44) throw "MUTATION44";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData3[viewColumnId];
}


// レコードを上書き
export async function updateRecordsFromView_core( viewId, inputTexts ){
  if(bugMode === 45) throw "MUTATION45";  // 意図的にバグを混入させる（ミューテーション解析）
  const recordDatas = [];
  let tableId2;
  let isSuccess = true;
  const outputTexts = [];
  // 行ごとに繰り返す
  for( let i=0; i<inputTexts.length; i++ ){
    if(bugMode === 46) throw "MUTATION46";  // 意図的にバグを混入させる（ミューテーション解析）
    outputTexts[i] = {};
    if(!inputTexts[i]["id"]){
      throw "上書き対象のプライマリキー「id」が指定されていません";
    }
    const {
      isSuccess: flag,
      tableId,
      recordData,
      outputTexts: messages
    } = await _convertToRecord_core( viewId, inputTexts[i] );
    if( flag===false ){
      if(bugMode === 47) throw "MUTATION47";  // 意図的にバグを混入させる（ミューテーション解析）
      outputTexts[i] = messages;
      isSuccess = false;
      continue;
    }
    recordDatas.push({
      ...recordData,
      "id": inputTexts[i]["id"],
    });
    tableId2 = tableId;
  }
  if(isSuccess===true){
    if(bugMode === 48) throw "MUTATION48";  // 意図的にバグを混入させる（ミューテーション解析）
    if( recordDatas.length===0 ){
      throw "上書きすべきレコードが０件です。";
    }
    return {
      "isSuccess": true,
      "outputTexts": outputTexts,
      "userMessage": await updateRecords( tableId2, recordDatas ),
    };
  }
  else{
    if(bugMode === 49) throw "MUTATION49";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
      "isSuccess": false,
      "outputTexts": outputTexts,
      "userMessage": "登録に失敗しました。入力内容をご確認ください。",
    };
  };
}


// レコードを追加
export async function createRecordFromView_core( viewId, inputTexts ){
  if(bugMode === 50) throw "MUTATION50";  // 意図的にバグを混入させる（ミューテーション解析）
  const {
    isSuccess,
    tableId,
    recordData,
    outputTexts
  } = await _convertToRecord_core( viewId, inputTexts );
  if(isSuccess===true){
    if(bugMode === 51) throw "MUTATION51";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
      ...await createRecord( tableId, recordData ),
      "isSuccess": true,
      "outputTexts": {},
    };
  }
  else{
    if(bugMode === 52) throw "MUTATION52";  // 意図的にバグを混入させる（ミューテーション解析）
    return {
      "isSuccess": false,
      "outputTexts": outputTexts,
      "userMessage": "登録に失敗しました。入力内容をご確認ください。",
    };
  }
}



// 【サブ関数】入力データをレコードに変換
export async function _convertToRecord_core( viewId, inputTexts ){
  if(bugMode === 53) throw "MUTATION53";  // 意図的にバグを混入させる（ミューテーション解析）
  const conditions = {
    // 代入例
    // inputGroupId: {
    //   columnId: マスターデータのレコードID
    //   "c7": 87
    // },
    // "main.c6": {
    //   "c99": 7
    // }
  };
  const inputGroups = cacheData2[viewId];
  if(!Array.isArray(inputGroups)){
    throw `ビューの情報が見つかりません。`;
  }
  //
  // 入力フォームに表示する値
  const outputTexts = {};
  let isSuccess = true;
  //
  // 入力グループごとに繰り返す（最後の一つ手前まで）
  for( let j=0; j<inputGroups.length-1; j++ ){
    if(bugMode === 54) throw "MUTATION54";  // 意図的にバグを混入させる（ミューテーション解析）
    const {
      inputGroupId,
      viewColumnIdList,
      tableId,
      nextGroupId,
      nextColumnId
    } = inputGroups[j];
    //
    if( !conditions[inputGroupId] ){
      if(bugMode === 55) throw "MUTATION55";  // 意図的にバグを混入させる（ミューテーション解析）
      conditions[inputGroupId] = {};
    }
    //
    // 絞り込み条件を生成する
    const conditionThisGroup = structuredClone({
      ...conditions[inputGroupId],  // 前の入力グループから引き継いだ条件
      ...await _getConditions_core({ viewColumnIdList, inputTexts }), // 入力された文字列から生成した条件
    });
    //
    const records = await _listRecords_core( tableId, conditionThisGroup, 1 );
    if( records.length === 0 ){
      if(bugMode === 56) throw "MUTATION56";  // 意図的にバグを混入させる（ミューテーション解析）
      // 合致するデータが見つからない場合
      for(let viewColumnId of viewColumnIdList){
        if(bugMode === 57) throw "MUTATION57";  // 意図的にバグを混入させる（ミューテーション解析）
        outputTexts[viewColumnId+"_message"] = "該当なし";
      }
      isSuccess = false;
      continue;
    }
    // 合致するデータが１件以上存在する場合
    const primaryKey = await getPrimaryKey( tableId );
    const recordId = records[0][primaryKey];
    //
    // 子に情報を伝える
    if(!nextGroupId || !nextColumnId) continue; 
    if( !conditions[nextGroupId] ){
      if(bugMode === 58) throw "MUTATION58";  // 意図的にバグを混入させる（ミューテーション解析）
      conditions[nextGroupId] = {};
    }
    conditions[nextGroupId][nextColumnId] = recordId;
  }
  const {
    inputGroupId,
    viewColumnIdList,
    tableId,
  } = inputGroups[inputGroups.length-1];
  if( !conditions[inputGroupId] ){
    if(bugMode === 59) throw "MUTATION59";  // 意図的にバグを混入させる（ミューテーション解析）
    conditions[inputGroupId] = {};
  }
  //
  // データベースに保存する値
  const results = conditions[inputGroupId];
  //
  // 入力項目ごとに繰り返す（列ごとに繰り返す）
  for(let viewColumnId of viewColumnIdList){
    if(bugMode === 60) throw "MUTATION60";  // 意図的にバグを混入させる（ミューテーション解析）
    const columnId = cacheData1[viewColumnId];
    if( tableId !== await getTableId( columnId ) ) continue;
    const inputText = inputTexts[viewColumnId];
    //
    // 入力された文字を正規化する
    let value;
    try{
      value = await formatField( inputText, columnId, true );
    }
    catch(err){
      outputTexts[viewColumnId+"_message"] = String(err);
      isSuccess = false;
      continue;
    }
    results[columnId] = value;
    //
    // フィールドを検証する
    const { isOK, message } = await checkField( columnId, value );
    if( isOK===false ){
      if(bugMode === 61) throw "MUTATION61";  // 意図的にバグを混入させる（ミューテーション解析）
      outputTexts[viewColumnId+"_message"] = message;
      isSuccess = false;
      continue;
    }
  }
  return {
    "tableId": tableId,
    "recordData": results,
    "isSuccess": isSuccess,
    "outputTexts":outputTexts,
  };
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 62) throw "MUTATION62";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
      `DELETE FROM input_elements
        WHERE input_group_id IN (
          SELECT input_group_id FROM input_group WHERE table_id = :tableId
        );`,
      {
          ":tableId": tableId,
      },
    );
    await runSqlWriteOnly(
      `DELETE FROM input_group WHERE table_id = :tableId;`,
      {
          ":tableId": tableId,
      },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTable( tableId );  // 下層の関数を実行する
}
