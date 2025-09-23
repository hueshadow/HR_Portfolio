import { useParams } from 'react-router-dom'

interface BlogDetailPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const BlogDetailPage = ({ active, loaded, onPageChange }: BlogDetailPageProps) => {
  const { id } = useParams<{ id: string }>()

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
      image: '/assets/img/blog1.jpg',
      category: '未分类'
    }
  ]

  const post = blogPosts.find(p => p.id === parseInt(id || '1'))

  if (!post) {
    return (
      <section className={`page fullwidth ${active ? 'active' : ''} ${loaded ? 'loaded' : ''}`} id="blog-detail">
        <div className="content">
          <div className="page-header c12">
            <h1>文章未找到</h1>
            <hr className={loaded ? 'enabled' : ''} />
          </div>
          <div className="c12">
            <p>抱歉，请求的博客文章不存在。</p>
            <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('blog') }} className="readmore">
              返回博客列表
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`page fullwidth ${active ? 'active' : ''} ${loaded ? 'loaded' : ''}`} id="blog-detail">
      <div id="map" style={{ display: 'none' }}></div>

      <div className="content">
        <div className="page-header c12">
          <h1 data-value="Project description">Project description</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <article className="blog-detail-post c12">
          <div className="blog-post-header">
            <img src={post.image} alt={post.title} className="blog-detail-image" />
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

          <div className="blog-post-footer">
            <a href="#" onClick={(e) => { e.preventDefault(); onPageChange('blog') }} className="readmore">
              ← 返回博客列表
            </a>
          </div>
        </article>

        <footer>
          <div className="footer-inner clearfix">
            <div className="copyright">© 2025 Content update by Ronn Huang. All Rights Reserved.</div>
            <ul className="social-footer">
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default BlogDetailPage
