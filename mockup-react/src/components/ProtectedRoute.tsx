import React, { useEffect, useState } from 'react'
import AdminAuth from './AdminAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if user is authenticated
    const auth = sessionStorage.getItem('isAdminAuthenticated')
    setIsAuthenticated(auth === 'true')
  }, [])

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="loading-auth">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return <AdminAuth />
  }

  // If authenticated, render the protected component
  return <>{children}</>
}

export default ProtectedRoute