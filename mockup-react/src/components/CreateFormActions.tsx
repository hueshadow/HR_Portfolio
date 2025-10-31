import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material'
import {
  Save as SaveIcon,
  Drafts as DraftIcon,
  Publish as PublishIcon
} from '@mui/icons-material'
import { PROJECT_STATUS, type ProjectStatus } from '../dataProvider'

interface CreateFormActionsProps {
  disabled?: boolean
}

const CreateFormActions: React.FC<CreateFormActionsProps> = ({
  disabled = false
}) => {
  const [loading, setLoading] = useState<ProjectStatus | null>(null)

  // 创建操作
  const handleCreate = (status: ProjectStatus) => {
    setLoading(status)

    // 触发表单提交
    const form = document.querySelector('form') as HTMLFormElement
    if (form) {
      const event = new Event('submit', { cancelable: true })
      form.dispatchEvent(event)
    }
  }

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case PROJECT_STATUS.DRAFT:
        return <DraftIcon />
      case PROJECT_STATUS.SAVED:
        return <SaveIcon />
      case PROJECT_STATUS.PUBLISHED:
        return <PublishIcon />
      default:
        return <SaveIcon />
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3, mb: 2 }}>
      {/* 操作说明 */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          选择项目的初始状态
        </Typography>
      </Box>

      {/* 创建操作按钮组 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={loading === PROJECT_STATUS.DRAFT ? <CircularProgress size={16} /> : <DraftIcon />}
          onClick={() => handleCreate(PROJECT_STATUS.DRAFT)}
          disabled={disabled || loading !== null}
          color="warning"
          size="large"
        >
          创建草稿
        </Button>

        <Button
          variant="outlined"
          startIcon={loading === PROJECT_STATUS.SAVED ? <CircularProgress size={16} /> : <SaveIcon />}
          onClick={() => handleCreate(PROJECT_STATUS.SAVED)}
          disabled={disabled || loading !== null}
          color="info"
          size="large"
        >
          创建并保存
        </Button>

        <Button
          variant="contained"
          startIcon={loading === PROJECT_STATUS.PUBLISHED ? <CircularProgress size={16} /> : <PublishIcon />}
          onClick={() => handleCreate(PROJECT_STATUS.PUBLISHED)}
          disabled={disabled || loading !== null}
          color="success"
          size="large"
        >
          创建并发布
        </Button>
      </Box>

      {/* 提示信息 */}
      <Alert severity="info" sx={{ mb: 1 }}>
        <Typography variant="body2">
          💡 提示：创建后还可以在编辑页面修改项目状态
        </Typography>
      </Alert>
    </Box>
  )
}

export default CreateFormActions
