
//###############################################################
// フロントエンドの管理
//    フォルダ「./src/frontend/user/」の中身を動的に管理する
//###############################################################

import fs from 'fs';
import action from "./5800_user_interface.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "5600";

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
        case "CLOSE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _close(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        case "UNDO":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _undo(parameters);
        case "REDO":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _redo(parameters);
        case "DELETE_PAGE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _deletePage(parameters);
        case "UPDATE_PAGE":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _updatePage(parameters);
        case "LIST_PAGES":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _listPages(parameters);
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
    const customDirPath = await action("GET_PATH", { directoryCode: "FRONTEND_CUSTOM" });
    //
    // フォルダ「./src/frontend/custom」を削除する
    await fs.promises.rm(customDirPath, { recursive: true });
    //
    // フォルダ「./src/frontend/custom」を作成する
    if (!fs.existsSync(customDirPath)) {
        fs.mkdirSync(customDirPath);   // フォルダが存在しなかったら、作成する
    }
    //
    return null;
}

//【サブ関数】前の状態に戻す
async function _undo(parameters) {
    await action("UNDO", parameters);   // 下層の関数を呼び出す
    return null;
}

//【サブ関数】以前の操作をもう一度行う
async function _redo(parameters) {
    await action("REDO", parameters);   // 下層の関数を呼び出す
    return null;
}

//【サブ関数】HTMLを削除
async function _deletePage(parameters) {
    return null;
}

//【サブ関数】HTMLを上書き
async function _updatePage(parameters) {
    return null;
}

//【サブ関数】HTMLの一覧を取得
async function _listPages(parameters) {
    return null;
}

//【サブ関数】バックエンドプログラム終了
async function _close(parameters) {
    const customDirPath = await action("GET_PATH", { directoryCode: "FRONTEND_CUSTOM" });
    //
    // フォルダ「./src/frontend/custom」を削除する
    await fs.promises.rm(customDirPath, { recursive: true, force: true });
    //
    await action("CLOSE", parameters);   // 下層の関数を呼び出す
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