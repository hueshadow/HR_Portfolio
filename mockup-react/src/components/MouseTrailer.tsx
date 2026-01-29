import { useEffect, useRef } from 'react'

const MouseTrailer = () => {
  const mouseRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
    if (isMobile) return

    let mouseX = 0, mouseY = 0, pageX = 0, pageY = 0
    let backgroundX = 0, backgroundY = 0
    const movementStrength = 370
    const height = movementStrength / window.innerHeight
    const width = movementStrength / window.innerWidth

    const handleMouseMove = (e: MouseEvent) => {
      pageX = e.pageX - (window.innerWidth / 6)
      pageY = e.pageY - (window.innerHeight / 6)
      backgroundX = width * pageX * -0.8 - 30
      backgroundY = height * pageY * -0.8 - 30

      const homeBackground = document.getElementById('home-background')
      
      // 获取01页面的content区域边界
      const homePage = document.getElementById('home')
      const homeContent = homePage?.querySelector('.content') as HTMLElement
      
      let constrainedMouseX = e.pageX
      let constrainedMouseY = e.pageY
      
      // 如果是首页且content区域存在，限制鼠标位置在content区域内
      if (homePage?.classList.contains('active') && homeContent) {
        const contentRect = homeContent.getBoundingClientRect()
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        
        const contentLeft = contentRect.left + scrollLeft
        const contentTop = contentRect.top + scrollTop
        const contentRight = contentLeft + contentRect.width
        const contentBottom = contentTop + contentRect.height
        
        // 限制鼠标位置在content区域内
        constrainedMouseX = Math.max(contentLeft, Math.min(contentRight, e.pageX))
        constrainedMouseY = Math.max(contentTop, Math.min(contentBottom, e.pageY))
      }

      if (homeBackground && homeBackground.matches(':hover')) {
        mouseX = constrainedMouseX
        mouseY = constrainedMouseY
        mouseRef.current?.classList.remove('regular')
      } else {
        mouseRef.current?.classList.add('regular')
        mouseX = constrainedMouseX
        mouseY = constrainedMouseY
      }

      // 检查悬停状态
      const hoverElements = 'a:hover, .testomonial-slider-controls:hover, .about-slider-controls:hover, .portfolio-filter:hover, .tabs-nav:hover, .page:not(.active) header:hover, .toggle-sidebar:hover, input[type=submit]:hover, button:hover'
      if (document.querySelector(hoverElements)) {
        mouseRef.current?.classList.add('hover')
      } else {
        mouseRef.current?.classList.remove('hover')
      }

      if (document.querySelector('.portfolio-container li a:hover')) {
        mouseRef.current?.classList.add('zoom')
      } else {
        mouseRef.current?.classList.remove('zoom')
      }
    }

    // 使用requestAnimationFrame优化动画性能
    let animationId: number
    
    const animateLoop = () => {
      if (window.innerWidth > 960) {
        const xp = mouseX - 6
        const yp = mouseY - 6
        const bxp = backgroundX / 12
        const byp = backgroundY / 12

        // 缓存DOM查询
        const homeBackground = document.getElementById('home-background')

        // 更新 h1 元素的 CSS 变量 - 始终执行
        if (homeBackground && homeBackground.closest('.page#home')) {
          document.querySelectorAll('h1').forEach(h1 => {
            const rect = h1.getBoundingClientRect()
            // 使用限制后的鼠标位置
            ;(h1 as HTMLElement).style.setProperty('--x', `${mouseX - rect.left}px`)
            ;(h1 as HTMLElement).style.setProperty('--y', `${mouseY - rect.top}px`)
            ;(h1 as HTMLElement).style.setProperty('--size', '125px')
          })
        }

        // 优化鼠标跟踪器位置更新
        if (mouseRef.current) {
          // 使用transform代替left/top，获得更好的性能
          mouseRef.current.style.transform = `translate3d(${xp}px, ${yp}px, 0)`
          mouseRef.current.style.backgroundPosition = `${bxp}px ${Math.min(byp, 0)}px`
        }
      }
      
      // 持续动画循环
      animationId = requestAnimationFrame(animateLoop)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    animationId = requestAnimationFrame(animateLoop)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="mouse regular" ref={mouseRef}>
      <div></div>
    </div>
  )
}

export default MouseTrailer
