
//###############################################################
// サーバーと通信する関数
export default async function myFetch(url, parameters) {
    if (parameters?.isKeepQuery !== false) {
        // 現在のクエリパラメータ―を維持する
        const nowUrl = new URL(location.href);
        const nextUrl = new URL(url, location.href);
        const nowParams = nowUrl.searchParams;  //現在のパラメーター
        const nextParams = nextUrl.searchParams;    //進みたいパラメーター
        // 重複を無くすためにクエリパラメータ―を作り直す
        const newParams = new URLSearchParams();    //新しく作るパラメーター
        nowParams.forEach((value, key) => {
            newParams.set(key, value);
        });
        nextParams.forEach((value, key) => {
            newParams.set(key, value);
        });
        // URLを再構築
        url = nextUrl.origin + nextUrl.pathname + "?" + newParams.toString();
    }
    let parameters2 = {};
    if (!parameters?.body && parameters?.method !== "GET") {
        const formData = new FormData(document.forms[0]);
        const urlSearchParams = new URLSearchParams(formData);
        parameters2 = {
            body: urlSearchParams.toString(),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
        };
    }
    //============================================================
    // 通信開始
    console.log(parameters2);
    const response = await window.fetch(
        url,
        {
            method: "POST",
            cache: "no-store",
            ...parameters2,
            ...parameters,
        }
    );
    // 通信終了
    //============================================================
    if (
        (200 <= response.status && response.status <= 299)
        || (response.status === 400)
        || (response.status === 415)
        || (response.status === 500)
    ) {
        const contentType = String(response.headers.get("content-type"));
        //=========================================================
        if (contentType.includes("text/plain")) {
            alert(await response.text());
            return;
        }
        //=========================================================
        else if (contentType.includes("application/json")) {
            const jsonData = await response.json();
            if (jsonData.userMessage) {
                alert(jsonData.userMessage);
            }
            if (jsonData.nextUrl) {
                location.href = jsonData.nextUrl;
            }
            return;
        }
        //=========================================================
        else if (
            contentType.includes("multipart/form-data")
            || contentType.includes("application/x-www-form-urlencoded")
        ) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
            await _sleep(500);
            if (formData.has("userMessage")) {
                alert(formData.get("userMessage"));
            }
            if (formData.has("nextUrl")) {
                location.href = formData.get("nextUrl");
            }
            return;
        }
        //=========================================================
        else if (contentType.includes("text/html")) {
            document.documentElement.innerHTML = await response.text();
            return;
        }
        //=========================================================
        else {
            alert(`サポートされていないデータ形式です。contentType=${contentType}`);
            return;
        }
        //=========================================================
    }
    else {
        // その他
        alert(`${response.status}: ${response.statusText}`);
        return;
    }
}
window.myFetch = myFetch;
//
//###############################################################
// フォームデータを画面に反映させる関数
function _setFormData(formData) {
    formData.forEach((value, key) => {
        // name属性の値が変数keyと等しいHTML要素を探す。
        const elements = document.getElementsByName(key);
        if (elements.length > 0) {
            // フォームに値を設定
            elements[0].value = value;
            elements[0].innerText = value;
            elements[0].checked = (value.toLowerCase() === "true") || (value === "1");
        }
        else {
            console.error(`HTML要素が見つかりません。name=${key}`);
        }
    });
    //
    // name属性を持つすべての要素を取得
    const elementsWithNameAttribute = document.querySelectorAll('[name]');
    // 取得した要素をコンソールに出力（例）
    elementsWithNameAttribute.forEach(function (element) {
        const name = element.getAttribute("name");
        if (!formData.has(name)) {
            console.error(`データが不足しています。${name}`);
        }
    });
}
//
//###############################################################

const _sleep = msec => new Promise(resolve => setTimeout(resolve, msec));