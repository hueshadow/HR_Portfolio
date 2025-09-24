import { useEffect } from 'react'

interface LightboxProps {
  isOpen: boolean
  imageSrc: string
  onClose: () => void
}

const Lightbox = ({ isOpen, imageSrc, onClose }: LightboxProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      // 添加鼠标放大效果
      const mouse = document.querySelector('.mouse')
      if (mouse) {
        mouse.classList.add('zoom-out')
      }
    } else {
      document.body.style.overflow = ''
      // 移除鼠标放大效果
      const mouse = document.querySelector('.mouse')
      if (mouse) {
        mouse.classList.remove('zoom-out')
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      className="mfp-bg mfp-ready" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1042,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        style={{ position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mfp-container mfp-s-ready mfp-image-container">
          <div className="mfp-content">
            <div className="mfp-figure">
              <div className="mfp-img" style={{ opacity: 1 }}>
                <img
                  src={imageSrc}
                  alt="Portfolio item"
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    opacity: 1
                  }}
                />
              </div>
            </div>
          </div>
          <button 
            className="mfp-close"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              zIndex: 1
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
