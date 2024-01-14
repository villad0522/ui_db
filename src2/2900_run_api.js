
//###############################################################
// 標準搭載されたAPI
//###############################################################

import action from "./2950_api_info_cache.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "2900";

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
        case "RUN_API":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _runApi(parameters);
        case "TEST_FRAMEWORK":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _testFramework(parameters);
        case "GET_ENDPOINT_INFO":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "LIST_ENDPOINTS":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "START_UP":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "CLOSE":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "START_TRANSACTION":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "END_TRANSACTION":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "GET_PATH":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "GET_LOCAL_IP":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        case "GET_LOCAL_URL":
            // 下層のメイン関数を呼び出す（下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
        default:
            throw `[${LAYER_CODE}層] サポートしていないコマンド「${command}」が呼び出されました。`;
    }
}

//【サブ関数】APIの実行
async function _runApi(parameters) {
    if (bugMode === 1) return;  // 意図的にバグを混入させる（ミューテーション解析）
    if (!parameters?.endpointPath) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」がNULLです`;
    }
    if (typeof parameters?.endpointPath !== "string" && !(parameters?.endpointPath instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」が文字列ではありません`;
    }
    const endpointPath = parameters.endpointPath;
    const endpointInfo = await action("GET_ENDPOINT_INFO", { endpointPath });
    let allResults = {};
    if (!Array.isArray(endpointInfo?.commands)) {
        throw `[${LAYER_CODE}層] 配列「commands」が定義されていません。endpointPath="${endpointPath}"`;
    }
    for (const commandInfo of endpointInfo.commands) {
        if (!commandInfo?.commandName) {
            throw `[${LAYER_CODE}層] commands[?].commandName が定義されていません。endpointPath="${endpointPath}"`;
        }
        if (typeof commandInfo?.resultNameSpace !== "string") {
            throw `[${LAYER_CODE}層] commands[?].resultNameSpace が定義されていません。endpointPath="${endpointPath}"`;
        }
        const result1 = await action(
            commandInfo.commandName,
            {
                ...parameters.queryParameters,
                ...parameters.requestBody,
                ...commandInfo.additionalParameters,
            },
        );
        if (typeof result1 !== "object") {
            throw `[${LAYER_CODE}層] コマンド「${commandInfo.commandName}」の実行結果がオブジェクト形式ではありません"`;
        }
        const result2 = {};
        for (const key in result1) {
            result2[commandInfo.resultNameSpace + key] = result1[key];
        }
        for (const key in result2) {
            if (allResults[key]) {
                console.error(`[${LAYER_CODE}層] コマンド「${commandInfo.commandName}」の実行結果のうち、項目「${key}」が他のコマンドの実行結果と競合しています。`);
            }
        }
        allResults = {
            ...allResults,
            ...result2,
        };
    }
    return allResults;
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