interface MobileNavProps {
  activePageId: string
  onPageChange: (pageId: string) => void
}

const MobileNav = ({ activePageId, onPageChange }: MobileNavProps) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()
    
    // 关闭移动导航
    document.body.classList.remove('nav-open')
    
    if (window.innerWidth <= 960) {
      // 移动端：平滑滚动到目标页面
      const targetPage = document.getElementById(itemId)
      if (targetPage) {
        setTimeout(() => {
          targetPage.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }
    } else {
      // 桌面端：切换页面
      onPageChange(itemId)
    }
  }

  return (
    <nav className="mobile-nav">
      <ul>
        {navItems.map(item => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={activePageId === item.id ? 'active' : ''}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MobileNav
