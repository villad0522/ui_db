
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
    //
    //---------------------------------------------------------------
    // 以前開いていたスクロール位置を読み込む
    const scrollXText = sessionStorage.getItem("scrollX");
    const scrollYText = sessionStorage.getItem("scrollY");
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
            sessionStorage.setItem("scrollX", document.documentElement.scrollLeft);
            sessionStorage.setItem("scrollY", document.documentElement.scrollTop);
        }, 300);
    });
    //---------------------------------------------------------------
    //
    document.body.style.visibility = "visible";
    //
    //---------------------------------------------------------------
});
//
//###############################################################
// 編集スイッチが切り替えられたとき
window.handleEditSwitch = function (event, pageId) {
    jumpWithQuery(`/default/page_editor/index.html?page_id=${pageId}`);
    event.target.checked = false;   // スイッチを「編集中ではない」に戻す
    // ↑ この処理の意義は、
    // 「編集内容は破棄されます。よろしいですか？」に
    // Noと答えた場合に、スイッチを戻すため。
}
//
//###############################################################
// レコードの削除ボタンが押されたとき
window.handleDeleteButton = async function (viewId, i) {
    const recordId = document.getElementsByName(`view${viewId}_${i}_id`)[0].value;
    await myFetch(`./delete_record/form?view_id=${viewId}&record_id=${recordId}`);
}
//
//###############################################################
// 抽出条件の削除ボタンが押されたとき
window.deleteCondition = async function (viewId, i) {
    const conditionId = document.getElementsByName(`extraction${viewId}_${i}_conditionId`)[0].value;
    await myFetch(`/default/conditions/delete_condition/form?view=${viewId}&condition=${conditionId}`);
}
//
//###############################################################
// 動的ボタンがクリックされたときに実行する関数
window.clickDynamicButton = function (event, childPageId, pageId, columnId) {
    let value = event.target.children[0].innerText;
    value = encodeURIComponent(value);
    jumpWithQuery(`/custom/${childPageId}/index.html?p${pageId}${columnId}=${value}`);
}
//
//###############################################################
// ページネーションボタンの「First」がクリックされたときに実行する関数
window.paginationButtonFirst = function (viewId) {
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(`page_view${viewId}_`, 1);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Prev」がクリックされたときに実行する関数
window.paginationButtonPrev = function (viewId) {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName(`view${viewId}__pagePrev`)[0].innerText;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(`page_view${viewId}_`, pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Next」がクリックされたときに実行する関数
window.paginationButtonNext = function (viewId) {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName(`view${viewId}__pageNext`)[0].innerText;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(`page_view${viewId}_`, pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
// ページネーションボタンの「Last」がクリックされたときに実行する関数
window.paginationButtonLast = function (viewId) {
    // 次に進むべきページ番号
    const pageNumber = document.getElementsByName(`view${viewId}__pageLast`)[0].value;
    // クエリパラメータ―を作成
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(`page_view${viewId}_`, pageNumber);
    // ページを再読み込み
    window.location.href = "./?" + searchParams.toString();
}
//
//###############################################################
