import React, { useState, useCallback, useMemo } from 'react'
import MDEditor from '@uiw/react-md-editor'
import ReactMarkdown from 'react-markdown'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme
} from '@mui/material'
import {
  HelpOutline,
  Edit,
  Code
} from '@mui/icons-material'

interface RichTextDescriptionEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  helperText?: string
  error?: boolean
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

const RichTextDescriptionEditor: React.FC<RichTextDescriptionEditorProps> = ({
  value = '',
  onChange,
  label = '项目描述',
  helperText,
  error = false,
  disabled = false,
  required = false,
  placeholder = '请输入项目描述，支持 Markdown 格式...'
}) => {
  const theme = useTheme()
  const [showHelp, setShowHelp] = useState(false)

  // Markdown help content
  const markdownHelp = useMemo(() => `
# Markdown 语法快速参考

## 文本格式
- **粗体文本**: \`**文本**\`
- *斜体文本*: \`*文本*\`
- ~~删除线~~: \`~~文本~~\`
- \`行内代码\`: \\\`代码\\\`

## 标题
- \`# 一级标题\`
- \`## 二级标题\`
- \`### 三级标题\`

## 列表
### 无序列表
- 项目 1
- 项目 2

### 有序列表
1. 第一项
2. 第二项

## 链接和图片
- 链接: \`[链接文本](https://example.com)\`
- 图片: \`![替代文本](图片地址)\`

## 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |

## 引用
> 这是引用文本

## 代码块
\`\`\`javascript
console.log('Hello World');
\`\`\`

## 分割线
\`\`\`
---
\`\`\`

## 专业案例
### KPI 数据展示
| 指标 | 旧版 | 新版 | 提升 |
|------|------|------|------|
| 用户满意度 | 62% | **78%** | +16pp |
| 任务完成时间 | 4'20'' | **2'05''** | -52% |

### 用户引用
> *"这个界面非常直观，我很容易找到了需要的功能。"*
>
> — 用户访谈反馈

### 技术标签
\`React\` \`TypeScript\` \`Node.js\` \`Material-UI\`
  `, [])

  // 验证 Markdown 内容
  const validateMarkdown = useCallback((content: string) => {
    if (!content) return { errors: [], warnings: [] }

    const errors: string[] = []
    const warnings: string[] = []

    // 检查字符限制
    if (content.length < 10) {
      errors.push('项目描述至少需要 10 个字符')
    }
    if (content.length > 5000) {
      errors.push('项目描述不能超过 5000 个字符')
    }

    // 检查常见的 Markdown 语法错误
    const lines = content.split('\n')
    let codeBlockCount = 0

    lines.forEach((line, index) => {
      // 检查未闭合的代码块
      if (line.trim().startsWith('```')) {
        codeBlockCount++
      }

      // 检查链接格式
      const linkMatches = line.match(/\[([^\]]*)\]\(([^)]*)\)/g)
      if (linkMatches) {
        linkMatches.forEach(link => {
          const urlMatch = link.match(/\[([^\]]*)\]\(([^)]*)\)/)
          if (urlMatch && urlMatch[2] && !urlMatch[2].match(/^https?:\/\//) && !urlMatch[2].startsWith('#')) {
            warnings.push(`第 ${index + 1} 行: 建议使用完整的 URL (包含 http:// 或 https://)`)
          }
        })
      }
    })

    if (codeBlockCount % 2 !== 0) {
      warnings.push('存在未闭合的代码块')
    }

    return { errors, warnings }
  }, [])

  const { errors, warnings } = useMemo(() => validateMarkdown(value), [value, validateMarkdown])

  // 处理内容变化
  const handleChange = useCallback((newValue: string | undefined) => {
    onChange(newValue || '')
  }, [onChange])

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* 标题和帮助按钮 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
          </Typography>
          <IconButton
            onClick={() => setShowHelp(true)}
            size="small"
            title="Markdown 语法帮助"
          >
            <HelpOutline />
          </IconButton>
        </Box>

        {/* 编辑器 */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Edit sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="subtitle2" color="text.secondary">
              编辑内容
            </Typography>
          </Box>
          <MDEditor
            value={value}
            onChange={handleChange}
            preview="edit"
            hideToolbar={false}
            visibleDragbar={false}
            height={400}
            textareaProps={{
              placeholder,
              disabled
            }}
            data-color-mode={theme.palette.mode}
          />
        </Box>

        {/* 验证和提示信息 */}
        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              请修正以下错误：
            </Typography>
            {errors.map((error: string, index: number) => (
              <Typography key={index} variant="body2">
                • {error}
              </Typography>
            ))}
          </Alert>
        )}

        {warnings.length > 0 && (
          <Alert severity="warning" sx={{ mb: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              注意：
            </Typography>
            {warnings.map((warning: string, index: number) => (
              <Typography key={index} variant="body2">
                • {warning}
              </Typography>
            ))}
          </Alert>
        )}

        {/* 统计信息 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            字符数: {value.length} / 5000
          </Typography>
          {helperText && (
            <Typography variant="caption" color={error ? 'error' : 'text.secondary'}>
              {helperText}
            </Typography>
          )}
        </Box>

        {/* 字符数进度条 */}
        <Box sx={{ mt: 1 }}>
          <Box
            sx={{
              height: 4,
              bgcolor: 'grey.200',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: `${Math.min((value.length / 5000) * 100, 100)}%`,
                bgcolor: value.length > 5000 ? 'error.main' : value.length > 4000 ? 'warning.main' : 'success.main',
                transition: 'all 0.3s ease'
              }}
            />
          </Box>
        </Box>
      </CardContent>

      {/* 帮助对话框 */}
      <Dialog
        open={showHelp}
        onClose={() => setShowHelp(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Code sx={{ mr: 1 }} />
            Markdown 语法快速参考
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <Box sx={{ height: '60vh', overflow: 'auto' }}>
            <div className="markdown-help">
              <ReactMarkdown>{markdownHelp}</ReactMarkdown>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHelp(false)}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>

      {/* 内部样式 */}
      <style>{`
        .markdown-help {
          font-family: inherit;
          line-height: 1.6;
        }

        .markdown-help h1,
        .markdown-help h2,
        .markdown-help h3,
        .markdown-help h4,
        .markdown-help h5,
        .markdown-help h6 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-weight: 600;
          line-height: 1.4;
        }

        .markdown-help h1 { font-size: 28px; border-bottom: 3px solid; padding-bottom: 8px; }
        .markdown-help h2 { font-size: 24px; border-bottom: 2px solid; padding-bottom: 6px; }
        .markdown-help h3 { font-size: 20px; border-bottom: 1px solid; padding-bottom: 4px; }

        .markdown-help table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .markdown-help th,
        .markdown-help td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .markdown-help th {
          background: #f8f9fa;
          font-weight: 600;
          color: #555;
        }

        .markdown-help blockquote {
          margin: 16px 0;
          padding: 16px;
          background: #f8f9fa;
          border-left: 4px solid;
          font-style: italic;
        }

        .markdown-help code {
          background: #f1f3f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }

        .markdown-help pre {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 16px 0;
        }
      `}</style>
    </Card>
  )
}

export default RichTextDescriptionEditor