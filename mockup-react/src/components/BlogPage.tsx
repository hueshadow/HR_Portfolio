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
    <div className="content">
      <div className="page-header c12">
        <h1 data-value="Project description">Project description</h1>
        <span className="toggle-sidebar" onClick={onToggleSidebar}>
          <i></i>
        </span>
        <hr className={loaded ? 'enabled' : ''} />
      </div>

      <div className="blog-recent-post-item row c12 end">
        <a className="recent-post-img" href="#">
          <img src="/assets/img/blog1.jpg" alt="用户体验全流程（编辑中）" />
          <span className="date">
            <span className="day">25</span>
            August 2025
          </span>
        </a>
        <h2 className="gamma entry-title">
          <a href="#">用户体验全流程（编辑中）</a>
        </h2>
        <p>"真正出色的体验，从来不是把信息塞进页面，而是把焦虑从脑海里拿走。" —— Ronn</p>
        <div className="entry-meta">
          <span>By Admin</span>
          <span>
            <time className="entry-date">2025/8/25</time>
          </span>
          <span className="cat-links">未分类</span>
          <a className="readmore" href="#">Read more</a>
        </div>
      </div>

      <div className="content">
        <div id="sidebar">
          <aside>
            <h6>Recent Posts</h6>
            <ul>
              <li>
                <a href="#">用户体验全流程（编辑中）</a>
              </li>
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
    </div>
  )
}

export default BlogPage
