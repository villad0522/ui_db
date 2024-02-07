
let progressBarSuccess;
let progressBarError;
let progressMainMessage;
let progressSubMessage;

// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    progressBarSuccess = document.getElementById("progress_bar_success");
    progressBarError = document.getElementById("progress_bar_error");
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
        const successCount = data.successCount;
        const errorCount = data.errorCount;
        const csvSize = data.csvSize;
        let percentSuccess = 0;
        let percentError = 0;
        if (csvSize > 0) {
            percentSuccess = successCount / csvSize * 100;
            percentError = errorCount / csvSize * 100;
        }
        //
        progressBarSuccess.setAttribute("aria-valuenow", percentSuccess);
        progressBarSuccess.style.width = percentSuccess + "%";
        //
        progressBarError.setAttribute("aria-valuenow", percentError);
        progressBarError.style.width = percentError + "%";
        //
        progressMainMessage.innerText = progressMessage;
        progressSubMessage.innerHTML = `失敗: ${errorCount}行&emsp;&emsp;成功: ${successCount}行&emsp;&emsp;全体: ${csvSize}行`;
        //
        if ((successCount + errorCount) === csvSize && csvSize >= 0) {
            window.setTimeout(() => {
                location.href = "/default/tables/index.html";
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
            "./destroy_progress/json",
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