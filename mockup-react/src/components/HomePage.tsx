import { useState, useEffect } from 'react'
import TypeWriter from './TypeWriter'

interface HomePageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const HomePage = ({ active, loaded, onPageChange }: HomePageProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationId: number
    let contentRect: DOMRect | null = null
    
    // 缓存content区域边界，避免重复计算
    const updateContentRect = () => {
      const homePage = document.getElementById('home')
      const homeContent = homePage?.querySelector('.content') as HTMLElement
      if (homeContent) {
        contentRect = homeContent.getBoundingClientRect()
      }
    }
    
    // 更高效的lerp函数
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!active) return
      
      let constrainedX = e.clientX
      let constrainedY = e.clientY
      
      // 使用缓存的边界信息
      if (contentRect) {
        constrainedX = Math.max(contentRect.left, Math.min(contentRect.right, e.clientX))
        constrainedY = Math.max(contentRect.top, Math.min(contentRect.bottom, e.clientY))
      }
      
      setMousePosition({ x: constrainedX, y: constrainedY })
    }

    const smoothAnimation = () => {
      setSmoothPosition(prev => {
        // 提升lerp因子，让跟随更敏感
        const newX = lerp(prev.x, mousePosition.x, 0.15)
        const newY = lerp(prev.y, mousePosition.y, 0.15)
        
        // 降低阈值，让动画更流畅
        const threshold = 0.05
        if (Math.abs(newX - mousePosition.x) > threshold || Math.abs(newY - mousePosition.y) > threshold) {
          animationId = requestAnimationFrame(smoothAnimation)
        }
        
        return { x: newX, y: newY }
      })
    }

    if (active) {
      updateContentRect()
      document.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('resize', updateContentRect, { passive: true })
      animationId = requestAnimationFrame(smoothAnimation)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('resize', updateContentRect)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [active, mousePosition.x, mousePosition.y])

  return (
    <>
      <div 
        id="home-background"
        style={{
          '--mouse-x': `${smoothPosition.x}px`,
          '--mouse-y': `${smoothPosition.y}px`
        } as React.CSSProperties}
      ></div>
      
      <div>
        <h1 className="mega" data-value="I'm HUANG">I'm HUANG</h1>
        <h1 className="mega" data-value="Ronn.">Ronn.</h1>
        <h1 className="delta">
          I'm a freelance <TypeWriter 
            texts={['UX designer.', 'Product development.', 'Coffee Drinker.']}
            typingSpeed={100}
            deletingSpeed={50}
            delayBetweenTexts={2000}
            className="write"
          /><span className="typed-cursor">|</span>
          <br />
          From CHINA.
        </h1>
      </div>
    </>
  )
}

export default HomePage
