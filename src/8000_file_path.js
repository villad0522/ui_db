
//###############################################################
// サーバー内のローカルファイルのパスを提供する
//###############################################################

import path from 'path';
import fs from 'fs';
import getDirName from './8001_dirname.js';
import action from "./8100_ip_address.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "8000";

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
        case "GET_PATH":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getPath(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        default:
            // 下層のメイン関数を呼び出す
            // （下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
    }
}

// 【前提条件】
//  ・開発環境の場合は、コマンドライン引数の１番目に「--dev」を指定する。package.jsonのstartコマンドを参照してください。
//  ・本番環境の場合は、コマンドライン引数に何も指定しない。
//  ・開発環境のカレントディレクトリは、C://..../ui_db/
//  ・本番環境のカレントディレクトリは、C://..../ui_db/build/

//【サブ関数】プログラム起動
async function _startUp(parameters) {
    await action("START_UP", parameters);   // 下層の関数を呼び出す
    //
    const frontendPath = await _getPath({ directoryCode: "FRONTEND" });
    if (!fs.existsSync(frontendPath)) {
        fs.mkdirSync(frontendPath);   // フォルダが存在しなかったら、作成する
    }
    //
    const frontendCustomPath = await _getPath({ directoryCode: "FRONTEND_CUSTOM" });
    if (!fs.existsSync(frontendCustomPath)) {
        fs.mkdirSync(frontendCustomPath);   // フォルダが存在しなかったら、作成する
    }
    //
    const frontendDefaultPath = await _getPath({ directoryCode: "FRONTEND_DEFAULT" });
    if (!fs.existsSync(frontendDefaultPath)) {
        fs.mkdirSync(frontendDefaultPath);   // フォルダが存在しなかったら、作成する
    }
    //
    const staticPath = await _getPath({ directoryCode: "STATIC_DATA" });
    if (!fs.existsSync(staticPath)) {
        throw `[${LAYER_CODE}層] staticフォルダが存在しません`;
    }
    //
    const cachePath = await _getPath({ directoryCode: "CACHE" });
    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath);   // フォルダが存在しなかったら、作成する
    }
    //
    const saveDataPath = await _getPath({ directoryCode: "SAVEDATA" });
    if (!fs.existsSync(saveDataPath)) {
        fs.mkdirSync(saveDataPath);   // フォルダが存在しなかったら、作成する
    }
    //
    const documentPath = "C:\\Users\\Public\\Documents";
    if (!fs.existsSync(documentPath)) {
        throw `[${LAYER_CODE}層] エクセルファイルの保存先フォルダが存在しません ${documentPath}`;
    }
    //
    const sharePath = await _getPath({ directoryCode: "SHARE" });
    if (!fs.existsSync(sharePath)) {
        fs.mkdirSync(sharePath);   // フォルダが存在しなかったら、作成する
    }
}

//【サブ関数】パスを取得
async function _getPath(parameters) {
    if (bugMode === 1) return;  // 意図的にバグを混入させる（ミューテーション解析）
    if (bugMode === 2) {
        parameters.directoryCode = null; // 意図的にバグを混入させる（ミューテーション解析）
    }
    if (!parameters?.directoryCode) {
        throw `[${LAYER_CODE}層] パラメーター「directoryCode」がNULLです`;
    }
    // コマンドごとに場合分け
    switch (parameters.directoryCode) {
        case "FRONTEND":
            if (bugMode === 3) return;  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                return path.join(getDirName(), "frontend"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "frontend"); // 本番環境の場合
            }
        case "FRONTEND_CUSTOM":
            if (bugMode === 3) return;  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                return path.join(getDirName(), "frontend/custom"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "frontend/custom"); // 本番環境の場合
            }
        case "FRONTEND_DEFAULT":
            if (bugMode === 4) return;  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                return path.join(getDirName(), "frontend/default"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "frontend/default"); // 本番環境の場合
            }
        case "STATIC_DATA":
            if (bugMode === 5) return;  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                return path.join(getDirName(), "static_data"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "static_data"); // 本番環境の場合
            }
        case "CACHE":
            if (bugMode === 6) return;  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                return path.join(getDirName(), "cache"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "cache"); // 本番環境の場合
            }
        case "SAVEDATA":
            if (bugMode === 7) return;  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                return path.join(getDirName(), "savedata"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "savedata"); // 本番環境の場合
            }
        case "SHARE":
            if (bugMode === 8) return;  // 意図的にバグを混入させる（ミューテーション解析）
            return "C:\\Users\\Public\\Documents\\ui_db";
        default:
            throw `[${LAYER_CODE}層] パラメーター「directoryCode」にサポートされていない値が指定されています。directoryCode=${parameters.directoryCode}`;
    }
}

//【サブ関数】開発環境か本番環境かを判別する関数
function _isDevelop() {
    // もしコマンドライン引数が存在したら
    if (process.argv.length > 2) {
        if (bugMode === 9) return false;  // 意図的にバグを混入させる（ミューテーション解析）
        return true;    // 開発環境
    }
    else {
        if (bugMode === 10) return true;  // 意図的にバグを混入させる（ミューテーション解析）
        return false;   // 本番環境
    }
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
    for (bugMode = 1; bugMode <= 10; bugMode++) {
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
    if (_isDevelop()) {
        // 開発環境の場合、現在地は「C:\Users\...\ui_db\src」のはず。
        const expectedPath = "ui_db\src";
        if (String(getDirName()).endsWith(expectedPath)) {
            throw `[${LAYER_CODE}層] パスが想定とは異なります。想定されるパス：${expectedPath}  現在のパス：${getDirName()}`;
        }
    }
    else {
        console.log("本番環境");
        // 本番環境の場合、現在地は「C:\snapshot\ui_db\prebuild」のはず。
        const expectedPath = "ui_db\prebuild";
        if (String(getDirName()).endsWith(expectedPath)) {
            throw `[${LAYER_CODE}層] パスが想定とは異なります。想定されるパス：${expectedPath}  現在のパス：${getDirName()}`;
        }
    }
}

// テスト用のコード ここまで
//###############################################################