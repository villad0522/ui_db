
//###############################################################
// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    // name属性を持つすべての要素を取得
    const elements = document.querySelectorAll('[name]');
    const nameSet = new Set();
    for (const element of elements) {
        const name = element.getAttribute("name");
        if (!name.includes("_flag") && nameSet.has(name)) {
            console.error(`【エラー】name属性が重複しています。name = ${name}`);
            break;
        }
        nameSet.add(name);
    }
    //
    // 一か所でも編集されたかどうかを記録する変数
    window.isEdit = false;
    //
    // 変更された項目を水色にする
    const formElements = document.querySelectorAll("form input, form select, form textarea");
    for (const formElement of formElements) {
        formElement.addEventListener("input", () => {
            window.isEdit = true;
        });
        formElement.addEventListener("change", () => {
            window.isEdit = true;
        });
    }
});
//
//###############################################################
// 現在のページのクエリパラメータ―を維持したまま、別のページに移動する関数
export function jumpWithQuery(url) {
    if (window.isEdit) {
        if (confirm("編集内容は破棄されます。よろしいですか？") == false) {
            return;
        }
    }
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
    window.location.href = nextUrl.origin + nextUrl.pathname + "?" + newParams.toString();
}
window.jumpWithQuery = jumpWithQuery;

//###############################################################
// サーバーと通信する関数
export async function myFetch(url, parameters) {
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
        if (key.includes("isFocus")) {
            console.log(key, value);
        }
        if (String(key).includes("_option")) {
            key = key.split("_option")[0];
            const optionValue = value;
            const selectedValue = formData.get(key);
            // name属性の値が変数keyと等しいHTML要素を探す。
            const elements = document.getElementsByName(key);
            for (const element of elements) {
                // 予測変換を設定
                const optionElement = document.createElement("option");
                optionElement.value = optionValue;
                optionElement.innerText = optionValue;
                element.appendChild(optionElement);
                if (optionValue === selectedValue) {
                    optionElement.selected = true;
                }
            }
        }
        else if (String(key).endsWith("_flag")) {
            // name属性の値が変数keyと等しいHTML要素を探す。
            const elements = document.getElementsByName(key);
            for (const element of elements) {
                if (String(value).toLowerCase() === "false") {
                    element.style.display = "none";
                }
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.checked = (value.toLowerCase() === "true") || (value === "1");
                }
            }
        }
        else {
            // name属性の値が変数keyと等しいHTML要素を探す。
            const elements = document.getElementsByName(key);
            if (elements.length === 0) {
                return;
            }
            for (const element of elements) {
                // フォームに値を設定
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.checked = (value.toLowerCase() === "true") || (value === "1");
                }
                else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.value = value ?? "";
                }
                else {
                    element.innerHTML = value ?? "";
                }
            }
        }
    });
    _setupTextarea();
}
//
//###############################################################
//
const _sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
//
//###############################################################
//
// テキストエリアの自動高さ調整をONにする関数
// フォームの初期値を読み込んだら、はじめに実行します。
let isSetupTextarea = false;
function _setupTextarea() {
    if (isSetupTextarea) return;
    isSetupTextarea = true;
    //
    // 全てのtextareaタグごとに繰り返し
    const textareaElements = document.querySelectorAll("textarea");
    for (const textareaElement of textareaElements) {
        const initFlag = textareaElement.getAttribute("init_textarea");
        if (initFlag) continue;
        textareaElement.setAttribute("init_textarea", "true");
        textareaElement.style.resize = "none";
        textareaElement.style.boxSizing = "border-box";
        //
        const dummyElement = textareaElement.cloneNode(true);
        dummyElement.style.visibility = "hidden";
        dummyElement.style.position = "absolute";
        dummyElement.style.padding = "0";
        dummyElement.style.minHeight = "0";
        dummyElement.style.height = "auto";
        dummyElement.style.overflowX = "scroll";
        dummyElement.value = "";
        dummyElement.style.lineHeight = "0";
        textareaElement.before(dummyElement);
        //
        // テキストエリアが０行の場合の高さを調べる
        // （スクロールバーとborderは含む。paddingは含まない。）
        const emptyHeight = dummyElement.offsetHeight;
        //
        dummyElement.remove();
        //
        // 高さの初期値を設定
        _setTextareaHeight(textareaElement, emptyHeight);
        //
        // inputイベントが発生するたびに関数呼び出し
        textareaElement.addEventListener("input", (event) => _setTextareaHeight(event.target, emptyHeight));
    }
}
//
// サブ関数（外部ファイルから呼び出さないで）
//     textareaの高さを調整する関数
function _setTextareaHeight(element, emptyHeight) {
    element.style.height = "auto";  // autoの指定がないと、なぜか文字を入力・削除するたびにtextareaの高さが増加してしまう
    // scrollHeightにpaddingは含まれている
    element.style.height = (element.scrollHeight + emptyHeight) + "px";
}
//
//###############################################################
