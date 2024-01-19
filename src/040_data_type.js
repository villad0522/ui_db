// データ型
//
import {
  startUp,
  getDebugMode,
  startTransaction,
  endTransaction,
  runSqlReadOnly,
  runSqlWriteOnly,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./045_connect_database_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  getPath,
} from "./048_directory_validate.js";
import {
  getPrimaryKey,
} from "./042_layerName_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


// テーブルに保存できるデータ型の一覧
// ・INTEGER (SQLiteでサポート)
// ・REAL (SQLiteでサポート)
// ・TEXT (SQLiteでサポート)
// ・BOOL (自作)
// ・FILE (自作)


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    // テーブルを作成する（データ型を保存するため）
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS data_types (
            "column_id" TEXT PRIMARY KEY,
            "table_id" TEXT NOT NULL,
            "data_type" TEXT NOT NULL
        );`,
        {},
    );
    await _reload();    // メモリに再読み込み
}

//【グローバル変数】データ型を保存するキャッシュ
let cacheData = {
    // データの例
    //  "t1":{
    //    "c5": "TEXT",
    //    "c22": "INTEGER",
    //    "c13": "BOOL"
    //  },
    //  "t2":{
    //    "c1": "TEXT",
    //    "c9": "INTEGER",
    //    "c78": "BOOL"
    //  }
};
let cacheData2 = {
    // データの例
    //    "c5": "TEXT",
    //    "c22": "INTEGER",
    //    "c13": "BOOL"
    //    "c1": "TEXT",
    //    "c9": "INTEGER",
    //    "c78": "BOOL"
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    const columns = await runSqlReadOnly(
        `SELECT
            column_id AS columnId,
            table_id AS tableId,
            data_type AS dataType
        FROM data_types;`,
        {},
    );
    cacheData = {};
    cacheData2 = {};
    for( const { columnId, tableId, dataType } of columns ){
        if(!cacheData[tableId]){
            cacheData[tableId] = {};
        }
        cacheData[tableId][columnId] = dataType;
        cacheData2[columnId] = dataType;
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
}

// カラムを作成
export async function createColumn_core( tableId, columnId, dataType ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    if( !String(tableId).startsWith("t") ){
        throw `テーブルIDに無効な文字列「${tableId}」が指定されました。`;
    }
    if( !String(columnId).startsWith("c") ){
        throw `カラムIDに無効な文字列「${columnId}」が指定されました。`;
    }
    let sqlDataType = "";
    switch(dataType){
        case "INTEGER":
            if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
            sqlDataType = "INTEGER";
            break;
        case "REAL":
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            sqlDataType = "REAL";
            break;
        case "TEXT":
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            sqlDataType = "TEXT";
            break;
        case "BOOL":
            if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
            sqlDataType = "INTEGER";
            break;
        case "FILE":
            if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
            sqlDataType = "BLOB";
            break;
        default:
            throw `データ型「${dataType}」はサポートされていません。`;
    }
    await runSqlWriteOnly(
        `ALTER TABLE ${tableId} ADD COLUMN ${columnId} ${sqlDataType};`,
        {},
    );
    await runSqlWriteOnly(
        `INSERT INTO data_types ( column_id, table_id, data_type )
            VALUES ( :columnId, :tableId, :dataType );`,
        {
            ":columnId": columnId,
            ":tableId": tableId,
            ":dataType": dataType,
        },
    );
    await _reload();    // メモリに再読み込み
    return "カラムを追加しました。";
}

// データ型の一覧を取得
export async function listDataTypes_core( tableId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    return cacheData[tableId];
}
// 戻り値の例
//  {
//    "c5": "TEXT",
//    "c22": "INTEGER",
//    "c13": "BOOL"
//  }

// レコードを作成
export async function createRecord_core( tableId, recordData ){
  if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    const primaryKey = await getPrimaryKey( tableId );
    if( recordData[primaryKey] ){
        throw "レコードを追加する際に、プライマリキーは指定できません。";
    }
    //
    // 「tableId」が本当に存在するのか確認（インジェクション攻撃対策）
    const dataTypes = await cacheData[tableId];
    if(Object.keys(dataTypes).length===0){
        throw "指定されたテーブルは存在しません。";
    }
    //
    // レコードのデータ型を検証する
    const {isOK,message} = await checkRecord( tableId, recordData )
    if( isOK===false ){
        throw message;
    }
    //
    // SQL文に必要な文字列を用意する。
    const columnIdList = Object.keys(recordData);
    const placeholderList = columnIdList.map( columnId => ( ":" + columnId ) );
    //
    // 配列「columnIdList」が本当に存在するカラムなのかを確認（インジェクション攻撃対策）
    for( const columnId of columnIdList ){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        if( !dataTypes[columnId] ){
            throw "指定されたカラムは存在しません。";
        }
    }
    //
    // キーの先頭に「:」を追加する
    const newRecordData = {};
    for( const columnId in recordData ){
        if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
        newRecordData[":"+columnId] = recordData[columnId];
    }
    //
    // レコードを追加する。
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `INSERT INTO ${tableId} ( ${columnIdList.join(", ")}, created_at, updated_at )
            VALUES ( ${placeholderList.join(", ")}, :createdAt, :updatedAt );`,
        {
            ...newRecordData,
            ":createdAt": timestamp,
            ":updatedAt": timestamp,
        }
    );
    const records = await runSqlReadOnly(
        `SELECT ${primaryKey} FROM ${tableId}
            WHERE created_at = :createdAt
            LIMIT 1;`,
        {
            ":createdAt": timestamp,
        },
    );
    if(records.length===0){
        throw "追加したはずのレコードが見つかりません。";
    }
    const recordId = records[0][primaryKey];
    if(!recordId){
        throw "新しく発行されたレコードIDが見つかりません。";
    }
    return {
        recordId: recordId,
        message: "レコードを追加しました。",
    };
}

// レコードを上書き
export async function updateRecord_core( tableId, recordId, recordData ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    const primaryKey = await getPrimaryKey( tableId );
    if( recordData[primaryKey] ){
        throw "プライマリキーは上書き禁止です。";
    }
    //
    // 「tableId」が本当に存在するのか確認（インジェクション攻撃対策）
    const dataTypes = cacheData[tableId];
    if(Object.keys(dataTypes).length===0){
        throw "指定されたテーブルは存在しません。";
    }
    //
    const records = await runSqlReadOnly(
        `SELECT * FROM ${tableId} WHERE ${primaryKey} = :recordId LIMIT 1;`,
        {
            ":recordId": recordId,
        },
    );
    if(records.length===0){
        throw "指定されたレコードは存在しません。";
    }
    //
    // レコードのデータ型を検証する
    const {isOK,message} = await checkRecord( tableId, recordData )
    if( isOK===false ){
        throw message;
    }
    //
    const words = [];
    for( const columnId in recordData ){
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        // 配列「columnId」が本当に存在するカラムなのかを確認（インジェクション攻撃対策）
        if( !dataTypes[columnId] ){
            throw "指定されたカラムは存在しません。";
        }
        words.push(`${columnId}=:${columnId}`);
    }
    //
    // レコードを上書きする。
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `UPDATE ${tableId}
            SET ${words.join(", ")}, updated_at=:updatedAt
            WHERE ${primaryKey} = :recordId;`,
        {
            ...newRecordData,
            ":recordId": recordId,
            ":updatedAt": timestamp,
        },
    );
    return "レコードを上書きしました。";
}


// フィールドを検証
export async function checkField_core( tableId, columnId, value ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    if( !String(tableId).startsWith("t") ){
        throw `テーブルIDに無効な文字列「${tableId}」が指定されました。`;
    }
    if( !String(columnId).startsWith("c") ){
        throw `カラムIDに無効な文字列「${columnId}」が指定されました。`;
    }
    if( (value===null) || (value===undefined) ){
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        return {
            isOK: true,
            message: "空欄です。",
        };
    }
    const dataType = cacheData[tableId][columnId];
    if(!dataType){
        throw "指定されたカラムは存在しません。";
    }
    switch( dataType ){
        case "INTEGER":
            if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
            if( typeof value !== "number" || isNaN(value) ){
                if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
                return {
                    isOK: false,
                    message: "数値ではありません。",
                };
            }
            if (!Number.isInteger(value)) {
                throw "小数は指定できません。指定できるのは整数のみです。";
            }
            break;
        case "REAL":
            if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
            if( typeof value !== "number" || isNaN(value) ){
                if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
                return {
                    isOK: false,
                    message: "数値ではありません。",
                };
            }
            break;
        case "TEXT":
            if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
            if( typeof value !== "string" ){
                if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
                return {
                    isOK: false,
                    message: "文字列ではありません。",
                };
            }
        case "BOOL":
            if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
            if( typeof value !== "boolean" ){
                if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
                return {
                    isOK: false,
                    message: "ブール値ではありません。",
                };
            }
            break;
        case "FILE":
            if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
            if (!value instanceof Uint8Array) {
                if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
                return {
                    isOK: false,
                    message: "サポートされているファイル形式（Uint8Array）ではありません。",
                };
            }
            break;
    }
    return {
        isOK: true,
        message: "データ型に適合しています。",
    };
}

// レコードを検証
export async function checkRecord_core( tableId, recordData ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
    for( const columnId in recordData){
        if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
        const {isOK,message} = await checkField( tableId, columnId, recordData[columnId] );
        if(isOK===false){
            if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
            return {
                isOK: false,
                message: message,
            };
        }
    }
    return {
        isOK: true,
        message: "データ型に適合しています。",
    };
}

// テーブルを作成
export async function createTable_core( tableId ){
  if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
    const primaryKey = await getPrimaryKey( tableId );
    // テーブルを作成する
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS ${tableId} (
            "${primaryKey}" INTEGER PRIMARY KEY NOT NULL,
            "created_at" INTEGER NOT NULL,
            "updated_at" INTEGER NOT NULL
        );`,
        {},
    );
    return "テーブルを作成しました。";
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    // テーブルを削除する
    await runSqlWriteOnly(
        `DROP TABLE IF EXISTS ${tableId};`,
        {},
    );
    await runSqlWriteOnly(
        `DELETE FROM data_types
            WHERE table_id = :tableId;`,
        {
            ":tableId": tableId,
        },
    );
    await _reload();    // メモリに再読み込み
    return "テーブルを削除しました。";
}



// データ型を取得
export async function getDataType_core( columnId ){
  if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
    return cacheData2[columnId];
}
