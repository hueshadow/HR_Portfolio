import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ImagePreview from './ImagePreview'
import { usePortfolioCaptionAnimation } from '../hooks/useAnimations'
import { portfolioManager } from '../data/portfolio'
import type { PortfolioItem } from '../types/portfolio'

interface PortfolioPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const getDescriptionPreview = (description: string) => {
  return description
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const getSubtitle = (item: PortfolioItem) => {
  const desc = (item.description || '').trim()
  if (desc) return getDescriptionPreview(desc)

  const tech = (item.technologies || []).filter(Boolean).slice(0, 3)
  if (tech.length > 0) return tech.join(' · ')

  const cat = (item.category || '').trim()
  const date = (item.projectDate || '').trim()
  return [cat, date].filter(Boolean).join(' · ')
}

const PortfolioPage = ({ active, loaded }: PortfolioPageProps) => {
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVideo, setPreviewVideo] = useState('')
  const [isVideoPreview, setIsVideoPreview] = useState(false)
  const { animateCaption } = usePortfolioCaptionAnimation()

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(portfolioManager.getAll())

  // 项目排序（按指定位置）
  const sortOrder = [1, 2, 4, 3, 5, 17, 6, 10, 11, 12, 13, 14, 15, 16]

  // 过滤并排序的项目（排除视频项目 id=7,8,9）
  const sortedItems = filteredItems
    .filter(item => item.id !== 7 && item.id !== 8 && item.id !== 9)
    .sort((a, b) => {
      const indexA = sortOrder.indexOf(a.id)
      const indexB = sortOrder.indexOf(b.id)
      if (indexA === -1) return 1
      if (indexB === -1) return -1
      return indexA - indexB
    })

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

  const closePreview = () => {
    setPreviewOpen(false)
    setPreviewImage('')
    setPreviewVideo('')
    setIsVideoPreview(false)
  }

  
  return (
    <>
        <style>{`
          /* 网格布局 - 一行3张卡片，1:1比例 */
          .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            width: 100%;
            margin: 0;
            padding: 0;
          }

          .portfolio-grid li {
            list-style: none;
            margin: 0 !important;
            padding: 0 !important;
          }

          .portfolio-item {
            position: relative;
            overflow: hidden;
            background: #fff;
            cursor: pointer;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            border-radius: 14px;
            border: 1px solid rgba(0,0,0,0.06);
            box-shadow: 0 1px 2px rgba(0,0,0,0.06);
          }

          .portfolio-item:hover {
            transform: none;
          }

          .portfolio-item img,
          .portfolio-item video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .portfolio-media {
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: #f2f2f2;
          }

          .portfolio-media img,
          .portfolio-media video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .portfolio-content {
            color: #111;
            padding: 18px 18px 14px;
            display: flex;
            flex: 1;
            flex-direction: column;
          }

          .portfolio-title {
            font-size: 34px;
            font-weight: 700;
            margin: 0 0 10px;
            letter-spacing: -0.6px;
            line-height: 1.15;
          }

          .portfolio-subtitle {
            font-size: 14px;
            color: rgba(17,17,17,0.62);
            margin: 0 0 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            line-height: 1.6;
          }

          .portfolio-buttons {
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 12px;
            border-top: 1px solid rgba(0,0,0,0.06);
          }

          .portfolio-grid li .portfolio-item {
            height: 360px;
          }

          .portfolio-btn {
            background: transparent;
            color: #4f46e5;
            padding: 10px 0;
            border: none;
            border-radius: 0;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            transition: color 0.2s ease;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            line-height: 1;
            min-height: 34px;
          }

          .portfolio-btn:hover {
            color: #4338ca;
          }

          .portfolio-btn-arrow {
            width: 34px;
            height: 34px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            cursor: pointer;
            color: rgba(79,70,229,0.75);
            transition: transform 0.2s ease, color 0.2s ease;
            padding: 0;
          }

          .portfolio-btn-arrow:hover {
            transform: translateX(2px);
            color: rgba(79,70,229,1);
          }

          /* 响应式 */
          @media (max-width: 960px) {
            .portfolio-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .portfolio-title {
              font-size: 28px;
            }
          }

          @media (max-width: 600px) {
            .portfolio-grid {
              grid-template-columns: 1fr;
            }

            .portfolio-title {
              font-size: 26px;
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
          <ul className="portfolio-grid">
            {sortedItems.map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <div className="portfolio-media" onClick={() => handleDetailClick(item)}>
                    <img src={item.thumb} alt={item.title} />
                  </div>
                  <figcaption className="portfolio-content">
                    <div className="portfolio-title">{item.title}</div>
                    <div className="portfolio-subtitle">{getSubtitle(item)}</div>
                    <div className="portfolio-buttons">
                      <button
                        className="portfolio-btn"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDetailClick(item)
                        }}
                      >
                        CHECKLIST
                      </button>
                      <button
                        className="portfolio-btn-arrow"
                        aria-label="Open"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDetailClick(item)
                        }}
                      >
                        <span style={{ fontSize: '18px', lineHeight: 1 }}>e001</span>
                      </button>
                    </div>
                  </figcaption>
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
