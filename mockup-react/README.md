# HueShadow React - Portfolio Website

这是一个基于 React + TypeScript 的作品集网站，完全复刻了原 WordPress HueShadow 主题的设计与交互效果。

## 🚀 功能特性

- **Accordion 布局**: 独特的手风琴式页面切换效果
- **响应式设计**: 完美适配桌面端、平板和移动设备
- **鼠标跟踪效果**: 炫酷的鼠标轨迹和背景交互动画
- **动态交互**: 
  - 技能条动画
  - 标题文字动画效果
  - 作品集过滤器
  - 图片灯箱弹窗
  - 轮播组件
  - 标签页切换
- **移动端优化**: 侧边栏导航和触摸友好的交互

## 📁 项目结构

```
src/
├── components/           # React 组件
│   ├── AboutPage.tsx    # 关于页面
│   ├── BlogPage.tsx     # 博客页面
│   ├── ContactPage.tsx  # 联系页面
│   ├── HomePage.tsx     # 首页
│   ├── PortfolioPage.tsx # 作品集页面
│   ├── ResumePage.tsx   # 简历页面
│   ├── Lightbox.tsx     # 图片灯箱组件
│   ├── MobileNav.tsx    # 移动导航
│   ├── MouseTrailer.tsx # 鼠标跟踪效果
│   ├── PortfolioFilter.tsx # 作品集过滤器
│   ├── Slider.tsx       # 轮播组件
│   ├── SkillBar.tsx     # 技能条组件
│   ├── Tabs.tsx         # 标签页组件
│   └── custom-styles.css # 自定义样式
├── hooks/               # 自定义 Hook
│   └── useAnimations.ts # 动画相关 Hook
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 🛠️ 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **CSS3** - 样式和动画
- **Font Awesome** - 图标库

## 📦 安装与运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

## 🎨 设计还原度

- ✅ 完全复刻原主题的视觉设计
- ✅ 保持所有动画和交互效果
- ✅ 响应式布局与原主题一致
- ✅ 字体、颜色、间距精确还原
- ✅ 移动端体验优化

## 📱 响应式断点

- **桌面端**: > 960px
- **平板端**: 768px - 960px  
- **移动端**: < 768px

## 🌟 主要组件说明

### MouseTrailer
- 实现鼠标跟踪效果
- 支持背景视差动画
- 自动检测移动设备并禁用

### Slider
- 通用轮播组件
- 支持自动播放
- 可配置控制按钮和幻灯片编号

### Tabs
- 标签页切换组件  
- 集成技能条动画
- 支持背景切换效果

### PortfolioFilter
- 作品集分类过滤
- 平滑的过渡动画
- 响应式网格布局

## 📄 许可证

本项目仅用于学习和演示目的。原设计版权归 HueShadow 主题作者所有。