
//###############################################################
// APIの情報を提供（データ型など）
//###############################################################

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import action from "./5600_frontend_app.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "3000";

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
        case "GET_ENDPOINT_INFO":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getEndpointInfo(parameters);
        case "LIST_ENDPOINTS":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _listEndpoints(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        default:
            // 下層のメイン関数を呼び出す
            // （下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
    }
}

//【サブ関数】エンドポイントの情報を取得
async function _getEndpointInfo(parameters) {
    if (!parameters?.endpointPath) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」がNULLです`;
    }
    if (typeof parameters?.endpointPath !== "string" && !(parameters?.endpointPath instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」が文字列ではありません`;
    }
    const endpointPath = parameters.endpointPath;
    const dirPath = await action("GET_PATH", { directoryCode: "FRONTEND" });
    const filePath = path.join(dirPath, endpointPath, "api.json");
    return await _getEndpointInfo2(filePath);
}

//【サブ関数】エンドポイントの情報を取得
async function _getEndpointInfo2(filePath) {
    if (!fs.existsSync(filePath)) {
        throw `[${LAYER_CODE}層] エンドポイントが存在しません。${filePath}`;
    }
    const text = await fs.promises.readFile(filePath, 'utf8');
    let endpointInfo;
    try {
        endpointInfo = await JSON.parse(text);
    }
    catch (err) {
        console.log("\n\n");
        console.log(text);
        console.log("\n\n");
        throw `[${LAYER_CODE}層] API定義ファイルがJSON形式ではありません。${filePath}`;
    }
    const dirPath = await action("GET_PATH", { directoryCode: "FRONTEND" });
    const filePath2 = path.relative(dirPath, filePath);
    let endpointPath = filePath2.replaceAll("\\", "/").replaceAll("api.json", "");
    if (!String(endpointPath).startsWith("/")) {
        // 先頭にスラッシュを追加
        endpointPath = "/" + endpointPath;
    }
    if (String(endpointPath).endsWith("/")) {
        // 末尾のスラッシュを除去
        endpointPath = endpointPath.slice(0, -1);
    }
    return {
        ...endpointInfo,
        endpointPath: endpointPath,
    };
}

//【サブ関数】エンドポイントの一覧を取得
async function _listEndpoints(parameters) {
    let dirPath = await action("GET_PATH", { directoryCode: "FRONTEND" });
    if (String(dirPath).endsWith("/")) {
        // 末尾のスラッシュを除去
        dirPath = dirPath.slice(0, -1);
    }
    const jsonfiles = await glob(dirPath + '/**/api.json');
    const list = [];
    for (const filePath of jsonfiles) {
        const endpointInfo = await _getEndpointInfo2(filePath);
        list.push({
            endpointPath: endpointInfo.endpointPath,
            httpMethod: endpointInfo.httpMethod,
            description: endpointInfo.description,
        });
    }
    return list;
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