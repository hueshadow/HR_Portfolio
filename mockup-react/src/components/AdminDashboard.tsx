import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Stack,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Snackbar,
  Toolbar,
  AppBar,
  Badge,
  CardMedia,
  Divider,
  Tabs,
  Tab,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  CircularProgress
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Close as CloseIcon,
  VideoLibrary as VideoIcon,
  Image as ImageIcon,
  ViewInAr as ThreeDIcon
} from '@mui/icons-material'
import { portfolioManager } from '../data/portfolio'
import type { PortfolioItem } from '../types/portfolio'
import ImageUploadManager from './ImageUploadManager'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const AdminDashboard: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info'
  })

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'image',
    technologies: [] as string[],
    projectDate: '',
    featured: false,
    projectUrl: '',
    githubUrl: '',
    image: '',
    thumb: ''
  })

  const [techInput, setTechInput] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const navigate = useNavigate()

  useEffect(() => {
    loadPortfolioItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [portfolioItems, searchTerm, categoryFilter])

  const loadPortfolioItems = () => {
    const items = portfolioManager.getAll()
    setPortfolioItems(items)
  }

  const filterItems = useCallback(() => {
    let filtered = portfolioItems

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    setFilteredItems(filtered)
  }, [portfolioItems, searchTerm, categoryFilter])

  useEffect(() => {
    filterItems()
  }, [filterItems])

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    localStorage.removeItem('adminAuthTimestamp')
    navigate('/')
  }

  const handleCreate = () => {
    setFormData({
      title: '',
      description: '',
      category: 'image',
      technologies: [],
      projectDate: new Date().toISOString().split('T')[0],
      featured: false,
      projectUrl: '',
      githubUrl: '',
      image: '',
      thumb: ''
    })
    setTechInput('')
    setEditingItem(null)
    setFormErrors({})
    setTabValue(1)
  }

  const handleEdit = (item: PortfolioItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      technologies: [...item.technologies],
      projectDate: item.projectDate,
      featured: item.featured,
      projectUrl: item.projectUrl || '',
      githubUrl: item.githubUrl || '',
      image: item.image,
      thumb: item.thumb
    })
    setTechInput('')
    setEditingItem(item)
    setFormErrors({})
    setTabValue(1)
  }

  const handleDelete = (item: PortfolioItem) => {
    setItemToDelete(item)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return

    setIsProcessing(true)
    try {
      const success = portfolioManager.delete(itemToDelete.id)
      if (success) {
        loadPortfolioItems()
        showSnackbar('Project deleted successfully', 'success')
      } else {
        showSnackbar('Failed to delete project', 'error')
      }
    } catch {
      showSnackbar('Error deleting project', 'error')
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  const handleFeatureToggle = (id: number) => {
    const item = portfolioItems.find(item => item.id === id)
    if (item) {
      const success = portfolioManager.update(id, { featured: !item.featured })
      if (success) {
        loadPortfolioItems()
        showSnackbar(
          !item.featured ? 'Project featured' : 'Project unfeatured',
          'success'
        )
      }
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required'
    }

    if (!formData.projectDate) {
      errors.projectDate = 'Project date is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)
    try {
      const itemData = {
        ...formData,
        technologies: formData.technologies.filter(tech => tech.trim() !== '')
      }

      let success: boolean
      if (editingItem) {
        const updatedItem = portfolioManager.update(editingItem.id, itemData)
        success = updatedItem !== null
      } else {
        portfolioManager.create(itemData)
        success = true
      }

      if (success) {
        loadPortfolioItems()
        showSnackbar(
          editingItem ? 'Project updated successfully' : 'Project created successfully',
          'success'
        )
        setTabValue(0)
        setEditingItem(null)
      } else {
        showSnackbar('Failed to save project', 'error')
      }
    } catch {
      showSnackbar('Error saving project', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const handleImageSelect = (_file: File, preview: string) => {
    setFormData(prev => ({
      ...prev,
      image: preview
    }))
  }

  const handleThumbSelect = (_file: File, preview: string) => {
    setFormData(prev => ({
      ...prev,
      thumb: preview
    }))
  }

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleExportData = () => {
    const data = portfolioManager.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    showSnackbar('Data exported successfully', 'success')
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        const success = portfolioManager.importData(data)
        if (success) {
          loadPortfolioItems()
          showSnackbar('Data imported successfully', 'success')
        } else {
          showSnackbar('Failed to import data', 'error')
        }
      } catch {
        showSnackbar('Invalid data format', 'error')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'video': return <VideoIcon />
      case '3d': return <ThreeDIcon />
      default: return <ImageIcon />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'image': return 'primary'
      case 'video': return 'secondary'
      case '3d': return 'success'
      default: return 'default'
    }
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portfolio Admin Dashboard
          </Typography>
          <Badge badgeContent={filteredItems.length} color="primary" sx={{ mr: 2 }}>
            <Typography variant="body2">Projects</Typography>
          </Badge>
          <Button
            color="inherit"
            startIcon={<DownloadIcon />}
            onClick={handleExportData}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <label htmlFor="import-data">
            <Button
              component="span"
              color="inherit"
              startIcon={<UploadIcon />}
              sx={{ mr: 1 }}
            >
              Import
            </Button>
          </label>
          <input
            id="import-data"
            type="file"
            accept=".json"
            onChange={handleImportData}
            style={{ display: 'none' }}
          />
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Projects" />
            <Tab label={editingItem ? 'Edit Project' : 'New Project'} />
          </Tabs>
        </Box>

        {/* Projects List Tab */}
        <TabPanel value={tabValue} index={0}>
          <Paper sx={{ mb: 3, p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    label="Category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="image">Images</MenuItem>
                    <MenuItem value="video">Videos</MenuItem>
                    <MenuItem value="3d">3D Models</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreate}
                >
                  New
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Preview</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Technologies</TableCell>
                  <TableCell>Featured</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      {item.category === 'video' ? (
                        <Box
                          component="video"
                          src={item.image}
                          poster={item.thumb}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          image={item.thumb || item.image}
                          alt={item.title}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 1,
                            objectFit: 'cover'
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {item.description}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getCategoryIcon(item.category)}
                        label={item.category.toUpperCase()}
                        color={getCategoryColor(item.category) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(item.projectDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {item.technologies.slice(0, 3).map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {item.technologies.length > 3 && (
                          <Chip
                            label={`+${item.technologies.length - 3}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={item.featured}
                        onChange={() => handleFeatureToggle(item.id)}
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => {
                          // Here you would typically open a menu
                          if (window.confirm('View this project?')) {
                            window.open(`/portfolio/${item.id}`, '_blank')
                          }
                        }}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredItems.length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              <AlertTitle>No Projects Found</AlertTitle>
              Try adjusting your search or category filter, or create a new project.
            </Alert>
          )}
        </TabPanel>

        {/* Form Tab */}
        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              {editingItem ? 'Edit Project' : 'Create New Project'}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth required error={!!formErrors.category}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                  >
                    <MenuItem value="image">Image</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="3d">3D Model</MenuItem>
                  </Select>
                  {formErrors.category && (
                    <FormHelperText error>{formErrors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Project Date"
                  value={formData.projectDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDate: e.target.value }))}
                  InputLabelProps={{ shrink: true }}
                  error={!!formErrors.projectDate}
                  helperText={formErrors.projectDate}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                  }
                  label="Featured Project"
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Technologies
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <OutlinedInput
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          onClick={handleAddTechnology}
                          disabled={!techInput.trim()}
                          size="small"
                        >
                          Add
                        </Button>
                      </InputAdornment>
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {formData.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => handleRemoveTechnology(tech)}
                      deleteIcon={<CloseIcon />}
                      color="primary"
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="url"
                  label="Project URL"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="url"
                  label="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </Grid>
              <Grid size={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Images
                </Typography>
                <ImageUploadManager
                  onImageSelect={handleImageSelect}
                  onThumbSelect={handleThumbSelect}
                  currentImage={formData.image}
                  currentThumb={formData.thumb}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                onClick={() => setTabValue(0)}
              >
                Cancel
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isProcessing}
                startIcon={isProcessing ? <CircularProgress size={20} /> : undefined}
              >
                {isProcessing ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
              </Button>
            </Stack>
          </Paper>
        </TabPanel>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            disabled={isProcessing}
            startIcon={isProcessing ? <CircularProgress size={20} /> : <DeleteIcon />}
          >
            {isProcessing ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AdminDashboard