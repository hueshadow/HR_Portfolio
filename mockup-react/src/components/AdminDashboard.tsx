import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import portfolioManager from '../data/portfolio'
import { PortfolioItem } from '../types/portfolio'
import ImageUploadManager from './ImageUploadManager'

const AdminDashboard: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const navigate = useNavigate()

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

  const filterItems = () => {
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
  }

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
    setShowCreateModal(true)
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
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
    setShowEditModal(true)
  }

  const handleDelete = (id: number) => {
    setShowDeleteConfirm(id)
  }

  const confirmDelete = async () => {
    if (showDeleteConfirm === null) return

    setIsProcessing(true)
    try {
      const success = portfolioManager.delete(showDeleteConfirm)
      if (success) {
        loadPortfolioItems()
        showNotification('Project deleted successfully', 'success')
      } else {
        showNotification('Failed to delete project', 'error')
      }
    } catch (error) {
      showNotification('Error deleting project', 'error')
    } finally {
      setIsProcessing(false)
      setShowDeleteConfirm(null)
    }
  }

  const handleFeatureToggle = (id: number) => {
    const item = portfolioItems.find(item => item.id === id)
    if (item) {
      const updatedItem = { ...item, featured: !item.featured }
      const success = portfolioManager.update(updatedItem)
      if (success) {
        loadPortfolioItems()
        showNotification(
          updatedItem.featured ? 'Project featured' : 'Project unfeatured',
          'success'
        )
      }
    }
  }

  const handleSubmit = async (isEdit: boolean = false) => {
    setIsProcessing(true)
    try {
      const itemData = {
        ...formData,
        technologies: formData.technologies.filter(tech => tech.trim() !== '')
      }

      let success: boolean
      if (isEdit && editingItem) {
        success = portfolioManager.update({
          ...itemData,
          id: editingItem.id,
          createdAt: editingItem.createdAt,
          updatedAt: new Date().toISOString()
        })
      } else {
        success = portfolioManager.create(itemData)
      }

      if (success) {
        loadPortfolioItems()
        showNotification(
          isEdit ? 'Project updated successfully' : 'Project created successfully',
          'success'
        )
        setShowCreateModal(false)
        setShowEditModal(false)
      } else {
        showNotification('Failed to save project', 'error')
      }
    } catch (error) {
      showNotification('Error saving project', 'error')
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

  const handleImageUpload = (imageUrl: string, thumbnailUrl: string) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl,
      thumb: thumbnailUrl
    }))
  }

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
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
    showNotification('Data exported successfully', 'success')
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
          showNotification('Data imported successfully', 'success')
        } else {
          showNotification('Failed to import data', 'error')
        }
      } catch (error) {
        showNotification('Invalid data format', 'error')
      }
    }
    reader.readAsText(file)
    event.target.value = '' // Reset input
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <div className="admin-actions">
          <button onClick={handleExportData} className="export-btn">
            Export Data
          </button>
          <label className="import-btn">
            Import Data
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              style={{ display: 'none' }}
            />
          </label>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="admin-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="3d">3D Models</option>
          </select>
        </div>
        <button onClick={handleCreate} className="create-btn">
          Create New Project
        </button>
      </div>

      <div className="portfolio-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className={`portfolio-item ${item.featured ? 'featured' : ''}`}>
            <div className="item-image">
              {item.category === 'video' ? (
                <video src={item.image} poster={item.thumb} />
              ) : (
                <img src={item.thumb || item.image} alt={item.title} />
              )}
            </div>
            <div className="item-content">
              <h3>{item.title}</h3>
              <p className="item-category">{item.category.toUpperCase()}</p>
              <p className="item-date">{new Date(item.projectDate).toLocaleDateString()}</p>
              <div className="item-actions">
                <button onClick={() => handleEdit(item)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="delete-btn">
                  Delete
                </button>
                <button
                  onClick={() => handleFeatureToggle(item.id)}
                  className={`feature-btn ${item.featured ? 'featured' : ''}`}
                >
                  {item.featured ? 'Unfeature' : 'Feature'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <p>No projects found</p>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Project</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="3d">3D Model</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Date</label>
                <input
                  type="date"
                  value={formData.projectDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDate: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Technologies</label>
                <div className="tech-input-group">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology"
                  />
                  <button type="button" onClick={handleAddTechnology}>Add</button>
                </div>
                <div className="tech-list">
                  {formData.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTechnology(tech)}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Project URL</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="form-group">
                <label>Image</label>
                <ImageUploadManager
                  onImageUpload={handleImageUpload}
                  currentImage={formData.image}
                  currentThumb={formData.thumb}
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                  Featured Project
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={isProcessing}>
                  {isProcessing ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal (similar structure to Create Modal) */}
      {showEditModal && editingItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Project</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(true); }}>
              {/* Same form fields as Create Modal */}
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="3d">3D Model</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Date</label>
                <input
                  type="date"
                  value={formData.projectDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDate: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label>Technologies</label>
                <div className="tech-input-group">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Add technology"
                  />
                  <button type="button" onClick={handleAddTechnology}>Add</button>
                </div>
                <div className="tech-list">
                  {formData.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTechnology(tech)}>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Project URL</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectUrl: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="form-group">
                <label>Image</label>
                <ImageUploadManager
                  onImageUpload={handleImageUpload}
                  currentImage={formData.image}
                  currentThumb={formData.thumb}
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  />
                  Featured Project
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={isProcessing}>
                  {isProcessing ? 'Updating...' : 'Update Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="modal">
          <div className="modal-content delete-confirm">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={isProcessing} className="delete-confirm-btn">
                {isProcessing ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard