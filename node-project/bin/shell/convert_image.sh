# 動機
# AirDropなどで画像をMacに取り込んだとき、アップロードのため.webpに変換したい。
# ----------------------------------------------
# 指定パスにあるすべての$TARGET_TYPEを, $DESTINATION_TYPEに変換させる。 > config.shに設定を設ける。
# INPUT_PATH = カレントディレクトリー
# OUTPUT_PATH = カレントディレクトリー/webp_output/
# ----------------------------------------------
# magickをインストールする必要がある。
# magick --version
# brew install imagemagick
# ----------------------------------------------

# 準備
#!/bin/bash
echo "[INFO] convert image start..."
# .shを実行させた位置を取得しておく
CURRENT_DIR=$(pwd)
echo "[INFO] current directory is : $CURRENT_DIR"
# スクリプトのパスを取得し、設定を読み込む
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source $SCRIPT_DIR/base/config.sh

# 本処理
# GPS情報がある場合、削除する
echo "[INFO] GPS情報の削除を試します。"
exiftool -gps:all= -xmp:geotag= -overwrite_original $CURRENT_DIR/*.$TARGET_TYPE
echo "[INFO] GPS情報の削除完了"

# 画像ファイルの形式を変更
# .$TARGET_TYPEを.$DESTINATION_TYPEへ
echo "[INFO] 該当ディレクトリに存在する ${TARGET_TYPE}を${DESTINATION_TYPE}に変換します。"
mkdir -p $CURRENT_DIR/convert_output
for f in $CURRENT_DIR/*.$TARGET_TYPE; do
  # ファイルであれば処理し、でなければスキップする
  [ -f "$f" ] || continue
  # basenameはファイル名を抽出するUnix系のコマンド。
  # であるが、第２引数は取り除く末尾として使用可能。
  filename_noext="$(basename "$f" ."$TARGET_TYPE")"
  output_file="$CURRENT_DIR/convert_output/${filename_noext}.${DESTINATION_TYPE}"
  # 変換処理（webpの場合にlossless適用）
  if [ "$DESTINATION_TYPE" = "webp" ]; then
    magick "$f" -quality 100 -define webp:lossless=true "$output_file"
  else
    magick "$f" -quality 100 "$output_file"
  fi
  echo "[INFO] ${filename_noext}.${DESTINATION_TYPE}を生成しました。"
done

# 成功・失敗判定
if [ $? -ne 0 ]; then
  echo "[ERROR] convert image failed"
  exit 1
fi
echo "[INFO] 変換結果の格納場所：${CURRENT_DIR}/convert_output/"
echo "[INFO] convert image finished"
