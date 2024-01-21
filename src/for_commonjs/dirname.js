"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getDirName;
//【サブ関数】実行中のパスを取得する関数
function getDirName() {
    return process.cwd();
}

// このファイルは、babelによるトランスパイルの直前に置き換えられます。
//   ./src/dirname.js と置き換えられます。
// 置き換えは、package.json の run script によって行われます。