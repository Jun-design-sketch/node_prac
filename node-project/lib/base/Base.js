const logger = require('./logger');

class Base {
  // 基盤クラスの役割1：loggerの持ち込み
  constructor() {
    // グローバル（外）で宣言されてる定数loggerを、クラスの中（インスタンス）のプロパティにする。
    // ので、Baseを継承したクラスからthis.loggerで呼び出せる
    this.logger = logger;
  }

  // 基盤クラスの役割２：初期化パターン作り（テンプレ）
  async run() {
    try {
      this.logger.info(`[Base.js] ${this.constructor.name}を稼働します。`);

      await this.init();
      await this.main();
      await this.finalize();

      this.logger.info(`[Base.js] ${this.constructor.name}を終了します。`);
    } catch (err) {
      this.logger.error(`[Base.js] ${this.constructor.name}でエラー発生：${err.message}`);
      throw err;
    }
  }

  async init() {}

  async finalize() {}

  async main() {
    throw new Error('main()は必ず子クラスで実装してください。');
  }
}
module.exports = Base;