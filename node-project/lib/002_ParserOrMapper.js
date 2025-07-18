const fs = require("fs");
const os = require("os");
const path = require("path");
const Base = require("./base/Base");

// TODO: クラス名が微妙
class ParserOrMapper extends Base {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async main() {
    this.readMap(this.filePath);
    this.updateHeader();
  }

  updateHeader(csvPath, headerMap) {

  }

  readMap(filePath) {
    this.logger.info('ファイルをparseします。');
    const map = new Map();

    try {
      const file = fs.readFileSync(filePath, 'utf-8');
      const fileArray = file.split(os.EOL);

      for (const line of fileArray) {
        const eachLine = line.split('=');
        this.logger.info(`巡回する：キーは：${eachLine[0]}、値は：${eachLine[1]}だよ`);
        map.set(eachLine[0], eachLine[1]);
      }

    } catch (error) {
      this.logger.error(`parse失敗：${error}`);
      throw error;
    }

    this.logger.info('ファイルをparseしました。');
    return map;
  }
}
module.exports = ParserOrMapper;