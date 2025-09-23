interface BlogPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
  onToggleSidebar: () => void
}

const BlogPage = ({ active, loaded, onPageChange, onToggleSidebar }: BlogPageProps) => {
  const blogPosts = [
    {
      id: 1,
      title: '用户体验全流程（编辑中）',
      excerpt: '"真正出色的体验，从来不是把信息塞进页面，而是把焦虑从脑海里拿走。" —— Ronn',
      date: '2025-08-25',
      author: 'Admin',
      image: '/assets/img/blog1.jpg',
      category: '未分类'
    }
  ]

  return (
    <section className={`page active fullwidth ${active ? 'active' : ''} ${loaded ? 'loaded' : ''}`} id="blog">
      <div id="map" style={{ display: 'none' }}></div>

      <div className="content grid">
        <div className="page-header c12">
          <h1 data-value="Project description">Project description</h1>
          <span className="toggle-sidebar" onClick={onToggleSidebar}>
            <i></i>
          </span>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        {blogPosts.map(post => (
          <div key={post.id} className="blog-recent-post-item row">
            <div className="c12 end">
              <a className="recent-post-img" href="#">
                <img src={post.image} alt={post.title} />
                <span className="date">
                  <span className="day">{new Date(post.date).getDate()}</span>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </a>
              <h2 className="gamma entry-title">
                <a href="#">{post.title}</a>
              </h2>
              <p>{post.excerpt}</p>
              <div className="entry-meta">
                <span>By {post.author}</span>
                <span>
                  <time className="entry-date">{new Date(post.date).toLocaleDateString()}</time>
                </span>
                <span className="cat-links">{post.category}</span>
                <a className="readmore" href="#">Read more</a>
              </div>
            </div>
          </div>
        ))}

        <div id="sidebar">
          <aside>
            <h6>Recent Posts</h6>
            <ul>
              {blogPosts.slice(0, 3).map(post => (
                <li key={post.id}>
                  <a href="#">{post.title}</a>
                </li>
              ))}
            </ul>
          </aside>
          <aside>
            <h6>Text Widget</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum diam justo, eget consequat mauris blandit vitae.</p>
          </aside>
          <aside>
            <h6>分类</h6>
            <ul>
              <li><a href="#">未分类</a></li>
            </ul>
          </aside>
        </div>

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

export default BlogPage
