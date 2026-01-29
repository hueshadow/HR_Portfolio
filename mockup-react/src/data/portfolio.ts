import type { PortfolioItem } from '../types/portfolio'
import type { Project } from '../dataProvider'
import { hasPortfolioBeenSynced, getExistingProjects } from '../utils/portfolioSync'

// Initial portfolio data - can be expanded/modified through admin interface
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: 'image',
    title: '华为云费用中心',
    description: '面向企业财务/运维用户的费用与账单中心重构，统一多维度账单浏览、查询与对账链路，提升复杂费用问题的定位效率与可理解性。',
    image: '/assets/img/portfolio/1.jpg',
    thumb: '/assets/img/portfolio/华为云封面图.png',
    embedUrl: 'https://enchanted-durian-d95.notion.site/ebd//2372d787465b80409eb6ddf3db67908c',
    embedPreviewImage: '/assets/img/portfolio/1.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'CSS3'],
    projectDate: '2023-01-15',
    featured: true,
    projectUrl: 'https://cloud-billing.netlify.app/',
    githubUrl: 'https://support.huaweicloud.com/usermanual-billing/bills-topic_new_1000101.html',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    category: 'image',
    title: '华为分析',
    description: '企业级数据分析平台设计系统，为企业级数据分析平台构建统一设计系统，覆盖组件库与数据可视化规范，支撑多业务快速搭建一致、可扩展的分析界面与图表表达。',
    image: '/assets/img/portfolio/data_analytics_landing_page_v2.png',
    thumb: '/assets/img/portfolio/data_analytics_landing_page_v2.png',
    technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    projectDate: '2019-02-20',
    featured: true,
    projectUrl: 'http://localhost:5174',
    githubUrl: 'https://developer.huawei.com/consumer/cn/doc/HMSCore-Guides/introduction-0000001050745149',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 3,
    category: 'image',
    title: '火柴盒',
    description: '年轻人社交内容平台，以"每日一首歌/一句语录/一篇文章"为内容引擎的轻社交产品，围绕分享、互动与话题沉淀打造增长飞轮，强调内容供给稳定性与社交扩散。',
    image: '/assets/img/portfolio/3_s.jpg',
    thumb: '/assets/img/portfolio/3_s.jpg',
    technologies: ['iOS', 'Android', 'UI/UX Design', 'Social Network', 'Content Platform'],
    projectDate: '2014-03-10',
    featured: false,
    projectUrl: 'https://pitchhub.36kr.com/project/2317012556007685',
    githubUrl: 'https://cheapbox.netlify.app/',
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-12-03T00:00:00Z'
  },
  {
    id: 4,
    category: '3d',
    title: '海外商家入驻平台',
    description: '负责海外商家入驻全流程体验设计，打通资料提交、审核状态、信息管理与异常校验，降低入驻门槛并提升提交成功率与可追踪性。',
    image: '/assets/img/portfolio/4.jpg',
    thumb: '/assets/img/portfolio/4_s.jpg',
    technologies: ['Blender', 'Three.js', 'WebGL'],
    projectDate: '2020-04-05',
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
    description: 'AI 驱动的美甲设计与虚拟试戴平台，提供 24K+ 设计灵感与智能检索推荐，结合虚拟试戴帮助用户快速决策款式与搭配，面向内容增长与转化链路做结构化优化。',
    image: '/assets/img/portfolio/nail 封面图.png',
    thumb: '/assets/img/portfolio/nail 封面图.png',
    technologies: ['AI/ML', 'React', 'Computer Vision', 'Cloud Computing', 'AR Technology'],
    projectDate: '2025-11-15',
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
    description: '每日智慧语录平台，精选励志名言，支持多分类浏览和社交分享。',
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
    description: '生态数据监控与多源数据集成平台，构建生态系统数据监控面板，支持实时指标可视化与多源数据整合，提供异常洞察、趋势追踪与可下钻分析，服务运营/管理决策。',
    image: '/assets/img/portfolio/10.jpg',
    thumb: '/assets/img/portfolio/10.jpg',
    technologies: ['React', 'TypeScript', 'Data Visualization', 'Dashboard'],
    projectDate: '2023-01-10',
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
    description: '铁路运行监控与预测性维护系统，面向运维与调度场景的监控平台，提供实时列车追踪、健康状态与性能分析，支持预测性维护与告警处置，提高问题发现与响应效率。',
    image: '/assets/img/portfolio/11.jpg',
    thumb: '/assets/img/portfolio/11.jpg',
    technologies: ['React', 'TypeScript', 'IoT', 'Real-time Monitoring', 'Data Analytics'],
    projectDate: '2026-01-15',
    featured: true,
    projectUrl: 'https://railpulse.netlify.app',
    githubUrl: '',
    externalOnly: true,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-19T00:00:00Z'
  },
  {
    id: 13,
    category: 'image',
    title: '一拍机合',
    description: '专业摄影器械租赁平台，面向摄影师与商家的器材租赁平台，支持在线预订、档期管理与履约流程，优化高频查询、比价与下单路径，提升转化效率。',
    image: '/assets/img/portfolio/一拍机合.jpg',
    thumb: '/assets/img/portfolio/一拍机合.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Image Processing', 'Payment Gateway'],
    projectDate: '2016-07-15',
    featured: true,
    projectUrl: '',
    githubUrl: '',
    createdAt: '2025-01-23T00:00:00Z',
    updatedAt: '2025-01-23T00:00:00Z'
  },
  {
    id: 14,
    category: 'image',
    title: 'Business Connect 商家地图端',
    description: '为商家提供地图定位、门店展示与到店/曝光数据分析能力，强化信息可信呈现与关键动作引导，帮助商家持续优化线上曝光与线下转化。',
    image: '/assets/img/portfolio/Business Connect 地图商家入口.png',
    thumb: '/assets/img/portfolio/Business Connect 地图商家入口.png',
    technologies: ['React', 'TypeScript', 'Map APIs', 'Data Visualization', 'REST API'],
    projectDate: '2020-08-20',
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
    description: '海外电商折扣聚合与比价平台，实时聚合多渠道优惠与价格变动信息，帮助用户快速找到最优折扣与购买路径；核心在于信息可信、价格对比清晰与下单决策加速。',
    image: '/assets/img/portfolio/ECP.jpg',
    thumb: '/assets/img/portfolio/ECP.jpg',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Cloud Computing'],
    projectDate: '2017-09-10',
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
    description: '智能家居控制与场景联动平台，覆盖设备控制、场景自动化与能耗管理，围绕家庭多成员、多设备、多网络状态的复杂约束，提升控制可预期性与跨设备一致体验。',
    image: '/assets/img/portfolio/LekaHome.jpg',
    thumb: '/assets/img/portfolio/LekaHome.jpg',
    technologies: ['React', 'IoT', 'Node.js', 'MQTT', 'Smart Home'],
    projectDate: '2018-10-05',
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
    description: '多链资产管理与 DeFi 集成钱包，去中心化钱包体验设计，覆盖多链资产管理、代币交换与 DeFi 入口，强调安全边界、交易确认可理解性与关键风险提示。',
    image: '/assets/img/portfolio/web3-vault-wallet.png',
    thumb: '/assets/img/portfolio/web3-vault-wallet.png',
    technologies: ['React', 'TypeScript', 'Web3.js', 'DeFi', 'Blockchain', 'WalletConnect'],
    projectDate: '2026-01-26',
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