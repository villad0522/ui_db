// カラム名の置き換え
//
import {
  startUp,
  runSqlReadOnly,
  runSqlWriteOnly,
  clearCache,
  createTable,
  deleteTable,
  disableTable,
  enableTable,
  updateTableName,
  listTables,
} from "./008_table_name_test.js";
import {
  getLocalIp,
} from "./018_ip_address_test.js";
import {
  getPath,
} from "./016_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./014_connect_database_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./010_search_text_test.js";
import {
  createColumn,
  listColumns,
  checkField,
  checkRecord,
} from "./012_data_type_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    try {
      // テーブルを作成する（テーブルの存在を保存するため）
      await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS column_names(
            "column_id" TEXT PRIMARY KEY,
            "column_name" TEXT NOT NULL,
            "table_id" TEXT NOT NULL,
            "enable" INTEGER NOT NULL DEFAULT 1
        );`,
        {},
      );
    }
    catch (err) {
      throw `システム管理用テーブルの作成に失敗しました。${String(err)}`;
    }
    await _reload();    // メモリに再読み込み
}

//【グローバル変数】カラム名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "c2": "カラム名１",
    // "c8": "カラム名２"
};
let cacheData2 = {
    // データの例
    // "カラム名１": "c2",
    // "カラム名２": "c8"
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    let matrix = [];
    try {
        matrix = await runSqlReadOnly(
            `SELECT * FROM column_names WHERE enable = 1;`,
            {},
        );
    }
    catch (err) {
        throw `テーブル「column_names」の読み込みに失敗しました。${String(err)}`;
    }
    cacheData1 = {};
    cacheData2 = {};
    for (const record of matrix) {
        const columnName = record["column_name"];
        const columnId = record["column_id"];
        cacheData1[columnId] = columnName;
        cacheData2[columnName] = columnId;
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType ){
    const columns = await runSqlReadOnly(
      `SELECT * FROM column_names
        WHERE enable = 1
          AND columnName = :columnName;`,
      {
          ":columnName": columnName,
      },
    );
    if (columns.length>=1) {
      throw `カラム名「${columnName}」は重複しています。`;
    }
    const { columnId, message } = await createColumn( tableId, dataType );   // 下層の関数を呼び出す
    await runSqlWriteOnly(
      `INSERT INTO column_names ( column_id, column_name, table_id )
          VALUES ( :columnId, :columnName, :tableId );`,
      {
          ":columnId": columnId,
          ":columnName": columnName,
          ":tableId": tableId,
      },
    );
    await _reload();    // メモリに再読み込み
    return {
        columnId: columnId,
        message: `カラム「${columnName}」を作成しました。`,
    };
}

// カラムを無効化
export async function disableColumn_core( columnId ){
    await runSqlWriteOnly(
        `UPDATE column_names
            SET enable = 0
            WHERE column_id = :columnId;`,
        {
            ":columnId": columnId,
        },
    );
    await _reload();    // メモリに再読み込み
    return "カラムを無効化しました";
}

// カラムを再度有効化
export async function enableColumn_core( columnId ){
    const columns = await runSqlReadOnly(
        `SELECT *
            FROM column_names AS t1
            INNER JOIN column_names AS t2
                ON t1.column_name = t2.column_name
            WHERE t2.column_id = :columnId
                AND t1.column_id <> :column_id
                AND t1.enable = 1
            LIMIT 1;`,
        {
            ":columnId": columnId,
        },
    );
    if(columns.length>=1){
        const columnName = columns[0]["column_name"];
        throw `テーブル名「${columnName}」は重複しています。`;
    }
    await runSqlWriteOnly(
        `UPDATE column_names
            SET enable = 1
            WHERE column_id = :columnId;`,
        {
            ":columnId": columnId,
        },
    );
    await _reload();    // メモリに再読み込み
    return "カラムを有効化しました";
}

// カラム名を変更
export async function updateColumnName_core( columns ){
    //==========================================================
    // カラム名が重複していないか確認する
    await _reload();
    const obj = structuredClone(cacheData1);    // ディープコピー
    // データの例
    // obj = {
    //     "c2": "カラム名１",
    //     "c8": "カラム名２"
    // };
    for (const { id, name } of columns) {
        obj[id] = name;
    }
    // この時点で、連想配列「obj」には、全てのカラム一覧が格納されている。
    // データの例
    // obj = {
    //     "c2": "カラム名１",（変更後のカラム名）
    //     "c8": "カラム名２"
    // };
    for (const { id, name } of columns) {
        const newObj = structuredClone(obj);    // ディープコピー
        //
        // 自分自身を除いた、他のカラムと名前が被っていないか確認する
        delete newObj[id];    //自分自身を除く
        const columnNameArray = Object.values(newObj);
        if (columnNameArray.includes(name)) {
            throw `カラム名「${name}」は重複しています。`;
        }
    }
    // ここまでカラム名が重複していないか確認する処理
    //==========================================================
    //
    for (const { id, name } of columns) {
        await runSqlWriteOnly(
            `UPDATE column_names
                SET column_name = :columnName
                WHERE column_id = :columnId
                    AND is_system_table = 0;`,
            {
                ":columnName": name,
                ":columnId": id,
            },
        );
    }
    await _reload();    // メモリに再読み込み
    return "カラム名を変更しました";
}

// カラムの一覧を取得
export async function listColumns_core( pageNumber_columns, onePageMaxSize, isTrash ){
    const pageNumber = pageNumber_columns;
    if (!(pageNumber >= 1)) {
        pageNumber = 1;
    }
    const [{ "COUNT(*)": count }] = await runSqlReadOnly(
        `SELECT COUNT(*)
            FROM column_names
            WHERE enable = :isEnable;`,
        {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
        },
    );
    const matrix = await runSqlReadOnly(
        `SELECT
            column_id AS id,
            column_name AS name
        FROM column_names
            WHERE enable = :isEnable
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset;`,
        {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": onePageMaxSize * (pageNumber - 1),
        },
    );
    return {
        "columns": matrix,
        "columns_total": count,
    }
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
    //入力パラメータに含まれるカラム名をIDに置き換える
    for( const columnId in cacheData1 ){
        const columnName = cacheData1[columnId];
        sql = sql.replaceAll( columnName, columnId );
    }
    return await runSqlReadOnly( sql, params );
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
    //入力パラメータに含まれるカラム名をIDに置き換える
    for( const columnId in cacheData1 ){
        const columnName = cacheData1[columnId];
        sql = sql.replaceAll( columnName, columnId );
    }
    return await runSqlReadOnly( sql, params );
}
