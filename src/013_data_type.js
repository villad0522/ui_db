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
} from "./014_connect_database_test.js";
import {
  getLocalIp,
} from "./018_ip_address_test.js";
import {
  getPath,
} from "./016_directory_test.js";

// テーブルに保存できるデータ型の一覧
// ・INTEGER (SQLiteでサポート)
// ・REAL (SQLiteでサポート)
// ・TEXT (SQLiteでサポート)
// ・BOOL (自作)
// ・FILE (自作)


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    try {
        // テーブルを作成する（データ型を保存するため）
        await runSqlWriteOnly(
            `CREATE TABLE IF NOT EXISTS data_types (
                "column_number" INTEGER PRIMARY KEY AUTO_INCREMENT,
                "table_id" INTEGER NOT NULL,
                "data_type" TEXT NOT NULL,
                "created_at" INTEGER NOT NULL
            );`,
            {},
        );
    }
    catch (err) {
        throw `システム管理用テーブルの作成に失敗しました。\n${String(err)}`;
    }
    await _reload();    // メモリに再読み込み
}

//【グローバル変数】データ型を保存するキャッシュ
const cacheData = {
    // データの例
    // "t2": {
    //     "c5": "TEXT",
    //     "c22": "INTEGER",
    //     "c13": "BOOL"
    // },
    // "t8": {
    //     "c25": "INTEGER",
    //     "c3": "TEXT",
    //     "c9": "FILE"
    // }
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    let matrix = [];
    const columns = await runSqlReadOnly(
        `SELECT
            column_number AS columnNumber,
            data_type AS dataType
        FROM data_types;`,
        {},
    );
    //
    for( const { columnNumber, dataType } of columns ){
        if(!cacheData[tableId]){
            cacheData[tableId] = {};
        }
        cacheData[tableId]["c"+columnNumber] = dataType;
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
    await _reload();    // メモリに再読み込み
}

// カラムを作成
export async function createColumn_core( tableId, dataType ){
    let sqlDataType = "";
    switch(dataType){
        case "INTEGER":
            sqlDataType = "INTEGER";
            break;
        case "REAL":
            sqlDataType = "REAL";
            break;
        case "TEXT":
            sqlDataType = "TEXT";
            break;
        case "BOOL":
            sqlDataType = "INTEGER";
            break;
        case "FILE":
            sqlDataType = "BLOB";
            break;
        default:
            throw `データ型「${dataType}」はサポートされていません。`;
    }
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `INSERT INTO data_types (table_id, data_type, created_at)
            VALUES ( :tableId, :dataType, :createdAt );`,
        {
            ":tableId": tableId,
            ":dataType": dataType,
            ":createdAt": timestamp,
        },
    );
    const columns = await runSqlReadOnly(
        `SELECT column_number FROM data_types
            WHERE table_id = :tableId
                AND data_type = :dataType
                AND created_at = :createdAt
            ORDER BY column_number DESC
            LIMIT 1;`,
        {
            ":tableId": tableId,
            ":dataType": dataType,
            ":createdAt": timestamp,
        },
    );
    if(columns.length===0){
        throw "追加したはずのカラムが見つかりません。";
    }
    const columnNumber = columns[0]["column_number"];
    if(isNaN(columnNumber)){
        throw "新しく発行されたカラムIDが見つかりません。";
    }
    const columnId = "c" + columnNumber;
    await runSqlWriteOnly(
        `ALTER TABLE ${tableId} ADD COLUMN ${columnId} ${sqlDataType};`,
        {
            ":tableId": tableId,
            ":dataType": dataType,
            ":createdAt": timestamp,
        },
    );
    await _reload();    // メモリに再読み込み
    return {
        columnId: columnId,
        message: "カラムを追加しました。",
    };
}

// カラムの一覧を取得
export async function listColumns_core(  ){
    return cacheData;
}

// レコードを作成
export async function createRecord_core( tableId, recordData ){
    if( recordData["record_id"] ){
        throw "カラム「record_id」は指定できません。";
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
        if( !dataTypes[columnId] ){
            throw "指定されたカラムは存在しません。";
        }
    }
    //
    // キーの先頭に「:」を追加する
    const newRecordData = {};
    for( const columnId in recordData ){
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
        `SELECT record_id FROM ${tableId}
            WHERE created_at = :createdAt
            ORDER BY record_id DESC
            LIMIT 1;`,
        {
            ":createdAt": timestamp,
        },
    );
    if(records.length===0){
        throw "追加したはずのレコードが見つかりません。";
    }
    const recordId = records[0]["record_id"];
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
    if( recordData["record_id"] ){
        throw "カラム「record_id」は上書き禁止です。";
    }
    //
    // 「tableId」が本当に存在するのか確認（インジェクション攻撃対策）
    const dataTypes = cacheData[tableId];
    if(Object.keys(dataTypes).length===0){
        throw "指定されたテーブルは存在しません。";
    }
    //
    const records = await runSqlReadOnly(
        `SELECT * FROM ${tableId} WHERE record_id = :recordId LIMIT 1;`,
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
            WHERE record_id = :recordId;`,
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
    if( (value===null) || (value===undefined) ){
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
            if( typeof value !== "number" || isNaN(value) ){
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
            if( typeof value !== "number" || isNaN(value) ){
                return {
                    isOK: false,
                    message: "数値ではありません。",
                };
            }
            break;
        case "TEXT":
            if( typeof value !== "string" ){
                return {
                    isOK: false,
                    message: "文字列ではありません。",
                };
            }
        case "BOOL":
            if( typeof value !== "boolean" ){
                return {
                    isOK: false,
                    message: "ブール値ではありません。",
                };
            }
            break;
        case "FILE":
            if (!value instanceof Uint8Array) {
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
    for( const columnId in recordData){
        const {isOK,message} = await checkField( tableId, columnId, recordData[columnId] );
        if(isOK===false){
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
    // テーブルを作成する
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS ${tableId} (
            "record_id" INTEGER PRIMARY KEY NOT NULL,
            "created_at" INTEGER NOT NULL,
            "updated_at" INTEGER NOT NULL
        );`,
        {},
    );
    return "テーブルを作成しました。";
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
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