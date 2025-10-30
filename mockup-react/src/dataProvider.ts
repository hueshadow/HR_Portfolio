import type { DataProvider } from 'react-admin'
import { convertFileToBase64 } from './utils/fileUtils'

// 项目类型定义
export interface Project {
  id?: string
  title: string
  description: string
  category: string
  date: string
  featured: boolean
  projectUrl?: string
  githubUrl?: string
  image?: string
  thumb?: string
  video?: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

const localStorageDataProvider: DataProvider = {
  // 获取资源列表
  getList: async (resource, params) => {
    const { pagination = { page: 1, perPage: 10 }, sort = { field: 'id', order: 'ASC' }, filter = {} } = params
    const { page, perPage } = pagination
    const { field, order } = sort

    // 从 localStorage 获取数据
    const data = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')

    // 过滤
    let filteredData = data
    if (filter.q) {
      const searchLower = filter.q.toLowerCase()
      filteredData = filteredData.filter((item: Project) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    }
    if (filter.category) {
      filteredData = filteredData.filter((item: Project) => item.category === filter.category)
    }

    // 排序
    if (field) {
      const orderMultiplier = order === 'ASC' ? 1 : -1
      filteredData.sort((a: any, b: any) => {
        if (a[field] < b[field]) return -1 * orderMultiplier
        if (a[field] > b[field]) return 1 * orderMultiplier
        return 0
      })
    }

    // 分页
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedData = filteredData.slice(start, end)

    return Promise.resolve({
      data: paginatedData,
      total: filteredData.length
    })
  },

  // 获取单个资源
  getOne: async (resource, params) => {
    const data = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')
    const record = data.find((item: Project) => item.id === params.id)

    if (!record) {
      return Promise.reject(new Error('记录未找到'))
    }

    return Promise.resolve({
      data: record
    })
  },

  // 获取多个资源
  getMany: async (resource, params) => {
    const data = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')
    const records = data.filter((item: Project) => params.ids?.includes(item.id!))

    return Promise.resolve({
      data: records
    })
  },

  // 获取多个资源的引用
  getManyReference: async (resource, params) => {
    const {
      pagination: { page = 1, perPage = 10 },
      sort: { field = 'id', order = 'ASC' } = {},
      filter = {},
      target,
      id
    } = params

    const data = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')

    // 过滤
    let filteredData = data.filter((item: any) => item[target] === id)

    // 应用额外的过滤器
    Object.keys(filter).forEach(key => {
      if (key !== target) {
        filteredData = filteredData.filter((item: any) => item[key] === filter[key])
      }
    })

    // 排序
    if (field) {
      const orderMultiplier = order === 'ASC' ? 1 : -1
      filteredData.sort((a: any, b: any) => {
        if (a[field] < b[field]) return -1 * orderMultiplier
        if (a[field] > b[field]) return 1 * orderMultiplier
        return 0
      })
    }

    // 分页
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedData = filteredData.slice(start, end)

    return Promise.resolve({
      data: paginatedData,
      total: filteredData.length
    })
  },

  // 更新资源
  update: async (resource, params) => {
    const { id, data } = params

    // 获取现有数据
    const storedData = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')

    // 处理文件上传
    const processedData = { ...data }

    // 处理图片文件
    if (data.image && data.image.rawFile) {
      const base64Image = await convertFileToBase64(data.image)
      processedData.image = base64Image
      delete processedData.image.rawFile
    }

    if (data.thumb && data.thumb.rawFile) {
      const base64Thumb = await convertFileToBase64(data.thumb)
      processedData.thumb = base64Thumb
      delete processedData.thumb.rawFile
    }

    // 处理视频文件
    if (data.video && data.video.rawFile) {
      const base64Video = await convertFileToBase64(data.video)
      processedData.video = base64Video
      delete processedData.video.rawFile
    }

    // 处理标签
    if (data.tags && typeof data.tags === 'string') {
      processedData.tags = data.tags.split(',').map((tag: string) => tag.trim())
    }

    // 更新时间戳
    processedData.updatedAt = new Date().toISOString()

    // 查找并更新记录
    const index = storedData.findIndex((item: Project) => item.id === id)
    if (index === -1) {
      return Promise.reject(new Error('记录未找到'))
    }

    storedData[index] = { ...storedData[index], ...processedData }

    // 保存到 localStorage
    localStorage.setItem(`${resource}Data`, JSON.stringify(storedData))

    return Promise.resolve({
      data: storedData[index]
    })
  },

  // 创建资源
  create: async (resource, params) => {
    const { data } = params

    // 处理文件上传
    const processedData = { ...data }

    // 处理图片文件
    if (data.image && data.image.rawFile) {
      const base64Image = await convertFileToBase64(data.image)
      processedData.image = base64Image
      delete processedData.image.rawFile
    }

    if (data.thumb && data.thumb.rawFile) {
      const base64Thumb = await convertFileToBase64(data.thumb)
      processedData.thumb = base64Thumb
      delete processedData.thumb.rawFile
    }

    // 处理视频文件
    if (data.video && data.video.rawFile) {
      const base64Video = await convertFileToBase64(data.video)
      processedData.video = base64Video
      delete processedData.video.rawFile
    }

    // 处理标签
    if (data.tags && typeof data.tags === 'string') {
      processedData.tags = data.tags.split(',').map((tag: string) => tag.trim())
    }

    // 生成 ID 和时间戳
    const newId = Date.now().toString()
    const now = new Date().toISOString()

    const newData = {
      id: newId,
      ...processedData,
      createdAt: now,
      updatedAt: now
    }

    // 获取现有数据并添加新记录
    const storedData = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')
    storedData.push(newData)

    // 保存到 localStorage
    localStorage.setItem(`${resource}Data`, JSON.stringify(storedData))

    return Promise.resolve({
      data: newData as any
    })
  },

  // 删除资源
  delete: async (resource, params) => {
    const { id } = params

    // 获取现有数据
    const storedData = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')

    // 查找并删除记录
    const index = storedData.findIndex((item: Project) => item.id === id)
    if (index === -1) {
      return Promise.reject(new Error('记录未找到'))
    }

    const deletedRecord = storedData[index]
    storedData.splice(index, 1)

    // 保存到 localStorage
    localStorage.setItem(`${resource}Data`, JSON.stringify(storedData))

    return Promise.resolve({
      data: deletedRecord as any
    })
  },

  // 更新多个资源
  updateMany: async (resource, params) => {
    const { ids, data } = params

    // 获取现有数据
    const storedData = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')

    // 更新记录
    const updatedData = storedData.map((item: Project) => {
      if (ids.includes(item.id!)) {
        return {
          ...item,
          ...data,
          updatedAt: new Date().toISOString()
        }
      }
      return item
    })

    // 保存到 localStorage
    localStorage.setItem(`${resource}Data`, JSON.stringify(updatedData))

    return Promise.resolve({
      data: ids
    })
  },

  // 删除多个资源
  deleteMany: async (resource, params) => {
    const { ids } = params

    // 获取现有数据
    const storedData = JSON.parse(localStorage.getItem(`${resource}Data`) || '[]')

    // 查找并删除记录
    const deletedRecords = storedData.filter((item: Project) => ids?.includes(item.id!))
    const remainingData = storedData.filter((item: Project) => !ids?.includes(item.id!))

    // 保存到 localStorage
    localStorage.setItem(`${resource}Data`, JSON.stringify(remainingData))

    return Promise.resolve({
      data: deletedRecords as any
    })
  }
}

export const dataProvider = localStorageDataProvider