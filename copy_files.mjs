// フォルダの中身のファイルを丸ごとコピーするプログラム。
// 既に存在するファイルは上書きせず、スキップする。
// コンパイルのときに使う。
//
// 【使い方】
// node ./copy_files.js コピー元のフォルダ コピー先のフォルダ

import { promises as fs, existsSync } from 'fs';
import path from 'path';

try {
    if (process.argv.length <= 3) {
        throw "引数が足りません";
    }
    const src = process.argv[2];
    const dest = process.argv[3];
    const mode = process.argv[4];
    if ((mode != "-no-overwrite") || (!existsSync(dest))) {
        await copyFolder(src, dest);
    }
} catch (error) {
    console.error(`Failed to copy folder: ${error}`);
}

async function copyFolder(src, dest) {
    const entries = await fs.readdir(src, { withFileTypes: true });
    await fs.mkdir(dest, { recursive: true });
    for (let entry of entries) {
        process.stdout.write('*');
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            // ディレクトリの場合、再帰的にコピー
            await copyFolder(srcPath, destPath);
        } else if (entry.isFile()) {
            // ファイルの場合、既に存在しないか確認
            if (existsSync(destPath)) {
                // 既に存在する場合は上書きせず、スキップする
            }
            else {
                // ファイルをコピーする
                await fs.copyFile(srcPath, destPath);
            }
        }
    }
}
