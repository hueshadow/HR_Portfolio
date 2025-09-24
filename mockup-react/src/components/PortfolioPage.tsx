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
        <div className="page-header c12">
          <h1 data-value="PROTECT">PROTECT</h1>
          <hr className={loaded ? 'enabled' : ''} />
          <PortfolioFilter items={filterItems} onFilterChange={handleFilterChange} />
        </div>

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

        <div className="info-section" style={{
          padding: '60px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#f8f9fa'
        }}>
          <h2 style={{
            position: 'relative',
            textAlign: 'left',
            marginBottom: '0',
            fontSize: '32px',
            fontWeight: '600',
            color: '#000000',
            width: '100%',
            paddingBottom: '24px'
          }}>
            PROTECT
          </h2>

          <div style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            borderTop: '1px solid #e0e0e0',
            paddingTop: '40px'
          }}>
            <div style={{
              flex: '4',
              textAlign: 'center'
            }}>
              <img
                src="https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg"
                alt="项目展示"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: '100%',
                  borderRadius: '0'
                }}
              />
            </div>

            <div style={{
              flex: '6',
              color: '#555'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#000000',
                marginBottom: '20px',
                marginTop: '0'
              }}>
                设计理念
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                这是一个综合性的设计项目展示平台，汇集了多个领域的创意作品。每个项目都经过精心设计，体现了现代设计理念与实用性的完美结合。我们致力于为客户提供创新的视觉解决方案，通过专业的设计思维和技术实现，将抽象的概念转化为具体的视觉表达。
              </p>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.8'
              }}>
                平台涵盖了企业级应用设计、品牌视觉设计、用户界面设计等多个领域。每个项目都遵循严格的设计标准和质量控制流程，确保最终交付的作品能够满足客户的需求并超越期望。我们相信好的设计不仅美观，更能为企业创造实际价值。
              </p>

              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '30px',
                justifyContent: 'center'
              }}>
                <button style={{
                  background: '#000000',
                  color: '#ffffff',
                  border: '1px solid #000000',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  borderRadius: '0',
                  transition: 'all 0.3s ease'
                }}>
                  查看详情
                </button>

                <button style={{
                  background: 'transparent',
                  color: '#000000',
                  border: '1px solid #000000',
                  padding: '10px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  borderRadius: '0',
                  transition: 'all 0.3s ease'
                }}>
                  在线预览
                </button>
              </div>
            </div>
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
