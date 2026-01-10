/**
 * Projects Index Type Definitions
 *
 * Data source: /mockup-react/src/data/portfolio.ts (portfolioManager)
 * To add a new project, add an entry to the initialPortfolioItems array in portfolio.ts
 * with the required fields defined in PortfolioItem interface.
 */

/**
 * Project index entry - extracted from PortfolioItem for the overview page
 */
export interface ProjectIndex {
  /** Unique identifier (from PortfolioItem.id) */
  slug: number
  /** Project title */
  title: string
  /** One-sentence description (50-120 chars) - extracted from description */
  oneLiner: string
  /** Year or date range (e.g., "2024", "2018–2019") - from projectDate */
  year: string
  /** Organization/company name - extracted from project URL or use a default */
  org: string
  /** Role in the project - use technologies as fallback */
  role: string
  /** Tags for filtering - from technologies */
  tags: string[]
  /** Cover image URL - from thumb (with video fallback) */
  coverImage: string
  /** Link to project detail - /portfolio/:id */
  href: string
  /** Whether this is a featured project */
  featured: boolean
  /** Project category (image/video/3d) */
  category: string
}

/**
 * Sort options for the projects index
 */
export type SortOption = 'featured' | 'newest' | 'oldest' | 'az'

/**
 * Filter state for the projects index
 */
export interface FilterState {
  search: string
  tags: string[]
  sortBy: SortOption
}
