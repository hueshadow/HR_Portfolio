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
  useLogin
} from 'react-admin'
import WorkIcon from '@mui/icons-material/Work'
import LoginIcon from '@mui/icons-material/Login'
import { createTheme } from '@mui/material/styles'
import { dataProvider } from '../dataProvider'
import authProvider from '../authProvider'

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

// 项目创建页面
const ProjectCreate = () => (
  <Create title="新建项目">
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
        defaultValue="web"
      />

      <DateInput source="date" label="项目日期" defaultValue={new Date().toISOString().split('T')[0]} validate={required()} />
      <BooleanInput source="featured" label="设为精选" defaultValue={false} />

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
  </Create>
)

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

// 验证函数
const required = () => (value: string) => value ? undefined : '此字段为必填项'

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