// レコードの見出し
//
import {
  startUp,
  clearCache,
  deleteTable,
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  deleteViewInput,
  changeInputType,
  _fillMasterData,
  getInputType,
  updateRecordsFromView,
  createRecordFromView,
  _convertToRecord,
} from "./085_input_element_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./121_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./103_column_name_validate.js";
import {
  getPrimaryKey,
} from "./115_primary_key_validate.js";
import {
  createColumn,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./094_relation_validate.js";
import {
  listDataTypes,
} from "./112_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./100_reserved_word_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
} from "./097_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./106_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./109_sort_validate.js";
import {
  formatField,
} from "./091_db_formatter_validate.js";
import {
  listRecords,
  createRecordFromUI,
} from "./088_records_validate.js";


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
  // テーブルを作成する（見出しの役割を果たすカラムを登録するため）
  await reserveWord("title_columns"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS title_columns (
      table_id TEXT PRIMARY KEY,
      title_column_id TEXT NOT NULL
    );`,
    {},
  );
  await _reload();    // メモリに再読み込み
}

let cacheData = {};

//【サブ関数】メモリに再読み込み
async function _reload() {
  const matrix = await runSqlReadOnly(
    `SELECT
      table_id AS tableId,
      title_column_id AS titleColumnId
    FROM title_columns;`,
    {},
  );
  cacheData = {};
  for( const { tableId, titleColumnId } of matrix ){
    cacheData[tableId] = titleColumnId;
  }
}

// 【サブ】見出しの役割を果たすカラムを登録する
export async function setTitleColumn_core( columnId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  const tableId = await getTableId( columnId );
  if( cacheData[tableId]===columnId ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 既に登録済みなら処理を続行する必要がない
    return;
  }
  await runSqlWriteOnly(
    `INSERT OR REPLACE INTO title_columns ( table_id, title_column_id )
        VALUES ( :tableId, :titleColumnId );`,
    {
        ":tableId": tableId,
        ":titleColumnId": columnId,   // 見出しの役割を果たすカラム
    },
  );
  await _reload();    // メモリに再読み込み
}

// 【サブ】見出しの役割を果たすカラムを取得する
export async function getTitleColumnId_core( tableId ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData[tableId];
}

// テーブルの一覧を取得(重)
export async function listTables_core( pageNumber, onePageMaxSize, isTrash ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  // 下層の関数を実行する
  const { tables, total } = await listTables( pageNumber, onePageMaxSize, isTrash );
  // 下層から得たテーブルの一覧に、「titleColumnId」を付け加えて上層に提供する
  for( let i=0; i<tables.length; i++ ){
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = tables[i].id;
    tables[i].titleColumnId = cacheData[tableId];
  }
  return {
    "tables": tables,
    "total": total,
  }
}



// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM title_columns
            WHERE table_id = :tableId;`,
        {
            ":tableId": tableId,
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTable( tableId );  // 下層の関数を実行する
}



// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}


// 【サブ】文字列からレコードIDを取得
export async function _getRecordIdFromTitle_core( tableId, titleText ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  const titleColumnId = cacheData[tableId];
  if(!titleColumnId){
    throw `文字列からマスターデータのIDを取得しようとしましたが、見出しの役割を果たすカラムが未設定です。\nテーブルID = ${tableId}`;
  }
  const primaryKey = await getPrimaryKey( tableId );
  const value = await formatField(titleText, titleColumnId, true);
  const matrix = await runSqlReadOnly(
    `SELECT ${primaryKey}
    FROM ${tableId}
    WHERE ${titleColumnId} = :value
    ORDER BY sort_number DESC
    LIMIT 1;`,
    {
      ":value" : value,
    },
  );
  if(matrix.length===0){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    return null;
  }
  return matrix[0][primaryKey];
}



// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  const result = await createColumn( tableId, columnName, dataType, parentTableId ); // 下層の関数を呼び出す
  if( dataType !== "TEXT" ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    // データ型が文字列ではない場合
    return result;
  }
  // データ型が文字列の場合
  const titleColumn = await runSqlReadOnly(
    `SELECT * FROM title_columns
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,
    },
  );
  if( titleColumn.length > 0 ){
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    // 既にタイトルが設定されている場合
    return result;
  }
  // まだタイトルが設定されていない場合
  // このカラムをタイトルに設定する
  await setTitleColumn_core( result.columnId );
  //
  return result;
}

// 見出しの役割を果たすカラムを登録する
export async function setTitleColumnsFromUI_core( columns ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    for( let i=0; i<columns.length; i++ ){
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        const childColumnId = columns[i]["id"];
        const parentTableId = await getParentTableId( childColumnId );
        if(!parentTableId){
          if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
          continue; // 外部キーではない場合
        }
        let titleColumn = columns[i]["titleColumn"];
        if(titleColumn==="指定なし"){
          if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
          await _deleteTitleColumn_core( parentTableId );
        }
        else{
          if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
          //
          // カラム名の先頭にテーブルIDを付け加える（「t2」など）
          if( !titleColumn.startsWith( parentTableId + "_" ) ){
            if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
            titleColumn = parentTableId + "_" + titleColumn;
          }
          const columnId = await getColumnIdFromName( titleColumn );
          if(!columnId){
            throw `指定されたカラムは存在しません。\ntitleColumn = ${titleColumn}`;
          }
          await setTitleColumn_core( columnId );
        }
    }
}

// 【サブ】見出しを登録解除する
export async function _deleteTitleColumn_core( tableId ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
  if( !cacheData[tableId] ){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    // 既に登録が解除されていたら処理を行う必要が無い
    return;
  }
  await runSqlWriteOnly(
    `DELETE FROM title_columns WHERE table_id = :tableId;`,
    {
        ":tableId": tableId,
    },
  );
  await _reload();    // メモリに再読み込み
}

// レコードの一覧を取得(GUI)
export async function listRecords_core( tableId, oldPageNumber, onePageMaxSize, focusRecordId, pasteRecordId ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
  const { columns, records, recordsTotal, pageNumber } = await listRecords( tableId, oldPageNumber, onePageMaxSize, focusRecordId, pasteRecordId );
  const newColumns = [];
  const newRecords = [];
  for( const columnInfo of columns ){
    if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
    const childColumnId = columnInfo.id;
    const parentTableId = await getParentTableId( childColumnId );
    if(!parentTableId){
      if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
      newColumns.push({
        ...columnInfo,
        "titleColumn_flag": false,
        "titleColumn_option": [],
      });
      continue;
    }
    const parentColumns = await listColumnsAll( parentTableId );
    const parentColumnNames = parentColumns.map( ({name}) => {
      if( String(name).startsWith(parentTableId+"_") ){
        if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
        return String(name).replace( parentTableId+"_", "" );
      }
      return String(name);
    });
    if( !cacheData[parentTableId] ){
      if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
      newColumns.push({
        ...columnInfo,
        "titleColumn_flag": true,
        "titleColumn": "指定なし",
        "titleColumn_option": [
          "指定なし",
          ...parentColumnNames,
        ],
      });
      continue;
    }
    let titleColumn = await getColumnName( cacheData[parentTableId] );
    if( String(titleColumn).startsWith(parentTableId+"_") ){
      if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
      titleColumn = String(titleColumn).replace( parentTableId+"_", "" );
    }
    newColumns.push({
      ...columnInfo,
      "titleColumn_flag": true,
      "titleColumn": titleColumn,
      "titleColumn_option": [
        "指定なし",
        ...parentColumnNames,
      ],
    });
  }
  for( const oldRecord of records ){
      if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
      const newRecord = {
        ...oldRecord,
      };
      for( let i=0; i<columns.length; i++ ){
        if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
        const value = oldRecord["field" + i ];
        const childColumnId = columns[i]["id"];
        const parentTableId = await getParentTableId( childColumnId );
        if(!parentTableId){
          if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
          // 外部キーではない場合
          newRecord[ "field" + i ] = String( value ?? "" );
          continue;
        }
        if(!value){
          if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
          // 空欄の場合
          newRecord[ "field" + i ] = "";
          continue;
        }
        const recordId = Number(value);
        const parentText = await _getParentValue_core( parentTableId, recordId );
        if(!parentText){
          if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
          newRecord[ "field" + i ] = `参照先が存在しません`;
          continue;
        }
        const url = `/default/records/index.html?table=${parentTableId}&record=${recordId}`;
        newRecord[ "field" + i ] = `<a href="${url}">${String(parentText)}</a>`;
      }
      newRecords.push(newRecord);
  }
  let recordOffset = -1;  // 以前開いていたスクロール位置の場合、-1を指定する
  if( pasteRecordId ){
    if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
    recordOffset = await _getRecordOffset_core( tableId, pasteRecordId, onePageMaxSize );
  }
  else if( focusRecordId ){
    if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
    recordOffset = await _getRecordOffset_core( tableId, focusRecordId, onePageMaxSize );
  }
  return { 
    columns: newColumns,
    records: newRecords,
    recordOffset: recordOffset,
    recordsTotal,
    pageNumber,
  };
}

// 【サブ】親テーブルの値を取得
export async function _getParentValue_core( tableId, recordId, nestLevel ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
  const titleColumnId = cacheData[tableId];
  if(!titleColumnId){
    if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
    // 見出しが設定されていない場合
    return `<i class="bi bi-box-arrow-up-right"></i>`;
  }
  const primaryKey = await getPrimaryKey( tableId );
  const records = await runSqlReadOnly(
    `SELECT ${titleColumnId}
    FROM ${tableId}
    WHERE ${primaryKey} = :recordId
    LIMIT 1;`,
    {
      ":recordId" : recordId,
    },
  );
  if( records.length===0 ){
    if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
    // 参照先が存在しない場合
    return null;
  }
  const fieldData = records[0][titleColumnId];
  if(!fieldData){
    if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
    return `<i class="bi bi-box-arrow-up-right"></i>`;
  }
  const parentTableId = await getParentTableId( titleColumnId );
  if(!parentTableId){
    if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
    // 外部キーではない場合
    return String(fieldData);
  }
  // 外部キーの場合、再帰呼び出し
  if(nestLevel>3){
    if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
    return `<i class="bi bi-box-arrow-up-right"></i>`;
  }
  return await _getParentValue_core( parentTableId, fieldData, (nestLevel??0)+1 );
}

// レコードを追加
export async function createRecordFromUI_core( tableId, columns ){
  if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
  const newColumns = [];
  for( const { id, newField } of columns ){
    if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
    const parentTableId = await getParentTableId( id );
    if(!parentTableId){
      if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
      // 外部キーではない場合
      newColumns.push({
        id: id,
        newField: newField,
      });
      continue;
    }
    // 外部キーの場合
    if(!newField){
      if(bugMode === 44) throw "MUTATION44";  // 意図的にバグを混入させる（ミューテーション解析）
      // 空欄の場合
      newColumns.push({
        id: id,
        newField: "",
      });
      continue;
    }
    const recordId = await _getRecordIdFromTitle_core( parentTableId, newField );
    newColumns.push({
      id: id,
      newField: recordId ?? "",
    });
  }
  return await createRecordFromUI( tableId, newColumns );
}

// 【サブ】親テーブルのスクロール位置を取得
export async function _getRecordOffset_core( tableId, recordId, onePageMaxSize ){
  if(bugMode === 45) throw "MUTATION45";  // 意図的にバグを混入させる（ミューテーション解析）
  const primaryKey = await getPrimaryKey( tableId );
  const [{ "COUNT(*)": offset2 }] = await runSqlReadOnly(
      `SELECT COUNT(*)
          FROM ${tableId}
          WHERE sort_number > (
              SELECT sort_number
                  FROM ${tableId}
                  WHERE ${primaryKey} = :recordId
                  LIMIT 1
          )
          ORDER BY sort_number DESC;`,
      {
          ":recordId": recordId,
      },
  );
  return offset2 % onePageMaxSize;
}
