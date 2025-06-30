const fs = require("fs");
const path = require("path");
const Base = require("./base/Base");

class ParserOrMapper extends Base {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async main() {

  }
}
module.exports = ParserOrMapper;