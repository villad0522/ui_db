
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    //---------------------------------------------------------------
    const searchParams = new URLSearchParams(location.search);
    const tableId = searchParams.get("table");
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
    await myFetch("../form?table=" + tableId, { method: "GET" });
    setTimeout(() => {
        document.body.style.visibility = "visible";
    }, 100);
    //---------------------------------------------------------------
});
//###############################################################
