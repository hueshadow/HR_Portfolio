/**
 * 将文件转换为 Base64 字符串
 */
export const convertFileToBase64 = (file: any): Promise<string> => {
  if (!(file.rawFile instanceof File)) {
    return Promise.resolve(file.src || file)
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