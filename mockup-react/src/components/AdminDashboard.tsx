import React, { useState, useEffect } from 'react'
import type { PortfolioItem } from '../types/portfolio'
import { portfolioManager } from '../data/portfolio'
import PortfolioEditor from './PortfolioEditor'
import './AdminDashboard.css'

const AdminDashboard: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  useEffect(() => {
    loadPortfolioItems()
  }, [])

  const loadPortfolioItems = () => {
    setPortfolioItems(portfolioManager.getAll())
  }

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleEdit = (item: PortfolioItem) => {
    setSelectedItem(item)
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (portfolioManager.delete(id)) {
      loadPortfolioItems()
      setShowDeleteConfirm(null)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    setSelectedItem(null)
    loadPortfolioItems()
  }

  const handleCreateNew = () => {
    setSelectedItem(null)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setSelectedItem(null)
  }

  const handleToggleFeatured = (id: number) => {
    portfolioManager.toggleFeatured(id)
    loadPortfolioItems()
  }

  const exportData = () => {
    const data = portfolioManager.exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        if (portfolioManager.importData(content)) {
          loadPortfolioItems()
          alert('Portfolio data imported successfully!')
        } else {
          alert('Failed to import portfolio data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  if (isEditing) {
    return (
      <div className="admin-dashboard">
        <PortfolioEditor
          item={selectedItem || undefined}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Portfolio Admin Dashboard</h1>
        <div className="header-actions">
          <button className="btn-create" onClick={handleCreateNew}>
            <span>+ Add New Item</span>
          </button>
          <button className="btn-export" onClick={exportData}>
            <span>Export Data</span>
          </button>
          <label className="btn-import">
            <span>Import Data</span>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="search-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search portfolio items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-select">
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="3d">3D</option>
            </select>
          </div>
        </div>
        <div className="stats">
          <span className="stat-item">
            Total: <strong>{filteredItems.length}</strong>
          </span>
          <span className="stat-item">
            Featured: <strong>{filteredItems.filter(item => item.featured).length}</strong>
          </span>
        </div>
      </div>

      <div className="portfolio-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="portfolio-card">
            <div className="card-image">
              <img src={item.thumb || item.image} alt={item.title} />
              <span className={`category-badge ${item.category}`}>
                {item.category.toUpperCase()}
              </span>
              {item.featured && (
                <span className="featured-badge">
                  ⭐ Featured
                </span>
              )}
            </div>
            <div className="card-content">
              <h3>{item.title}</h3>
              <p className="description">{item.description.substring(0, 100)}...</p>
              <div className="card-meta">
                <span className="date">{new Date(item.projectDate).toLocaleDateString()}</span>
                <span className="tech-count">
                  {item.technologies.length} technologies
                </span>
              </div>
              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className={`btn-feature ${item.featured ? 'featured' : ''}`}
                  onClick={() => handleToggleFeatured(item.id)}
                >
                  {item.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => setShowDeleteConfirm(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <h3>No portfolio items found</h3>
          <p>Try adjusting your search or create a new portfolio item.</p>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this portfolio item? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="btn-delete-confirm"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard