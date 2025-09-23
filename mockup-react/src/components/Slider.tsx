import { useState, useEffect } from 'react'

interface SlideItem {
  id: number
  content: React.ReactNode
}

interface SliderProps {
  items: SlideItem[]
  className?: string
  showControls?: boolean
  showSlideNumber?: boolean
  autoPlay?: boolean
  interval?: number
}

const Slider = ({ 
  items, 
  className = '', 
  showControls = true, 
  showSlideNumber = false,
  autoPlay = false,
  interval = 5000 
}: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % items.length)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [autoPlay, interval, items.length])

  const goToNext = () => {
    setCurrentSlide(prev => (prev + 1) % items.length)
  }

  const goToPrev = () => {
    setCurrentSlide(prev => (prev - 1 + items.length) % items.length)
  }

  const numberToWords = (num: number): string => {
    const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    return words[num] || num.toString()
  }

  if (items.length === 0) return null

  return (
    <div className={`slider-container ${className}`}>
      <div className="tns-outer">
        <div className="slider-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
          <div 
            className="slider-track"
            style={{
              display: 'flex',
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.5s ease'
            }}
          >
            {items.map((item, index) => (
              <div 
                key={item.id}
                className="slider-item"
                style={{ 
                  minWidth: '100%',
                  opacity: index === currentSlide ? 1 : 0.7,
                  transition: 'opacity 0.5s ease'
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showControls && items.length > 1 && (
        <div className={`slider-controls ${className.includes('about') ? 'about-slider-controls' : className.includes('testomonial') ? 'testomonial-slider-controls' : ''}`}>
          <span onClick={goToPrev}>
            <i className="fas fa-chevron-left"></i>
          </span>
          <span onClick={goToNext}>
            <i className="fas fa-chevron-right"></i>
          </span>
        </div>
      )}

      {showSlideNumber && (
        <div className="slide-number">
          <span className="current-slide">{numberToWords(currentSlide + 1)}</span>
          <span> / {items.length}</span>
        </div>
      )}
    </div>
  )
}

export default Slider
