import { useState, useEffect } from 'react'
import { useSkillBarAnimation } from '../hooks/useAnimations'

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  active?: boolean
}

const Tabs = ({ items, active = false }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(items[0]?.id || '')
  const { animateLine } = useSkillBarAnimation(active)

  useEffect(() => {
    if (active && activeTab) {
      // 检查当前标签页是否包含技能条
      const activeContent = document.querySelector(`#${activeTab}-content`)
      if (activeContent?.querySelector('.skill-bar')) {
        setTimeout(() => animateLine(), 100)
      }
    }
  }, [activeTab, active, animateLine])

  const handleTabClick = (tabId: string) => {
    if (tabId !== activeTab) {
      // 移除所有技能条的启用状态
      document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.classList.remove('enabled')
      })
      
      setActiveTab(tabId)
    }
  }

  return (
    <div className="row">
      <div className="c4">
        <ul className="tabs-nav">
          {items.map(item => (
            <li key={item.id}>
              <div className="tab-background"></div>
              <a
                id={item.id}
                href="#"
                className={activeTab === item.id ? '' : 'inactive'}
                onClick={(e) => {
                  e.preventDefault()
                  handleTabClick(item.id)
                }}
              >
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="c8">
        {items.map(item => (
          <div
            key={item.id}
            id={`${item.id}-content`}
            className="tabs-container"
            style={{ display: activeTab === item.id ? 'block' : 'none' }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tabs
