import { Link } from 'react-router-dom'

const AdminLink = () => {
  return (
    <Link to="/admin" className="admin-link" title="Admin Dashboard">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
        <path d="M12 22V2"/>
        <path d="M12 22H2"/>
        <path d="M12 22H22"/>
      </svg>
    </Link>
  )
}

export default AdminLink