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
  checkReservedWord,
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
      "page_name" TEXT NOT NULL DEFAULT '新しいページ',
      "memo" TEXT NOT NULL DEFAULT '',
      "sort_number" REAL NOT NULL DEFAULT 64,
      "created_at" INTEGER UNIQUE,
      FOREIGN KEY (static_parent_id) REFERENCES pages(page_id),
      FOREIGN KEY (dynamic_parent_id) REFERENCES views(view_id)
    );`, {},
  );
  await reserveWord("views"); // 予約語に登録
  await runSqlWriteOnly(
    `CREATE TABLE IF NOT EXISTS views (
      "view_id" INTEGER PRIMARY KEY,
      "view_name" TEXT NOT NULL,
      "page_id" INTEGER NOT NULL,
      "table_id" TEXT NOT NULL,
      "sql_query" TEXT NOT NULL,
      "one_page_max_size" NUMBER NOT NULL DEFAULT 23,
      "view_type" TEXT NOT NULL DEFAULT 'TABLE',
      "sort_number" REAL NOT NULL DEFAULT 64,
      "created_at" INTEGER UNIQUE,
      FOREIGN KEY (page_id) REFERENCES pages(page_id)
    );`, {},
  );
  const pages = await runSqlReadOnly(
    `SELECT * FROM pages LIMIT 1;`, {},
  );
  if( pages.length===0 ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const timestamp = new Date().getTime();
    // ページが１つも無い場合は、トップページを作成する
    await runSqlWriteOnly(
      `INSERT INTO pages( page_id, page_name, created_at )
          VALUES ( 1, 'トップ', :createdAt );`,
      {
        ":createdAt": timestamp,    // 作成日時
      },
    );
  }
}


// view_type
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
  const matrix2 = await runSqlReadOnly(
    `SELECT *
      FROM views
      LEFT OUTER JOIN pages
        ON views.view_id = pages.dynamic_parent_id
      WHERE pages.page_id IS NULL;`, {},
  );
  if(matrix2.length>0){
    console.error(`子ページを持たないビューがあります`);
  }
}



// ページを作成
export async function createPage_core( parentPageId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
  // ソート番号を何にするべきか決める
  const sortNumber = await _generatePageSortNumber_core( parentPageId, null );
  const timestamp = new Date().getTime();
  await runSqlWriteOnly(
    `INSERT INTO pages( static_parent_id, sort_number, created_at )
        VALUES ( :staticParentId, :sortNumber, :createdAt );`,
    {
      ":staticParentId": parentPageId,
      ":sortNumber": sortNumber,
      ":createdAt": timestamp,    // 作成日時
    },
  );
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
export async function updatePageName_core( pageId, pageName, memo ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  await runSqlWriteOnly(
    `UPDATE pages
        SET page_name = :pageName,
          memo = :memo
        WHERE page_id = :pageId;`,
    {
        ":pageId": pageId,
        ":pageName": pageName,
        ":memo": memo,
    },
  );
  return "ページ名を変更しました";
}



// １ページの情報を取得
export async function getPageInfo_core( pageId ){
  if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
  if( !pageId ){
    throw `ページIDは1以上の整数を指定してください。\npageId = ${pageId}`;
  }
  const pages = await runSqlReadOnly(
    `SELECT
        pages.page_name AS pageName,
        pages.memo AS memo
      FROM pages
      WHERE pages.page_id = :pageId
      LIMIT 1;`,
    {
      ":pageId": pageId,
    },
  );
  if(pages.length===0){
    throw "ページが見つかりません。";
  }
  return {
    "pageName": pages[0]["pageName"],
    "memo": pages[0]["memo"] ?? "",
  };
}



// テーブルIDからviewIdを取得する
export async function listViewsFromTableId_core( tableId ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  const pages = await runSqlReadOnly(
    `SELECT view_id AS viewId
      FROM views
      WHERE table_id = :tableId;`,
    {
      ":tableId": tableId,    // 作成日時
    },
  );
  return pages.map( ({ viewId }) => viewId );
}



// viewIdからテーブルIDを取得する
export async function getTableFromView_core( viewId ){
  if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
  const pages = await runSqlReadOnly(
    `SELECT table_id AS tableId
      FROM views
      WHERE view_id = :viewId;`,
    {
      ":viewId": viewId,
    },
  );
  if( pages.length===0 ){
    throw `指定されたビューが存在しません。\nviewId = ${viewId}`;
  }
  return pages[0].tableId;
}




// ビューを作成
export async function createView_core( pageId, tableId, sqlQuery ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  const tableName = await getTableName( tableId );
  if(!tableName){
    throw `テーブル名を取得できません。\ntableId = ${tableId}`;
  }
  const timestamp = new Date().getTime();
  await runSqlWriteOnly(
    `INSERT INTO views( view_name, page_id, table_id, sql_query, created_at )
        VALUES ( :viewName, :pageId, :tableId, :sqlQuery, :createdAt );`,
    {
      ":viewName": tableName,
      ":pageId": pageId,
      ":tableId": tableId,
      ":sqlQuery": sqlQuery,
      ":createdAt": timestamp,    // 作成日時
    },
  );
  // IDを取得する
  const views = await runSqlReadOnly(
    `SELECT view_id AS viewId
      FROM views
      WHERE created_at = :createdAt
      LIMIT 1;`,
    {
      ":createdAt": timestamp,    // 作成日時
    },
  );
  if(views.length===0){
    throw "登録したはずのページが見つかりません。";
  }
  const viewId = views[0]["viewId"];
  if(isNaN(viewId)){
    throw "新しく発行されたviewIdが見つかりません。";
  }
  //
  // 動的リストの子を作る
  await runSqlWriteOnly(
    `INSERT INTO pages( dynamic_parent_id, page_name, created_at )
        VALUES ( :dynamicParentId, :pageName, :createdAt );`,
    {
      ":dynamicParentId": viewId,
      ":pageName": tableName,
      ":createdAt": timestamp,    // 作成日時
    },
  );
  await _checkTree();
  return {
    viewId: viewId,
  };
}




// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
// 子ページを取得する（１個のはず）
  const pages = await runSqlReadOnly(
    `SELECT page_id AS pageId
      FROM pages
      WHERE dynamic_parent_id = :viewId;`,
    {
      ":viewId": viewId,
    },
  );
  for( const { pageId } of pages ){
    if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
    // 子ページを再帰的に削除する
    await deletePage_core( pageId );
  }
  //
  // 対象のビューを削除する
  await runSqlWriteOnly(
    `DELETE FROM views WHERE view_id = :viewId;`,
    {
      ":viewId": viewId,
    },
  );
}




// ページを再帰的に削除
export async function deletePage_core( pageId ){
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
  console.log(`ページ「${pageId}」を削除します。`);
  // 子ページの一覧を取得する
  const children = await listChildrenPage_core( pageId );
  // 子ページを削除する
  //  （子→親の順番になるように削除する）
  for( let i=children.length-1; i>=0; i-- ){
    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
    await _deletePageInner( children[i] );
  }
  // 対象のページを削除する
  await _deletePageInner( pageId );
}


async function _deletePageInner( pageId ){
  // 対象のページを削除する
  await runSqlWriteOnly(
    `DELETE FROM pages WHERE page_id = :pageId;`,
    {
      ":pageId": pageId,
    },
  );
  // もし親のビューが存在したら、削除する
  await runSqlWriteOnly(
    `DELETE FROM views
      WHERE view_id IN (
        SELECT dynamic_parent_id
          FROM pages
          WHERE page_id = :pageId
      );`,
    {
      ":pageId": pageId,
    },
  );
}

// パンくずリストを再帰的に取得
export async function getBreadcrumbs_core( pageId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
  if( !pageId ){
    if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
    return [];
  }
  const pages = await runSqlReadOnly(
    `SELECT 
        pages.page_name AS pageName,
        pages.static_parent_id AS parentPageId1,
        views.page_id AS parentPageId2
      FROM pages
      LEFT OUTER JOIN views
        ON pages.dynamic_parent_id = views.view_id
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
    if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
    // 関数を再帰呼び出し
    list = await getBreadcrumbs_core( parentPageId1 );
  }
  else if( parentPageId2 ){
    if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    // 関数を再帰呼び出し
    list = await getBreadcrumbs_core( parentPageId2 );
  }
  return [
    ...list,
    {
      "pageId": pageId,
      "pageName": pages[0]["pageName"],
    }
  ];
}

let cuttingPageId = null;
let copyingPageId = null;



// ページを切り取る
export async function cutPage_core( pageId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
  cuttingPageId = pageId;
  copyingPageId = null;
}



// ページをコピーする
export async function copyPage_core( pageId ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
  copyingPageId = pageId;
  cuttingPageId = null;
}




// ページを貼り付ける
export async function pastePage_core( parentPageId, afterPageId ){
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
  if( copyingPageId ){
    if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
    // ページをコピーする場合
    throw `この操作は未実装です。`;
  }
  else if( cuttingPageId ){
    if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    // 事前に切り取ったページを貼り付ける場合
    await _movePage_core( cuttingPageId, parentPageId, afterPageId );
  }
  else{
    throw new Error(`貼り付け操作を行う前に、切り取り または コピーを行ってください。`);
  }
}



// 切り取り中のページを取得する
export async function getCuttingPage_core(  ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
  return cuttingPageId;
}




// コピー中のページを取得する
export async function getCopyingPage_core(  ){
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
  return copyingPageId;
}



// ページを全て取得する関数
export async function listAllPages_core(  ){
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
  const matrix = await runSqlReadOnly(
    `SELECT page_id AS pageId FROM pages;`, {},
  );
  return matrix.map(({pageId})=>pageId);
}




// 子ページの一覧を取得
export async function listStaticChildren_core( pageId ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
  return await runSqlReadOnly(
    `SELECT 
        page_id AS pageId,
        page_name AS pageName
      FROM pages
      WHERE static_parent_id = :parentPageId
      ORDER BY sort_number ASC;`,
    {
      ":parentPageId": pageId,
    },
  );
}




// ビューの一覧を取得
export async function listChildrenView_core( pageId ){
  if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
  return await runSqlReadOnly(
    `SELECT 
        pages.page_id AS pageId,
        pages.page_name AS pageName,
        views.view_id AS viewId,
        views.table_id AS tableId,
        views.sql_query AS sqlQuery,
        views.one_page_max_size AS onePageMaxSize,
        views.view_type AS viewType
      FROM pages
      INNER JOIN views
        ON pages.dynamic_parent_id = views.view_id
      WHERE views.page_id = :parentPageId
      ORDER BY views.sort_number ASC;`,
    {
      ":parentPageId": pageId,
    },
  );
}



// 親ページのIDを取得
export async function getParentPage_core( pageId ){
  if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
  const pages = await runSqlReadOnly(
    `SELECT 
        pages.page_name AS pageName,
        pages.static_parent_id AS parentPageId1,
        views.page_id AS parentPageId2
      FROM pages
      LEFT OUTER JOIN views
        ON pages.dynamic_parent_id = views.view_id
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
  if(parentPageId1){
    if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
    return parentPageId1;
  }
  else if(parentPageId2){
    if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
    return parentPageId2;
  }
  return 0;
}

// 子ページの一覧を再帰的に取得
export async function listChildrenPage_core( parentId ){
  if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
  // 戻り値はページIDの配列。親→子の順番になるように配列を構築する。
  if( !parentId ){
    if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    return [];
  }
  const pages = await runSqlReadOnly(
    `SELECT 
        pages.page_id AS childId
      FROM pages
      LEFT OUTER JOIN views
        ON pages.dynamic_parent_id = views.view_id
      WHERE pages.static_parent_id = :parentId
        OR views.page_id = :parentId;`,
    {
      ":parentId": parentId,
    },
  );
  if(pages.length===0){
    if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
    return [];
  }
  const pageIds = [];
  for( const {childId} of pages ){
    if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
    if( parentId===childId ){
      throw `ページIDの循環参照が発生しました。\npageId = ${parentId}`;
    }
    // 順序が親→子になるように気を付ける。
    // もしページの順序を間違えると、この関数は削除処理に使われているため、親が先に消滅してしまう。
    pageIds.push( childId );
    //
    // 関数を再帰呼び出し
    const list = await listChildrenPage_core( childId );
    for( const pageId of list ){
      if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
      if( pageIds.includes(pageId)){
        throw `子ページの重複が発生しました。\npageId = ${pageId}`;
      }
      pageIds.push( pageId );
    }
  }
  return pageIds;
}




// 【サブ関数】ページを移動する
export async function _movePage_core( pageId, destParentPageId, destAfterPageId ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
  // ソート番号を何にするべきか決める
  const sortNumber = await _generatePageSortNumber_core( destParentPageId, destAfterPageId );
  await runSqlWriteOnly(
    `UPDATE pages
        SET static_parent_id = :parentId,
          sort_number = :sortNumber
        WHERE page_id = :pageId;`,
    {
        ":pageId": pageId,
        ":sortNumber": sortNumber,
        ":parentId": destParentPageId,
    },
  );
}



// 【サブ関数】ソート番号を発行する
export async function _generatePageSortNumber_core( destParentPageId, destAfterPageId ){
  if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
  if( destAfterPageId ){
    if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
    // 特定のページの直前に挿入する場合
    const pages = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM pages
        WHERE static_parent_id = :parentId
          AND sort_number <= ( SELECT sort_number FROM pages WHERE page_id = :afterId )
        ORDER BY sort_number DESC
        LIMIT 2;`,
      {
        ":afterId" : destAfterPageId,
        ":parentId": destParentPageId,
      },
    );
    if( pages.length===2 ){
      if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の、直前と直後のページが両方取得できた場合
      const sortNumberBefore = pages[1]["sortNumber"];
      const sortNumberAfter = pages[0]["sortNumber"];
      if( sortNumberBefore > sortNumberAfter ){
        throw `ソート番号の大小関係が想定外です。`;
      }
      return sortNumberBefore + ((sortNumberAfter-sortNumberBefore)/2);
    }
    else if( pages.length===1 ){
      if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の直後のページしか取得できなかった場合
      // （先頭に挿入する場合）
      const sortNumberAfter = pages[0]["sortNumber"];
      if( sortNumberAfter < 0 ){
        throw `ソート番号が負の数です。`;
      }
      return sortNumberAfter / 2;
    }
    else{
      throw `ページを移動しようとしましたが、移動先の「直後のページ」が取得できませんでした`;
    }
  }
  else{
    if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾に追加する場合
    const pages = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM pages
        WHERE static_parent_id = :parentId
        ORDER BY sort_number DESC
        LIMIT 1;`,
      {
        ":parentId": destParentPageId,
      },
    );
    if( pages.length===0 ){
      if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
      // 兄弟が存在しない場合
      // （空のページに挿入する場合）
      return 64;
    }
    else{
      if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
      // 既に兄弟が存在する場合
      const sortNumberBefore = pages[0]["sortNumber"];
      return sortNumberBefore + 8;
    }
  }
}
