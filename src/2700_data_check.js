
//###############################################################
// リクエストとレスポンスのデータ形式チェック
//###############################################################
// APIで扱えるデータ型の一覧
// ・INTEGER
// ・REAL
// ・TEXT
// ・BOOL

import action from "./2800_convert_array.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "2700";

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
    let requestBody = parameters.requestBody;
    const isResponseFormData = parameters.isResponseFormData;
    //
    // エンドポイントの情報を取得する
    const endpointInfo = await action("GET_ENDPOINT_INFO", { endpointPath, isResponseFormData });
    //
    // リクエストボディをチェックする（可能なら変換も行う）
    requestBody = _validateRequestBody({ endpointPath, endpointInfo, requestBody });
    //
    // APIのメイン処理を実行する
    let response = await action(
        "RUN_API",
        {
            ...parameters,
            "requestBody": requestBody,
        },
    );
    //
    // レスポンスデータをチェックする
    response = _validateResponseData({ endpointPath, endpointInfo, response });
    //
    return response;
}


//【サブ関数】リクエストボディをチェックする関数（可能なら変換も行う）
function _validateRequestBody({ endpointPath, endpointInfo, requestBody }) {
    // requestBody を requestBody2 に変換する
    const requestBody2 = requestBody;
    return requestBody2;
}

//【サブ関数】レスポンスデータをチェックする関数
function _validateResponseData({ endpointPath, endpointInfo, response }) {
    // response を response2 に変換する
    const response2 = {};
    for (const parentKey in endpointInfo.response) {
        const parentInfo = endpointInfo.response[parentKey];
        const parentValue = response[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (parentInfo.isArray) {
            // 配列の場合
            if (!Array.isArray(parentValue)) {
                if (parentInfo.isRequired === false && !parentValue) {
                    continue; // 空欄の場合
                }
                else {
                    console.log(JSON.stringify(response, null, 2));
                    throw `[${LAYER_CODE}層] 想定外のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
                }
            }
            response2[parentKey] = [];
            for (let i = 0; i < parentValue.length; i++) {
                if (typeof parentValue[i] !== 'object') {
                    // 配列の要素がオブジェクトではない場合
                    console.log(JSON.stringify(response, null, 2));
                    throw `[${LAYER_CODE}層] 想定外のレスポンスデータを返そうとしました。配列の要素はオブジェクトにしてください。endpointPath=${endpointPath} key=${parentKey}`;
                }
                if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                    throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
                }
                response2[parentKey][i] = {};
                for (const childKey in parentInfo.children) {
                    if (childKey === "flag") {
                        throw `[${LAYER_CODE}層] レスポンスデータのKeyには、文字列「flag」を使用できません。endpointPath=${endpointPath} key=${parentKey}`;
                    }
                    const childInfo = parentInfo.children[childKey];
                    if (!childInfo || typeof childInfo !== 'object') {
                        throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                    }
                    if (childInfo.example === null || childInfo.example === undefined) {
                        throw `[${LAYER_CODE}層] 仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                    }
                    const childValue = parentValue[i][childKey];
                    switch (childInfo.dataType) {
                        case "INTEGER":
                            if (typeof childValue === "number" && Number.isInteger(childValue)) {
                                response2[parentKey][i][childKey] = childValue;
                            }
                            else {
                                if (childInfo.isRequired === false && !childValue) {
                                    // 空欄の場合
                                }
                                else {
                                    console.log(JSON.stringify(response, null, 2));
                                    throw `[${LAYER_CODE}層] 整数ではありません。value="${childValue}", endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                                }
                            }
                            break;
                        case "REAL":
                            if (typeof childValue === "number" && !isNaN(childValue)) {
                                response2[parentKey][i][childKey] = childValue;
                            }
                            else {
                                if (childInfo.isRequired === false && !childValue) {
                                    // 空欄の場合
                                }
                                else {
                                    console.log(JSON.stringify(response, null, 2));
                                    throw `[${LAYER_CODE}層] 数値ではありません。value="${childValue}", endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                                }
                            }
                            break;
                        case "TEXT":
                            if (typeof childValue === "string") {
                                response2[parentKey][i][childKey] = childValue;
                            }
                            else {
                                if (childInfo.isRequired === false && !childValue) {
                                    // 空欄の場合
                                }
                                else {
                                    console.log(JSON.stringify(response, null, 2));
                                    throw `[${LAYER_CODE}層] 文字列ではありません。value="${childValue}", endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                                }
                            }
                            break;
                        case "BOOL":
                            if (typeof childValue === "boolean") {
                                response2[parentKey][i][childKey] = childValue;
                            }
                            else {
                                if (childInfo.isRequired === false && !childValue) {
                                    // 空欄の場合
                                }
                                else {
                                    console.log(JSON.stringify(response, null, 2));
                                    throw `[${LAYER_CODE}層] BOOL型ではありません。value="${childValue}", endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                                }
                            }
                            break;
                        default:
                            throw `[${LAYER_CODE}層] API通信で使用できないデータ型です。detaType=${childInfo.dataType}, endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                    }
                }
            }
        }
        else {
            // 配列ではない場合
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `[${LAYER_CODE}層] 仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}"`;
            }
            switch (parentInfo.dataType) {
                case "INTEGER":
                    if (typeof parentValue === "number" && Number.isInteger(parentValue)) {
                        response2[parentKey] = parentValue;
                    }
                    else {
                        if (parentInfo.isRequired === false && !parentValue) {
                            // 空欄の場合
                        }
                        else {
                            console.log(JSON.stringify(response, null, 2));
                            throw `[${LAYER_CODE}層] 整数ではありません。value="${parentValue}", endpointPath="${endpointPath}", key="${parentKey}"`;
                        }
                    }
                    break;
                case "REAL":
                    if (typeof parentValue === "number" && !isNaN(parentValue)) {
                        response2[parentKey] = parentValue;
                    }
                    else {
                        if (parentInfo.isRequired === false && !parentValue) {
                            // 空欄の場合
                        }
                        else {
                            console.log(JSON.stringify(response, null, 2));
                            throw `[${LAYER_CODE}層] 数値ではありません。value="${parentValue}", endpointPath="${endpointPath}", key="${parentKey}"`;
                        }
                    }
                    break;
                case "TEXT":
                    if (typeof parentValue === "string") {
                        response2[parentKey] = parentValue;
                    }
                    else {
                        if (parentInfo.isRequired === false && !parentValue) {
                            // 空欄の場合
                        }
                        else {
                            console.log(JSON.stringify(response, null, 2));
                            throw `[${LAYER_CODE}層] 文字列ではありません。value="${parentValue}", endpointPath="${endpointPath}", key="${parentKey}"`;
                        }
                    }
                    break;
                case "BOOL":
                    if (typeof parentValue === "boolean") {
                        response2[parentKey] = parentValue;
                    }
                    else {
                        if (parentInfo.isRequired === false && !parentValue) {
                            // 空欄の場合
                        }
                        else {
                            console.log(JSON.stringify(response, null, 2));
                            throw `[${LAYER_CODE}層] BOOL型ではありません。value="${parentValue}", endpointPath="${endpointPath}", key="${parentKey}"`;
                        }
                    }
                    break;
                default:
                    throw `[${LAYER_CODE}層] API通信で使用できないデータ型です。detaType=${childInfo.dataType}, endpointPath="${endpointPath}", key="${parentKey}"`;
            }
        }
    }
    for (const parentKey in response) {
        const rule = endpointInfo.response[parentKey];
        if (!rule) {
            // もしレスポンスの規格が未定義だったら
            throw `[${LAYER_CODE}層] 未定義のレスポンスデータを返そうとしました。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
    }
    return response2;
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