import {
  getPath,
} from "./048_directory_validate.js";
import {
  getLocalIp,
} from "./051_ip_address_validate.js";
import {
  startUp,  // プログラム起動
  getDebugMode,  // デバッグモード判定
  startTransaction,  // トランザクション処理開始
  endTransaction,  // トランザクション処理終了
  runSqlReadOnly,  // SQLクエリ実行（読み取り専用）
  runSqlWriteOnly,  // SQLクエリ実行（書き込み専用）
  createRecordsFromCsv,  // CSVファイルインポート
  getCsvProgress,  // インポートの進捗状況を取得する関数
  close,  // バックエンドプログラム終了
} from "./045_connect_database_validate.js";
import { setBugMode } from "./046_connect_database.js";


export async function test044() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 13; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「connect_database」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「connect_database」からバグは見つかりませんでした。また、意図的に${ i }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
}