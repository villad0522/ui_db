
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
    const requestBody = parameters.requestBody;
    const isResponseFormData = parameters.isResponseFormData;
    //
    // エンドポイントの情報を取得する
    const endpointInfo = await action("GET_ENDPOINT_INFO", { endpointPath, isResponseFormData });
    //
    // リクエストボディをチェックする（可能なら変換も行う）
    // requestBody を requestBody2 に変換する
    const requestBody2 = {};
    for (const parentKey in endpointInfo.requestBody) {
        const parentInfo = endpointInfo.requestBody[parentKey];
        let parentValue = requestBody[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (parentInfo.isArray) {
            // 配列の場合
            if (parentInfo.isRequired === false && !parentValue) {
                continue; // 空欄かつ空欄OKの場合
            }
            requestBody2[parentKey] = _validatorArray({
                array: parentValue,
                parentKey,
                arrayInfo: parentInfo,
                allData: requestBody,
                endpointPath,
            });
        }
        else {
            // 配列ではない場合
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `[${LAYER_CODE}層] 仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}"`;
            }
            try {
                parentValue = _validator({
                    value: parentValue,
                    dataType: parentInfo.dataType,
                    isRequired: parentInfo.isRequired,
                });
                requestBody2[parentKey] = parentValue;
            }
            catch (err) {
                // 記入漏れや書式エラーが発生した場合
                if (!isResponseFormData) throw err;
                // FormData形式の場合
                return {
                    ...requestBody,
                    [parentKey + "_error"]: String(err),
                };
            }
        }
    }
    for (const parentKey in requestBody) {
        const rule = endpointInfo.requestBody[parentKey];
        if (!rule) {
            // もしレスポンスの規格が未定義だったら
            throw `[${LAYER_CODE}層] 未定義のリクエストボディが渡されました。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
    }
    //
    // APIのメイン処理を実行する
    let response = await action(
        "RUN_API",
        {
            ...parameters,
            "requestBody": requestBody2,
        },
    );
    //
    // レスポンスデータをチェックする
    response = _validateResponseData({ endpointPath, endpointInfo, response });
    //
    return response;
}


function _validatorArray({ array, parentKey, arrayInfo, allData, endpointPath }) {
    // 配列の場合
    if (!Array.isArray(array)) {
        console.error("\n\n");
        console.error(JSON.stringify(allData, null, 2));
        console.error("\n\n");
        throw `パラメータ「${parentKey}」を配列にしてください。`;
    }
    newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'object') {
            // 配列の要素がオブジェクトではない場合
            console.error("\n\n");
            console.error(JSON.stringify(allData, null, 2));
            console.error("\n\n");
            throw `配列の要素（${parentKey}[${i}]）をオブジェクトにしてください。`;
        }
        if (!arrayInfo.children || typeof arrayInfo.children !== 'object') {
            throw `[${LAYER_CODE}層] 仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        newArray[i] = {};
        for (const childKey in arrayInfo.children) {
            if (childKey === "flag") {
                throw `[${LAYER_CODE}層] Keyには文字列「flag」を使用できません。endpointPath=${endpointPath} key=${parentKey}`;
            }
            const childInfo = arrayInfo.children[childKey];
            if (!childInfo || typeof childInfo !== 'object') {
                throw `[${LAYER_CODE}層] 仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
            }
            if (childInfo.example === null || childInfo.example === undefined) {
                throw `[${LAYER_CODE}層] 仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
            }
            try {
                let childValue = array[i][childKey];
                childValue = _validator({
                    value: childValue,
                    dataType: childInfo.dataType,
                    isRequired: childInfo.isRequired,
                });
                newArray[i][childKey] = childValue;
            }
            catch (err) {
                console.error("\n\n");
                console.error(JSON.stringify(allData, null, 2));
                console.error("\n\n");
                throw `配列の中身（${parentKey}[${i}]）が不正な書式です。${err}`;
            }
        }
    }
    return newArray;
}

function _validator({ value, dataType, isRequired }) {
    switch (dataType) {
        case "INTEGER":
            if (!isNaN(value)) {
                // 数値に変換できる場合
                value = Number(value);
                if (!Number.isInteger(value)) {
                    throw "小数は指定できません。指定できるのは整数のみです。";
                }
                return value;
            }
            // 数値に変換できない場合
            if (value) {
                // 空欄ではない場合
                throw "指定できるのは整数のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        case "REAL":
            if (!isNaN(value)) {
                // 数値に変換できる場合
                return Number(value);
            }
            // 数値に変換できない場合
            if (value) {
                // 空欄ではない場合
                throw "指定できるのは整数のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        case "TEXT":
            if (value) {
                // 空欄ではない場合
                // 文字列に変換して、前後の空白を切り取って、よく確かめる。
                if (String(value).trim()) {
                    // やっぱり空欄ではない場合
                    return String(value);
                }
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            throw "必須項目が空欄です。";
        case "BOOL":
            if (value === true) {
                return true;
            }
            else if (value === false) {
                return false;
            }
            if (String(value).toLowerCase() === "true") {
                return true;
            }
            else if (String(value).toLowerCase() === "false") {
                return false;
            }
            if (!isNaN(value)) {
                // 数値に変換できる場合
                return Number(value) !== 0;
            }
            // 数値に変換できない場合
            if (value) {
                // 空欄ではない場合
                throw "指定できるのはBOOL値のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        default:
            throw `[${LAYER_CODE}層] サポートされていないデータ型です。detaType="${childInfo.dataType}"`;
    }
}



//【サブ関数】レスポンスデータをチェックする関数
function _validateResponseData({ endpointPath, endpointInfo, response }) {
    // response を response2 に変換する
    const response2 = {};
    for (const parentKey in endpointInfo.response) {
        const parentInfo = endpointInfo.response[parentKey];
        let parentValue = response[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (parentInfo.isArray) {
            // 配列の場合
            if (parentInfo.isRequired === false && !parentValue) {
                continue; // 空欄の場合
            }
            response2[parentKey] = _validatorArray({
                array: parentValue,
                parentKey,
                arrayInfo: parentInfo,
                allData: response,
                endpointPath,
            });
        }
        else {
            // 配列ではない場合
            if (parentInfo.example === null || parentInfo.example === undefined) {
                throw `[${LAYER_CODE}層] 仕様書にexampleが指定されていません。endpointPath="${endpointPath}", key="${parentKey}"`;
            }
            try {
                parentValue = _validator({
                    value: parentValue,
                    dataType: parentInfo.dataType,
                    isRequired: parentInfo.isRequired,
                });
                response2[parentKey] = parentValue;
            }
            catch (err) {
                console.error("\n\n");
                console.error(JSON.stringify(response, null, 2));
                console.error("\n\n");
                throw `レスポンスデータの項目「${parentKey}」が不正な書式です。${err}  endpointPath="${endpointPath}"`;
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