
async function clearCache() {
    // サーバーと通信する
    const response = await window.fetch(
        "./clear_cache/json" + location.search,
        {
            method: "POST",
            cache: "no-store",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({}),
        }
    );
    if ((200 <= response.status && response.status <= 299) || (response.status === 400) || (response.status === 415)) {
        // 成功 または リクエストが正しくない
        const contentType = response.headers.get("content-type");
        console.log(contentType);
        if (String(contentType).includes("text/plain")) {
            alert(await response.text());
        }
        else if (String(contentType).includes("application/json")) {
            const jsonData = await response.json();
            if (jsonData.userMessage) {
                alert(jsonData.userMessage);
            }
            if (jsonData.nextUrl) {
                location.href = jsonData.nextUrl;
            }
        }
        else if (String(contentType).includes("multipart/form-data")) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
        }
        else if (String(contentType).includes("application/x-www-form-urlencoded")) {
            const formData = await response.formData();
            _setFormData(formData); // フォームデータを画面に反映させる
        }
        else {
            alert(`${response.status}: ${response.statusText}`);
        }
    }
    else if (response.status === 500) {
        // サーバーサイドに起因するエラー
        alert(await response.text());
    }
    else {
        // その他
        alert(`${response.status}: ${response.statusText}`);
    }
}
