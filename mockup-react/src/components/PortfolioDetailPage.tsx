import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { portfolioManager } from '../data/portfolio'
import type { PortfolioItem } from '../types/portfolio'

interface PortfolioDetailPageProps {
  onPageChange: (pageId: string) => void
}

const PortfolioDetailPage = ({ onPageChange }: PortfolioDetailPageProps) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [item, setItem] = useState<PortfolioItem | null>(null)

  useEffect(() => {
    if (id) {
      const foundItem = portfolioManager.getById(parseInt(id))
      setItem(foundItem || null)
    }
  }, [id])

  // 关键修复：强制启用滚动
  useEffect(() => {
    // 直接在HTML元素上设置样式，覆盖所有CSS规则
    document.documentElement.style.overflowY = 'auto'
    document.documentElement.style.height = 'auto'
    document.body.style.overflowY = 'auto'
    document.body.style.height = 'auto'

    // 清理函数
    return () => {
      // 恢复原始设置
      document.documentElement.style.overflowY = ''
      document.documentElement.style.height = ''
      document.body.style.overflowY = ''
      document.body.style.height = ''
    }
  }, [])

  const handleBackToPortfolio = () => {
    navigate('/')
    onPageChange('portfolio')
  }

  if (!item) {
    return (
      <div className="portfolio-detail-wrapper" id="portfolio-detail-page">
        <div className="page-header c12">
          <div className="header-top">
            <button onClick={handleBackToPortfolio} className="back-button">
              <i className="fas fa-arrow-left"></i> 返回
            </button>
            <h1 data-value="PROJECT DETAIL">PROJECT DETAIL</h1>
          </div>
          <hr className="enabled" />
        </div>

        <div className="portfolio-detail-default">
          <div className="not-found">
            <h2>Project Not Found</h2>
            <p>The requested portfolio item could not be found.</p>
            <button onClick={handleBackToPortfolio} className="back-to-portfolio">
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isVideo = item.category === 'video' ||
                 item.image.toLowerCase().endsWith('.mp4') ||
                 item.image.toLowerCase().endsWith('.webm') ||
                 item.image.toLowerCase().endsWith('.ogg')

  return (
    <div className="portfolio-detail-wrapper" id="portfolio-detail-page">
      <div className="page-header c12">
        <div className="header-top">
          <button onClick={handleBackToPortfolio} className="back-button">
            <i className="fas fa-arrow-left"></i> 返回
          </button>
          <h1 data-value={`${item.title} PROJECT DETAIL`}>{item.title} PROJECT DETAIL</h1>
        </div>
        <hr className="enabled" />
      </div>

      <div className="portfolio-detail-content">
        <div className="project-hero">
          <div className="project-media">
            {isVideo ? (
              <video
                src={item.image}
                controls
                autoPlay={false}
                muted={false}
                loop={false}
                playsInline
                style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover' }}
                title={item.title}
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover' }}
              />
            )}
          </div>
        </div>

        <div className="project-info">
          <div className="project-description">
            <div className="description-header">
              <h3>Project Description</h3>
              {item.projectUrl && (
                <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="view-project-link">
                  <i className="fas fa-external-link-alt"></i> View Project
                </a>
              )}
            </div>
            {item.id === 2 ? (
              <div className="design-principles-iframe-container">
                <iframe
                  src="https://design-principles-system.netlify.app/"
                  style={{
                    width: '100%',
                    height: 'calc(100vh - 280px)',
                    minHeight: '700px',
                    border: 'none'
                  }}
                  allowFullScreen
                  title={item.title}
                />
              </div>
            ) : item.embedUrl ? (
              <div className="embed-iframe-container">
                <div className="embed-iframe-aspect">
                  <iframe
                    src={item.embedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allow="fullscreen"
                    allowFullScreen
                    title={`${item.title} embed`}
                  />
                </div>
                <a
                  href={item.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="embed-open-link"
                >
                  <i className="fas fa-external-link-alt"></i> 在新窗口打开
                </a>
              </div>
            ) : (
              <div className="markdown-content">
                <ReactMarkdown
                  components={{
                    img: ({ ...props }) => (
                      <img
                        {...props}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: item.id === 3 ? '0' : '8px',
                          marginBottom: '20px',
                          boxShadow: item.id === 3 ? 'none' : '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                    )
                  }}
                >
                  {item.description}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* 关键修复：强制HTML和Body元素启用滚动 */
        html body.detail-page {
          overflow-y: auto !important;
          height: auto !important;
        }

        body.detail-page {
          overflow-y: auto !important;
          height: auto !important;
        }

        html.detail-page {
          overflow-y: auto !important;
          height: auto !important;
        }

        .portfolio-detail-wrapper {
          background: var(--page-bg-color, #f7f6f1);
          min-height: auto;
          color: #333;
          overflow-y: auto;
          height: auto;
        }

        .page-header {
          height: auto;
          min-height: 120px;
          position: relative;
          padding: 20px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .header-top {
          display: flex;
          align-items: flex-end;
          width: 100%;
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
        }

        .page-header h1 {
          position: relative;
          bottom: auto;
          margin: 0;
          font-size: clamp(24px, 4vw, 32px);
          font-weight: 600;
          line-height: 1.2;
        }

        .page-header hr {
          width: 0%;
          margin: 0;
          border-top: 1px solid var(--px-theme-clr);
          position: absolute;
          bottom: 0;
          left: 20px;
          right: 20px;
        }

        .page-header hr.enabled {
          width: calc(100% - 40px);
        }

        .back-button {
          position: relative;
          top: auto;
          right: auto;
          background: none;
          border: none;
          color: var(--px-theme-clr, #ff6b6b);
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px 12px 0;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background: transparent;
          text-decoration: underline;
        }

        @media (max-width: 960px) {
          .header-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
            position: static;
            bottom: auto;
            left: auto;
            right: auto;
          }

          .page-header h1 {
            position: relative;
            bottom: auto;
          }

          .page-header hr {
            width: calc(100% - 40px);
            position: static;
            bottom: auto;
            left: auto;
            right: auto;
            margin-top: 20px;
          }

          .back-button {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .page-header h1 {
            font-size: clamp(20px, 5vw, 24px);
          }
        }

        .portfolio-detail-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px;
          min-height: auto;
        }

        .project-hero {
          border-radius: 0;
          overflow: hidden;
        }

        .project-info {
          background: white;
          padding: 40px;
        }

        .project-header h2 {
          margin: 0 0 15px 0;
          font-size: 36px;
          font-weight: 700;
        }

        .project-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .category {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .date {
          color: #666;
          font-size: 14px;
        }

        .featured {
          background: #ffc107;
          color: #333;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .project-description {
          margin-bottom: 30px;
        }

        .description-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 15px;
        }

        .project-description h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .view-project-link {
          color: var(--px-theme-clr, #ff6b6b);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .view-project-link:hover {
          border-bottom: 1px solid #2563eb;
          color: #2563eb;
        }

        .view-project-link i {
          font-size: 12px;
        }

        .project-description p {
          line-height: 1.8;
          color: #555;
        }

        .markdown-content {
          line-height: 1.8;
          color: #555;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
          margin: 24px 0 16px 0;
          font-weight: 600;
          line-height: 1.4;
        }

        .markdown-content h1 { font-size: 28px; }
        .markdown-content h2 { font-size: 24px; }
        .markdown-content h3 { font-size: 20px; }
        .markdown-content h4 { font-size: 18px; }

        .markdown-content p {
          margin: 16px 0;
        }

        .markdown-content ul,
        .markdown-content ol {
          margin: 16px 0;
          padding-left: 32px;
        }

        .markdown-content li {
          margin: 8px 0;
        }

        .markdown-content blockquote {
          margin: 20px 0;
          padding: 16px 20px;
          background: #f8f9fa;
          border-left: 4px solid var(--px-theme-clr, #ff6b6b);
          font-style: italic;
        }

        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        .markdown-content th,
        .markdown-content td {
          padding: 16px 14px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
          vertical-align: top;
        }

        .markdown-content th {
          background: #f8f9fa;
          font-weight: 600;
          color: #555;
          border-bottom: 2px solid #dee2e6;
        }

        .markdown-content tr:last-child td {
          border-bottom: none;
        }

        .markdown-content tr:hover {
          background: #f8f9fa;
        }

        .markdown-content td strong {
          color: #2563eb;
          font-weight: 600;
        }

        .markdown-content strong {
          font-weight: 600;
          color: #333;
        }

        .markdown-content em {
          font-style: italic;
          color: #666;
        }

        .markdown-content h1 {
          border-bottom: 3px solid var(--px-theme-clr, #ff6b6b);
          padding-bottom: 8px;
          margin-bottom: 24px;
        }

        .markdown-content h2 {
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 6px;
          margin-bottom: 20px;
        }

        .markdown-content h3 {
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 4px;
          margin-bottom: 16px;
        }

        .markdown-content hr {
          border: none;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--px-theme-clr, #ff6b6b), transparent);
          margin: 32px 0;
        }

        .markdown-content code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.9em;
        }

        .markdown-content p > strong {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 500;
          margin: 8px 0;
        }

        .markdown-content pre {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 20px 0;
        }

        .markdown-content pre code {
          background: none;
          padding: 0;
        }

        /* Design System Showcase Container */
        .design-system-showcase-container {
          padding: 20px 0;
        }

        .design-system-showcase-container .design-system-showcase {
          background: transparent;
        }

        .design-system-showcase-container .design-system-showcase h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: var(--px-theme-clr, #ff6b6b);
        }

        .design-system-showcase-container .design-system-content {
          margin-top: 20px;
        }

        /* Design Principles iframe Container */
        .design-principles-iframe-container {
          width: 100%;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .design-principles-iframe-container iframe {
          display: block;
          width: 100%;
          height: calc(100vh - 280px);
          min-height: 700px;
          border: none;
        }

        .embed-iframe-container {
          width: 100%;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .embed-iframe-aspect {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #fff;
        }

        .embed-iframe-aspect iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .embed-open-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          color: var(--px-theme-clr, #ff6b6b);
          text-decoration: none;
          font-weight: 600;
        }

        .embed-open-link:hover {
          text-decoration: underline;
        }


        @media (max-width: 768px) {
          .markdown-content {
            font-size: 16px;
          }

          .markdown-content h1 { font-size: 24px; }
          .markdown-content h2 { font-size: 22px; }
          .markdown-content h3 { font-size: 18px; }
          .markdown-content h4 { font-size: 16px; }
        }

        .project-technologies {
          margin-bottom: 30px;
        }

        .project-technologies h3 {
          margin: 0 0 15px 0;
          font-size: 20px;
          font-weight: 600;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tech-tag {
          background: #f0f0f0;
          color: #333;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
        }


        .not-found {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .not-found h2 {
          margin: 0 0 15px 0;
          color: #333;
        }

        .not-found p {
          margin: 0 0 30px 0;
          color: #666;
        }

        .back-to-portfolio {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .back-to-portfolio:hover {
          background: #ff5252;
        }

        @media (max-width: 768px) {
          .project-info {
            padding: 30px 20px;
          }

          .project-header h2 {
            font-size: 28px;
          }

          .links {
            flex-direction: column;
          }

          .project-link {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default PortfolioDetailPage