
import {
  startUp,
  close,
  openExcel,
  _launchExcelApp,
  _handleEditExcelFile,
} from "./031_excel_file_validate.js";
import {
  getLocalIp,
} from "./136_ip_address_validate.js";
import {
  getPath,
} from "./133_directory_validate.js";
import {
  getDebugMode,
  getDB,
} from "./130_connect_database_validate.js";
import {
  runSqlReadOnly,
  runSqlWriteOnly,
  getTableId,
  checkColumnEnabled,
  getColumnName,
  getColumnIdFromName,
} from "./109_column_name_validate.js";
import {
  getTimestamp,
} from "./127_timezone_validate.js";
import {
  startTransaction,
  endTransaction,
} from "./124_transaction_lower_validate.js";
import {
  getPrimaryKey,
} from "./121_primary_key_validate.js";
import {
  clearCache,
  listEndpoints,
} from "./025_get_api_info_validate.js";
import {
  createColumn,
  deleteTable,
  createPage,
  updatePageName,
  createView,
  deleteView,
  deletePage,
  pastePage,
  updateView,
  addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  regeneratePage,
} from "./040_regenerate_page_validate.js";
import {
  listDataTypes,
} from "./118_data_type_validate.js";
import {
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  getDataType,
  listColumnsForGUI,
  listColumnsAll,
  getParentTableId,
} from "./100_relation_validate.js";
import {
  createTable,
  updateTableName,
  updateColumnName,
  autoCorrectTableName,
  autoCorrectColumnName,
} from "./097_system_auto_correct_validate.js";
import {
  deleteRecords,
  disableTable,
  enableTable,
  disableColumn,
  enableColumn,
  autoCorrect,
  autoCorrectFromArray,
  scanTexts,
  getConvertProgress,
} from "./103_search_text_validate.js";
import {
  reload,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
} from "./112_table_name_validate.js";
import {
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
} from "./115_sort_validate.js";
import {
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
} from "./085_record_title_validate.js";
import {
  reserveWord,
  checkReservedWord,
} from "./106_reserved_word_validate.js";
import {
  formatField,
} from "./094_db_formatter_validate.js";
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
} from "./088_input_element_validate.js";
import {
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
} from "./082_csv_validate.js";
import {
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
} from "./079_columnPath_validate.js";
import {
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
} from "./076_convert_sql_data_validate.js";
import {
  generateSQLwithoutDuplication,
} from "./073_generate_sql2_validate.js";
import {
  generateSQLwithDuplication,
} from "./070_generate_sql1_validate.js";
import {
  generateSQL,
} from "./058_joinedTable_validate.js";
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
  getViewInfo,
  isExistView,
} from "./064_page_and_view_validate.js";
import {
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
} from "./061_view_column_validate.js";
import {
  getPageDataForGUI,
  getPageDataForExcel,
  myFunc,
} from "./055_page_data_validate.js";
import {
  createDirectories,
} from "./052_frontend_files_validate.js";
import {
  generateViewHTML_table,
  generateViewHTML_card,
  generateViewHTML_button,
} from "./049_regenerate_view_html_validate.js";
import {
  regenerateHTML,
  escapeHTML,
} from "./046_regenerate_html_validate.js";
import {
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
  _getDataType,
} from "./043_regenerate_api_info_validate.js";
import {
  deleteTemplate,
  getExcelTemplate,
  updateExcelTemplate,
} from "./037_excel_template_validate.js";
import {
  updateExcel,
  _updateExcelSheet,
  extractTemplate,
} from "./034_excel_content_validate.js";
import {
  transferData,
  masterFaculty,
  masterLab,
  masterUser,
  masterSpecies,
  masterPhylogeny,
  masterCompany,
  masterOrigin,
  masterProductType,
  masterItem,
  masterPayment,
  masterRoom,
  masterPrice,
  masterAction,
  masterSex,
  buyData,
  broodbookData,
  historyData,
  increaseAndDecreaseData,
  numberOfAnimalData,
  budgetData,
  billData,
  _clearTable,
  _checkSourceTable,
} from "./028_data_transfer_validate.js";
import {
  getEndpointInfo,
} from "./013_api_auto_correct_validate.js";
import {
  runApi,
} from "./004_transaction_upper_validate.js";
import {
  convertQuery,
} from "./022_run_api_validate.js";

export {
  startUp,
  getLocalIp,
  close,
  getPath,
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
  getTimestamp,
  startTransaction,
  endTransaction,
  getPrimaryKey,
  clearCache,
  createColumn,
  listDataTypes,
  createRecord,
  updateRecords,
  checkField,
  checkRecord,
  createTable,
  deleteTable,
  getDataType,
  deleteRecords,
  reload,
  cutRecord,
  copyRecord,
  pasteRecord,
  getCuttingRecord,
  getCopyingRecord,
  _moveRecord,
  _copyRecord,
  _generateRecordSortNumber,
  disableTable,
  enableTable,
  updateTableName,
  listTables,
  checkTableEnabled,
  getTableName,
  listTableNamesAll,
  getTableIdFromName,
  listTablesInSQL,
  disableColumn,
  enableColumn,
  updateColumnName,
  listColumnsForGUI,
  getTableId,
  checkColumnEnabled,
  listColumnsAll,
  getColumnName,
  getColumnIdFromName,
  reserveWord,
  checkReservedWord,
  autoCorrect,
  autoCorrectFromArray,
  scanTexts,
  getConvertProgress,
  getParentTableId,
  autoCorrectTableName,
  autoCorrectColumnName,
  formatField,
  listRecords,
  createRecordFromUI,
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
  setTitleColumn,
  getTitleColumnId,
  _getRecordIdFromTitle,
  setTitleColumnsFromUI,
  _deleteTitleColumn,
  getParentValue,
  _getRecordOffset,
  createRecordsFromCsv,
  getCsvProgress,
  destroyCSV,
  getPathLength,
  slicePath,
  checkPath,
  pathToColumnId,
  getJoinIdMap,
  checkTableDuplication,
  getSelectData,
  getJoinData,
  getWhereData,
  getOrderData,
  generateSQLwithoutDuplication,
  generateSQLwithDuplication,
  generateSQL,
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
  addViewColumn,
  listViewColumns,
  _deleteViewColumns,
  regenerateInputElements,
  _addViewColumn,
  deleteViewColumn,
  reorderViewColumnToRight,
  reorderViewColumnToLeft,
  getPageDataForGUI,
  getPageDataForExcel,
  myFunc,
  createDirectories,
  generateViewHTML_table,
  generateViewHTML_card,
  generateViewHTML_button,
  regenerateHTML,
  escapeHTML,
  regenerateAPI_autoCorrect,
  _getExample,
  regenerateAPI_create,
  regenerateAPI_read,
  regenerateAPI_update,
  regenerateAPI_delete,
  _getDataType,
  regeneratePage,
  deleteTemplate,
  getExcelTemplate,
  updateExcelTemplate,
  updateExcel,
  _updateExcelSheet,
  extractTemplate,
  openExcel,
  _launchExcelApp,
  _handleEditExcelFile,
  transferData,
  masterFaculty,
  masterLab,
  masterUser,
  masterSpecies,
  masterPhylogeny,
  masterCompany,
  masterOrigin,
  masterProductType,
  masterItem,
  masterPayment,
  masterRoom,
  masterPrice,
  masterAction,
  masterSex,
  buyData,
  broodbookData,
  historyData,
  increaseAndDecreaseData,
  numberOfAnimalData,
  budgetData,
  billData,
  _clearTable,
  _checkSourceTable,
  getEndpointInfo,
  listEndpoints,
  runApi,
  convertQuery,
};