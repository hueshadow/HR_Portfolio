import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    const auth = sessionStorage.getItem('isAdminAuthenticated')

    if (auth !== 'true') {
      // Redirect to login page if not authenticated
      navigate('/admin/login')
    }
  }, [navigate])

  // Check authentication on render
  const auth = sessionStorage.getItem('isAdminAuthenticated')

  // If not authenticated, useEffect will handle redirect
  // Show loading while checking
  if (auth !== 'true') {
    return (
      <div className="loading-auth">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  // If authenticated, render the protected component
  return <>{children}</>
}

export default ProtectedRoute