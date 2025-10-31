import type { PortfolioItem } from '../types/portfolio'
import type { Project } from '../dataProvider'

/**
 * Portfolio Sync Utility
 *
 * This utility handles synchronization between the hardcoded portfolio data
 * and the admin system localStorage data.
 */

export interface SyncResult {
  success: boolean
  synced: number
  skipped: number
  errors: string[]
  duplicates: Project[]
}

export interface DuplicateInfo {
  existing: Project
  incoming: PortfolioItem
  conflictType: 'title' | 'description' | 'both'
}

/**
 * Transform PortfolioItem to Project interface
 */
export function transformPortfolioItem(portfolioItem: PortfolioItem): Project {
  return {
    id: portfolioItem.id.toString(),
    title: portfolioItem.title,
    description: portfolioItem.description,
    category: portfolioItem.category,
    date: portfolioItem.projectDate,
    featured: portfolioItem.featured || false,
    projectUrl: portfolioItem.projectUrl || '',
    githubUrl: portfolioItem.githubUrl || '',
    image: portfolioItem.image || '',
    thumb: portfolioItem.thumb || '',
    video: portfolioItem.video || '',
    tags: portfolioItem.technologies || [],
    createdAt: portfolioItem.createdAt || new Date().toISOString(),
    updatedAt: portfolioItem.updatedAt || new Date().toISOString()
  }
}

/**
 * Validate required fields in transformed project data
 */
export function validateProject(project: Project): string[] {
  const errors: string[] = []

  if (!project.title?.trim()) {
    errors.push('项目标题是必填项')
  }

  if (!project.description?.trim()) {
    errors.push('项目描述是必填项')
  }

  if (!project.category?.trim()) {
    errors.push('项目分类是必填项')
  }

  if (!project.date?.trim()) {
    errors.push('项目日期是必填项')
  }

  return errors
}

/**
 * Detect duplicate projects based on title and description
 */
export function detectDuplicates(
  portfolioItems: PortfolioItem[],
  existingProjects: Project[]
): DuplicateInfo[] {
  const duplicates: DuplicateInfo[] = []

  for (const portfolioItem of portfolioItems) {
    for (const existingProject of existingProjects) {
      const titleMatch = portfolioItem.title.toLowerCase() === existingProject.title.toLowerCase()
      const descMatch = portfolioItem.description.substring(0, 100).toLowerCase() ===
                       existingProject.description.substring(0, 100).toLowerCase()

      if (titleMatch || descMatch) {
        duplicates.push({
          existing: existingProject,
          incoming: portfolioItem,
          conflictType: titleMatch && descMatch ? 'both' : titleMatch ? 'title' : 'description'
        })
      }
    }
  }

  return duplicates
}

/**
 * Get existing projects from localStorage
 */
export function getExistingProjects(): Project[] {
  try {
    const data = localStorage.getItem('projectsData')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to load existing projects:', error)
    return []
  }
}

/**
 * Save projects to localStorage
 */
export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem('projectsData', JSON.stringify(projects))
  } catch (error) {
    console.error('Failed to save projects:', error)
    throw new Error('保存项目数据失败')
  }
}

/**
 * Sync portfolio items to admin system
 */
export async function syncPortfolioToAdmin(
  portfolioItems: PortfolioItem[],
  options: {
    skipDuplicates?: boolean
    mergeDuplicates?: boolean
  } = {}
): Promise<SyncResult> {
  const result: SyncResult = {
    success: false,
    synced: 0,
    skipped: 0,
    errors: [],
    duplicates: []
  }

  try {
    const existingProjects = getExistingProjects()

    // Detect duplicates
    const duplicates = detectDuplicates(portfolioItems, existingProjects)
    result.duplicates = duplicates.map(d => d.existing)

    let itemsToSync = portfolioItems

    // Handle duplicates based on options
    if (duplicates.length > 0) {
      if (options.skipDuplicates) {
        // Skip duplicate items
        const duplicateIds = new Set(duplicates.map(d => d.incoming.id))
        itemsToSync = portfolioItems.filter(item => !duplicateIds.has(item.id))
        result.skipped = duplicates.length
      } else if (options.mergeDuplicates) {
        // Merge duplicates (prefer existing data, fill missing fields)
        for (const duplicate of duplicates) {
          const existingProject = duplicate.existing
          const incomingItem = duplicate.incoming

          // Fill missing fields in existing project
          if (!existingProject.projectUrl && incomingItem.projectUrl) {
            existingProject.projectUrl = incomingItem.projectUrl
          }
          if (!existingProject.githubUrl && incomingItem.githubUrl) {
            existingProject.githubUrl = incomingItem.githubUrl
          }
          if (!existingProject.image && incomingItem.image) {
            existingProject.image = incomingItem.image
          }
          if (!existingProject.thumb && incomingItem.thumb) {
            existingProject.thumb = incomingItem.thumb
          }
          if ((!existingProject.tags || existingProject.tags.length === 0) && incomingItem.technologies) {
            existingProject.tags = incomingItem.technologies
          }

          existingProject.updatedAt = new Date().toISOString()
        }

        // Remove duplicate items from sync queue
        const duplicateIds = new Set(duplicates.map(d => d.incoming.id))
        itemsToSync = portfolioItems.filter(item => !duplicateIds.has(item.id))
        result.skipped = duplicates.length
      }
    }

    // Transform and validate items
    const transformedItems: Project[] = []
    for (const item of itemsToSync) {
      const transformed = transformPortfolioItem(item)
      const validationErrors = validateProject(transformed)

      if (validationErrors.length > 0) {
        result.errors.push(`项目 "${item.title}": ${validationErrors.join(', ')}`)
        continue
      }

      transformedItems.push(transformed)
    }

    // Save all projects (existing + new)
    const allProjects = [...existingProjects, ...transformedItems]
    saveProjects(allProjects)

    result.synced = transformedItems.length
    result.success = true

  } catch (error) {
    result.success = false
    result.errors.push(error instanceof Error ? error.message : '同步过程中发生未知错误')
  }

  return result
}

/**
 * Check if portfolio has been synced to admin system
 */
export function hasPortfolioBeenSynced(): boolean {
  try {
    const syncStatus = localStorage.getItem('portfolioSyncStatus')
    if (!syncStatus) return false

    const status = JSON.parse(syncStatus)
    return status.synced === true && status.projectCount > 0
  } catch {
    return false
  }
}

/**
 * Mark portfolio as synced
 */
export function markPortfolioAsSynced(projectCount: number): void {
  try {
    localStorage.setItem('portfolioSyncStatus', JSON.stringify({
      synced: true,
      projectCount,
      syncDate: new Date().toISOString()
    }))
  } catch (error) {
    console.error('Failed to save sync status:', error)
  }
}

/**
 * Get sync status information
 */
export function getSyncStatus(): {
  synced: boolean
  projectCount?: number
  syncDate?: string
} {
  try {
    const syncStatus = localStorage.getItem('portfolioSyncStatus')
    return syncStatus ? JSON.parse(syncStatus) : { synced: false }
  } catch {
    return { synced: false }
  }
}