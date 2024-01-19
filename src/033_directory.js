// ディレクトリ
//
import {
  startUp,
  getLocalIp,
} from "./034_ip_address_test.js";

import path from 'path';
import fs from 'fs';
import getDirName from './dirname.js';

// ディレクトリのパスを提供する関数
export async function getPath_core( directoryCode ){
    // コマンドごとに場合分け
    switch (directoryCode) {
        case "FRONTEND":
            if (_isDevelop()) {
                return path.join(getDirName(), "frontend"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "frontend"); // 本番環境の場合
            }
        case "FRONTEND_CUSTOM":
            if (_isDevelop()) {
                return path.join(getDirName(), "frontend/custom"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "frontend/custom"); // 本番環境の場合
            }
        case "FRONTEND_DEFAULT":
            if (_isDevelop()) {
                return path.join(getDirName(), "frontend/default"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "frontend/default"); // 本番環境の場合
            }
        case "STATIC_DATA":
            if (_isDevelop()) {
                return path.join(getDirName(), "static_data"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "static_data"); // 本番環境の場合
            }
        case "CACHE":
            if (_isDevelop()) {
                return path.join(getDirName(), "cache"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "cache"); // 本番環境の場合
            }
        case "SAVEDATA":
            if (_isDevelop()) {
                return path.join(getDirName(), "savedata"); // 開発環境の場合
            }
            else {
                return path.join(getDirName(), "savedata"); // 本番環境の場合
            }
        case "SHARE":
            return "C:\\Users\\Public\\Documents\\ui_db";
        default:
            throw `パラメーター「directoryCode」にサポートされていない値が指定されています。directoryCode=${directoryCode}`;
    }
}

// プログラム起動
export async function startUp_core( localUrl ){
  //
  if (_isDevelop() === false) {
      // 本番環境の場合
      const exeFilePath = path.join(getDirName(), 'office_system.exe');
      if (!fs.existsSync(exeFilePath)) {
          throw `カレントディレクトリが不正です。exeファイルと同じ場所から起動してください。`;
      }
  }
  //
  await startUp(localUrl);   // 下層の関数を呼び出す
  //
  const frontendPath = await getPath("FRONTEND");
  if (!fs.existsSync(frontendPath)) {
      await _mkdir(frontendPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const frontendCustomPath = await getPath("FRONTEND_CUSTOM");
  if (!fs.existsSync(frontendCustomPath)) {
      await _mkdir(frontendCustomPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const frontendDefaultPath = await getPath("FRONTEND_DEFAULT");
  if (!fs.existsSync(frontendDefaultPath)) {
      await _mkdir(frontendDefaultPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const staticPath = await getPath("STATIC_DATA");
  if (!fs.existsSync(staticPath)) {
      throw `staticフォルダが存在しません`;
  }
  //
  const cachePath = await getPath("CACHE");
  if (!fs.existsSync(cachePath)) {
      await _mkdir(cachePath);   // フォルダが存在しなかったら、作成する
  }
  //
  const saveDataPath = await getPath("SAVEDATA");
  if (!fs.existsSync(saveDataPath)) {
      await _mkdir(saveDataPath);   // フォルダが存在しなかったら、作成する
  }
  //
  const documentPath = "C:\\Users\\Public\\Documents";
  if (!fs.existsSync(documentPath)) {
      throw `エクセルファイルの保存先フォルダが存在しません ${documentPath}`;
  }
  //
  const sharePath = await getPath("SHARE");
  if (!fs.existsSync(sharePath)) {
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