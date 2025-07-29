#!/bin/bash
# リストにあるファイルだけをソッとコピーしたい。git diffしたら出るから

# ---- 設定 ----
LIST_FILE="path/to/dir/node-prac/node-project/data/copySpecificList/list.txt"   # ファイル名リストのパス
DEST_DIR="path/to/dir/node-prac/node-project/data/copySpecificList/to"  # コピー先ディレクトリ

# コピー先ディレクトリが存在しなければ作成
mkdir -p "$DEST_DIR"

# ファイルリストを1行ずつ読み込んでコピー
while IFS= read -r file; do
    # 空行やコメント行をスキップ
    [[ -z "$file" || "$file" =~ ^# ]] && continue

    # ファイルが存在するか確認してコピー
    if [[ -f "$file" ]]; then

        # default/以降のパスだけ抽出
        rel_path="${file#*/default/}"

        # rel_pathがそのままパスになるのでディレクトリを作成
        mkdir -p "$DEST_DIR/$(dirname "$rel_path")"
        cp "$file" "$DEST_DIR/$rel_path"

    else
        echo "存在しないファイル: $file"
    fi
done < "$LIST_FILE"
