
import { test129 } from "./129_ip_address_test.js";
import { test126 } from "./126_directory_test.js";
import { test123 } from "./123_connect_database_test.js";
import { test120 } from "./120_transaction_lower_test.js";
import { test117 } from "./117_primary_key_test.js";
import { test114 } from "./114_data_type_test.js";
import { test111 } from "./111_sort_test.js";
import { test108 } from "./108_table_name_test.js";
import { test105 } from "./105_column_name_test.js";
import { test102 } from "./102_reserved_word_test.js";
import { test099 } from "./099_search_text_test.js";
import { test096 } from "./096_relation_test.js";
import { test093 } from "./093_system_auto_correct_test.js";
import { test090 } from "./090_db_formatter_test.js";
import { test087 } from "./087_records_test.js";
import { test084 } from "./084_input_element_test.js";
import { test081 } from "./081_record_title_test.js";
import { test078 } from "./078_csv_test.js";
import { test075 } from "./075_columnPath_test.js";
import { test072 } from "./072_convert_sql_data_test.js";
import { test069 } from "./069_generate_sql2_test.js";
import { test066 } from "./066_generate_sql1_test.js";
import { test063 } from "./063_generate_sql_test.js";
import { test060 } from "./060_page_and_view_test.js";
import { test057 } from "./057_view_column_test.js";
import { test054 } from "./054_joinedTable_test.js";
import { test051 } from "./051_page_data_test.js";
import { test048 } from "./048_frontend_files_test.js";
import { test045 } from "./045_regenerate_view_html_test.js";
import { test042 } from "./042_regenerate_html_test.js";
import { test039 } from "./039_regenerate_api_info_test.js";
import { test036 } from "./036_regenerate_page_test.js";
import { test033 } from "./033_data_transfer_test.js";
import { test030 } from "./030_get_api_info_test.js";
import { test027 } from "./027_run_api_test.js";
import { test024 } from "./024_pagination_test.js";
import { test021 } from "./021_convert_array_test.js";
import { test018 } from "./018_api_auto_correct_test.js";
import { test015 } from "./015_api_validator_test.js";
import { test012 } from "./012_api_document_test.js";
import { test009 } from "./009_transaction_upper_test.js";
import { test006 } from "./006_excel_edit_test.js";
import { test003 } from "./003_excel_template_test.js";


async function test() {
  try {
    if( process.argv.length < 3 ){
      // testNumberが指定されていない場合
      console.log("全てのレイヤーの動作テストを行います。");
      await test129();
      await test126();
      await test123();
      await test120();
      await test117();
      await test114();
      await test111();
      await test108();
      await test105();
      await test102();
      await test099();
      await test096();
      await test093();
      await test090();
      await test087();
      await test084();
      await test081();
      await test078();
      await test075();
      await test072();
      await test069();
      await test066();
      await test063();
      await test060();
      await test057();
      await test054();
      await test051();
      await test048();
      await test045();
      await test042();
      await test039();
      await test036();
      await test033();
      await test030();
      await test027();
      await test024();
      await test021();
      await test018();
      await test015();
      await test012();
      await test009();
      await test006();
      await test003();
      console.log("\n\nテストが終了しました\n");
      return;
    }
    // testNumberが指定されている場合
    const testNumber = Number(process.argv[2]);
    console.log(`テストコード${ testNumber }を実行します。`);
    switch( testNumber ){
      case 129:
        await test129();
        break;
      case 126:
        await test126();
        break;
      case 123:
        await test123();
        break;
      case 120:
        await test120();
        break;
      case 117:
        await test117();
        break;
      case 114:
        await test114();
        break;
      case 111:
        await test111();
        break;
      case 108:
        await test108();
        break;
      case 105:
        await test105();
        break;
      case 102:
        await test102();
        break;
      case 99:
        await test099();
        break;
      case 96:
        await test096();
        break;
      case 93:
        await test093();
        break;
      case 90:
        await test090();
        break;
      case 87:
        await test087();
        break;
      case 84:
        await test084();
        break;
      case 81:
        await test081();
        break;
      case 78:
        await test078();
        break;
      case 75:
        await test075();
        break;
      case 72:
        await test072();
        break;
      case 69:
        await test069();
        break;
      case 66:
        await test066();
        break;
      case 63:
        await test063();
        break;
      case 60:
        await test060();
        break;
      case 57:
        await test057();
        break;
      case 54:
        await test054();
        break;
      case 51:
        await test051();
        break;
      case 48:
        await test048();
        break;
      case 45:
        await test045();
        break;
      case 42:
        await test042();
        break;
      case 39:
        await test039();
        break;
      case 36:
        await test036();
        break;
      case 33:
        await test033();
        break;
      case 30:
        await test030();
        break;
      case 27:
        await test027();
        break;
      case 24:
        await test024();
        break;
      case 21:
        await test021();
        break;
      case 18:
        await test018();
        break;
      case 15:
        await test015();
        break;
      case 12:
        await test012();
        break;
      case 9:
        await test009();
        break;
      case 6:
        await test006();
        break;
      case 3:
        await test003();
        break;
      default:
        console.error(`指定されたテストコード「${ testNumber }」は存在しません。`);
    }
    console.log("\n\nテストが終了しました\n");
  }
  catch (err) {
    console.error(err);
  }
}


test();