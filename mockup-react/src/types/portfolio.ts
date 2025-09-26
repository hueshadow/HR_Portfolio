export interface PortfolioItem {
  id: number
  category: string
  title: string
  description: string
  image: string
  thumb: string
  technologies: string[]
  projectDate: string
  featured: boolean
  projectUrl?: string
  githubUrl?: string
  createdAt: string
  updatedAt: string
}