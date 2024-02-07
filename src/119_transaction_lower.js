// トランザクション処理
//
import {
  startUp,
  close,
  getDebugMode,
  runSqlReadOnly,
  runSqlWriteOnly,
  getDB,
} from "./121_connect_database_validate.js";
import {
  getLocalIp,
} from "./127_ip_address_validate.js";
import {
  getPath,
} from "./124_directory_validate.js";


//【グローバル変数】意図的にバグを混入させるか？（ミューテーション解析）
let bugMode = 0;
//           0 : バグを混入させない（通常動作）
//     1,2,3.. : 意図的にバグを混入させる


export function setBugMode( mode ){
    bugMode = mode;
}



// 使用したnpmパッケージ「sqlite」
//  https://github.com/kriasoft/node-sqlite#readme


// 定数
const ON = 1;
const OFF = 2;
const BEGIN = 3;
const COMMIT = 4;

//【グローバル変数】トランザクション処理中？
let transactionMode = OFF;


// プログラム起動
export async function startUp_core( localUrl, isDebug ){
  if(bugMode === 1) throw "MUTATION1";  // 意図的にバグを混入させる（ミューテーション解析）
  let buf = transactionMode;
  if( transactionMode===ON ){
    if(bugMode === 2) throw "MUTATION2";  // 意図的にバグを混入させる（ミューテーション解析）
    await endTransaction_core();
  }
  await startUp( localUrl, isDebug );   // 下層の関数を呼び出す
  transactionMode = OFF;
  if (buf === ON) {
    if(bugMode === 3) throw "MUTATION3";  // 意図的にバグを混入させる（ミューテーション解析）
    await startTransaction_core();
  }
}


const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

// トランザクション処理開始
export async function startTransaction_core(  ){
  if(bugMode === 4) throw "MUTATION4";  // 意図的にバグを混入させる（ミューテーション解析）
  const db = await getDB();
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  await new Promise( async (resolve, reject) => {
    for( let i=0; (i<50) && (transactionMode===COMMIT); i++ ){
      if(bugMode === 5) throw "MUTATION5";  // 意図的にバグを混入させる（ミューテーション解析）
      await sleep(100);
    }
    resolve();
  });
  if( transactionMode===ON || transactionMode===BEGIN )return;
  if( transactionMode!==OFF ){
    throw "トランザクションモードが想定外です。";
  }
  try{
    transactionMode = BEGIN;
    await db.run("BEGIN TRANSACTION;");
    transactionMode = ON;
  }
  catch(err){
    console.error(err);
    throw new Error(`トランザクション処理を開始しようとしましたが、エラーが発生しました。`);
  }
}



// トランザクション処理終了
export async function endTransaction_core(  ){
  if(bugMode === 6) throw "MUTATION6";  // 意図的にバグを混入させる（ミューテーション解析）
  const db = await getDB();
  if(!db){
    throw "データベースオブジェクト(db)がNULLです。";
  }
  await new Promise(async (resolve, reject) => {
    for( let i=0; (i<50) && (transactionMode===BEGIN); i++ ){
      if(bugMode === 7) throw "MUTATION7";  // 意図的にバグを混入させる（ミューテーション解析）
      await sleep(100);
    }
    resolve();
  });
  if( transactionMode===OFF || transactionMode===COMMIT )return;
  if( transactionMode!==ON ){
    throw "トランザクションモードが想定外です。";
  }
  try{
    transactionMode = COMMIT;
    await db.run("COMMIT TRANSACTION;");
    transactionMode = OFF;
  }
  catch(err){
    console.error(err);
    throw new Error(`トランザクション処理を終了しようとしましたが、エラーが発生しました。`);
  }
}



// バックエンドプログラム終了
export async function close_core(  ){
  if(bugMode === 8) throw "MUTATION8";  // 意図的にバグを混入させる（ミューテーション解析）
  transactionMode = OFF;
  await close();
  transactionMode = OFF;
}
