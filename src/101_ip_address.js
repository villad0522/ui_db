// IPアドレス
//


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}


import { networkInterfaces } from "os";

// ローカルサーバーのURL
let myLocalUrl = "";

// プログラム起動
export async function startUp_core( localUrl ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  if (!myLocalUrl) {
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    // まだ未設定
    if (!localUrl) {
        throw `パラメーター「localUrl」がNULLです`;
    }
    myLocalUrl = localUrl;
  }
}

// ローカルIPアドレスを取得する関数
export async function getLocalIp_core(  ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  const nets = networkInterfaces();
    for (const key in nets) {
        if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
        for (const net of nets[key] ?? []) {
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            if (net['family'] == "IPv4") {
                if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
                return net.address;
            }
        }
    }
    throw `ローカルIPアドレスを取得できませんでした`;
}
