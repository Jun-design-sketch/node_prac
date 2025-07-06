#!/bin/bash
echo "[INFO] get json from http start..."
# スクリプトの実行ディレクトリに移動し、現在のパスを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# 現在のパス
cd "$SCRIPT_DIR/.."
# rootへ
# TODO: rootなどの情報をまとめる基盤.shが欲しい
cd "../"
# エントリポイントへ渡す
# node bin/index.js csv-grouping data/input.csv data/output.csv
node bin/index.js getJsonFromHttp

if [ $? -ne 0 ]; then
  echo "[ERROR] get json from http failed"
  exit 1
fi

echo "[INFO] get json from http finished"