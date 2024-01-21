
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await load();
});

let lastTime = 0;

// データを読み込む関数
async function load() {
    //
    //#############################################################################
    //
    // サーバーと通信する
    const response = await window.fetch(
        "./json" + location.search,
        {
            method: "GET",
            cache: "no-store",
        }
    );
    if (response.status === 500) {
        // サーバーサイドに起因するエラー
        alert(await response.text());
        return;
    }
    else if (response.status !== 200) {
        // その他
        alert(`${response.status}: ${response.statusText}`);
        return;
    }
    const jsonData = await response.json();
    console.log(jsonData);
    //
    const commandNameElement = document.getElementById("command");
    commandNameElement.innerText = jsonData.commandName;
    //
    const httpMethodElement = document.getElementById("http_method");
    httpMethodElement.innerText = jsonData.httpMethod;
    //
    const descriptionElement = document.getElementById("description");
    descriptionElement.innerText = jsonData.description;
    //
    const pathElements = document.getElementsByName("path");
    for (const pathElement of pathElements) {
        pathElement.innerText = jsonData.endpointPath;
    }
    //
    //#############################################################################
    //
    if (Object.keys(jsonData.queryParameters).length >= 1) {
        // クエリパラメータ―が必要
        //
        // クエリパラメータ―の例文
        const exampleElement = document.getElementById("queryParameters_example");
        exampleElement.innerText = jsonData.queryParametersExample;
        //
        // クエリパラメータ―の表
        const tableElement = document.getElementById("queryParameters_table");
        let htmlText = "";
        for (const key in jsonData.queryParameters) {
            const paramInfo = jsonData.queryParameters[key];
            htmlText += `
                <tr>
                    <th scope="row" rowspan="2">${key}</th>
                    <td>${paramInfo.dataType}</td>
                    <td>${(paramInfo.isRequired === false) ? "必須ではない" : "必須"}</td>
                </tr>
                <tr>
                    <td colspan="2">${paramInfo.description}</td>
                </tr>
            `;
        }
        tableElement.innerHTML = htmlText;
    }
    else {
        // クエリパラメータ―が不要
        const blockElement = document.getElementById("queryParameters_block");
        blockElement.innerText = "不要";
    }
    //
    //#############################################################################
    //
    if (Object.keys(jsonData.requestJson).length >= 1) {
        // リクエストボディが必要
        //
        // リクエストボディ(JSON)の例文
        const exampleJsonElement = document.getElementById("requestJson_example");
        exampleJsonElement.innerText = JSON.stringify(jsonData.requestJsonExample, null, 2);
        //
        // リクエストボディ(JSON)の表
        const tableJsonElement = document.getElementById("requestJson_table");
        let htmlText1 = "";
        for (const parentKey in jsonData.requestJson) {
            const parentInfo = jsonData.requestJson[parentKey];
            if (parentInfo.isArray) {
                htmlText1 += `
                    <tr>
                        <th scope="row" rowspan="2">${parentKey}</th>
                        <td>配列</td>
                        <td>${(parentInfo.isRequired === false) ? "必須ではない" : "必須"}</td>
                    </tr>
                    <tr>
                        <td colspan="2">${parentInfo.title}</td>
                    </tr>
                `;
                for (const childKey in parentInfo.children) {
                    const childInfo = parentInfo.children[childKey];
                    htmlText1 += `
                        <tr>
                            <th scope="row" rowspan="2">${parentKey}[0].${childKey}</th>
                            <td>${childInfo.dataType}</td>
                            <td>${(childInfo.isRequired === false) ? "必須ではない" : "必須"}</td>
                        </tr>
                        <tr>
                            <td colspan="2">${childInfo.description}</td>
                        </tr>
                    `;
                }
            }
            else {
                htmlText1 += `
                    <tr>
                        <th scope="row" rowspan="2">${parentKey}</th>
                        <td>${parentInfo.dataType}</td>
                        <td>${(parentInfo.isRequired === false) ? "必須ではない" : "必須"}</td>
                    </tr>
                    <tr>
                        <td colspan="2">${parentInfo.description}</td>
                    </tr>
                `;
            }
        }
        tableJsonElement.innerHTML = htmlText1;
        //
        // リクエストボディ(FormData)の例文
        const exampleFormElement = document.getElementById("requestForm_example");
        exampleFormElement.innerText = jsonData.requestFormExample;
        //
        // リクエストボディ(FormData)の表
        const tableFormElement = document.getElementById("requestForm_table");
        let htmlText2 = "";
        for (const key in jsonData.requestForm) {
            const paramInfo = jsonData.requestForm[key];
            htmlText2 += `
                <tr>
                    <th scope="row" rowspan="2">${key}</th>
                    <td>${paramInfo.dataType}</td>
                    <td>${(paramInfo.isRequired === false) ? "必須ではない" : "必須"}</td>
                </tr>
                <tr>
                    <td colspan="2">${paramInfo.description}</td>
                </tr>
            `;
        }
        tableFormElement.innerHTML = htmlText2;
    }
    else {
        // リクエストボディが不要
        const blockElement = document.getElementById("requestBody_block");
        blockElement.innerText = "不要";
    }
    //
    //#############################################################################
    //
    // レスポンスボディ(JSON)の例文
    const exampleJsonElement = document.getElementById("responseJson_example");
    exampleJsonElement.innerText = JSON.stringify(jsonData.responseJsonExample, null, 2);
    //
    // レスポンスボディ(JSON)の表
    const tableJsonElement = document.getElementById("responseJson_table");
    let htmlText1 = "";
    for (const parentKey in jsonData.responseJson) {
        const parentInfo = jsonData.responseJson[parentKey];
        if (parentInfo.isArray) {
            htmlText1 += `
                <tr>
                    <th scope="row" rowspan="2">${parentKey}</th>
                    <td>配列</td>
                </tr>
                <tr>
                    <td>${parentInfo.title}</td>
                </tr>
            `;
            for (const childKey in parentInfo.children) {
                const childInfo = parentInfo.children[childKey];
                htmlText1 += `
                    <tr>
                        <th scope="row" rowspan="2">${parentKey}[0].${childKey}</th>
                        <td>${childInfo.dataType}</td>
                    </tr>
                    <tr>
                        <td>${childInfo.description}</td>
                    </tr>
                `;
            }
        }
        else {
            htmlText1 += `
                <tr>
                    <th scope="row" rowspan="2">${parentKey}</th>
                    <td>${parentInfo.dataType}</td>
                </tr>
                <tr>
                    <td>${parentInfo.description}</td>
                </tr>
            `;
        }
    }
    tableJsonElement.innerHTML = htmlText1;
    //
    // レスポンスボディ(FormData)の例文
    const exampleFormElement = document.getElementById("responseForm_example");
    exampleFormElement.innerText = jsonData.responseFormExample;
    //
    // レスポンスボディ(FormData)の表
    const tableFormElement = document.getElementById("responseForm_table");
    let htmlText2 = "";
    for (const key in jsonData.responseForm) {
        const paramInfo = jsonData.responseForm[key];
        htmlText2 += `
            <tr>
                <th scope="row" rowspan="2">${key}</th>
                <td>${paramInfo.dataType}</td>
            </tr>
            <tr>
                <td>${paramInfo.description}</td>
            </tr>
        `;
    }
    tableFormElement.innerHTML = htmlText2;
    //
    //#############################################################################
}
