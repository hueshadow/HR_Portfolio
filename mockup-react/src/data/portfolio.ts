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
    thumb: 'https://photosave.net/2026/01/baac8a58bb237ca7e07e9c4d9082025a.png',
    embedUrl: 'https://enchanted-durian-d95.notion.site/ebd//2372d787465b80409eb6ddf3db67908c',
    embedPreviewImage: '/assets/img/portfolio/1.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'CSS3'],
    projectDate: '2024-01-15',
    featured: true,
    projectUrl: 'https://hwcloud.netlify.app/',
    githubUrl: 'https://support.huaweicloud.com/usermanual-billing/bills-topic_new_1000101.html',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    category: 'image',
    title: '华为分析',
    description: `# Huawei Analytics - Design System

**Project Type**: Enterprise Analytics Platform Design System
**Role**: Lead Designer & Frontend Developer
**Launch Date**: 2024

## Overview

华为分析 (Huawei Analytics) 设计系统是一套完整的企业级数据分析平台设计规范，包含丰富的 UI 组件、数据可视化图表和分析工具。该设计系统基于现代设计原则，提供一致的视觉语言和交互体验。

## Key Features

### Component Library
- **Form Components**: 输入框、按钮、开关、日历、多选框等原子化组件
- **Navigation**: 标签页、面包屑、分页、步骤指示器
- **Data Display**: 表格、列表、卡片、通知提醒
- **Feedback**: 加载状态、空状态、提示消息、对话框

### Data Visualization
- **Charts**: 折线图、面积图、柱状图、雷达图、饼图、组合图
- **Indicators**: 进度条、环形图、迷你图、仪表盘
- **Maps**: 热点地图、分布地图、区域统计图

### Layout System
- **Mosaic Grid**: 瀑布流布局系统，支持多种卡片尺寸
- **Dashboard**: 浮动仪表盘组件，可自由组合
- **Analytics Grid**: 分析型网格布局

### File Management
- **Drag & Drop**: 拖拽上传组件
- **Progress**: 上传进度指示
- **Preview**: 文件预览与缩略图

## Technology Stack

- React 19 with TypeScript
- recharts - 数据可视化库
- lucide-react - 图标库
- CSS Custom Properties - 主题系统
- Responsive Design - 响应式设计

## Design Principles

1. **一致性**: 所有组件遵循统一的设计语言
2. **可访问性**: 符合 WCAG 2.1 AA 级标准
3. **可扩展性**: 支持主题定制和组件扩展
4. **性能优化**: 注重首屏加载和渲染性能

## Interactive Demo

以下展示华为分析设计系统的核心组件和交互效果：`,
    image: 'https://photosave.net/2026/01/d9f9d120c466b80b2d687ca9ecd562f5.png',
    thumb: 'https://photosave.net/2026/01/d9f9d120c466b80b2d687ca9ecd562f5.png',
    technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    projectDate: '2024-02-20',
    featured: true,
    projectUrl: 'http://localhost:5174',
    githubUrl: 'https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/introduction-0000001050745149',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 3,
    category: 'image',
    title: '火柴盒项目',
    description: `![项目概览](/assets/img/portfolio/matchbox/1.jpg)

![项目介绍](/assets/img/portfolio/matchbox/2.jpg)

![功能界面1](/assets/img/portfolio/matchbox/3.jpg)

![功能界面2](/assets/img/portfolio/matchbox/4.jpg)

![设计界面1](/assets/img/portfolio/matchbox/5.jpg)

![设计界面2](/assets/img/portfolio/matchbox/6.jpg)

![设计界面3](/assets/img/portfolio/matchbox/7.jpg)

![社区功能1](/assets/img/portfolio/matchbox/8.jpg)

![社区功能2](/assets/img/portfolio/matchbox/9.jpg)

![内容分享](/assets/img/portfolio/matchbox/10.jpg)`,
    image: '/assets/img/portfolio/3_s.jpg',
    thumb: '/assets/img/portfolio/3_s.jpg',
    technologies: ['iOS', 'Android', 'UI/UX Design', 'Social Network', 'Content Platform'],
    projectDate: '2024-03-10',
    featured: false,
    projectUrl: 'https://pitchhub.36kr.com/project/2317012556007685',
    githubUrl: 'https://cheapbox.netlify.app/',
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
    projectUrl: 'https://business-connect.netlify.app/?id=940iaf&p=%E5%B7%B2%E8%AE%A4%E9%A2%86_userid%E4%B8%8D%E6%98%AF%E8%87%AA%E5%B7%B1&g=1&view=default',
    githubUrl: 'https://dre.bizconnect.huawei.com/#/homepage',
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
    image: 'https://photosave.net/2026/01/2a0ef25f860eb15e86eb1dfcb69035c2.png',
    thumb: 'https://photosave.net/2026/01/2a0ef25f860eb15e86eb1dfcb69035c2.png',
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
    updatedAt: '2025-12-03T13:50:00Z'
  },
  {
    id: 7,
    category: 'video',
    title: '华为分析 - 事件分析',
    description: '华为分析服务的事件分析和行为分析功能介绍，通过控制台操作指南演示如何使用事件分析功能进行数据分析。',
    image: '/assets/video/analytics/event-analysis.mp4',
    thumb: '/assets/img/portfolio/analytics-video-1.jpg',
    video: '/assets/video/analytics/event-analysis.mp4',
    technologies: ['Huawei Analytics', 'Event Analysis', 'Data Analysis'],
    projectDate: '2023-12-02',
    featured: false,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2023-12-02T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 8,
    category: 'video',
    title: '华为分析 - 用户分群',
    description: '华为分析服务的用户分群和人群洞察功能介绍，详细演示如何通过控制台进行用户分群操作和人群洞察分析。',
    image: '/assets/video/analytics/user-segmentation.mp4',
    thumb: '/assets/img/portfolio/analytics-video-2.jpg',
    video: '/assets/video/analytics/user-segmentation.mp4',
    technologies: ['Huawei Analytics', 'User Segmentation', 'Audience Insights'],
    projectDate: '2023-12-02',
    featured: false,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2023-12-02T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 9,
    category: 'video',
    title: '华为分析 - 自定义概览',
    description: '华为分析服务的自定义概览功能介绍，展示如何通过控制台操作自定义概览面板，实现个性化的数据展示。',
    image: '/assets/video/analytics/custom-overview.mp4',
    thumb: '/assets/img/portfolio/analytics-video-3.jpg',
    video: '/assets/video/analytics/custom-overview.mp4',
    technologies: ['Huawei Analytics', 'Custom Dashboard', 'Data Visualization'],
    projectDate: '2023-12-02',
    featured: false,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2023-12-02T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 10,
    category: 'image',
    title: 'Ecosystem Dashboard',
    description: `# Ecosystem Dashboard - 生态系统监控平台

**Project Type**: Data Visualization Dashboard
**Role**: Full-Stack Development
**Launch Date**: 2025

## Overview

Ecosystem Dashboard 是一个专业的生态系统数据监控和分析平台，提供实时的环境数据可视化功能。

## Key Features

- Real-time data monitoring
- Interactive charts and graphs
- Multi-source data integration
- Customizable dashboard layouts
- Alert and notification system

## Technology Stack

- React
- TypeScript
- D3.js / Chart.js
- Node.js
- PostgreSQL

---

*Visit the live platform: https://ecosystem-dashboard.netlify.app*`,
    image: '/assets/img/portfolio/10.jpg',
    thumb: '/assets/img/portfolio/10.jpg',
    technologies: ['React', 'TypeScript', 'Data Visualization', 'Dashboard'],
    projectDate: '2025-01-10',
    featured: true,
    projectUrl: 'https://ecosystem-dashboard.netlify.app',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-01-19T00:00:00Z'
  },
  {
    id: 11,
    category: 'image',
    title: 'RailPulse',
    description: `# RailPulse - 铁路监控系统

**Project Type**: Industrial IoT Monitoring System
**Role**: Full-Stack Development
**Launch Date**: 2025

## Overview

RailPulse 是一个专业的铁路监控和数据分析平台，为铁路运营提供实时的监控和预警功能。

## Key Features

- Real-time train tracking
- Predictive maintenance alerts
- Performance analytics
- Route optimization
- Safety monitoring systems

## Technology Stack

- React
- TypeScript
- WebSocket
- IoT Data Processing
- Machine Learning

---

*Visit the live platform: https://railpulse.netlify.app*`,
    image: '/assets/img/portfolio/11.jpg',
    thumb: '/assets/img/portfolio/11.jpg',
    technologies: ['React', 'TypeScript', 'IoT', 'Real-time Monitoring', 'Data Analytics'],
    projectDate: '2025-01-15',
    featured: true,
    projectUrl: 'https://railpulse.netlify.app',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-19T00:00:00Z'
  },
  {
    id: 12,
    category: 'image',
    title: '上海培佳双语',
    description: `# 上海培佳双语学校官网

**Project Type**: Educational Institution Website
**Role**: Frontend Development
**Launch Date**: 2024

## Overview

上海培佳双语学校官方网站，展示学校风貌、教育理念、课程设置等信息。

## Key Features

- School introduction and history
- Academic programs overview
- Campus news and announcements
- Contact information
- Responsive design for all devices

## Technology Stack

- HTML5 / CSS3
- JavaScript
- Responsive Design
- CMS Integration

---

*Visit: 上海培佳双语学校官网*`,
    image: '/assets/img/portfolio/上海培佳双语.jpg',
    thumb: '/assets/img/portfolio/上海培佳双语.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'CMS'],
    projectDate: '2024-06-01',
    featured: false,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2025-01-23T00:00:00Z',
    updatedAt: '2025-01-23T00:00:00Z'
  },
  {
    id: 13,
    category: 'image',
    title: '一拍机合',
    description: `# 一拍机合 - 专业摄影服务平台

**Project Type**: Photography Service Platform
**Role**: Full-Stack Development
**Launch Date**: 2024

## Overview

一拍机合是一个专业的摄影服务平台，提供摄影师预约、作品展示、在线预订等功能。

## Key Features

- Photographer profiles and portfolios
- Online booking system
- Service package selection
- Gallery showcase
- Customer reviews and ratings

## Technology Stack

- React
- Node.js
- MongoDB
- Image Processing
- Payment Integration

---

*一拍机合 - 让摄影更简单*`,
    image: '/assets/img/portfolio/一拍机合@2x.jpg',
    thumb: '/assets/img/portfolio/一拍机合@2x.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Image Processing', 'Payment Gateway'],
    projectDate: '2024-07-15',
    featured: true,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2025-01-23T00:00:00Z',
    updatedAt: '2025-01-23T00:00:00Z'
  },
  {
    id: 14,
    category: 'image',
    title: 'Business Connect 商家入口',
    description: `# Business Connect - 地图商家入口

**Project Type**: Business Directory Platform
**Role**: Frontend Development
**Launch Date**: 2024

## Overview

Business Connect 商家入口平台，为商家提供地图定位、店铺展示、流量分析等服务。

## Key Features

- Business listing management
- Map-based location services
- Storefront customization
- Analytics dashboard
- Customer engagement tools

## Technology Stack

- React
- Map API Integration
- TypeScript
- Data Visualization
- RESTful API

---

*Business Connect - 连接商业价值*`,
    image: '/assets/img/portfolio/Business Connect 地图商家入口.png',
    thumb: '/assets/img/portfolio/Business Connect 地图商家入口.png',
    technologies: ['React', 'TypeScript', 'Map APIs', 'Data Visualization', 'REST API'],
    projectDate: '2024-08-20',
    featured: true,
    projectUrl: 'https://dre.bizconnect.huawei.com/#/homepage',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2025-01-23T00:00:00Z',
    updatedAt: '2025-01-24T00:00:00Z'
  },
  {
    id: 15,
    category: 'image',
    title: 'ECP',
    description: `# ECP - 企业众测平台

**Project Type**: Enterprise Crowdsourcing Platform
**Role**: Full-Stack Development
**Launch Date**: 2024

## Overview

华为云企业众测平台 (Enterprise Crowdsourcing Platform)，为企业提供产品测试、用户反馈收集等服务。

## Key Features

- Test project management
- Bug tracking system
- User feedback collection
- Analytics and reporting
- Team collaboration tools

## Technology Stack

- React
- TypeScript
- Node.js
- PostgreSQL
- Cloud Services

---

*ECP - 企业级质量保障平台*`,
    image: '/assets/img/portfolio/ECP.jpg',
    thumb: '/assets/img/portfolio/ECP.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Cloud Computing'],
    projectDate: '2024-09-10',
    featured: true,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2025-01-23T00:00:00Z',
    updatedAt: '2025-01-23T00:00:00Z'
  },
  {
    id: 16,
    category: 'image',
    title: 'LekaHome',
    description: `# LekaHome - 智能家居平台

**Project Type**: IoT Smart Home Platform
**Role**: Full-Stack Development
**Launch Date**: 2024

## Overview

LekaHome 智能家居平台，提供设备控制、场景联动、能耗管理等功能，打造智慧生活体验。

## Key Features

- Device control and management
- Scene automation
- Energy monitoring
- Security system integration
- Remote access

## Technology Stack

- React
- IoT Protocols
- Node.js
- MQTT
- Cloud Integration

---

*LekaHome - 智享生活*`,
    image: '/assets/img/portfolio/LekaHome.jpg',
    thumb: '/assets/img/portfolio/LekaHome.jpg',
    technologies: ['React', 'IoT', 'Node.js', 'MQTT', 'Smart Home'],
    projectDate: '2024-10-05',
    featured: true,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2025-01-23T00:00:00Z',
    updatedAt: '2025-01-23T00:00:00Z'
  },
  {
    id: 17,
    category: 'image',
    title: 'Web3 Vault Wallet',
    description: `# Web3 Vault Wallet - Decentralized Wallet Platform

**Project Type**: Web3 DeFi Platform
**Role**: Full-Stack Development
**Launch Date**: 2025

## Overview

Web3 Vault Wallet is a secure decentralized wallet platform for managing crypto assets and interacting with Web3 applications. Features include wallet creation, token swaps, staking, and DeFi integration.

## Key Features

- Multi-chain wallet support (Ethereum, BSC, Polygon, etc.)
- Secure seed phrase backup
- Token swap and exchange
- Staking and yield farming
- NFT viewing and management
- DApp browser integration
- Gas fee optimization
- Transaction history and analytics

## Technology Stack

- React / Next.js
- TypeScript
- Web3.js / Ethers.js
- WalletConnect
- IPFS for decentralized storage
- Zero-knowledge proofs for privacy

## Security Features

- Hardware wallet integration
- Multi-signature support
- Phishing protection
- Transaction preview and approval
- Rate limiting and anomaly detection

---

*Secure your digital assets with Web3 Vault Wallet*`,
    image: '/assets/img/portfolio/web3-vault-wallet.png',
    thumb: '/assets/img/portfolio/web3-vault-wallet.png',
    technologies: ['React', 'TypeScript', 'Web3.js', 'DeFi', 'Blockchain', 'WalletConnect'],
    projectDate: '2025-01-26',
    featured: true,
    projectUrl: 'https://web3-vault-wallet.netlify.app/',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2025-01-26T00:00:00Z',
    updatedAt: '2025-01-26T00:00:00Z'
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