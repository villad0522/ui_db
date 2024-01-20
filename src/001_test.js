
import { test068 } from "./068_ip_address_test.js";
import { test065 } from "./065_directory_test.js";
import { test062 } from "./062_connect_database_test.js";
import { test059 } from "./059_primary_key_test.js";
import { test056 } from "./056_data_type_test.js";
import { test053 } from "./053_table_name_test.js";
import { test050 } from "./050_column_name_test.js";
import { test047 } from "./047_reserved_word_test.js";
import { test044 } from "./044_record_title_2_test.js";
import { test041 } from "./041_relation_test.js";
import { test038 } from "./038_search_text_test.js";
import { test035 } from "./035_sort_test.js";
import { test032 } from "./032_columnPath_test.js";
import { test029 } from "./029_convert_sql_data_test.js";
import { test026 } from "./026_generate_sql2_test.js";
import { test023 } from "./023_generate_sql1_test.js";
import { test020 } from "./020_generate_sql_test.js";
import { test017 } from "./017_record_title_1_test.js";
import { test014 } from "./014_frontend_files_test.js";
import { test011 } from "./011_api_info_test.js";
import { test008 } from "./008_run_api_test.js";
import { test005 } from "./005_pagination_test.js";
import { test002 } from "./002_layerName_test.js";


async function test() {
  try {
    if( process.argv.length < 3 ){
      // testNumberが指定されていない場合
      console.log("全てのレイヤーの動作テストを行います。");
      await test068();
      await test065();
      await test062();
      await test059();
      await test056();
      await test053();
      await test050();
      await test047();
      await test044();
      await test041();
      await test038();
      await test035();
      await test032();
      await test029();
      await test026();
      await test023();
      await test020();
      await test017();
      await test014();
      await test011();
      await test008();
      await test005();
      await test002();
      console.log("\n\nテストが終了しました\n");
      return;
    }
    // testNumberが指定されている場合
    const testNumber = Number(process.argv[2]);
    console.log(`テストコード${ testNumber }を実行します。`);
    switch( testNumber ){
      case 68:
        await test068();
        break;
      case 65:
        await test065();
        break;
      case 62:
        await test062();
        break;
      case 59:
        await test059();
        break;
      case 56:
        await test056();
        break;
      case 53:
        await test053();
        break;
      case 50:
        await test050();
        break;
      case 47:
        await test047();
        break;
      case 44:
        await test044();
        break;
      case 41:
        await test041();
        break;
      case 38:
        await test038();
        break;
      case 35:
        await test035();
        break;
      case 32:
        await test032();
        break;
      case 29:
        await test029();
        break;
      case 26:
        await test026();
        break;
      case 23:
        await test023();
        break;
      case 20:
        await test020();
        break;
      case 17:
        await test017();
        break;
      case 14:
        await test014();
        break;
      case 11:
        await test011();
        break;
      case 8:
        await test008();
        break;
      case 5:
        await test005();
        break;
      case 2:
        await test002();
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