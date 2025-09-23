import { useState, useEffect } from 'react'

interface TypeWriterProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
  className?: string
}

const TypeWriter = ({ 
  texts, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenTexts = 2000,
  className = ""
}: TypeWriterProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    
    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetweenTexts)
      
      return () => clearTimeout(waitTimer)
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // 正在打字
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1))
        } else {
          // 打字完成，等待一段时间后开始删除
          setIsWaiting(true)
        }
      } else {
        // 正在删除
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          // 删除完成，切换到下一个文本
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  return (
    <span className={className}>
      {currentText}
    </span>
  )
}

export default TypeWriter


