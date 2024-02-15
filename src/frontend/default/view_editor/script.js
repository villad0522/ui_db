
import { myFetch, jumpWithQuery } from "/default/my_lib.js";

// ページを読み込んだら、はじめに実行する関数
window.addEventListener('DOMContentLoaded', async () => {
    const formData = await myFetch("./form", { method: "GET" });
    document.body.style.visibility = "visible";
    //
    // タブの上部の名前を書き換える
    //   （iframeの外側を書き換える）
    //   （ビューの名前を変更した直後に、変更を親へ伝えるため。）
    const params = new URL(location.href).searchParams;
    const viewIndex = params.get("view_index");
    if (isNaN(viewIndex) || viewIndex === null || viewIndex === undefined) {
        alert("クエリパラメータ―「view_index」が指定されていません");
        return;
    }
    if (!formData.has("viewName")) {
        alert("サーバーから「viewName」を取得できませんでした");
        return;
    }
    const viewName = formData.get("viewName");
    if (!viewName && viewName !== "") {
        alert("サーバーから「viewName」を取得できませんでした");
        return;
    }
    const tabElements = window.parent.document.getElementsByName(`views${viewIndex}_name`);
    for (const tabElement of tabElements) {
        tabElement.innerText = String(viewName);
    }
});


window.handleDeleteView = async () => {
    await myFetch('./delete_view/form');
    //
    // タブを非表示にする
    //   （iframeの外側を書き換える）
    const params = new URL(location.href).searchParams;
    const viewIndex = params.get("view_index");
    if (isNaN(viewIndex)) {
        alert("クエリパラメータ―「view_index」が指定されていません");
        return;
    }
    const flagElements = window.parent.document.getElementsByName(`views${viewIndex}_flag`);
    for (const flagElement of flagElements) {
        flagElement.checked = false;
    }
}


window.handleDeleteViewColumn = async (j) => {
    if (!confirm("列を削除しますか？")) {
        return;
    }
    const viewColumnIdElement = document.getElementsByName(`viewColumns${j}_viewColumnId`)[0];
    const viewColumnId = viewColumnIdElement.value;
    await myFetch(`./delete_view_column/form?view_column=${viewColumnId}`);
    location.reload();
}

window.handleToRightViewColumn = async (j) => {
    const viewColumnIdElement = document.getElementsByName(`viewColumns${j}_viewColumnId`)[0];
    const viewColumnId = viewColumnIdElement.value;
    await myFetch(`./reorder_view_column_right/form?view_column=${viewColumnId}`);
    location.reload();
}

window.handleToLeftViewColumn = async (j) => {
    const viewColumnIdElement = document.getElementsByName(`viewColumns${j}_viewColumnId`)[0];
    const viewColumnId = viewColumnIdElement.value;
    await myFetch(`./reorder_view_column_left/form?view_column=${viewColumnId}`);
    location.reload();
}