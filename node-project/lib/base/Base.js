const logger = require('./logger');

class Base {
  // 基盤クラスの役割1：loggerの持ち込み
  constructor() {
    this.logger = logger;
  }

  // 基盤クラスの役割２：初期化パターン作り（テンプレ）
  async run() {
    try {
      this.logger.info('[START]');
      this.logger.info('[END]');
    } catch (err) {
      this.logger.error('[ERROR]');
      throw err;
    }
  }

  async init() {}

  async finalize() {}

  async main() {
    throw new Error('main()は必ず子クラスで実装してください。');
  }
}