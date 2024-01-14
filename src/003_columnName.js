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
} from "./004_tableName_test.js";
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
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./008_connect_database_test.js";
import {
  createColumn,
  listColumns,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./006_data_type_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    try {
      // テーブルを作成する（テーブルの存在を保存するため）
      await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS column_names (
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
    //
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
          AND columnName = :columnName
          AND table_id = :tableId;`,
      {
          ":tableId": tableId,
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

// カラムの一覧を取得
export async function listColumns_core( pageNumber_columns, onePageMaxSize, isTrash ){
  throw "この関数は未実装です。";
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
  throw "この関数は未実装です。";
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
  throw "この関数は未実装です。";
}
