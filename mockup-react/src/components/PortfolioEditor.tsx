import React, { useState, useEffect, useRef } from 'react'
import type { PortfolioItem, PortfolioFormData } from '../types/portfolio'
import { portfolioManager } from '../data/portfolio'

interface PortfolioEditorProps {
  item?: PortfolioItem
  onSave: (item: PortfolioItem) => void
  onCancel: () => void
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<PortfolioFormData>({
    category: 'image',
    title: '',
    description: '',
    technologies: [],
    projectDate: '',
    projectUrl: '',
    githubUrl: '',
    featured: false
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const [thumbPreview, setThumbPreview] = useState<string>('')
  const [techInput, setTechInput] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        category: item.category,
        title: item.title,
        description: item.description,
        technologies: item.technologies,
        projectDate: item.projectDate,
        projectUrl: item.projectUrl || '',
        githubUrl: item.githubUrl || '',
        featured: item.featured
      })

      // Set existing image previews
      if (item.image) {
        setImagePreview(item.image.startsWith('/') ? `${import.meta.env.BASE_URL}${item.image}` : item.image)
      }
      if (item.thumb) {
        setThumbPreview(item.thumb)
      }
    }
  }, [item])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setThumbPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, you would upload files to a server here
      // For now, we'll create object URLs for local files
      const imagePath = imageFile ? URL.createObjectURL(imageFile) : (item?.image || '')
      const thumbPath = thumbFile ? URL.createObjectURL(thumbFile) : (item?.thumb || '')

      const portfolioData = {
        ...formData,
        image: imagePath,
        thumb: thumbPath
      }

      let savedItem: PortfolioItem
      if (item) {
        // Update existing item
        savedItem = portfolioManager.update(item.id, portfolioData)!
      } else {
        // Create new item
        savedItem = portfolioManager.create(portfolioData)
      }

      onSave(savedItem)
    } catch (error) {
      console.error('Error saving portfolio item:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="portfolio-editor">
      <div className="editor-header">
        <h2>{item ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h2>
        <button type="button" className="close-btn" onClick={onCancel}>
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="portfolio-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="3d">3D</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="projectDate">Project Date</label>
            <input
              type="date"
              id="projectDate"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              Featured Project
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="image-upload-section">
          <div className="form-group">
            <label>Main Image *</label>
            <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span>Click to upload main image</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Thumbnail Image</label>
            <div className="upload-area" onClick={() => thumbInputRef.current?.click()}>
              {thumbPreview ? (
                <img src={thumbPreview} alt="Thumbnail Preview" className="thumb-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span>Click to upload thumbnail</span>
                </div>
              )}
              <input
                ref={thumbInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Technologies</label>
          <div className="tech-input-group">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add a technology"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
            />
            <button type="button" onClick={handleAddTech}>
              Add
            </button>
          </div>
          <div className="tech-tags">
            {formData.technologies.map(tech => (
              <span key={tech} className="tech-tag">
                {tech}
                <button type="button" onClick={() => handleRemoveTech(tech)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="projectUrl">Project URL</label>
          <input
            type="url"
            id="projectUrl"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleInputChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleInputChange}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-save" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (item ? 'Update' : 'Create')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PortfolioEditor