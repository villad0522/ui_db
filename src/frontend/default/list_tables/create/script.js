
//###############################################################
// 初期データを読み込む関数
async function load() {
    // サーバーと通信する
    const response = await window.fetch(
        "/default/list_tables/form" + location.search,
        {
            method: "GET",
            cache: "no-store",
        }
    );
    if ((200 <= response.status && response.status <= 299) || (response.status === 400)) {
        // 成功 または リクエストが正しくない
        const contentType = response.headers.get("content-type");
        console.log(contentType);
        if (String(contentType).includes("text/plain")) {
            alert(await response.text());
        }
        else if (String(contentType).includes("application/json")) {
            const jsonData = await response.json();
            if (jsonData.userMessage) {
                alert(jsonData.userMessage);
            }
            if (jsonData.nextUrl) {
                location.href = jsonData.nextUrl;
            }
        }
        else if (String(contentType).includes("multipart/form-data")) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
        }
        else if (String(contentType).includes("application/x-www-form-urlencoded")) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
        }
    }
    else if (response.status === 500) {
        // サーバーサイドに起因するエラー
        alert(await response.text());
    }
    else {
        // その他
        alert(`${response.status}: ${response.statusText}`);
    }
}

// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await load();
});
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
// 一か所でも編集されたかどうかを記録する変数
let isEdit = false;
//
// 変更された項目を水色にする
const formElements = document.querySelectorAll("input,select,textarea");
for (const formElement of formElements) {
    formElement.addEventListener("change", () => {
        formElement.style.background = "#ddffff";
        isEdit = true;
    });
}
//
//###############################################################
// 「戻る」ボタンがクリックされたときに実行する関数
function backButton() {
    if (isEdit) {
        if (confirm("編集内容は破棄されます。よろしいですか？") == false) {
            return;
        }
    }
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "../index.html" + window.location.search;
}
//
//###############################################################
// 「表の名前を変更」ボタンがクリックされたときに実行する関数
function renameButton() {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "./rename.html" + window.location.search;
}
//
//###############################################################
// テーブルがクリックされたときに実行する関数
function tableButton(i) {
    // テーブル名
    let tableId = document.getElementsByName(`main${i}_id`)[0].value;
    //
    // 別のページに移動する
    tableId = encodeURIComponent(tableId);
    window.location.href = `../list_record.html?table=${tableId}`;
}
//
//###############################################################
// 「キャンセル」ボタンがクリックされたときに実行する関数
function cancelButton() {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "./index.html" + window.location.search;
}
//
//###############################################################
// 「決定」ボタンがクリックされたときに実行する関数
async function submitButton() {
    // サーバーと通信する
    const response = await window.fetch(
        "./form" + location.search,
        {
            method: "POST",
            cache: "no-store",
            body: new FormData(document.forms[0]),
        }
    );
    if ((200 <= response.status && response.status <= 299) || (response.status === 400)) {
        // 成功 または リクエストが正しくない
        const contentType = response.headers.get("content-type");
        console.log(contentType);
        if (String(contentType).includes("text/plain")) {
            alert(await response.text());
        }
        else if (String(contentType).includes("application/json")) {
            const jsonData = await response.json();
            if (jsonData.userMessage) {
                alert(jsonData.userMessage);
            }
            if (jsonData.nextUrl) {
                location.href = jsonData.nextUrl;
            }
        }
        else if (String(contentType).includes("multipart/form-data")) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
        }
        else if (String(contentType).includes("application/x-www-form-urlencoded")) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
        }
    }
    else if (response.status === 500) {
        // サーバーサイドに起因するエラー
        alert(await response.text());
    }
    else {
        // その他
        alert(`${response.status}: ${response.statusText}`);
    }
}
//
//###############################################################
// ページネーションボタンの「First」がクリックされたときに実行する関数
function paginationButtonFirst(arrayName) {
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_main", 1);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Prev」がクリックされたときに実行する関数
function paginationButtonPrev() {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("main_pagePrev")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_main", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Next」がクリックされたときに実行する関数
function paginationButtonNext() {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("main_pageNext")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_main", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Last」がクリックされたときに実行する関数
function paginationButtonLast() {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("main_pageLast")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_main", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
