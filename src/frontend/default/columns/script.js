
import myFetch from "/default/my_fetch.js";

// 一か所でも編集されたかどうかを記録する変数
let isEdit = false;
//
//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
    //
    // 変更された項目を水色にする
    const formElements = document.querySelectorAll("input,select,textarea");
    for (const formElement of formElements) {
        formElement.addEventListener("change", () => {
            formElement.style.background = "#ddffff";
            isEdit = true;
        });
    }
});
//###############################################################
// 「戻る」ボタンがクリックされたときに実行する関数
window.backButton = function () {
    if (isEdit) {
        if (confirm("編集内容は破棄されます。よろしいですか？") == false) {
            return;
        }
    }
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "/default/tables/index.html" + window.location.search;
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
// 「作成」ボタンがクリックされたときに実行する関数
window.createButton = function () {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "./create" + window.location.search;
}
//
//###############################################################
// 「名前を変更」ボタンがクリックされたときに実行する関数
window.renameButton = function () {
    // 現在のページのクエリパラメータ―を維持したまま、別のページに移動する
    window.location.href = "./rename" + window.location.search;
}
//
//###############################################################
// 列がクリックされたときに実行する関数
window.tableButton = function (i) {
    // テーブル名
    let tableId = document.getElementsByName(`columns${i}_id`)[0].value;
    //
    // 別のページに移動する
    tableId = encodeURIComponent(tableId);
    window.location.href = `./records?table=${tableId}`;
}
//
//###############################################################
// ページネーションボタンの「First」がクリックされたときに実行する関数
window.paginationButtonFirst = function (arrayName) {
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_columns", 1);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Prev」がクリックされたときに実行する関数
window.paginationButtonPrev = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("columns_pagePrev")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_columns", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Next」がクリックされたときに実行する関数
window.paginationButtonNext = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("columns_pageNext")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_columns", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Last」がクリックされたときに実行する関数
window.paginationButtonLast = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("columns_pageLast")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_columns", pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
