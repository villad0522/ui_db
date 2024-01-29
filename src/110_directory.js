// ディレクトリ
//
import {
  startUp,
  getLocalIp,
} from "./112_ip_address_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import path from 'path';
import fs from 'fs';
import getDirName from './dirname.js';

// ディレクトリのパスを提供する関数
export async function getPath_core( directoryCode ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    // コマンドごとに場合分け
    switch (directoryCode) {
        case "FRONTEND":
            if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "frontend"); // 開発環境の場合
            }
            else {
                if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "frontend"); // 本番環境の場合
            }
        case "FRONTEND_CUSTOM":
            if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "frontend/custom"); // 開発環境の場合
            }
            else {
                if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "frontend/custom"); // 本番環境の場合
            }
        case "FRONTEND_DEFAULT":
            if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "frontend/default"); // 開発環境の場合
            }
            else {
                if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "frontend/default"); // 本番環境の場合
            }
        case "STATIC_DATA":
            if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "static_data"); // 開発環境の場合
            }
            else {
                if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "static_data"); // 本番環境の場合
            }
        case "CACHE":
            if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "cache"); // 開発環境の場合
            }
            else {
                if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "cache"); // 本番環境の場合
            }
        case "SAVEDATA":
            if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
            if (_isDevelop()) {
                if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "savedata"); // 開発環境の場合
            }
            else {
                if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
                return path.join(getDirName(), "savedata"); // 本番環境の場合
            }
        case "SHARE":
            if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
            return "C:\\Users\\Public\\Documents\\ui_db";
        default:
            throw `パラメーター「directoryCode」にサポートされていない値が指定されています。directoryCode=${directoryCode}`;
    }
}

// プログラム起動
export async function startUp_core( localUrl ){
  if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
  //
  if (_isDevelop() === false) {
      if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
      // 本番環境の場合
      const exeFilePath = path.join(getDirName(), 'office_system.exe');
      if (!fs.existsSync(exeFilePath)) {
          throw `カレントディレクトリが不正です。exeファイルと同じ場所から起動してください。`;
      }
  }
  //
  await startUp(localUrl);   // 下層の関数を呼び出す
  //
  const frontendPath = await getPath_core("FRONTEND");
  if (!fs.existsSync(frontendPath)) {
      if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
      await _mkdir(frontendPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const frontendCustomPath = await getPath_core("FRONTEND_CUSTOM");
  if (!fs.existsSync(frontendCustomPath)) {
      if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
      await _mkdir(frontendCustomPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const frontendDefaultPath = await getPath_core("FRONTEND_DEFAULT");
  if (!fs.existsSync(frontendDefaultPath)) {
      if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
      await _mkdir(frontendDefaultPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const staticPath = await getPath_core("STATIC_DATA");
  if (!fs.existsSync(staticPath)) {
      throw `staticフォルダが存在しません`;
  }
  //
  const cachePath = await getPath_core("CACHE");
  if (!fs.existsSync(cachePath)) {
      if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
      await _mkdir(cachePath);   // フォルダが存在しなかったら、作成する
  }
  //
  const saveDataPath = await getPath_core("SAVEDATA");
  if (!fs.existsSync(saveDataPath)) {
      if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
      await _mkdir(saveDataPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const documentPath = "C:\\Users\\Public\\Documents";
  if (!fs.existsSync(documentPath)) {
      throw `エクセルファイルの保存先フォルダが存在しません ${documentPath}`;
  }
  //
  const sharePath = await getPath_core("SHARE");
  if (!fs.existsSync(sharePath)) {
      if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
      await _mkdir(sharePath);   // フォルダが存在しなかったら、作成する
  }
}

async function _mkdir(path) {
    try {
        await fs.promises.mkdir(path);
    }
    catch (err) {
        throw `フォルダを作成できませんでした。${path}`;
    }
}


//【サブ関数】開発環境か本番環境かを判別する関数
function _isDevelop() {
    if (process.pkg) {
        return false;   // 本番環境
    }
    else {
        return true;    // 開発環境
    }
}