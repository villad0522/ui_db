// ページの管理
//
import {
  startUp,
  close,
} from "./037_frontend_files_validate.js";
import {
  getLocalIp,
} from "./091_ip_address_validate.js";
import {
  getPath,
} from "./088_directory_validate.js";
import {
  getDebugMode,
  startTransaction,
  endTransaction,
  createRecordsFromCsv,
  getCsvProgress,
} from "./085_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./073_column_name_validate.js";
import {
  getPrimaryKey,
} from "./082_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./064_relation_validate.js";
import {
  listDataTypes,
} from "./079_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  autoCorrect,
} from "./040_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
} from "./070_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
} from "./061_search_text_validate.js";
import {
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./067_record_title_2_validate.js";
import {
  checkTableEnabled,
  getTableName,
} from "./076_table_name_validate.js";
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
      "dynamic_parent_id" INTEGER,
      "page_name" TEXT NOT NULL,
      "memo" TEXT NOT NULL DEFAULT '',
      "sort_number" REAL NOT NULL DEFAULT 1,
      "created_at" INTEGER UNIQUE,
      FOREIGN KEY (static_parent_id) REFERENCES pages(page_id),
      FOREIGN KEY (dynamic_parent_id) REFERENCES dynamic_lists(page_id)
    );`, {},
  );
  await reserveWord("dynamic_lists"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS dynamic_lists (
      "page_id" INTEGER PRIMARY KEY,
      "table_id" TEXT NOT NULL,
      "dynamic_list_type" TEXT NOT NULL,
      FOREIGN KEY (page_id) REFERENCES pages(page_id)
    );`, {},
  );
}


// dynamic_list_type
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
export async function createPage_core( parentPageId, pageName, isInDynamicList ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  const timestamp = new Date().getTime();
  if( isInDynamicList ){
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
      "dynamicListType": "NONE",
      "parentPages": [],
      "staticPages": staticPages,
      "dynamicPages": [],
    };
  }
  // トップページ以外の情報を取得する場合
  const pages = await runSqlReadOnly(
    `SELECT 
        page1.page_id AS pageId,
        page1.page_name AS pageName,
        page1.memo AS memo,
        dynamic_lists.table_id AS tableId,
        dynamic_lists.dynamic_list_type AS dynamicListType,
        page2.page_id AS pageId2,
        page2.page_name AS pageName2,
        page3.page_id AS pageId3,
        page3.page_name AS pageName3,
        page4.page_id AS pageId4,
        page4.page_name AS pageName4,
        page5.page_id AS pageId5,
        page5.page_name AS pageName5,
        page6.page_id AS pageId6,
        page6.page_name AS pageName6
      FROM pages AS page1
        LEFT OUTER JOIN dynamic_lists
          ON dynamic_lists.page_id = page1.page_id
        LEFT OUTER JOIN pages AS page2
          ON ( page1.static_parent_id = page2.page_id ) OR ( page1.dynamic_parent_id = page2.page_id )
        LEFT OUTER JOIN pages AS page3
          ON ( page2.static_parent_id = page3.page_id ) OR ( page2.dynamic_parent_id = page3.page_id )
        LEFT OUTER JOIN pages AS page4
          ON ( page3.static_parent_id = page4.page_id ) OR ( page3.dynamic_parent_id = page4.page_id )
        LEFT OUTER JOIN pages AS page5
          ON ( page4.static_parent_id = page5.page_id ) OR ( page4.dynamic_parent_id = page5.page_id )
        LEFT OUTER JOIN pages AS page6
          ON ( page5.static_parent_id = page6.page_id ) OR ( page5.dynamic_parent_id = page6.page_id )
      WHERE page1.page_id = :pageId
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
  const parentPages = [];
  for( let  i=2; i<=6; i++ ){
    if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    if( !pageInfo["pageId"+i] ){
      if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
      break;
    }
    parentPages.push({
      "id": pageInfo["pageId"+i],
      "name": pageInfo["pageName"+i],
    });
  }
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
      ":pageId": pageId,    // 作成日時
    },
  );
  const staticPages = [];
  const dynamicPages = [];
  for( const { id, name, isDynamic } of childrenPages ){
    if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    if( isDynamic ){
      if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
      dynamicPages.push({
        id: id,
        name: name,
      });
    }
    else{
      if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
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
    "dynamicListType": pageInfo["dynamicListType"] ?? "NONE",
    "parentPages": parentPages,
    "staticPages": staticPages,
    "dynamicPages": dynamicPages,
  };
}
