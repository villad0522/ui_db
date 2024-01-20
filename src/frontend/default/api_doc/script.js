
// ページを読み込んだら、はじめに実行する
window.addEventListener('DOMContentLoaded', async () => {
    await load();
});

// データを読み込む関数
async function load() {
    // サーバーと通信する
    const response = await window.fetch(
        "./json",
        {
            method: "GET",
            cache: "no-store",
        }
    );
    if (response.status === 500) {
        // サーバーサイドに起因するエラー
        alert(await response.text());
        return;
    }
    else if (response.status !== 200) {
        // その他
        alert(`${response.status}: ${response.statusText}`);
        return;
    }
    const jsonData = await response.json();
    console.log(jsonData);
    const listElement = document.getElementById("my_list");
    for (const endpointInfo of jsonData) {
        listElement.innerHTML += `
            <div class="col-12 col-md-6 col-lg-4" style="margin-top: 30px">
                <a href="./detail/?endpoint=${encodeURIComponent(endpointInfo.endpointPath)}">
                    <div class="card clickable">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${endpointInfo.endpointPath}&sol;????
                            </h5>
                            <p class="card-text">
                                ${endpointInfo.description}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }
}
