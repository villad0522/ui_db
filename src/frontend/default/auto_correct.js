

// 予測変換を表示する関数
export default async function setAutoCorrect({
    inputElement,
    optionValue,  // 候補
    isInitialized,
}) {
    if (!inputElement || !optionValue) {
        throw "引数が足りません";
    }
    inputElement.setAttribute("autocomplete", "off");
    //
    // input要素の直後の要素
    let nextElement = inputElement.nextElementSibling;
    if (!isInitialized) {
        // まだ初期化していない場合
        if (nextElement && nextElement.classList.contains("prediction_outer")) {
            nextElement.remove();
        }
        nextElement = null;
    }
    //
    let dataListOuterElement;
    if (nextElement && nextElement.classList.contains("prediction_outer")) {
        // HTML要素「dataListOuterElement」が既に存在している場合
        dataListOuterElement = nextElement;
    }
    else {
        // HTML要素「dataListOuterElement」がまだ存在しない場合
        dataListOuterElement = document.createElement("div");
        dataListOuterElement.classList.add("prediction_outer");
        inputElement.after(dataListOuterElement);
        if (inputElement == document.activeElement) {
            dataListOuterElement.style.display = "block";
        }
        inputElement.onfocus = () => {
            dataListOuterElement.style.display = "block";
        }
        inputElement.onblur = () => {
            setTimeout(() => {
                dataListOuterElement.style.display = "none";
            }, 500);
        }
    }
    //
    let dataListInnerElement = dataListOuterElement.children[0];
    if (!dataListInnerElement) {
        // HTML要素「dataListInnerElement」がまだ存在しない場合
        dataListInnerElement = document.createElement("div");
        dataListInnerElement.classList.add("prediction_inner");
        dataListOuterElement.appendChild(dataListInnerElement);
    }
    //
    let selectedElement = dataListOuterElement.children[1];
    if (!selectedElement) {
        // HTML要素「selectedElement」がまだ存在しない場合
        //
        // 選択肢の上にカーソルを持っていったときに表示される要素
        // （文字数がはみ出る選択肢のために存在する）
        selectedElement = document.createElement("div");
        selectedElement.classList.add("prediction_selected");
        dataListOuterElement.appendChild(selectedElement);
        dataListInnerElement.onwheel = () => {
            selectedElement.style.display = "none";
        };
    }
    //
    const optionElement = document.createElement('div');
    optionElement.innerText = optionValue;
    dataListInnerElement.appendChild(optionElement);
    //
    optionElement.onmouseover = () => {
        selectedElement.style.display = "block";
        selectedElement.innerText = optionValue;
        const relativeY = optionElement.getBoundingClientRect().top - dataListOuterElement.getBoundingClientRect().top;
        selectedElement.style.top = relativeY + "px";
        selectedElement.onclick = () => {
            // 選択肢がクリックされたとき
            inputElement.value = optionValue;
            const event = new Event('input', {
                bubbles: true,
                cancelable: true,
            });
            inputElement.dispatchEvent(event);
        };
    };
    //
    optionElement.onclick = () => {
        // 選択肢がクリックされたとき
        inputElement.value = optionValue;
        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        inputElement.dispatchEvent(event);
    };
}
