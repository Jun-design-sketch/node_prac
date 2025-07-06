const path = require('path');
const CsvGroupByTool = require('../lib/001_CsvGroupByTool');
const txtMapParser = require('../lib/002_ParserOrMapper');
const getJsonFromHttp = require('../lib/003_getJsonFromHttp');
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
  let inputPath;
  let tool;
  let selectedFeature = process.argv[2];

  try {
    if (selectedFeature === 'csvGroupByTool') {
      inputPath = path.join(config.rootPath, config.csvGroupByToolFilePath);
      tool = new CsvGroupByTool(inputPath);
    } else if (selectedFeature === 'txtMapParser') {
      inputPath = path.join(config.rootPath, config.txtMapParserFilePath);
      tool = new txtMapParser(inputPath);
    } else if (selectedFeature === 'getJsonFromHttp') {
      tool = new getJsonFromHttp();
    }

    await tool.run();

    logger.info('[index.js] process success');
  } catch (err) {
    logger.info(`[index.js] process failed: ${err.message}`);
    process.exit(1);
  }
})();