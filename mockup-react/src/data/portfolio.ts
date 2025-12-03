import type { PortfolioItem } from '../types/portfolio'
import type { Project } from '../dataProvider'
import { hasPortfolioBeenSynced, getExistingProjects } from '../utils/portfolioSync'

// Initial portfolio data - can be expanded/modified through admin interface
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: 'image',
    title: '华为云',
    description: '华为云费用中心项目',
    image: '/assets/img/portfolio/1.jpg',
    thumb: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'CSS3'],
    projectDate: '2024-01-15',
    featured: true,
    projectUrl: 'https://hwcloud.netlify.app/?id=k8k70s&p=overview',
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
    description: `# 火柴盒 - 兴趣社交平台

## 项目简介

火柴盒是一款由南京极山文化传播有限公司开发的，以话题和兴趣为导向的陌生人社交产品。作为一款文艺青年的必备社交App，里面分享的歌、语录和文章质量都很高，还有一个隐藏的话题社区，在这里你可以找到志同道合的伙伴。

### 发展历程

- **2014年3月** - 火柴盒登录 App Store
- **2014年5月** - 在无刷榜无推广的情况下，进入App Store音乐类排行的第7名
- **2014年11月** - 火柴盒2.0版本上线，在上线不到24小时的时候产生近5000条UGC，平均每30秒产生一条新内容
- **累计下载** - 用户近百万，并拿到了200万的天使轮融资

### 融资历史

| 融资轮次 | 融资时间 | 融资金额 | 投资方 |
|---------|---------|---------|--------|
| Pre-A轮 | 2016-01 | 数千万人民币 | 未披露 |
| 天使轮 | 2014-11 | 200万人民币 | 未披露 |

## 产品截图

### 项目概览
![项目概览](/assets/img/portfolio/matchbox/1.jpg)

### 项目介绍
![项目介绍](/assets/img/portfolio/matchbox/2.jpg)

### 主要功能界面
![功能界面1](/assets/img/portfolio/matchbox/3.jpg)

![功能界面2](/assets/img/portfolio/matchbox/4.jpg)

### 用户体验设计
![设计界面1](/assets/img/portfolio/matchbox/5.jpg)

![设计界面2](/assets/img/portfolio/matchbox/6.jpg)

![设计界面3](/assets/img/portfolio/matchbox/7.jpg)

### 社区功能
![社区功能1](/assets/img/portfolio/matchbox/8.jpg)

![社区功能2](/assets/img/portfolio/matchbox/9.jpg)

### 内容分享
![内容分享1](/assets/img/portfolio/matchbox/10.jpg)

![内容分享2](/assets/img/portfolio/matchbox/11.jpg)`,
    image: '/assets/img/portfolio/3_s.jpg',
    thumb: '/assets/img/portfolio/3_s.jpg',
    technologies: ['iOS', 'Android', 'UI/UX Design', 'Social Network', 'Content Platform'],
    projectDate: '2024-03-10',
    featured: false,
    projectUrl: 'https://pitchhub.36kr.com/project/2317012556007685',
    githubUrl: 'https://github.com/example/matchbox-design',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 4,
    category: '3d',
    title: 'Business Connect',
    description: '产品的3D建模和渲染，支持360度查看和交互操作。',
    image: '/assets/img/portfolio/4.jpg',
    thumb: '/assets/img/portfolio/4_s.jpg',
    technologies: ['Blender', 'Three.js', 'WebGL'],
    projectDate: '2024-04-05',
    featured: true,
    projectUrl: 'https://dre.bizconnect.huawei.com/#/homepage',
    githubUrl: 'https://github.com/example/3d-product-model',
    createdAt: '2024-04-05T00:00:00Z',
    updatedAt: '2024-04-05T00:00:00Z'
  },
  {
    id: 5,
    category: 'image',
    title: 'Nail Designs',
    description: `# Nail Designs - AI-Powered Nail Art Studio

**Project Type**: AI-Powered SaaS Platform
**Role**: Full-Stack Product Development
**Launch Date**: 2024

## Overview

Nail Designs is an innovative AI-powered platform that revolutionizes the nail art industry by providing:
- 24K+ AI-generated nail design inspirations
- Virtual try-on technology for previewing designs
- Custom design generator with AI assistance
- 50+ distinct nail art styles
- 10K+ active users community

## Key Features

### AI Design Generation
Advanced AI algorithms create unique, personalized nail art designs based on user preferences, color palettes, and style inputs.

### Virtual Try-On
Revolutionary AR technology allows users to visualize nail designs on their own hands before committing to a salon visit.

### Extensive Design Library
Curated collection of 24,000+ professionally designed nail art patterns, regularly updated with trending styles.

### User-Friendly Tools
Intuitive interface for exploring, saving, and sharing favorite designs with integrated social features.

## Technology Stack

- AI/ML models for design generation
- Computer Vision for virtual try-on
- Real-time rendering engine
- Cloud-based image processing
- Responsive web application

## Impact

- 10,000+ active users
- 24,000+ unique designs generated
- 50+ nail art styles supported
- High user engagement and satisfaction rates

---

*Visit the live platform to explore thousands of AI-generated nail art designs.*`,
    image: '/assets/img/portfolio/5.jpg',
    thumb: '/assets/img/portfolio/5_s.jpg',
    technologies: ['AI/ML', 'React', 'Computer Vision', 'Cloud Computing', 'AR Technology'],
    projectDate: '2024-11-15',
    featured: true,
    projectUrl: 'https://www.nail-designs.ai/',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2024-11-15T00:00:00Z',
    updatedAt: '2024-12-02T00:00:00Z'
  },
  {
    id: 6,
    category: 'image',
    title: 'FridayQuote',
    description: `# FridayQuote - 每日智慧语录

**Project Type**: Daily Quote Platform
**Role**: Full-Stack Product Development
**Launch Date**: 2024

## Overview

FridayQuote is a beautifully designed daily inspiration platform that delivers wisdom and thoughtful quotes to users every day. The platform features:
- Curated collection of inspirational quotes
- Daily quote updates
- Multiple category support (comprehensive, learning, life, work)
- Beautiful gradient backgrounds
- Social sharing capabilities
- Dark mode support

## Key Features

### Daily Inspiration
Fresh, carefully selected quotes delivered daily to inspire and motivate users throughout their day.

### Multi-Category Support
Browse quotes across different themes:
- Comprehensive collection
- Learning and education
- Life wisdom
- Professional development

### Social Sharing
One-click sharing to:
- Twitter
- Weibo
- Copy to clipboard

### Beautiful Design
Clean, minimalist interface with gradient backgrounds that create an immersive reading experience.

## Technology Stack

- Modern web application
- Responsive design
- Social media integration
- Category-based quote organization
- Dark/Light mode toggle

## User Experience

- Keyboard shortcuts (Space/Enter for new quotes)
- Smooth animations and transitions
- Mobile-friendly responsive design
- Clean typography for optimal readability

---

*Explore wisdom and share inspiration every day with FridayQuote.*`,
    image: '/assets/img/portfolio/6.jpg',
    thumb: '/assets/img/portfolio/6_s.jpg',
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Responsive Design'],
    projectDate: '2024-10-01',
    featured: true,
    projectUrl: 'https://fridayquote.com/',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  }
]

class PortfolioManager {
  private items: PortfolioItem[] = [...initialPortfolioItems]
  private nextId: number = Math.max(...initialPortfolioItems.map(item => item.id)) + 1

  /**
   * Convert Project to PortfolioItem format
   */
  private projectToPortfolioItem(project: Project): PortfolioItem {
    return {
      id: parseInt(String(project.id || '0')),
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image || '',
      thumb: project.thumb || '',
      video: project.video || '',
      technologies: project.tags || [],
      projectDate: project.date,
      featured: project.featured || false,
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: project.updatedAt || new Date().toISOString()
    }
  }

  /**
   * Load data from admin system if synced, otherwise use original data
   */
  private loadFromDataSource(): PortfolioItem[] {
    if (typeof window !== 'undefined' && hasPortfolioBeenSynced()) {
      try {
        const adminProjects = getExistingProjects()
        if (adminProjects.length > 0) {
          return adminProjects.map(project => this.projectToPortfolioItem(project))
        }
      } catch (error) {
        console.error('Failed to load from admin system:', error)
      }
    }

    // Fallback to original data
    return [...this.items]
  }

  // Get all portfolio items
  getAll(): PortfolioItem[] {
    const data = this.loadFromDataSource()
    return [...data]
  }

  // Get item by ID
  getById(id: number): PortfolioItem | undefined {
    const data = this.loadFromDataSource()
    return data.find(item => item.id === id)
  }

  // Get items by category
  getByCategory(category: string): PortfolioItem[] {
    const data = this.loadFromDataSource()
    return data.filter(item => item.category === category)
  }

  // Get featured items
  getFeatured(): PortfolioItem[] {
    const data = this.loadFromDataSource()
    return data.filter(item => item.featured)
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
          this.nextId = Math.max(...parsed.map((item: { id: number }) => item.id), 0) + 1
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
        this.nextId = Math.max(...parsed.map((item: { id: number }) => item.id), 0) + 1
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