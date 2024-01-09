
//###############################################################
// API仕様書の提供
//###############################################################

import action from "./2700_data_check.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "2000";

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
        default:
            // 下層のメイン関数を呼び出す
            // （下層の機能をそのまま上層に提供する）
            return await action(command, parameters);
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
    const isResponseFormData = parameters.isResponseFormData;
    if (endpointPath === "/default/api_doc/detail") {
        // APIの詳細な仕様を返す
        if (isResponseFormData) {
            throw `[${LAYER_CODE}層] API仕様書は、JSONのみで提供しています。`;
        }
        const infoJson = await action("GET_ENDPOINT_INFO", {
            endpointPath: parameters?.queryParameters?.endpoint,
            isRequestFormData: false,
            isResponseFormData: false,
        });
        const infoForm = await action("GET_ENDPOINT_INFO", {
            endpointPath: parameters?.queryParameters?.endpoint,
            isRequestFormData: true,
            isResponseFormData: true,
        });
        const newInfo = {
            ...infoJson,
            //-------------------------------------------------------
            queryParameters: infoJson.queryParameters,
            queryParametersExample: "?" + _getExampleUrlencoded(infoJson.queryParameters),
            //-------------------------------------------------------
            requestJson: {
                ...infoJson.requestBody,
            },
            requestJsonExample: _getExampleJson(infoJson.requestBody),
            //-------------------------------------------------------
            requestForm: {
                ...infoForm.requestBody,
            },
            requestFormExample: _getExampleUrlencoded(infoForm.requestBody),
            //-------------------------------------------------------
            responseJson: {
                ...infoJson.response,
            },
            responseJsonExample: _getExampleJson(infoJson.response),
            //-------------------------------------------------------
            responseForm: {
                ...infoForm.response,
            },
            responseFormExample: _getExampleUrlencoded(infoForm.response),
            //-------------------------------------------------------
        };
        delete newInfo.requestBody;
        delete newInfo.response;
        return newInfo;
    }
    else if (endpointPath === "/default/api_doc") {
        // APIエンドポイントの一覧を返す
        return await action("LIST_ENDPOINTS", parameters);
    }
    else {
        // 通常動作
        return await action("RUN_API", parameters);
    }
}

function _getExampleJson(info) {
    const exampleJson = {};
    for (const parentKey in info) {
        const parentInfo = info[parentKey];
        if (parentInfo.isArray) {
            exampleJson[parentKey] = [
                {},
            ];
            for (const childKey in parentInfo.children) {
                const childInfo = parentInfo.children[childKey];
                if (childInfo.example === null || childInfo.example === undefined) {
                    throw `[${LAYER_CODE}層] 記入例(example)が未定義です。key="${parentKey}[0].${childKey}"`;
                }
                exampleJson[parentKey][0][childKey] = childInfo.example;
            }
        }
        else {
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `[${LAYER_CODE}層] 記入例(example)が未定義です。key=${parentKey}`;
            }
            exampleJson[parentKey] = parentInfo.example;
        }
    }
    return exampleJson;
}

function _getExampleUrlencoded(info) {
    const rows = [];
    for (const key in info) {
        const paramInfo = info[key];
        if (paramInfo.isArray) {
            throw `[${LAYER_CODE}層] formDataに配列が含まれています。key=${key}`;
        }
        if (paramInfo.example === null || paramInfo.example === undefined) {
            throw `[${LAYER_CODE}層] 記入例(example)が未定義です。key=${key}`;
        }
        const text = key + "=" + paramInfo.example;
        rows.push(text);
    }
    return rows.join("\n&");
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