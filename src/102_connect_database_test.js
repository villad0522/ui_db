import fs from 'fs';
import path from 'path';
import {
  getPath,
} from "./106_directory_validate.js";
import {
  getLocalIp,
} from "./109_ip_address_validate.js";
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
  destroyCSV,  // インポートを中断する関数
} from "./103_connect_database_validate.js";
import { setBugMode } from "./104_connect_database.js";


export async function test102() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 32; i++ ) {
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
    console.log(`レイヤー「connect_database」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    await getDebugMode();
    await startTransaction();
    await endTransaction();
    await close();
    //
    //
    await startUp("http://localhost:3000/", true);
    //
    // CSVファイルに書き込むデータ
    const data = [
        ['John Doe', 25, 'New York'],
        ['Jane Smith', 30, 'San Francisco'],
        ['Bob Johnson', 22, 'Los Angeles']
    ];
    const csvText = data.map(row => row.join(',')).join('\n');
    //
    // CSVファイルのパス
    const cachePath = await getPath("CACHE");
    const csvFilePath = path.join(cachePath, 'test.csv');
    //
    // CSVファイルを作成してデータを書き込む
    await fs.promises.writeFile(csvFilePath, csvText, 'utf8');
    //
    // CSVファイルからデータベースに読み込む
    await createRecordsFromCsv(csvFilePath);
    //
    // テーブルから読み出す
    const matrix = await runSqlReadOnly(`SELECT * FROM csv_data;`,{});
    if (matrix.length !== data.length) {
        console.log(matrix);
        throw `インポートしたはずの件数と合致しません`;
    }
    if (matrix[0]["c0"] !== data[0][0]) {
        console.log(matrix);
        throw `インポートしたはずの内容と合致しません`;
    }
    //
    // CSVファイルを削除
    await fs.promises.rm(csvFilePath);
    //
    // テスト用のテーブルを削除
    await runSqlWriteOnly(`
        DROP TABLE IF EXISTS csv_data;
    `,{});
    //
    // わざと再接続
    await startUp("localhost:3000", true);
    //
    await close();

}