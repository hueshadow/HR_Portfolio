import type { AuthProvider } from 'react-admin'

type LoginParams = {
  username: string
  password: string
}

export const authProvider: AuthProvider = {
  login: ({ username, password }: LoginParams) => {
    // 这里使用简单的密码验证
    // 在生产环境中，应该调用真实的 API
    if (password === 'admin123') {
      sessionStorage.setItem('isAdminAuthenticated', 'true')
      localStorage.setItem('username', username)
      return Promise.resolve()
    }
    return Promise.reject(new Error('密码错误'))
  },

  logout: () => {
    sessionStorage.removeItem('isAdminAuthenticated')
    localStorage.removeItem('username')
    return Promise.resolve()
  },

  checkAuth: () => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated') === 'true'
    return isAuthenticated ? Promise.resolve() : Promise.reject(new Error('未登录'))
  },

  checkError: (error: any) => {
    const status = error.status
    if (status === 401 || status === 403) {
      sessionStorage.removeItem('isAdminAuthenticated')
      localStorage.removeItem('username')
      return Promise.reject(new Error('会话已过期'))
    }
    return Promise.resolve()
  },

  getPermissions: () => {
    const role = localStorage.getItem('role')
    return role ? Promise.resolve(role) : Promise.reject(new Error('未知角色'))
  },

  getIdentity: () => {
    const username = localStorage.getItem('username')
    return username
      ? Promise.resolve({
          id: username,
          fullName: username,
          avatar: '/assets/img/logo.png',
        })
      : Promise.reject(new Error('未找到用户信息'))
  },
}