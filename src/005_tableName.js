// テーブル名の置き換え
//
import {
  startUp,
  clearCache,
  createColumn,
  listColumns,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  createTable,
  deleteTable,
} from "./006_data_type_test.js";
import {
  getLocalIp,
} from "./012_ip_address_test.js";
import {
  getPath,
} from "./010_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  runSqlReadOnly,
  runSqlWriteOnly,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./008_connect_database_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    try {
        // テーブルを作成する（テーブルの存在を保存するため）
        await runSqlWriteOnly(
            `CREATE TABLE IF NOT EXISTS table_names (
                "table_number" INTEGER PRIMARY KEY AUTOINCREMENT,
                "table_name" TEXT NOT NULL,
                "enable" INTEGER NOT NULL DEFAULT 1,
                "is_system_table" INTEGER NOT NULL DEFAULT 0,
                "created_at" INTEGER NOT NULL
            );`,
            {},
        );
    }
    catch (err) {
        throw `システム管理用テーブルの作成に失敗しました。${String(err)}`;
    }
    //
    await _reload();    // メモリに再読み込み
}

//【グローバル変数】テーブル名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "t2": "テーブル名１",
    // "t8": "テーブル名２"
};
let cacheData2 = {
    // データの例
    // "テーブル名１": "t2",
    // "テーブル名２": "t8"
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    let matrix = [];
    try {
        matrix = await runSqlReadOnly(
            `SELECT * FROM table_names WHERE enable = 1;`,
            {},
        );
    }
    catch (err) {
        throw `テーブル「table_names」の読み込みに失敗しました。${String(err)}`;
    }
    cacheData1 = {};
    cacheData2 = {};
    for (const record of matrix) {
        const tableName = record["table_name"];
        const tableNumber = Number(record["table_number"]);
        cacheData1["t" + tableNumber] = tableName;
        cacheData2[tableName] = "t" + tableNumber;
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}

// テーブルを作成
export async function createTable_core( tableName, isSystemTable ){
    if (cacheData2[tableName]) {
        throw `テーブル名「${tableName}」は重複しています。`;
    }
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `INSERT INTO table_names (table_name, is_system_table, created_at)
            VALUES ( :tableName, :isSystemTable, :createdAt );`,
        {
            ":isSystemTable": isSystemTable,
            ":tableName": tableName,
            ":createdAt": timestamp,
        },
    );
    const tables = await runSqlReadOnly(
        `SELECT table_number FROM table_names
            WHERE table_name = :tableName
                AND created_at = :createdAt
            ORDER BY table_number DESC
            LIMIT 1;`,
        {
            ":tableName": tableName,
            ":createdAt": timestamp,
        },
    );
    if(tables.length===0){
        throw "追加したはずのテーブルが見つかりません。";
    }
    const tableNumber = tables[0]["table_number"];
    if(isNaN(tableNumber)){
        throw "新しく発行されたテーブルIDが見つかりません。";
    }
    const tableId = "t" + tableNumber;
    await createTable( tableId );   // 下層の関数を呼び出す
    await _reload();    // メモリに再読み込み
    return {
        tableId: tableId,
        message: `テーブル「${tableName}」を作成しました。`,
    };
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
    await runSqlWriteOnly(
        `DELETE FROM table_names
            WHERE table_number = :tableNumber
                AND is_system_table = 0;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTable( tableId );
}

// テーブルを無効化
export async function disableTable_core( tableId ){
    await runSqlWriteOnly(
        `UPDATE table_names
            SET enable = 0
            WHERE table_number = :tableNumber
                AND is_system_table = 0;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    await _reload();    // メモリに再読み込み
    return "テーブルを無効化しました";
}

// テーブルを再度有効化
export async function enableTable_core( tableId ){
    const tables = await runSqlReadOnly(
        `SELECT *
            FROM table_names AS t1
            INNER JOIN table_names AS t2
                ON t1.table_name = t2.table_name
            WHERE t2.table_number = :tableNumber
                AND t1.table_number <> :tableNumber
                AND t1.enable = 1
            LIMIT 1;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    if(tables.length>=1){
        const tableName = tables[0]["table_name"];
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
    await _reload();    // メモリに再読み込み
    return "テーブルを有効化しました";
}

// テーブル名を変更
export async function updateTableName_core( tables ){
    //==========================================================
    // テーブル名が重複していないか確認する
    await _reload();
    const obj = structuredClone(cacheData1);    // ディープコピー
    // データの例
    // obj = {
    //     "t2": "テーブル名１",
    //     "t8": "テーブル名２"
    // };
    for (const tableInfo of tables) {
        obj[tableInfo.id] = tableInfo.name;
    }
    // この時点で、連想配列「obj」には、全てのテーブル一覧が格納されている。
    // データの例
    // obj = {
    //     "2": "テーブル名１",（変更後のテーブル名）
    //     "8": "テーブル名２"
    // };
    for (const tableInfo of tables) {
        const newObj = structuredClone(obj);    // ディープコピー
        //
        // 自分自身を除いた、他のテーブルと名前が被っていないか確認する
        delete newObj[tableInfo.id];    //自分自身を除く
        const tableNameArray = Object.values(newObj);
        if (tableNameArray.includes(tableInfo.name)) {
            throw `テーブル名「${tableInfo.name}」は重複しています。`;
        }
    }
    // テーブル名が重複していないか確認する ここまで
    //==========================================================
    //
    for (const tableInfo of tables) {
        await runSqlWriteOnly(
            `UPDATE table_names
                SET table_name = :tableName
                WHERE table_number = :tableNumber
                    AND is_system_table = 0;`,
            {
                ":tableName": tableInfo.name,
                ":tableNumber": tableInfo.id.replace("t",""),
            },
        );
    }
    await _reload();    // メモリに再読み込み
    return "テーブル名を変更しました";
}

// テーブルの一覧を取得
export async function listTables_core( pageNumber_tables, onePageMaxSize, isTrash ){
    const pageNumber = pageNumber_tables;
    if (!(pageNumber >= 1)) {
        pageNumber = 1;
    }
    const [{ "COUNT(*)": count }] = await action("RUN_SQL_READ_ONLY", {
        sql: `
            SELECT COUNT(*)
                FROM table_names
                WHERE enable = :isEnable;
        `,
        params: {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
        },
    });
    const matrix = await action("RUN_SQL_READ_ONLY", {
        sql: `
            SELECT
                "t" || table_number AS id,
                table_name AS name
            FROM table_names
                WHERE enable = :isEnable
                    AND is_system_table = 0
                ORDER BY created_at DESC
                LIMIT :limit OFFSET :offset;
        `,
        params: {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": onePageMaxSize * (pageNumber - 1),
        },
    });
    return {
        "tables": matrix,
        "tables_total": count,
    }
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
    //入力パラメータに含まれるテーブル名をIDに置き換える
    for( const tableId in cacheData1 ){
        const tableName = cacheData1[tableId];
        sql = sql.replaceAll( tableName, tableId );
    }
    return await runSqlReadOnly( sql, params );
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
    //入力パラメータに含まれるテーブル名をIDに置き換える
    for( const tableId in cacheData1 ){
        const tableName = cacheData1[tableId];
        sql = sql.replaceAll( tableName, tableId );
    }
    return await runSqlWriteOnly( sql, params );
}
