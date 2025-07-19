#!/bin/bash
echo "[INFO] transfer file start..."
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
# TODO asyncコマンドでshレベルで処理できる？

if [ $? -ne 0 ]; then
  echo "[ERROR] transfer file failed"
  exit 1
fi

echo "[INFO] transfer file finished"
