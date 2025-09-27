import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AdminAuthProps {
  onLogin: (success: boolean) => void
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Default admin password - in production, this should be environment variable or more secure
  const ADMIN_PASSWORD = 'admin123'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      if (password === ADMIN_PASSWORD) {
        // Store authentication state
        localStorage.setItem('isAdminAuthenticated', 'true')
        localStorage.setItem('adminAuthTimestamp', Date.now().toString())
        onLogin(true)
        navigate('/admin')
      } else {
        setError('Invalid password')
        onLogin(false)
      }
    } catch (err) {
      setError('Login failed. Please try again.')
      onLogin(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-auth-container">
      <div className="admin-auth-form">
        <h1>Admin Login</h1>
        <p>Enter your password to access the admin dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading || !password}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Default password: admin123</p>
          <p className="security-note">
            For security, change this password in production
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminAuth