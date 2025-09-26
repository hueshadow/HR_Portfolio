import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminAuth: React.FC = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Simple password authentication - in production, use a more secure method
  const ADMIN_PASSWORD = 'admin123' // Change this to a secure password

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      // Set authentication in sessionStorage
      sessionStorage.setItem('isAdminAuthenticated', 'true')
      navigate('/admin')
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  return (
    <div className="admin-auth">
      <div className="auth-container">
        <div className="auth-box">
          <h2>Admin Login</h2>
          <p>Please enter the password to access the admin dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminAuth