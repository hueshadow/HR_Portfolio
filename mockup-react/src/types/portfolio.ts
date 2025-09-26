export interface PortfolioItem {
  id: number
  category: 'image' | 'video' | '3d'
  title: string
  description: string
  image: string
  thumb: string
  technologies: string[]
  projectDate: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface PortfolioFormData {
  id?: number
  category: 'image' | 'video' | '3d'
  title: string
  description: string
  technologies: string[]
  projectDate: string
  projectUrl?: string
  githubUrl?: string
  featured: boolean
}