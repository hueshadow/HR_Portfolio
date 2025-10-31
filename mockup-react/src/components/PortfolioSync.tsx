import React, { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent
} from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  Sync as SyncIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material'
import { portfolioManager } from '../data/portfolio'
import {
  syncPortfolioToAdmin,
  hasPortfolioBeenSynced,
  getSyncStatus,
  detectDuplicates,
  getExistingProjects,
  markPortfolioAsSynced,
  type SyncResult,
  type DuplicateInfo
} from '../utils/portfolioSync'

interface PortfolioSyncProps {
  onSyncComplete?: (result: SyncResult) => void
}

const PortfolioSync: React.FC<PortfolioSyncProps> = ({ onSyncComplete }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
  const [duplicates, setDuplicates] = useState<DuplicateInfo[]>([])
  const [portfolioItems, setPortfolioItems] = useState(portfolioManager.getAll())
  const [hasSynced, setHasSynced] = useState(false)
  const [syncStatus, setSyncStatus] = useState(getSyncStatus())

  useEffect(() => {
    setHasSynced(hasPortfolioBeenSynced())
    setSyncStatus(getSyncStatus())
    setPortfolioItems(portfolioManager.getAll())
  }, [])

  const handleOpen = () => {
    const existingProjects = getExistingProjects()
    const duplicateItems = detectDuplicates(portfolioItems, existingProjects)
    setDuplicates(duplicateItems)
    setSyncResult(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setLoading(false)
    setSyncResult(null)
  }

  const handleSync = async (options: { skipDuplicates?: boolean; mergeDuplicates?: boolean } = {}) => {
    setLoading(true)
    setSyncResult(null)

    try {
      const result = await syncPortfolioToAdmin(portfolioItems, options)
      setSyncResult(result)

      if (result.success && result.synced > 0) {
        markPortfolioAsSynced(result.synced)
        setHasSynced(true)
        setSyncStatus(getSyncStatus())
      }

      if (onSyncComplete) {
        onSyncComplete(result)
      }
    } catch (error) {
      setSyncResult({
        success: false,
        synced: 0,
        skipped: 0,
        errors: [error instanceof Error ? error.message : '同步失败'],
        duplicates: []
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (success: boolean) => {
    if (loading) return <LinearProgress sx={{ width: 20, height: 20 }} />
    return success ?
      <CheckCircleIcon color="success" /> :
      <ErrorIcon color="error" />
  }

  
  if (hasSynced) {
    return (
      <Box sx={{ p: 2, mb: 2 }}>
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          action={
            <Button size="small" onClick={handleOpen}>
              查看详情
            </Button>
          }
        >
          <Typography variant="body2" gutterBottom>
            作品集已同步完成 - 已同步 {syncStatus.projectCount} 个项目
            {syncStatus.syncDate && ` (${new Date(syncStatus.syncDate).toLocaleDateString('zh-CN')})`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            所有作品集项目现在都可以在管理后台中进行编辑和管理
          </Typography>
        </Alert>
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ p: 2, mb: 2 }}>
        <Alert
          severity="info"
          icon={<InfoIcon />}
          action={
            <Button
              variant="contained"
              startIcon={<SyncIcon />}
              onClick={handleOpen}
              disabled={loading}
            >
              同步作品集项目
            </Button>
          }
        >
          <Typography variant="body2" gutterBottom>
            发现 {portfolioItems.length} 个作品集项目尚未同步到管理系统
          </Typography>
          <Typography variant="caption" color="text.secondary">
            同步后，所有作品集项目将统一在管理后台中管理，便于维护和更新
          </Typography>
        </Alert>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <SyncIcon />
            同步作品集项目
          </Box>
        </DialogTitle>

        <DialogContent>
          {/* 项目预览 */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              待同步项目 ({portfolioItems.length})
            </Typography>
            <Grid container spacing={2}>
              {portfolioItems.map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ pb: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                        <Typography variant="subtitle2" noWrap>
                          {item.title}
                        </Typography>
                        <Chip
                          size="small"
                          label={item.category}
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {item.description.substring(0, 100)}...
                      </Typography>
                      <Box display="flex" gap={1} mt={1}>
                        {item.featured && (
                          <Chip size="small" label="精选" color="secondary" />
                        )}
                        {item.technologies && item.technologies.length > 0 && (
                          <Chip size="small" label={`${item.technologies.length} 技术`} />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 重复项目警告 */}
          {duplicates.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="warning" icon={<WarningIcon />}>
                <Typography variant="subtitle2" gutterBottom>
                  发现 {duplicates.length} 个重复项目
                </Typography>
                <Typography variant="body2">
                  以下项目可能与现有项目重复，请选择处理方式：
                </Typography>
              </Alert>

              <List dense sx={{ mt: 1 }}>
                {duplicates.map((duplicate, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={duplicate.incoming.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              重复类型: {duplicate.conflictType === 'both' ? '标题和描述' :
                                       duplicate.conflictType === 'title' ? '标题' : '描述'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              现有项目: {duplicate.existing.title}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < duplicates.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}

          {/* 同步结果 */}
          {syncResult && (
            <Box sx={{ mb: 3 }}>
              <Alert
                severity={syncResult.success ? "success" : "error"}
                icon={getStatusIcon(syncResult.success)}
              >
                <Typography variant="subtitle2" gutterBottom>
                  {syncResult.success ? '同步成功' : '同步失败'}
                </Typography>
                <Box>
                  <Typography variant="body2">
                    ✅ 成功同步: {syncResult.synced} 个项目
                  </Typography>
                  {syncResult.skipped > 0 && (
                    <Typography variant="body2">
                      ⏭️ 跳过: {syncResult.skipped} 个项目
                    </Typography>
                  )}
                </Box>
              </Alert>

              {syncResult.errors.length > 0 && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    错误详情:
                  </Typography>
                  {syncResult.errors.map((error, index) => (
                    <Typography key={index} variant="body2" component="div">
                      • {error}
                    </Typography>
                  ))}
                </Alert>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            {syncResult?.success ? '完成' : '取消'}
          </Button>

          {!syncResult && (
            <>
              {duplicates.length > 0 ? (
                <>
                  <Button
                    onClick={() => handleSync({ skipDuplicates: true })}
                    disabled={loading}
                    color="warning"
                  >
                    跳过重复项
                  </Button>
                  <Button
                    onClick={() => handleSync({ mergeDuplicates: true })}
                    disabled={loading}
                    variant="contained"
                    color="primary"
                  >
                    合并重复项
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleSync()}
                  disabled={loading}
                  variant="contained"
                  color="primary"
                  startIcon={<SyncIcon />}
                >
                  {loading ? '同步中...' : '开始同步'}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PortfolioSync
