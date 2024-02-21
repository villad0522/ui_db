// ビューカラム
//
import {
  startUp,
  clearCache,
  deleteTable,
  createPage,
  updatePageName,
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  createView,
  deleteView,
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
  getViewInfo,
  isExistView,
  updateView,
} from "./067_page_and_view_validate.js";
import {
  getLocalIp,
} from "./139_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./085_csv_validate.js";
import {
  getPath,
} from "./136_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./133_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./112_column_name_validate.js";
import {
  getTimestamp,
} from "./130_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./127_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./124_primary_key_validate.js";
import {
  createColumn,
  listTables,
  listRecords,
  createRecordFromUI,
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  getParentValue,
  _getRecordOffset,
} from "./088_record_title_validate.js";
import {
  listDataTypes,
} from "./121_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
  listChildrenColumnId,
} from "./103_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./100_system_auto_correct_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
  scanKeywords,
  getScanKeywordsProgress,
  stopScanKeywords,
} from "./106_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./115_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./118_sort_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./109_reserved_word_validate.js";
import {
  formatField,
} from "./097_db_formatter_validate.js";
import {
  autoFill,
  _autoFill,
  _getConditions,
  _listPredictions,
  _listRecords,
  createInputGroup,
  createInputElement,
  deleteViewInput,
  changeInputType,
  _fillMasterData,
  getInputType,
  updateRecordsFromView,
  createRecordFromView,
  _convertToRecord,
} from "./091_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./082_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./079_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./076_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./073_generate_sql1_validate.js";
import {
  generateSQL,
} from "./070_generate_sql_validate.js";


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
            FOREIGN KEY (view_id) REFERENCES views(view_id),
            UNIQUE (view_id, excel_column_index)
        );`,
        {},
    );
}



// 【サブ】ビューカラムを作成
export async function _createViewColumnOuter_core( viewId, viewColumnType, columnPath, viewColumnName ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await _addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName );
    if( viewColumnType==="RAW" ){
        if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
        // 入力要素を再構築する
        await regenerateInputElements_core( viewId );
    }
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
    return "新しいビューカラムを追加しました";
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
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createColumn( tableId, columnName, dataType, parentTableId );    // 下層の関数を呼び出す
    //
    const viewIdList = await listViewsFromTableId( tableId );
    if( dataType !== "POINTER" ){
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        // 列を表示設定にする
        for( const viewId of viewIdList ){
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            await _addViewColumn_core(
                viewId,
                "RAW",
                `main.${result.columnId}`,
                columnName,
            );
            // 入力要素を再構築する
            await regenerateInputElements_core( viewId );
        }
        return result;
    }
    const parentColumnId = await getTitleColumnId( parentTableId );
    if(!parentColumnId){
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`タイトル列が設定されていません。${parentTableId}`);
        return result;
    }
    // 列を表示設定にする
    for( const viewId of viewIdList ){
        if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
        await _addViewColumn_core(
            viewId,
            "RAW",
            `main.${result.columnId} > ${parentColumnId}`,
            columnName,
        );
        // 入力要素を再構築する
        await regenerateInputElements_core( viewId );
    }
    return result;
}



// ビューを作成
export async function createView_core( pageId, tableName ){
  if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
    const tableId = await getTableIdFromName(tableName);
    if(!tableId){
        throw new Error(`指定されたテーブル名「${tableName}」は存在しません。`);
    }
    const result = await createView( pageId, tableId );  // 下層の関数を実行する
    //
    //
    // 自動的に列を表示設定にしてあげる
    await _deleteViewColumns_core( result.viewId );
    const columns = await listColumnsAll( tableId );
    for( const { id, name, dataType, parentTableId } of columns ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        // 文字列からアンダーバー（_）以降を切り取る
        const columnName = _cutStringAfterUnderscore(name);
        if( dataType !== "POINTER" ){
            if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
            // 列を表示設定にする
            await _addViewColumn_core(
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
            if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
            console.error(`createView > タイトル列が設定されていません。${parentTableId}`);
            continue;
        }
        // 列を表示設定にする
        await _addViewColumn_core(
            result.viewId,
            "RAW",
            `main.${id} > ${parentColumnId}`,
            columnName,
        );
    }
    // 入力要素を再構築する
    await regenerateInputElements_core( result.viewId );
    return result;
}


let buf2 = {
    // "viewId": [
    //   {
    //     "viewColumnId": viewColumn.viewColumnId,
    //     "viewColumnName": viewColumn.viewColumnName,
    //     "viewColumnType": viewColumn.viewColumnType,
    //     "excelColumnText": _convertToExcelColumn(excelStartColumn + offset),
    //     "columnPath": viewColumn.columnPath
    //   }
    // ]
};


// ビューカラムの一覧を取得
export async function listViewColumns_core( viewId ){
  if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
    if( buf2[viewId] ){
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        return buf2[viewId];
    }
    const viewColumns1 = await runSqlReadOnly(
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
    //
    const { excelStartColumn } = await getViewInfo( viewId );
    //
    const viewColumns2 = [];
    for( const viewColumn of viewColumns1 ){
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
        const offset = viewColumn.excelColumnIndex;
        viewColumns2.push({
            "viewColumnId": viewColumn.viewColumnId,
            "viewColumnName": viewColumn.viewColumnName,
            "viewColumnType": viewColumn.viewColumnType,
            "excelColumnText": _convertToExcelColumn(excelStartColumn + offset),
            "columnPath": viewColumn.columnPath
        });
    }
    buf2[viewId] = viewColumns2;
    return viewColumns2;
}

// Excelの列番号（数値）をAからAZの列名に変換する関数
function _convertToExcelColumn(number) {
    let columnName = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    while (number > 0) {
        const remainder = (number - 1) % 26;
        columnName = alphabet.charAt(remainder) + columnName;
        number = Math.floor((number - 1) / 26);
    }
    return columnName;
}

// ビューを削除
export async function deleteView_core( viewId ){
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
    await _deleteViewColumns_core( viewId );
    return await deleteView( viewId );  // 下層の関数を実行する
}

// 【サブ関数】ビューカラムを一括削除
export async function _deleteViewColumns_core( viewId ){
  if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM view_columns
            WHERE view_id = :viewId;`,
        {
            ":viewId": viewId,
        },
    );
    // 入力要素と入力グループを全て消し去る
    await deleteViewInput(viewId);
    //
    if(await isExistView(viewId)===false) return;
    // ビューの情報を取得する
    const { childPageId } = await getViewInfo( viewId );
    const views = await listChildrenView( childPageId );
    for( const { viewId } of views ){
        if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
        // ビューカラムを一括削除（再帰呼び出し）
        await _deleteViewColumns_core( viewId );
    }
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
}



// 【サブ関数】入力要素を全て作り直す
export async function regenerateInputElements_core( viewId ){
  if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
    // 入力要素と入力グループを全て消し去る
    await deleteViewInput(viewId);
    //
    const mainTableId = await getTableFromView( viewId );
    // 入力グループを作成
    await createInputGroup(
        viewId + "/main",     // inputGroupId
        viewId,
        mainTableId,
        null,   // nextGroupId
        null,   // nextColumnId
        100, // processingOrder
    );
    //
    const viewColumns = await listViewColumns_core( viewId );
    //
    // 入力要素をグループ分けするために、外部キーの一覧を作成する（重複しないように）
    const joinIdMap = await getJoinIdMap( viewColumns );
    // 例
    // joinIdMap = {
    //   "main.c45" : "j0",
    //   "main.c45 > c88" : "j1",
    //   "main.c2" : "j2",
    //   "main.c2 > c53" : "j3",
    //   "c89 > main" : "j4",
    // };
    //
    for( const columnPath in joinIdMap ){
        if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
        const inputGroupId = viewId + "/" + joinIdMap[columnPath];
        const columnId = await pathToColumnId( columnPath );
        const tableId = await getParentTableId(columnId);
        //
        // 子（参照元）のグループID
        let nextGroupId = null;
        let nextColumnId = null;
        const pathLength = await getPathLength( columnPath );
        if( pathLength >= 2 ){
            if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
            const childColumnPath = await slicePath( columnPath, pathLength-1 );
            const childColumnId = await pathToColumnId( childColumnPath );
            //
            // 子（参照元）のグループID
            nextGroupId =  viewId + "/" + joinIdMap[childColumnPath];
            nextColumnId = childColumnId;
        }
        else{
            if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
            nextGroupId = viewId + "/main";
            nextColumnId = columnId;
        }
        //
        // 処理順序を決める（入力フォームの解析の際には、親→子の順で処理する。）
        const processingOrder = 100 - pathLength - 1;
        //
        // 入力グループを作成
        await createInputGroup(
            inputGroupId,
            viewId,
            tableId,
            nextGroupId,
            nextColumnId,
            processingOrder
        );
    }
    //
    for( const { viewColumnId, viewColumnType, columnPath, viewColumnName } of viewColumns ){
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        let inputGroupId = viewId + "/main";
        const pathLength = await getPathLength( columnPath );
        if( pathLength >= 2 ){
            if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
            // 子（参照元）のカラムパス
            const childColumnPath = await slicePath( columnPath, pathLength-1 );
            inputGroupId = viewId + "/" + joinIdMap[childColumnPath];
            if( !inputGroupId ){
                throw `入力要素を作り直そうとしましたが、所属している入力グループが見つかりません。\ncolumnPath = ${columnPath}\njoinIdMap = ${JSON.stringify(joinIdMap,null,2)}`;
            }
        }
        const columnId = await pathToColumnId( columnPath );
        //
        // 入力要素を作成
        await createInputElement(
            viewColumnId,
            inputGroupId,
            columnId,
        );
    }
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
}



// 【サブ関数】ビューカラムを作成
export async function _addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
    if( typeof viewId !== "number" || isNaN(viewId) ){
        throw `ビューIDが数値ではありません`;
    }
    // RAW, SUM、MAX、MIN、AVG、COUNT 
    if( viewColumnType!=="RAW" && viewColumnType!=="SUM" && viewColumnType!=="MAX"
        && viewColumnType!=="MIN" && viewColumnType!=="AVG" && viewColumnType!=="COUNT" ){
        throw `サポートされていない集合関数です。\nviewColumnType = ${viewColumnType}`;
    }
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
        if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
        numbers.add( excelColumnIndex );
    }
    let excelColumnIndex;
    for( let i=0; i<=numbers.size; i++ ){
        if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
        if(!numbers.has(i)){
            if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
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
            excel_column_index
        ) VALUES (
            :viewId,
            :viewColumnType,
            :columnPath,
            :viewColumnName,
            :excelColumnIndex
        );`,
        {
            ":viewId": viewId,
            ":viewColumnType": viewColumnType,
            ":columnPath": columnPath,
            ":viewColumnName": viewColumnName,
            ":excelColumnIndex": excelColumnIndex,
        },
    );
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
}

// ページを削除
export async function deletePage_core( pageId ){
  if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
  //
  // ビューの一覧を取得する
  const views = await listChildrenView( pageId );
  for( const { viewId } of views ){
    if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
    // ビューカラムを一括削除
    await _deleteViewColumns_core( viewId );
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
  }
  // 親のビューを取得
  const view = await runSqlReadOnly(
    `SELECT dynamic_parent_id AS viewId
      FROM pages
      WHERE page_id = :pageId
      LIMIT 1;`,
    {
      ":pageId": pageId,
    },
  );
  // もし親のビューが存在したら
  if(view.length>=1){
    if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    const parentViewId = view[0]["viewId"];
    if( parentViewId && !isNaN(parentViewId) ){
        if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
        // ビューカラムを一括削除
        await _deleteViewColumns_core( parentViewId );
    }
  }
  await deletePage( pageId );   // 下層の関数を呼び出す
}

// 不可逆的にテーブルを削除
export async function deleteTable_core( tableId ){
  if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
    const views = await listViewsFromTableId( tableId );
    for( const viewId of views ){
        if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
        await runSqlWriteOnly(
            `DELETE FROM view_columns WHERE view_id = :viewId;`,
            {
                ":viewId": viewId,
            },
        );
    }
    return await deleteTable( tableId );
}

// ビューの情報を更新
export async function updateView_core( params ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = params.viewColumns;
    for( const { viewColumnId, viewColumnName } of viewColumns ){
        if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
        await runSqlWriteOnly(
            `UPDATE view_columns
                SET view_column_name = :viewColumnName
                WHERE view_column_id = :viewColumnId;`,
            {
                ":viewColumnId": viewColumnId.replace("d",""),
                ":viewColumnName": viewColumnName,
            },
        );
    }
    //
    delete params["viewColumns"];
    return await updateView( params );
}

// ビューカラムを削除
export async function deleteViewColumn_core( viewId, viewColumnId ){
  if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
    // 削除
    if(true/*一番左のビューカラムを削除する場合 */){
        if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
        // Excelデータの開始位置を、ひとつ右にずらす
        // すべてのビューカラムのオフセットを、ひとつ左にずらす
    }
    await runSqlWriteOnly(
        `DELETE FROM view_columns
            WHERE view_column_id = :viewColumnId;`,
        {
            ":viewColumnId": viewColumnId,
        },
    );
    // 入力要素と入力グループを全て消し去る
    await deleteViewInput(viewId);
    buf[viewId] = undefined;
    buf2[viewId] = undefined;
    return "ビューカラムを削除しました";
}

// ビューカラムを右へ移動
export async function reorderViewColumnToRight_core( viewColumnId ){
  if(bugMode === 39) throw "MUTATION39";  // 意図的にバグを混入させる（ミューテーション解析）
    // もし隣のビューカラムとの間に隙間があったら、そこへ移動。
    // もし隙間がなかったら、隣のビューカラムと交換。
}

// ビューカラムを左へ移動
export async function reorderViewColumnToLeft_core( viewColumnId ){
  if(bugMode === 40) throw "MUTATION40";  // 意図的にバグを混入させる（ミューテーション解析）
    // もし、すでにA列にいるなら、
    // もし、すでにビューカラムの中で一番左にいるなら、
    //
        //   Excelデータの開始位置を、ひとつ左にずらす
        //   すべてのビューカラムのオフセットを、ひとつ右にずらす
        //   このビューカラムのオフセットをゼロにする
    // もし隣のビューカラムとの間に隙間があったら、そこへ移動。
    // もし隙間がなかったら、隣のビューカラムと交換。
}



let buf = {
    // "34": {
    //   "c78": [ "d45", "d99" ],
    //   "c6": [ "d12" ],
    // },
};


// カラムIDからビューカラムIDを取得
export async function getViewColumnFromColumn_core( columnId, viewId ){
  if(bugMode === 41) throw "MUTATION41";  // 意図的にバグを混入させる（ミューテーション解析）
    if(buf[viewId] && buf[viewId][columnId]){
        if(bugMode === 42) throw "MUTATION42";  // 意図的にバグを混入させる（ミューテーション解析）
        return buf[viewId][columnId][0];
    }
    let viewColumns = await listViewColumns(viewId);
    for( let i=0; i<viewColumns.length; i++ ){
        if(bugMode === 43) throw "MUTATION43";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnPath = viewColumns[i].columnPath;
        viewColumns[i].pathLength = await getPathLength(columnPath);
        viewColumns[i].columnId = await pathToColumnId(columnPath);
    }
    viewColumns = viewColumns.sort((a,b)=>{
        if( a.pathLength > b.pathLength ){
            if(bugMode === 44) throw "MUTATION44";  // 意図的にバグを混入させる（ミューテーション解析）
            return 1;
        }
        else{
            if(bugMode === 45) throw "MUTATION45";  // 意図的にバグを混入させる（ミューテーション解析）
            return -1;
        }
    });
    buf[viewId] = {
        //  "c78": [ "d45", "d99" ],
        //  "c6": [ "d12" ],
    };
    buf2[viewId] = undefined;
    for( const { viewColumnId, columnId } of viewColumns ){
        if(bugMode === 46) throw "MUTATION46";  // 意図的にバグを混入させる（ミューテーション解析）
        if( !buf[viewId][columnId] ){
            if(bugMode === 47) throw "MUTATION47";  // 意図的にバグを混入させる（ミューテーション解析）
            buf[viewId][columnId] = [];
        }
        buf[viewId][columnId].push(viewColumnId);
    }
    return buf[viewId][columnId][0];
}



// インメモリキャッシュを削除する
export async function clearCache_core(  ){
  if(bugMode === 48) throw "MUTATION48";  // 意図的にバグを混入させる（ミューテーション解析）
  buf = {};
  buf2 = {};
  return await clearCache(  );
}


// ビューカラムの名前を取得
export async function getViewColumnName_core( viewId, viewColumnId ){
  if(bugMode === 49) throw "MUTATION49";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await runSqlReadOnly(
        `SELECT
            "d" || view_column_id AS viewColumnId,
            view_column_type AS viewColumnType,
            column_path AS columnPath,
            view_column_name AS viewColumnName,
            excel_column_index AS excelColumnIndex
        FROM view_columns
        WHERE view_column_id = :viewColumnNumber
        LIMIT 1;`,
        {
            ":viewColumnNumber": viewColumnId.replace("d",""),
        },
    );
    if(viewColumns.length===0){
        throw `ビューカラムが見つかりません。\nviewColumnId = ${viewColumnId}`;
    }
    //
    const { excelStartColumn } = await getViewInfo( viewId );
    //
    const offset = viewColumns[0].excelColumnIndex;
    const result = {
        "viewColumnId": viewColumns[0].viewColumnId,
        "viewColumnName": viewColumns[0].viewColumnName,
        "viewColumnType": viewColumns[0].viewColumnType,
        "excelColumnText": _convertToExcelColumn(excelStartColumn + offset),
        "columnPath": viewColumns[0].columnPath
    };
    return result;
}

// 名前からビューカラムの情報を取得
export async function getViewColumnFromName_core( viewColumnName ){
  if(bugMode === 50) throw "MUTATION50";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await runSqlReadOnly(
        `SELECT
            "d" || view_column_id AS viewColumnId,
            view_id AS viewId,
            view_column_type AS viewColumnType,
            column_path AS columnPath,
            view_column_name AS viewColumnName,
            excel_column_index AS excelColumnIndex
        FROM view_columns
        WHERE view_column_name = :viewColumnName
        LIMIT 1;`,
        {
            ":viewColumnName": viewColumnName,
        },
    );
    if(viewColumns.length===0){
        throw `ビューカラムが見つかりません。\nviewColumnName = ${viewColumnName}`;
    }
    const viewId = viewColumns[0].viewId;
    const viewColumnId = viewColumns[0].viewColumnId;
    //
    const { excelStartColumn } = await getViewInfo( viewId );
    //
    const offset = viewColumns[0].excelColumnIndex;
    const result = {
        "viewColumnId": viewColumns[0].viewColumnId,
        "viewColumnName": viewColumns[0].viewColumnName,
        "viewColumnType": viewColumns[0].viewColumnType,
        "excelColumnText": _convertToExcelColumn(excelStartColumn + offset),
        "columnPath": viewColumns[0].columnPath
    };
    return result;
}



// 新しいビューカラムの予測を取得（子→親）
export async function _autoCorrectColumnsToParents_core( viewId, inputText, lastColumnName ){
  if(bugMode === 51) throw "MUTATION51";  // 意図的にバグを混入させる（ミューテーション解析）
    let parentTableId = "";
    if( lastColumnName ){
        if(bugMode === 52) throw "MUTATION52";  // 意図的にバグを混入させる（ミューテーション解析）
        const childColumnId = await getColumnIdFromName( lastColumnName );
        // 現在のカラムが参照している親テーブルのカラムから選ばせる
        parentTableId = await getParentTableId( childColumnId );
        if(!parentTableId){
            if(bugMode === 53) throw "MUTATION53";  // 意図的にバグを混入させる（ミューテーション解析）
            // 末端に到達した場合
            return [];
        }
    }
    else {
        if(bugMode === 54) throw "MUTATION54";  // 意図的にバグを混入させる（ミューテーション解析）
        // 現在のテーブルのカラムから選ばせる
        const viewInfo = await getViewInfo( viewId );
        parentTableId = viewInfo.tableId;
    }
    return await autoCorrectColumnName( inputText, parentTableId );
}




// 新しいビューカラムの予測を取得（親→子）
export async function _autoCorrectColumnsToChildren_core( viewId, inputText, lastColumnName ){
  if(bugMode === 55) throw "MUTATION55";  // 意図的にバグを混入させる（ミューテーション解析）
    let parentTableId = "";
    // 現在のテーブルを取得する
    if( lastColumnName ){
        if(bugMode === 56) throw "MUTATION56";  // 意図的にバグを混入させる（ミューテーション解析）
        const parentColumnId = await getColumnIdFromName( lastColumnName );
        parentTableId = await getTableId( parentColumnId );
    }
    else {
        if(bugMode === 57) throw "MUTATION57";  // 意図的にバグを混入させる（ミューテーション解析）
        const viewInfo = await getViewInfo( viewId );
        parentTableId = viewInfo.tableId;
    }
    if(!parentTableId){
        throw `parentTableIdがNULLです`;
    }
    // 現在のテーブルを参照しているカラムから選ばせる
    const columnIdList = await listChildrenColumnId( parentTableId );
    const columnNameList = columnIdList.map( async (columnId) => await getColumnName(columnId) );
    return await autoCorrectFromArray( inputText, columnNameList );
}



// ビューカラムの情報を取得
export async function getViewColumnInfo_core( viewColumnId ){
  if(bugMode === 58) throw "MUTATION58";  // 意図的にバグを混入させる（ミューテーション解析）
    const viewColumns = await runSqlReadOnly(
        `SELECT
            "d" || view_column_id AS viewColumnId,
            view_id AS viewId,
            view_column_type AS viewColumnType,
            column_path AS columnPath,
            view_column_name AS viewColumnName,
            excel_column_index AS excelColumnIndex
        FROM view_columns
        WHERE view_column_id = :viewColumnId
        LIMIT 1;`,
        {
            ":viewColumnId": viewColumnId.replace("d",""),
        },
    );
    if(viewColumns.length===0){
        throw `ビューカラムが見つかりません。\nviewColumnId = ${viewColumnId}`;
    }
    const viewId = viewColumns[0].viewId;
    //
    const { excelStartColumn } = await getViewInfo( viewId );
    //
    const offset = viewColumns[0].excelColumnIndex;
    const result = {
        "viewId": viewId,
        "viewColumnId": viewColumns[0].viewColumnId,
        "viewColumnName": viewColumns[0].viewColumnName,
        "viewColumnType": viewColumns[0].viewColumnType,
        "excelColumnText": _convertToExcelColumn(excelStartColumn + offset),
        "columnPath": viewColumns[0].columnPath
    };
    return result;
}


// カラムパスを伸ばす
export async function addColumnPath_core( viewId, requestBody ){
  if(bugMode === 59) throw "MUTATION59";  // 意図的にバグを混入させる（ミューテーション解析）
    let { isToParent, newColumnPath, newColumnPathInput } = requestBody;
    const inputText = newColumnPathInput;
    if(!inputText){
        if(bugMode === 60) throw "MUTATION60";  // 意図的にバグを混入させる（ミューテーション解析）
        return { 
            isToParent, 
            newColumnPath,
            newColumnPath_total: newColumnPath.length,
            newColumnPathInput,
            newColumnPathInput_option: await autoCorrectColumnPath_core( viewId, requestBody ),
        };
    }
    if( newColumnPath.length>0 ){
        if(bugMode === 61) throw "MUTATION61";  // 意図的にバグを混入させる（ミューテーション解析）
        // 既にカラムパスの長さが１以上のとき
        const lastColumnName = newColumnPath[newColumnPath.length-1].columnName;
        if(isToParent){
            if(bugMode === 62) throw "MUTATION62";  // 意図的にバグを混入させる（ミューテーション解析）
            const columnId = await getColumnIdFromName( lastColumnName );
            // カラムが参照している親テーブル
            const parentTableId = await getParentTableId( columnId );
            if( !parentTableId ){
                throw "既に末端に到達しているため、これ以上カラムパスを伸ばせません";
            }
            // 親テーブルのカラム
            const parentColumns = await listColumnsAll( parentTableId );
            const parentColumnNames = parentColumns.map( ({ name }) => name );
            if( parentColumnNames.includes(inputText) ){
                if(bugMode === 63) throw "MUTATION63";  // 意図的にバグを混入させる（ミューテーション解析）
                // 合格
                newColumnPath.push({ "columnName": inputText });
                newColumnPathInput = "";
            }
            else{
                throw `不正な値です`;
            }
        }
        else{
            if(bugMode === 64) throw "MUTATION64";  // 意図的にバグを混入させる（ミューテーション解析）
            // 現在のテーブルを取得する
            const { tableId } = await getViewInfo( viewId );
            // 現在のテーブルを参照しているカラム
            const children = await listChildrenColumnId( tableId );
            const childColumnNames = [];
            for( const columnId of children ){
                if(bugMode === 65) throw "MUTATION65";  // 意図的にバグを混入させる（ミューテーション解析）
                childColumnNames.push( await getColumnName(columnId) );
            }
            if( childColumnNames.includes(inputText) ){
                if(bugMode === 66) throw "MUTATION66";  // 意図的にバグを混入させる（ミューテーション解析）
                // 合格
                newColumnPath.push({ "columnName": inputText });
                newColumnPathInput = "";
            }
            else{
                throw `不正な値です`;
            }
        }
    }
    else {
        if(bugMode === 67) throw "MUTATION67";  // 意図的にバグを混入させる（ミューテーション解析）
        // 初めてカラムパスを伸ばすとき
        //
        // 現在のテーブルを取得する
        const { tableId } = await getViewInfo( viewId );
        // 現在のテーブルのカラム
        const columns = await listColumnsAll( tableId );
        const columnNames = columns.map( ({ name }) => name );
        if( columnNames.includes(inputText) ){
            if(bugMode === 68) throw "MUTATION68";  // 意図的にバグを混入させる（ミューテーション解析）
            // 合格
            newColumnPath.push({ "columnName": inputText });
            newColumnPathInput = "";
            isToParent = true;
        }
        else{
            if(bugMode === 69) throw "MUTATION69";  // 意図的にバグを混入させる（ミューテーション解析）
            // 現在のテーブルを参照しているカラム
            const children = await listChildrenColumnId( tableId );
            const childColumnNames = [];
            for( const columnId of children ){
                if(bugMode === 70) throw "MUTATION70";  // 意図的にバグを混入させる（ミューテーション解析）
                childColumnNames.push( await getColumnName(columnId) );
            }
            if( childColumnNames.includes(inputText) ){
                if(bugMode === 71) throw "MUTATION71";  // 意図的にバグを混入させる（ミューテーション解析）
                // 合格
                newColumnPath.push({ "columnName": inputText });
                newColumnPathInput = "";
                isToParent = false;
            }
            else{
                throw `不正な値です`;
            }
        }
    }
    return { 
        isToParent, 
        newColumnPath,
        newColumnPath_total: newColumnPath.length,
        newColumnPathInput,
        newColumnPathInput_option: await autoCorrectColumnPath_core( viewId, { isToParent, newColumnPath, newColumnPathInput: "" } ),
    };
}

// カラムパスの予測変換
export async function autoCorrectColumnPath_core( viewId, requestBody ){
  if(bugMode === 72) throw "MUTATION72";  // 意図的にバグを混入させる（ミューテーション解析）
    const { isToParent, newColumnPath, newColumnPathInput } = requestBody;
    const inputText = newColumnPathInput;
    if( newColumnPath.length===0 ){
        if(bugMode === 73) throw "MUTATION73";  // 意図的にバグを混入させる（ミューテーション解析）
        // 現在のテーブルを取得する
        const { tableId } = await getViewInfo( viewId );
        // 現在のテーブルを参照しているカラム
        const children = await listChildrenColumnId( tableId );
        const childColumnNameList = [];
        for( const columnId of children ){
            if(bugMode === 74) throw "MUTATION74";  // 意図的にバグを混入させる（ミューテーション解析）
            childColumnNameList.push( await getColumnName(columnId) );
        }
        // 現在のテーブルのカラム
        const columns = await listColumnsAll( tableId );
        const columnNameList = columns.map( ({ name }) => name );
        let suggestions = [
            ...childColumnNameList,
            ...columnNameList,
        ];
        suggestions = Array.from(new Set(suggestions)).slice(0,19);
        return suggestions;
    }
    const lastColumnName = newColumnPath[newColumnPath.length-1].columnName;
    if(isToParent){
        if(bugMode === 75) throw "MUTATION75";  // 意図的にバグを混入させる（ミューテーション解析）
        return await _autoCorrectColumnsToParents_core( viewId, inputText, lastColumnName );
    }
    else{
        if(bugMode === 76) throw "MUTATION76";  // 意図的にバグを混入させる（ミューテーション解析）
        return [
            ...await _autoCorrectColumnsToChildren_core( viewId, inputText, lastColumnName ),
            "の件数",
            "の合計",
            "の平均",
            "の最大値",
            "の最小値",
        ];
    }
}

// ビューカラムを新規作成
export async function createViewColumn_core( viewId, requestBody ){
  if(bugMode === 77) throw "MUTATION77";  // 意図的にバグを混入させる（ミューテーション解析）
    const { isToParent, newColumnPath } = await addColumnPath_core( viewId, requestBody );
    if( newColumnPath.length===0 ){
        throw `カラムパスの長さがゼロです`;
    }
    const lastColumnName = newColumnPath[newColumnPath.length-1].columnName;
    const viewColumnName = lastColumnName;
    const columnIdList = [];
    for( const { columnName } of newColumnPath ){
        if(bugMode === 78) throw "MUTATION78";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnId = await getColumnIdFromName( columnName );
        if(!columnId){
            throw `columnIdがNULLです。`;
        }
        columnIdList.push(columnId);
    }
    if(isToParent){
        if(bugMode === 79) throw "MUTATION79";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnPathText = `main.` + columnIdList.join(" > ");
        console.log(columnPathText);
        return await _createViewColumnOuter_core( viewId, "RAW", columnPathText, viewColumnName );
    }
    else{
        if(bugMode === 80) throw "MUTATION80";  // 意図的にバグを混入させる（ミューテーション解析）
        const columnPathText = columnIdList.reverse().join(" > ") + ` > main`;
        console.log(columnPathText);
        return await _createViewColumnOuter_core( viewId, "COUNT", columnPathText, viewColumnName + "の件数" );
    }
}
