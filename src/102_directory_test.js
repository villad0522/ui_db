import fs from 'fs';
import path from 'path';
import {
  getLocalIp,
} from "./106_ip_address_validate.js";
import {
  getPath,  // ディレクトリのパスを提供する関数
  startUp,  // プログラム起動
} from "./103_directory_validate.js";
import { setBugMode } from "./104_directory.js";


export async function test102() {
    setBugMode(0);    // バグを混入させない（通常動作）
    await _test();  // テストを実行（意図的にバグを混入させない）
    let i;
    for ( i = 1; i <= 28; i++ ) {
        setBugMode(i);      // 意図的にバグを混入させる
        try {
            await _test();  // 意図的にバグを混入させてテストを実行
        }
        catch (err) {
            continue;   // 意図的に埋め込んだバグを正常に検出できた場合
        }
        // 意図的に埋め込んだバグを検出できなかった場合
        setBugMode(0);    // 意図的なバグの発生を止める
        console.log(`レイヤー「directory」からバグは見つかりませんでしたが、テストコードが不十分です。意図的に発生させたバグ(bugMode: ${ i })を検出できませんでした。\n\n`);
        return;
    }
    // 意図的に埋め込んだ全てのバグを、正常に検出できた
    setBugMode(0);    // 意図的なバグの発生を止める
    console.log(`レイヤー「directory」からバグは見つかりませんでした。また、意図的に${ i-1 }件のバグを発生させたところ、全てのバグを検知できました。\n\n`);
    return;
}


// このレイヤーの動作テストを実行する関数
async function _test(){
    
  await startUp("http://localhost:3000/");
  //
  if ( !fs.existsSync( await getPath("FRONTEND") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if ( !fs.existsSync( await getPath("FRONTEND_CUSTOM") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if ( !fs.existsSync( await getPath("FRONTEND_DEFAULT") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if ( !fs.existsSync( await getPath("STATIC_DATA") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if ( !fs.existsSync( await getPath("CACHE") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if ( !fs.existsSync( await getPath("SAVEDATA") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }
  if ( !fs.existsSync( await getPath("SHARE") ) ){
    throw "関数が想定通りの動作をしませんでした。";
  }

}