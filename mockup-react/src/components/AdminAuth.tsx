import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material'
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// 创建自定义主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b94ff',
      dark: '#3949ab'
    },
    secondary: {
      main: '#764ba2',
      light: '#a379c3',
      dark: '#4a148c'
    },
    background: {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500
        }
      }
    }
  }
})

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

    if (!password) {
      setError('请输入密码')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('isAdminAuthenticated', 'true')
        localStorage.setItem('adminAuthTimestamp', Date.now().toString())
        onLogin(true)
        // 不要在这里进行导航，让 App.tsx 处理重定向
      } else {
        setError('密码错误')
        onLogin(false)
      }
    } catch {
      setError('登录失败，请重试')
      onLogin(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.background.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Container maxWidth="xs">
          <Card sx={{ p: 4 }}>
            <Box textAlign="center" mb={3}>
              <Paper
                elevation={0}
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LockIcon sx={{ fontSize: 40, color: 'white' }} />
              </Paper>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                管理员登录
              </Typography>
              <Typography variant="body2" color="text.secondary">
                项目作品集管理系统
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="密码"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
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
                disabled={!password || isLoading}
                loading={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                  }
                }}
              >
                {isLoading ? '登录中...' : '登录管理后台'}
              </Button>
            </Box>

            <Box textAlign="center" mt={2}>
              <Typography variant="body2" color="text.secondary">
                默认密码：<strong>admin123</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                生产环境请修改此密码
              </Typography>
            </Box>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default AdminAuth