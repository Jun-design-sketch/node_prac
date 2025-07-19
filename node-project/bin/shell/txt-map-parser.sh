#!/bin/bash
echo "[INFO] txt mapper parser start..."
# スクリプトの実行ディレクトリに移動し、現在のパスを取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# 設定を読み込む
source $SCRIPT_DIR/base/config.sh

# 現在のパス
cd "$SCRIPT_DIR/.."
# rootへ
# TODO: rootなどの情報をまとめる基盤.shが欲しい
cd "../"
# エントリポイントへ渡す
# node bin/index.js csv-grouping data/input.csv data/output.csv
node bin/index.js txtMapParser

if [ $? -ne 0 ]; then
  echo "[ERROR] txt mapper parser failed"
  exit 1
fi

echo "[INFO] txt mapper parser finished"
