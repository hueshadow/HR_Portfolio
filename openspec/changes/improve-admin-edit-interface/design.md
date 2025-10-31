## Context
当前管理后台编辑页面使用MDEditor富文本编辑器，该编辑器提供了编辑模式和预览模式。然而，预览功能与编辑体验产生冲突，用户无法专注于编辑，同时缺少明确的保存操作指示。

## Goals / Non-Goals
- Goals: 简化编辑界面，提供清晰的保存操作（提交、草稿、保存）
- Goals: 移除重复的预览功能，专注于编辑体验
- Goals: 改进用户对保存状态的理解和控制
- Non-Goals: 添加复杂的预览功能或编辑器功能扩展
- Non-Goals: 改变现有的数据结构或存储方式

## Decisions
- Decision: 移除MDEditor的预览功能标签页，保持纯编辑模式
- Decision: 添加三种保存状态：草稿（draft）、已保存（saved）、已发布（published）
- Decision: 在表单底部添加明确的操作按钮组
- Decision: 实现自动保存功能，防止数据丢失
- Alternatives considered: 使用其他编辑器、保留预览但改进布局

## 保存状态定义
```typescript
enum ProjectStatus {
  DRAFT = 'draft',      // 草稿 - 未完成编辑
  SAVED = 'saved',      // 已保存 - 编辑完成但未发布
  PUBLISHED = 'published' // 已发布 - 正式发布状态
}
```

## UI布局改进
```
编辑表单布局:
┌─────────────────────────────────────┐
│ 表单字段 (标准React Admin布局)         │
├─────────────────────────────────────┤
│ 操作按钮组:                          │
│ [保存草稿] [保存] [提交发布]          │
│                                     │
│ 状态指示: "最后保存于 2分钟前"       │
└─────────────────────────────────────┘
```

## 自动保存策略
- 编辑器内容变化时触发自动保存（debounced 5秒）
- 自动保存到localStorage，标记为"自动保存"状态
- 页面刷新时恢复自动保存的内容
- 明确的手动保存操作覆盖自动保存

## Migration Plan
1. 更新RichTextDescriptionEditor，移除预览功能
2. 修改ProjectEdit和ProjectCreate组件，添加保存操作
3. 实现自动保存逻辑
4. 更新数据模型，添加status字段
5. 测试所有保存操作和状态管理

## Open Questions
- 是否需要为项目添加发布状态字段？
- 自动保存的频率和触发策略？
- 是否需要添加草稿恢复提示功能？