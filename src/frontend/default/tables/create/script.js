
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

//###############################################################
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await myFetch("../form" + location.search, { method: "GET" });
});
//
//###############################################################