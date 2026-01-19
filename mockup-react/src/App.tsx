import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import MouseTrailer from './components/MouseTrailer'
import MobileNav from './components/MobileNav'
import DesktopNav from './components/DesktopNav'
import HomePage from './components/HomePage'
import AboutPage from './components/AboutPage'
import PortfolioPage from './components/PortfolioPage'
import BlogPage from './components/BlogPage'
import ContactPage from './components/ContactPage'
import PortfolioDetailPage from './components/PortfolioDetailPage'
import BlogDetailPage from './components/BlogDetailPage'
import ReactAdminDashboard from './components/ReactAdminDashboard'
import PortfolioOverview from './components/PortfolioOverview'

// 主应用组件
function AppContent() {
  const [activePageId, setActivePageId] = useState<string>('home')
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  
  // 页面配置数组
  const pages = [
    { id: 'home', title: 'Home', number: '01', component: HomePage },
    { id: 'about', title: 'About', number: '02', component: AboutPage },
    { id: 'portfolio', title: 'Portfolio', number: '03', component: PortfolioPage },
    { id: 'contact', title: 'Contact', number: '04', component: ContactPage },
    { id: 'blog', title: 'Blog', number: '05', component: BlogPage }
  ]

  // 检查是否在详情页或管理页
  const isDetailPage = location.pathname.startsWith('/portfolio/') || location.pathname.startsWith('/blog/')
  const isAdminPage = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login'

  useEffect(() => {
    // 预加载背景图片
    const image = new Image()
    image.onload = () => {
      // 模拟原主题的延迟加载效果
      setTimeout(() => {
        setIsLoaded(true)
        document.body.classList.add('hr-loaded')
      }, 250)
    }
    image.src = 'https://photosave.net/2025/09/fa0d5a10405bfab5931f038d97c545e6.png'
  }, [])

  // 处理窗口大小改变时的背景色更新
  useEffect(() => {
    const handleResize = () => {
      // Update background based on new window size
      if (activePageId === 'about') {
        if (window.innerWidth >= 960) {
          document.body.style.background = '#e3e3de'
        } else {
          document.body.style.background = ''
        }
      } else {
        if (window.innerWidth >= 960) {
          document.body.style.background = '#f7f6f1'
        } else {
          document.body.style.background = ''
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activePageId])

  const handlePageChange = (pageId: string) => {
    // 检查页面是否存在且未隐藏
    const page = pages.find(p => p.id === pageId && !p.hidden)
    if (page && pageId !== activePageId) {
      setActivePageId(pageId)
      setIsNavOpen(false)

      // 滚动到页面顶部（移动端）
      if (window.innerWidth < 960) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev)
  }, [])

  useEffect(() => {
    // 添加移动导航切换按钮的事件监听
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('.toggle-nav')) {
        e.preventDefault()
        toggleNav()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [isNavOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    document.body.className = ''
    if (isNavOpen) document.body.classList.add('nav-open')
    if (isSidebarOpen) document.body.classList.add('sidebar-open')
    if (isLoaded) document.body.classList.add('hr-loaded')
    if (activePageId === 'blog') document.body.classList.add('single-post')
    if (isDetailPage) document.body.classList.add('detail-page')
    if (isAdminPage) document.body.classList.add('admin-page')

    // When About page is active, change background color for all pages
    if (activePageId === 'about') {
      document.documentElement.style.setProperty('--page-bg-color', '#e3e3de')
      // Only set body background for desktop (not mobile)
      if (window.innerWidth >= 960) {
        document.body.style.background = '#e3e3de'
      } else {
        // Let CSS handle mobile background
        document.body.style.background = ''
      }
    } else {
      document.documentElement.style.setProperty('--page-bg-color', '#f7f6f1')
      // Only set body background for desktop (not mobile)
      if (window.innerWidth >= 960) {
        document.body.style.background = '#f7f6f1'
      } else {
        // Let CSS handle mobile background
        document.body.style.background = ''
      }
    }
  }, [isNavOpen, isSidebarOpen, isLoaded, activePageId, isDetailPage, isAdminPage])

  // 如果在详情页，只显示相应内容
  if (isDetailPage) {
    return (
      <>
        <MouseTrailer />
        <Routes>
          <Route path="/portfolio/:id" element={<PortfolioDetailPage onPageChange={handlePageChange} />} />
          <Route path="/blog/:id" element={<BlogDetailPage active={true} loaded={isLoaded} onPageChange={handlePageChange} />} />
        </Routes>
      </>
    )
  }


  return (
    <>
      <MouseTrailer />
      <MobileNav
        activePageId={activePageId}
        onPageChange={handlePageChange}
      />
      <DesktopNav
        activePageId={activePageId}
        onPageChange={handlePageChange}
      />

      <main style={{ display: isLoaded ? 'block' : 'none' }}>
        {pages.filter(page => !page.hidden).map((page) => {
          const PageComponent = page.component
          return (
            <section
              key={page.id}
              className={`page ${activePageId === page.id ? 'active' : ''} ${isLoaded ? 'loaded' : ''}`}
              id={page.id}
            >
              {/* 手风琴页面头部 */}
              <header
                onClick={() => handlePageChange(page.id)}
                className={page.id === 'home' ? 'home-header' : ''}
              >
                <div className="page-title">
                  <span className="title-number">{page.number}</span>
                  <h2 className="title-text">{page.title}</h2>
                </div>
                {page.id === 'home' && (
                  <>
                    <div className="logo">
                      <img src="/assets/img/logo.png" alt="Logo" />
                    </div>
                    <ul className="social">
                      <li>
                        <a href="#" aria-label="Facebook">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Twitter">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="Instagram">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" aria-label="LinkedIn">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </header>

              {/* 页面内容 */}
              <div className="content">
                <PageComponent
                  active={activePageId === page.id}
                  loaded={activePageId === page.id || isLoaded}
                  onPageChange={handlePageChange}
                  onToggleSidebar={page.id === 'blog' ? toggleSidebar : () => {}}
                />
              </div>
            </section>
          )
        })}
      </main>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/*" element={<ReactAdminDashboard />} />
        <Route path="/work" element={<PortfolioOverview />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  )
}

export default App
