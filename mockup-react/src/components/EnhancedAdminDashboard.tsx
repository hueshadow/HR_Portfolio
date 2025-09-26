import React, { useState } from 'react'
import {
  Admin,
  Resource,
  List,
  Edit,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  BooleanInput,
  AutocompleteArrayInput,
  ImageInput,
  ImageField,
  useRecordContext,
  useList,
  useNotify,
  useRefresh,
  Button,
  TopToolbar,
  Filter,
} from 'react-admin'
import { RichTextInput } from './RichTextInput'
import { portfolioDataProvider } from '../data/portfolioDataProvider'
import { portfolioManager } from '../data/portfolio'
import type { PortfolioItem } from '../types/portfolio'
import { authProvider } from '../auth/authProvider'
import {
  DataGrid,
} from '@mui/x-data-grid'
import type {
  GridColDef,
  GridRowParams,
} from '@mui/x-data-grid'
import {
  Box,
  Chip,
  IconButton,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  GetApp as DownloadIcon,
  Publish as UploadIcon,
} from '@mui/icons-material'

// 自定义列表组件
const PortfolioList = () => {
  const notify = useNotify()
  const refresh = useRefresh()

  const handleToggleFeatured = (id: number) => {
    portfolioManager.toggleFeatured(id)
    notify('精选状态已更新', { type: 'success' })
    refresh()
  }

  const handleExportData = () => {
    const data = portfolioManager.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    notify('数据已导出', { type: 'success' })
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (portfolioManager.importData(content)) {
          notify('数据导入成功', { type: 'success' })
          refresh()
        } else {
          notify('数据导入失败', { type: 'error' })
        }
      }
      reader.readAsText(file)
    }
  }

  const PortfolioFilter = (props: any) => (
    <Filter {...props}>
      <TextInput source="q" label="搜索" alwaysOn />
      <SelectInput
        source="category"
        label="分类"
        choices={[
          { id: 'image', name: '图片' },
          { id: 'video', name: '视频' },
          { id: '3d', name: '3D' },
        ]}
      />
      <SelectInput
        source="featured"
        label="精选"
        choices={[
          { id: 'true', name: '是' },
          { id: 'false', name: '否' },
        ]}
      />
    </Filter>
  )

  const PortfolioGrid = () => {
    const { data, isLoading, error } = useList<PortfolioItem>({ resource: 'portfolio' })

    if (isLoading) return <div>加载中...</div>
    if (error) return <div>加载失败</div>

    const columns: GridColDef<PortfolioItem>[] = [
      {
        field: 'image',
        headerName: '预览',
        width: 120,
        renderCell: (params) => (
          <Box
            component="img"
            src={params.row.thumb || params.row.image}
            alt={params.row.title}
            sx={{
              width: 80,
              height: 80,
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        ),
      },
      { field: 'title', headerName: '标题', width: 200 },
      {
        field: 'category',
        headerName: '分类',
        width: 100,
        renderCell: (params) => (
          <Chip
            label={params.value.toUpperCase()}
            size="small"
            color={'primary'}
          />
        ),
      },
      {
        field: 'projectDate',
        headerName: '日期',
        width: 120,
        valueFormatter: ({ value }) => new Date(value).toLocaleDateString('zh-CN'),
      },
      {
        field: 'featured',
        headerName: '精选',
        width: 80,
        renderCell: (params) => (
          <IconButton
            size="small"
            onClick={() => handleToggleFeatured(params.row.id)}
            color={params.value ? 'warning' : 'default'}
          >
            {params.value ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        ),
      },
      {
        field: 'actions',
        headerName: '操作',
        type: 'actions',
        width: 150,
        getActions: (params: GridRowParams<PortfolioItem>) => [
          <IconButton
            onClick={() => window.open(`/admin/#/portfolio/${params.id}`, '_blank')}
            title="编辑"
          >
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => {
              if (window.confirm('确定要删除这个项目吗？')) {
                portfolioManager.delete(params.row.id)
                notify('项目已删除', { type: 'success' })
                refresh()
              }
            }}
            title="删除"
            color="error"
          >
            <DeleteIcon />
          </IconButton>,
        ],
      },
    ]

    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Box>
    )
  }

  const ListActions = () => (
    <TopToolbar>
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadIcon />}
        component="label"
      >
        导入数据
        <input
          type="file"
          accept=".json"
          onChange={handleImportData}
          style={{ display: 'none' }}
        />
      </Button>
      <Button
        variant="outlined"
        startIcon={<DownloadIcon />}
        onClick={handleExportData}
      >
        导出数据
      </Button>
    </TopToolbar>
  )

  return (
    <List
      title="作品集管理"
      filters={<PortfolioFilter />}
      actions={<ListActions />}
    >
      <PortfolioGrid />
    </List>
  )
}

// 自定义编辑组件
const PortfolioTitle = () => {
  const record = useRecordContext<PortfolioItem>()
  return <span>编辑项目: {record ? record.title : ''}</span>
}

const PortfolioEdit = () => {
  return (
    <Edit title={<PortfolioTitle />}>
      <SimpleForm>
        <TextInput source="title" label="标题" fullWidth required />
        <SelectInput
          source="category"
          label="分类"
          choices={[
            { id: 'image', name: '图片' },
            { id: 'video', name: '视频' },
            { id: '3d', name: '3D' },
          ]}
          required
        />
        <RichTextInput
          source="description"
          label="描述"
          required
        />
        <AutocompleteArrayInput
          source="technologies"
          label="技术栈"
          choices={[
            'React',
            'TypeScript',
            'Vue.js',
            'Node.js',
            'Python',
            'UI/UX Design',
            'Figma',
            'Sketch',
            'Three.js',
            'WebGL',
            'Blender',
            'After Effects',
            'Premiere Pro',
            'D3.js',
            'PostgreSQL',
            'MongoDB',
            'Docker',
            'AWS',
          ]}
          fullWidth
        />
        <DateInput source="projectDate" label="项目日期" />
        <TextInput source="projectUrl" label="项目链接" type="url" />
        <TextInput source="githubUrl" label="GitHub 链接" type="url" />
        <BooleanInput source="featured" label="精选项目" />
        <ImageInput
          source="image"
          label="主图"
          accept={("image/*,video/*" as any)}
          maxSize={5000000}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          source="thumb"
          label="缩略图"
          accept={("image/*" as any)}
          maxSize={5000000}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  )
}

// 自定义创建组件
const PortfolioCreate = () => {
  return (
    <Create title="创建新项目">
      <SimpleForm>
        <TextInput source="title" label="标题" fullWidth required />
        <SelectInput
          source="category"
          label="分类"
          choices={[
            { id: 'image', name: '图片' },
            { id: 'video', name: '视频' },
            { id: '3d', name: '3D' },
          ]}
          required
        />
        <RichTextInput
          source="description"
          label="描述"
          required
        />
        <AutocompleteArrayInput
          source="technologies"
          label="技术栈"
          choices={[
            'React',
            'TypeScript',
            'Vue.js',
            'Node.js',
            'Python',
            'UI/UX Design',
            'Figma',
            'Sketch',
            'Three.js',
            'WebGL',
            'Blender',
            'After Effects',
            'Premiere Pro',
            'D3.js',
            'PostgreSQL',
            'MongoDB',
            'Docker',
            'AWS',
          ]}
          fullWidth
        />
        <DateInput source="projectDate" label="项目日期" />
        <TextInput source="projectUrl" label="项目链接" type="url" />
        <TextInput source="githubUrl" label="GitHub 链接" type="url" />
        <BooleanInput source="featured" label="精选项目" defaultValue={false} />
        <ImageInput
          source="image"
          label="主图"
          accept={("image/*,video/*" as any)}
          maxSize={5000000}
          isRequired
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          source="thumb"
          label="缩略图"
          accept={("image/*" as any)}
          maxSize={5000000}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  )
}

// 主管理界面
const EnhancedAdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  React.useEffect(() => {
    const auth = sessionStorage.getItem('isAdminAuthenticated')
    setIsAuthenticated(auth === 'true')
  }, [])

  if (isAuthenticated === null) {
    return <div>验证中...</div>
  }

  if (!isAuthenticated) {
    window.location.href = '/admin/login'
    return null
  }

  return (
    <Admin
      dataProvider={portfolioDataProvider as any}
      authProvider={authProvider}
      requireAuth
      loginPage={() => {
        window.location.href = '/admin/login'
        return null
      }}
    >
      <Resource
        name="portfolio"
        list={PortfolioList}
        edit={PortfolioEdit}
        create={PortfolioCreate}
      />
    </Admin>
  )
}

export default EnhancedAdminDashboard