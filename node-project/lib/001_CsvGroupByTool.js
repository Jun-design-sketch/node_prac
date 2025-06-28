const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const Base = require("./base/Base");

// グルーピングの基準にしたいカラム
const groupByColumns = ["AAAAA", "BBBBB", "CCCCC"];
// 合計を求めたいカラム
const sumColumns = ["SUM_OF_SOMETHING_001", "SUM_OF_OTHER_THING_002"];
// 表示したいカラム
const displayColumns = ["DISPLAY_001", "DISPLAY_002", "DISPLAY_003"];

class CsvGroupByTool extends Base {
  // 処理対象とするCSVパス
  csvPath;

  /**
   * @param csvPath
   * コンストラクター
   */
  constructor(csvPath) {
    super();
    this.csvPath = csvPath;
  }

  /**
   * メイン処理
   */
  async main() {
    this.logger.info(`[${this.constructor.name}] Start`);
    const results = {};
    const outputFilePath = path.join(this.config.rootPath, this.config.outputFilePath);

    return new Promise((resolve, reject) => {
      // csvファイルのストリームを取得する：チャンク単位でデータ流し
      fs.createReadStream(this.csvPath)
        // ストリームをcsv-parserに繋げる：チャンクを行単位にする、形式を整理
        .pipe(csv())
        // 1行単位で処理を開始
        .on("data", (row) => {
          // グループ化したい列名から、行毎のグループ化すべき値を連結
          const groupKey = groupByColumns.map((col) => row[col]).join("||");
          // 結果配列になければ、追加する
          if (!results[groupKey]) {
            results[groupKey] = {
              sums: {},
              display: {},
              count: 0,
            };

            // 初期化：集計用カラム
            sumColumns.forEach((col) => (results[groupKey].sums[col] = 0));

            // 初期化：表示カラム
            displayColumns.forEach(
              (col) => (results[groupKey].display[col] = row[col])
            );
          }

          results[groupKey].count++;

          // 集計処理
          sumColumns.forEach((col) => {
            const value = parseFloat(row[col]);
            if (!isNaN(value)) {
              results[groupKey].sums[col] += value;
            }
          });

          // 表示カラムの一貫性チェック
          displayColumns.forEach((col) => {
            if (results[groupKey].display[col] !== row[col]) {
              console.warn(
                `警告: グループ「${groupKey}」内のカラム「${col}」の値が一致しません: ${results[groupKey].display[col]} vs ${row[col]}`
              );
            }
          });
        })
        .on("end", async () => {
          // CSV出力データ整形
          const outputData = Object.entries(results).map(([key, data]) => {
            const groupKeys = key.split("||");
            const record = {};

            groupByColumns.forEach((col, idx) => {
              record[col] = groupKeys[idx];
            });

            sumColumns.forEach((col) => {
              record[`sum_${col}`] = data.sums[col];
            });

            displayColumns.forEach((col) => {
              record[col] = data.display[col];
            });

            return record;
          });

          // CSV書き出し
          const csvWriter = createCsvWriter({
            path: outputFilePath,
            header: [
              ...groupByColumns.map((col) => ({ id: col, title: col })),
              ...sumColumns.map((col) => ({
                id: `sum_${col}`,
                title: `sum_${col}`,
              })),
              ...displayColumns.map((col) => ({ id: col, title: col })),
            ],
          });

          await csvWriter.writeRecords(outputData);
          this.logger.info(`[${this.constructor.name}] Success`);
          this.logger.info(`[${this.constructor.name}] ${outputFilePath}を書き出しました。`);
          resolve();
        })
        .on("error", reject);
    });
  }
}
module.exports = CsvGroupByTool;
