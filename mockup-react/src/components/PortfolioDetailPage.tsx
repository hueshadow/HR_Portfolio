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

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      category: 'image',
      title: '华为云',
      image: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg',
      thumb: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg',
      description: '华为云官网设计项目，专注于云计算服务的用户体验设计。通过现代化的设计语言和直观的交互界面，为企业用户提供清晰的云服务导航和产品展示。项目涵盖了从信息架构到视觉设计的完整流程。',
      technologies: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
      projectDate: '2024年3月',
      projectUrl: 'https://hwcloud.netlify.app/'
    },
    {
      id: 2,
      category: 'image',
      title: '华为分析',
      image: 'https://photosave.net/2025/09/c40993e5c628645f2b35bee5d57f7bf2.jpg',
      thumb: 'https://photosave.net/2025/09/c40993e5c628645f2b35bee5d57f7bf2.jpg',
      description: '华为数据分析平台的界面设计，为企业提供数据可视化和商业智能解决方案。设计重点在于复杂数据的清晰呈现和高效的用户操作流程，确保用户能够快速获取关键业务洞察。',
      technologies: ['Data Visualization', 'Dashboard Design', 'Sketch', 'User Testing'],
      projectDate: '2024年1月',
      projectUrl: 'https://analytics-kit.netlify.app/',
    },
    {
      id: 3,
      category: 'image',
      title: '火柴盒',
      image: 'https://photosave.net/2025/09/f1ba8c79cb2be8df787d2654524aa52c.jpg',
      thumb: 'https://photosave.net/2025/09/f1ba8c79cb2be8df787d2654524aa52c.jpg',
      description: '火柴盒创意设计项目，探索传统物品的现代化设计理念。通过简约而富有创意的视觉表达，重新诠释日常用品的美学价值，体现设计在生活中的无限可能。',
      technologies: ['Creative Design', 'Adobe Creative Suite', 'Concept Development'],
      projectDate: '2023年11月',
      projectUrl: 'https://cheapbox.netlify.app/',
    },
    {
      id: 4,
      category: 'image',
      title: 'Business Connect',
      image: 'https://photosave.net/2025/09/84a321e2c0c7ceed0367af973157e24b.jpg',
      thumb: 'https://photosave.net/2025/09/84a321e2c0c7ceed0367af973157e24b.jpg',
      description: 'Business Connect 是一个企业级协作平台的设计项目，旨在提升团队沟通效率和项目管理能力。设计注重用户体验的连贯性和功能的易用性，为现代企业提供全方位的数字化解决方案。',
      technologies: ['Enterprise UX', 'Collaboration Tools', 'Wireframing', 'Usability Testing'],
      projectDate: '2023年9月',
      projectUrl: 'https://www.huaweicloud.com',
      githubUrl: 'https://github.com/example/business-connect'
    },
    {
      id: 5,
      category: 'video',
      title: 'Project Video 1',
      image: 'https://photosave.net/2025/09/56928471b46698ae95c0e94a9b93264b.mp4',
      thumb: 'https://photosave.net/2025/09/56928471b46698ae95c0e94a9b93264b.mp4',
      description: '品牌宣传视频制作项目，通过动态视觉和创意叙事展示品牌价值。项目涵盖了从概念策划到后期制作的完整视频制作流程，为客户打造具有影响力的视觉内容。',
      technologies: ['Video Production', 'Motion Graphics', 'After Effects', 'Premiere Pro'],
      projectDate: '2023年8月',
      projectUrl: 'https://www.huaweicloud.com',
    },
    {
      id: 6,
      category: 'video',
      title: 'Project Video 2',
      image: 'https://photosave.net/2025/09/508f16cfbbce1e7be93cf7bdc8fffbe9.mp4',
      thumb: 'https://photosave.net/2025/09/508f16cfbbce1e7be93cf7bdc8fffbe9.mp4',
      description: '产品演示视频设计，专注于清晰地展示产品功能和用户操作流程。通过精心设计的动画效果和流畅的镜头语言，帮助用户快速理解产品价值和使用方法。',
      technologies: ['Product Demo', 'Animation', 'Storytelling', 'Video Editing'],
      projectDate: '2023年7月',
      projectUrl: 'https://www.huaweicloud.com',
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
      <div className="portfolio-detail-wrapper">
        <div className="page-header c12">
          <h1 data-value="PROJECT DETAIL">PROJECT DETAIL</h1>
          <hr />
        </div>
        <div className="portfolio-detail-content">
          <h1>作品未找到</h1>
          <p>抱歉，您要查看的作品不存在。</p>
          <a href="#" onClick={(e) => { e.preventDefault(); handleBackToPortfolio() }} className="text-link">
            ← 返回作品集
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-detail-wrapper">
      <div className="page-header c12">
        <div className="header-with-back">
          <div className="header-back">
            <button onClick={handleBackToPortfolio} className="back-button">
              ← 返回
            </button>
          </div>
          <div className="header-title">
            <h1 data-value="PROJECT DETAIL">PROJECT DETAIL</h1>
          </div>
        </div>
        <hr />
      </div>

      <div className="portfolio-detail-content">
        <div className="portfolio-detail-image">
          <img src={item.image} alt={item.title} />
        </div>

        <div className="portfolio-detail-info">
          <h1 className="portfolio-detail-title">{item.title}</h1>

          <div className="portfolio-detail-meta">
            <span className="meta-item">{item.category}</span>
            <span className="meta-item">{item.projectDate}</span>
          </div>

          <div className="portfolio-detail-description">
            <h3>项目描述</h3>
            <p>{item.description}</p>
            {(item.projectUrl || item.githubUrl) && (
              <div className="link-buttons">
                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    <i className="fas fa-external-link-alt"></i> 查看项目
                  </a>
                )}
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    <i className="fab fa-github"></i> GitHub
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="portfolio-detail-technologies">
            <div className="tech-tags">
              {item.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .portfolio-detail-wrapper {
          width: 100%;
          min-height: 100vh;
          background: #fff;
          padding-top: 80px;
        }

        .page-header.c12 {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .header-with-back {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .header-back {
          flex-shrink: 0;
          margin-right: 12px;
        }

        .header-title {
          flex-grow: 1;
        }

        .header-title h1 {
          margin: 0;
        }

        .back-button {
          margin-top: 0;
          min-width: 120px;
        }

        .portfolio-detail-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        .portfolio-detail-image {
          width: 100%;
        }

        .portfolio-detail-image img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .portfolio-detail-info {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .portfolio-detail-title {
          font-size: 36px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .portfolio-detail-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
        }

        .meta-item {
          color: #666;
          font-size: 14px;
        }

        .portfolio-detail-description h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
        }

        .portfolio-detail-description p {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin: 0;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-tag {
          background: rgba(0,0,0,0.05);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          color: #555;
        }

        .link-buttons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .portfolio-detail-description .link-button {
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
          padding: 0 !important;
          background: transparent !important;
          color: #0066cc !important;
          text-decoration: none !important;
          border: none !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          cursor: pointer !important;
          outline: none !important;
          box-shadow: none !important;
          transition: none !important;
          opacity: 1 !important;
        }

        .portfolio-detail-description .link-button:hover,
        .portfolio-detail-description .link-button:focus,
        .portfolio-detail-description .link-button:active {
          background: transparent !important;
          color: #555 !important;
          text-decoration: none !important;
          outline: none !important;
          box-shadow: none !important;
          transform: none !important;
          opacity: 1 !important;
        }

        .header-back .back-button {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          color: #0066cc !important;
          border: none !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          cursor: pointer !important;
          text-decoration: none !important;
          display: inline-block !important;
          outline: none !important;
          box-shadow: none !important;
          transition: none !important;
          opacity: 1 !important;
        }

        .header-back .back-button:hover,
        .header-back .back-button:focus,
        .header-back .back-button:active {
          background: transparent !important;
          color: #0052cc !important;
          text-decoration: none !important;
          outline: none !important;
          box-shadow: none !important;
          transform: none !important;
          opacity: 1 !important;
        }

        
        .text-link {
          color: #0066cc;
          text-decoration: none;
          font-size: 16px;
          margin-top: 20px;
          display: inline-block;
        }

        .text-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 968px) {
          .portfolio-detail-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 480px) {
          .portfolio-detail-content {
            padding: 20px 15px;
          }

          .portfolio-detail-title {
            font-size: 28px;
          }

          .link-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default PortfolioDetailPage