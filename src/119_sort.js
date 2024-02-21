// 並び替え
//
import {
  startUp,
  clearCache,
  createColumn,
  listDataTypes,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  createTable,
  deleteTable,
  getDataType,
  deleteRecords,
  reload,
} from "./121_data_type_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./133_connect_database_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



const copyingRecords = {};
const cuttingRecords = {};

// レコードを切り取る
export async function cutRecord_core( tableId, recordId ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  copyingRecords[tableId] = null;
  cuttingRecords[tableId] = recordId;
}

// レコードをコピーする
export async function copyRecord_core( tableId, recordId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  copyingRecords[tableId] = recordId;
  cuttingRecords[tableId] = null;
}

// レコードを貼り付ける
export async function pasteRecord_core( tableId, beforeRecordId, afterRecordId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  const copyingRecordId = copyingRecords[tableId];
  const cuttingRecordId = cuttingRecords[tableId];
  if( copyingRecordId ){
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    // レコードをコピーする場合
    return await _copyRecord_core( tableId, copyingRecordId, beforeRecordId, afterRecordId );
  }
  else if( cuttingRecordId ){
    if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    // 事前に切り取ったレコードを貼り付ける場合
    await _moveRecord_core( tableId, cuttingRecordId, beforeRecordId, afterRecordId );
    copyingRecords[tableId] = null;
    cuttingRecords[tableId] = null;
    return cuttingRecordId;
  }
  else{
    throw new Error(`貼り付け操作を行う前に、切り取り または コピーを行ってください。`);
  }
}

// 切り取り中のレコードを取得する
export async function getCuttingRecord_core( tableId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  return cuttingRecords[tableId];
}

// コピー中のレコードを取得する
export async function getCopyingRecord_core( tableId ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  return copyingRecords[tableId];
}

// 【サブ関数】レコードを移動する
export async function _moveRecord_core( tableId, recordId, beforeRecordId, afterRecordId ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  // ソート番号を何にするべきか決める
  const sortNumber = await _generateRecordSortNumber_core( tableId, beforeRecordId, afterRecordId );
  await runSqlWriteOnly(
    `UPDATE ${tableId}
        SET sort_number = :sortNumber
        WHERE ${primaryKey} = :recordId;`,
    {
        ":recordId": recordId,
        ":sortNumber": sortNumber,
    },
  );
}

// 【サブ関数】レコードをコピーする
export async function _copyRecord_core( tableId, recordId, beforeRecordId, afterRecordId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  // ソート番号を何にするべきか決める
  const sortNumber = await _generateRecordSortNumber_core( tableId, beforeRecordId, afterRecordId );
  // コピー元のデータを取得する
  const records = await runSqlReadOnly(
    `SELECT *
      FROM ${tableId}
      WHERE ${primaryKey} = :recordId
      LIMIT 1;`,
    {
      ":recordId" : recordId,
    },
  );
  if( records.length===0 ){
    throw "コピー元のデータが見つかりません";
  }
  const recordData = records[0];
  delete recordData[primaryKey];
  recordData["sort_number"] = sortNumber;
  const timestamp = await getTimestamp();
  recordData["created_at"] = timestamp;
  recordData["updated_at"] = timestamp;
  const placeholders = {};
  for( const columnId in recordData ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    placeholders[":"+columnId] = recordData[columnId];
  }
  const columnIds = Object.keys(recordData);
  await runSqlWriteOnly(
    `INSERT INTO ${tableId}
      ( ${columnIds} )
      VALUES ( ${columnIds.map(columnId=>(":"+columnId))} );`,
    placeholders,
  );
  const records2 = await runSqlReadOnly(
      `SELECT * FROM ${tableId}
          WHERE created_at = :createdAt
          LIMIT 1;`,
      {
          ":createdAt": timestamp,
      },
  );
  if(records2.length===0){
      throw "追加したはずのレコードが見つかりません。";
  }
  const newRecordId = records2[0][primaryKey];
  if(!newRecordId){
      throw "新しく発行されたレコードIDが見つかりません。";
  }
  return newRecordId;
}

// 【サブ関数】ソート番号を発行する
export async function _generateRecordSortNumber_core( tableId, beforeRecordId, afterRecordId ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  if( beforeRecordId ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    // 特定のレコードの直後に挿入する場合
    const records = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM ${tableId}
        WHERE sort_number <= ( SELECT sort_number FROM ${tableId} WHERE ${primaryKey} = :beforeId )
        ORDER BY sort_number DESC
        LIMIT 2;`,
      {
        ":beforeId" : beforeRecordId,
      },
    );
    if( records.length===2 ){
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の、直前と直後のレコードが両方取得できた場合
      const sortNumberBefore = records[0]["sortNumber"];
      const sortNumberAfter = records[1]["sortNumber"];
      if( sortNumberBefore < sortNumberAfter ){
        throw `ソート番号の大小関係が想定外です。`;
      }
      return sortNumberAfter + ((sortNumberBefore-sortNumberAfter)/2);
    }
    else if( records.length===1 ){
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の直前のレコードしか取得できなかった場合
      // （末尾に挿入する場合）
      const sortNumberBefore = records[0]["sortNumber"];
      if( sortNumberBefore <= 0 ){
        throw `ソート番号が負の数です。`;
      }
      return sortNumberBefore / 2;
    }
    else{
      throw `レコードを移動・コピーしようとしましたが、移動先の「直前のレコード」が取得できませんでした`;
    }
  }
  else if( afterRecordId ){
    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    // 特定のレコードの直前に挿入する場合
    const records = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM ${tableId}
        WHERE sort_number >= ( SELECT sort_number FROM ${tableId} WHERE ${primaryKey} = :afterId )
        ORDER BY sort_number ASC
        LIMIT 2;`,
      {
        ":afterId" : afterRecordId,
      },
    );
    if( records.length===2 ){
      if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の、直前と直後のレコードが両方取得できた場合
      const sortNumberBefore = records[1]["sortNumber"];
      const sortNumberAfter = records[0]["sortNumber"];
      if( sortNumberBefore < sortNumberAfter ){
        throw `ソート番号の大小関係が想定外です。`;
      }
      return sortNumberAfter + ((sortNumberBefore-sortNumberAfter)/2);
    }
    else if( records.length===1 ){
      if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の直後のレコードしか取得できなかった場合
      // （先頭に挿入する場合）
      const sortNumberAfter = records[0]["sortNumber"];
      return sortNumberAfter + 8;
    }
    else{
      throw `レコードを移動・コピーしようとしましたが、移動先の「直後のレコード」が取得できませんでした`;
    }
  }
  else{
    if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    // 移動先がしていされていない場合、一番末尾に追加する
    const records = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM ${tableId}
        ORDER BY sort_number ASC
        LIMIT 1;`,
      {
        ":afterId" : afterRecordId,
      },
    );
    if( records.length>=1 ){
      if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先のレコードが両方取得できた場合
      const sortNumberBefore = records[0]["sortNumber"];
      if( sortNumberBefore <= 0 ){
        throw `ソート番号がゼロ以下です。`;
      }
      return sortNumberBefore * 0.9;
    }
    else{
      if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
      return 128;
    }
  }
}

// レコードを一括削除
export async function deleteRecords_core( tableId, recordIdList ){
  if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
  copyingRecords[tableId] = null;
  cuttingRecords[tableId] = null;
  return await deleteRecords( tableId, recordIdList );
}
