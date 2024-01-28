// フロントエンドファイル
//
import {
  startUp,
  createColumn,
  deleteView,
  generateSQL,
  createView,
  addViewColumn,
  getSimpleSQL,
} from "./037_view_validate.js";
import {
  getLocalIp,
} from "./100_ip_address_validate.js";
import {
  getPath,
} from "./097_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./094_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./082_column_name_validate.js";
import {
  getPrimaryKey,
} from "./091_primary_key_validate.js";
import {
  clearCache,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./064_record_title_2_validate.js";
import {
  listDataTypes,
} from "./088_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./061_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./079_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./073_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./076_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./085_table_name_validate.js";
import {
  formatField,
} from "./070_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  changeInputType,
  _fillMasterData,
} from "./067_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./055_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./052_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./049_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./046_generate_sql1_validate.js";
import {
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  deletePage,
  getBreadcrumbs,
  cutPage,
  copyPage,
  pastePage,
  getCuttingPage,
  getCopyingPage,
  listAllPages,
  listStaticChildren,
  listChildrenView,
  getParentPage,
  listChildrenPage,
  _movePage,
  _generatePageSortNumber,
  _copyPage,
} from "./040_pages_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}






import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { glob } from 'glob';

let watcher = null;

// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug ); // 下層の関数を呼び出す
  //
  const customDirPath = await getPath("FRONTEND_CUSTOM");
  //
  // フォルダ「./src/frontend/custom」を削除する
  await fs.promises.rm(customDirPath, { recursive: true });
  //
  // フォルダ「./src/frontend/custom」を作成する
  if (!fs.existsSync(customDirPath)) {
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    fs.mkdirSync(customDirPath);   // フォルダが存在しなかったら、作成する
  }
  //
  // テーブルを作成する
  await reserveWord("frontend_files"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS frontend_files (
      "file_path" TEXT PRIMARY KEY,
      "file_data" BLOB NOT NULL
    );`, {},
  );
  if(!watcher){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    //
    // データベースからファイルデータを読み込んで、ローカルフォルダに書き出す
    const files = await runSqlReadOnly(
      `SELECT
          file_path AS filePath,
          file_data AS fileData
        FROM frontend_files;`,
      {},
    );
    for( const { filePath, fileData } of files ){
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      if( path.isAbsolute(filePath) ){
        throw `フロントエンドファイルについて、データベースに絶対パスが保存されていました。本来は相対パスです。`;
      }
      await createDirectories_core( filePath );  // フォルダを作成
      const fileFullPath = path.join( customDirPath, filePath );
      try{
        await fs.promises.writeFile( fileFullPath, fileData );
      }
      catch (error) {
        console.error(`\nフロントエンドファイルの書き出し中にエラーが発生しました`);
        throw error;
      }
    }
    //
    // フォルダの中身を監視する
    watcher = chokidar.watch(customDirPath, {
        ignored: /(^|[\/\\])\~\$/,  // エクセルの一時ファイルを無視（ 「~」から始まるファイル名）
        persistent: true,
    });
    //
    await new Promise((resolve, reject) => watcher.on('ready', resolve ));
    watcher.on('add', function (filePath, stats) {
      //console.log(`\nフロントエンドにファイルが追加されました。\n${filePath}`);
      _handleEditFile( filePath );
    });
    watcher.on('change', function (filePath, stats) {
      //console.log(`\nフロントエンドのファイルが編集されました。\n${filePath}`);
      _handleEditFile( filePath );
    });
    watcher.on('unlink', function (filePath) {
      //console.log(`\nフロントエンドのファイルが削除されました。\n${filePath}`);
      //_refleshFrontEndDB();
    });
    watcher.on('addDir', function (path) {
      //console.log(`\nフロントエンドにフォルダが追加されました。\n${path}`);
      // 何もしない
    });
    watcher.on('unlinkDir', function (path) {
      //console.log(`\nフロントエンドのフォルダが削除されました。\n${path}`);
      //_refleshFrontEndDB();
    });
    watcher.on('error', function (path) {
      //console.error(`\nフロントエンドフォルダの監視中にエラーが発生しました。\n${path}`);
    });
  }
}


// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  if(watcher){
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    await watcher.close();
    watcher = null;
  }
  //
  await close(); // 下層の関数を呼び出す
  //
  const customDirPath = await getPath("FRONTEND_CUSTOM");
  //
  // フォルダ「./src/frontend/custom」を削除する
  await fs.promises.rm(customDirPath, { recursive: true, force: true });
}



// フォルダを再帰的に作成
export async function createDirectories_core( filePath ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  const directories = path.dirname(filePath).split(path.sep);
  let currentPath = await getPath("FRONTEND_CUSTOM");
  for (const directory of directories) {
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    currentPath = path.join(currentPath, directory);
    if (fs.existsSync(currentPath)) continue; // フォルダが既に存在する場合
    try {
      await fs.promises.mkdir(currentPath);
    }
    catch (error) {
      console.error(`\nフォルダの作成中にエラーが発生しました`);
      throw error;
    }
  }
}


// フォルダ構造を編集されたとき
//  データベース上に存在するファイルデータを、全て書き換え
async function _refleshFrontEndDB(  ){
  try{
    await runSqlWriteOnly( `DELETE FROM frontend_files;`, {} );
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    const files = await glob( path.join(customDirPath,'/**/*') );
    for( const filePath of files ){
      await _handleEditFile( filePath );
    }
  }
  catch( error ){
    console.error(`\nエラーが発生しました`);
    console.error(`レイヤー : frontend_files`);
    console.error(`関数 : refleshFrontEndDB`);
    console.error(error);
  }
}



// ファイルが編集されたとき
async function _handleEditFile( filePath ){
  try{
    const customDirPath = await getPath("FRONTEND_CUSTOM");
    await runSqlWriteOnly(
      `INSERT OR REPLACE INTO frontend_files ( file_path, file_data )
          VALUES ( :filePath, :fileData );`,
      {
          ":filePath": path.relative( customDirPath, filePath ),
          ":fileData": await fs.promises.readFile(filePath),
      },
    );
  }
  catch( error ){
    console.error(`\nエラーが発生しました`);
    console.error(`レイヤー : frontend_files`);
    console.error(`関数 : handleEditFile`);
    console.error(error);
  }
}
