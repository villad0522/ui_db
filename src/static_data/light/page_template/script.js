
import myFetch from "/default/my_fetch.js";


// 一か所でも編集されたかどうかを記録する変数
let isEdit = false;
//
//###############################################################
// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    //await myFetch("./form" + location.search, { method: "GET" });
    //
    // 変更された項目を水色にする
    const formElements = document.querySelectorAll("form input, form select, form textarea");
    for (const formElement of formElements) {
        formElement.addEventListener("change", () => {
            formElement.style.background = "#ddffff";
            isEdit = true;
        });
    }
});
//###############################################################
// 現在のページのクエリパラメータ―を維持したまま、別のページに移動する関数
function jumpWithQuery(url) {
    if (isEdit) {
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
//
//###############################################################
// 編集スイッチが切り替えられたとき
window.handleEditSwitch = function (event) {
    jumpWithQuery(`/default/page_editor/index.html?page_id=PAGE_ID`);
    event.target.checked = false;   // スイッチを「編集ではない」に戻す
    // ↑ この処理の意義は、
    // 「編集内容は破棄されます。よろしいですか？」に
    // Noと答えた場合に、スイッチを戻すため。
}
//
//###############################################################
// 「キャンセル」ボタンがクリックされたときに実行する関数
window.cancelButton = function () {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "../index.html" + window.location.search;
}
//
//###############################################################
// 「表の名前を変更」ボタンがクリックされたときに実行する関数
window.renameButton = function () {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "./rename" + window.location.search;
}
//
//###############################################################
// テーブルがクリックされたときに実行する関数
window.tableButton = function (i) {
    // テーブル名
    let tableId = document.getElementsByName(`tables${i}_id`)[0].value;
    //
    // 別のページに移動する
    tableId = encodeURIComponent(tableId);
    window.location.href = `../records?table=${tableId}`;
}
//
//###############################################################
// ページネーションボタンの「First」がクリックされたときに実行する関数
window.paginationButtonFirst = function (arrayName) {
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", 1);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Prev」がクリックされたときに実行する関数
window.paginationButtonPrev = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("tables_pagePrev")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Next」がクリックされたときに実行する関数
window.paginationButtonNext = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("tables_pageNext")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Last」がクリックされたときに実行する関数
window.paginationButtonLast = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("tables_pageLast")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_tables", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
