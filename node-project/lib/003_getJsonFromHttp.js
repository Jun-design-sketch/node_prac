const fs = require("fs");
const path = require("os");
const Base = require("./base/Base");

class getJsonFromHttp extends Base {
  constructor() {
    super();
  }

  // async-await JSONをリクエスト
  async init() {
    this.logger.info(`[${this.constructor.name}] initializing...`);
  }

  async main() {
    this.logger.info(`[${this.constructor.name}] Start`);
    // asyncをawaitせずに呼び出すと、ただのpromiseが返されるし
    // main()の流れはsimpleFetch()を待たずに進んでしまう。。
    // const result = this.simpleFetch();
    // this.logger.info(`[${this.constructor.name}] data response in main() : ${result}`);

    // つまりこうすると、順次実行になる。。
    const result = await this.simpleFetch();
    this.logger.info(`[${this.constructor.name}] data response in main() : ${result}`);

    this.logger.info(`[${this.constructor.name}] Success`);
  }

  async finalize() {
    this.logger.info(`[${this.constructor.name}] turning off...`);
  }

  async simpleFetch() {
    this.logger.info(`[${this.constructor.name}] data requesting...`);

    // promise example: await()しないと、pending状態のまま通り抜けられる。
    const prom = new Promise((resolve, reject) => {
      // pending
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // fullfilled
          resolve("yay!");
        } else {
          // rejected
          reject("oops...");
        }
      }, 2000);
    });

    //　await：「ここで待ってて！」
    try {
      const ex1 = await prom;
      this.logger.info(`成功！ return: ${ex1}`);
    } catch (err) {
      this.logger.info(`失敗！ return: ${err}`);
    }
    // then「終わったらこれやって！」
    // prom
    //   .then(res => {
    //     this.logger.info(`promiseをthenで待ち伏せしました。response: ${res}`);
    //   })
    //   .catch(err => {
    //     this.logger.info(`promiseをthenで待ち伏せしたら。。error: ${err}`);
    //   });

    // fetch()はnode18以上から基本搭載
    // await は 現在の関数スコープ（async 関数）内でだけ非同期処理を待つ。
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await res.json();
    const keys = ['title', 'body'];
    const dataStr = JSON.stringify(data, keys, 4);
    this.logger.info(`[${this.constructor.name}] data response! ${dataStr}`);
    return dataStr;
  }
}
module.exports = getJsonFromHttp;