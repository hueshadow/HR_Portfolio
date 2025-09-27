import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLink: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if we should show the admin link
    const checkVisibility = () => {
      // Hide on admin pages
      const isAdminPage = window.location.pathname.startsWith('/admin')
      // Hide on detail pages
      const isDetailPage = /\/portfolio\/\d+/.test(window.location.pathname) ||
                          /\/blog\/\d+/.test(window.location.pathname)

      setIsVisible(!isAdminPage && !isDetailPage)
    }

    checkVisibility()
    window.addEventListener('popstate', checkVisibility)

    return () => {
      window.removeEventListener('popstate', checkVisibility)
    }
  }, [])

  const handleClick = () => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true'
    if (isAuthenticated) {
      navigate('/admin')
    } else {
      navigate('/admin/login')
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      className="admin-link-button"
      onClick={handleClick}
      title="Admin Dashboard"
      aria-label="Open Admin Dashboard"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
        <path d="M2 17L12 22L22 17"></path>
        <path d="M2 12L12 17L22 12"></path>
      </svg>
    </button>
  )
}

export default AdminLink