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
  checkTableEnabled,
} from "./010_table_name_test.js";
import {
  getLocalIp,
} from "./022_ip_address_test.js";
import {
  getPath,
} from "./020_directory_test.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  getCsvProgress,
  close,
} from "./018_connect_database_test.js";
import {
  createRecordsFromCsv,
  createRecord,
  updateRecord,
  delete_table,
} from "./012_search_text_test.js";
import {
  getPrimaryKey,
} from "./016_layerName_test.js";
import {
  createColumn,
  listDataTypes,
  checkField,
  checkRecord,
} from "./014_data_type_test.js";

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    // テーブルを作成する（カラムの存在を保存するため）
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS column_names(
            "column_number" INTEGER PRIMARY KEY AUTOINCREMENT,
            "column_name" TEXT NOT NULL,
            "table_id" TEXT NOT NULL,
            "enable" INTEGER NOT NULL DEFAULT 1
        );`,
        {},
    );
    await _reload();    // メモリに再読み込み
}

//【グローバル変数】カラム名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "c2": "t1_カラム名１",
    // "c8": "t1_カラム名２"
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    const matrix = await runSqlReadOnly(
        `SELECT
            column_name AS columnName
            column_number AS columnNumber
        FROM column_names
        WHERE enable = 1;`,
        {},
    );
    cacheData1 = {};
    for (const { columnName, columnNumber } of matrix) {
        const columnId = "c" + String(columnNumber);
        cacheData1[columnId] = columnName;
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType ){
    //
    // カラム名がデータベース全体で重複しないように、先頭にテーブルIDとアンダーバーをつける
    //   例： 氏名 => t1_氏名
    let columnName2;
    if( columnName.startsWith( tableId + "_" ) ){
        columnName2 = columnName;   // 既に加えられている場合
    }
    else{
        columnName2 = tableId + "_" + columnName;
    }
    //
    // カラム名が "データベース全体で" 重複していないかチェックする
    const columns = await runSqlReadOnly(
        `SELECT *
        FROM column_names
        WHERE enable = 1
          AND column_name = :columnName;`,
      {
          ":columnName": columnName2,
      },
    );
    if (columns.length>=1) {
      throw `カラム名「${columnName2}」は重複しています。`;
    }
    //
    // カラムの存在を登録する
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `INSERT INTO column_names (column_name, table_id, created_at)
            VALUES ( :columnName, :tableId, :createdAt );`,
        {
            ":columnName": columnName2, // 表示される名前（変更不可）
            ":tableId": tableId,        // 所属しているテーブル
            ":createdAt": timestamp,    // 作成日時
        },
    );
    //
    // カラムIDを決定する
    const columns = await runSqlReadOnly(
        `SELECT column_number AS columnNumber
        FROM column_names
            WHERE column_name = :columnName
                AND table_id = :tableId
                AND created_at = :createdAt
            ORDER BY table_number DESC
            LIMIT 1;`,
        {
            ":columnName": columnName2, // 表示される名前（変更不可）
            ":tableId": tableId,        // 所属しているテーブル
            ":createdAt": timestamp,    // 作成日時
        },
    );
    if(columns.length===0){
        throw "登録したはずのカラムが見つかりません。";
    }
    const columnNumber = columns[0]["columnNumber"];
    if(isNaN(columnNumber)){
        throw "新しく発行されたカラムIDが見つかりません。";
    }
    const columnId = "c" + String(columnNumber);
    //
    // カラムを実際に作成する
    await createColumn( tableId, columnId, dataType );   // 下層の関数を呼び出す
    //
    await _reload();    // メモリに再読み込み
    return {
        columnId: columnId,
        message: `カラム「${columnName2}」を作成しました。`,
    };
}

// カラムを無効化
export async function disableColumn_core( columnId ){
    let columnNumber = columnId.replace("c","");
    if(isNaN(columnNumber)){
        throw "指定されたカラムIDは無効です。";
    }
    columnNumber = Number(columnNumber);
    await runSqlWriteOnly(
        `UPDATE column_names
            SET enable = 0
            WHERE column_number = :columnNumber;`,
        {
            ":columnNumber": columnNumber,
        },
    );
    await _reload();    // メモリに再読み込み
    return "カラムを無効化しました";
}

// カラムを再度有効化
export async function enableColumn_core( columnId ){
    let columnNumber = columnId.replace("c","");
    if(isNaN(columnNumber)){
        throw "指定されたカラムIDは無効です。";
    }
    columnNumber = Number(columnNumber);
    //
    // columnNumberと同じ名前のカラムが既に存在していないかチェックする
    const columns = await runSqlReadOnly(
        `SELECT
            column_name AS columnName
        FROM column_names AS t1
        INNER JOIN column_names AS t2
            ON t1.column_name = t2.column_name
            AND t1.column_number <> t2.column_number
        WHERE t1.column_number = :columnNumber
            AND t2.enable = 1
        LIMIT 1;`,
        {
            ":columnNumber": columnNumber,
        },
    );
    if(columns.length>=1){
        const columnName = columns[0]["columnName"];
        throw `カラム名「${columnName}」は重複しています。`;
    }
    //
    // カラムを再度有効化する
    await runSqlWriteOnly(
        `UPDATE column_names
            SET enable = 1
            WHERE column_number = :columnNumber;`,
        {
            ":columnNumber": columnNumber,
        },
    );
    await _reload();    // メモリに再読み込み
    return "カラムを有効化しました";
}

// カラム名を変更
export async function updateColumnName_core( columns ){
    //==========================================================
    // テーブルIDを調べる
    if(columns.length===0){
        throw "配列「columns」が空です。";
    }
    const tableId = await getTableId( columns[0].id );
    //
    //==========================================================
    // カラム名の先頭にテーブルIDを付け加える（「t2」など）
    const columns2  = {};
    for (const { id, name } of columns) {
        if( name.startsWith( tableId + "_" ) ){
            columns2[id] = name;   // 既に加えられている場合
        }
        else{
            columns2[id] = tableId + "_" + name;
        }
    }
    //
    //==========================================================
    // カラム名が重複していないか確認する
    await _reload();
    const obj = {
        ...structuredClone(cacheData1),    // ディープコピー
        ...columns2,
    };
    // この時点で、連想配列「obj」には、全てのカラム一覧が格納されている。
    // データの例
    // obj = {
    //      "c2": "t1_変更後のカラム名１",
    //      "c8": "t1_カラム名２"
    // };
    for (const id in columns2 ) {
        const name = columns2[id];
        const newObj = structuredClone(obj);    // ディープコピー
        //
        // 自分自身を除いた、他のカラムと名前が被っていないか確認する
        delete newObj[id];    //自分自身を除く
        const columnNameArray = Object.values(newObj);
        if (columnNameArray.includes(name)) {
            throw `カラム名「${name}」は重複しています。`;
        }
    }
    //
    //==========================================================
    // カラム名を変更する
    for (const id in columns2 ) {
        let columnNumber = id.replace("c","");
        if(isNaN(columnNumber)){
            throw "指定されたカラムIDは無効です。";
        }
        columnNumber = Number(columnNumber);
        await runSqlWriteOnly(
            `UPDATE column_names
                SET column_name = :columnName
                WHERE column_number = :columnNumber;`,
            {
                ":columnName": columns2[id],
                ":columnNumber": columnNumber,
            },
        );
    }
    //==========================================================
    await _reload();    // メモリに再読み込み
    return "カラム名を変更しました";
}

// カラムの一覧を取得(重)
export async function listColumns_core( tableId, pageNumber, onePageMaxSize, isTrash ){
    if (pageNumber <= 0) {
        pageNumber = 1;
    }
    const [{ "COUNT(*)": total }] = await runSqlReadOnly(
        `SELECT COUNT(*)
            FROM column_names
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
    const columns = await runSqlReadOnly(
        `SELECT
            ( "c" || column_number ) AS id,
            column_name AS name
        FROM column_names
        WHERE table_id = :tableId
            AND enable = :isEnable
        ORDER BY created_at DESC
        LIMIT :limit OFFSET :offset;`,
        {
            ":tableId": tableId,
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": offset,
        },
    );
    const dataTypes = await listDataTypes( tableId );  // 下層の関数を実行する
    for (const { id, name } of columns) {
        columns.dataType = dataTypes[id];
    }
    return {
        "columns": columns,
        "total": total,
    }
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
    //入力パラメータに含まれるカラム名をIDに置き換える
    for( const columnId in cacheData1 ){
        const columnName = cacheData1[columnId];
        sql = sql.replaceAll( columnName, columnId );
    }
    return await runSqlReadOnly( sql, params );  // 下層の関数を実行する
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
    //入力パラメータに含まれるカラム名をIDに置き換える
    for( const columnId in cacheData1 ){
        const columnName = cacheData1[columnId];
        sql = sql.replaceAll( columnName, columnId );
    }
    return await runSqlReadOnly( sql, params );  // 下層の関数を実行する
}

// カラムIDからテーブルIDを調べる
export async function getTableId_core( columnId ){
    let columnNumber = columnId.replace("c","");
    if(isNaN(columnNumber)){
        throw "指定されたカラムIDは無効です。";
    }
    columnNumber = Number(columnNumber);
    const columns = await runSqlReadOnly(
        `SELECT table_id AS tableId
        FROM column_names
        WHERE column_number = :columnNumber
        LIMIT 1;`,
        {
            ":columnNumber": columnNumber,
        },
    );
    if(columns.length===0){
        throw "指定されたカラムIDは存在しません。";
    }
    return columns[0]["tableId"];
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
    await runSqlWriteOnly(
        `DELETE FROM column_names
            WHERE table_id = :tableId;`,
        {
            ":tableId": tableId,
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTable( tableId );  // 下層の関数を実行する
}

// カラムが有効なのか判定
export async function checkColumnEnabled_core( columnId ){
    return cacheData1[columnId] ? true : false;
}
