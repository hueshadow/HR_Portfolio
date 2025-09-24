import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PortfolioFilter from './PortfolioFilter'
import ImagePreview from './ImagePreview'
import { usePortfolioCaptionAnimation } from '../hooks/useAnimations'

interface PortfolioPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const PortfolioPage = ({ active, loaded, onPageChange: _onPageChange }: PortfolioPageProps) => {
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState<typeof portfolioItems>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVideo, setPreviewVideo] = useState('')
  const [isVideoPreview, setIsVideoPreview] = useState(false)
  const { animateCaption } = usePortfolioCaptionAnimation()

  const portfolioItems = [
    { id: 1, category: 'image', title: '华为云', image: '/assets/img/portfolio/1.jpg', thumb: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg' },
    { id: 2, category: 'image', title: '华为分析', image: '/assets/img/portfolio/2.jpg', thumb: 'https://photosave.net/2025/09/c40993e5c628645f2b35bee5d57f7bf2.jpg' },
    { id: 3, category: 'image', title: '火柴盒', image: '/assets/img/portfolio/3.jpg', thumb: 'https://photosave.net/2025/09/f1ba8c79cb2be8df787d2654524aa52c.jpg' },
    { id: 4, category: 'image', title: 'Business Connect', image: '/assets/img/portfolio/4.jpg', thumb: 'https://photosave.net/2025/09/84a321e2c0c7ceed0367af973157e24b.jpg' },
    { id: 5, category: 'video', title: 'Project Video 1', image: '/assets/img/portfolio/5.jpg', thumb: 'https://photosave.net/2025/09/56928471b46698ae95c0e94a9b93264b.mp4', isVideo: true },
    { id: 6, category: 'video', title: 'Project Video 2', image: '/assets/img/portfolio/6.jpg', thumb: 'https://photosave.net/2025/09/508f16cfbbce1e7be93cf7bdc8fffbe9.mp4', isVideo: true }
  ]

  const filterItems = [
    { id: 'all', label: 'All', target: '*' },
    { id: 'image', label: 'Image', target: 'image' },
    { id: 'video', label: 'Video', target: 'video' },
    { id: '3d', label: '3D', target: '3d' }
  ]

  useEffect(() => {
    setFilteredItems(portfolioItems)
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

  const handlePreviewClick = (mediaSrc: string, isVideo = false) => {
    if (isVideo) {
      setPreviewVideo(mediaSrc)
      setIsVideoPreview(true)
    } else {
      setPreviewImage(mediaSrc)
      setIsVideoPreview(false)
    }
    setPreviewOpen(true)
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
          .portfolio-item {
            position: relative;
            overflow: hidden;
            margin: 0;
            padding: 0;
            background: #000;
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
          }

          .portfolio-btn:hover {
            background: white;
            color: #333;
          }
        `}</style>
        <style>{`
          .protect-image {
            flex: 4 1 0%;
            text-align: center;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }

          .protect-image img {
            width: 100%;
            max-width: 400px;
            height: 100%;
            border-radius: 0;
            object-fit: cover;
          }

          .protect-discribe {
            flex: 6 1 0%;
            color: rgb(85, 85, 85);
          }

          .protect-discribe h3 {
            font-size: 24px;
            font-weight: 500;
            color: rgb(0, 0, 0);
            margin-bottom: 20px;
            margin-top: 0px;
            align-self: flex-start;
          }

          .protect-discribe p {
            font-size: 24px;
            line-height: 1.6;
            margin-bottom: 20px;
            display: none;
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

        <div className="info-section" style={{
          padding: '0 20px 60px',
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#f8f9fa'
        }}>
          <div className="protect-content" style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            paddingTop: '0',
            paddingBottom: '40px',
            borderBottom: '1px solid #000000'
          }}>
            <div className="protect-image">
              <img
                src="https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg"
                alt="项目展示"
              />
            </div>

            <div className="protect-discribe">
              <h3>
                EACH PROJECT HAS BEEN CAREFULLY DESIGNED, EMBODYING THE PERFECT COMBINATION OF MODERN DESIGN CONCEPTS AND PRACTICALITY
              </h3>
            </div>
          </div>
        </div>

        <h2 className="h2-title" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>
          PICTURE
        </h2>

        <ul className="portfolio-container" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          {filteredItems.map(item => (
            <li key={item.id} data-groups={`["${item.category}"]`}>
              <figure className="portfolio-item">
                {item.isVideo ? (
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
                          if (item.isVideo) {
                            handlePreviewClick(item.thumb, true)
                          } else {
                            handlePreviewClick(item.image)
                          }
                        }}
                      >
                        {item.isVideo ? "播放" : "预览"}
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
