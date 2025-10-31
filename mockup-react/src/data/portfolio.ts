import type { PortfolioItem } from '../types/portfolio'
import type { Project } from '../dataProvider'
import { hasPortfolioBeenSynced, getExistingProjects } from '../utils/portfolioSync'

// Initial portfolio data - can be expanded/modified through admin interface
const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    category: 'image',
    title: '华为云',
    description: '# Huawei Cloud 费用中心 · 多维度账单体验重构（2024重点项目）\n\n**角色**：UED 设计负责人（全流程：洞察、策略、视觉、交互、测试、落地）\n**周期**：2023.12 – 2025.03\n\n*• 本文仅用于求职作品展示，禁止商用转载*\n\n---\n\n## **KPI Highlights**\n\n| 💡 费用中心工单量 | 💡 账单导出平均耗时 | 💡 路径深度均值 |\n|------------------|---------------------|------------------|\n| **↓42%** | **2\'13\'\' → 46\'\'** | **4.2 → 1.8** |\n\n| 💡 功能采用率（30天留存58%） | 💡 成本侧影响（人工核对成本下降） | 💡 满意度 |\n|----------------------------|-------------------------------------|----------|\n| **↑3.4x** | csv频次**↑** | **SUS 62 → 78 | SEQ 4.1 → 5.6** |\n\n---\n\n## **用户声音**\n\n> *"我就想看一个最简单的总览，**为什么要让我先选一堆我看不懂的维度？**"\n> *"……我知道系统能看，但**我找不到在哪里改统计口径**，每次只能截屏问同事。*"\n> *"我们每月要对上百台资源账单进行成本核算，**以前筛维度特别难，导出来还要补手工字段**……"*\n\n---\n\n## **用户洞察**\n\n### 工单分析\n- **样本量**：14k，时间窗口：2023.01–2023.12，账单相关工单 2,357 条\n\n#### TOP5工单类型\n1. 账单页面复杂难懂\n2. 多为筛选功能不够灵活\n3. 费用中心功能逻辑混乱\n4. 计费规则不透明\n5. 缺少拆帐功能\n\n#### 工单类型分布数据\n| 占比 | 编码类目 |\n|------|----------|\n| 23% | 费用中心功能逻辑混乱 |\n| 17% | 账单页面复杂难懂 |\n| 16% | 多维筛选功能不够灵活 |\n| 33% | 计费规则不透明 |\n| 1% | 缺少拆帐功能 |\n\n### 埋点数据分析\n**目标**：量化对账流程的使用率、成功率、时长、阻断点，为优化导出体验、提高对账效率提供数据依据。\n\n**对账用户路径**：\n进入费用中心 → 选择账期 → 切到"账单概览" → 点击"导出账单" → 选择类型：月账单/明细/流水/账单包 → 提交导出任务 → 查看导出记录 → 下载文件 → 下载字段说明 → 跳转内部系统/离开\n\n### 用户访谈\n\n#### 🧑🏼‍💻 长尾用户\n反馈主要集中在账单界面复杂难懂、信息过载且不直观。他们希望账单能"傻瓜式"呈现消费概况。过去导出账单需等待且常失败，部分人因无法获取自己所有消费记录而不满。\n\n#### 👩🏼‍💼 腰部用户\n他们关注账单对账和成本控制功能。他们反馈旧版费用中心功能逻辑混乱：月账单、明细账单、资源用量等入口分散，按需与包年费用、代金券抵扣等要自行汇总核对，增加了财务对账工作量。不少团队用户过去要求**每日费用监控**功能，以便及时发现异常消耗。\n\n#### 🤵🏼‍♂️ 头部用户\n大客户群体关注账单的准确性、透明度以及与内部财务系统的对接。头部用户还要求**成本分摊**支持，将公共云资源费用按部门/项目分配。华为云随后推出"成本中心"，提供基于成本单元的费用分摊、成本分析和预算管理等，企业客户反馈这些工具有助于内部结算和成本治理。\n\n### 竞品分析\n**华为云、阿里云和AWS在对账功能上差异对比：**\n\n1. **华为云**：优势在于本地合规和清晰的账单结构，提供盖章账单和高精度明细，对政府及国企等严谨财务场景友好；多账号托管功能新兴却不完善。\n2. **阿里云**：对账体系最完善全面，从账单层级、合并结算到灵活开票均领先，适合大型集团精细化财务管理；其本地化服务和国际化结算并举，满足国内外业务需求。\n3. **AWS Cloud**：以全球化和高度定制化见长，账单数据详实适合深入分析，但对普通财务直接使用不够友好；在国内发票和本地支持上相对欠缺，但不断改进中（如推出发票单元功能）。\n\n### 可用改进思路\n\n#### 观察分析表格\n| 观察 | 影响 | 建议 |\n|------|------|------|\n| 主要 KPI 卡片 + 单选 tag 切换多账期视图 | 快速对比便捷 | tag 样式与筛选器区分度低，可用色块或 icon |\n| 折线统计默认拉满整月，**空值折线很突兀** | 视觉噪点/误判 | 空值灰化 or 用虚线占位 |\n| 右侧提醒/概览混堆，优先级模糊 | 信息杂糅 | 拆成「提醒」「快捷入口」分区，或顶部 toast 动态提示 |\n\n#### 改进方案\n1. **导航一致化 + 路径显性**\n   - 全局「对账」路由：Billing → Reconciliation，保持同一级深度\n\n2. **数据-动作聚合**\n   - 摆脱散落按钮 → 建立固定 **Action Bar**（时间过滤 + 导出 + 批量操作）\n   - 关键 KPI 卡与关联动作配对（如"应付金额"卡旁放「去支付」）\n\n3. **信息层级渐进披露（Progressive Disclosure）**\n   - 首页只保留关键指标 & 异常告警\n   - 二级页或折叠区承载 Top-N 产品 / 详细图表\n   - 高阶探索入口明显（"去 Cost Explorer 🔍"）\n\n---\n\n## **设计与评估**\n\n### 设计论点\n\n1. **可视化 = 信任**：费用本质是数字游戏，图形化能直击理解成本。\n2. **渐进披露** *(Progressive Disclosure)*：先给宏观，再给细节，减少认知负荷。\n3. **术语一致性**：同一概念只用一个名字，减少"翻译"成本。\n\n---\n\n## **结果与影响**\n\n| 指标 | 旧版 | 新版 | Δ |\n|------|------|------|---|\n| NPS | 48 | **66** | +18 |\n| 自助账单下载率 | 38% | **83%** | +45pp |\n| 平均任务时长 | 4\'20\'\' | **2\'05\'\'** | -52% |\n| 客服工单 (月) | 856 | **491** | -365 |\n\n**业务价值**：每月节省 ~3.8 人/天 客服成本；提升续费转化 ≈ 1.2M CNY/Q。\n\n---\n\n## **复盘与反思**\n\n> "体验不是改了就好，还得让数据证明。"\n\n### 失败案例\n首版使用折线图展示月度成本，用户更想看柱状累计 ➜ 第二版修正。\n\n### 遗留问题\n跨账号汇总仍依赖离线报表，计划与 Data Lake 打通。\n\n---\n\n> *"真正出色的体验，从来不是把信息塞进页面，而是把焦虑从脑海里拿走。"* — Ronn\n\n---\n\n*© 2025 Ronn · All rights reserved. 本文使用公开可查询资料与自研设计图示，涉及敏感数据已做脱敏处理。*',
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
      id: parseInt(project.id || '0'),
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