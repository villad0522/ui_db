
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
});
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
