/**
 * Projects Index Generator
 *
 * Generates a clean project index from portfolio data source.
 * Data source: /mockup-react/src/data/portfolio.ts (portfolioManager)
 *
 * To add a new project:
 * 1. Add an entry to initialPortfolioItems in /mockup-react/src/data/portfolio.ts
 * 2. Ensure the following fields are populated:
 *    - title: Project name
 *    - description: Project description (will be truncated for oneLiner)
 *    - thumb: Cover image URL
 *    - projectDate: Date string (YYYY-MM-DD)
 *    - technologies: Array of tech tags
 *    - projectUrl: Project URL (used to extract org name)
 */

import { portfolioManager } from '../data/portfolio'
import type { ProjectIndex, SortOption } from '../types/projectsIndex'

/**
 * Extract organization name from project URL
 */
function extractOrgFromUrl(url?: string): string {
  if (!url) return 'Personal Project'

  try {
    const hostname = new URL(url).hostname
    // Common patterns for company extraction
    if (hostname.includes('huawei')) return 'Huawei'
    if (hostname.includes('36kr')) return '36Kr'
    if (hostname.includes('netlify')) return 'Personal'
    if (hostname.includes('github')) return 'GitHub'
    if (hostname.includes('bilibili')) return 'Bilibili'

    // Extract subdomain or main domain
    const parts = hostname.split('.')
    if (parts.length >= 2) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    }
    return hostname
  } catch {
    return 'Personal Project'
  }
}

/**
 * Extract year from date string
 */
function extractYear(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return '2024'
    return date.getFullYear().toString()
  } catch {
    return '2024'
  }
}

/**
 * Clean and truncate description to one-liner
 */
function extractOneLiner(description: string, maxLength: number = 120): string {
  // Remove markdown syntax
  let cleaned = description
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/[#*_`]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  // Truncate if needed
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
  }

  return cleaned || 'A creative project showcase'
}

/**
 * Generate a project index entry from PortfolioItem
 */
function generateProjectIndex(item: Parameters<typeof portfolioManager.getById>[0]): ProjectIndex {
  return {
    slug: item.id,
    title: item.title,
    oneLiner: extractOneLiner(item.description),
    year: extractYear(item.projectDate),
    org: extractOrgFromUrl(item.projectUrl),
    role: item.technologies?.[0] || 'Developer',
    tags: item.technologies || [],
    coverImage: item.thumb || item.image || '',
    href: `/portfolio/${item.id}`,
    featured: item.featured,
    category: item.category
  }
}

/**
 * Get all projects as index entries
 */
export function getProjectsIndex(): ProjectIndex[] {
  const items = portfolioManager.getAll()
  return items.map(item => generateProjectIndex(item))
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): ProjectIndex[] {
  return getProjectsIndex().filter(p => p.featured)
}

/**
 * Sort projects by different criteria
 */
function sortProjects(projects: ProjectIndex[], sortBy: SortOption): ProjectIndex[] {
  const sorted = [...projects]

  switch (sortBy) {
    case 'featured':
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    case 'newest':
      return sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year))
    case 'oldest':
      return sorted.sort((a, b) => parseInt(a.year) - parseInt(b.year))
    case 'az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}

/**
 * Filter projects by search query and tags
 */
export function filterProjects(
  projects: ProjectIndex[],
  search: string,
  selectedTags: string[]
): ProjectIndex[] {
  let filtered = projects

  // Filter by search
  if (search.trim()) {
    const query = search.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.oneLiner.toLowerCase().includes(query) ||
      p.org.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    )
  }

  // Filter by tags
  if (selectedTags.length > 0) {
    filtered = filtered.filter(p =>
      selectedTags.some(tag => p.tags.includes(tag))
    )
  }

  return filtered
}

/**
 * Get all unique tags from projects
 */
export function getAllTags(): string[] {
  const projects = getProjectsIndex()
  const tagsSet = new Set<string>()

  projects.forEach(p => {
    p.tags.forEach(tag => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

/**
 * Group projects into rows of 2 for the 2-column grid layout
 */
export function groupProjectsIntoRows(projects: ProjectIndex[]): ProjectIndex[][] {
  const rows: ProjectIndex[][] = []

  for (let i = 0; i < projects.length; i += 2) {
    const row: ProjectIndex[] = []
    if (projects[i]) row.push(projects[i])
    if (projects[i + 1]) row.push(projects[i + 1])
    if (row.length > 0) rows.push(row)
  }

  return rows
}

/**
 * Get sorted and filtered projects ready for display
 */
export function getProcessedProjects(
  search: string = '',
  selectedTags: string[] = [],
  sortBy: SortOption = 'featured'
): ProjectIndex[] {
  const projects = getProjectsIndex()
  const filtered = filterProjects(projects, search, selectedTags)
  return sortProjects(filtered, sortBy)
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: number): ProjectIndex | undefined {
  return getProjectsIndex().find(p => p.slug === slug)
}
