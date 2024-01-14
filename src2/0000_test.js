'use strict';
import action from "./0200_transaction.js";
import { main, endProcess } from "./0100_main.js";

async function test() {
    try {
        await main({ isDebug: true });
        {
            const res = await action("TEST_FRAMEWORK", { targetLayer: "7900" });
            console.log(res.userMessage);
        }
    }
    catch (err) {
        console.error(err);
    }
    console.log("\n\nテストが終了しました\n");
    await endProcess();
}

test();