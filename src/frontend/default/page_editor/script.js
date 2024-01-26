
import myFetch from "/default/my_fetch.js";


// 一か所でも編集されたかどうかを記録する変数
let isEdit = false;
//
//###############################################################
// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
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
window.jumpWithQuery = function (url) {
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
// UI編集スイッチが切り替えられたとき
window.handleEditSwitch = function (event) {
    const params = new URL(location.href).searchParams;
    const pageId = params.get("page_id");
    jumpWithQuery(`/custom/${pageId}/index.html`);
    event.target.checked = true;   // スイッチを「編集中」に戻す
    // ↑ この処理の意義は、
    // 「編集内容は破棄されます。よろしいですか？」に
    // Noと答えた場合に、スイッチを戻すため。
}
//
//###############################################################
// パンくずリストをクリックしたときに実行する関数
window.breadcrumbButton = function (i) {
    const pageId = document.getElementsByName(`breadcrumbs${i}_pageId`)[0].value;
    jumpWithQuery(`./?page_id=${pageId}`);
}
//
//###############################################################
// 子ページのIDを取得する関数
window.getChildPageId = function (i) {
    const pageId = document.getElementsByName(`staticChildren${i}_pageId`)[0].value;
    return pageId;
}
//
//###############################################################