ローカルで稼働するバッチプログラムを好きに作ってみる

node-prac/
├── bin/             # バッチのエントリーポイント
│   ├── bat/         # Windows用の.batファイル
│   └── shell/       # Unix/Linux/MacOS用の.shファイル
├── config/          # 設定の格納
├── data/            # 入力・出力されるデータ
├── lib/             # ビジネスロジック
│   └── base/        # 基盤クラス
├── logs/            # ログ格納
├── scripts/         # 補助用のスクリプト
│   ├── bat/         # Windows用の.batファイル
│   └── shell/       # Unix/Linux/MacOS用の.shファイル
├── test/            # テストコード(jest)
└── README.md        # このプロジェクトの説明ファイル