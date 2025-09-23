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

const PortfolioPage = ({ active, loaded, onPageChange }: PortfolioPageProps) => {
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState<typeof portfolioItems>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewVideo, setPreviewVideo] = useState('')
  const [isVideoPreview, setIsVideoPreview] = useState(false)
  const { animateCaption } = usePortfolioCaptionAnimation()

  const portfolioItems = [
    { id: 1, category: 'image', title: '华为云', image: '/assets/img/portfolio/1.jpg', thumb: '/assets/img/portfolio/1_s.jpg' },
    { id: 2, category: 'image', title: '华为分析', image: '/assets/img/portfolio/2.jpg', thumb: '/assets/img/portfolio/2_s.jpg' },
    { id: 3, category: 'image', title: '火柴盒', image: '/assets/img/portfolio/3.jpg', thumb: '/assets/img/portfolio/3_s.jpg' },
    { id: 4, category: 'image', title: 'Business Connect', image: '/assets/img/portfolio/4.jpg', thumb: '/assets/img/portfolio/4_s.jpg' },
    { id: 5, category: 'video', title: 'Project Video 1', image: '/assets/img/portfolio/5.jpg', thumb: '/assets/img/portfolio/5_s.mp4', isVideo: true },
    { id: 6, category: 'video', title: 'Project Video 2', image: '/assets/img/portfolio/6.jpg', thumb: '/assets/img/portfolio/6_s.mp4', isVideo: true }
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
        <style jsx>{`
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
        <div className="page-header c12">
          <h1 data-value="PROTECT">PROTECT</h1>
          <hr className={loaded ? 'enabled' : ''} />
          <PortfolioFilter items={filterItems} onFilterChange={handleFilterChange} />
        </div>

        <ul className="portfolio-container" style={{ paddingLeft: '20px' }}>
          {filteredItems.map(item => (
            <li key={item.id} data-groups={`["${item.category}"]`}>
              <figure className="portfolio-item">
                {item.isVideo ? (
                  <video
                    src={item.thumb}
                    alt={item.title}
                    muted
                    loop
                    autoPlay
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
