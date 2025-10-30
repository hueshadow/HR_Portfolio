import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Stack,
  Card,
  CardContent,
  Alert,
  Snackbar,
  TablePagination
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Category as CategoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Image as ImageIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// 创建Material-UI主题
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
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff'
        }
      }
    },
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

// 项目类型定义
interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  video?: string
  date: string
  tags: string[]
  featured: boolean
}

// 分类选项
const categories = [
  { value: 'all', label: '全部' },
  { value: 'web', label: '网站开发' },
  { value: 'app', label: '应用开发' },
  { value: 'design', label: 'UI设计' },
  { value: 'branding', label: '品牌设计' }
]

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  // Form states (for future implementation)
  // const [editingProject, setEditingProject] = useState<Project | null>(null)
  // const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // 加载项目数据
  useEffect(() => {
    loadProjects()
  }, [])

  // 过滤项目
  useEffect(() => {
    let filtered = projects

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
  }, [projects, selectedCategory, searchTerm])

  const loadProjects = () => {
    // 从localStorage加载项目数据
    const savedProjects = localStorage.getItem('portfolioProjects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      // 默认项目数据
      const defaultProjects: Project[] = [
        {
          id: '1',
          title: '企业网站设计',
          category: 'web',
          description: '为ABC公司设计的现代化企业网站',
          image: 'https://via.placeholder.com/600x400',
          date: '2024-01-15',
          tags: ['响应式', '现代化', '企业'],
          featured: true
        },
        {
          id: '2',
          title: '移动应用UI设计',
          category: 'app',
          description: '健康管理APP的用户界面设计',
          image: 'https://via.placeholder.com/600x400',
          date: '2024-02-20',
          tags: ['移动端', '健康', '用户友好'],
          featured: false
        }
      ]
      setProjects(defaultProjects)
    }
  }

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects)
    localStorage.setItem('portfolioProjects', JSON.stringify(newProjects))
    showSnackbar('保存成功', 'success')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleAddProject = () => {
    // Placeholder for add project functionality
    showSnackbar('添加项目功能正在开发中', 'success')
  }

  const handleEditProject = () => {
    // Placeholder for edit project functionality
    showSnackbar('编辑项目功能正在开发中', 'success')
    handleCloseMenu()
  }

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project.id)
    setDeleteDialogOpen(true)
    handleCloseMenu()
  }

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      const newProjects = projects.filter(p => p.id !== projectToDelete)
      saveProjects(newProjects)
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setMenuAnchor(event.currentTarget)
    setSelectedProject(project)
  }

  const handleCloseMenu = () => {
    setMenuAnchor(null)
    setSelectedProject(null)
  }

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    localStorage.removeItem('adminAuthTimestamp')
    navigate('/admin/login')
  }

  const handleExportData = () => {
    const dataStr = JSON.stringify(projects, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)

    const exportFileDefaultName = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedProjects = JSON.parse(e.target?.result as string)
          saveProjects(importedProjects)
        } catch {
          showSnackbar('导入失败：文件格式错误', 'error')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          管理后台
        </Typography>
      </Toolbar>
      <Box sx={{ flex: 1 }}>
        <List>
          {[
            { text: '仪表板', icon: <DashboardIcon /> },
            { text: '项目管理', icon: <WorkIcon /> },
            { text: '分类管理', icon: <CategoryIcon /> }
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="退出登录" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  // 统计数据
  const stats = {
    totalProjects: projects.length,
    featuredProjects: projects.filter(p => p.featured).length,
    categories: [...new Set(projects.map(p => p.category))].length
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: `240px` },
            background: '#ffffff',
            color: '#333333',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              项目管理
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            mt: 8
          }}
        >
          {/* 统计卡片 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mb: 3 }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  总项目数
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.totalProjects}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  精选项目
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.featuredProjects}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  分类数量
                </Typography>
                <Typography variant="h4" component="div">
                  {stats.categories}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* 操作栏 */}
          <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProject}
            >
              添加项目
            </Button>
            <Button
              variant="outlined"
              onClick={handleExportData}
            >
              导出数据
            </Button>
            <Button
              variant="outlined"
              component="label"
            >
              导入数据
              <input
                type="file"
                accept=".json"
                hidden
                onChange={handleImportData}
              />
            </Button>
          </Box>

          {/* 搜索和筛选 */}
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                placeholder="搜索项目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ flex: 1 }}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel>分类</InputLabel>
                <Select
                  value={selectedCategory}
                  label="分类"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {/* 项目表格 */}
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>标题</TableCell>
                    <TableCell>分类</TableCell>
                    <TableCell>日期</TableCell>
                    <TableCell>标签</TableCell>
                    <TableCell>精选</TableCell>
                    <TableCell align="right">操作</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProjects
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                style={{ width: 40, height: 40, borderRadius: 4, objectFit: 'cover' }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 4,
                                  background: '#f0f0f0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                <ImageIcon />
                              </Box>
                            )}
                            {project.title}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={categories.find(c => c.value === project.category)?.label || project.category}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{project.date}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {project.tags.slice(0, 3).map((tag) => (
                              <Chip key={tag} label={tag} size="small" />
                            ))}
                            {project.tags.length > 3 && (
                              <Chip label={`+${project.tags.length - 3}`} size="small" variant="outlined" />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          {project.featured ? (
                            <Chip label="精选" size="small" color="primary" />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              -
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={(e) => handleMenuClick(e, project)}
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredProjects.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="每页显示："
            />
          </Paper>
        </Box>

        {/* 操作菜单 */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={() => selectedProject && handleEditProject()}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            编辑
          </MenuItem>
          <MenuItem onClick={() => selectedProject && handleDeleteClick(selectedProject)}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            删除
          </MenuItem>
        </Menu>

        {/* 删除确认对话框 */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>确认删除</DialogTitle>
          <DialogContent>
            确定要删除这个项目吗？此操作无法撤销。
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>取消</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              删除
            </Button>
          </DialogActions>
        </Dialog>

        {/* 提示信息 */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}

export default AdminDashboard