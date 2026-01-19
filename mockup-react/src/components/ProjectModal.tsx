/**
 * Project Modal Component
 *
 * A modal dialog for previewing project details.
 * Features:
 * - Keyboard navigation (ESC to close, focus trap)
 * - Deep linking support (/work?p=slug)
 * - Copy link button for sharing
 * - ARIA accessibility attributes
 */

import { useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import type { ProjectIndex } from '../types/projectsIndex'

interface ProjectModalProps {
  project: ProjectIndex | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Handle deep linking
  useEffect(() => {
    if (isOpen && project) {
      // Set URL param
      setSearchParams({ p: String(project.slug) }, { replace: true })
      // Save current focus
      previousFocusRef.current = document.activeElement as HTMLElement
    }
  }, [isOpen, project, setSearchParams])

  // Close modal and remove URL param
  const handleClose = useCallback(() => {
    onClose()
    // Remove p param without refresh
    setSearchParams({}, { replace: true })
    // Restore focus
    previousFocusRef.current?.focus()
  }, [onClose, setSearchParams])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }

      // Trap focus within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // Copy link to clipboard
  const copyLink = async () => {
    const url = `${window.location.origin}/work?p=${project?.slug}`
    try {
      await navigator.clipboard.writeText(url)
      // Could show a toast here
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Handle view full case study
  const handleViewFull = () => {
    if (project) {
      navigate(project.href)
    }
  }

  if (!isOpen || !project) return null

  return (
    <div
      className="project-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Cover image */}
        <div className="modal-cover">
          {project.coverImage && (
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
            />
          )}
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-org">{project.org}</span>
            <span className="modal-year">{project.year}</span>
          </div>

          <h2 id="modal-title" className="modal-title">{project.title}</h2>

          <p className="modal-description">{project.oneLiner}</p>

          {/* Role */}
          <div className="modal-meta">
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">{project.role}</span>
            </div>
          </div>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="modal-tags">
              {project.tags.map(tag => (
                <span key={tag} className="modal-tag">{tag}</span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="modal-actions">
            <button className="modal-btn primary" onClick={handleViewFull}>
              View full case study
            </button>
            <button className="modal-btn secondary" onClick={copyLink}>
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
