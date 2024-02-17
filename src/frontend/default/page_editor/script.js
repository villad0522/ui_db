
import { myFetch, jumpWithQuery } from "/default/my_lib.js";


//###############################################################
// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form" + location.search, { method: "GET" });
});
//###############################################################
// UI編集スイッチが切り替えられたとき
window.handleEditSwitch = function (event) {
    const params = new URL(location.href).searchParams;
    const pageId = params.get("page_id");
    if (isNaN(pageId)) {
        alert("クエリパラメータ―「page_id」が指定されていません");
        return;
    }
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
// Excelを開く関数
window.openExcel = function (i) {
    const params = new URL(location.href).searchParams;
    const pageId = params.get("page_id");
    if (isNaN(pageId)) {
        alert("クエリパラメータ―「page_id」が指定されていません");
        return;
    }
    jumpWithQuery('/open_excel/' + pageId, { isNewTab: true });
}
//
//###############################################################

