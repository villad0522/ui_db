// テーブル名の置き換え
//
import {
  startUp,
  runSqlWriteOnly,
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./022_search_text_test.js";
import {
  getLocalIp,
} from "./032_ip_address_test.js";
import {
  getPath,
} from "./030_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  runSqlReadOnly,
  getCsvProgress,
  close,
} from "./028_connect_database_test.js";
import {
  getPrimaryKey,
} from "./026_layerName_test.js";
import {
  clearCache,
  createColumn,
  listDataTypes,
  checkField,
  checkRecord,
  createTable,
  deleteTable,
  getDataType,
} from "./024_data_type_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    // テーブルを作成する（テーブルの存在を保存するため）
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS table_names (
            "table_number" INTEGER PRIMARY KEY AUTOINCREMENT,
            "table_name" TEXT NOT NULL,
            "enable" INTEGER NOT NULL DEFAULT 1,
            "created_at" INTEGER NOT NULL
        );`,
        {},
    );
    await _reload();    // メモリに再読み込み
}

//【グローバル変数】テーブル名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "t2": "テーブル名１",
    // "t8": "テーブル名２"
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    const matrix = await runSqlReadOnly(
        `SELECT
            table_number AS tableNumber,
            table_name AS tableName
        FROM table_names
        WHERE enable = 1;`,
        {},
    );
    cacheData1 = {};
    for (const { tableNumber, tableName } of matrix) {
        const tableId = "t" + String(tableNumber);
        cacheData1[tableId] = tableName;
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}

// テーブルを作成
export async function createTable_core( tableName ){
    // テーブル名が重複していないかチェックする
    const tables = await runSqlReadOnly(
        `SELECT *
        FROM table_names
        WHERE enable = 1
          AND table_name = :tableName;`,
      {
          ":tableName": tableName,
      },
    );
    if (tables.length>0) {
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
    const tables = await runSqlReadOnly(
        `SELECT table_number FROM table_names
            WHERE table_name = :tableName
                AND created_at = :createdAt
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
            WHERE table_number = :tableNumber;`,
        {
            ":tableNumber": tableId.replace("t",""),
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTable( tableId );  // 下層の関数を実行する
}

// テーブルを無効化
export async function disableTable_core( tableId ){
    await runSqlWriteOnly(
        `UPDATE table_names
            SET enable = 0
            WHERE table_number = :tableNumber;`,
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
    for (const { id, name } of tables) {
        obj[id] = name;
    }
    // この時点で、連想配列「obj」には、全てのテーブル一覧が格納されている。
    // データの例
    // obj = {
    //     "t2": "変更後のテーブル名１",
    //     "t8": "テーブル名２"
    // };
    for (const { id, name } of tables) {
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
    await _reload();    // メモリに再読み込み
    return "テーブル名を変更しました";
}


// テーブルの一覧を取得(重)
export async function listTables_core( pageNumber, onePageMaxSize, isTrash ){
    if (!(pageNumber >= 1)) {
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
    //入力パラメータに含まれるテーブル名をIDに置き換える
    for( const tableId in cacheData1 ){
        const tableName = cacheData1[tableId];
        sql = sql.replaceAll( tableName, tableId );
    }
    return await runSqlReadOnly( sql, params );  // 下層の関数を実行する
}


// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
    //入力パラメータに含まれるテーブル名をIDに置き換える
    for( const tableId in cacheData1 ){
        const tableName = cacheData1[tableId];
        sql = sql.replaceAll( tableName, tableId );
    }
    return await runSqlWriteOnly( sql, params );  // 下層の関数を実行する
}


// テーブルが有効なのか判定
export async function checkTableEnabled_core( tableId ){
    return cacheData1[tableId] ? true : false;
}

// IDからテーブル名を取得
export async function getTableName_core( tableId ){
  return cacheData1[tableId];
}
