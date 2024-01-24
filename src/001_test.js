
import { test093 } from "./093_ip_address_test.js";
import { test090 } from "./090_directory_test.js";
import { test087 } from "./087_connect_database_test.js";
import { test084 } from "./084_primary_key_test.js";
import { test081 } from "./081_data_type_test.js";
import { test078 } from "./078_table_name_test.js";
import { test075 } from "./075_column_name_test.js";
import { test072 } from "./072_reserved_word_test.js";
import { test069 } from "./069_record_title_2_test.js";
import { test066 } from "./066_relation_test.js";
import { test063 } from "./063_search_text_test.js";
import { test060 } from "./060_record_title_1_test.js";
import { test057 } from "./057_sort_test.js";
import { test054 } from "./054_columnPath_test.js";
import { test051 } from "./051_convert_sql_data_test.js";
import { test048 } from "./048_generate_sql2_test.js";
import { test045 } from "./045_generate_sql1_test.js";
import { test042 } from "./042_generate_sql_test.js";
import { test039 } from "./039_pages_test.js";
import { test036 } from "./036_joined_table_test.js";
import { test033 } from "./033_frontend_files_test.js";
import { test030 } from "./030_regenerate_html_test.js";
import { test027 } from "./027_api_info_test.js";
import { test024 } from "./024_run_api_test.js";
import { test021 } from "./021_pagination_test.js";
import { test018 } from "./018_convert_array_test.js";
import { test015 } from "./015_api_validator_test.js";
import { test012 } from "./012_api_document_test.js";
import { test009 } from "./009_transaction_test.js";
import { test006 } from "./006_excel_edit_test.js";
import { test003 } from "./003_excel_template_test.js";


async function test() {
  try {
    if( process.argv.length < 3 ){
      // testNumberが指定されていない場合
      console.log("全てのレイヤーの動作テストを行います。");
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