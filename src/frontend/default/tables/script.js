
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
});
//
//###############################################################
// ファイルがアップロードされたときに実行する関数
window.sendFile = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    const file = formData.get("input_file"); // File APIの使用
    const fileName = file.name
    const fileExtention = fileName.substring(fileName.lastIndexOf(".") + 1);
    const blob = file.slice(0, file.size, file.type);
    const encodedFileName = encodeURI(file.name.substring(0, fileName.lastIndexOf("."))); //エンコードしたファイル名の取得
    const renamedFile = new File([blob], encodedFileName + "." + fileExtention, { type: file.type });
    formData.set('input_file', renamedFile);
    await myFetch(
        "/upload",
        {
            "method": "POST",
            "body": formData,
        }
    );
}
//
//###############################################################
// テーブルがクリックされたときに実行する関数
window.tableButton = function (i) {
    // テーブルID
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
