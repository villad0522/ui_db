import fs from 'fs';
import path from 'path';
import {
  startUp,
  close,
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./130_connect_database_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getTimestamp,  // 協定世界時(UTC)のタイムスタンプを取得する
} from "./127_timezone_validate.js";
import { setBugMode } from "./128_timezone.js";


export async function test126() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    await close();
    let i;
    for ( i = 1; i <= 2; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            // 意図的に埋め込んだバグを正常に検出できた場合。
            while(true){
                try{
                    // 次のテストに影響を与えないように、データベースを閉じる。
                    await close();
                }
                catch(err) {}
                break;
            }
            continue;
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「timezone」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「timezone」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
    await startUp("http://localhost:3000/", true);
    //
    // 「1970/1/1 09:00:00」は日本標準時とする。
    // また、node.jsが日本標準時であることを自動認識してくれるものとする。
    const date = new Date("1970-1-1 09:00:00");
    const timestamp = await getTimestamp( date );
    // 日本標準時で「1970/1/1 09:00:00」を入力した場合は、
    // 協定世界時の「1970/1/1 00:00:00」を表すタイムスタンプ「0」をシステム上で扱う。
    if(timestamp!==0){
        throw "サーバー内の時刻が想定外です。";
    }
    //
    const [{timeText}] = await runSqlReadOnly(`SELECT datetime(0,'unixepoch','localtime') AS timeText;`,{});
    if(timeText!=="1970-01-01 09:00:00"){
        throw `サーバー内の時刻が想定外です。\n現実 ${timeText}`;
    }
    //
    const inputTexts = [
        "2007-05-19 12:56:00",
        "1950-11-03 08:24:51",
        "2005-08-17 15:40:22",
        "2014-02-28 19:12:05",
        "1960-06-11 10:35:44",
        "2066-10-29 04:58:33",
        "2018-04-06 21:07:16",
        "2100-09-25 07:53:59",
        "2008-12-14 23:19:28",
        "2012-07-08 13:46:37",
    ];
    for( const inputText of inputTexts ){
        const timestamp = await getTimestamp( new Date(inputText) );
        if( isNaN(timestamp) ){
            throw `サーバー内の時刻が想定外です。\nタイムスタンプ ${timestamp}`;
        }
        const matrix = await runSqlReadOnly(
            `SELECT strftime( '%Y-%m-%d %H:%M:%S', :timestamp / 1000, 'unixepoch', 'localtime' ) AS timeText;`,
            {
                ":timestamp": timestamp,
            }
        );
        if( matrix[0]["timeText"] !== inputText ){
            throw `サーバー内の時刻が想定外です。\n理想 ${inputText}\n現実 ${JSON.stringify(matrix,null,2)}`;
        }
    }
    await close();

}