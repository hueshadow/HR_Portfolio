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
          /* 拼贴画风格布局 */
          .portfolio-wrapper {
            padding: 0;
          }

          .portfolio-container {
            display: block !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .portfolio-row {
            display: flex !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .portfolio-row li {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: auto !important;
            flex: 1 !important;
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .portfolio-item {
            position: relative;
            overflow: hidden;
            background: #fff;
            cursor: pointer;
            width: 100%;
            height: 100%;
          }

          .portfolio-item:hover {
            transform: scale(1.02);
          }

          .portfolio-item img,
          .portfolio-item video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .portfolio-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
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
            padding: 15px;
          }

          .portfolio-title {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
          }

          .portfolio-buttons {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .portfolio-btn {
            background: transparent;
            color: white;
            padding: 6px 14px;
            border: 1px solid white;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
            transition: all 0.2s ease;
          }

          .portfolio-btn:hover {
            background: white;
            color: #333;
          }
        `}</style>
        <style>{`
          /* 拼贴画布局 - 每行自定义宽高 */
          .portfolio-row-1 {
            height: 320px;
          }
          .portfolio-row-1 li {
            aspect-ratio: 16/9 !important;
          }

          .portfolio-row-2 {
            height: 280px;
          }
          .portfolio-row-2 li:nth-child(1) { /* 华为云 */
            flex: 1.2 !important;
            aspect-ratio: 16/9 !important;
          }
          .portfolio-row-2 li:nth-child(2) { /* Business Connect */
            flex: 1 !important;
            aspect-ratio: 1/1 !important;
          }
          .portfolio-row-2 li:nth-child(3) { /* FridayQuote */
            flex: 0.6 !important;
            aspect-ratio: 9/16 !important;
          }

          .portfolio-row-3 {
            height: 300px;
          }
          .portfolio-row-3 li {
            aspect-ratio: 16/10 !important;
          }

          .portfolio-row-4 {
            height: 340px;
          }
          .portfolio-row-4 li {
            flex: 1 !important;
            aspect-ratio: 16/9 !important;
          }

          .portfolio-row-5 {
            height: 300px;
          }
          .portfolio-row-5 li {
            flex: 1 !important;
            aspect-ratio: 16/9 !important;
          }

          /* 视频项目隐藏 */
          .portfolio-row-1 li[data-groups*="7"],
          .portfolio-row-1 li[data-groups*="8"],
          .portfolio-row-1 li[data-groups*="9"],
          .portfolio-row-2 li[data-groups*="7"],
          .portfolio-row-2 li[data-groups*="8"],
          .portfolio-row-2 li[data-groups*="9"],
          .portfolio-row-3 li[data-groups*="7"],
          .portfolio-row-3 li[data-groups*="8"],
          .portfolio-row-3 li[data-groups*="9"],
          .portfolio-row-4 li[data-groups*="7"],
          .portfolio-row-4 li[data-groups*="8"],
          .portfolio-row-4 li[data-groups*="9"],
          .portfolio-row-5 li[data-groups*="7"],
          .portfolio-row-5 li[data-groups*="8"],
          .portfolio-row-5 li[data-groups*="9"] {
            display: none !important;
          }

          /* 响应式 */
          @media (max-width: 960px) {
            .portfolio-row-1,
            .portfolio-row-2,
            .portfolio-row-3,
            .portfolio-row-4,
            .portfolio-row-5 {
              height: auto !important;
              flex-wrap: wrap !important;
            }
            .portfolio-row-1 li,
            .portfolio-row-3 li,
            .portfolio-row-4 li,
            .portfolio-row-5 li {
              flex: 1 1 45% !important;
              aspect-ratio: 4/3 !important;
              margin: 4px !important;
            }
            .portfolio-row-2 li:nth-child(1) {
              flex: 1 1 100% !important;
              aspect-ratio: 16/9 !important;
            }
            .portfolio-row-2 li:nth-child(2),
            .portfolio-row-2 li:nth-child(3) {
              flex: 1 1 45% !important;
              aspect-ratio: 1/1 !important;
            }
          }

          @media (max-width: 600px) {
            .portfolio-row-1 li,
            .portfolio-row-3 li,
            .portfolio-row-4 li,
            .portfolio-row-5 li {
              flex: 1 1 100% !important;
              aspect-ratio: 3/2 !important;
            }
            .portfolio-row-2 li:nth-child(1) {
              aspect-ratio: 3/2 !important;
            }
            .portfolio-row-2 li:nth-child(2),
            .portfolio-row-2 li:nth-child(3) {
              flex: 1 1 100% !important;
              aspect-ratio: 3/4 !important;
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
          {/* Row 1: Ecosystem Dashboard + RailPulse */}
          <ul className="portfolio-row portfolio-row-1">
            {filteredItems.filter(item => item.id === 11).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
            {filteredItems.filter(item => item.id === 10).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
          </ul>

          {/* Row 2: 华为云 + Business Connect + FridayQuote */}
          <ul className="portfolio-row portfolio-row-2">
            {filteredItems.filter(item => item.id === 1).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
            {filteredItems.filter(item => item.id === 4).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
            {filteredItems.filter(item => item.id === 6).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
          </ul>

          {/* Row 3: 华为分析 + 火柴盒 */}
          <ul className="portfolio-row portfolio-row-3">
            {filteredItems.filter(item => item.id === 2).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
            {filteredItems.filter(item => item.id === 3).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
                      </div>
                    </div>
                  </div>
                </figure>
              </li>
            ))}
          </ul>

          {/* Row 4: Nail Designs */}
          <ul className="portfolio-row portfolio-row-4">
            {filteredItems.filter(item => item.id === 5).map(item => (
              <li key={item.id} data-groups={`["${item.category}"]`}>
                <figure className="portfolio-item">
                  <img src={item.thumb} alt={item.title} />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <div className="portfolio-title">{item.title}</div>
                      <div className="portfolio-buttons">
                        <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDetailClick(item); }}>查看详情</button>
                        {item.projectUrl && <button className="portfolio-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.projectUrl, '_blank'); }}>访问项目</button>}
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
