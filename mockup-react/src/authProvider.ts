import type { AuthProvider } from 'react-admin'

const authProvider: AuthProvider = {
  // 登录
  login: async ({ username, password }) => {
    // 简单的认证逻辑
    const ADMIN_PASSWORD = 'admin123'
    const ADMIN_EMAIL = 'admin@example.com'

    if (password !== ADMIN_PASSWORD) {
      return Promise.reject(new Error('密码错误'))
    }

    // 保存认证信息到 localStorage
    localStorage.setItem('auth', JSON.stringify({
      email: username || ADMIN_EMAIL,
      fullName: '管理员',
      avatar: '',
      role: 'admin',
      permissions: ['read', 'write', 'delete'],
      authenticated: true,
      timestamp: Date.now()
    }))

    return Promise.resolve()
  },

  // 检查是否已认证
  checkAuth: async () => {
    const auth = localStorage.getItem('auth')
    if (!auth) {
      return Promise.reject(new Error('未登录'))
    }

    const authData = JSON.parse(auth)

    // 检查会话是否过期 (24小时)
    const sessionAge = Date.now() - authData.timestamp
    const maxSessionAge = 24 * 60 * 60 * 1000 // 24小时

    if (sessionAge > maxSessionAge) {
      localStorage.removeItem('auth')
      return Promise.reject(new Error('会话已过期'))
    }

    return Promise.resolve()
  },

  // 检查权限
  checkError: async (error) => {
    const status = error.status
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth')
      return Promise.reject(new Error('未授权'))
    }
    return Promise.resolve()
  },

  // 获取身份信息
  getIdentity: async () => {
    const auth = localStorage.getItem('auth')
    if (!auth) {
      return Promise.reject(new Error('未登录'))
    }

    const authData = JSON.parse(auth)
    return Promise.resolve({
      id: authData.email,
      fullName: authData.fullName,
      avatar: authData.avatar
    })
  },

  // 获取权限
  getPermissions: async () => {
    const auth = localStorage.getItem('auth')
    if (!auth) {
      return Promise.reject(new Error('未登录'))
    }

    const authData = JSON.parse(auth)
    return Promise.resolve(authData.permissions || [])
  },

  // 登出
  logout: async () => {
    localStorage.removeItem('auth')
    return Promise.resolve()
  }
}

export default authProvider