const path = require('path');
const CsvGroupByTool = require('../lib/001_CsvGroupByTool');
// 何でconsole.log()ではダメなの？
// ファイルの保存、ログレベルの分類がしたいから
// devlelopログとoperationログが混在する。種類分けによる収集が困難
// 時間・ログレベル・位置などの情報を自動で残したい
const logger = require('../lib/base/logger');
const config = require('../config/config.json');

// TODO: index.jsのエントリポイントとしての役割とは
logger.info('[index.js] initiating...');

// 即時実行関数(Immediately Invoked Function Expression)
// async() => {} は、関数定義のみ
// async() => {}() は、定義し即実行
(async () => {
  try {
    const inputPath = process.argv[2] || path.join(config.rootPath, config.inputFilePath);
    // const outputPath = process.argv[3] || path.join(__dirname, '../data/output.csv');

    const tool = new CsvGroupByTool(inputPath);
    await tool.run();

    logger.info('[index.js] csv batch success');
  } catch (err) {
    logger.info(`[index.js] batch failed: ${err.message}`);
    process.exit(1);
  }
})();