
//###############################################################
// カラム名の置き換え
//###############################################################

import action from "./7300_user_sql.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "7200";

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
        case "CREATE_COLUMN":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createColumn(parameters);
        case "CREATE_RECORDS_FROM_CSV":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _createRecordsFromCsv(parameters);
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
        case "UPDATE_COLUMN_NAME":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _updateColumnName(parameters);
        case "DISABLE_COLUMN":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _disableColumn(parameters);
        case "ENABLE_COLUMN":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _enableColumn(parameters);
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
        // テーブルを作成する（カラム名を保存するため）
        await action("RUN_SQL_WRITE_ONLY", {
            sql: `CREATE TABLE IF NOT EXISTS column_names (
                "column_id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "column_name" TEXT UNIQUE NOT NULL,
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

//【グローバル変数】カラム名を保存するキャッシュ
let cacheData1 = {
    // データの例
    // "2": "カラム名１",
    // "8": "カラム名２"
};
let cacheData2 = {
    // データの例
    // "カラム名１": 2,
    // "カラム名２": 8
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    let matrix = [];
    try {
        matrix = await action("RUN_SQL_READ_ONLY", {
            sql: `SELECT * FROM column_names WHERE enable = 1;`,
            params: {},
        });
    }
    catch (err) {
        throw `[${LAYER_CODE}層] カラム「column_names」の読み込みに失敗しました。${String(err)}`;
    }
    cacheData1 = {};
    cacheData2 = {};
    for (const record of matrix) {
        const columnName = record["column_name"];
        const columnId = record["column_id"];
        cacheData1[String(columnId)] = columnName;
        cacheData2[String(columnName)] = Number(columnId);
    }
}

//【サブ関数】カラム番号を取得
async function _getColumnId(columnName) {
    if (!columnName) {
        throw `[${LAYER_CODE}層] カラム名が空欄です。columnName=${columnName}`;
    }
    let columnId = cacheData2[String(columnName)];
    if (columnId) {
        return Number(columnId);
    }
    // メモリに再読み込み
    await _reload();
    columnId = cacheData2[String(columnName)];
    if (columnId) {
        return columnId;
    }
    throw `[${LAYER_CODE}層] 未定義のカラム名です。columnName=${columnName}`;
}

//【サブ関数】カラム名を取得
async function _getColumnName(columnId) {
    if (!columnId) {
        throw `[${LAYER_CODE}層] カラム番号が空欄です。columnId=${columnId}`;
    }
    let columnName = cacheData1[String(columnId)];
    if (columnName) {
        return String(columnName);
    }
    // メモリに再読み込み
    await _reload();
    columnName = cacheData1[String(columnId)];
    if (columnName) {
        return String(columnName);
    }
    throw `[${LAYER_CODE}層] 未定義のカラム番号です。columnId=${columnId}`;
}

//【サブ関数】インメモリキャッシュを削除
async function _clearCache(parameters) {
    // メモリに再読み込み
    await _reload();
    return await action("CLEAR_CACHE", parameters);   // 下層の関数を呼び出す
}

//【サブ関数】カラムを作成
async function _createColumn(parameters) {
    if (!parameters?.columnName) {
        throw `[${LAYER_CODE}層] パラメーター「columnName」が空欄です`;
    }
    if (typeof parameters.columnName !== "string") {
        throw `[${LAYER_CODE}層] パラメーター「columnName」が文字列ではありません`;
    }
    const columnName = parameters.columnName;
    if (cacheData2[columnName]) {
        throw `カラム名「${columnName}」は重複しています。`;
    }
    await action("RUN_SQL_WRITE_ONLY", {
        sql: `
           INSERT INTO column_names (column_name, created_at) VALUES ( :columnName, :createdAt );
        `,
        params: {
            ":columnName": parameters.columnName,
            ":createdAt": new Date().getTime(),
        },
    });
    await _reload();
    // 下層の関数を呼び出す
    return await action("CREATE_COLUMN", parameters);
}

//【サブ関数】カラムの一覧を取得
async function _listColumns(parameters) {
    
    return await action("LIST_COLUMNS", parameters);










    if (!parameters?.onePageMaxSize) {
        throw `[${LAYER_CODE}層] パラメーター「onePageMaxSize」がNULLです`;
    }
    if (isNaN(parameters.onePageMaxSize)) {
        throw `[${LAYER_CODE}層] パラメーター「onePageMaxSize」を数値に変換できません`;
    }
    const onePageMaxSize = Number(parameters.onePageMaxSize);
    let pageNumber = Number(parameters.page_columns);
    if (!(pageNumber >= 1)) {
        pageNumber = 1;
    }
    const [{ "COUNT(*)": count }] = await action("RUN_SQL_READ_ONLY", {
        sql: `
            SELECT COUNT(*)
                FROM column_names
                WHERE enable = :isEnable;
        `,
        params: {
            // 現存するカラム一覧を取得する場合は１
            // 削除済みのカラム一覧を取得する場合は０
            ":isEnable": (parameters.isTrash) ? 0 : 1,
        },
    });
    const matrix = await action("RUN_SQL_READ_ONLY", {
        sql: `
            SELECT
                column_id AS id,
                column_name AS name
            FROM column_names
                WHERE enable = :isEnable
                ORDER BY created_at DESC
                LIMIT :limit OFFSET :offset;
        `,
        params: {
            // 現存するカラム一覧を取得する場合は１
            // 削除済みのカラム一覧を取得する場合は０
            ":isEnable": (parameters.isTrash) ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": onePageMaxSize * (pageNumber - 1),
        },
    });
    return {
        "columns": matrix,
        "columns_total": count,
    }
}

//【サブ関数】カラム名を変更
async function _updateColumnName(parameters) {
    if (!parameters?.columns) {
        throw `[${LAYER_CODE}層] パラメーター「columns」が空欄です`;
    }
    if (!Array.isArray(parameters.columns)) {
        throw `[${LAYER_CODE}層] パラメーター「columns」が配列ではありません`;
    }
    if (parameters.columns.length === 0) {
        throw `[${LAYER_CODE}層] カラムの名前を変更しようとしましたが、配列「columns」のサイズがゼロです。`;
    }
    //==========================================================
    // カラム名が重複していないか確認する
    await _reload();
    const obj = structuredClone(cacheData1);    // ディープコピー
    // データの例
    // obj = {
    //     "2": "カラム名１",
    //     "8": "カラム名２"
    // };
    for (const columnInfo of parameters.columns) {
        if (typeof columnInfo !== "object") {
            throw `[${LAYER_CODE}層] 配列「columns」の要素がオブジェクトではありません`;
        }
        if (!columnInfo.id) {
            throw `[${LAYER_CODE}層] パラメーター columns[?].id が空欄です。`;
        }
        if (!columnInfo.name) {
            throw `カラム名が空欄です。`;
        }
        obj[columnInfo.id] = columnInfo.name;
    }
    // この時点で、連想配列「obj」には、全てのカラム一覧が格納されている。
    // データの例
    // obj = {
    //     "2": "カラム名１",（変更後のカラム名）
    //     "8": "カラム名２"
    // };
    for (const columnInfo of parameters.columns) {
        const newObj = structuredClone(obj);    // ディープコピー
        //
        // 自分自身を除いた、他のカラムと名前が被っていないか確認する
        delete newObj[columnInfo.id];    //自分自身を除く
        const columnNameArray = Object.values(newObj);
        if (columnNameArray.includes(columnInfo.name)) {
            throw `カラム名「${columnInfo.name}」は重複しています。`;
        }
    }
    // カラム名が重複していないか確認する ここまで
    //==========================================================
    //
    for (const columnInfo of parameters.columns) {
        await action("RUN_SQL_WRITE_ONLY", {
            sql: `
                UPDATE column_names
                    SET column_name = :columnName
                    WHERE column_id = :columnId;
            `,
            params: {
                ":columnId": columnInfo.id,
                ":columnName": columnInfo.name
            },
        });
    }
    await _reload();
    return {
        userMessage: `カラム名を更新しました。`,
        nextUrl: "../",
    };
}

//【サブ関数】カラムを無効化
async function _disableColumn(parameters) {
    return null;
}

//【サブ関数】カラムを再度有効化
async function _enableColumn(parameters) {
    return null;
}

//【サブ関数】レコード追加
async function _createRecord(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコード上書き
async function _updateRecord(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】フィールドの検証
async function _checkField(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコードの検証
async function _checkRecord(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】レコードを削除
async function _deleteRecord(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】予測変換
async function _autoCorrect(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】文字列検索
async function _searchText(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】検索用の辞書を再生成
async function _rebuildDictionary(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】テーブルを丸ごとバックアップ
async function _backupTable(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
    };
    // 下層の関数を呼び出す
    return await action("", newParameters);
}

//【サブ関数】既に存在するテーブルにCSVファイルを読み込む関数
//       ※テーブルとカラムは既に用意してあるものとする。
async function _createRecordsFromCsv(parameters) {
    //入力パラメータに含まれるカラム名を番号に置き換える
    const newParameters = {
        ...parameters,
        columnId: await _getColumnId(parameters.columnName),
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