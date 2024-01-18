// IPアドレス
//

import { networkInterfaces } from "os";

// ローカルサーバーのURL
let myLocalUrl = "";

// プログラム起動
export async function startUp_core( localUrl ){
  if (!myLocalUrl) {
    // まだ未設定
    if (!localUrl) {
        throw `パラメーター「localUrl」がNULLです`;
    }
    myLocalUrl = localUrl;
  }
}

// ローカルIPアドレスを取得する関数
export async function getLocalIp_core(  ){
  const nets = networkInterfaces();
    for (const key in nets) {
        for (const net of nets[key] ?? []) {
            if (net['family'] == "IPv4") {
                return net.address;
            }
        }
    }
    throw `ローカルIPアドレスを取得できませんでした`;
}
