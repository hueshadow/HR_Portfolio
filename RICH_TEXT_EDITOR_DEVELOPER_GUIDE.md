# 富文本编辑器开发者指南

## 🏗️ 技术架构

### 核心组件
```
src/components/
├── RichTextEditor/
│   ├── RichTextEditor.tsx      # 主编辑器组件
│   ├── MarkdownPreview.tsx     # Markdown 预览组件
│   ├── Toolbar.tsx             # 工具栏组件
│   └── EditorStyles.css        # 编辑器样式
```

### 依赖包
```json
{
  "react-markdown": "^9.0.1",
  "remark-gfm": "^4.0.0",
  "rehype-highlight": "^7.0.0",
  "rehype-raw": "^7.0.0"
}
```

## 📋 API 接口

### RichTextEditor 组件

#### Props
```typescript
interface RichTextEditorProps {
  value: string;                    // 编辑器内容
  onChange: (value: string) => void; // 内容变更回调
  placeholder?: string;             // 占位符文本
  height?: string;                  // 编辑器高度
  previewMode?: 'split' | 'preview' | 'edit'; // 预览模式
  autoFocus?: boolean;              // 自动聚焦
  maxLength?: number;               // 最大字符数
  disabled?: boolean;               // 禁用状态
  className?: string;               // 自定义CSS类
}
```

#### 使用示例
```typescript
import { RichTextEditor } from '@/components/RichTextEditor';

const MyComponent = () => {
  const [content, setContent] = useState<string>('# Hello World\n\nThis is **markdown** content.');

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="开始输入 Markdown 内容..."
      height="400px"
      previewMode="split"
      autoFocus={true}
      maxLength={100000}
    />
  );
};
```

### MarkdownPreview 组件

#### Props
```typescript
interface MarkdownPreviewProps {
  content: string;              // Markdown 内容
  className?: string;           // 自定义CSS类
  allowHtml?: boolean;         // 允许 HTML 标签
  skipHtml?: boolean;          // 跳过 HTML 解析
  linkTarget?: string;         // 链接目标
}
```

#### 使用示例
```typescript
import { MarkdownPreview } from '@/components/RichTextEditor';

const PreviewComponent = () => {
  const markdown = `# Title\n\nSome **bold** text.`;

  return (
    <MarkdownPreview
      content={markdown}
      allowHtml={false}
      linkTarget="_blank"
      className="custom-preview"
    />
  );
};
```

## ⚙️ 配置选项

### Markdown 渲染配置
```typescript
// src/components/RichTextEditor/MarkdownPreview.tsx
const remarkPlugins = [
  remarkGfm,                    // GitHub Flavored Markdown 支持
];

const rehypePlugins = [
  rehypeRaw,                   // 原始 HTML 支持
  rehypeHighlight,             // 代码高亮
];

const components = {
  // 自定义组件映射
  h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
  // ... 更多自定义组件
};
```

### 编辑器配置
```typescript
// 编辑器默认配置
const defaultConfig = {
  height: '500px',
  fontSize: '14px',
  lineHeight: '1.6',
  fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
  tabSize: 2,
  wordWrap: 'soft',
  theme: 'light',
};
```

## 🔧 核心功能实现

### 1. 实时预览同步
```typescript
// 滚动同步实现
const syncScroll = (sourceElement: HTMLElement, targetElement: HTMLElement) => {
  const sourceHeight = sourceElement.scrollHeight - sourceElement.clientHeight;
  const targetHeight = targetElement.scrollHeight - targetElement.clientHeight;

  const scrollPercentage = sourceElement.scrollTop / sourceHeight;
  targetElement.scrollTop = scrollPercentage * targetHeight;
};
```

### 2. 内容验证
```typescript
// 内容验证函数
const validateMarkdown = (content: string): ValidationResult => {
  const errors: string[] = [];

  // 检查链接格式
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const invalidLinks = content.match(linkRegex);
  if (invalidLinks) {
    invalidLinks.forEach(link => {
      if (!isValidUrl(link)) {
        errors.push(`无效链接格式: ${link}`);
      }
    });
  }

  // 检查表格格式
  const tableRegex = /\|.*\|/g;
  const tables = content.match(tableRegex);
  if (tables) {
    // 验证表格格式...
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
```

### 3. 自动保存功能
```typescript
// 本地存储实现
const useAutoSave = (key: string, content: string, delay: number = 1000) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(key, content);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [key, content, delay]);
};
```

### 4. 快捷键处理
```typescript
// 快捷键映射
const shortcuts: Record<string, () => void> = {
  'Ctrl+B': () => insertMarkdown('**', '**'),
  'Ctrl+I': () => insertMarkdown('*', '*'),
  'Ctrl+K': () => insertLink(),
  'Ctrl+Shift+K': () => insertCodeBlock(),
  'Ctrl+Enter': () => togglePreviewMode(),
};

// 快捷键事件处理
const handleKeyDown = (event: KeyboardEvent) => {
  const key = `${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.key}`;

  if (shortcuts[key]) {
    event.preventDefault();
    shortcuts[key]();
  }
};
```

## 🎨 样式系统

### CSS 变量定义
```css
/* src/components/RichTextEditor/EditorStyles.css */
.rich-text-editor {
  --editor-bg-color: #ffffff;
  --editor-border-color: #e1e5e9;
  --editor-text-color: #24292e;
  --editor-font-size: 14px;
  --editor-line-height: 1.6;
  --preview-bg-color: #ffffff;
  --preview-code-bg-color: #f6f8fa;
  --toolbar-height: 40px;
}
```

### 响应式设计
```css
/* 移动端适配 */
@media (max-width: 768px) {
  .rich-text-editor {
    --editor-font-size: 13px;
    --toolbar-height: 36px;
  }

  .editor-container {
    flex-direction: column;
  }

  .editor-preview {
    border-top: 1px solid var(--editor-border-color);
  }
}
```

### 主题切换
```css
/* 暗色主题 */
.rich-text-editor.dark-theme {
  --editor-bg-color: #0d1117;
  --editor-border-color: #30363d;
  --editor-text-color: #c9d1d9;
  --preview-bg-color: #0d1117;
  --preview-code-bg-color: #161b22;
}
```

## 🔌 集成指南

### 1. React Admin 集成
```typescript
// src/components/ReactAdminDashboard.tsx
const RichTextInput = (props: any) => {
  const {
    input: { value, onChange },
    meta: { touched, error },
    ...rest
  } = useInput(props);

  return (
    <div className="rich-text-input">
      <RichTextEditor
        value={value || ''}
        onChange={onChange}
        {...rest}
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};

// 在 Resource 中使用
<Resource
  name="projects"
  edit={ProjectEdit}
  create={ProjectCreate}
/>;

const ProjectEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <RichTextInput source="description" label="项目描述" />
    </SimpleForm>
  </Edit>
);
```

### 2. 数据存储集成
```typescript
// src/dataProvider.ts
const dataProvider = {
  update: async (resource: string, params: any) => {
    const { data } = params;

    // 处理富文本内容
    if (data.description && typeof data.description === 'string') {
      // 验证 Markdown 内容
      const validation = validateMarkdown(data.description);
      if (!validation.isValid) {
        throw new Error(`Markdown 格式错误: ${validation.errors.join(', ')}`);
      }
    }

    // 保存到 localStorage
    const projects = getProjectsFromStorage();
    const updatedProjects = projects.map(project =>
      project.id === data.id ? { ...project, ...data } : project
    );
    saveProjectsToStorage(updatedProjects);

    return { data };
  },
};
```

### 3. 路由集成
```typescript
// src/App.tsx
const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id);

  return (
    <div className="portfolio-detail">
      <MarkdownPreview
        content={project?.description || ''}
        allowHtml={false}
        className="project-description"
      />
    </div>
  );
};
```

## 🧪 测试策略

### 单元测试
```typescript
// src/components/RichTextEditor/__tests__/RichTextEditor.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { RichTextEditor } from '../RichTextEditor';

describe('RichTextEditor', () => {
  test('should render with initial value', () => {
    render(<RichTextEditor value="# Test" onChange={jest.fn()} />);
    expect(screen.getByDisplayValue('# Test')).toBeInTheDocument();
  });

  test('should call onChange when content changes', () => {
    const handleChange = jest.fn();
    render(<RichTextEditor value="" onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '# New Content' } });

    expect(handleChange).toHaveBeenCalledWith('# New Content');
  });
});
```

### 集成测试
```typescript
// src/components/__tests__/RichTextEditorIntegration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReactAdminDashboard } from '../ReactAdminDashboard';

describe('RichTextEditor Integration', () => {
  test('should render in admin dashboard', async () => {
    render(
      <BrowserRouter>
        <ReactAdminDashboard />
      </BrowserRouter>
    );

    // 导航到项目编辑页面
    // 测试富文本编辑器功能
    // 验证数据保存和加载
  });
});
```

## 🔍 性能优化

### 1. 虚拟滚动
```typescript
// 大内容虚拟滚动实现
const useVirtualScroll = (content: string, itemHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    content.split('\n').length
  );

  return {
    visibleStart,
    visibleEnd,
    scrollTop,
    setScrollTop,
  };
};
```

### 2. 防抖处理
```typescript
// 内容变更防抖
const useDebouncedCallback = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
```

### 3. 代码分割
```typescript
// 懒加载 Markdown 预览组件
const MarkdownPreview = lazy(() => import('./MarkdownPreview'));

const RichTextEditor = (props: RichTextEditorProps) => {
  return (
    <div className="rich-text-editor">
      <textarea {...props} />
      <Suspense fallback={<div>加载预览...</div>}>
        <MarkdownPreview content={props.value} />
      </Suspense>
    </div>
  );
};
```

## 🐛 调试和故障排除

### 常见问题
1. **预览不更新**
   - 检查 React 依赖注入
   - 验证 onChange 回调
   - 查看控制台错误

2. **样式冲突**
   - 使用 CSS Modules
   - 检查全局样式影响
   - 验证 CSS 优先级

3. **性能问题**
   - 使用 React.memo 优化渲染
   - 检查防抖函数
   - 监控内存使用

### 调试工具
```typescript
// 开发环境调试
if (process.env.NODE_ENV === 'development') {
  window.RichTextEditorDebug = {
    getEditorState: () => editorRef.current?.getState(),
    validateContent: validateMarkdown,
    getMetrics: () => ({
      contentLength: content.length,
      renderTime: performance.now(),
    }),
  };
}
```

## 📈 监控和分析

### 性能指标
```typescript
// 性能监控
const usePerformanceMonitor = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'markdown-render') {
          console.log(`Markdown 渲染时间: ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);
};
```

### 错误追踪
```typescript
// 错误边界
class RichTextEditorErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('富文本编辑器错误:', error, errorInfo);

    // 发送错误报告
    if (process.env.NODE_ENV === 'production') {
      // 错误报告服务
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>编辑器加载失败，请刷新页面重试</div>;
    }

    return this.props.children;
  }
}
```

---

**🚀 这份开发者文档将帮助您理解和扩展富文本编辑器功能！**