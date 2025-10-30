import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PortfolioFilter from './PortfolioFilter'
import ImagePreview from './ImagePreview'
import { usePortfolioCaptionAnimation } from '../hooks/useAnimations'
import { portfolioManager } from '../data/portfolio'

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

  const handleDetailClick = (itemId: number) => {
    navigate(`/portfolio/${itemId}`)
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
          /* 确保页面内容可以正常显示 */
          .info-section {
            width: 100%;
            box-sizing: border-box;
            display: block;
            position: relative;
          }
          .portfolio-item {
            position: relative;
            overflow: hidden;
            margin: 0;
            padding: 0;
            background: #000;
            cursor: pointer;
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
            background: rgba(0, 0, 0, 0.7);
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
            font-weight: 400;
            margin-bottom: 40px;
          }

          .portfolio-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
          }

          .portfolio-btn {
            background: transparent;
            color: white;
            padding: 8px 16px;
            border: 1px solid white;
            border-radius: 0;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 36px;
            position: relative;
            z-index: 10;
          }

          .portfolio-btn:hover {
            background: white;
            color: #333;
          }
        `}</style>
        <style>{`
          /* 960px以下响应式样式 */
          @media (max-width: 960px) {
            .portfolio-item {
              width: 100% !important;
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
        <div className="page-header c12">
          <h1 data-value="PROTECT">PROTECT</h1>
          <hr className={loaded ? 'enabled' : ''} />
          <PortfolioFilter items={filterItems} onFilterChange={handleFilterChange} />
        </div>

        
        <h2 className="h2-title" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '20px',
          paddingRight: '20px',
          fontFamily: "'Montserrat', sans-serif",
          textTransform: 'uppercase',
          fontWeight: 700,
          fontSize: '28px',
          letterSpacing: '-2px',
          marginBottom: '0',
          lineHeight: '1.8rem',
          display: 'none'
        }}>
          PICTURES
        </h2>

        <ul className="portfolio-container" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          {filteredItems.map(item => (
            <li key={item.id} data-groups={`["${item.category}"]`}>
              <figure className="portfolio-item">
                {(item.category === 'video' || item.thumb.toLowerCase().endsWith('.mp4') || item.thumb.toLowerCase().endsWith('.webm') || item.thumb.toLowerCase().endsWith('.ogg')) ? (
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
                          handleDetailClick(item.id)
                        }}
                      >
                        查看详情
                      </button>
                      <button
                        className="portfolio-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (item.projectUrl) {
                            handleProjectSourceClick(item.projectUrl)
                          } else if (item.githubUrl) {
                            handleProjectSourceClick(item.githubUrl)
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
                    </div>
                  </div>
                </div>
              </figure>
            </li>
          ))}
        </ul>

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
