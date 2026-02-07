import { useState, useEffect, useRef } from 'react'
import TypeWriter from './TypeWriter'

interface HomePageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const HomePage = ({ active }: HomePageProps) => {
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) return

    let animationId: number
    let contentRect: DOMRect | null = null

    const updateContentRect = () => {
      const homePage = document.getElementById('home')
      const homeContent = homePage?.querySelector('.content') as HTMLElement
      if (homeContent) {
        contentRect = homeContent.getBoundingClientRect()
      }
    }

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const handleMouseMove = (e: MouseEvent) => {
      let constrainedX = e.clientX
      let constrainedY = e.clientY

      if (contentRect) {
        constrainedX = Math.max(contentRect.left, Math.min(contentRect.right, e.clientX))
        constrainedY = Math.max(contentRect.top, Math.min(contentRect.bottom, e.clientY))
      }

      mousePositionRef.current = { x: constrainedX, y: constrainedY }
    }

    const smoothAnimation = () => {
      const target = mousePositionRef.current
      setSmoothPosition(prev => {
        const newX = lerp(prev.x, target.x, 0.15)
        const newY = lerp(prev.y, target.y, 0.15)
        return { x: newX, y: newY }
      })
      animationId = requestAnimationFrame(smoothAnimation)
    }

    updateContentRect()
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateContentRect, { passive: true })
    animationId = requestAnimationFrame(smoothAnimation)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateContentRect)
      cancelAnimationFrame(animationId)
    }
  }, [active])

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
