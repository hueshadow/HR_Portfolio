import { useEffect, useRef } from 'react'

interface ImagePreviewProps {
  isOpen: boolean
  imageSrc: string
  videoSrc?: string
  isVideo?: boolean
  onClose: () => void
}

const ImagePreview = ({ isOpen, imageSrc, videoSrc, isVideo, onClose }: ImagePreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isOpen && isVideo && videoRef.current) {
      videoRef.current.play()
    }
  }, [isOpen, isVideo])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={onClose}
    >
      {isVideo && videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          controls
          autoPlay
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            cursor: 'default'
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <img
          src={imageSrc}
          alt="Preview"
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            cursor: 'default'
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '40px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '40px',
          cursor: 'pointer',
          lineHeight: 1,
          padding: '0',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ×
      </button>
    </div>
  )
}

export default ImagePreview