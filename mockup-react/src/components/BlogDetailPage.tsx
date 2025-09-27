import { useParams, useNavigate } from 'react-router-dom'

interface BlogDetailPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const BlogDetailPage = ({ active: _active, loaded: _loaded, onPageChange }: BlogDetailPageProps) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const handleBackToBlog = () => {
    navigate('/')
    onPageChange('blog')
  }

  // 模拟博客文章数据（在实际项目中应该从API或数据文件中获取）
  const blogPosts = [
    {
      id: 1,
      title: '用户体验全流程（编辑中）',
      content: `
<p>用户体验设计是一个系统的过程，需要从用户的角度出发，全面考虑产品的各个方面。真正出色的体验，从来不是把信息塞进页面，而是把焦虑从脑海里拿走。</p>

<h3>用户研究阶段</h3>
<p>在设计之初，我们需要深入了解目标用户的需求、行为和痛点。通过用户访谈、问卷调查、用户画像等方式，构建对用户的深入理解。</p>

<h3>原型设计阶段</h3>
<p>基于用户研究的结果，我们开始构建产品原型。从低保真原型到高保真原型，逐步完善设计方案。</p>

<h3>测试优化阶段</h3>
<p>通过可用性测试、A/B测试等方法，不断优化产品体验，确保最终产品能够真正满足用户需求。</p>

<blockquote>
  <p>"Design is not just what it looks like and feels like. Design is how it works."</p>
  <cite>— Steve Jobs</cite>
</blockquote>
`,
      date: '2025-08-25',
      author: 'Admin',
      image: 'https://photosave.net/2025/09/79099f4ebdd91238cb4e2c28d0c110e8.jpg',
      category: '未分类'
    }
  ]

  const post = blogPosts.find(p => p.id === parseInt(id || '1'))

  if (!post) {
    return (
      <div className="blog-detail-wrapper">
        <div className="page-header c12">
          <h1 data-value="BLOG DETAIL">BLOG DETAIL</h1>
          <hr />
        </div>
        <div className="blog-detail-content">
          <h1>文章未找到</h1>
          <p>抱歉，请求的博客文章不存在。</p>
          <a href="#" onClick={(e) => { e.preventDefault(); handleBackToBlog() }} className="text-link">
            返回博客列表
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-detail-wrapper">
      <div className="page-header c12">
        <div className="header-with-back">
          <div className="header-back">
            <button onClick={handleBackToBlog} className="back-button">
              <i className="fas fa-arrow-left"></i> 返回
            </button>
          </div>
          <div className="header-title">
            <h1 data-value="BLOG DETAIL">BLOG DETAIL</h1>
          </div>
        </div>
        <hr />
      </div>

      <article className="blog-detail-post" style={{ paddingLeft: '200px', paddingRight: '200px' }}>
        <div className="blog-post-header">
          <img src={post.image} alt={post.title} className="blog-detail-image" style={{ borderRadius: 0 }} />
          <div className="blog-post-meta">
            <h1 className="blog-detail-title">{post.title}</h1>
            <div className="entry-meta">
              <span>By {post.author}</span>
              <span>
                <time className="entry-date">{new Date(post.date).toLocaleDateString()}</time>
              </span>
              <span className="cat-links">{post.category}</span>
            </div>
          </div>
        </div>

        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <style>{`
          .blog-detail-wrapper {
            width: 100%;
            min-height: 100vh;
            background: #fff;
            padding-top: 80px;
          }

          .page-header.c12 {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            box-sizing: border-box;
          }

          .header-with-back {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
          }

          .header-back {
            flex-shrink: 0;
          }

          .header-title {
            flex-grow: 1;
          }

          .header-title h1 {
            margin: 0;
          }

          .blog-detail-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
          }

          .header-back .back-button {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            color: #0066cc !important;
            border: none !important;
            font-size: 16px !important;
            font-weight: 400 !important;
            cursor: pointer !important;
            text-decoration: none !important;
            display: inline-block !important;
            outline: none !important;
            box-shadow: none !important;
            transition: none !important;
            opacity: 1 !important;
          }

          .header-back .back-button:hover,
          .header-back .back-button:focus,
          .header-back .back-button:active {
            background: transparent !important;
            color: #0052cc !important;
            text-decoration: none !important;
            outline: none !important;
            box-shadow: none !important;
            transform: none !important;
            opacity: 1 !important;
          }

          .text-link {
            color: #0066cc;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
            display: inline-block;
          }

          .text-link:hover {
            text-decoration: underline;
          }
        `}</style>
      </article>
    </div>
  )
}

export default BlogDetailPage
