import { useNavigate } from 'react-router-dom'

interface BlogPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
  onToggleSidebar: () => void
}

const BlogPage = ({ active: _active, loaded, onPageChange: _onPageChange, onToggleSidebar: _onToggleSidebar }: BlogPageProps) => {
  const navigate = useNavigate()

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`)
  }

  const blogPosts = [
    {
      id: 1,
      title: '用户体验全流程（编辑中）',
      excerpt: '"真正出色的体验，从来不是把信息塞进页面，而是把焦虑从脑海里拿走。" —— Ronn',
      date: '2025-08-25',
      author: 'Admin',
      image: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg',
      category: '未分类'
    }
  ]

  return (
    <>
      <div className="page-header c12">
        <h1 data-value="Project description">Project description</h1>
        <span className="toggle-sidebar"><i></i></span>
        <hr className={loaded ? 'enabled' : ''}></hr>
      </div>

      {blogPosts.map(post => (
        <div key={post.id} className="blog-recent-post-item row c12 end">
          <a
            className="recent-post-img"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePostClick(post.id)
            }}
          >
            <img alt={post.title} src={post.image}></img>
            <span className="date">
              <span className="day">{new Date(post.date).getDate()}</span>
              {new Date(post.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </a>
          <h2 className="gamma entry-title">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePostClick(post.id)
              }}
            >
              {post.title}
            </a>
          </h2>
          <p>{post.excerpt}</p>
          <div className="entry-meta">
            <span>By {post.author}</span>
            <span><time className="entry-date">{new Date(post.date).toLocaleDateString()}</time></span>
            <span className="cat-links">{post.category}</span>
            <a
              className="readmore"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePostClick(post.id)
              }}
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </>
  )
}

export default BlogPage
