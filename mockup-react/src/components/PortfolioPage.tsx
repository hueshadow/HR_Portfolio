import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PortfolioFilter from './PortfolioFilter'
import Lightbox from './Lightbox'
import { usePortfolioCaptionAnimation } from '../hooks/useAnimations'

interface PortfolioPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const PortfolioPage = ({ active, loaded, onPageChange }: PortfolioPageProps) => {
  const navigate = useNavigate()
  const [filteredItems, setFilteredItems] = useState<typeof portfolioItems>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const { animateCaption } = usePortfolioCaptionAnimation()

  const portfolioItems = [
    { id: 1, category: 'image', title: '华为云', image: '/assets/img/portfolio/1.jpg', thumb: '/assets/img/portfolio/1_s.jpg' },
    { id: 2, category: 'image', title: '华为分析', image: '/assets/img/portfolio/2.jpg', thumb: '/assets/img/portfolio/2_s.jpg' },
    { id: 3, category: 'image', title: '火柴盒', image: '/assets/img/portfolio/3.jpg', thumb: '/assets/img/portfolio/3_s.jpg' },
    { id: 4, category: 'image', title: 'Business Connect', image: '/assets/img/portfolio/4.jpg', thumb: '/assets/img/portfolio/4_s.jpg' },
    { id: 5, category: 'video', title: 'Project Video 1', image: '/assets/img/portfolio/5.jpg', thumb: '/assets/img/portfolio/5_s.jpg' },
    { id: 6, category: 'video', title: 'Project Video 2', image: '/assets/img/portfolio/6.jpg', thumb: '/assets/img/portfolio/6_s.jpg' },
    { id: 7, category: '3d', title: '3D Project 1', image: '/assets/img/portfolio/7.jpg', thumb: '/assets/img/portfolio/7_s.jpg' },
    { id: 8, category: '3d', title: '3D Project 2', image: '/assets/img/portfolio/8.jpg', thumb: '/assets/img/portfolio/8_s.jpg' },
    { id: 9, category: 'image', title: 'Additional Project', image: '/assets/img/portfolio/9.jpg', thumb: '/assets/img/portfolio/9_s.jpg' }
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

  const handleImageClick = (imageSrc: string) => {
    setLightboxImage(imageSrc)
    setLightboxOpen(true)
  }

  const handleDetailClick = (itemId: number) => {
    navigate(`/portfolio/${itemId}`)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxImage('')
  }

  return (
    <>
        <div className="page-header c12">
          <h1 data-value="PROTECT">PROTECT</h1>
          <hr className={loaded ? 'enabled' : ''} />
          <PortfolioFilter items={filterItems} onFilterChange={handleFilterChange} />
        </div>

        <ul className="portfolio-container">
          {filteredItems.map(item => (
            <li key={item.id} data-groups={`["${item.category}"]`}>
              <figure className="imghvr-shutter-in-out-diag-2">
                <img src={item.thumb} alt={item.title} />
                <figcaption>
                  <div data-value={item.title}>{item.title}</div>
                  <div className="portfolio-actions">
                    <button 
                      className="detail-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDetailClick(item.id)
                      }}
                      title="查看详情"
                    >
                      查看详情
                    </button>
                    <button 
                      className="zoom-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleImageClick(item.image)
                      }}
                      title="预览图片"
                    >
                      预览
                    </button>
                  </div>
                </figcaption>
                <a 
                  href="#" 
                  className="popup-image"
                  onClick={(e) => {
                    e.preventDefault()
                    handleDetailClick(item.id)
                  }}
                ></a>
              </figure>
            </li>
          ))}
        </ul>

        <footer>
          <div className="footer-inner clearfix">
            <div className="copyright">© 2025 Content update by Ronn Huang. All Rights Reserved.</div>
          </div>
        </footer>

      <Lightbox 
        isOpen={lightboxOpen}
        imageSrc={lightboxImage}
        onClose={closeLightbox}
      />
    </>
  )
}

export default PortfolioPage
