
//###############################################################
// データ型（１度登録すると変更不可）
//###############################################################
// テーブルに保存できるデータ型の一覧
// ・INTEGER (SQLiteでサポート)
// ・REAL (SQLiteでサポート)
// ・TEXT (SQLiteでサポート)
// ・BOOL (自作)
// ・FILE (自作)

import action from "./7900_connect_database.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "7800";

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
    //
    try {
        // テーブルを作成する（データ型を保存するため）
        await action("RUN_SQL_WRITE_ONLY", {
            sql: `CREATE TABLE IF NOT EXISTS data_types (
                "column_id" INTEGER PRIMARY KEY NOT NULL,
                "table_id" INTEGER NOT NULL,
                "data_type" TEXT NOT NULL
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

//【グローバル変数】データ型を保存するキャッシュ
const cacheData = {
    // データの例
    // "2": {
    //     "5": "TEXT",
    //     "22": "INTEGER",
    //     "13": "BOOL"
    // },
    // "8": {
    //     "25": "INTEGER",
    //     "3": "TEXT",
    //     "9": "FILE"
    // }
};

//【サブ関数】メモリに再読み込み
async function _reload() {
    let matrix = [];
    try {
        // 
        matrix = await action("RUN_SQL_READ_ONLY", {
            sql: `SELECT * FROM data_types`,
            params: {},
        });
    }
    catch (err) {
        throw `[${LAYER_CODE}層] テーブル「data_types」の読み込みに失敗しました。${String(err)}`;
    }
}

//【サブ関数】インメモリキャッシュを削除
async function _clearCache(parameters) {
    // これより下層で「CLEAR_CACHE」は定義されていないので、
    // 下層の関数は呼び出さない
    // await action("CLEAR_CACHE", parameters);
    //
    // メモリに再読み込み
    await _reload();
    return {
        userMessage: `${LAYER_CODE}層までのキャッシュデータを削除しました。`,
    };
}

//【サブ関数】カラムを作成
async function _createColumn(parameters) {
    await action("RUN_SQL_WRITE_ONLY", {
        sql: `
           INSERT INTO data_types (table_id, data_type) VALUES ( :tableId, :dataType );
        `,
        params: {
            ":tableId": parameters.tableId,
            ":dataType": parameters.dataType,
        },
    });
    return {
        userMessage: `カラムを作成しました。`,
        nextUrl: "../",
    };
}

//【サブ関数】カラムの一覧を取得
async function _listColumns(parameters) {
    if (!parameters["table_id"]) {
        throw `[${LAYER_CODE}層] パラメーター「table_id」がNULLです`;
    }
    if (isNaN(parameters["table_id"])) {
        throw `[${LAYER_CODE}層] パラメーター「table_id」を数値に変換できません`;
    }
    const tableId = Number(parameters["table_id"]);
    const matrix = await action("RUN_SQL_READ_ONLY", {
        sql: `
            SELECT
                column_id AS id,
                data_type AS dataType
            FROM data_types
                WHERE table_id = :tableId;
        `,
        params: {
            ":tableId": tableId,
        },
    });
    return {
        "columns": matrix,
    }
}

//【サブ関数】レコード追加
async function _createRecord(parameters) {
    return null;
}

//【サブ関数】レコード上書き
async function _updateRecord(parameters) {
    return null;
}

//【サブ関数】フィールドの検証
async function _checkField(parameters) {
    return null;
}

//【サブ関数】レコードの検証
async function _checkRecord(parameters) {
    return null;
}

//【サブ関数】レコードを削除
async function _deleteRecord(parameters) {
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