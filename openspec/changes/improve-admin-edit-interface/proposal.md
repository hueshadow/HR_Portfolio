## Why
当前管理后台的编辑页面存在功能重叠问题：RichText编辑器内置的预览功能与分屏编辑模式重复，并且缺少明确的保存操作（提交、保存草稿、保存）。用户需要更清晰的操作和编辑体验。

## What Changes
- 移除RichText编辑器中的独立预览功能，简化编辑界面
- 添加明确的保存操作：提交（ publish ）、保存草稿（ draft ）、保存（ save ）
- 优化编辑器布局，专注于编辑体验而非预览功能
- 改进表单操作按钮的布局和标识
- 添加自动保存和状态保存功能

## Impact
- Affected specs: admin-system
- Affected code: src/components/RichTextDescriptionEditor.tsx, src/components/ReactAdminDashboard.tsx (ProjectEdit, ProjectCreate)
- **BREAKING**: 移除独立的预览功能，编辑器将专注于纯编辑体验