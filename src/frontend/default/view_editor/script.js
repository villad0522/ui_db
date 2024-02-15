
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("./form", { method: "GET" });
    document.body.style.visibility = "visible";
});

