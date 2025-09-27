import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  Button,
  Message,
  Typography,
  Space,
  ConfigProvider
} from '@arco-design/web-react'
import {
  IconLock,
  IconUser
} from '@arco-design/web-react/icon'

interface AdminAuthProps {
  onLogin: (success: boolean) => void
}

const AdminAuth: React.FC<AdminAuthProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const ADMIN_PASSWORD = 'admin123'

  const handleSubmit = async () => {
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
        navigate('/admin')
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

  return (
    <ConfigProvider>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <Card
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                background: '#667eea',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconUser style={{ fontSize: 40, color: 'white' }} />
              </div>
              <Typography.Title heading={4} style={{ margin: 0 }}>
                管理员登录
              </Typography.Title>
              <Typography.Text type="secondary">
                项目作品集管理系统
              </Typography.Text>
            </div>

            {error && (
              <Message type="error" content={error} style={{ marginBottom: 16 }} />
            )}

            <Form onSubmit={handleSubmit} layout="vertical">
              <Form.Item label="密码" field="password" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password
                  placeholder="请输入密码"
                  value={password}
                  onChange={(value) => setPassword(value)}
                  prefix={<IconLock />}
                  disabled={isLoading}
                  onPressEnter={handleSubmit}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  long
                  size="large"
                  loading={isLoading}
                  disabled={!password}
                  onClick={handleSubmit}
                  style={{ height: '48px' }}
                >
                  {isLoading ? '登录中...' : '登录管理后台'}
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Typography.Text type="secondary">
                默认密码：<strong>admin123</strong>
              </Typography.Text>
              <Typography.Text type="secondary" style={{ display: 'block', marginTop: 4, fontSize: 12 }}>
                生产环境请修改此密码
              </Typography.Text>
            </div>
          </Space>
        </Card>
      </div>
    </ConfigProvider>
  )
}

export default AdminAuth