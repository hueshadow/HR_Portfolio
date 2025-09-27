import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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

  const handleBackToPortfolio = () => {
    navigate('/')
    onPageChange('portfolio')
  }

  if (!item) {
    return (
      <div className="portfolio-detail-wrapper">
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
    <div className="portfolio-detail-wrapper">
      <div className="page-header c12">
        <div className="header-top">
          <button onClick={handleBackToPortfolio} className="back-button">
            <i className="fas fa-arrow-left"></i> 返回
          </button>
          <h1 data-value="PROJECT DETAIL">PROJECT DETAIL</h1>
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
          <div className="project-header">
            <h2>{item.title}</h2>
            <div className="project-meta">
              <span className="category">{item.category.toUpperCase()}</span>
              {item.featured && <span className="featured">⭐ FEATURED</span>}
            </div>
          </div>

          <div className="project-description">
            <h3>Project Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="project-technologies">
            <h3>Technologies Used</h3>
            <div className="tech-tags">
              {item.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-links">
            <h3>Project Links</h3>
            <div className="links">
              {item.projectUrl && (
                <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fas fa-external-link-alt"></i> View Project
                </a>
              )}
              {item.githubUrl && (
                <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  <i className="fab fa-github"></i> View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .portfolio-detail-wrapper {
          background: var(--page-bg-color, #f7f6f1);
          min-height: 100vh;
          color: #333;
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
          position: absolute;
          bottom: 0;
          width: 0%;
          margin: 0;
          border-top: 1px solid var(--px-theme-clr);
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
          padding: 8px 16px 8px 0;
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
          }

          .page-header h1 {
            position: relative;
            bottom: auto;
          }

          .page-header hr {
            width: calc(100% - 40px);
          }

          .back-button {
            position: relative;
            top: auto;
            right: auto;
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

        .project-description h3 {
          margin: 0 0 15px 0;
          font-size: 20px;
          font-weight: 600;
        }

        .project-description p {
          line-height: 1.8;
          color: #555;
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

        .project-links h3 {
          margin: 0 0 15px 0;
          font-size: 20px;
          font-weight: 600;
        }

        .links {
          display: flex;
          gap: 15px;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
          text-decoration: none;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }

        .project-link:hover {
          background: #ff5252;
          color: white;
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