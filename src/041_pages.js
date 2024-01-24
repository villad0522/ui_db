// ページの管理
//
import {
  startUp,
} from "./058_sort_validate.js";
import {
  getLocalIp,
} from "./094_ip_address_validate.js";
import {
  getPath,
} from "./091_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
  close,
} from "./088_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./076_column_name_validate.js";
import {
  getPrimaryKey,
} from "./085_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./067_relation_validate.js";
import {
  listDataTypes,
} from "./082_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./061_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./073_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./064_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
} from "./079_table_name_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./070_record_title_2_validate.js";
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
  generateSQL,
} from "./043_generate_sql_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  //
  // テーブルを作成する
  await reserveWord("pages"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS pages (
      "page_id" INTEGER PRIMARY KEY AUTOINCREMENT,
      "static_parent_id" INTEGER,
      "dynamic_parent_id" INTEGER UNIQUE,
      "page_name" TEXT NOT NULL,
      "memo" TEXT NOT NULL DEFAULT '',
      "sort_number" REAL NOT NULL DEFAULT 1,
      "created_at" INTEGER UNIQUE,
      FOREIGN KEY (static_parent_id) REFERENCES pages(page_id),
      FOREIGN KEY (dynamic_parent_id) REFERENCES joined_tables(joined_table_id)
    );`, {},
  );
  await reserveWord("joined_tables"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS joined_tables (
      "joined_table_id" INTEGER PRIMARY KEY,
      "page_id" INTEGER NOT NULL,
      "table_id" TEXT NOT NULL,
      "sql_query" TEXT NOT NULL,
      "one_page_max_size" NUMBER NOT NULL DEFAULT 23,
      "joined_table_type" TEXT NOT NULL DEFAULT 'TABLE',
      "sort_number" REAL NOT NULL DEFAULT 1,
      "created_at" INTEGER UNIQUE,
      FOREIGN KEY (page_id) REFERENCES pages(page_id)
    );`, {},
  );
}


// joined_table_type
//   ・ICONS
//   ・TABLE
//   ・CARDS_LANDSCAPE
//   ・CARDS_SQUARE


// 木構造の整合性を確認
async function _checkTree(){
  const matrix1 = await runSqlReadOnly(
    `SELECT * FROM pages
      WHERE static_parent_id IS NOT NULL
      AND dynamic_parent_id IS NOT NULL;`, {},
  );
  if(matrix1.length>0){
    console.error(`親を複数もつページがあります`);
  }
}



// ページを作成
export async function createPage_core( parentPageId, pageName, isInJoinedTable ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  const timestamp = new Date().getTime();
  if( isInJoinedTable ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 動的リストの子を作る場合
    if(!parentPageId){
      throw `親ページが指定されていません`;
    }
    await runSqlWriteOnly(
      `INSERT INTO pages( dynamic_parent_id, page_name, created_at )
          VALUES ( :dynamicParentId, :pageName, :createdAt );`,
      {
        ":dynamicParentId": parentPageId,
        ":pageName": pageName,
        ":createdAt": timestamp,    // 作成日時
      },
    );
  }
  else {
    if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    // 静的メニューの子を作る場合
    if(parentPageId){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      // 親ページが存在する場合
      await runSqlWriteOnly(
        `INSERT INTO pages( static_parent_id, page_name, created_at )
            VALUES ( :staticParentId, :pageName, :createdAt );`,
        {
          ":staticParentId": parentPageId,
          ":pageName": pageName,
          ":createdAt": timestamp,    // 作成日時
        },
      );
    }
    else{
      if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
      // トップメニューに追加する場合
      await runSqlWriteOnly(
        `INSERT INTO pages( page_name, created_at )
            VALUES ( :pageName, :createdAt );`,
        {
          ":pageName": pageName,
          ":createdAt": timestamp,    // 作成日時
        },
      );
    }
  }
  // ページIDを取得する
  const pages = await runSqlReadOnly(
    `SELECT page_id AS pageId
      FROM pages
      WHERE created_at = :createdAt
      LIMIT 1;`,
    {
      ":createdAt": timestamp,    // 作成日時
    },
  );
  if(pages.length===0){
    throw "登録したはずのページが見つかりません。";
  }
  const pageId = pages[0]["pageId"];
  if(isNaN(pageId)){
    throw "新しく発行されたページIDが見つかりません。";
  }
  await _checkTree();
  return {
    pageId: pageId,
  };
}


// ページ名やメモを変更
export async function updatePageName_core( pages ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  for (const { id, name, memo } of pages ) {
    if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
      `UPDATE pages
          SET page_name = :pageName,
            memo = :memo
          WHERE page_id = :pageId;`,
      {
          ":pageId": id,
          ":pageName": name,
          ":memo": memo,
      },
    );
  }
  return "ページ名を変更しました";
}



// １ページの情報を取得
export async function getPageInfo_core( pageId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
  if( !pageId ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // トップページの情報を取得する場合
    const staticPages = await runSqlReadOnly(
      `SELECT 
          page_id AS id,
          page_name AS name
        FROM pages
        WHERE static_parent_id IS NULL
          AND dynamic_parent_id IS NULL
        ORDER BY sort_number ASC;`,
      {},
    );
    return {
      "pageId": 0,
      "pageName": "トップ",
      "memo": "",
      "tableId": null,
      "joinedTableType": "NONE",
      "parentPages": [],
      "staticPages": staticPages,
      "dynamicPages": [],
    };
  }
  // トップページ以外の情報を取得する場合
  const pages = await runSqlReadOnly(
    `SELECT 
        pages.page_id AS pageId,
        pages.page_name AS pageName,
        pages.memo AS memo,
        joined_tables.page_id AS parentPageId
      FROM pages
      LEFT OUTER JOIN joined_tables
        ON pages.dynamic_parent_id = joined_tables.joined_table_id
      WHERE pages.page_id = :pageId
      LIMIT 1;`,
    {
      ":pageId": pageId,    // 作成日時
    },
  );
  if(pages.length===0){
    throw "ページが見つかりません。";
  }
  const pageInfo = pages[0];
  //
  // 子ページの情報を取得する
  const childrenPages = await runSqlReadOnly(
    `SELECT 
        page_id AS id,
        page_name AS name,
        dynamic_parent_id IS NOT NULL AS isDynamic
      FROM pages
      WHERE static_parent_id = :pageId
        OR dynamic_parent_id = :pageId
      ORDER BY static_parent_id ASC, sort_number ASC;`,
    {
      ":pageId": pageId,
    },
  );
  const staticPages = [];
  const dynamicPages = [];
  for( const { id, name, isDynamic } of childrenPages ){
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    if( isDynamic ){
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      dynamicPages.push({
        id: id,
        name: name,
      });
    }
    else{
      if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
      staticPages.push({
        id: id,
        name: name,
      });
    }
  }
  return {
    "pageId": pageInfo["pageId"],
    "pageName": pageInfo["pageName"],
    "memo": pageInfo["memo"] ?? "",
    "tableId": pageInfo["tableId"] ?? null,
    "joinedTableType": pageInfo["joinedTableType"] ?? "NONE",
    "parentPages": parentPages,
    "staticPages": staticPages,
    "dynamicPages": dynamicPages,
  };
}



// テーブルIDからページIDを取得する
export async function listPagesFromTableId_core( tableId ){
  if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
  const pages = await runSqlReadOnly(
    `SELECT page_id AS pageId
      FROM joined_tables
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,    // 作成日時
    },
  );
  return pages.map( ({ pageId }) => pageId );
}



// ページIDからテーブルIDを取得する
export async function getTableFromPage_core( pageId ){
  if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
  const pages = await runSqlReadOnly(
    `SELECT table_id AS tableId
      FROM joined_tables
      WHERE page_id = :pageId;`,
    {
      ":pageId": pageId,
    },
  );
  if( pages.length===0 ){
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    return null;
  }
  return pages[0].tableId;
}




// 結合済みテーブルを作成
export async function createJoinedTable_core( pageId, tableId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
  const timestamp = new Date().getTime();
  await runSqlWriteOnly(
    `INSERT INTO joined_tables( page_id, table_id, created_at )
        VALUES ( :pageId, :tableId, :createdAt );`,
    {
      ":pageId": pageId,
      ":tableId": tableId,
      ":createdAt": timestamp,    // 作成日時
    },
  );
  // IDを取得する
  const pages = await runSqlReadOnly(
    `SELECT joined_table_id AS joinedTableId
      FROM joined_tables
      WHERE created_at = :createdAt
      LIMIT 1;`,
    {
      ":createdAt": timestamp,    // 作成日時
    },
  );
  if(pages.length===0){
    throw "登録したはずのページが見つかりません。";
  }
  const joinedTableId = pages[0]["joinedTableId"];
  if(isNaN(joinedTableId)){
    throw "新しく発行されたjoinedTableIdが見つかりません。";
  }
  await _checkTree();
  return {
    joinedTableId: joinedTableId,
  };
}




// 結合済みテーブルを削除
export async function deleteJoinedTable_core( joinedTableId ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}




// ページを削除
export async function deletePage_core( pageId ){
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}



// パンくずリストを再帰的に取得
export async function getBreadcrumbs_core( pageId ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
  if( pageId===0 ){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    // トップページの情報を取得する場合
    return [{
      "pageId": 0,
      "pageName": "トップ",
    }];
  }
  // トップページ以外の情報を取得する場合
  const pages = await runSqlReadOnly(
    `SELECT 
        pages.page_name AS pageName,
        pages.static_parent_id AS parentPageId1,
        joined_tables.page_id AS parentPageId2
      FROM pages
      LEFT OUTER JOIN joined_tables
        ON pages.dynamic_parent_id = joined_tables.joined_table_id
      WHERE pages.page_id = :pageId
      LIMIT 1;`,
    {
      ":pageId": pageId,
    },
  );
  if(pages.length===0){
    throw "ページが見つかりません。";
  }
  // 親ページのID
  const parentPageId1 = pages[0]["parentPageId1"];
  const parentPageId2 = pages[0]["parentPageId2"];
  if( pageId===parentPageId1 || pageId===parentPageId2 ){
    throw `ページIDの循環参照が発生しました。\npageId = ${pageId}`;
  }
  let list = [];
  if( parentPageId1 ){
    if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    // 関数を再帰呼び出し
    list = await getBreadcrumbs_core( parentPageId1 );
  }
  else if( parentPageId2 ){
    if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
    // 関数を再帰呼び出し
    list = await getBreadcrumbs_core( parentPageId2 );
  }
  else{
    if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    // 関数を再帰呼び出し
    list = await getBreadcrumbs_core( 0 );
  }
  return [
    ...list,
    {
      "pageId": pageId,
      "pageName": pages[0]["pageName"],
    }
  ];
}

// ページを切り取る
export async function cutPage_core( pageId ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// ページをコピーする
export async function copyPage_core( pageId ){
  if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// ページを貼り付ける
export async function pastePage_core( parentPageId, afterPageId ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// 切り取り中のページを取得する
export async function getCuttingPage_core(  ){
  if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}

// コピー中のページを取得する
export async function getCopyingPage_core(  ){
  if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
  throw "この関数は未実装です。";
}
