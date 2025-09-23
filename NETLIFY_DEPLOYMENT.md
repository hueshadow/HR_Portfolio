# Netlify 部署指南

## 配置已完成

已为您的项目创建了以下 Netlify 配置文件：

1. **netlify.toml** - 主要配置文件
   - 构建命令：`cd mockup-react && npm install && vite build`
   - 发布目录：`mockup-react/dist`
   - SPA 路由重定向配置
   - Node.js 版本：18

2. **.npmrc** - npm 配置文件

## 部署步骤

### 方法一：通过 GitHub 连接（推荐）

1. 将代码推送到 GitHub 仓库
2. 登录 [Netlify](https://app.netlify.com)
3. 点击 "New site from Git"
4. 选择 GitHub 仓库
5. 构建设置：
   - Build command: `cd mockup-react && npm install && vite build`
   - Publish directory: `mockup-react/dist`
   - Node version: 18

### 方法二：通过拖放部署

1. 运行构建命令：
   ```bash
   cd mockup-react
   npm install
   vite build
   ```

2. 将 `mockup-react/dist` 文件夹拖放到 Netlify 控制台

### 方法三：使用 Netlify CLI

1. 安装 Netlify CLI：
   ```bash
   npm install -g netlify-cli
   ```

2. 登录 Netlify：
   ```bash
   netlify login
   ```

3. 部署：
   ```bash
   netlify deploy --prod --dir=mockup-react/dist
   ```

## 注意事项

- 项目是单页应用（SPA），已配置路由重定向
- 如果遇到构建问题，Netlify 会自动安装依赖
- 可以通过环境变量配置其他设置