// DBフォーマッタ―
//
import {
  startUp,
  clearCache,
  createColumn,
  createRecord,
  updateRecord,
  checkField,
  checkRecord,
  deleteTable,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./079_relation_validate.js";
import {
  getLocalIp,
} from "./112_ip_address_validate.js";
import {
  getPath,
} from "./109_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./106_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
} from "./088_column_name_validate.js";
import {
  close,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./100_csv_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./103_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./097_primary_key_validate.js";
import {
  listDataTypes,
} from "./094_data_type_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  reserveWord,
  checkReservedWord,
} from "./085_reserved_word_validate.js";
import {
  deleteRecord,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  delete_table,
  autoCorrect,
} from "./082_search_text_validate.js";
import {
  reload,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
} from "./091_table_name_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}






// データを整形
export async function formatField_core( inputText, columnId, isRequired ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
    const dataType = await getDataType( columnId );
    switch (dataType) {
        case "INTEGER":
            if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
            if (!isNaN(inputText)) {
                if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
                // 数値に変換できる場合
                inputText = Number(inputText);
                if (!Number.isInteger(inputText)) {
                    throw "小数は指定できません。指定できるのは整数のみです。";
                }
                return inputText;
            }
            // 数値に変換できない場合
            if (inputText) {
                if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄ではない場合
                throw "指定できるのは整数のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        case "REAL":
            if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
            if (!isNaN(inputText)) {
                if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
                // 数値に変換できる場合
                return Number(inputText);
            }
            // 数値に変換できない場合
            if (inputText) {
                if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄ではない場合
                throw "指定できるのは整数のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                if(bugMode === 9) throw "MUTATION9";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        case "TEXT":
            if(bugMode === 10) throw "MUTATION10";  // 意図的にバグを混入させる（ミューテーション解析）
            if (inputText) {
                if(bugMode === 11) throw "MUTATION11";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄ではない場合
                // 文字列に変換して、前後の空白を切り取って、よく確かめる。
                if (String(inputText).trim()) {
                    if(bugMode === 12) throw "MUTATION12";  // 意図的にバグを混入させる（ミューテーション解析）
                    // やっぱり空欄ではない場合
                    return String(inputText);
                }
            }
            // 空欄の場合
            if (isRequired === false) {
                if(bugMode === 13) throw "MUTATION13";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄OKの場合
                return null;
            }
            throw "必須項目が空欄です。";
        case "BOOL":
            if(bugMode === 14) throw "MUTATION14";  // 意図的にバグを混入させる（ミューテーション解析）
            if (inputText === true) {
                if(bugMode === 15) throw "MUTATION15";  // 意図的にバグを混入させる（ミューテーション解析）
                return true;
            }
            else if (inputText === false) {
                if(bugMode === 16) throw "MUTATION16";  // 意図的にバグを混入させる（ミューテーション解析）
                return false;
            }
            if (String(inputText).toLowerCase() === "true") {
                if(bugMode === 17) throw "MUTATION17";  // 意図的にバグを混入させる（ミューテーション解析）
                return true;
            }
            else if (String(inputText).toLowerCase() === "false") {
                if(bugMode === 18) throw "MUTATION18";  // 意図的にバグを混入させる（ミューテーション解析）
                return false;
            }
            if (!isNaN(inputText)) {
                if(bugMode === 19) throw "MUTATION19";  // 意図的にバグを混入させる（ミューテーション解析）
                // 数値に変換できる場合
                return Number(inputText) !== 0;
            }
            // 数値に変換できない場合
            if (inputText) {
                if(bugMode === 20) throw "MUTATION20";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄ではない場合
                throw "指定できるのはBOOL値のみです。";
            }
            // 空欄の場合
            if (isRequired === false) {
                if(bugMode === 21) throw "MUTATION21";  // 意図的にバグを混入させる（ミューテーション解析）
                // 空欄OKの場合
                return null;
            }
            // 空欄NGの場合
            throw "必須項目が空欄です。";
        default:
            throw `サポートされていないデータ型です。detaType="${dataType}"`;
    }
}

