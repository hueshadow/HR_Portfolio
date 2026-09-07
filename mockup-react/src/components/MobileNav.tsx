import { pathForTab } from '../tabRoutes'

interface MobileNavProps {
  activePageId: string
  onPageChange: (pageId: string) => void
}

const MobileNav = ({ activePageId, onPageChange }: MobileNavProps) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'flow', label: 'Flow' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, itemId: string) => {
    e.preventDefault()
    document.body.classList.remove('nav-open')
    onPageChange(itemId)

    if (window.innerWidth <= 960) {
      const targetPage = document.getElementById(itemId)
      if (targetPage) {
        setTimeout(() => {
          targetPage.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }, 100)
      }
    }
  }

  return (
    <nav className="mobile-nav">
      <ul>
        {navItems.map(item => (
          <li key={item.id}>
            <a
              href={pathForTab(item.id)}
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
