import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkAuth = () => {
      const authState = localStorage.getItem('isAdminAuthenticated')
      const authTimestamp = localStorage.getItem('adminAuthTimestamp')

      if (authState === 'true' && authTimestamp) {
        // Check if session is still valid (24 hours)
        const now = Date.now()
        const sessionAge = now - parseInt(authTimestamp)
        const maxSessionAge = 24 * 60 * 60 * 1000 // 24 hours

        if (sessionAge < maxSessionAge) {
          setIsAuthenticated(true)
          return
        } else {
          // Session expired
          localStorage.removeItem('isAdminAuthenticated')
          localStorage.removeItem('adminAuthTimestamp')
        }
      }

      setIsAuthenticated(false)
      // Redirect to login with return URL
      navigate('/admin/login', {
        state: { from: location.pathname },
        replace: true
      })
    }

    checkAuth()
  }, [navigate, location])

  if (isAuthenticated === null) {
    // Show loading spinner while checking authentication
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}

export default ProtectedRoute