
//###############################################################
// IPアドレスを取得
//###############################################################

import { networkInterfaces } from "os";
import action from "./9999_error.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "8100";

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
        case "GET_LOCAL_IP":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getLocalIp(parameters);
        case "START_UP":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _startUp(parameters);
        case "GET_LOCAL_URL":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getLocalUrl(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        default:
            // 下層のメイン関数を呼び出す
            // （下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
    }
}

//【サブ関数】ローカルIPアドレスを取得
async function _getLocalIp(parameters) {
    const nets = networkInterfaces();
    for (const key in nets) {
        for (const net of nets[key] ?? []) {
            if (net['family'] == "IPv4") {
                return net.address;
            }
        }
    }
    throw `[${LAYER_CODE}層] ローカルIPアドレスを取得できませんでした`;
}

//【グローバル変数】ローカルサーバーのURL
let localUrl = "";

//【サブ関数】プログラム起動
async function _startUp(parameters) {
    if (bugMode === 1) return;  // 意図的にバグを混入させる（ミューテーション解析）
    //
    if (localUrl) {
        // 既に設定済
        if (parameters?.localUrl) {
            throw `[${LAYER_CODE}層] ローカルサーバーのURLを再設定することはできません`;
        }
    }
    else {
        // まだ未設定
        if (!parameters?.localUrl) {
            throw `[${LAYER_CODE}層] パラメーター「localUrl」がNULLです`;
        }
        if (typeof parameters.localUrl !== "string" && !(parameters.localUrl instanceof String)) {
            throw `[${LAYER_CODE}層] パラメーター「localUrl」が文字列ではありません`;
        }
        localUrl = parameters.localUrl;
    }
    return null;
}

//【サブ関数】ローカルサーバーのURLを取得
async function _getLocalUrl(parameters) {
    if (!localUrl) {
        throw `[${LAYER_CODE}層] ローカルサーバーのURLが不明です。先に${LAYER_CODE}層のコマンド「START_UP」を実行してください。`;
    }
    return localUrl;
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