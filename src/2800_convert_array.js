
//###############################################################
// 標準搭載されたAPI
//###############################################################

import action from "./2850_pagination.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "2800";

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
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getEndpointInfo(parameters);
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
    const isRequestFormData = parameters.isRequestFormData;
    //
    // エンドポイントの情報を取得する
    const endpointInfo = await action("GET_ENDPOINT_INFO", { endpointPath, isRequestFormData, isResponseFormData });
    //
    if (isRequestFormData) {
        // リクエストボディを、FormDataから配列に変換する
        requestBody = _convertRequestBody({ endpointPath, endpointInfo, requestBody });
    }
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
    if (isResponseFormData) {
        // レスポンスデータを、配列からFormDataに変換する
        response = _convertResponseData({ endpointPath, endpointInfo, response });
    }
    //
    return response;
}


//【サブ関数】リクエストボディを、FormDataから配列に変換する関数
function _convertRequestBody({ endpointPath, endpointInfo, requestBody }) {
    // requestBody を requestBody2 に変換する
    const requestBody2 = {};
    for (const parentKey in endpointInfo.requestBody) {
        const parentInfo = endpointInfo.requestBody[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            requestBody2[parentKey] = requestBody[parentKey];
            continue;
        }
        // 配列の場合
        if (!parentInfo.children || typeof parentInfo.children !== 'object') {
            throw `[${LAYER_CODE}層] リクエストボディの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        requestBody2[parentKey] = [];
        let noHitCount = 0;
        for (let i = 0; noHitCount < 100; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            if (!requestBody[flagKey]) {
                noHitCount++;
                continue;
            }
            noHitCount = 0;
            requestBody2[parentKey][i] = {};
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                requestBody2[parentKey][i][childKey] = requestBody[newKey];
            }
        }
    }
    return requestBody2;
}

//【サブ関数】レスポンスデータを、配列からFormDataに変換する関数
function _convertResponseData({ endpointPath, endpointInfo, response }) {
    // response を response2 に変換する
    const response2 = {};
    for (const parentKey in endpointInfo.response) {
        const parentInfo = endpointInfo.response[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        //
        const parentValue = response[parentKey];
        //
        if (!parentInfo.isArray) {
            // 配列ではない場合
            response2[parentKey] = parentValue;
            continue;
        }
        // 配列の場合
        if (!parentValue) {
            throw `[${LAYER_CODE}層] 空のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (!Array.isArray(parentValue)) {
            throw `[${LAYER_CODE}層] 想定外のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (!Number.isInteger(parentInfo.onePageMaxSize)) {
            throw `[${LAYER_CODE}層] １ページあたりの最大表示件数が未定義です。endpointPath="${endpointPath}", key="${parentKey}.onePageMaxSize"`;
        }
        if (parentInfo.onePageMaxSize < parentValue.length) {
            throw `[${LAYER_CODE}層] 配列がサイズオーバーです。endpointPath=${endpointPath} key=${parentKey} 現在の長さ=${parentValue.length} 上限=${rule.onePageMaxSize}`;
        }
        if (!parentInfo.children || typeof parentInfo.children !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
        }
        for (let i = 0; i < parentValue.length; i++) {
            if (typeof parentValue[i] !== 'object') {
                // 配列の要素がオブジェクトではない場合
                throw `[${LAYER_CODE}層] 想定外のレスポンスデータを返そうとしました。配列の要素はオブジェクトにしてください。endpointPath=${endpointPath} key=${parentKey}`;
            }
            const flagKey = String(parentKey) + String(i) + "_flag";
            response2[flagKey] = true;
            for (const childKey in parentInfo.children) {
                if (childKey === "flag") {
                    throw `[${LAYER_CODE}層] レスポンスデータのKeyには、文字列「flag」を使用できません。endpointPath=${endpointPath} key=${parentKey}`;
                }
                const childValue = parentValue[i][childKey];
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                response2[newKey] = childValue;
            }
        }
        for (let i = parentValue.length; i < parentInfo.onePageMaxSize; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            response2[flagKey] = false;
            if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
            }
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                const childInfo = parentInfo.children[childKey];
                if (!childInfo || typeof childInfo !== 'object') {
                    throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                }
                switch (childInfo.dataType) {
                    case "INTEGER":
                        response2[newKey] = 0;
                        break;
                    case "REAL":
                        response2[newKey] = 0;
                        break;
                    case "TEXT":
                        response2[newKey] = "";
                        break;
                    case "BOOL":
                        response2[newKey] = false;
                        break;
                    default:
                        throw `[${LAYER_CODE}層] API通信で使用できないデータ型です。detaType=${childInfo.dataType}, endpointPath="${endpointPath}", key="${parentKey}.children.${childKey}"`;
                }
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


//【サブ関数】エンドポイントの情報を取得
async function _getEndpointInfo(parameters) {
    const isRequestFormData = parameters.isRequestFormData;
    const isResponseFormData = parameters.isResponseFormData;
    if (!parameters?.endpointPath) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」がNULLです`;
    }
    if (typeof parameters?.endpointPath !== "string" && !(parameters?.endpointPath instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」が文字列ではありません`;
    }
    const endpointPath = parameters.endpointPath;
    const endpointInfo1 = await action("GET_ENDPOINT_INFO", parameters);
    const endpointInfo2 = structuredClone(endpointInfo1);
    if (isRequestFormData) {
        // レスポンスデータをFormDataの形式から変換する必要がある場合
        endpointInfo2.requestBody = _convertRequestInfo({
            endpointPath: endpointPath,
            oldRequestInfo: endpointInfo1.requestBody,
        })
    }
    if (isResponseFormData) {
        // レスポンスデータをFormDataの形式に変換する必要がある場合
        endpointInfo2.response = _convertResponseInfo({
            endpointPath: endpointPath,
            oldResponseInfo: endpointInfo1.response,
        })
    }
    return endpointInfo2;
}

function _convertRequestInfo({ endpointPath, oldRequestInfo }) {
    const newRequestInfo = {};
    for (const parentKey in oldRequestInfo) {
        const parentInfo = oldRequestInfo[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] リクエストの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            newRequestInfo[parentKey] = parentInfo;
            continue;
        }
        if (!Number.isInteger(parentInfo.onePageMaxSize)) {
            throw `[${LAYER_CODE}層] １ページあたりの最大表示件数が未定義です。endpointPath="${endpointPath}", key="${parentKey}.onePageMaxSize"`;
        }
        if (!parentInfo.title) {
            throw `[${LAYER_CODE}層] 配列のタイトル（日本語）が未定義です。endpointPath="${endpointPath}", key="${parentKey}.title"`;
        }
        // 配列の場合
        for (let i = 0; i < parentInfo.onePageMaxSize; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            newRequestInfo[flagKey] = {
                "dataType": "BOOL",
                "isRequired": false,
                "example": (i === 0) ? true : false,
                "description": `${parentInfo.title}の${i}番目の項目を、サーバー側で入力データとして採用するか否か。（true...採用する。false...無視する。）`
                    + `ここでの「${i}番目」の数え方は、画面上に "実際に" 表示されている項目の先頭から数えます。`
                    + `データの件数が増えた場合は複数のページに分割されますので、「データベースの先頭から${i}番目」として解釈するわけではありません。`,
            };
            if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                throw `[${LAYER_CODE}層] リクエストデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
            }
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                const childInfo = parentInfo.children[childKey];
                newRequestInfo[newKey] = {
                    ...childInfo,
                    "isRequired": false,
                    "description": `${parentInfo.title}の${i}番目の項目の` + childInfo.description
                        + `。ただし項目「${flagKey}」がtrueの場合のみ、有効なデータとして採用します。`,
                };
            }
        }
    }
    return newRequestInfo;
}

function _convertResponseInfo({ endpointPath, oldResponseInfo }) {
    const newResponseInfo = {};
    for (const parentKey in oldResponseInfo) {
        const parentInfo = oldResponseInfo[parentKey];
        if (!parentInfo || typeof parentInfo !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        if (!parentInfo.isArray) {
            // 配列ではない場合
            newResponseInfo[parentKey] = parentInfo;
            continue;
        }
        if (!Number.isInteger(parentInfo.onePageMaxSize)) {
            throw `[${LAYER_CODE}層] １ページあたりの最大表示件数が未定義です。endpointPath="${endpointPath}", key="${parentKey}.onePageMaxSize"`;
        }
        if (!parentInfo.title) {
            throw `[${LAYER_CODE}層] 配列のタイトル（日本語）が未定義です。endpointPath="${endpointPath}", key="${parentKey}.title"`;
        }
        // 配列の場合
        for (let i = 0; i < parentInfo.onePageMaxSize; i++) {
            const flagKey = String(parentKey) + String(i) + "_flag";
            newResponseInfo[flagKey] = {
                "dataType": "BOOL",
                "isRequired": true,
                "example": (i === 0) ? true : false,
                "description": `${parentInfo.title}の${i}番目の項目を表示するべきか否か。（true...表示するべき。false...表示するべきではない。）`
                    + `ここでの「${i}番目」の数え方は、画面上に "実際に" 表示されている項目の先頭から数えてください。`
                    + `データの件数が増えた場合は複数のページに分割されますので、「データベースの先頭から${i}番目」とは限りません。`,
            };
            if (!parentInfo.children || typeof parentInfo.children !== 'object') {
                throw `[${LAYER_CODE}層] レスポンスデータの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}.children"`;
            }
            for (const childKey in parentInfo.children) {
                const newKey = String(parentKey) + String(i) + "_" + String(childKey);
                const childInfo = parentInfo.children[childKey];
                newResponseInfo[newKey] = {
                    ...childInfo,
                    "isRequired": false,
                    "description": `${parentInfo.title}の${i}番目の項目の` + childInfo.description
                        + `。ただし項目「${flagKey}」がtrueの場合のみ、有効なデータとして表示してください。`,
                };
            }
        }
    }
    return newResponseInfo;
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