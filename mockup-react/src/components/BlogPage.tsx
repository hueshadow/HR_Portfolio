import { useNavigate } from 'react-router-dom'
import TwitterCard from './TwitterCard'
import { sampleTwitterPosts } from '../types/twitter'

interface BlogPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
  onToggleSidebar: () => void
}

const BlogPage = ({ loaded }: BlogPageProps) => {
  const navigate = useNavigate()

  const handlePostClick = (postId: number) => {
    navigate(`/blog/${postId}`)
  }

  const blogPosts = [
    {
      id: 1,
      title: 'UI/UX 设计风格的演变史',
      excerpt: 'UI/UX 设计风格的演变史，其实不是"审美升级"，而是人和技术的博弈史。从拟物化到扁平化，从沉浸式设计到极简主义，每一次转变都是技术进步与用户需求博弈的结果。',
      date: '2026-01-19',
      author: 'HueShadow (@hueshadow989)',
      image: '/assets/img/blog1.jpg',
      category: '未分类'
    }
  ]

  return (
    <>
      <div className="page-header c12">
        <h1 data-value="博客文章">博客文章</h1>
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
              {new Date(post.date).toLocaleString('zh-CN', { month: 'long', year: 'numeric' })}
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
            <span>作者：{post.author}</span>
            <span><time className="entry-date">{new Date(post.date).toLocaleDateString('zh-CN')}</time></span>
            <span className="cat-links">{post.category}</span>
            <a
              className="readmore"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handlePostClick(post.id)
              }}
            >
              阅读更多
            </a>
          </div>
        </div>
      ))}

      {/* Twitter 推文分区 */}
      <div className="section-divider">
        <span>Twitter 动态</span>
      </div>

      {sampleTwitterPosts.map(post => (
        <TwitterCard
          key={post.id}
          post={post}
          onClick={() => window.open(post.tweetUrl, '_blank')}
        />
      ))}
    </>
  )
}

export default BlogPage
