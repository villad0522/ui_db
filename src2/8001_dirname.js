
import path from 'path';
import { fileURLToPath } from 'url';

//【サブ関数】実行中のパスを取得する関数
export default function getDirName() {
    const filename = fileURLToPath(import.meta.url);
    return path.dirname(filename);
}

// このファイルは、babelによるトランスパイルの直前に置き換えられます。
//   ./src/for_commonjs/8001_dirname.js に置き換えられます。
// 置き換えは、package.json の run script によって行われます。