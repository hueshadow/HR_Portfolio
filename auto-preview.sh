#!/bin/bash

# 自动预览脚本
echo "🚀 启动项目预览..."

# 进入项目目录
cd mockup-react

# 检查是否有正在运行的进程
if pgrep -f "vite" > /dev/null; then
    echo "🔄 重新启动开发服务器..."
    pkill -f "vite"
    sleep 2
fi

# 启动开发服务器（后台运行）
echo "🎯 启动 Vite 开发服务器..."
npm run dev &
SERVER_PID=$!

echo "✅ 开发服务器已启动 (PID: $SERVER_PID)"
echo "📱 请在浏览器中访问: http://localhost:5173"
echo "⏹️  要停止服务器，请运行: pkill -f vite"

# 等待服务器启动
sleep 3

# 检查服务器是否成功启动
if ps -p $SERVER_PID > /dev/null; then
    echo "✅ 服务器运行正常"
else
    echo "❌ 服务器启动失败"
    exit 1
fi
