#!/bin/bash

# 自动化开发脚本 - 自动提交代码并启动预览
echo "🎯 开始自动化开发流程..."

# 获取当前时间戳作为标识
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "⏰ $TIMESTAMP"

# 1. 自动提交代码
echo ""
echo "📝 步骤 1: 自动提交代码..."
./auto-commit.sh

if [ $? -ne 0 ]; then
    echo "❌ 代码提交失败"
    exit 1
fi

# 2. 自动启动预览
echo ""
echo "🚀 步骤 2: 启动预览服务器..."
./auto-preview.sh

if [ $? -ne 0 ]; then
    echo "❌ 预览服务器启动失败"
    exit 1
fi

echo ""
echo "🎉 自动化开发流程完成！"
echo "📱 您现在可以在浏览器中查看更改效果"
echo "🔗 访问地址: http://localhost:5173"
