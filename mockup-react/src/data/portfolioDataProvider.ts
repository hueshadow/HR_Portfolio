import { portfolioManager } from './portfolio'
import type { PortfolioItem } from '../types/portfolio'
import type { DataProvider } from 'react-admin'
import type { Identifier } from 'react-admin'

const dataProviderMethods = {
  getList: async (_resource: string, params: any) => {
    const { pagination, sort, filter } = params
    const { page = 1, perPage = 10 } = pagination || {}
    const { field = 'id', order = 'ASC' } = sort || {}

    // Get all items
    let items = portfolioManager.getAll()

    // Apply search filter
    if (filter?.q) {
      const query = filter.q.toLowerCase()
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.technologies.some(tech => tech.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (filter?.category) {
      items = items.filter(item => item.category === filter.category)
    }

    // Apply featured filter
    if (filter?.featured !== undefined) {
      items = items.filter(item => item.featured === filter.featured)
    }

    // Apply sorting
    if (field === 'id') {
      items.sort((a, b) => order === 'ASC' ? a.id - b.id : b.id - a.id)
    } else if (field === 'title') {
      items.sort((a, b) => order === 'ASC' ?
        a.title.localeCompare(b.title) :
        b.title.localeCompare(a.title)
      )
    } else if (field === 'projectDate') {
      items.sort((a, b) => order === 'ASC' ?
        new Date(a.projectDate).getTime() - new Date(b.projectDate).getTime() :
        new Date(b.projectDate).getTime() - new Date(a.projectDate).getTime()
      )
    } else if (field === 'createdAt') {
      items.sort((a, b) => order === 'ASC' ?
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() :
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }

    // Apply pagination
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedItems = items.slice(start, end)

    return {
      data: paginatedItems.map(item => ({ ...item })),
      total: items.length,
    }
  },

  getOne: async (_resource: string, params: any) => {
    const item = portfolioManager.getById(params.id as number)
    if (!item) {
      throw new Error('Item not found')
    }
    return { data: { ...item } }
  },

  getMany: async (_resource: string, params: any) => {
    const items = params.ids
      .map((id: any) => portfolioManager.getById(id as number))
      .filter(Boolean) as PortfolioItem[]
    return { data: items.map(item => ({ ...item })) }
  },

  getManyReference: async (_resource: string, params: any) => {
    const { pagination, sort } = params
    const { page = 1, perPage = 10 } = pagination || {}
    const { field = 'id', order = 'ASC' } = sort || {}

    // Get all items
    let items = portfolioManager.getAll()

    // Apply sorting
    if (field === 'id') {
      items.sort((a, b) => order === 'ASC' ? a.id - b.id : b.id - a.id)
    } else if (field === 'title') {
      items.sort((a, b) => order === 'ASC' ?
        a.title.localeCompare(b.title) :
        b.title.localeCompare(a.title)
      )
    }

    // Apply pagination
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedItems = items.slice(start, end)

    return {
      data: paginatedItems.map(item => ({ ...item })),
      total: items.length,
    }
  },

  create: async (_resource: string, params: any) => {
    const { data } = params
    const newItem = portfolioManager.create({
      category: data.category || 'image',
      title: data.title || '',
      description: data.description || '',
      technologies: data.technologies || [],
      projectDate: data.projectDate || new Date().toISOString().split('T')[0],
      projectUrl: data.projectUrl,
      githubUrl: data.githubUrl,
      featured: data.featured || false,
      image: data.image?.src || data.image || '/assets/img/portfolio/default.jpg',
      thumb: data.thumb?.src || data.thumb || '/assets/img/portfolio/default.jpg',
    })
    return { data: { ...newItem } }
  },

  update: async (_resource: string, params: any) => {
    const { id, data } = params
    const updatedItem = portfolioManager.update(id as number, {
      category: data.category,
      title: data.title,
      description: data.description,
      technologies: data.technologies,
      projectDate: data.projectDate,
      projectUrl: data.projectUrl,
      githubUrl: data.githubUrl,
      featured: data.featured,
      image: data.image?.src || data.image,
      thumb: data.thumb?.src || data.thumb,
    })
    if (!updatedItem) {
      throw new Error('Item not found')
    }
    return { data: { ...updatedItem } }
  },

  updateMany: async (_resource: string, params: any) => {
    const { ids, data } = params
    const updatedIds = ids
      .map((id: any) => {
        const success = portfolioManager.update(id as number, data)
        return success ? id : null
      })
      .filter(Boolean) as Identifier[]
    return { data: updatedIds }
  },

  delete: async (_resource: string, params: any) => {
    const { id } = params
    const success = portfolioManager.delete(id as number)
    if (!success) {
      throw new Error('Item not found')
    }
    return { data: { id } }
  },

  deleteMany: async (_resource: string, params: any) => {
    const { ids } = params
    const deletedIds = ids
      .map((id: any) => {
        const success = portfolioManager.delete(id as number)
        return success ? id : null
      })
      .filter(Boolean) as Identifier[]
    return { data: deletedIds }
  },
}

export const portfolioDataProvider = dataProviderMethods as unknown as DataProvider