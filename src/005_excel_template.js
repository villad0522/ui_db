// テンプレート管理
//
import {
  startUp,
  deleteView,
  createPage,
  updatePageName,
  createView,
  deletePage,
  pastePage,
  regeneratePage,
  escapeHTML,
} from "./034_regenerate_html_validate.js";
import {
  getLocalIp,
} from "./115_ip_address_validate.js";
import {
  getPath,
} from "./112_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./109_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./091_column_name_validate.js";
import {
  close,
  createDirectories,
} from "./040_frontend_files_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./106_transaction_lower_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./103_csv_validate.js";
import {
  getPrimaryKey,
} from "./100_primary_key_validate.js";
import {
  clearCache,
  listEndpoints,
} from "./031_api_info_validate.js";
import {
  createColumn,
  generateSQL,
  addViewColumn,
} from "./046_view_validate.js";
import {
  listDataTypes,
} from "./097_data_type_validate.js";
import {
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
} from "./070_record_title_1_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./088_reserved_word_validate.js";
import {
  deleteTable,
  listTables,
  setTitleColumn,
  getTitleColumnId,
  getRecordIdFromTitle,
} from "./073_record_title_2_validate.js";
import {
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./082_relation_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./085_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./094_table_name_validate.js";
import {
  formatField,
} from "./079_db_formatter_validate.js";
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
} from "./076_input_element_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./064_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./061_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./058_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./055_generate_sql1_validate.js";
import {
  getPageInfo,
  listViewsFromTableId,
  getTableFromView,
  getBreadcrumbs,
  cutPage,
  copyPage,
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
} from "./049_pages_validate.js";
import {
  getPageData,
} from "./043_page_data_validate.js";
import {
  generateViewHTML,
} from "./037_regenerate_view_html_validate.js";
import {
  getEndpointInfo,
} from "./019_auto_correct_validate.js";
import {
  runApi,
} from "./010_transaction_upper_validate.js";
import {
  convertQuery,
} from "./028_run_api_validate.js";
import {
  updateExcel,
  openExcel,
} from "./007_excel_edit_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}




import path from 'path';
import fs from 'fs';


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
    //
    await reserveWord("excel_templates"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS excel_templates (
            "template_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "template_name" TEXT NOT NULL,
            "excel_file_data" BLOB,
            "created_at" INTEGER UNIQUE
        );`,
        {},
    );
    //
    /*await reserveWord("excel_sheets"); // 予約語に登録
    await runSqlWriteOnly(
        `CREATE TABLE IF NOT EXISTS excel_sheets (
            "sheet_id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "template_id" INTEGER NOT NULL,
            "page_id" INTEGER NOT NULL,
            "sheet_name" TEXT NOT NULL,
            FOREIGN KEY (template_id) REFERENCES excel_templates(template_id),
            FOREIGN KEY (page_id) REFERENCES views(page_id)
        );`,
        {},
    );*/
}



// テンプレートを作成
export async function createTemplate_core( templateName ){
  if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    const staticPath = await getPath( "STATIC_DATA" );
    const excelPath = path.join(staticPath,"light/template.xlsm");
    const excelFileData = await fs.promises.readFile(excelPath);
    //
    const timestamp = new Date().getTime();
    await runSqlWriteOnly(
        `INSERT INTO excel_templates (template_name, excel_file_data, created_at)
            VALUES ( :templateName, :excelFileData, :createdAt );`,
        {
            ":templateName": templateName,
            ":excelFileData": excelFileData,
            ":createdAt": timestamp,
        },
    );
    const templates2 = await runSqlReadOnly(
        `SELECT template_id FROM excel_templates
            WHERE template_name = :templateName
                AND created_at = :createdAt
            LIMIT 1;`,
        {
            ":templateName": templateName,
            ":createdAt": timestamp,
        },
    );
    if(templates2.length===0){
        throw "追加したはずのテンプレートが見つかりません。";
    }
    const templateId = templates2[0]["template_id"];
    if(isNaN(templateId)){
        throw "新しく発行されたテンプレートIDが見つかりません。";
    }
    return {
        templateId: templateId,
        message: `テンプレート「${templateName}」を作成しました。`,
    };
}


// 不可逆的にテンプレートを削除
export async function deleteTemplate_core( templateId ){
  if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    await runSqlWriteOnly(
        `DELETE FROM excel_templates
            WHERE template_id = :templateNumber;`,
        {
            ":templateNumber": templateId.replace("t",""),
        },
    );
    await _reload();    // メモリに再読み込み
    return await deleteTemplate( templateId );  // 下層の関数を実行する
}



// テンプレート名を変更
export async function updateTemplateName_core( templates ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
    //==========================================================
    // テンプレート名が重複していないか確認する
    await _reload();
    const obj = structuredClone(cacheData1);    // ディープコピー
    // データの例
    // obj = {
    //     "t2": "テンプレート名１",
    //     "t8": "テンプレート名２"
    // };
    for (const { id, name } of templates) {
        if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
        obj[id] = name;
    }
    // この時点で、連想配列「obj」には、全てのテンプレート一覧が格納されている。
    // データの例
    // obj = {
    //     "t2": "変更後のテンプレート名１",
    //     "t8": "テンプレート名２"
    // };
    for (const { id, name } of templates) {
        if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
        const newObj = structuredClone(obj);    // ディープコピー
        //
        // 自分自身を除いた、他のテンプレートと名前が被っていないか確認する
        delete newObj[id];    //自分自身を除く
        const templateNameArray = Object.values(newObj);
        if (templateNameArray.includes(name)) {
            throw `テンプレート名「${name}」は重複しています。`;
        }
    }
    //
    //==========================================================
    // テンプレート名を変更する
    for (const { id, name } of templates) {
        if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
        let templateNumber = id.replace("t","");
        if(isNaN(templateNumber)){
            throw "指定されたテンプレートIDは無効です。";
        }
        templateNumber = Number(templateNumber);
        await runSqlWriteOnly(
            `UPDATE excel_templates
                SET template_name = :templateName
                WHERE template_id = :templateNumber;`,
            {
                ":templateName": name,
                ":templateNumber": templateNumber,
            },
        );
    }
    //==========================================================
    await _reload();    // メモリに再読み込み
    return "テンプレート名を変更しました";
}


// テンプレートの一覧を取得(重)
export async function listTemplates_core( pageNumber, onePageMaxSize, isTrash ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
    if ( !pageNumber ) {
        if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    if (!(pageNumber >= 1)) {
        if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
        pageNumber = 1;
    }
    const [{ "COUNT(*)": total }] = await runSqlReadOnly(
        `SELECT COUNT(*)
            FROM excel_templates
            WHERE enable = :isEnable;`,
        {
            // 現存するテンプレート一覧を取得する場合は１
            // 削除済みのテンプレート一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
        },
    );
    let offset = onePageMaxSize * (pageNumber - 1);
    if( offset >= total ){
        if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
        offset = total;
    }
    // 「sqlite_master」と結合させることで、実際に存在するテンプレートのみに絞り込む
    const matrix = await runSqlReadOnly(
        `SELECT
            ( "t" || excel_templates.template_id ) AS id,
            excel_templates.template_name AS name
        FROM excel_templates
        INNER JOIN sqlite_master
            ON ( "t" || excel_templates.template_id ) = sqlite_master.name
        WHERE excel_templates.enable = :isEnable
        ORDER BY excel_templates.created_at DESC
        LIMIT :limit OFFSET :offset;`,
        {
            // 現存するテンプレート一覧を取得する場合は１
            // 削除済みのテンプレート一覧を取得する場合は０
            ":isEnable": isTrash ? 0 : 1,
            ":limit": onePageMaxSize,
            ":offset": offset,
        },
    );
    return {
        "templates": matrix,
        "total": total,
    }
}



// IDからテンプレート名を取得
export async function getTemplateName_core( templateId ){
  if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
  return cacheData1[templateId];
}
