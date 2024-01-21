
//################################################################

//１行の高さ(px)
const ROW_HEIGHT = 45;

var isLoading = false;
var isSetup = false;
var startWithColumn = "rowid";
var firstValue = null;  // 現時点で読み込み済みのデータの中で、一番上のデータ
var lastValue = null; // 現時点で読み込み済みのデータの中で、一番下のデータ
var isFirstTerminal = false; // 上端までロード済みか否か
var isLastTerminal = false;  // 下端までロード済みか否か

//
// 戻るボタンで表示されたときに、キャッシュを採用しない
window.onbeforeunload = function () {
    // IE用。ここは空でOKです
};
window.onunload = function () {
    // IE以外用。ここは空でOKです
};
window.addEventListener('pageshow', () => {
    if (window.performance.navigation.type == 2) location.reload();
});

// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => {
        window.addEventListener("scroll", handleScroll);
    }, 3000);
    await _setTable({ isBottomLoad: true });
});


async function _setTable({ isBottomLoad = true }) {
    if (isLoading) return;
    isLoading = true;
    //
    const isAscending = true;
    if (isBottomLoad) {
        // 下にスクロールしながら読み込む場合
        if (isLastTerminal) {
            // 既に下端に到達していたら、何もしない
            isLoading = false;
            return;
        }
    }
    else {
        // 上にスクロールしながら読み込む場合
        if (isFirstTerminal) {
            // 既に下端に到達していたら、何もしない
            isLoading = false;
            return;
        }
    }
    const tbodyElement = document.querySelector("tbody");
    //theadElement.innerHTML = "";
    //tbodyElement.innerHTML = "";
    //
    // 受け取ったクエリパラメータ
    const queryParams1 = new URLSearchParams(location.search);
    let isFilter = queryParams1.get("is_filter");
    if (String(isFilter).toLowerCase() == "false") {
        isFilter = false;
    }
    else if (isFilter == "0") {
        isFilter = false;
    }
    else if (!isFilter) {
        isFilter = false;
    }
    else {
        isFilter = true;
    }
    //「isFilter」がfalseの場合は、全ての行を表示したうえで、クエリパラメータに一致する行だけをハイライト表示する。
    //「isFilter」がtrueの場合は、クエリパラメータに一致する行だけを表示する。
    const tableName = queryParams1.get("table");
    queryParams1.delete("table");
    if (!tableName) {
        alert("クエリパラメータに「table」が指定されていません");
        isLoading = false;
        return;
    }
    document.title = tableName;
    const isDebugMode = queryParams1.get("is_debug");
    //
    //
    // サーバーに送信するクエリパラメータ
    let queryParams2 = new URLSearchParams();
    if (isFilter) {
        queryParams2 = new URLSearchParams(location.search);
    }
    if (isSetup == false && isFilter == false) {
        // ハイライトモードの初回読み込み時には、
        // クエリパラメータでフィルタリングしたターゲットを起点に読み込む
        queryParams2 = new URLSearchParams(location.search);
        queryParams2.set("is_start_with_filter", true);
    }
    else if (isSetup == false) {
        isFirstTerminal = true;
    }
    queryParams2.delete("is_debug");
    queryParams2.delete("is_filter");
    queryParams2.delete("table");
    queryParams2.set("is_ascending", !(isAscending ^ isBottomLoad));
    if (isBottomLoad) {
        // 下にスクロールしながら読み込む場合
        if (lastValue) {
            queryParams2.set("start_with_column", startWithColumn);
            queryParams2.set("start_with_value", lastValue);
        }
    }
    else {
        // 上にスクロールしながら読み込む場合
        if (firstValue) {
            queryParams2.set("start_with_column", startWithColumn);
            queryParams2.set("start_with_value", firstValue);
        }
    }
    //
    // サーバーからデータを取得
    const res = await window.fetch(
        "/backend/" + tableName + "?" + queryParams2.toString(),
        {
            method: "GET",
            headers: {},
            cache: "no-store",
        }
    );
    if (res.status == 500) {
        alert(await res.text());
        isLoading = false;
        return;
    }
    else if (res.status != 200) {
        alert(res.status + " : " + res.statusText);
        isLoading = false;
        return;
    }
    const resData = await res.json();
    console.log(resData);
    const { columns, rows, primaryKey, titleColumnName, isTerminal, applicationCode } = resData;
    //
    startWithColumn = primaryKey;
    if ((rows.length == 0) && (isSetup == false)) {
        // 「データが１件もありません」を表示する
        document.getElementById("no_data").style.display = "block";
    }
    else {
        document.getElementById("no_data").style.display = "none";
    }
    //
    if (rows.length >= 1) {
        if (isSetup == false) {
            // 初回読み込み時
            //
            firstValue = rows[0][startWithColumn];
            console.log("firstValue: " + firstValue);
            // 現時点で読み込み済みのデータの中で、一番上のデータ
            //
            lastValue = rows[rows.length - 1][startWithColumn];
            console.log("lastValue: " + lastValue);
            // 現時点で読み込み済みのデータの中で、一番下のデータ
        }
        else {
            if (isBottomLoad) {
                // 下にスクロールしながら読み込む場合
                lastValue = rows[rows.length - 1][startWithColumn];
                console.log("lastValue: " + lastValue);
                // 現時点で読み込み済みのデータの中で、一番下のデータ
            }
            else {
                // 上にスクロールしながら読み込む場合
                firstValue = rows[rows.length - 1][startWithColumn];
                console.log("firstValue: " + firstValue);
                // 現時点で読み込み済みのデータの中で、一番上のデータ
            }
        }
    }
    //
    // タイトルを一番左に、プライマリキーを一番右に移動させる
    const columnNames = [];
    if (titleColumnName) {
        columnNames.push(titleColumnName);
    }
    for (const columnName in columns) {
        if (columnName == titleColumnName) continue;
        if (columnName == primaryKey) continue;
        columnNames.push(columnName);
    }
    if (primaryKey) {
        columnNames.push(primaryKey);
    }
    //
    if (isSetup == false) {
        //########################################################
        // 一番上の行（thead）を作る
        //
        const theadElement = document.querySelector("thead");
        const trElement = document.createElement("tr");
        theadElement.appendChild(trElement);
        //
        for (const columnName of columnNames) {
            const columnInfo = columns[columnName];
            const thElement = document.createElement("th");
            if (columnName == titleColumnName) {
                thElement.classList.add("title_column");
            }
            trElement.appendChild(thElement);
            const labelElement = document.createElement("label");
            if (columnInfo["displayName"]) {
                labelElement.innerText = columnInfo["displayName"];
                if (isDebugMode) {
                    labelElement.innerHTML += `<br>(${columnName})`;
                }
            }
            else {
                labelElement.innerText = columnName;
            }
            thElement.appendChild(labelElement);
        }
        const thElement = document.createElement("th");
        trElement.appendChild(thElement);
        const divElement = document.createElement("div");
        trElement.appendChild(divElement);
    }
    //
    // クエリパラメータを除外したURL
    const tableUrlWithoutQuery = window.location.protocol + "//" + window.location.host + window.location.pathname;
    const editUrlWithoutQuery = window.location.protocol + "//" + window.location.host + "/frontend/form/APP_" + applicationCode + "/" + tableName + ".html";
    //
    //########################################################
    // 二行目移行（tbody）を作る
    //
    // 行ごとのループ ここから
    for (const row of rows) {
        const trElement = document.createElement("tr");
        if (isBottomLoad) {
            // 下にスクロールしながら読み込む場合
            tbodyElement.appendChild(trElement);
        }
        else {
            // 上にスクロールしながら読み込む場合
            tbodyElement.prepend(trElement);
        }
        //
        let isMatchCondition = true;    // 条件に合っているかどうか
        let isCondition = false;    // ハイライト用の条件が存在するかどうか
        //
        let rowId = row[primaryKey];
        if (!primaryKey) {
            rowId = createUuid();
        }
        //
        // 列ごとのループ ここから
        for (let j = 0; j < columnNames.length; j++) {
            const columnName = columnNames[j];
            const columnInfo = columns[columnName];
            //
            if (queryParams2.get(columnName)) {
                isCondition = true;
                if (queryParams2.get(columnName) != row[columnName]) {
                    isMatchCondition = false;
                }
            }
            //
            let tdElement;
            if ((j == 0) && (columnName == titleColumnName)) {
                tdElement = document.createElement("th");
                tdElement.classList.add("title_column");
            }
            else {
                tdElement = document.createElement("td");
            }
            trElement.appendChild(tdElement);
            //
            let value = row[columnName];
            if (columnInfo?.foreignKey) {
                value = row[columnName + "_TITLE"] ?? value;
            }
            if ((typeof value == "number") && (value > 315500400000)) {
                const date = new Date(value);
                value = formatDate(date, 'yyyy年MM月dd日(week)HH時mm分ss秒', 'jp');
                tdElement.style.maxWidth = "none";
            }
            //
            if (columnInfo?.foreignKey) {
                const parentId = row[columnName];
                const url = tableUrlWithoutQuery + "?is_filter=false"
                    + "&table=" + encodeURIComponent(columnInfo.parentTable)
                    + "&" + columnInfo.parentColumn + "=" + encodeURIComponent(parentId);
                //
                const linkElement = document.createElement("a");
                linkElement.href = url;
                linkElement.innerText = value;
                tdElement.appendChild(linkElement);
            }
            else {
                const labelElement = document.createElement("label");
                labelElement.setAttribute("for", rowId);
                labelElement.innerText = value;
                tdElement.appendChild(labelElement);
            }
        }
        // 列ごとのループ ここまで
        //
        const tdElement = document.createElement("td");
        tdElement.classList.add("button_box");
        trElement.appendChild(tdElement);
        //
        if (primaryKey) {
            const editButtonElement = document.createElement("a");
            editButtonElement.innerText = "編集";
            editButtonElement.classList.add("button_flat");
            editButtonElement.href = editUrlWithoutQuery
                + "?primary_key=" + encodeURIComponent(primaryKey)
                + "&primary_value=" + encodeURIComponent(rowId);
            tdElement.appendChild(editButtonElement);
            //
            // 削除ボタン
            const deleteButtonElement = document.createElement("button");
            deleteButtonElement.innerText = "削除";
            deleteButtonElement.classList.add("button_flat");
            deleteButtonElement.addEventListener("click", async () => {
                await handleDelete({
                    tableName,
                    primaryKey,
                    targets: [rowId],
                })
            });
            tdElement.appendChild(deleteButtonElement);
        }
        //
        const backgroundElement = document.createElement("div");
        backgroundElement.classList.add("row_background");
        trElement.appendChild(backgroundElement);
        //
        const checkboxElement = document.createElement("input");
        checkboxElement.classList.add("row_checkbox");
        checkboxElement.type = "checkbox";
        checkboxElement.id = rowId;
        checkboxElement.addEventListener("change", updateBottomBar);
        backgroundElement.appendChild(checkboxElement);
        if (isCondition && (!isFilter) && isMatchCondition) {
            // ハイライトをつける
            checkboxElement.checked = true;
            //
            if (isSetup == false) {
                // 初回読み込み時
                window.setTimeout(() => {
                    trElement.scrollIntoView({
                        block: 'center',
                    });
                }, 100);
            }
        }
        //
        const divElement = document.createElement("div");
        backgroundElement.appendChild(divElement);
    }
    // 行ごとのループ ここまで
    //
    if (isTerminal) {
        if (isBottomLoad) {
            // 下にスクロールしながら読み込む場合
            console.log("データを末尾まで読み込みました");
            isLastTerminal = true;  // 下端までロード済み
        }
        else {
            // 上にスクロールしながら読み込む場合
            console.log("データを先頭まで読み込みました");
            isFirstTerminal = true; // 上端までロード済み
        }
    }
    //
    if (!isBottomLoad && !isTerminal) {
        // 上にスクロールしながら読み込む場合
        // 相対位置で指定してスクロール
        window.scrollBy(0, ROW_HEIGHT * rows.length);
        // １行の高さ(px) × 表の行数
    }
    //
    //
    // 追加ボタン
    const addButton = document.getElementsByClassName("add_button")[0];
    const url = window.location.protocol + "//" + window.location.host + "/frontend/form/APP_" + applicationCode + "/" + tableName + ".html";
    addButton.setAttribute("href", url);
    //
    // 選択解除ボタン
    const deselectButton = document.getElementById("deselect_button");
    deselectButton.addEventListener("click", () => {
        const selectedCheckboxes = document.querySelectorAll(".row_checkbox:checked");
        for (const selectedCheckbox of selectedCheckboxes) {
            selectedCheckbox.checked = false;
        }
        updateBottomBar();
    });
    //
    if (primaryKey) {
        //
        // 削除ボタン
        const deleteButton = document.getElementById("delete_button");
        deleteButton.addEventListener("click", () => handleDelete({
            tableName,
            primaryKey,
            targets: [...document.querySelectorAll(".row_checkbox:checked")].map(element => element.id),
        }));
        //
        // 編集ボタン
        const editButton = document.getElementById("edit_button");
        editButton.addEventListener("click", () => handleEdit({ applicationCode, tableName, primaryKey }));
    }
    //
    updateBottomBar();
    isSetup = true;
    isLoading = false;
}

//################################################################

async function handleDelete({ tableName, primaryKey, targets }) {
    if (targets.length == 0) {
        return;
    }
    else if (targets.length == 1) {
        if (!confirm("本当に削除しますか？")) {
            return;
        }
    }
    else {
        if (!confirm(`本当に${targets.length}件のデータを削除しますか？`)) {
            return;
        }
    }
    //
    let url = window.location.protocol + "//" + window.location.host + "/backend/" + tableName;
    // 削除対象を示す列
    url += "?target_column_name=" + encodeURIComponent(primaryKey);
    for (let i = 0; i < targets.length; i++) {
        // 削除対象を示すデータ
        url += "&target_cell" + i + "=" + encodeURIComponent(targets[i]);
    }
    //
    // サーバーからデータを削除
    const res = await window.fetch(
        url,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            cache: "no-store",
        }
    );
    if (res.status == 500) {
        alert(await res.text());
        return;
    }
    else if (res.status == 409) {
        alert(await res.text());
        return;
    }
    else if (res.status != 200) {
        alert(res.status + " : " + res.statusText);
        return;
    }
    alert(await res.text());
    location.reload();
}

//################################################################

function updateBottomBar() {
    const selectedCheckboxes = document.querySelectorAll(".row_checkbox:checked");
    //
    // 選択した件数
    const selectNumber = selectedCheckboxes.length;
    //
    // 選択した件数
    const selectNumberElement = document.getElementById("select_number");
    selectNumberElement.innerText = selectNumber + "件を選択中";
    //
    // 編集ボタン
    const editButton = document.getElementById("edit_button");
    if (selectNumber == 1) {
        editButton.style.display = "inline-block";
    }
    else {
        editButton.style.display = "none";
    }
    //
    // 削除ボタン
    const deleteButton = document.getElementById("delete_button");
    if (selectNumber == 1) {
        deleteButton.innerText = "削除";
    }
    else if (selectNumber >= 2) {
        deleteButton.innerText = "まとめて削除";
    }
    //
    // 画面下部のバーを表示
    const bottomBar = document.getElementById("bottom_bar");
    if (selectNumber >= 1) {
        bottomBar.classList.add("selected");
    }
    else {
        bottomBar.classList.remove("selected");
    }
}

// 画面下部の編集ボタンを押したときの処理
//  （画面右側のボタンではない）
function handleEdit({ applicationCode, tableName, primaryKey }) {
    // クエリパラメータを除外したURL
    const urlWithoutQuery = window.location.protocol + "//" + window.location.host + "/frontend/form/APP_" + applicationCode + "/" + tableName + ".html";
    //
    const selectedCheckbox = document.querySelector(".row_checkbox:checked");
    if (!selectedCheckbox) {
        updateBottomBar();
    }
    window.location.href = urlWithoutQuery
        + "?primary_key=" + encodeURIComponent(primaryKey)
        + "&primary_value=" + encodeURIComponent(selectedCheckbox.id);
}

//################################################################

// スクロールしたときに実行する処理
async function handleScroll(event) {
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollBottom = scrollTop + clientHeight;
    //
    if (scrollTop < 100) {
        console.log("スクロールが上端に達した");
        await _setTable({ isBottomLoad: false });
    }
    else if (scrollBottom > scrollHeight - 100) {
        console.log("スクロールが下端に達した");
        await _setTable({ isBottomLoad: true });
    }
}

//################################################################

// UUIDを生成する
function createUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (a) {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0, v = a == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//################################################################
function formatDate(date, format, type = 'jp') {
    const week = {
        'jp': ['日', '月', '火', '水', '木', '金', '土'],
        'en': ['Sun', 'Mon', 'Tue', ' Wed', ' Thu', ' Fri', ' Sat']
    };
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    format = format.replace(/week/g, week[type][date.getDay()]);
    return format;
};

//################################################################