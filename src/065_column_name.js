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
  getTableName,
} from "./067_table_name_validate.js";
import {
  getLocalIp,
} from "./082_ip_address_validate.js";
import {
  getPath,
} from "./079_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./076_connect_database_validate.js";
import {
  getPrimaryKey,
} from "./073_primary_key_validate.js";
import {
  createColumn,
  listDataTypes,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  getDataType,
  deleteRecord,
} from "./070_data_type_validate.js";


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
    // テーブルを作成する（カラムの存在を保存するため）
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS column_names(
            "column_number" INTEGER PRIMARY KEY AUTOINCREMENT,
            "column_name" TEXT NOT NULL,
            "table_id" TEXT NOT NULL,
            "enable" INTEGER NOT NULL DEFAULT 1,
            "created_at" INTEGER UNIQUE
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
let cacheData2 = {
    //    "t56": [
    //        {
    //            "id": "c34",
    //            "name": "氏名",
    //            "dataType": "TEXT",
    //        }
    //    ]
};
let cacheData3 = {
    // データの例
    // "c2": "t1",
    // "c8": "t1"
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    const matrix = await runSqlReadOnly(
        `SELECT
            column_number AS columnNumber,
            column_name AS columnName,
            table_id AS tableId
        FROM column_names
        WHERE enable = 1
        ORDER BY created_at DESC;`,
        {},
    );
    cacheData1 = {};
    cacheData2 = {};
    cacheData3 = {};
    for (const { columnNumber, columnName, tableId } of matrix) {
        const columnId = "c" + String(columnNumber);
        cacheData1[columnId] = columnName;
        cacheData3[columnId] = tableId;
        if(!cacheData2[tableId]){
            cacheData2[tableId] = [];
        }
        cacheData2[tableId].push({
            "id": columnId,
            "name": columnName,
            "dataType": await getDataType(columnId),
        });
    }
}

// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await _reload();    // メモリに再読み込み
    return await clearCache();   // 下層の関数を呼び出す
}

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // カラム名がデータベース全体で重複しないように、先頭にテーブルIDとアンダーバーをつける
    //   例： 氏名 => t1_氏名
    let columnName2;
    if( columnName.startsWith( tableId + "_" ) ){
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        columnName2 = columnName;   // 既に加えられている場合
    }
    else{
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        columnName2 = tableId + "_" + columnName;
    }
    //
    // カラム名が "データベース全体で" 重複していないかチェックする
    const columns1 = await runSqlReadOnly(
        `SELECT *
        FROM column_names
        WHERE enable = 1
          AND column_name = :columnName;`,
      {
          ":columnName": columnName2,
      },
    );
    if (columns1.length>=1) {
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
    const columns2 = await runSqlReadOnly(
        `SELECT column_number AS columnNumber
        FROM column_names
            WHERE column_name = :columnName
                AND table_id = :tableId
                AND created_at = :createdAt
            LIMIT 1;`,
        {
            ":columnName": columnName2, // 表示される名前（変更不可）
            ":tableId": tableId,        // 所属しているテーブル
            ":createdAt": timestamp,    // 作成日時
        },
    );
    if(columns2.length===0){
        throw "登録したはずのカラムが見つかりません。";
    }
    const columnNumber = columns2[0]["columnNumber"];
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
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    //==========================================================
    // テーブルIDを調べる
    if(columns.length===0){
        throw "配列「columns」が空です。";
    }
    const columnId = columns[0].id;
    const tableId = cacheData3[columnId];
    //
    //==========================================================
    // カラム名の先頭にテーブルIDを付け加える（「t2」など）
    const columns2  = {};
    for (const { id, name } of columns) {
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        if( name.startsWith( tableId + "_" ) ){
            if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
            columns2[id] = name;   // 既に加えられている場合
        }
        else{
            if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
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

// カラムの一覧を取得(GUI)
export async function listColumnsForGUI_core( tableId, pageNumber, onePageMaxSize, isTrash ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    if ( !pageNumber ) {
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    if (pageNumber <= 0) {
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
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
    for ( let i=0; i<columns.length; i++ ) {
        if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnId = columns[i].id;
        columns[i].dataType = await getDataType(columnId);
    }
    return {
        "columns": columns,
        "total": total,
    }
}

// SQLクエリ実行（読み取り専用）
export async function runSqlReadOnly_core( sql, params ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
    //入力パラメータに含まれるカラム名をIDに置き換える
    for( const columnId in cacheData1 ){
        if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnName = cacheData1[columnId];
        const regexp = new RegExp(`(?<!\")${columnName}(?!\")`, "g");
        sql = sql.replaceAll( regexp, columnId );
    }
    return await runSqlReadOnly( sql, params );  // 下層の関数を実行する
}

// SQLクエリ実行（書き込み専用）
export async function runSqlWriteOnly_core( sql, params ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    //入力パラメータに含まれるカラム名をIDに置き換える
    for( const columnId in cacheData1 ){
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnName = cacheData1[columnId];
        const regexp = new RegExp(`(?<!\")${columnName}(?!\")`, "g");
        sql = sql.replaceAll( regexp, columnId );
    }
    return await runSqlReadOnly( sql, params );  // 下層の関数を実行する
}

// カラムIDからテーブルIDを調べる
export async function getTableId_core( columnId ){
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    return cacheData3[columnId];
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
    return cacheData1[columnId] ? true : false;
}

// カラムの一覧を取得（高速）
export async function listColumnsAll_core( tableId ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
    if(!cacheData2[tableId]){
        throw "指定されたテーブルIDは存在しません。";
    }
    return structuredClone( cacheData2[tableId] );
}

// IDからカラム名を取得
export async function getColumnName_core( columnId ){
  if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData1[columnId];
}
