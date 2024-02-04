// テーブル名の置き換え
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
  deleteRecord,
  reload,
} from "./103_data_type_validate.js";
import {
  getLocalIp,
} from "./124_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./112_csv_validate.js";
import {
  getPath,
} from "./121_directory_validate.js";
import {
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./118_connect_database_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./115_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./109_primary_key_validate.js";
import {
  deleteRecords,
} from "./106_delete_record_validate.js";


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
    // テーブルを作成する（テーブルの存在を保存するため）
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS table_names (
            "table_number" INTEGER PRIMARY KEY AUTOINCREMENT,
            "table_name" TEXT NOT NULL,
            "enable" INTEGER NOT NULL DEFAULT 1,
            "created_at" INTEGER UNIQUE
        );`,
        {},
    );
    await reload_core();    // メモリに再読み込み
}

//【グローバル変数】テーブル名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "t2": "テーブル名１",
    // "t8": "テーブル名２"
};

let cacheData2 = {
    // データの例
    // "t1": new RegExp(`(?<=^|[^a-zA-Z0-9])\bテーブル名1\b(?=\$|[^a-zA-Z0-9])`, "g"),
    // "t2": new RegExp(`(?<=^|[^a-zA-Z0-9])\bテーブル名2\b(?=\$|[^a-zA-Z0-9])`, "g"),
};

let cacheData3 = {
    // データの例
    // "テーブル名１": "t2",
    // "テーブル名２": "t8"
};

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await reload_core();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}

// テーブルを作成
export async function createTable_core( tableName ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // テーブル名が重複していないかチェックする
    const tables1 = await runSqlReadOnly(
        `SELECT *
        FROM table_names
        WHERE enable = 1
          AND table_name = :tableName;`,
      {
          ":tableName": tableName,
      },
    );
    if (tables1.length>0) {
        throw `テーブル名「${tableName}」は重複しています。`;
    }
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `INSERT INTO table_names (table_name, created_at)
            VALUES ( :tableName, :createdAt );`,
        {
            ":tableName": tableName,
            ":createdAt": timestamp,
        },
    );
    const tables2 = await runSqlReadOnly(
        `SELECT table_number FROM table_names
            WHERE table_name = :tableName
                AND created_at = :createdAt
            LIMIT 1;`,
        {
            ":tableName": tableName,
            ":createdAt": timestamp,
        },
    );
    if(tables2.length===0){
        throw "追加したはずのテーブルが見つかりません。";
    }
    const tableNumber = tables2[0]["table_number"];
    if(isNaN(tableNumber)){
        throw "新しく発行されたテーブルIDが見つかりません。";
    }
    const tableId = "t" + tableNumber;
    await createTable( tableId );   // 下層の関数を呼び出す
    await reload_core();    // メモリに再読み込み
    return {
        tableId: tableId,
        message: `テーブル「${tableName}」を作成しました。`,
    };
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM table_names
            WHERE table_number = :tableNumber;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    await reload_core();    // メモリに再読み込み
    return await deleteTable( tableId );  // 下層の関数を実行する
}

// テーブルを無効化
export async function disableTable_core( tableId ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `UPDATE table_names
            SET enable = 0
            WHERE table_number = :tableNumber;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    await reload_core();    // メモリに再読み込み
    return "テーブルを無効化しました";
}

// テーブルを再度有効化
export async function enableTable_core( tableId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    const tables = await runSqlReadOnly(
        `SELECT
            t2.table_name AS tableName
        FROM table_names AS t1
        INNER JOIN table_names AS t2
            ON t1.table_name = t2.table_name
            AND t1.table_number <> t2.table_number
        WHERE t1.table_number = :tableNumber
            AND t2.enable = 1
        LIMIT 1;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    if(tables.length>=1){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        const tableName = tables[0]["tableName"];
        throw `テーブル名「${tableName}」は重複しています。`;
    }
    await runSqlWriteOnly(
        `UPDATE table_names
            SET enable = 1
            WHERE table_number = :tableNumber;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    await reload_core();    // メモリに再読み込み
    return "テーブルを有効化しました";
}

// テーブル名を変更
export async function updateTableName_core( tables ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    //==========================================================
    // テーブル名が重複していないか確認する
    await reload_core();
    const obj = structuredClone(cacheData1);    // ディープコピー
    // データの例
    // obj = {
    //     "t2": "テーブル名１",
    //     "t8": "テーブル名２"
    // };
    for (const { id, name } of tables) {
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        obj[id] = name;
    }
    // この時点で、連想配列「obj」には、全てのテーブル一覧が格納されている。
    // データの例
    // obj = {
    //     "t2": "変更後のテーブル名１",
    //     "t8": "テーブル名２"
    // };
    for (const { id, name } of tables) {
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        const newObj = structuredClone(obj);    // ディープコピー
        //
        // 自分自身を除いた、他のテーブルと名前が被っていないか確認する
        delete newObj[id];    //自分自身を除く
        const tableNameArray = Object.values(newObj);
        if (tableNameArray.includes(name)) {
            throw `テーブル名「${name}」は重複しています。`;
        }
    }
    //
    //==========================================================
    // テーブル名を変更する
    for (const { id, name } of tables) {
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        let tableNumber = id.replace("t","");
        if(isNaN(tableNumber)){
            throw "指定されたテーブルIDは無効です。";
        }
        tableNumber = Number(tableNumber);
        await runSqlWriteOnly(
            `UPDATE table_names
                SET table_name = :tableName
                WHERE table_number = :tableNumber;`,
            {
                ":tableName": name,
                ":tableNumber": tableNumber,
            },
        );
    }
    //==========================================================
    await reload_core();    // メモリに再読み込み
    return "テーブル名を変更しました";
}


// テーブルの一覧を取得(重)
export async function listTables_core( pageNumber, onePageMaxSize, isTrash ){
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    if ( !pageNumber ) {
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    if (!(pageNumber >= 1)) {
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    const [{ "COUNT(*)": total }] = await runSqlReadOnly(
        `SELECT COUNT(*)
            FROM table_names
            WHERE enable = :isEnable;`,
        {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
        },
    );
    let offset = onePageMaxSize * (pageNumber - 1);
    if( offset >= total ){
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        offset = total;
    }
    // 「sqlite_master」と結合させることで、実際に存在するテーブルのみに絞り込む
    const matrix = await runSqlReadOnly(
        `SELECT
            ( "t" || table_names.table_number ) AS id,
            table_names.table_name AS name
        FROM table_names
        INNER JOIN sqlite_master
            ON ( "t" || table_names.table_number ) = sqlite_master.name
        WHERE table_names.enable = :isEnable
        ORDER BY table_names.created_at DESC
        LIMIT :limit OFFSET :offset;`,
        {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": offset,
        },
    );
    return {
        "tables": matrix,
        "total": total,
    }
}


// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    //入力パラメータに含まれるテーブル名をIDに置き換える
    for( const tableId in cacheData1 ){
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
        const regexp = cacheData2[tableId];
        if(!regexp){
            throw `正規表現が見つかりません`;
        }
        sql = sql.replaceAll(regexp, tableId );
    }
    return await runSqlReadOnly( sql, params );  // 下層の関数を実行する
}


// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    //入力パラメータに含まれるテーブル名をIDに置き換える
    for( const tableId in cacheData1 ){
        if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
        const regexp = cacheData2[tableId];
        if(!regexp){
            throw `正規表現が見つかりません`;
        }
        sql = sql.replaceAll( regexp, tableId );
    }
    return await runSqlWriteOnly( sql, params );  // 下層の関数を実行する
}


// テーブルが有効なのか判定
export async function checkTableEnabled_core( tableId ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
    return cacheData1[tableId] ? true : false;
}

// IDからテーブル名を取得
export async function getTableName_core( tableId ){
  if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData1[tableId];
}

// 【サブ関数】メモリに再読み込み
export async function reload_core(  ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    const matrix = await runSqlReadOnly(
        `SELECT
            table_number AS tableNumber,
            table_name AS tableName
        FROM table_names
        WHERE enable = 1;`,
        {},
    );
    cacheData1 = {};
    cacheData2 = {};
    cacheData3 = {};
    for (const { tableNumber, tableName } of matrix) {
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        const tableId = "t" + String(tableNumber);
        cacheData1[tableId] = tableName;
        cacheData3[tableName] = tableId;
        cacheData2[tableId] = new RegExp(`(?<!')(?<=(^|[^a-zA-Z0-9]))${tableName}(?!')(?=\$|[^a-zA-Z0-9])`, "g");
    }
}

// テーブルの一覧を取得（高速）
export async function listTableNamesAll_core(  ){
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
  return Object.values(cacheData1);
}

// テーブル名からIDを取得
export async function getTableIdFromName_core( tableName ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData3[tableName];
}
