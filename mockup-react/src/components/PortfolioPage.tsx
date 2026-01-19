import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PortfolioFilter from './PortfolioFilter'
import ImagePreview from './ImagePreview'
import { usePortfolioCaptionAnimation } from '../hooks/useAnimations'
import { portfolioManager } from '../data/portfolio'
import type { PortfolioItem } from '../types/portfolio'

interface PortfolioPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const PortfolioPage = ({ active, loaded }: PortfolioPageProps) => {
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState<typeof portfolioItems>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVideo, setPreviewVideo] = useState('')
  const [isVideoPreview, setIsVideoPreview] = useState(false)
  const { animateCaption } = usePortfolioCaptionAnimation()

  const [portfolioItems, setPortfolioItems] = useState(portfolioManager.getAll())

  const filterItems = [
    { id: 'all', label: 'All', target: '*' },
    { id: 'image', label: 'Image', target: 'image' },
    { id: 'video', label: 'Video', target: 'video' },
    { id: '3d', label: '3D', target: '3d' }
  ]

  useEffect(() => {
    setPortfolioItems(portfolioManager.getAll())
    setFilteredItems(portfolioManager.getAll())
  }, [])

  useEffect(() => {
    if (active && loaded) {
      // 延迟执行动画初始化，确保 DOM 已渲染
      setTimeout(() => {
        animateCaption()
      }, 100)
    }
  }, [active, loaded, animateCaption])

  const handleFilterChange = (filter: string) => {
    if (filter === '*') {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === filter))
    }
  }

  const handleDetailClick = (item: PortfolioItem) => {
    // If item is a video, open video preview directly
    if (item.category === 'video' && item.video) {
      setPreviewVideo(item.video)
      setIsVideoPreview(true)
      setPreviewOpen(true)
      return
    }

    // If project is marked as external-only, open in new tab
    if (item.externalOnly && item.projectUrl) {
      window.open(item.projectUrl, '_blank', 'noopener,noreferrer')
    } else {
      // Standard behavior: navigate to detail page
      navigate(`/portfolio/${item.id}`)
    }
  }

  const handleProjectSourceClick = (projectUrl: string) => {
    window.open(projectUrl, '_blank')
  }

  const closePreview = () => {
    setPreviewOpen(false)
    setPreviewImage('')
    setPreviewVideo('')
    setIsVideoPreview(false)
  }

  
  return (
    <>
        <style>{`
          /* 网格布局样式 */
          .portfolio-wrapper {
            padding: 20px;
          }

          .portfolio-container {
            position: relative;
            width: 100%;
          }

          .portfolio-container li {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .portfolio-item {
            position: relative;
            overflow: hidden;
            background: #fff;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .portfolio-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          }

          .portfolio-item img,
          .portfolio-item video {
            width: 100%;
            height: auto;
            display: block;
          }

          .portfolio-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            cursor: pointer;
            z-index: 5;
          }

          .portfolio-item:hover .portfolio-overlay {
            opacity: 1;
          }

          .portfolio-content {
            text-align: center;
            color: white;
            padding: 20px;
          }

          .portfolio-title {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
          }

          .portfolio-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .portfolio-btn {
            background: transparent;
            color: white;
            padding: 8px 16px;
            border: 1px solid white;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 400;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 10;
          }

          .portfolio-btn:hover {
            background: white;
            color: #333;
          }
        `}</style>
        <style>{`
          /* 网格布局 */
          .portfolio-container {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 30px !important;
            padding: 40px !important;
            width: 100% !important;
            max-width: 1600px !important;
            margin: 0 auto !important;
          }

          .portfolio-container li {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 100% !important;
          }

          /* 各项目大小 */
          .portfolio-container li[data-groups*="10"] { /* RailPulse */
            grid-column: span 2;
            grid-row: span 2;
          }

          .portfolio-container li[data-groups*="11"] { /* Ecosystem Dashboard */
            grid-column: span 2;
            grid-row: span 2;
          }

          .portfolio-container li[data-groups*="1"], /* 华为云 */
          .portfolio-container li[data-groups*="2"], /* 华为分析 */
          .portfolio-container li[data-groups*="3"], /* 火柴盒 */
          .portfolio-container li[data-groups*="4"], /* Business Connect */
          .portfolio-container li[data-groups*="5"], /* Nail Designs */
          .portfolio-container li[data-groups*="6"] { /* FridayQuote */
            grid-column: span 1;
            grid-row: span 1;
          }

          /* 视频项目隐藏 */
          .portfolio-container li[data-groups*="7"],
          .portfolio-container li[data-groups*="8"],
          .portfolio-container li[data-groups*="9"] {
            display: none;
          }

          /* 响应式网格 */
          @media (max-width: 1200px) {
            .portfolio-container {
              grid-template-columns: repeat(3, 1fr) !important;
            }
            .portfolio-container li[data-groups*="10"],
            .portfolio-container li[data-groups*="11"] {
              grid-column: span 2;
              grid-row: span 2;
            }
          }

          @media (max-width: 960px) {
            .portfolio-container {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
              padding: 20px !important;
            }
            .portfolio-container li[data-groups*="10"],
            .portfolio-container li[data-groups*="11"] {
              grid-column: span 2;
              grid-row: span 1;
            }
          }

          @media (max-width: 600px) {
            .portfolio-container {
              grid-template-columns: 1fr !important;
            }
            .portfolio-container li {
              grid-column: span 1 !important;
            }
          }
        `}</style>
        <style>{`
          .protect-image {
            text-align: center;
            height: 100%;
            display: flex;
            align-items: stretch;
            justify-content: center;
            margin: 0;
            padding: 0;
          }

          .protect-image img {
            width: 100%;
            max-width: 400px;
            height: 100%; /* 改为100%填充容器高度 */
            border-radius: 0;
            object-fit: contain; /* 保持图片比例 */
            margin: auto;
            padding: 0;
            display: block;
          }

          .protect-discribe {
            flex: 6 1 0%;
            color: rgb(85, 85, 85);
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* 使用space-between确保内容分布 */
          }

          .protect-discribe .protect-title {
            font-size: 24px;
            font-weight: 500;
            color: rgb(0, 0, 0);
            margin: 0;
            text-align: left;
            padding: 0;
            letter-spacing: -0.5px;
            line-height: 1.2;
            align-self: flex-start; /* 顶部对齐 */
            font-family: 'Montserrat', sans-serif;
            flex-shrink: 0; /* 防止标题压缩 */
          }

          .protect-discribe .year-text {
            font-size: 14px;
            color: rgb(0, 0, 0);
            text-align: left;
            align-self: flex-start; /* 底部对齐 */
            margin-top: auto; /* 使用auto margin推到容器底部 */
            flex-shrink: 0; /* 防止年份文本压缩 */
          }

          .protect-discribe p {
            font-size: 24px;
            line-height: 1.6;
            margin-bottom: 20px;
            display: none;
          }

          .protect-details {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            flex-shrink: 0;
            z-index: 10;
            position: relative;
          }

          .protect-details:hover {
            background-color: rgba(0, 0, 0, 0.1);
            transform: scale(1.1);
          }

          .protect-details i {
            font-size: 24px;
            color: rgb(0, 0, 0);
            margin: 0;
          }

          .protect-discribe .button-group {
            display: flex;
            gap: 15px;
            margin-top: 30px;
          }

          .protect-discribe .detail-btn,
          .protect-discribe .preview-btn {
            padding: 10px 24px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            border-radius: 0px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgb(0, 0, 0);
          }

          .protect-discribe .detail-btn {
            background: rgb(0, 0, 0);
            color: rgb(255, 255, 255);
          }

          .protect-discribe .preview-btn {
            background: transparent;
            color: rgb(0, 0, 0);
          }

          .h2-title {
            position: relative;
            text-align: left;
            margin-bottom: 0px;
            font-size: 32px;
            font-weight: 600;
            color: rgb(0, 0, 0);
            width: 100%;
            padding-bottom: 24px;
          }

          .h2-title::after {
            content: '';
            display: block;
            width: auto;
            height: 12px;
            margin-top: 0.2rem;
            border-bottom: 1px solid;
            border-color: inherit;
          }
        `}</style>
        <div className="page-header c12" style={{ paddingBottom: '40px' }}>
          <h1 data-value="PROTECT">PROTECT</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <div className="portfolio-wrapper">
          <ul className="portfolio-container">
          {filteredItems.map(item => (
            <li key={item.id} data-groups={`["${item.category}"]`}>
              <figure className="portfolio-item">
                {(item.thumb.toLowerCase().endsWith('.mp4') || item.thumb.toLowerCase().endsWith('.webm') || item.thumb.toLowerCase().endsWith('.ogg')) ? (
                  <video
                    src={item.thumb}
                    muted
                    loop
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    title={item.title}
                  />
                ) : (
                  <img src={item.thumb} alt={item.title} />
                )}
                <div className="portfolio-overlay">
                  <div className="portfolio-content">
                    <div className="portfolio-title">{item.title}</div>
                    <div className="portfolio-buttons">
                      <button
                        className="portfolio-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDetailClick(item)
                        }}
                      >
                        查看详情
                      </button>
                      {item.category !== 'video' && (
                        <button
                          className="portfolio-btn"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if (item.githubUrl) {
                              handleProjectSourceClick(item.githubUrl)
                            } else if (item.projectUrl) {
                              handleProjectSourceClick(item.projectUrl)
                            }
                          }}
                          disabled={!item.projectUrl && !item.githubUrl}
                          style={{
                            opacity: (item.projectUrl || item.githubUrl) ? 1 : 0.6,
                            cursor: (item.projectUrl || item.githubUrl) ? 'pointer' : 'not-allowed'
                          }}
                        >
                          项目来源
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </figure>
            </li>
          ))}
        </ul>
        </div>

      <ImagePreview
        isOpen={previewOpen}
        imageSrc={previewImage}
        videoSrc={previewVideo}
        isVideo={isVideoPreview}
        onClose={closePreview}
      />
    </>
  )
}

export default PortfolioPage
