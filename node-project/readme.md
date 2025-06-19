nodeを利用した手元バッチプログラムを作ってみる。
各フォルダの役割を以下の通りにする。。

bin/ バッチのエントリーポイント
config/ 設定の格納
data/ input・outputデータ
lib/ ビジネスロジック
logs/ ログ格納
scripts/ 蹴る起点。.shもしくは.bat
test/ 単体テスト(jest)


機能単位で綺麗に分割できる。
  scripts/run-csv.bat (.sh)
    ↓
  bin/index.js（= エントリーポイント）
    ↓
  config 読み込み、Logger初期化、argvパース
    ↓
  lib/CsvGroupTool.js の run() を呼ぶ
    ↓
  logs に出力しつつ data/input.csv を処理

bin/とlib/って？
bin/ バッチ実行の起点。設定読み込み、パタメータ解析、Logger初期化、lib/の呼び出し
lib/ ビジネスロジック。外部に依存しない純粋な処理（someFunc.js, logger.js, utils.js, ...)