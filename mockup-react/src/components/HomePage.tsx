import { useState, useEffect, useRef } from 'react'
import TypeWriter from './TypeWriter'

interface HomePageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const ScrambleText = ({ text, active, className }: { text: string, active: boolean, className?: string }) => {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!active) {
      setDisplayText(text)
      return
    }

    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let iteration = 0
    let animationFrame: number
    let lastTime = Date.now()

    const animate = () => {
      const now = Date.now()
      if (now - lastTime >= 20) {
        lastTime = now
        setDisplayText(
          text.split('').map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return letters[Math.floor(Math.random() * 26)]
          }).join('')
        )

        if (iteration >= text.length) {
          return // Done
        }
        iteration += 1 / 2
      }
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [active, text])

  return <h1 className={className} data-value={text}>{displayText}</h1>
}

const HomePage = ({ active }: HomePageProps) => {
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    if (!active) return

    let animationId: number
    let contentRect: DOMRect | null = null

    const homeBg = document.getElementById('home-background')
    let h1Elements: NodeListOf<HTMLElement> | null = null

    const updateContentRect = () => {
      const homePage = document.getElementById('home')
      const homeContent = homePage?.querySelector('.content') as HTMLElement
      if (homeContent) {
        contentRect = homeContent.getBoundingClientRect()
      }
      h1Elements = homePage?.querySelectorAll('h1') as NodeListOf<HTMLElement>
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
      
      const target = e.target as HTMLElement
      // Default to hovering effects unless we are over interactive elements
      const isInteractive = target.closest('a, button, .portfolio-filter, .tabs-nav, .toggle-sidebar, input') !== null
      isHoveringRef.current = !isInteractive
    }

    let currentX = mousePositionRef.current.x
    let currentY = mousePositionRef.current.y

    const smoothAnimation = () => {
      const target = mousePositionRef.current
      currentX = lerp(currentX, target.x, 0.15)
      currentY = lerp(currentY, target.y, 0.15)
      
      if (homeBg) {
        homeBg.style.setProperty('--mouse-x', `${currentX}px`)
        homeBg.style.setProperty('--mouse-y', `${currentY}px`)
      }

      if (h1Elements) {
        h1Elements.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (isHoveringRef.current) {
            el.style.setProperty('--x', `${currentX - rect.left}px`)
            el.style.setProperty('--y', `${currentY - rect.top}px`)
            el.style.setProperty('--size', '125px')
          } else {
            el.style.removeProperty('--x')
            el.style.removeProperty('--y')
            el.style.removeProperty('--size')
          }
        })
      }

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
      
      if (h1Elements) {
        h1Elements.forEach(el => {
          el.style.removeProperty('--x')
          el.style.removeProperty('--y')
          el.style.removeProperty('--size')
        })
      }
    }
  }, [active])

  return (
    <>
      <div id="home-background"></div>
      
      <div>
        <ScrambleText text="I'm HUANG" active={active} className="mega" />
        <ScrambleText text="Ronn." active={active} className="mega" />
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
