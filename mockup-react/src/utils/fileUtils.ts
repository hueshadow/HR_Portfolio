/**
 * 将文件转换为 Base64 字符串
 */
interface FileObject {
  rawFile: File
  src?: string
}

export const convertFileToBase64 = (file: FileObject): Promise<string> => {
  if (!(file.rawFile instanceof File)) {
    return Promise.resolve(file.src || '')
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject

    // 限制文件大小 (5MB for images, 50MB for videos)
    if (file.rawFile.type.startsWith('image/') && file.rawFile.size > 5 * 1024 * 1024) {
      reject(new Error('图片大小不能超过 5MB'))
      return
    }

    if (file.rawFile.type.startsWith('video/') && file.rawFile.size > 50 * 1024 * 1024) {
      reject(new Error('视频大小不能超过 50MB'))
      return
    }

    reader.readAsDataURL(file.rawFile)
  })
}

/**
 * 生成文件名
 */
export const generateFileName = (file: File, prefix = ''): string => {
  const timestamp = new Date().getTime()
  const random = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split('.').pop()

  return `${prefix}${timestamp}_${random}.${extension}`
}

/**
 * 验证文件类型
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.slice(0, -2))
    }
    return file.type === type
  })
}

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Markdown file processing interfaces
export interface MarkdownValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface MarkdownFileMetadata {
  filename: string
  size: number
  lastModified: Date
  characterCount: number
}

export interface ProcessedMarkdownFile {
  content: string
  metadata: MarkdownFileMetadata
  validation: MarkdownValidationResult
}

/**
 * 验证Markdown文件
 */
export const validateMarkdownFile = (file: File): MarkdownValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []

  // 检查文件大小 (1MB限制)
  const maxSize = 1 * 1024 * 1024 // 1MB
  if (file.size > maxSize) {
    errors.push(`文件大小不能超过 1MB，当前文件大小为 ${formatFileSize(file.size)}`)
  }

  // 检查文件类型
  const allowedExtensions = ['.md', '.markdown']
  const fileName = file.name.toLowerCase()
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext))

  if (!hasValidExtension) {
    errors.push('只支持 .md 和 .markdown 文件格式')
  }

  // 检查MIME类型
  const allowedMimeTypes = ['text/markdown', 'text/plain', 'application/octet-stream']
  if (!allowedMimeTypes.includes(file.type) && file.type !== '') {
    warnings.push('文件MIME类型可能不正确，但仍将尝试处理')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * 读取Markdown文件内容
 */
export const readMarkdownFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const content = reader.result as string
        resolve(content)
      } catch {
        reject(new Error('读取文件内容失败'))
      }
    }

    reader.onerror = () => {
      reject(new Error('文件读取过程中发生错误'))
    }

    // 对于文本文件，使用readAsText而不是readAsDataURL
    reader.readAsText(file, 'UTF-8')
  })
}

/**
 * 清理Markdown内容
 */
export const sanitizeMarkdownContent = (content: string): string => {
  if (!content || typeof content !== 'string') {
    return ''
  }

  let sanitized = content

  // 移除潜在的脚本标签和危险内容
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gis, '')
  sanitized = sanitized.replace(/<iframe[^>]*>.*?<\/iframe>/gis, '')
  sanitized = sanitized.replace(/<object[^>]*>.*?<\/object>/gis, '')
  sanitized = sanitized.replace(/<embed[^>]*>/gi, '')
  sanitized = sanitized.replace(/javascript:/gi, '')
  sanitized = sanitized.replace(/on\w+\s*=/gi, '')

  // 限制HTML标签在Markdown中的使用（只允许安全的标签）
  const allowedHtmlTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'strong', 'em', 'u', 'i', 'b',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'div', 'span'
  ]

  // 这个正则表达式会移除不在允许列表中的HTML标签
  sanitized = sanitized.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) => {
    const lowerTagName = tagName.toLowerCase()
    if (allowedHtmlTags.includes(lowerTagName)) {
      return match
    }
    return ''
  })

  // 移除过多的空白字符
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n')
  sanitized = sanitized.trim()

  return sanitized
}

/**
 * 处理Markdown文件
 */
export const processMarkdownFile = async (file: File): Promise<ProcessedMarkdownFile> => {
  // 验证文件
  const validation = validateMarkdownFile(file)

  if (!validation.isValid) {
    throw new Error(validation.errors.join('; '))
  }

  // 读取文件内容
  const content = await readMarkdownFile(file)

  // 清理内容
  const sanitizedContent = sanitizeMarkdownContent(content)

  // 创建元数据
  const metadata: MarkdownFileMetadata = {
    filename: file.name,
    size: file.size,
    lastModified: new Date(file.lastModified),
    characterCount: sanitizedContent.length
  }

  // 检查字符限制
  if (sanitizedContent.length > 5000) {
    validation.warnings.push(`内容字符数 (${sanitizedContent.length}) 超过建议的5000字符限制`)
  }

  if (sanitizedContent.length < 10) {
    validation.warnings.push('内容过短，建议至少包含10个字符')
  }

  return {
    content: sanitizedContent,
    metadata,
    validation
  }
}

/**
 * 检查Markdown文件扩展名
 */
export const isMarkdownFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase()
  return fileName.endsWith('.md') || fileName.endsWith('.markdown')
}