'use strict';
import { main } from "./0100_main.js";

async function trueMain() {
    try {
        await main({ isDebug: false });
    }
    catch (err) {
        console.error(err);
    }
}

trueMain();