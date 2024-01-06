
//###############################################################
// トランザクション処理
//###############################################################

import action from "./0400_double_processing.js"; // 下層から提供されているメイン関数

//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "0200";

export default async function (command, parameters) {
    if (!command) {
        throw `[${LAYER_CODE}層] 引数「command」がNULLです`;
    }
    if (typeof command !== "string" && !(command instanceof String)) {
        throw `[${LAYER_CODE}層] 引数「command」が文字列ではありません`;
    }
    //
    // コマンドごとに場合分け
    switch (command) {
        case "START_UP":
            // トランザクション処理をしない
            // （データベースに接続する以前に、コマンドが呼び出されるため）
            return await action(command, parameters);
        case "GET_PATH":
            // トランザクション処理をしない
            // （データベースに接続する以前に、コマンドが呼び出される可能性があるため）
            return await action(command, parameters);
        case "GET_LOCAL_IP":
            // トランザクション処理をしない
            // （データベースに接続する以前に、コマンドが呼び出される可能性があるため）
            return await action(command, parameters);
        case "GET_LOCAL_URL":
            // トランザクション処理をしない
            // （データベースに接続する以前に、コマンドが呼び出される可能性があるため）
            return await action(command, parameters);
        case "CLOSE":
            // トランザクション処理をしない
            // （データベースから切断された後に、処理が行われるため）
            return await action(command, parameters);
        default:
            // トランザクション処理　あり
            await action("START_TRANSACTION", parameters);
            const result = await action(command, parameters);
            await action("END_TRANSACTION", parameters);
            return result;
    }
}
