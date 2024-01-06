
//【定数】このJavaScriptファイルの階層番号
const LAYER_CODE = "9999";

// このJavaScriptファイルでのメイン関数
export default async function (command, parameters) {
    // エラーを発生させる
    throw `[${LAYER_CODE}層] コマンドが処理されないまま、プログラムの最下層に到達しました。command=${command}`;
}
