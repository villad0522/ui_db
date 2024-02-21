
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    //---------------------------------------------------------------
    const searchParams = new URLSearchParams(location.search);
    const tableId = searchParams.get("table");
    const pageNumber = searchParams.get("page_records") ?? 1;
    if (!tableId) {
        // 前のページに戻る
        location.href = "/default/tables/index.html";
        setTimeout(() => {
            alert("クエリパラメータ―に「table」が設定されていません");
        }, 1000);
        return;
    }
    //
    //---------------------------------------------------------------
    const formData = await myFetch("./form?table=" + tableId, { method: "GET" });
    //
    //---------------------------------------------------------------
    // スクロール位置を保存する
    let pastScrollTime = 0;
    let timerId = null;
    window.addEventListener("scroll", () => {
        const nowTime = new Date().getTime();
        if (nowTime - pastScrollTime < 200) return;
        if (timerId) {
            window.clearTimeout(timerId);
            timerId = null;
        }
        timerId = window.setTimeout(() => {
            sessionStorage.setItem("scrollX" + tableId + pageNumber, document.documentElement.scrollLeft);
            sessionStorage.setItem("scrollY" + tableId + pageNumber, document.documentElement.scrollTop);
        }, 300);
    });
    //
    const recordOffset = Number(formData.get("recordOffset"));
    if (recordOffset >= 0) {
        // フォーカス中の場所にスクロールする
        const trElement = document.getElementById("offset" + recordOffset);
        trElement.scrollIntoView({
            behavior: "instant", // スクロールを単一のジャンプで即座に行う
            block: "center",
        });
    }
    else {
        // 以前開いていたスクロール位置を読み込む
        const scrollXText = sessionStorage.getItem("scrollX" + tableId + pageNumber);
        const scrollYText = sessionStorage.getItem("scrollY" + tableId + pageNumber);
        if (scrollXText && scrollYText) {
            const scrollX = Number(scrollXText);
            const scrollY = Number(scrollYText);
            if (!isNaN(scrollX) && !isNaN(scrollY)) {
                window.scroll({
                    top: scrollY,
                    left: scrollX,
                    behavior: "instant", // スクロールを単一のジャンプで即座に行う
                });
            }
        }
    }
    //
    //---------------------------------------------------------------
    //
    document.body.style.visibility = "visible";
    //
    //---------------------------------------------------------------
});
//
//#####################################################################
// テーブルを丸ごと削除する関数
window.handleDeleteTable = async function () {
    if (!confirm("本当に削除しますか？この操作は二度と元に戻せません。")) return;
    await myFetch('./delete_table/json');
}
//
//###############################################################
// レコードIDを取得する関数
window.getRecordId = function (i) {
    const recordId = document.getElementsByName(`records${i}_id`)[0].innerText;
    return recordId;
}
//
//###############################################################
// ページネーションボタンの「First」がクリックされたときに実行する関数
window.paginationButtonFirst = function (arrayName) {
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_records", 1);
    searchParams.delete("record");
    searchParams.delete("paste");
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Prev」がクリックされたときに実行する関数
window.paginationButtonPrev = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("records_pagePrev")[0].innerText;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_records", pageNumber);
    searchParams.delete("record");
    searchParams.delete("paste");
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Next」がクリックされたときに実行する関数
window.paginationButtonNext = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("records_pageNext")[0].innerText;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_records", pageNumber);
    searchParams.delete("record");
    searchParams.delete("paste");
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Last」がクリックされたときに実行する関数
window.paginationButtonLast = function () {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName("records_pageLast")[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page_records", pageNumber);
    searchParams.delete("record");
    searchParams.delete("paste");
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################