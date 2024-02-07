// ビューカラム
//
import {
  startUp,
  clearCache,
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
} from "./058_page_and_view_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./115_csv_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./121_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./100_column_name_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./118_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./112_primary_key_validate.js";
import {
  deleteRecords,
} from "./109_delete_record_validate.js";
import {
  createColumn,
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./079_record_title_validate.js";
import {
  listDataTypes,
} from "./106_data_type_validate.js";
import {
  createRecord,
  listRecords,
} from "./085_records_validate.js";
import {
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./091_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./097_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./094_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./103_table_name_validate.js";
import {
  formatField,
} from "./088_db_formatter_validate.js";
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
} from "./082_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./073_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./070_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./067_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./064_generate_sql1_validate.js";
import {
  generateSQL,
} from "./061_generate_sql_validate.js";


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
    await _addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName );
    if( viewColumnType==="RAW" ){
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        // 入力要素を再構築する
        await regenerateInputElements_core( viewId );
    }
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
  if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
    const result = await createColumn( tableId, columnName, dataType, parentTableId );    // 下層の関数を呼び出す
    //
    const viewIdList = await listViewsFromTableId( tableId );
    if( dataType !== "POINTER" ){
        if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
        // 列を表示設定にする
        for( const viewId of viewIdList ){
            if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
        console.error(`タイトル列が設定されていません。${parentTableId}`);
        return result;
    }
    // 列を表示設定にする
    for( const viewId of viewIdList ){
        if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
        // 文字列からアンダーバー（_）以降を切り取る
        const columnName = _cutStringAfterUnderscore(name);
        if( dataType !== "POINTER" ){
            if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
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
            if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
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



// ビューカラムの一覧を取得
export async function listViewColumns_core( viewId ){
  if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
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
  if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
    await _deleteViewColumns_core( viewId );
    return await deleteView( viewId );  // 下層の関数を実行する
}

// 【サブ関数】ビューカラムを一括削除
export async function _deleteViewColumns_core( viewId ){
  if(bugMode === 22) throw "MUTATION22";  // 意図的にバグを混入させる（ミューテーション解析）
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
        if(bugMode === 23) throw "MUTATION23";  // 意図的にバグを混入させる（ミューテーション解析）
        // ビューカラムを一括削除（再帰呼び出し）
        await _deleteViewColumns_core( viewId );
    }
}

// ビューカラムの一覧を取得(Excel向け)
export async function listViewColumnsForExcel_core( viewId ){
  if(bugMode === 24) throw "MUTATION24";  // 意図的にバグを混入させる（ミューテーション解析）
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

// 【サブ関数】入力要素を全て作り直す
export async function regenerateInputElements_core( viewId ){
  if(bugMode === 25) throw "MUTATION25";  // 意図的にバグを混入させる（ミューテーション解析）
    // 入力要素と入力グループを全て消し去る
    await deleteViewInput(viewId);
    //
    const mainTableId = await getTableFromView( viewId );
    // 入力グループを作成
    await createInputGroup(
        "main",     // inputGroupId
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
        if(bugMode === 26) throw "MUTATION26";  // 意図的にバグを混入させる（ミューテーション解析）
        const inputGroupId = joinIdMap[columnPath];
        const columnId = await pathToColumnId( columnPath );
        const tableId = await getParentTableId(columnId);
        //
        // 子（参照元）のグループID
        let nextGroupId = null;
        let nextColumnId = null;
        const pathLength = await getPathLength( columnPath );
        if( pathLength >= 2 ){
            if(bugMode === 27) throw "MUTATION27";  // 意図的にバグを混入させる（ミューテーション解析）
            const childColumnPath = await slicePath( columnPath, pathLength-1 );
            const childColumnId = await pathToColumnId( childColumnPath );
            //
            // 子（参照元）のグループID
            nextGroupId = joinIdMap[childColumnPath];
            nextColumnId = childColumnId;
        }
        else{
            if(bugMode === 28) throw "MUTATION28";  // 意図的にバグを混入させる（ミューテーション解析）
            nextGroupId = "main";
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
        if(bugMode === 29) throw "MUTATION29";  // 意図的にバグを混入させる（ミューテーション解析）
        let inputGroupId = "main";
        const pathLength = await getPathLength( columnPath );
        if( pathLength >= 2 ){
            if(bugMode === 30) throw "MUTATION30";  // 意図的にバグを混入させる（ミューテーション解析）
            // 子（参照元）のカラムパス
            const childColumnPath = await slicePath( columnPath, pathLength-1 );
            inputGroupId = joinIdMap[childColumnPath];
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
            "TEXTBOX", // inputType
        );
    }
}



// 【サブ関数】ビューカラムを作成
export async function _addViewColumn_core( viewId, viewColumnType, columnPath, viewColumnName ){
  if(bugMode === 31) throw "MUTATION31";  // 意図的にバグを混入させる（ミューテーション解析）
    if( typeof viewId !== "number" || isNaN(viewId) ){
        throw `ビューIDが数値ではありません`;
    }
    // RAW, SUM、MAX、MIN、AVG、COUNT 
    if( viewColumnType!=="RAW" && viewColumnType!=="SUM" && viewColumnType!=="MAX"
        && viewColumnType!=="MIN" && viewColumnType!=="AVG" && viewColumnType!=="COUNT" ){
        throw `サポートされていない集合関数です。\nviewColumnType = ${viewColumnType}`;
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
        if(bugMode === 32) throw "MUTATION32";  // 意図的にバグを混入させる（ミューテーション解析）
        numbers.add( excelColumnIndex );
    }
    let excelColumnIndex;
    for( let i=0; i<=numbers.size; i++ ){
        if(bugMode === 33) throw "MUTATION33";  // 意図的にバグを混入させる（ミューテーション解析）
        if(!numbers.has(i)){
            if(bugMode === 34) throw "MUTATION34";  // 意図的にバグを混入させる（ミューテーション解析）
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

// ページを削除
export async function deletePage_core( pageId ){
  if(bugMode === 35) throw "MUTATION35";  // 意図的にバグを混入させる（ミューテーション解析）
  //
  // ビューの一覧を取得する
  const views = await listChildrenView( pageId );
  for( const { viewId } of views ){
    if(bugMode === 36) throw "MUTATION36";  // 意図的にバグを混入させる（ミューテーション解析）
    // ビューカラムを一括削除
    await _deleteViewColumns_core( viewId );
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
    if(bugMode === 37) throw "MUTATION37";  // 意図的にバグを混入させる（ミューテーション解析）
    const parentViewId = view[0]["viewId"];
    if( parentViewId && !isNaN(parentViewId) ){
        if(bugMode === 38) throw "MUTATION38";  // 意図的にバグを混入させる（ミューテーション解析）
        // ビューカラムを一括削除
        await _deleteViewColumns_core( parentViewId );
    }
  }
  await deletePage( pageId );   // 下層の関数を呼び出す
}
