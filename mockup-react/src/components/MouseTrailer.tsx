import { useEffect, useRef } from 'react'

const MouseTrailer = () => {
  const mouseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Use matchMedia instead of UA sniffing for reliable mobile detection
    const isMobile = window.matchMedia('(max-width: 960px)').matches
    if (isMobile) return

    let mouseX = 0, mouseY = 0, pageX = 0, pageY = 0
    let backgroundX = 0, backgroundY = 0
    const movementStrength = 370
    const height = movementStrength / window.innerHeight
    const width = movementStrength / window.innerWidth

    // Cache DOM element references
    let homeBackground: HTMLElement | null = document.getElementById('home-background')
    let homePage: HTMLElement | null = document.getElementById('home')
    let homeContent: HTMLElement | null = homePage?.querySelector('.content') as HTMLElement | null
    let cachedH1s: HTMLElement[] = Array.from(document.querySelectorAll('#home h1'))

    // Track hover state via event delegation instead of :hover queries
    let isHoveringInteractive = false
    let isHoveringPortfolioLink = false
    let isHoveringHomeBackground = false

    const interactiveSelector = 'a, .testomonial-slider-controls, .about-slider-controls, .portfolio-filter, .tabs-nav, .page:not(.active) header, .toggle-sidebar, input[type=submit], button'
    const portfolioLinkSelector = '.portfolio-container li a'

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(portfolioLinkSelector)) {
        isHoveringPortfolioLink = true
        isHoveringInteractive = true
      } else if (target.closest(interactiveSelector)) {
        isHoveringInteractive = true
      }
      if (target.closest('#home-background')) {
        isHoveringHomeBackground = true
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(portfolioLinkSelector)) {
        isHoveringPortfolioLink = false
      }
      if (target.closest(interactiveSelector)) {
        isHoveringInteractive = false
      }
      if (target.closest('#home-background')) {
        isHoveringHomeBackground = false
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      pageX = e.pageX - (window.innerWidth / 6)
      pageY = e.pageY - (window.innerHeight / 6)
      backgroundX = width * pageX * -0.8 - 30
      backgroundY = height * pageY * -0.8 - 30

      let constrainedMouseX = e.pageX
      let constrainedMouseY = e.pageY

      if (homePage?.classList.contains('active') && homeContent) {
        const contentRect = homeContent.getBoundingClientRect()
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop

        const contentLeft = contentRect.left + scrollLeft
        const contentTop = contentRect.top + scrollTop
        const contentRight = contentLeft + contentRect.width
        const contentBottom = contentTop + contentRect.height

        constrainedMouseX = Math.max(contentLeft, Math.min(contentRight, e.pageX))
        constrainedMouseY = Math.max(contentTop, Math.min(contentBottom, e.pageY))
      }

      if (isHoveringHomeBackground) {
        mouseRef.current?.classList.remove('regular')
      } else {
        mouseRef.current?.classList.add('regular')
      }
      mouseX = constrainedMouseX
      mouseY = constrainedMouseY

      // Update hover classes using cached state
      if (isHoveringInteractive) {
        mouseRef.current?.classList.add('hover')
      } else {
        mouseRef.current?.classList.remove('hover')
      }

      if (isHoveringPortfolioLink) {
        mouseRef.current?.classList.add('zoom')
      } else {
        mouseRef.current?.classList.remove('zoom')
      }
    }

    let animationId: number

    const animateLoop = () => {
      if (window.innerWidth > 960) {
        const xp = mouseX - 6
        const yp = mouseY - 6
        const bxp = backgroundX / 12
        const byp = backgroundY / 12

        // Update h1 CSS variables using cached references
        if (homeBackground && homeBackground.closest('.page#home')) {
          for (let i = 0; i < cachedH1s.length; i++) {
            const h1 = cachedH1s[i]
            const rect = h1.getBoundingClientRect()
            h1.style.setProperty('--x', `${mouseX - rect.left}px`)
            h1.style.setProperty('--y', `${mouseY - rect.top}px`)
            h1.style.setProperty('--size', '125px')
          }
        }

        if (mouseRef.current) {
          mouseRef.current.style.transform = `translate3d(${xp}px, ${yp}px, 0)`
          mouseRef.current.style.backgroundPosition = `${bxp}px ${Math.min(byp, 0)}px`
        }
      }

      animationId = requestAnimationFrame(animateLoop)
    }

    // Refresh cached DOM references when DOM changes
    const refreshCachedElements = () => {
      homeBackground = document.getElementById('home-background')
      homePage = document.getElementById('home')
      homeContent = homePage?.querySelector('.content') as HTMLElement | null
      cachedH1s = Array.from(document.querySelectorAll('#home h1'))
    }

    // Use MutationObserver to refresh caches when DOM structure changes
    const observer = new MutationObserver(() => {
      refreshCachedElements()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    animationId = requestAnimationFrame(animateLoop)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      observer.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="mouse regular" ref={mouseRef}>
      <div></div>
    </div>
  )
}

export default MouseTrailer
