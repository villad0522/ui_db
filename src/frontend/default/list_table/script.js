
//###############################################################

// 初期データを読み込む関数
async function load() {
    // サーバーと通信する
    const response = await window.fetch(
        "./json_data" + location.search,
        {
            method: "GET",
            cache: "no-store",
        }
    );
    if (response.status === 500) {
        alert(await response.text());
        return;
    }
    else if (response.status !== 200) {
        alert(`${response.status}: ${response.statusText}`);
        return;
    }
    const formData = await response.formData();
    _setFormData(formData); // フォームデータを画面に反映させる
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
// コピーボタンがクリックされたときに実行する関数
async function copyButton(number) {
    // HTML要素のname属性
    const elementName = "mainArrayId" + number;
    //
    // テーブル名
    const tableName = document.getElementsByName(elementName)[0].value;
    //
    // サーバーと通信する
    const response = await window.fetch(
        "/copy_table/json_data",
        {
            method: "POST",
            cache: "no-store",
            body: {
                tableName: tableName,
            },
        }
    );
    if (response.status === 500) {
        alert(await response.text());
        return;
    }
    else if (response.status !== 200) {
        alert(`${response.status}: ${response.statusText}`);
        return;
    }
    alert(await response.text());
    location.reload();
}
//
//###############################################################
// 削除ボタンがクリックされたときに実行する関数
async function deleteButton(number) {
    // HTML要素のname属性
    const elementName = "mainArrayId" + number;
    //
    // テーブル名
    const tableName = document.getElementsByName(elementName)[0].value;
    //
    // サーバーと通信する
    const response = await window.fetch(
        "/delete_table/json_data",
        {
            method: "POST",
            cache: "no-store",
            body: {
                tableName: tableName,
            },
        }
    );
    if (response.status === 500) {
        alert(await response.text());
        return;
    }
    else if (response.status !== 200) {
        alert(`${response.status}: ${response.statusText}`);
        return;
    }
    alert(await response.text());
    location.reload();
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
    window.location.href = "./index.html" + window.location.search;
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
