import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  AlertTitle,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  Lock,
  AdminPanelSettings
} from '@mui/icons-material'

interface AdminAuthProps {
  onLogin: (success: boolean) => void
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const ADMIN_PASSWORD = 'admin123'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdminAuthenticated', 'true')
        localStorage.setItem('adminAuthTimestamp', Date.now().toString())
        onLogin(true)
        navigate('/admin')
      } else {
        setError('Invalid password')
        onLogin(false)
      }
    } catch {
      setError('Login failed. Please try again.')
      onLogin(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AdminPanelSettings sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Admin Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Portfolio Management System
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {error && (
                <Alert severity="error">
                  <AlertTitle>Login Failed</AlertTitle>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading || !password}
                sx={{ mt: 2, py: 1.5 }}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
              >
                {isLoading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>
            </Box>
          </form>

          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Default password: <strong>admin123</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              For security, change this password in production
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default AdminAuth