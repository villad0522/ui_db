
//###############################################################
// トランザクション処理
//###############################################################

import action from "./0400_double_processing.js"; // 下層から提供されているメイン関数

export default async function (command, parameters) {
    await action("START_TRANSACTION", parameters);
    // 下層のメイン関数を呼び出す
    // （下層の機能をそのまま上層に提供する）
    const result = await action(command, parameters);
    await action("END_TRANSACTION", parameters);
}
