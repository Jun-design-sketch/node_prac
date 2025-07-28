#!/bin/bash

TARGET_DIR="PATH/TO/DIR"

# TARGET_STRING="Change"
# DESTINATION_STRING="Change"
TARGET_STRING="AaAaBbBbCcCcC"
DESTINATION_STRING="AaAaBbBbCcCcC"

cd "$TARGET_DIR" || exit

# *someNameDir* は、ファイル名に someNameDir を含むすべてのファイルを対象とするパターン。
for f in *$TARGET_STRING*; do
    # 新しい名前を作成
    # ${変数/置換前/置換後}はbashのパラメータ展開機能。
    newname="${f/$TARGET_STRING/$DESTINATION_STRING}"

    echo mv "$f" "$newname"
    mv "$f" "$newname"
done
