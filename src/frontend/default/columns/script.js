
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
});
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
