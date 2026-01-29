interface DesktopNavProps {
  activePageId: string
  onPageChange: (pageId: string) => void
}

const DesktopNav = ({ activePageId, onPageChange }: DesktopNavProps) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
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
