# Portfolio 项目顺序调整指南

## 快速解决方案（推荐）⚡

**在浏览器控制台运行以下代码：**

1. 访问网站主页（例如：`http://localhost:5173` 或您的部署URL）
2. 按 **F12** 打开开发者工具
3. 切换到 **Console（控制台）** 标签
4. 复制以下代码并粘贴，然后按回车：

```javascript
// 快速将华为云移到第一位
(function() {
    const data = JSON.parse(localStorage.getItem('projectsData') || '[]');
    const idx = data.findIndex(p => p.title.includes('华为云'));
    if (idx > 0) {
        const item = data.splice(idx, 1)[0];
        data.unshift(item);
        localStorage.setItem('projectsData', JSON.stringify(data));
        console.log('✅ 华为云已移至第一位！');
        location.reload();
    } else {
        console.log('✅ 华为云已经在第一位');
    }
})();
```

---

## 方案二：使用可视化工具 🎨

访问项目顺序调整工具页面：
- 本地开发：`http://localhost:5173/reorder-projects.html`
- 线上环境：`https://your-domain.com/reorder-projects.html`

在页面中：
1. 查看当前所有项目列表
2. 使用 ↑↓ 按钮调整项目顺序
3. 点击"保存顺序"按钮
4. 刷新主页查看效果

---

## 方案三：通过 Admin 系统调整 🔐

1. 登录 Admin 系统：`http://localhost:5173/admin/login`
   - 用户名：`admin@example.com`
   - 密码：`admin123`

2. 进入 Projects 管理页面

3. 手动调整每个项目的显示顺序：
   - 编辑每个项目
   - 修改创建时间（`createdAt`）来影响排序
   - 或者删除并重新创建项目以调整顺序

---

## 方案四：清除缓存重置为默认顺序 🔄

如果你想恢复到代码中的默认顺序：

1. 在浏览器控制台运行：
```javascript
localStorage.removeItem('projectsData');
localStorage.removeItem('portfolioSynced');
location.reload();
```

2. 刷新页面后，将使用 `src/data/portfolio.ts` 中的初始顺序

---

## 默认项目顺序

代码中的默认顺序（`src/data/portfolio.ts`）：
1. 华为云 (id: 1)
2. 华为分析 (id: 2)
3. 火柴盒项目 (id: 3)
4. Business Connect (id: 4)

---

## 常见问题

### Q: 为什么页面显示的顺序和代码中的不一样？
A: 如果你通过 Admin 系统编辑过项目，数据会保存在 localStorage 中，覆盖默认顺序。

### Q: 如何让顺序永久生效？
A: 调整后的顺序保存在浏览器的 localStorage 中。如果清除浏览器数据，会恢复默认顺序。

### Q: 部署到线上后顺序会变吗？
A: 不会。localStorage 是独立于每个浏览器的。线上和本地的顺序互不影响。

---

## 技术说明

项目数据优先级：
1. **localStorage** 中的 `projectsData`（通过 Admin 系统修改的数据）
2. 代码中的 `initialPortfolioItems`（默认数据）

如果存在 localStorage 数据，系统会优先使用它。
