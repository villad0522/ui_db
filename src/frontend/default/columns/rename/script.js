
import myFetch from "/default/my_lib.js";

// 一か所でも編集されたかどうかを記録する変数
let isEdit = false;
//
//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("../form" + location.search, { method: "GET" });
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
    window.location.href = "../index.html" + window.location.search;
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