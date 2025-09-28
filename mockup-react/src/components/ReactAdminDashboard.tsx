import React, { useState } from 'react'
import {
  Admin,
  Resource,
  List,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  BooleanInput,
  ImageField,
  ImageInput,
  FileInput,
  FileField,
  useNotify,
  useRedirect,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ChipField,
  EditButton,
  DeleteButton,
  CreateButton,
  ExportButton,
  FilterButton,
  TopToolbar,
  SearchInput,
  Pagination,
  SelectColumnsButton,
  BulkDeleteButton,
  BulkExportButton,
  useLogin,
  useCreate,
  useRefresh
} from 'react-admin'
import WorkIcon from '@mui/icons-material/Work'
import LoginIcon from '@mui/icons-material/Login'
import AddIcon from '@mui/icons-material/Add'
import { createTheme } from '@mui/material/styles'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  Chip,
  Stack,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { dataProvider } from '../dataProvider'
import authProvider from '../authProvider'

// 快速创建项目组件
const QuickCreateButton = () => {
  const [create] = useCreate()
  const [showDialog, setShowDialog] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    category: 'web'
  })
  const notify = useNotify()
  const refresh = useRefresh()

  const handleClick = () => {
    setShowDialog(true)
  }

  const handleClose = () => {
    setShowDialog(false)
    setFormValues({ title: '', description: '', category: 'web' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formValues.title.trim()) {
      notify('请输入项目名称', { type: 'warning' })
      return
    }

    create(
      'projects',
      {
        data: {
          ...formValues,
          date: new Date().toISOString().split('T')[0],
          featured: false,
          tags: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        onSuccess: () => {
          notify('项目创建成功！', { type: 'success' })
          refresh()
          handleClose()
        },
        onError: (error: any) => {
          notify(`创建失败：${error.message}`, { type: 'error' })
        }
      }
    )
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<AddIcon />}
        sx={{ mr: 1 }}
      >
        快速创建
      </Button>

      <Dialog open={showDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>快速创建项目</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <TextInput
                source="title"
                label="项目名称"
                value={formValues.title}
                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                fullWidth
                required
                autoFocus
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextInput
                source="description"
                label="项目描述"
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <SelectInput
                source="category"
                label="分类"
                value={formValues.category}
                onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                choices={[
                  { id: 'web', name: '网站开发' },
                  { id: 'app', name: '应用开发' },
                  { id: 'design', name: 'UI设计' },
                  { id: 'branding', name: '品牌设计' }
                ]}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type="submit" variant="contained" color="primary">
              创建
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

// 自定义主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b94ff',
      dark: '#3949ab'
    },
    secondary: {
      main: '#764ba2',
      light: '#a379c3',
      dark: '#4a148c'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500
        }
      }
    }
  }
})

// 项目列表页面
const ProjectList = () => {

  const ProjectFilters = [
    <SearchInput source="q" alwaysOn />,
    <SelectInput
      source="category"
      label="分类"
      choices={[
        { id: 'web', name: '网站开发' },
        { id: 'app', name: '应用开发' },
        { id: 'design', name: 'UI设计' },
        { id: 'branding', name: '品牌设计' }
      ]}
    />
  ]

  return (
    <List
      filters={ProjectFilters}
      perPage={10}
      pagination={<Pagination rowsPerPageOptions={[10, 25, 50]} />}
      actions={<ListActions />}
    >
      <Datagrid rowClick="edit" bulkActionButtons={<BulkActions />}>
        <ImageField
          source="image"
          label="封面"
          sx={{
            '& img': { width: 50, height: 50, objectFit: 'cover', borderRadius: 1 }
          }}
        />
        <TextField source="title" label="项目名称" />
        <ChipField
          source="category"
          label="分类"
          sx={{
            '& .RaChipField-label': {
              backgroundColor: '#e3f2fd',
              color: '#1976d2'
            }
          }}
        />
        <DateField source="date" label="日期" locales="zh-CN" />
        <BooleanField
          source="featured"
          label="精选"
          sx={{ color: '#ff9800' }}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}

// 列表操作按钮
const ListActions = () => (
  <TopToolbar>
    <QuickCreateButton />
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
)

// 批量操作
const BulkActions = () => (
  <>
    <BulkExportButton />
    <BulkDeleteButton />
  </>
)

// 项目编辑页面
const ProjectEdit = () => (
  <Edit title="编辑项目">
    <SimpleForm>
      <TextInput source="title" label="项目名称" fullWidth validate={required()} />
      <TextInput source="description" label="项目描述" multiline rows={4} fullWidth validate={required()} />

      <SelectInput
        source="category"
        label="分类"
        choices={[
          { id: 'web', name: '网站开发' },
          { id: 'app', name: '应用开发' },
          { id: 'design', name: 'UI设计' },
          { id: 'branding', name: '品牌设计' }
        ]}
        validate={required()}
      />

      <DateInput source="date" label="项目日期" validate={required()} />
      <BooleanInput source="featured" label="设为精选" />

      <TextInput
        source="projectUrl"
        label="项目链接"
        type="url"
        fullWidth
        helperText="例如：https://example.com"
      />

      <TextInput
        source="githubUrl"
        label="GitHub链接"
        type="url"
        fullWidth
        helperText="例如：https://github.com/username/project"
      />

      <ImageInput
        source="image"
        label="主图"
                maxSize={5000000}
        validate={required()}
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      <ImageInput
        source="thumb"
        label="缩略图"
                maxSize={5000000}
        validate={required()}
      >
        <ImageField source="src" title="title" />
      </ImageInput>

      <FileInput
        source="video"
        label="视频文件"
                maxSize={50000000}
      >
        <FileField source="src" title="title" />
      </FileInput>

      <TextInput
        source="tags"
        label="标签"
        fullWidth
        helperText="用逗号分隔多个标签"
      />
    </SimpleForm>
  </Edit>
)

// 增强的项目创建页面
const ProjectCreate = () => {
  const notify = useNotify()
  const refresh = useRefresh()
  const redirect = useRedirect()

  const onSuccess = () => {
    notify('项目创建成功！', { type: 'success' })
    redirect('/admin/projects')
    refresh()
  }

  return (
    <Create title="新建项目" mutationOptions={{ onSuccess }}>
      <SimpleForm>
        {/* 基本信息 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              基本信息
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextInput
                  source="title"
                  label="项目名称"
                  fullWidth
                  validate={validateProjectTitle}
                  placeholder="输入项目名称（2-100个字符）"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <SelectInput
                  source="category"
                  label="分类"
                  choices={[
                    { id: 'web', name: '网站开发' },
                    { id: 'app', name: '应用开发' },
                    { id: 'design', name: 'UI设计' },
                    { id: 'branding', name: '品牌设计' }
                  ]}
                  validate={required()}
                  defaultValue="web"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <TextInput
                source="description"
                label="项目描述"
                multiline
                rows={4}
                fullWidth
                validate={validateDescription}
                placeholder="详细描述您的项目...（10-1000个字符）"
              />
            </Box>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DateInput
                  source="date"
                  label="项目日期"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  validate={required()}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <BooleanInput
                  source="featured"
                  label="设为精选项目"
                  defaultValue={false}
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 链接信息 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              链接信息
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  source="projectUrl"
                  label="项目链接"
                  type="url"
                  fullWidth
                  validate={validateUrl}
                  helperText="例如：https://example.com"
                  placeholder="https://"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextInput
                  source="githubUrl"
                  label="GitHub链接"
                  type="url"
                  fullWidth
                  validate={validateUrl}
                  helperText="例如：https://github.com/username/project"
                  placeholder="https://github.com/"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 媒体文件 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              媒体文件
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              图片大小限制：5MB，视频大小限制：50MB
            </Alert>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ImageInput
                  source="image"
                  label="主图"
                  maxSize={5000000}
                  validate={required()}
                >
                  <ImageField source="src" title="title" />
                </ImageInput>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ImageInput
                  source="thumb"
                  label="缩略图"
                  maxSize={5000000}
                  validate={required()}
                >
                  <ImageField source="src" title="title" />
                </ImageInput>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <FileInput
                source="video"
                label="视频文件（可选）"
                maxSize={50000000}
              >
                <FileField source="src" title="title" />
              </FileInput>
            </Box>
          </CardContent>
        </Card>

        {/* 标签 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              标签
            </Typography>
            <TextInput
              source="tags"
              label="标签"
              fullWidth
              helperText="用逗号分隔多个标签，如：React, TypeScript, 响应式设计"
              placeholder="输入标签，用逗号分隔"
            />

            {/* 常用标签建议 */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                常用标签：
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {['React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Node.js',
                  '响应式设计', 'UI设计', '前端开发', '全栈开发', '移动端', '小程序'].map(tag => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    clickable
                    onClick={() => {
                      const input = document.querySelector('input[name="tags"]') as HTMLInputElement
                      if (input) {
                        const currentTags = input.value ? input.value.split(',').map(t => t.trim()) : []
                        if (!currentTags.includes(tag)) {
                          input.value = [...currentTags, tag].join(', ')
                        }
                      }
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </SimpleForm>
    </Create>
  )
}

// 自定义登录页面
const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const notify = useNotify()
  const redirect = useRedirect()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
      .then(() => {
        redirect('/admin')
      })
      .catch(() => {
        notify('登录失败，请检查密码', { type: 'error' })
      })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div
            style={{
              width: 80,
              height: 80,
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LoginIcon style={{ fontSize: 40, color: 'white' }} />
          </div>
          <h2 style={{ margin: 0, color: '#333' }}>管理员登录</h2>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            用户名
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="admin@example.com"
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#666' }}>
            密码
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="admin123"
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          登录管理后台
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          <small>默认密码：admin123</small>
          <br />
          <small>生产环境请修改此密码</small>
        </div>
      </form>
    </div>
  )
}

// 增强的验证函数
const required = (message = '此字段为必填项') => (value: string) =>
  value ? undefined : message

const validateUrl = (value: string) => {
  if (!value) return undefined
  try {
    new URL(value)
    return undefined
  } catch {
    return '请输入有效的URL地址'
  }
}

const validateProjectTitle = (value: string) => {
  if (!value) return '项目名称不能为空'
  if (value.length < 2) return '项目名称至少需要2个字符'
  if (value.length > 100) return '项目名称不能超过100个字符'
  return undefined
}

const validateDescription = (value: string) => {
  if (!value) return '项目描述不能为空'
  if (value.length < 10) return '项目描述至少需要10个字符'
  if (value.length > 1000) return '项目描述不能超过1000个字符'
  return undefined
}

// React Admin 主组件
const ReactAdminDashboard = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={theme}
      loginPage={LoginPage}
      requireAuth
    >
      <Resource
        name="projects"
        list={ProjectList}
        edit={ProjectEdit}
        create={ProjectCreate}
        icon={WorkIcon}
        recordRepresentation="title"
      />
    </Admin>
  )
}

export default ReactAdminDashboard