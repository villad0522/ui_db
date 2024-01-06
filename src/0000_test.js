'use strict';
import action from "./0100_main.js";

setTimeout(async () => {
    try {
        await action("START_UP", { isDebug: true });
        //
        {
            const res = await action("TEST_FRAMEWORK", { targetLayer: "7900" });
            console.log(res.userMessage);
        }
    }
    catch (err) {
        console.error(err);
    }
    console.log("テストが終了しました");
    process.exit();
}, 4000);