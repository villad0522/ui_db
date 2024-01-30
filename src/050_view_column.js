// ビューカラム
//
import {
  startUp,
  deleteView,
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  createView,
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
} from "./052_page_and_view_validate.js";
import {
  getLocalIp,
} from "./118_ip_address_validate.js";
import {
  getPath,
} from "./115_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./112_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./094_column_name_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./106_csv_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./109_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./103_primary_key_validate.js";
import {
  clearCache,
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./076_record_title_2_validate.js";
import {
  listDataTypes,
} from "./100_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./073_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./091_reserved_word_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./085_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./088_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./097_table_name_validate.js";
import {
  formatField,
} from "./082_db_formatter_validate.js";
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
} from "./079_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./067_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./064_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./061_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./058_generate_sql1_validate.js";
import {
  generateSQL,
} from "./055_generate_sql_validate.js";


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
    await reserveWord("view_columns"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS view_columns (
            "view_column_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "view_id" INTEGER NOT NULL,
            "view_column_type" TEXT NOT NULL,
            "column_path" TEXT NOT NULL,
            "view_column_name" TEXT NOT NULL,
            "excel_column_index" INTEGER NOT NULL,
            "sort_number" REAL NOT NULL DEFAULT 64,
            FOREIGN KEY (view_id) REFERENCES views(view_id),
            UNIQUE (view_id, excel_column_index)
        );`,
        {},
    );
}



// 【サブ関数】ソート番号を発行する
export async function _generateViewColumnSortNumber_core( viewId, afterViewColumnId ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
  if( afterViewColumnId ){
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    // 特定のビューカラムの直前に挿入する場合
    const viewColumns = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM view_columns
        WHERE view_id = :viewId
          AND sort_number <= ( SELECT sort_number FROM view_columns WHERE view_column_id = :afterId )
        ORDER BY sort_number DESC
        LIMIT 2;`,
      {
        ":afterId" : afterViewColumnId,
        ":viewId": viewId,
      },
    );
    if( viewColumns.length===2 ){
      if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の、直前と直後のビューカラムが両方取得できた場合
      const sortNumberBefore = viewColumns[1]["sortNumber"];
      const sortNumberAfter = viewColumns[0]["sortNumber"];
      if( sortNumberBefore > sortNumberAfter ){
        throw `ソート番号の大小関係が想定外です。`;
      }
      return sortNumberBefore + ((sortNumberAfter-sortNumberBefore)/2);
    }
    else if( viewColumns.length===1 ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      // 移動先の直後のページしか取得できなかった場合
      // （先頭に挿入する場合）
      const sortNumberAfter = viewColumns[0]["sortNumber"];
      if( sortNumberAfter < 0 ){
        throw `ソート番号が負の数です。`;
      }
      return sortNumberAfter / 2;
    }
    else{
      throw `ソート番号を発行しようとしましたが、移動先が取得できませんでした。指定された viewId と afterViewColumnId が親子関係ではない可能性があります。\nviewId = ${viewId}\nafterViewColumnId = ${afterViewColumnId}`;
    }
  }
  else{
    if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
    // 末尾に追加する場合
    const viewColumns = await runSqlReadOnly(
      `SELECT sort_number AS sortNumber
        FROM view_columns
        WHERE view_id = :viewId
        ORDER BY sort_number DESC
        LIMIT 1;`,
      {
        ":viewId": viewId,
      },
    );
    if( viewColumns.length===0 ){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      // 兄弟が存在しない場合
      // （空のページに挿入する場合）
      return 64;
    }
    else{
      if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
      // 既に兄弟が存在する場合
      const sortNumberBefore = viewColumns[0]["sortNumber"];
      return sortNumberBefore + 8;
    }
  }
}

// ビューカラムを作成
export async function addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    if( typeof viewId !== "number" || isNaN(viewId) ){
        throw `ページIDが数値ではありません`;
    }
    // ソート番号を何にするべきか決める
    const sortNumber = await _generateViewColumnSortNumber_core( viewId, null );
    //
    // excelの空いている列を見つける
    const matrix = await runSqlReadOnly(
        `SELECT excel_column_index AS excelColumnIndex
            FROM view_columns
            WHERE view_id = :viewId
            ORDER BY excel_column_index ASC;`,
        {
            ":viewId": viewId,
        },
    );
    const numbers = new Set();
    for( const { excelColumnIndex } of matrix ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        numbers.add( excelColumnIndex );
    }
    let excelColumnIndex;
    for( let i=0; i<=numbers.size; i++ ){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        if(!numbers.has(i)){
            if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
            excelColumnIndex = i;
            break;
        }
    }
    // 列を表示設定にする
    await runSqlWriteOnly(
        `INSERT INTO view_columns(
            view_id,
            view_column_type,
            column_path,
            view_column_name,
            excel_column_index,
            sort_number
        ) VALUES (
            :viewId,
            :viewColumnType,
            :columnPath,
            :viewColumnName,
            :excelColumnIndex,
            :sortNumber
        );`,
        {
            ":viewId": viewId,
            ":viewColumnType": viewColumnType,
            ":columnPath": columnPath,
            ":viewColumnName": viewColumnName,
            ":excelColumnIndex": excelColumnIndex,
            ":sortNumber": sortNumber,
        },
    );
}


// 文字列からアンダーバー（_）以降を切り取る関数
function _cutStringAfterUnderscore(inputString) {
    // アンダーバーのインデックスを検索
    const underscoreIndex = inputString.indexOf('_');
    // アンダーバーが見つかった場合
    if (underscoreIndex !== -1) {
        // アンダーバー以降の部分を取得して出力
        const resultString = inputString.substring(underscoreIndex + 1);
        return resultString;
    } else {
        // アンダーバーが見つからなかった場合はそのまま出力
        return inputString;
    }
}

// カラムを作成
export async function createColumn_core( tableId, columnName, dataType, parentTableId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createColumn( tableId, columnName, dataType, parentTableId );    // 下層の関数を呼び出す
    //
    const viewIdList = await listViewsFromTableId( tableId );
    if( dataType !== "POINTER" ){
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        // 列を表示設定にする
        for( const viewId of viewIdList ){
            if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
            await addViewColumn_core({ 
                viewId: viewId,
                viewColumnType: "RAW",
                columnPath: `main.${result.columnId}`,
                viewColumnName: columnName,
            });
        }
        return result;
    }
    const parentColumnId = await getTitleColumnId( parentTableId );
    if(!parentColumnId){
        if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`タイトル列が設定されていません。${parentTableId}`);
        return result;
    }
    // 列を表示設定にする
    for( const viewId of viewIdList ){
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
        await addViewColumn_core({ 
            viewId: viewId,
            viewColumnType: "RAW",
            columnPath: `main.${result.columnId} > ${parentColumnId}`,
            viewColumnName: columnName,
        });
    }
    return result;
}



// ビューを作成
export async function createView_core( pageId, tableName ){
  if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = await getTableIdFromName(tableName);
    if(!tableId){
        throw new Error(`指定されたテーブル名「${tableName}」は存在しません。`);
    }
    const result = await createView( pageId, tableId );  // 下層の関数を実行する
    //
    // 自動的に列を表示設定にしてあげる
    await _deleteViewColumns_core( result.viewId );
    const columns = await listColumnsAll( tableId );
    for( const { id, name, dataType, parentTableId } of columns ){
        if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
        // 文字列からアンダーバー（_）以降を切り取る
        const columnName = _cutStringAfterUnderscore(name);
        if( dataType !== "POINTER" ){
            if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
            // 列を表示設定にする
            await addViewColumn_core(
                result.viewId,
                "RAW",
                `main.${id}`,
                columnName,
            );
            continue;
        }
        if( !parentTableId ){
            throw `親テーブルが不明です。\nテーブルID=${tableId}\nカラムID=${id}`;
        }
        const parentColumnId = await getTitleColumnId( parentTableId );
        if(!parentColumnId){
            if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
            console.error(`createView > タイトル列が設定されていません。${parentTableId}`);
            continue;
        }
        // 列を表示設定にする
        await addViewColumn_core(
            result.viewId,
            "RAW",
            `main.${id} > ${parentColumnId}`,
            columnName,
        );
    }
    return result;
}



// ビューカラムの一覧を取得
export async function listViewColumns_core( viewId ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
    return await runSqlReadOnly(
        `SELECT
            "d" || view_column_id AS viewColumnId,
            view_column_type AS viewColumnType,
            column_path AS columnPath,
            view_column_name AS viewColumnName
        FROM view_columns
        WHERE view_id = :viewId
        ORDER BY sort_number ASC;`,
        {
            ":viewId": viewId,
        },
    );
}

// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
    await _deleteViewColumns_core( viewId );
    return await deleteView( viewId );  // 下層の関数を実行する
}

// 【サブ関数】ビューカラムを一括削除
export async function _deleteViewColumns_core( viewId ){
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM view_columns
            WHERE view_id = :viewId;`,
        {
            ":viewId": viewId,
        },
    );
}

// ビューカラムの一覧を取得(Excel向け)
export async function listViewColumnsForExcel_core( viewId ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
    return await runSqlReadOnly(
        `SELECT
            "d" || view_column_id AS viewColumnId,
            view_column_type AS viewColumnType,
            column_path AS columnPath,
            view_column_name AS viewColumnName,
            excel_column_index AS excelColumnIndex
        FROM view_columns
        WHERE view_id = :viewId
        ORDER BY excel_column_index ASC;`,
        {
            ":viewId": viewId,
        },
    );
}
