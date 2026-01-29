/**
 * Portfolio Overview Page
 *
 * A minimalist portfolio landing page featuring:
 * - Top navigation with text links
 * - Left-aligned hero introduction
 * - Two-column grid layout with thin dividers
 * - Search and tag filtering (hidden, toggleable)
 * - Sort options (Featured, Newest, A-Z)
 * - Project modal preview with deep linking
 *
 * Data source: /mockup-react/src/data/portfolio.ts (portfolioManager)
 */

import './PortfolioOverview.css'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProjectModal } from './ProjectModal'
import { SeoHead } from './SeoHead'
import {
  getProcessedProjects,
  getAllTags,
  groupProjectsIntoRows
} from '../utils/projectsIndex'
import type { ProjectIndex, SortOption } from '../types/projectsIndex'

/**
 * Navigation component - minimal text links
 */
function TopNav() {
  return (
    <nav className="po-nav">
      <a href="/" className="nav-logo">HueShadow</a>
      <div className="nav-links">
        <a href="/work">作品</a>
        <a href="/resume">简历</a>
        <a href="https://linkedin.com/in/hueshadow" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:hello@hueshadow.com">邮箱</a>
      </div>
    </nav>
  )
}

/**
 * Filter controls - minimal and collapsible
 */
interface FilterControlsProps {
  search: string
  onSearchChange: (value: string) => void
  selectedTags: string[]
  availableTags: string[]
  onTagToggle: (tag: string) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

function FilterControls({
  search,
  onSearchChange,
  selectedTags,
  availableTags,
  onTagToggle,
  sortBy,
  onSortChange
}: FilterControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="po-filter">
      <button
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        {isExpanded ? '隐藏筛选' : '显示筛选'}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points={isExpanded ? "2,8 6,4 10,8" : "2,4 6,8 10,4"} />
        </svg>
      </button>

      {isExpanded && (
        <div className="filter-panel">
          <div className="filter-row">
            <input
              type="text"
              placeholder="搜索项目..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="filter-search"
            />
            <div className="filter-tags">
              {availableTags.slice(0, 12).map(tag => (
                <button
                  key={tag}
                  className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div className="filter-sort">
            <span className="sort-label">排序：</span>
            {(['featured', 'newest', 'az'] as SortOption[]).map(option => (
              <button
                key={option}
                className={`sort-btn ${sortBy === option ? 'active' : ''}`}
                onClick={() => onSortChange(option)}
              >
                {option === 'featured' ? '精选' : option === 'newest' ? '最新' : 'A-Z'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Project card component
 */
interface ProjectCardProps {
  project: ProjectIndex
  onClick: () => void
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <article className="po-project-card" onClick={onClick}>
      <div className="project-header">
        <h3 className="project-title">{project.title}</h3>
        <span className="project-meta">
          {project.org} · {project.year}
        </span>
      </div>
      <p className="project-description">{project.oneLiner}</p>
      <div className="project-cover">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
          />
        ) : (
          <div className="project-cover-placeholder">
            <span>{project.title.charAt(0)}</span>
          </div>
        )}
      </div>
    </article>
  )
}

/**
 * Hero section with introduction
 */
function Hero() {
  return (
    <header className="po-hero">
      <p className="po-intro">
        我是一名产品设计师和开发者，专注于创造有意义的数字体验。
        目前致力于设计系统和交互式 Web 应用的开发。
        曾在华为云工作，负责数据可视化工具和开发者平台的设计。
        现居中国深圳。
      </p>
      <hr className="po-divider" />
    </header>
  )
}

/**
 * Main Portfolio Overview component
 */
export function PortfolioOverview() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [modalProject, setModalProject] = useState<ProjectIndex | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const availableTags = useMemo(() => getAllTags(), [])

  // Get processed projects
  const projects = useMemo(() => {
    return getProcessedProjects(search, selectedTags, sortBy)
  }, [search, selectedTags, sortBy])

  // Group projects into rows for 2-column grid
  const projectRows = useMemo(() => {
    return groupProjectsIntoRows(projects)
  }, [projects])

  // Handle URL param for modal
  useEffect(() => {
    const slugParam = searchParams.get('p')
    if (slugParam) {
      const slug = parseInt(slugParam, 10)
      const project = projects.find(p => p.slug === slug)
      if (project) {
        setModalProject(project)
        setIsModalOpen(true)
      }
    }
  }, [searchParams, projects])

  // Open modal
  const openModal = (project: ProjectIndex) => {
    setModalProject(project)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setModalProject(null)
  }

  // Toggle tag
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="po-page">
      <SeoHead projects={projects} />
      <TopNav />

      <main className="po-main">
        <Hero />

        <FilterControls
          search={search}
          onSearchChange={setSearch}
          selectedTags={selectedTags}
          availableTags={availableTags}
          onTagToggle={toggleTag}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="po-projects">
          {projectRows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="po-project-row">
              {row.map(project => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onClick={() => openModal(project)}
                />
              ))}
              {/* Add placeholder if odd number of projects */}
              {row.length === 1 && (
                <div className="po-project-placeholder" />
              )}
              {/* Divider between rows */}
              {rowIndex < projectRows.length - 1 && (
                <hr className="po-row-divider" />
              )}
            </div>
          ))}

          {projects.length === 0 && (
            <div className="po-empty">
              <p>未找到项目。</p>
              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch('')}
                >
                  清除搜索
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="po-footer">
        <a href="https://github.com/hueshadow" target="_blank" rel="noopener noreferrer">GitHub</a>
        <span className="footer-sep">·</span>
        <span>© {new Date().getFullYear()} HueShadow</span>
      </footer>

      <ProjectModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default PortfolioOverview
