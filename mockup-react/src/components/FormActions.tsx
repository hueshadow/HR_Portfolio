import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme
} from '@mui/material'
import {
  Save as SaveIcon,
  Drafts as DraftIcon,
  Publish as PublishIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material'
import { useNotify, useRefresh, useDataProvider, useRecordContext } from 'react-admin'
import { ProjectStatus } from '../dataProvider'

interface FormActionsProps {
  onSaveDraft?: () => void
  onSave?: () => void
  onPublish?: () => void
  disabled?: boolean
  record?: any
  resource?: string
}

const FormActions: React.FC<FormActionsProps> = ({
  onSaveDraft,
  onSave,
  onPublish,
  disabled = false,
  record,
  resource = 'projects'
}) => {
  const notify = useNotify()
  const refresh = useRefresh()
  const dataProvider = useDataProvider()
  const [loading, setLoading] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [autoSaving, setAutoSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning'
  }>({ open: false, message: '', severity: 'success' })

  // 获取当前记录状态
  const currentStatus = record?.status || 'draft'
  const recordContext = useRecordContext()

  // 用于防抖的ref
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasAutoSaveTriggeredRef = useRef(false)

  // 更新最后保存时间
  useEffect(() => {
    if (record?.updatedAt) {
      setLastSaved(new Date(record.updatedAt))
    }
  }, [record?.updatedAt])

  // 自动保存逻辑
  const triggerAutoSave = useCallback(() => {
    if (!record?.id || !resource || hasAutoSaveTriggeredRef.current) return

    // 防止重复触发自动保存
    hasAutoSaveTriggeredRef.current = true

    setAutoSaving(true)
    setHasUnsavedChanges(false)

    try {
      const updatedData = {
        ...record,
        updatedAt: new Date().toISOString()
      }

      // 异步保存到localStorage
      setTimeout(() => {
        const storedData = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')
        const index = storedData.findIndex((item: any) => item.id === record.id)
        if (index !== -1) {
          storedData[index] = { ...storedData[index], ...updatedData }
          localStorage.setItem(`${resource}Data`, JSON.stringify(storedData))
          setLastSaved(new Date())
        }
        setAutoSaving(false)
        hasAutoSaveTriggeredRef.current = false
      }, 500) // 模拟网络延迟
    } catch (error) {
      console.error('自动保存失败:', error)
      setAutoSaving(false)
      hasAutoSaveTriggeredRef.current = false
    }
  }, [record, resource])

  // 防抖自动保存（5秒后执行）
  const debouncedAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      triggerAutoSave()
    }, 5000) // 5秒后自动保存
  }, [triggerAutoSave])

  // 监听记录变化触发自动保存
  useEffect(() => {
    if (record && record.id) {
      setHasUnsavedChanges(true)
      debouncedAutoSave()
    }

    // 清理函数
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [record, debouncedAutoSave])

  // 保存操作
  const handleSave = useCallback(async (status: ProjectStatus, operation: string) => {
    if (!record?.id || !resource) {
      notify('无法保存：记录ID或资源未找到', { type: 'error' })
      return
    }

    // 取消正在进行的自动保存
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
      autoSaveTimeoutRef.current = null
    }

    setLoading(operation)

    try {
      const updatedData = {
        ...record,
        status,
        updatedAt: new Date().toISOString()
      }

      await dataProvider.update(resource, {
        id: record.id,
        data: updatedData,
        previousData: record
      })

      setLastSaved(new Date())
      setHasUnsavedChanges(false)
      setSnackbar({
        open: true,
        message: `${operation}成功`,
        severity: 'success'
      })

      // 调用相应的回调
      switch (status) {
        case 'draft':
          onSaveDraft?.()
          break
        case 'saved':
          onSave?.()
          break
        case 'published':
          onPublish?.()
          break
      }

      refresh()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '保存失败'
      setSnackbar({
        open: true,
        message: `${operation}失败：${errorMessage}`,
        severity: 'error'
      })
      notify(`${operation}失败：${errorMessage}`, { type: 'error' })
    } finally {
      setLoading(null)
    }
  }, [record, resource, dataProvider, notify, refresh, onSaveDraft, onSave, onPublish])

  // 处理键盘快捷键
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        if (currentStatus === 'draft') {
          handleSave('saved', '保存')
        } else {
          handleSave('saved', '保存')
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentStatus, handleSave])

  // 处理页面离开前的确认
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 如果有未保存的更改，显示确认对话框
      if (hasUnsavedChanges) {
        const message = '您有未保存的更改，确定要离开吗？'
        event.returnValue = message
        return message
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  const formatLastSaved = (date: Date | null) => {
    if (!date) return '尚未保存'
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) {
      return '刚刚保存'
    } else if (minutes < 60) {
      return `${minutes}分钟前保存`
    } else {
      const hours = Math.floor(minutes / 60)
      return `${hours}小时前保存`
    }
  }

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'draft':
        return 'warning'
      case 'saved':
        return 'info'
      case 'published':
        return 'success'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'draft':
        return <DraftIcon />
      case 'saved':
        return <SaveIcon />
      case 'published':
        return <PublishIcon />
      default:
        return <SaveIcon />
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, mb: 2 }}>
        {/* 当前状态指示 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              当前状态：
            </Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 1,
                bgcolor: `${getStatusColor(currentStatus)}.main}15`,
                color: `${getStatusColor(currentStatus)}.main}`
              }}
            >
              {getStatusIcon(currentStatus)}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {currentStatus === 'draft' ? '草稿' :
                 currentStatus === 'saved' ? '已保存' : '已发布'}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatLastSaved(lastSaved)}
            </Typography>
          </Box>

          {/* 自动保存和未保存状态指示器 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {autoSaving && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CircularProgress size={12} />
                <Typography variant="caption" color="primary">
                  自动保存中...
                </Typography>
              </Box>
            )}
            {hasUnsavedChanges && !autoSaving && (
              <Typography variant="caption" color="warning.main" sx={{ fontWeight: 500 }}>
                • 未保存的更改
              </Typography>
            )}
          </Box>
        </Box>

        {/* 保存操作按钮组 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={loading === 'draft' ? <CircularProgress size={16} /> : <DraftIcon />}
            onClick={() => handleSave('draft', '保存草稿')}
            disabled={disabled || loading !== null}
            color="warning"
            size="large"
          >
            保存草稿
          </Button>

          <Button
            variant="outlined"
            startIcon={loading === 'saved' ? <CircularProgress size={16} /> : <SaveIcon />}
            onClick={() => handleSave('saved', '保存')}
            disabled={disabled || loading !== null}
            color="info"
            size="large"
          >
            保存
          </Button>

          <Button
            variant="contained"
            startIcon={loading === 'published' ? <CircularProgress size={16} /> : <CloudUploadIcon />}
            onClick={() => handleSave('published', '发布')}
            disabled={disabled || loading !== null}
            color="success"
            size="large"
          >
            发布
          </Button>
        </Box>

        {/* 提示信息 */}
        <Alert severity="info" sx={{ mb: 1 }}>
          <Typography variant="body2">
            💡 提示：按 Ctrl+S 快速保存（Windows/Linux）或 Cmd+S（Mac）| 系统会在您停止输入5秒后自动保存
          </Typography>
        </Alert>
      </Box>

      {/* 保存成功/失败提示 */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </>
  )
}

export default FormActions