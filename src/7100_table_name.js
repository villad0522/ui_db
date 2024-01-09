
//###############################################################
// テーブル名の置き換え
//###############################################################

import action from "./7200_column_name.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "7100";

//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる

// このJavaScriptファイルでのメイン関数
export default async function (command, parameters) {
    if (!command) {
        throw `[${LAYER_CODE}層] 引数「command」がNULLです`;
    }
    if (typeof command !== "string" && !(command instanceof String)) {
        throw `[${LAYER_CODE}層] 引数「command」が文字列ではありません`;
    }
    bugMode = 0;  // バグを混入させない（通常動作）
    //
    // コマンドごとに場合分け
    switch (command) {
        case "START_UP":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _startUp(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        case "CLEAR_CACHE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _clearCache(parameters);
        case "LIST_TABLES":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _listTables(parameters);
        case "CREATE_COLUMN":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createColumn(parameters);
        case "LIST_COLUMNS":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _listColumns(parameters);
        case "CREATE_RECORD":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createRecord(parameters);
        case "UPDATE_RECORD":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _updateRecord(parameters);
        case "CHECK_FIELD":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _checkField(parameters);
        case "CHECK_RECORD":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _checkRecord(parameters);
        case "DELETE_RECORD":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _deleteRecord(parameters);
        case "AUTO_CORRECT":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _autoCorrect(parameters);
        case "SEARCH_TEXT":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _searchText(parameters);
        case "REBUILD_DICTIONARY":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _rebuildDictionary(parameters);
        case "BACKUP_TABLE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _backupTable(parameters);
        case "CREATE_TABLE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createTable(parameters);
        case "CREATE_RECORDS_FROM_CSV":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createRecordsFromCsv(parameters);
        case "RUN_SQL_READ_ONLY":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _runSqlReadOnly(parameters);
        case "RUN_SQL_WRITE_ONLY":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _runSqlWriteOnly(parameters);
        case "CREATE_USER_SQL":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createUserSql(parameters);
        case "UPDATE_USER_SQL":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _updateUserSql(parameters);
        case "GET_USER_SQL":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getUserSql(parameters);
        case "GET_USER_SQL":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getUserSql(parameters);
        case "LIST_USER_SQL":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _listUserSql(parameters);
        case "UPDATE_TABLE_NAME":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _updateTableName(parameters);
        case "DISABLE_TABLE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _disableTable(parameters);
        case "ENABLE_TABLE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _enableTable(parameters);
        default:
            // 下層のメイン関数を呼び出す
            // （下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
    }
}

//【サブ関数】プログラム起動
async function _startUp(parameters) {
    await action("START_UP", parameters);   // 下層の関数を呼び出す
    //
    if (bugMode === 1) return;  // 意図的にバグを混入させる（ミューテーション解析）
    try {
        // テーブルを作成する（データ型を保存するため）
        await action("RUN_SQL_WRITE_ONLY", {
            sql: `CREATE TABLE IF NOT EXISTS table_names (
                "table_id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "table_name" TEXT UNIQUE NOT NULL,
                "enable" INTEGER NOT NULL DEFAULT 1,
                "created_at" INTEGER NOT NULL,
                "deleted_at" INTEGER
            );`,
            params: {},
        });
    }
    catch (err) {
        throw `[${LAYER_CODE}層] システム管理用テーブルの作成に失敗しました。${String(err)}`;
    }
    //
    // メモリに再読み込み
    await _reload();
}

//【グローバル変数】テーブル名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "2": "テーブル名１",
    // "8": "テーブル名２"
};
let cacheData2 = {
    // データの例
    // "テーブル名１": 2,
    // "テーブル名２": 8
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    let matrix = [];
    try {
        matrix = await action("RUN_SQL_READ_ONLY", {
            sql: `SELECT * FROM table_names WHERE enable = 1;`,
            params: {},
        });
    }
    catch (err) {
        throw `[${LAYER_CODE}層] テーブル「table_names」の読み込みに失敗しました。${String(err)}`;
    }
    cacheData1 = {};
    cacheData2 = {};
    for (const record of matrix) {
        const tableName = record["table_name"];
        const tableId = record["table_id"];
        cacheData1[String(tableId)] = tableName;
        cacheData2[String(tableName)] = Number(tableId);
    }
}

//【サブ関数】テーブル番号を取得
async function _getTableId(tableName) {
    if (!tableName) {
        throw `[${LAYER_CODE}層] テーブル名が空欄です。tableName=${tableName}`;
    }
    let tableId = cacheData2[String(tableName)];
    if (tableId) {
        return Number(tableId);
    }
    // メモリに再読み込み
    await _reload();
    tableId = cacheData2[String(tableName)];
    if (tableId) {
        return tableId;
    }
    throw `[${LAYER_CODE}層] 未定義のテーブル名です。tableName=${tableName}`;
}

//【サブ関数】テーブル名を取得
async function _getTableName(tableId) {
    if (!tableId) {
        throw `[${LAYER_CODE}層] テーブル番号が空欄です。tableId=${tableId}`;
    }
    let tableName = cacheData1[String(tableId)];
    if (tableName) {
        return String(tableName);
    }
    // メモリに再読み込み
    await _reload();
    tableName = cacheData1[String(tableId)];
    if (tableName) {
        return String(tableName);
    }
    throw `[${LAYER_CODE}層] 未定義のテーブル番号です。tableId=${tableId}`;
}

//【サブ関数】インメモリキャッシュを削除
async function _clearCache(parameters) {
    // メモリに再読み込み
    await _reload();
    return await action("CLEAR_CACHE", parameters);   // 下層の関数を呼び出す
}

//【サブ関数】テーブルを作成
async function _createTable(parameters) {
    if (!parameters?.tableName) {
        throw `[${LAYER_CODE}層] パラメーター「tableName」が空欄です`;
    }
    if (typeof parameters.tableName !== "string") {
        throw `[${LAYER_CODE}層] パラメーター「tableName」が文字列ではありません`;
    }
    const tableName = parameters.tableName;
    if (cacheData2[tableName]) {
        throw `テーブル名「${tableName}」は重複しています。`;
    }
    await action("RUN_SQL_WRITE_ONLY", {
        sql: `
           INSERT INTO table_names (table_name, created_at) VALUES ( :tableName, :createdAt );
        `,
        params: {
            ":tableName": parameters.tableName,
            ":createdAt": new Date().getTime(),
        },
    });
    await _reload();
    return {
        userMessage: `テーブル「${parameters.tableName}」を作成しました。`,
        nextUrl: "../",
    };
}

//【サブ関数】テーブルの一覧を取得
async function _listTables(parameters) {
    if (!parameters?.onePageMaxSize) {
        throw `[${LAYER_CODE}層] パラメーター「onePageMaxSize」がNULLです`;
    }
    if (isNaN(parameters.onePageMaxSize)) {
        throw `[${LAYER_CODE}層] パラメーター「onePageMaxSize」を数値に変換できません`;
    }
    const onePageMaxSize = Number(parameters.onePageMaxSize);
    let pageNumber = Number(parameters.page_tables);
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
            ":isEnable": (parameters.isTrash) ? 0 : 1,
        },
    });
    const matrix = await action("RUN_SQL_READ_ONLY", {
        sql: `
            SELECT
                table_id AS id,
                table_name AS name
            FROM table_names
                WHERE enable = :isEnable
                ORDER BY created_at DESC
                LIMIT :limit OFFSET :offset;
        `,
        params: {
            // 現存するテーブル一覧を取得する場合は１
            // 削除済みのテーブル一覧を取得する場合は０
            ":isEnable": (parameters.isTrash) ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": onePageMaxSize * (pageNumber - 1),
        },
    });
    return {
        "tables": matrix,
        "tables_total": count,
    }
}

//【サブ関数】テーブル名を変更
async function _updateTableName(parameters) {
    if (!parameters?.tables) {
        throw `[${LAYER_CODE}層] パラメーター「tables」が空欄です`;
    }
    if (!Array.isArray(parameters.tables)) {
        throw `[${LAYER_CODE}層] パラメーター「tables」が配列ではありません`;
    }
    if (parameters.tables.length === 0) {
        throw `[${LAYER_CODE}層] テーブルの名前を変更しようとしましたが、配列「tables」のサイズがゼロです。`;
    }
    //==========================================================
    // テーブル名が重複していないか確認する
    await _reload();
    const obj = structuredClone(cacheData1);    // ディープコピー
    // データの例
    // obj = {
    //     "2": "テーブル名１",
    //     "8": "テーブル名２"
    // };
    for (const tableInfo of parameters.tables) {
        if (typeof tableInfo !== "object") {
            throw `[${LAYER_CODE}層] 配列「tables」の要素がオブジェクトではありません`;
        }
        if (!tableInfo.id) {
            throw `[${LAYER_CODE}層] パラメーター tables[?].id が空欄です。`;
        }
        if (!tableInfo.name) {
            throw `テーブル名が空欄です。`;
        }
        obj[tableInfo.id] = tableInfo.name;
    }
    // この時点で、連想配列「obj」には、全てのテーブル一覧が格納されている。
    // データの例
    // obj = {
    //     "2": "テーブル名１",（変更後のテーブル名）
    //     "8": "テーブル名２"
    // };
    for (const tableInfo of parameters.tables) {
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
    for (const tableInfo of parameters.tables) {
        await action("RUN_SQL_WRITE_ONLY", {
            sql: `
                UPDATE table_names
                    SET table_name = :tableName
                    WHERE table_id = :tableId;
            `,
            params: {
                ":tableId": tableInfo.id,
                ":tableName": tableInfo.name
            },
        });
    }
    await _reload();
    return {
        userMessage: `テーブル名を更新しました。`,
        nextUrl: "../",
    };
}

//【サブ関数】テーブルを無効化
async function _disableTable(parameters) {
    return null;
}

//【サブ関数】テーブルを再度有効化
async function _enableTable(parameters) {
    return null;
}

//【サブ関数】カラムを作成
async function _createColumn(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】カラムの一覧を取得
async function _listColumns(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコード追加
async function _createRecord(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコード上書き
async function _updateRecord(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】フィールドの検証
async function _checkField(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコードの検証
async function _checkRecord(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコードを削除
async function _deleteRecord(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】予測変換
async function _autoCorrect(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】文字列検索
async function _searchText(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】検索用の辞書を再生成
async function _rebuildDictionary(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】テーブルを丸ごとバックアップ
async function _backupTable(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】既に存在するテーブルにCSVファイルを読み込む関数
//       ※テーブルとカラムは既に用意してあるものとする。
async function _createRecordsFromCsv(parameters) {
    //入力パラメータに含まれるテーブル名を番号に置き換える
    const newParameters = {
        ...parameters,
        tableId: await _getTableId(parameters.tableName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】SQLクエリ実行（読み取りのみ）
async function _runSqlReadOnly(parameters) {
    return null;
}

//【サブ関数】SQLクエリ実行（書き込みのみ）
async function _runSqlWriteOnly(parameters) {
    return null;
}

//【サブ関数】クエリを事前登録する
async function _createUserSql(parameters) {
    return null;
}

//【サブ関数】クエリを上書きする
async function _updateUserSql(parameters) {
    return null;
}

//【サブ関数】事前登録したクエリを取得
async function _getUserSql(parameters) {
    return null;
}

//###############################################################
// 以下、テスト用のコード

//【サブ関数】フレームワーク自体のテストを実行
async function _testFramework(parameters) {
    if (!parameters?.targetLayer) {
        throw `[${LAYER_CODE}層] パラメーター「targetLayer」がNULLです`;
    }
    if (isNaN(parameters.targetLayer)) {
        throw `[${LAYER_CODE}層] パラメーター「targetLayer」を数値に変換できません`;
    }
    if (Number(parameters.targetLayer) !== Number(LAYER_CODE)) {
        // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
        return await action("TEST_FRAMEWORK", parameters);
    }
    bugMode = 0;    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    //
    let bugMode2;
    for (bugMode = 1; bugMode <= 1; bugMode++) {
        bugMode2 = bugMode;
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた
        }
        // 意図的に埋め込んだバグを検出できなかった
        bugMode = 0;    // 意図的なバグの発生を止める
        return {
            userMessage: `${LAYER_CODE}層からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode:${bugMode2})を検出できませんでした`,
        };
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    bugMode = 0;    // 意図的なバグの発生を止める
    return {
        userMessage: `${LAYER_CODE}層からバグは見つかりませんでした。また、意図的に${bugMode2}件のバグを発生させたところ、全てのバグを検知できました。`,
    };
}

//【サブ関数】テストを実行
async function _test() {
}

// テスト用のコード ここまで
//###############################################################