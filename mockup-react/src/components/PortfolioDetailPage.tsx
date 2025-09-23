import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface PortfolioItem {
  id: number
  category: string
  title: string
  image: string
  thumb: string
  description: string
  technologies: string[]
  projectDate: string
  projectUrl?: string
  githubUrl?: string
}

interface PortfolioDetailPageProps {
  onPageChange: (pageId: string) => void
}

const PortfolioDetailPage = ({ onPageChange }: PortfolioDetailPageProps) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [item, setItem] = useState<PortfolioItem | null>(null)

  // 扩展的作品集数据，包含详细信息
  const portfolioItems: PortfolioItem[] = [
    { 
      id: 1, 
      category: 'image', 
      title: '华为云', 
      image: '/assets/img/portfolio/1.jpg', 
      thumb: '/assets/img/portfolio/1_s.jpg',
      description: '华为云官网设计项目，专注于云计算服务的用户体验设计。通过现代化的设计语言和直观的交互界面，为企业用户提供清晰的云服务导航和产品展示。项目涵盖了从信息架构到视觉设计的完整流程。',
      technologies: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
      projectDate: '2024年3月',
      projectUrl: 'https://www.huaweicloud.com'
    },
    { 
      id: 2, 
      category: 'image', 
      title: '华为分析', 
      image: '/assets/img/portfolio/2.jpg', 
      thumb: '/assets/img/portfolio/2_s.jpg',
      description: '华为数据分析平台的界面设计，为企业提供数据可视化和商业智能解决方案。设计重点在于复杂数据的清晰呈现和高效的用户操作流程，确保用户能够快速获取关键业务洞察。',
      technologies: ['Data Visualization', 'Dashboard Design', 'Sketch', 'User Testing'],
      projectDate: '2024年1月',
    },
    { 
      id: 3, 
      category: 'image', 
      title: '火柴盒', 
      image: '/assets/img/portfolio/3.jpg', 
      thumb: '/assets/img/portfolio/3_s.jpg',
      description: '火柴盒创意设计项目，探索传统物品的现代化设计理念。通过简约而富有创意的视觉表达，重新诠释日常用品的美学价值，体现设计在生活中的无限可能。',
      technologies: ['Creative Design', 'Adobe Creative Suite', 'Concept Development'],
      projectDate: '2023年11月',
    },
    { 
      id: 4, 
      category: 'image', 
      title: 'Business Connect', 
      image: '/assets/img/portfolio/4.jpg', 
      thumb: '/assets/img/portfolio/4_s.jpg',
      description: 'Business Connect 是一个企业级协作平台的设计项目，旨在提升团队沟通效率和项目管理能力。设计注重用户体验的连贯性和功能的易用性，为现代企业提供全方位的数字化解决方案。',
      technologies: ['Enterprise UX', 'Collaboration Tools', 'Wireframing', 'Usability Testing'],
      projectDate: '2023年9月',
      githubUrl: 'https://github.com/example/business-connect'
    },
    { 
      id: 5, 
      category: 'video', 
      title: 'Project Video 1', 
      image: '/assets/img/portfolio/5.jpg', 
      thumb: '/assets/img/portfolio/5_s.jpg',
      description: '品牌宣传视频制作项目，通过动态视觉和创意叙事展示品牌价值。项目涵盖了从概念策划到后期制作的完整视频制作流程，为客户打造具有影响力的视觉内容。',
      technologies: ['Video Production', 'Motion Graphics', 'After Effects', 'Premiere Pro'],
      projectDate: '2023年8月',
    },
    { 
      id: 6, 
      category: 'video', 
      title: 'Project Video 2', 
      image: '/assets/img/portfolio/6.jpg', 
      thumb: '/assets/img/portfolio/6_s.jpg',
      description: '产品演示视频设计，专注于清晰地展示产品功能和用户操作流程。通过精心设计的动画效果和流畅的镜头语言，帮助用户快速理解产品价值和使用方法。',
      technologies: ['Product Demo', 'Animation', 'Storytelling', 'Video Editing'],
      projectDate: '2023年7月',
    },
    { 
      id: 7, 
      category: '3d', 
      title: '3D Project 1', 
      image: '/assets/img/portfolio/7.jpg', 
      thumb: '/assets/img/portfolio/7_s.jpg',
      description: '3D 建模和渲染项目，探索三维空间中的设计可能性。通过先进的建模技术和逼真的渲染效果，创造出具有强烈视觉冲击力的三维作品，展现设计的空间美学。',
      technologies: ['3D Modeling', 'Blender', 'Cinema 4D', '3D Rendering'],
      projectDate: '2023年6月',
    },
    { 
      id: 8, 
      category: '3d', 
      title: '3D Project 2', 
      image: '/assets/img/portfolio/8.jpg', 
      thumb: '/assets/img/portfolio/8_s.jpg',
      description: '建筑可视化项目，为建筑设计提供逼真的三维展示效果。通过精确的建模和专业的渲染技术，帮助客户更好地理解和展示建筑设计方案，提升设计沟通效率。',
      technologies: ['Architectural Visualization', '3ds Max', 'V-Ray', 'Photoshop'],
      projectDate: '2023年5月',
    },
    { 
      id: 9, 
      category: 'image', 
      title: 'Additional Project', 
      image: '/assets/img/portfolio/9.jpg', 
      thumb: '/assets/img/portfolio/9_s.jpg',
      description: '综合性设计项目，整合多种设计元素和技术手段。项目展现了从平面设计到数字媒体的全方位设计能力，为客户提供一站式的创意解决方案。',
      technologies: ['Integrated Design', 'Multi-media', 'Creative Direction', 'Brand Identity'],
      projectDate: '2023年4月',
    }
  ]

  useEffect(() => {
    if (id) {
      const foundItem = portfolioItems.find(item => item.id === parseInt(id))
      setItem(foundItem || null)
    }
  }, [id])

  const handleBackToPortfolio = () => {
    navigate('/')
    onPageChange('portfolio')
  }

  if (!item) {
    return (
      <div className="portfolio-detail-container">
        <div className="detail-header">
          <button className="back-button" onClick={handleBackToPortfolio}>
            <i className="fas fa-arrow-left"></i> 返回作品集
          </button>
        </div>
        <div className="detail-content">
          <h1>作品未找到</h1>
          <p>抱歉，您要查看的作品不存在。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-detail-container">
      <div className="detail-header">
        <button className="back-button" onClick={handleBackToPortfolio}>
          <i className="fas fa-arrow-left"></i> 返回作品集
        </button>
        <div className="detail-meta">
          <span className="category-badge">{item.category}</span>
          <span className="project-date">{item.projectDate}</span>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-image">
          <img src={item.image} alt={item.title} />
        </div>
        
        <div className="detail-info">
          <h1 className="detail-title">{item.title}</h1>
          
          <div className="detail-description">
            <h3>项目描述</h3>
            <p>{item.description}</p>
          </div>

          <div className="detail-technologies">
            <h3>使用技术</h3>
            <div className="tech-tags">
              {item.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {(item.projectUrl || item.githubUrl) && (
            <div className="detail-links">
              <h3>相关链接</h3>
              <div className="link-buttons">
                {item.projectUrl && (
                  <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="link-button project-link">
                    <i className="fas fa-external-link-alt"></i> 查看项目
                  </a>
                )}
                {item.githubUrl && (
                  <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="link-button github-link">
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer>
        <div className="footer-inner clearfix">
          <div className="copyright">© 2025 Content update by Ronn Huang. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default PortfolioDetailPage
