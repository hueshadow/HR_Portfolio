import { useEffect, useRef } from 'react'

// 技能条动画 Hook
export const useSkillBarAnimation = (active: boolean) => {
  const skillTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (active) {
      animateLine()
    }
    return () => {
      if (skillTimeout.current) {
        clearTimeout(skillTimeout.current)
      }
    }
  }, [active])

  const animateLine = () => {
    // HR 线条动画
    document.querySelectorAll('hr').forEach(line => {
      if (isVisible(line)) {
        line.classList.add('enabled')
      }
    })

    // 技能条动画
    document.querySelectorAll('.skill-bar').forEach((line, i) => {
      if (isVisible(line)) {
        skillTimeout.current = setTimeout(() => {
          line.classList.add('enabled')
        }, 250 * i)
      }
    })
  }

  const isVisible = (element: Element) => {
    const rect = element.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  }

  return { animateLine }
}

// 标题动画 Hook
export const useHeadingAnimation = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  
  const animateHeading = (element: HTMLElement) => {
    const originalText = element.getAttribute('data-value') || element.textContent || ''
    let iteration = 0
    
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join('')
      
      if (iteration >= originalText.length) {
        clearInterval(interval)
      }
      
      iteration += 1 / 2
    }, 20)
  }

  return { animateHeading }
}

// 作品集标题动画 Hook
export const usePortfolioCaptionAnimation = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  
  const animateCaption = () => {
    document.querySelectorAll('.portfolio-container li figcaption div').forEach(txt => {
      const container = txt.parentElement
      if (!container) return
      
      let captionInterval: NodeJS.Timeout
      let hoverTimeout: NodeJS.Timeout
      
      const mouseEnterHandler = () => {
        clearInterval(captionInterval)
        hoverTimeout = setTimeout(() => {
          const originalText = txt.getAttribute('data-value') || txt.textContent || ''
          let iter = 0
          
          captionInterval = setInterval(() => {
            txt.textContent = originalText
              .split('')
              .map((letter, index) => {
                if (index < iter) {
                  return originalText[index]
                }
                return letters[Math.floor(Math.random() * 26)]
              })
              .join('')
            
            if (iter >= originalText.length) {
              clearInterval(captionInterval)
            }
            iter += 1 / 2
          }, 20)
        }, 250)
      }
      
      const mouseLeaveHandler = () => {
        clearTimeout(hoverTimeout)
        clearInterval(captionInterval)
      }
      
      container.addEventListener('mouseenter', mouseEnterHandler)
      container.addEventListener('mouseleave', mouseLeaveHandler)
      
      return () => {
        container.removeEventListener('mouseenter', mouseEnterHandler)
        container.removeEventListener('mouseleave', mouseLeaveHandler)
      }
    })
  }

  return { animateCaption }
}
