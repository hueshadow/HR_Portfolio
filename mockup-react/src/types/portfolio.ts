export interface PortfolioItem {
  id: number
  category: string
  title: string
  description: string
  image: string
  thumb: string
  video?: string
  embedUrl?: string
  technologies: string[]
  projectDate: string
  featured: boolean
  projectUrl?: string
  githubUrl?: string
  externalOnly?: boolean
  createdAt: string
  updatedAt: string
}
