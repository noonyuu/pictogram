#!/bin/bash

# 引数を取得
feature_name=$1

# 引数がない場合はエラーメッセージを表示
if [ -z "$feature_name" ]; then
    echo "Usage: $0 <feature_name>"
    exit 1
fi

# フォルダを作成
mkdir -p "src/feature/$feature_name"

# ファイルを作成
mkdir "src/feature/$feature_name/components"
mkdir "src/feature/$feature_name/pages"

# pagesフォルダにindex.tsxを作成
touch "src/feature/$feature_name/pages/index.tsx"
