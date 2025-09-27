import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layout,
  Menu,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Message,
  Typography,
  Card,
  Grid,
  Upload,
  Tabs,
  Badge,
  Statistic,
  Divider,
  ConfigProvider
} from '@arco-design/web-react'
import {
  IconPlus,
  IconEdit,
  IconDelete,
  IconEye,
  IconExport,
  IconImport,
  IconPoweroff,
  IconSearch,
  IconStar,
  IconStarFill,
  IconImage,
  IconVideoCamera,
  IconBug
} from '@arco-design/web-react/icon'
import { portfolioManager } from '../data/portfolio'
import type { PortfolioItem } from '../types/portfolio'
import ImageUploadManager from './ImageUploadManager'

const { Header, Content, Sider } = Layout
const { Title, Text } = Typography

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('list')
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [techInput, setTechInput] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'image',
    technologies: [] as string[],
    projectDate: '',
    featured: false,
    projectUrl: '',
    githubUrl: '',
    image: '',
    thumb: ''
  })
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<PortfolioItem | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [notification, setNotification] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info'
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    const items = portfolioManager.getAll()
    setProjects(items)
  }

  const filteredProjects = projects.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    localStorage.removeItem('adminAuthTimestamp')
    navigate('/admin/login')
  }

  const handleEdit = (item: PortfolioItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      technologies: [...item.technologies],
      projectDate: item.projectDate,
      featured: item.featured,
      projectUrl: item.projectUrl || '',
      githubUrl: item.githubUrl || '',
      image: item.image,
      thumb: item.thumb
    })
    setTechInput('')
    setEditingItem(item)
    setFormErrors({})
    setModalVisible(true)
  }

  const handleDelete = (item: PortfolioItem) => {
    setItemToDelete(item)
    setDeleteModalVisible(true)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      portfolioManager.delete(itemToDelete.id)
      loadProjects()
      setDeleteModalVisible(false)
      setItemToDelete(null)
      showNotification('项目已删除', 'success')
    }
  }

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    })
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.title.trim()) {
      errors.title = '请输入项目标题'
    }
    if (!formData.description.trim()) {
      errors.description = '请输入项目描述'
    }
    if (!formData.image.trim()) {
      errors.image = '请上传项目图片'
    }
    if (!formData.thumb.trim()) {
      errors.thumb = '请上传项目缩略图'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setLoading(true)

    try {
      const projectData = {
        ...formData,
        id: editingItem ? editingItem.id : Date.now(),
        createdAt: editingItem ? editingItem.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      if (editingItem) {
        portfolioManager.update(editingItem.id, projectData)
        showNotification('项目更新成功', 'success')
      } else {
        portfolioManager.create(projectData)
        showNotification('项目创建成功', 'success')
      }

      loadProjects()
      setModalVisible(false)
      resetForm()
    } catch (error) {
      showNotification('操作失败，请重试', 'error')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'image',
      technologies: [],
      projectDate: '',
      featured: false,
      projectUrl: '',
      githubUrl: '',
      image: '',
      thumb: ''
    })
    setEditingItem(null)
    setFormErrors({})
  }

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({
      visible: true,
      message,
      type
    })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }))
    }, 3000)
  }

  const handleExport = () => {
    const data = portfolioManager.exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    showNotification('数据导出成功', 'success')
  }

  const handleImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (portfolioManager.importData(data)) {
          loadProjects()
          showNotification('数据导入成功', 'success')
        } else {
          showNotification('数据格式错误', 'error')
        }
      } catch {
        showNotification('文件解析失败', 'error')
      }
    }
    reader.readAsText(file)
    return false
  }

  const uploadProps = {
    name: 'file',
    accept: '.json',
    showUploadList: false,
    customRequest: ({ file }: any) => {
      handleImport(file)
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      render: (id: number) => <Text copyable>{id}</Text>
    },
    {
      title: '项目名称',
      dataIndex: 'title',
      render: (title: string, record: PortfolioItem) => (
        <Space direction="vertical" size="mini">
          <Text style={{ fontWeight: 500 }}>{title}</Text>
          <Tag size="small" color={record.category === 'image' ? 'blue' : record.category === 'video' ? 'green' : 'purple'}>
            {record.category === 'image' ? <IconImage style={{ marginRight: 4 }} /> :
             record.category === 'video' ? <IconVideoCamera style={{ marginRight: 4 }} /> :
             <IconBug style={{ marginRight: 4 }} />}
            {record.category}
          </Tag>
        </Space>
      )
    },
    {
      title: '技术栈',
      dataIndex: 'technologies',
      render: (techs: string[]) => (
        <Space wrap size="mini">
          {techs.slice(0, 3).map(tech => (
            <Tag key={tech} size="small" color="arcoblue">{tech}</Tag>
          ))}
          {techs.length > 3 && <Tag size="small">+{techs.length - 3}</Tag>}
        </Space>
      )
    },
    {
      title: '日期',
      dataIndex: 'projectDate',
      width: 120,
      render: (date: string) => <Text type="secondary">{date}</Text>
    },
    {
      title: '状态',
      dataIndex: 'featured',
      width: 100,
      render: (featured: boolean) => (
        featured ? <Tag color="orange" icon={<IconStarFill />}>精选</Tag> : <Tag>普通</Tag>
      )
    },
    {
      title: '操作',
      width: 200,
      render: (_: any, record: PortfolioItem) => (
        <Space size="mini">
          <Button
            type="text"
            size="mini"
            icon={<IconEye />}
            onClick={() => window.open(`/portfolio/${record.id}`, '_blank')}
          >
            查看
          </Button>
          <Button
            type="text"
            size="mini"
            icon={<IconEdit />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            size="mini"
            status="danger"
            icon={<IconDelete />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ]

  const menuItems = [
    {
      key: 'projects',
      icon: <IconImage />,
      label: '项目管理'
    },
    {
      key: 'stats',
      icon: <IconStar />,
      label: '数据统计'
    }
  ]

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0
          }}
          theme="dark"
        >
          <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }} />
          <Menu
            theme="dark"
            mode="vertical"
            selectedKeys={['projects']}
          >
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                {item.icon} {item.label}
              </Menu.Item>
            ))}
          </Menu>
          <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
            <Button
              type="text"
              icon={<IconPoweroff />}
              onClick={handleLogout}
              style={{ color: 'white' }}
            >
              {collapsed ? '' : '退出登录'}
            </Button>
          </div>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
          <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title heading={5} style={{ margin: 0 }}>
                项目管理系统
              </Title>
              <Space>
                <Upload {...uploadProps}>
                  <Button icon={<IconImport />} type="outline">
                    导入数据
                  </Button>
                </Upload>
                <Button icon={<IconExport />} type="outline" onClick={handleExport}>
                  导出数据
                </Button>
                <Badge count={projects.length} dot>
                  <Button type="primary" icon={<IconPlus />} onClick={() => setModalVisible(true)}>
                    新建项目
                  </Button>
                </Badge>
              </Space>
            </div>
          </Header>
          <Content style={{ margin: '24px', minHeight: 280 }}>
            <Card>
              <Tabs activeTab={activeTab} onChange={setActiveTab} type="line">
                <Tabs.TabPane key="list" title="项目列表">
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Grid.Row gutter={16}>
                      <Grid.Col xs={24} sm={12} md={8}>
                        <Input
                          placeholder="搜索项目..."
                          prefix={<IconSearch />}
                          value={searchTerm}
                          onChange={(value) => setSearchTerm(value)}
                          allowClear
                        />
                      </Grid.Col>
                      <Grid.Col xs={24} sm={12} md={6}>
                        <Select
                          placeholder="选择分类"
                          value={categoryFilter}
                          onChange={setCategoryFilter}
                          style={{ width: '100%' }}
                        >
                          <Select.Option value="all">全部分类</Select.Option>
                          <Select.Option value="image">图片</Select.Option>
                          <Select.Option value="video">视频</Select.Option>
                          <Select.Option value="3d">3D</Select.Option>
                        </Select>
                      </Grid.Col>
                    </Grid.Row>

                    <Table
                      columns={columns}
                      data={filteredProjects}
                      rowKey="id"
                      pagination={{
                        pageSize: 10,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                      }}
                      scroll={{ x: 800 }}
                    />
                  </Space>
                </Tabs.TabPane>

                <Tabs.TabPane key="stats" title="数据统计">
                  <Grid.Row gutter={[16, 16]}>
                    <Grid.Col xs={24} sm={12} lg={6}>
                      <Card>
                        <Statistic
                          title="项目总数"
                          value={projects.length}
                          prefix={<IconImage />}
                        />
                      </Card>
                    </Grid.Col>
                    <Grid.Col xs={24} sm={12} lg={6}>
                      <Card>
                        <Statistic
                          title="精选项目"
                          value={projects.filter(p => p.featured).length}
                          prefix={<IconStarFill />}
                        />
                      </Card>
                    </Grid.Col>
                    <Grid.Col xs={24} sm={12} lg={6}>
                      <Card>
                        <Statistic
                          title="图片项目"
                          value={projects.filter(p => p.category === 'image').length}
                          prefix={<IconImage />}
                        />
                      </Card>
                    </Grid.Col>
                    <Grid.Col xs={24} sm={12} lg={6}>
                      <Card>
                        <Statistic
                          title="视频项目"
                          value={projects.filter(p => p.category === 'video').length}
                          prefix={<IconVideoCamera />}
                        />
                      </Card>
                    </Grid.Col>
                  </Grid.Row>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Content>
        </Layout>
      </Layout>

      {/* Project Form Modal */}
      <Modal
        title={editingItem ? '编辑项目' : '新建项目'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          resetForm()
        }}
        footer={
          <Space>
            <Button onClick={() => {
              setModalVisible(false)
              resetForm()
            }}>
              取消
            </Button>
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              {editingItem ? '更新' : '创建'}
            </Button>
          </Space>
        }
        style={{ top: 20 }}
      >
        <Form layout="vertical">
          <Grid.Row gutter={16}>
            <Grid.Col span={12}>
              <Form.Item label="项目标题" required>
                <Input
                  placeholder="请输入项目标题"
                  value={formData.title}
                  onChange={(value) => setFormData({ ...formData, title: value })}
                  status={formErrors.title ? 'error' : undefined}
                />
                {formErrors.title && <Text type="error">{formErrors.title}</Text>}
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label="项目分类">
                <Select
                  value={formData.category}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <Select.Option value="image">图片</Select.Option>
                  <Select.Option value="video">视频</Select.Option>
                  <Select.Option value="3d">3D</Select.Option>
                </Select>
              </Form.Item>
            </Grid.Col>
          </Grid.Row>

          <Form.Item label="项目描述" required>
            <Input.TextArea
              placeholder="请输入项目描述"
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              rows={4}
              status={formErrors.description ? 'error' : undefined}
            />
            {formErrors.description && <Text type="error">{formErrors.description}</Text>}
          </Form.Item>

          <Grid.Row gutter={16}>
            <Grid.Col span={12}>
              <Form.Item label="项目日期">
                <Input
                  type="date"
                  value={formData.projectDate}
                  onChange={(value) => setFormData({ ...formData, projectDate: value })}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label="是否精选">
                <Switch
                  checked={formData.featured}
                  onChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>

          <Form.Item label="技术栈">
            <Space>
              <Input
                placeholder="输入技术名称"
                value={techInput}
                onChange={(value) => setTechInput(value)}
                onPressEnter={handleAddTech}
                style={{ width: 200 }}
              />
              <Button onClick={handleAddTech}>添加</Button>
            </Space>
            <div style={{ marginTop: 8 }}>
              <Space wrap>
                {formData.technologies.map(tech => (
                  <Tag
                    key={tech}
                    closable
                    onClose={() => handleRemoveTech(tech)}
                    color="arcoblue"
                  >
                    {tech}
                  </Tag>
                ))}
              </Space>
            </div>
          </Form.Item>

          <Grid.Row gutter={16}>
            <Grid.Col span={12}>
              <Form.Item label="项目链接">
                <Input
                  placeholder="https://example.com"
                  value={formData.projectUrl}
                  onChange={(value) => setFormData({ ...formData, projectUrl: value })}
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label="GitHub链接">
                <Input
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={(value) => setFormData({ ...formData, githubUrl: value })}
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row gutter={16}>
            <Grid.Col span={12}>
              <Form.Item label="主图URL" required>
                <Input
                  placeholder="/assets/img/projects/..."
                  value={formData.image}
                  onChange={(value) => setFormData({ ...formData, image: value })}
                  status={formErrors.image ? 'error' : undefined}
                />
                {formErrors.image && <Text type="error">{formErrors.image}</Text>}
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label="缩略图URL" required>
                <Input
                  placeholder="/assets/img/projects/thumb/..."
                  value={formData.thumb}
                  onChange={(value) => setFormData({ ...formData, thumb: value })}
                  status={formErrors.thumb ? 'error' : undefined}
                />
                {formErrors.thumb && <Text type="error">{formErrors.thumb}</Text>}
              </Form.Item>
            </Grid.Col>
          </Grid.Row>

          <Divider />

          <Form.Item label="图片管理">
            <ImageUploadManager
              onImageSelect={(_: File, preview: string) => {
                setFormData({ ...formData, image: preview })
              }}
              onThumbSelect={(_: File, preview: string) => {
                setFormData({ ...formData, thumb: preview })
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="确认删除"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => {
          setDeleteModalVisible(false)
          setItemToDelete(null)
        }}
        okText="删除"
        okButtonProps={{ status: 'danger' }}
      >
        确定要删除项目 "{itemToDelete?.title}" 吗？此操作不可恢复。
      </Modal>

      {/* Notification */}
      {notification.visible && (
        <Message
          type={notification.type}
          content={notification.message}
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999
          }}
        />
      )}
    </ConfigProvider>
  )
}

export default AdminDashboard