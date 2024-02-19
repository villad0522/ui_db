
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

let progressBar;
let progressMainMessage;
let progressSubMessage;

// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    progressBar = document.getElementById("progress_bar");
    progressMainMessage = document.getElementById("progress_main_message");
    progressSubMessage = document.getElementById("progress_sub_message");
    await updateProgress();
});


async function updateProgress() {
    try {
        const response = await window.fetch(
            "./get_progress/json",
            {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status !== 200) {
            alert(await response.text());
            return;
        }
        const data = await response.json();
        const progressMessage = data.progressMessage;
        const progress = data.progress;
        const rowSize = data.rowSize;
        let percent = 0;
        if (rowSize > 0) {
            percent = progress / rowSize * 100;
        }
        //
        progressBar.setAttribute("aria-valuenow", percent);
        progressBar.style.width = percent + "%";
        //
        progressMainMessage.innerText = progressMessage;
        progressSubMessage.innerHTML = `${progress} / ${rowSize} 行`;
        //
        if (progress === rowSize && rowSize > 0) {
            const searchParams = new URLSearchParams(location.search);
            const tableId = searchParams.get("table");
            window.setTimeout(() => {
                location.href = `/default/records/index.html?table=${tableId}`;
            }, 500);
        }
    }
    catch (err) {
        console.error(err);
    }
    window.setTimeout(updateProgress, 1000);
}



window.destroyProgress = async function () {
    try {
        const response = await window.fetch(
            "./stop_progress/json",
            {
                method: "POST",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status !== 200) {
            alert(await response.text());
            return;
        }
        const data = await response.json();
        alert(data.userMessage);
    }
    catch (err) {
        console.error(err);
    }
}