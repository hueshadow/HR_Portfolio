#!/bin/bash

# 自动提交代码脚本
echo "🔍 检查代码更改..."

# 检查是否有未提交的更改
if git diff --quiet && git diff --staged --quiet; then
    echo "✅ 没有需要提交的更改"
    exit 0
fi

# 添加所有更改
echo "📝 添加文件到暂存区..."
git add .

# 检查是否有更改需要提交
if git diff --staged --quiet; then
    echo "✅ 没有新的更改需要提交"
    exit 0
fi

# 生成提交信息
echo "💬 生成提交信息..."
CHANGES=$(git diff --staged --name-only | wc -l)
FILES=$(git diff --staged --name-only | tr '\n' ', ' | sed 's/, $//')

if [ $CHANGES -eq 1 ]; then
    COMMIT_MSG="feat: 更新 $FILES"
else
    COMMIT_MSG="feat: 更新 $CHANGES 个文件"
fi

echo "📤 提交更改..."
git commit -m "$COMMIT_MSG"

echo "🚀 推送代码..."
git push origin main

echo "✅ 代码提交完成！"
