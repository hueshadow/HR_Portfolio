import React, { useState, useRef } from 'react'

interface ImageUploadManagerProps {
  onImageSelect: (file: File, preview: string) => void
  onThumbSelect?: (file: File, preview: string) => void
  currentImage?: string
  currentThumb?: string
  acceptTypes?: string
}

const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({
  onImageSelect,
  onThumbSelect,
  currentImage,
  currentThumb,
  acceptTypes = 'image/*'
}) => {
  const [imagePreview, setImagePreview] = useState<string>(currentImage || '')
  const [thumbPreview, setThumbPreview] = useState<string>(currentThumb || '')
  const [isDragging, setIsDragging] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const thumbInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File, isThumb: boolean = false) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string

      if (isThumb) {
        setThumbPreview(preview)
        onThumbSelect?.(file, preview)
      } else {
        setImagePreview(preview)
        onImageSelect(file, preview)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent, isThumb: boolean = false) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file, isThumb)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const generateThumbnail = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        // Calculate thumbnail size (max 300px)
        const maxSize = 300
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader()
              reader.onload = (e) => resolve(e.target?.result as string)
              reader.readAsDataURL(blob)
            }
          },
          'image/jpeg',
          0.8
        )
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const handleGenerateThumb = async () => {
    if (imagePreview && imageInputRef.current?.files?.[0]) {
      const file = imageInputRef.current.files[0]
      const thumbDataUrl = await generateThumbnail(file)

      // Convert data URL to blob then to File
      const response = await fetch(thumbDataUrl)
      const blob = await response.blob()
      const thumbFile = new File([blob], `thumb_${file.name}`, { type: 'image/jpeg' })

      setThumbPreview(thumbDataUrl)
      onThumbSelect?.(thumbFile, thumbDataUrl)
    }
  }

  return (
    <div className="image-upload-manager">
      {/* Main Image Upload */}
      <div className="upload-section">
        <h3>Main Image</h3>
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDrop={(e) => handleDrop(e, false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => imageInputRef.current?.click()}
        >
          {imagePreview ? (
            <div className="preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <div className="preview-overlay">
                <button type="button" className="change-btn">
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <p>Drag & drop image here or click to browse</p>
              <p className="upload-hint">Max size: 5MB</p>
            </div>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept={acceptTypes}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], false)}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Thumbnail Upload */}
      <div className="upload-section">
        <div className="section-header">
          <h3>Thumbnail</h3>
          {imagePreview && (
            <button type="button" className="auto-generate-btn" onClick={handleGenerateThumb}>
              Auto Generate
            </button>
          )}
        </div>
        <div
          className="upload-area thumbnail-area"
          onClick={() => thumbInputRef.current?.click()}
        >
          {thumbPreview ? (
            <div className="preview-container">
              <img src={thumbPreview} alt="Thumbnail Preview" className="thumb-preview" />
              <div className="preview-overlay">
                <button type="button" className="change-btn">
                  Change Thumbnail
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <svg className="upload-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p>Upload thumbnail (optional)</p>
            </div>
          )}
          <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], true)}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageUploadManager