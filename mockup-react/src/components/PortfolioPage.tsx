import { useState, useEffect, useMemo } from 'react'
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

// 获取年份
const getYear = (item: PortfolioItem): string => {
  if (!item.projectDate) return ''
  return item.projectDate.split('-')[0]
}

const PortfolioPage = ({ active, loaded }: PortfolioPageProps) => {
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVideo, setPreviewVideo] = useState('')
  const [isVideoPreview, setIsVideoPreview] = useState(false)
  const { animateCaption, cleanupCaption } = usePortfolioCaptionAnimation()

  // 项目排序（按指定位置）
  const sortOrder = [1, 2, 4, 3, 5, 17, 6, 10, 11, 12, 13, 14, 15, 16]

  // 过滤并排序的项目（排除视频项目 id=7,8,9）
  const sortedItems = useMemo(() =>
    filteredItems
      .filter(item => item.id !== 7 && item.id !== 8 && item.id !== 9)
      .sort((a, b) => {
        const indexA = sortOrder.indexOf(a.id)
        const indexB = sortOrder.indexOf(b.id)
        if (indexA === -1) return 1
        if (indexB === -1) return -1
        return indexA - indexB
      }),
    [filteredItems]
  )

  useEffect(() => {
    setFilteredItems(portfolioManager.getAll())
  }, [])

  useEffect(() => {
    if (active && loaded) {
      setTimeout(() => {
        animateCaption()
      }, 100)
    }
    return () => {
      cleanupCaption()
    }
  }, [active, loaded, animateCaption, cleanupCaption])

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
          /* 极简两列网格布局 */
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 48px;
            width: 100%;
            margin: 0;
            padding: 0 20px;
          }

          .project-card {
            display: flex;
            flex-direction: column;
            gap: 12px;
            cursor: pointer;
            padding: 0;
            background: transparent;
          }

          .project-header {
            border-bottom: 1px solid #000;
            margin-bottom: 12px;
          }

          .project-title-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 16px;
          }

          .project-meta {
            font-size: 14px;
            color: #666;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .project-title {
            font-size: 18px;
            font-weight: 600;
            color: #111;
            margin: 0;
            line-height: 1.3;
          }

          .project-description {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
            margin: 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          .project-image {
            margin-top: 8px;
            border-radius: 8px;
            overflow: hidden;
            background: #f8f8f8;
            aspect-ratio: 16 / 10;
          }

          .project-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.3s ease;
          }

          .project-card:hover .project-image img {
            transform: scale(1.02);
          }

          /* 响应式 */
          @media (max-width: 768px) {
            .projects-grid {
              grid-template-columns: 1fr;
              gap: 40px;
            }

            .project-header {
              flex-direction: column;
              gap: 4px;
              align-items: flex-start;
            }

            .project-title {
              font-size: 16px;
            }
          }
        `}</style>
        <div className="page-header c12" style={{ paddingBottom: '32px' }}>
          <h1 data-value="作品集" style={{ fontSize: '28px', fontWeight: 600 }}>作品集</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <div className="portfolio-wrapper">
          <div className="projects-grid">
            {sortedItems.map(item => (
              <article
                className="project-card"
                key={item.id}
                onClick={() => handleDetailClick(item)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDetailClick(item) } }}
                tabIndex={0}
                role="button"
              >
                <div className="project-header"></div>
                <div className="project-title-row">
                  <h3 className="project-title">{item.title}</h3>
                  <span className="project-meta">
                    {getYear(item)}
                  </span>
                </div>
                <p className="project-description">
                  {getDescriptionPreview(item.description || '')}
                </p>
                <div className="project-image">
                  <img src={item.thumb} alt={item.title} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
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
