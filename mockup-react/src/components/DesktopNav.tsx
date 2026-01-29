interface DesktopNavProps {
  activePageId: string
  onPageChange: (pageId: string) => void
}

const DesktopNav = ({ activePageId, onPageChange }: DesktopNavProps) => {
  const navItems = [
    { id: 'home', label: '首页' },
    { id: 'about', label: '关于' },
    { id: 'portfolio', label: '作品' },
    { id: 'blog', label: '博客' },
    { id: 'contact', label: '联系' }
  ]

  return (
    <nav className="desktop-nav">
      <ul>
        {navItems.map(item => (
          <li key={item.id}>
            <a 
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                onPageChange(item.id)
              }}
              className={activePageId === item.id ? 'active' : ''}
              title={item.label}
            >
              <span className="nav-text">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default DesktopNav
