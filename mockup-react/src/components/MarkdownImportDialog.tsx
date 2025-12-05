import React, { useState, useCallback } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  TextField,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  IconButton
} from '@mui/material'
import {
  Close as CloseIcon,
  Description as FileIcon,
  Visibility as PreviewIcon,
  Code as SourceIcon,
  Upload as UploadIcon
} from '@mui/icons-material'
import ReactMarkdown from 'react-markdown'
import {
  processMarkdownFile,
  formatFileSize
} from '../utils/fileUtils'
import type { ProcessedMarkdownFile } from '../utils/fileUtils'

interface MarkdownImportDialogProps {
  open: boolean
  onClose: () => void
  onImport: (content: string, filename: string) => void
  maxSize?: number
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`markdown-tabpanel-${index}`}
      aria-labelledby={`markdown-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  )
}

const MarkdownImportDialog: React.FC<MarkdownImportDialogProps> = ({
  open,
  onClose,
  onImport,
  maxSize = 1 * 1024 * 1024 // 1MB
}) => {
  const [tabValue, setTabValue] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [processedFile, setProcessedFile] = useState<ProcessedMarkdownFile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      processFile(file)
    }
  }, [])

  const processFile = useCallback(async (file: File) => {
    setLoading(true)
    setError(null)

    try {
      const processed = await processMarkdownFile(file)
      setProcessedFile(processed)
      setTabValue(0) // Switch to preview tab
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '文件处理失败'
      setError(errorMessage)
      setProcessedFile(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleImport = useCallback(() => {
    if (processedFile) {
      onImport(processedFile.content, processedFile.metadata.filename)
      handleClose()
    }
  }, [processedFile, onImport])

  const handleClose = useCallback(() => {
    setSelectedFile(null)
    setProcessedFile(null)
    setError(null)
    setLoading(false)
    setTabValue(0)
    onClose()
  }, [onClose])

  const handleTabChange = useCallback((_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '70vh',
          maxHeight: '90vh'
        }
      }}
      aria-labelledby="markdown-import-dialog-title"
    >
      <DialogTitle
        id="markdown-import-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileIcon color="primary" />
          <Typography variant="h6">导入 Markdown 文件</Typography>
        </Box>
        <IconButton onClick={handleClose} aria-label="关闭">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {/* File Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            选择文件 (支持 .md, .markdown 格式，最大 {formatFileSize(maxSize)})
          </Typography>
          <TextField
            type="file"
            inputProps={{
              accept: '.md,.markdown',
              'aria-label': '选择Markdown文件'
            }}
            onChange={handleFileSelect}
            fullWidth
            size="small"
            disabled={loading}
            helperText={selectedFile ? `已选择: ${selectedFile.name} (${formatFileSize(selectedFile.size)})` : '请选择要导入的Markdown文件'}
          />
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={40} />
            <Typography variant="body2" sx={{ ml: 2 }}>
              正在处理文件...
            </Typography>
          </Box>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="body2">{error}</Typography>
          </Alert>
        )}

        {/* File Processing Results */}
        {processedFile && (
          <Box sx={{ mb: 2 }}>
            {/* File Metadata */}
            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                文件信息
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>文件名:</strong> {processedFile.metadata.filename}
                </Typography>
                <Typography variant="body2">
                  <strong>大小:</strong> {formatFileSize(processedFile.metadata.size)}
                </Typography>
                <Typography variant="body2">
                  <strong>字符数:</strong> {processedFile.metadata.characterCount}
                </Typography>
                <Typography variant="body2">
                  <strong>修改时间:</strong> {processedFile.metadata.lastModified.toLocaleString('zh-CN')}
                </Typography>
              </Box>
            </Box>

            {/* Validation Warnings */}
            {processedFile.validation.warnings.length > 0 && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  注意事项:
                </Typography>
                {processedFile.validation.warnings.map((warning, index) => (
                  <Typography key={index} variant="body2">
                    • {warning}
                  </Typography>
                ))}
              </Alert>
            )}

            {/* Tabs for Preview/Source */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="预览选项卡">
                <Tab
                  icon={<PreviewIcon />}
                  label="预览"
                  iconPosition="start"
                  aria-controls="markdown-tabpanel-0"
                />
                <Tab
                  icon={<SourceIcon />}
                  label="源码"
                  iconPosition="start"
                  aria-controls="markdown-tabpanel-1"
                />
              </Tabs>
            </Box>

            {/* Preview Tab */}
            <TabPanel value={tabValue} index={0}>
              <Box
                sx={{
                  maxHeight: '300px',
                  overflow: 'auto',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <Typography variant="h4" component="h1" gutterBottom>
                        {children}
                      </Typography>
                    ),
                    h2: ({ children }) => (
                      <Typography variant="h5" component="h2" gutterBottom>
                        {children}
                      </Typography>
                    ),
                    h3: ({ children }) => (
                      <Typography variant="h6" component="h3" gutterBottom>
                        {children}
                      </Typography>
                    ),
                    p: ({ children }) => (
                      <Typography variant="body1" paragraph>
                        {children}
                      </Typography>
                    ),
                    code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode; className?: string }) => (
                      inline ? (
                        <Chip
                          label={children}
                          size="small"
                          sx={{
                            fontFamily: 'monospace',
                            bgcolor: 'grey.100',
                            fontSize: '0.875em'
                          }}
                        />
                      ) : (
                        <Box
                          component="pre"
                          sx={{
                            bgcolor: 'grey.900',
                            color: 'grey.100',
                            p: 2,
                            borderRadius: 1,
                            overflow: 'auto',
                            fontFamily: 'monospace',
                            fontSize: '0.875em'
                          }}
                        >
                          <code>{children}</code>
                        </Box>
                      )
                    ),
                    ul: ({ children }) => (
                      <Box component="ul" sx={{ pl: 2 }}>
                        {children}
                      </Box>
                    ),
                    ol: ({ children }) => (
                      <Box component="ol" sx={{ pl: 2 }}>
                        {children}
                      </Box>
                    ),
                    li: ({ children }) => (
                      <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
                        {children}
                      </Typography>
                    ),
                    blockquote: ({ children }) => (
                      <Box
                        sx={{
                          borderLeft: 4,
                          borderColor: 'primary.main',
                          pl: 2,
                          py: 1,
                          bgcolor: 'grey.50',
                          fontStyle: 'italic'
                        }}
                      >
                        {children}
                      </Box>
                    )
                  }}
                >
                  {processedFile.content}
                </ReactMarkdown>
              </Box>
            </TabPanel>

            {/* Source Tab */}
            <TabPanel value={tabValue} index={1}>
              <Box
                sx={{
                  maxHeight: '300px',
                  overflow: 'auto',
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  bgcolor: 'grey.900',
                  color: 'grey.100'
                }}
              >
                <Typography
                  component="pre"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.875em',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0
                  }}
                >
                  {processedFile.content}
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          取消
        </Button>
        <Button
          onClick={handleImport}
          variant="contained"
          disabled={!processedFile || loading}
          startIcon={<UploadIcon />}
          aria-label="导入Markdown内容"
        >
          导入
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MarkdownImportDialog