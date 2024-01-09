
//###############################################################
// ページネーション
//###############################################################

import action from "./2900_run_api.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "2850";

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
        case "GET_ENDPOINT_INFO":
            // このJavaScriptファイルの中のサブ関数を呼び出す
            return await _getEndpointInfo(parameters);
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
    const isResponseFormData = parameters.isResponseFormData;
    //
    if (!isResponseFormData) {
        // レスポンスデータをFormDataの形式に変換する必要がなければ
        // （HTML側にすり合わせる必要がなければ）
        //  何もしない（下層の機能をそのまま上層に提供する）
        return await action("RUN_API", parameters);
    }
    if (!parameters?.endpointPath) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」がNULLです`;
    }
    if (typeof parameters?.endpointPath !== "string" && !(parameters?.endpointPath instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」が文字列ではありません`;
    }
    if (typeof parameters?.queryParameters !== "object") {
        throw `[${LAYER_CODE}層] パラメーター「queryParameters」がオブジェクトではありません`;
    }
    const endpointPath = parameters.endpointPath;
    const queryParameters = parameters.queryParameters;
    //
    // エンドポイントの情報を取得する
    const endpointInfo = await action("GET_ENDPOINT_INFO", { endpointPath });
    //
    // APIのメイン処理を実行する
    let response = await action("RUN_API", parameters);
    //
    // レスポンスデータに、ページネーションの情報を加える
    response = _convertResponseData({ endpointPath, endpointInfo, response, queryParameters });
    //
    return response;
}

//【サブ関数】レスポンスデータに、ページネーションの情報を加える関数
function _convertResponseData({ endpointPath, endpointInfo, response, queryParameters }) {
    // response を response2 に変換する
    const response2 = {
        ...response,
    };
    for (const parentKey in endpointInfo.response) {
        // レスポンスの規格
        const parentRule = endpointInfo.response[parentKey];
        if (!parentRule || typeof parentRule !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        //
        const parentValue = response[parentKey];
        //
        // 配列ではない場合、何もしない
        if (!parentRule.isArray) continue;
        if (!Array.isArray(parentValue)) {
            console.error("\n");
            console.error(JSON.stringify(response, null, 2));
            console.error("\n");
            throw `[${LAYER_CODE}層] 想定外のレスポンスデータを返そうとしました。本来は配列です。endpointPath=${endpointPath} key=${parentKey}`;
        }
        if (parentRule.onePageMaxSize < parentValue.length) {
            throw `[${LAYER_CODE}層] 配列がサイズオーバーです。endpointPath=${endpointPath} key=${parentKey} 現在の長さ=${parentValue.length} 上限=${rule.onePageMaxSize}`;
        }
        //
        // 仮に全件を取得していた場合の、配列の長さ
        const totalKey = String(parentKey) + "_total";
        let totalArrayLength = response[totalKey];
        if (isNaN(totalArrayLength)) {
            throw `[${LAYER_CODE}層] レスポンスデータが不足しています。仮に配列「${parentKey}」を全件を取得していた場合の件数を${totalKey}に返却してください。 endpointPath=${endpointPath}`;
        }
        totalArrayLength = Number(totalArrayLength);
        //
        // １ページあたり表示できる件数
        const onePageMaxSize = parentRule.onePageMaxSize;
        //
        // 全部で何ページあるのか
        const maxPageNumber = Math.ceil(totalArrayLength / onePageMaxSize);
        //
        // 現在のページ番号
        const queryParameterKey = "page_" + String(parentKey);
        let pageNumber = queryParameters[queryParameterKey];
        if (isNaN(pageNumber)) {
            pageNumber = 1;
        }
        else {
            pageNumber = Number(pageNumber);
            if (pageNumber <= 0) {
                pageNumber = 1;
            }
            if (pageNumber > maxPageNumber) {
                pageNumber = maxPageNumber;
            }
        }
        //
        response2[String(parentKey) + "_pageFirst_flag"] = (pageNumber >= 3) ? true : false;
        //
        response2[String(parentKey) + "_pagePrev_flag"] = (pageNumber >= 2) ? true : false;
        response2[String(parentKey) + "_pagePrev"] = pageNumber - 1;
        //
        response2[String(parentKey) + "_pageNow_flag"] = (maxPageNumber >= 2) ? true : false;
        response2[String(parentKey) + "_pageNow"] = pageNumber;
        //
        response2[String(parentKey) + "_pageNext_flag"] = (pageNumber < maxPageNumber) ? true : false;
        response2[String(parentKey) + "_pageNext"] = pageNumber + 1;
        //
        response2[String(parentKey) + "_pageLast_flag"] = (pageNumber < maxPageNumber - 1) ? true : false;
        response2[String(parentKey) + "_pageLast"] = maxPageNumber;
    }
    return response2;
}

//【サブ関数】エンドポイントの情報を取得
async function _getEndpointInfo(parameters) {
    const isResponseFormData = parameters.isResponseFormData;
    if (!isResponseFormData) {
        // レスポンスデータをFormDataの形式に変換する必要がなければ
        // （HTML側にすり合わせる必要がなければ）
        //  何もしない（下層の機能をそのまま上層に提供する）
        return await action("GET_ENDPOINT_INFO", parameters);
    }
    if (!parameters?.endpointPath) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」がNULLです`;
    }
    if (typeof parameters?.endpointPath !== "string" && !(parameters?.endpointPath instanceof String)) {
        throw `[${LAYER_CODE}層] パラメーター「endpointPath」が文字列ではありません`;
    }
    const endpointPath = parameters.endpointPath;
    const endpointInfo1 = await action("GET_ENDPOINT_INFO", { endpointPath });
    const endpointInfo = structuredClone(endpointInfo1);
    //
    for (const parentKey in endpointInfo.response) {
        // レスポンスの規格
        const parentRule = endpointInfo.response[parentKey];
        if (!parentRule || typeof parentRule !== 'object') {
            throw `[${LAYER_CODE}層] レスポンスの仕様が未定義です。endpointPath="${endpointPath}", key="${parentKey}"`;
        }
        //
        // 配列ではない場合、何もしない
        if (!parentRule.isArray) continue;
        //
        if (!parentRule.title) {
            throw `[${LAYER_CODE}層] 配列のタイトル（日本語）が未定義です。endpointPath="${endpointPath}", key="${parentKey}.title"`;
        }
        endpointInfo.response[String(parentKey) + "_pageFirst_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に「先頭ページにジャンプする」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、先頭ページを表示しているときにはfalseになります。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pagePrev_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に「１つ前のページに戻る」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、先頭ページを表示しているときにはfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pagePrev"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 2,
            "description": `「${parentRule.title}」を表示する際の、１つ前のページのページ番号。例えば、５ページめを表示しているときは「4」です。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pageNow_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に、現在のページ番号を表示するか否か。（true...表示する。false...表示しない。）全部で１ページしか存在しない場合はfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pageNow"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 3,
            "description": `「${parentRule.title}」を表示する際の、現在のページ番号。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pageNext_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": true,
            "description": `「${parentRule.title}」を表示する際に「次のページに進む」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、最終ページを表示しているときにはfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pageNext"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 4,
            "description": `「${parentRule.title}」を表示する際の、次のページのページ番号。例えば、５ページめを表示しているときは「6」です。`,
        };
        //
        endpointInfo.response[String(parentKey) + "_pageLast_flag"] = {
            "dataType": "BOOL",
            "isRequired": true,
            "example": false,
            "description": `「${parentRule.title}」を表示する際に「最終ページにジャンプする」ボタンを表示するか否か。（true...ボタンを表示する。false...ボタンを表示しない。）この変数は、ページをめくることで変動します。例えば、最終ページを表示しているときにはfalseになります。`,
        };
        endpointInfo.response[String(parentKey) + "_pageLast"] = {
            "dataType": "INTEGER",
            "isRequired": true,
            "example": 4,
            "description": `「${parentRule.title}」を表示する際の、最後のページのページ番号。`,
        };
    }
    return endpointInfo;
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