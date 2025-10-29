import type { PortfolioItem } from '../types/portfolio'

// Initial portfolio data - can be expanded/modified through admin interface
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: 'image',
    title: '华为云',
    description: '华为云平台的设计与开发，包括用户界面优化、用户体验提升和性能优化。',
    image: '/assets/img/portfolio/1.jpg',
    thumb: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'CSS3'],
    projectDate: '2024-01-15',
    featured: true,
    projectUrl: 'https://account.huaweicloud.com/usercenter/?locale=zh-cn&agencyId=a7e5b38327a7403eb21839f01cb9cd86&region=cn-north-4#/userindex/consumeTab',
    githubUrl: 'https://github.com/huawei-cloud',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    category: 'image',
    title: '华为分析',
    description: '数据分析平台的可视化界面，提供实时数据监控和分析功能。',
    image: '/assets/img/portfolio/2.jpg',
    thumb: 'https://photosave.net/2025/09/c40993e5c628645f2b35bee5d57f7bf2.jpg',
    technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    projectDate: '2024-02-20',
    featured: true,
    projectUrl: 'https://developer.huawei.com/consumer/cn/hms/huawei-analyticskit/',
    githubUrl: 'https://github.com/HMS-Core',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-02-20T00:00:00Z'
  },
  {
    id: 3,
    category: 'image',
    title: '火柴盒项目',
    description: '火柴盒创意设计项目，融合实用性与艺术美感的独特产品设计。',
    image: '/assets/img/portfolio/3_s.jpg',
    thumb: '/assets/img/portfolio/3_s.jpg',
    technologies: ['Photoshop', 'Illustrator', 'Figma', 'Sketch'],
    projectDate: '2024-03-10',
    featured: false,
    projectUrl: 'https://cheapbox.netlify.app/',
    githubUrl: 'https://github.com/example/matchbox-design',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z'
  },
  {
    id: 4,
    category: '3d',
    title: '3D产品模型',
    description: '产品的3D建模和渲染，支持360度查看和交互操作。',
    image: '/assets/img/portfolio/4.jpg',
    thumb: '/assets/img/portfolio/4_s.jpg',
    technologies: ['Blender', 'Three.js', 'WebGL'],
    projectDate: '2024-04-05',
    featured: true,
    projectUrl: 'https://sketchfab.com/models/3d-product-showcase',
    githubUrl: 'https://github.com/example/3d-product-model',
    createdAt: '2024-04-05T00:00:00Z',
    updatedAt: '2024-04-05T00:00:00Z'
  }
]

class PortfolioManager {
  private items: PortfolioItem[] = [...initialPortfolioItems]
  private nextId: number = Math.max(...initialPortfolioItems.map(item => item.id)) + 1

  // Get all portfolio items
  getAll(): PortfolioItem[] {
    return [...this.items]
  }

  // Get item by ID
  getById(id: number): PortfolioItem | undefined {
    return this.items.find(item => item.id === id)
  }

  // Get items by category
  getByCategory(category: string): PortfolioItem[] {
    return this.items.filter(item => item.category === category)
  }

  // Get featured items
  getFeatured(): PortfolioItem[] {
    return this.items.filter(item => item.featured)
  }

  // Create new portfolio item
  create(data: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>): PortfolioItem {
    const newItem: PortfolioItem = {
      ...data,
      id: this.nextId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.items.push(newItem)
    this.saveToLocalStorage()
    return newItem
  }

  // Update portfolio item
  update(id: number, data: Partial<Omit<PortfolioItem, 'id' | 'createdAt'>>): PortfolioItem | null {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) return null

    this.items[index] = {
      ...this.items[index],
      ...data,
      updatedAt: new Date().toISOString()
    }

    this.saveToLocalStorage()
    return this.items[index]
  }

  // Delete portfolio item
  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id)
    if (index === -1) return false

    this.items.splice(index, 1)
    this.saveToLocalStorage()
    return true
  }

  // Toggle featured status
  toggleFeatured(id: number): PortfolioItem | null {
    const item = this.getById(id)
    if (!item) return null

    return this.update(id, { featured: !item.featured })
  }

  // Save to localStorage for persistence
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioData', JSON.stringify(this.items))
    }
  }

  // Load from localStorage
  loadFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioData')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          this.items = parsed
          this.nextId = Math.max(...parsed.map((item: any) => item.id), 0) + 1
        } catch (error) {
          console.error('Failed to load portfolio data from localStorage:', error)
        }
      }
    }
  }

  // Export data as JSON
  exportData(): string {
    return JSON.stringify(this.items, null, 2)
  }

  // Import data from JSON
  importData(jsonData: string): boolean {
    try {
      const parsed = JSON.parse(jsonData)
      if (Array.isArray(parsed)) {
        this.items = parsed
        this.nextId = Math.max(...parsed.map((item: any) => item.id), 0) + 1
        this.saveToLocalStorage()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to import portfolio data:', error)
      return false
    }
  }
}

// Export singleton instance
export const portfolioManager = new PortfolioManager()

// Initialize with localStorage data if available
if (typeof window !== 'undefined') {
  portfolioManager.loadFromLocalStorage()
}