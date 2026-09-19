import type { BriefingItem, SectionKey } from './briefings'
import { coverOverrides } from './coverOverrides'

export function coverKey(date: string, title: string): string {
  return `${date}::${title}`
}

/** Product thumbs come only from the overlay. Bot `image:` fields are ignored. */
export function resolveCover(
  date: string,
  item: BriefingItem,
  section: SectionKey,
): string | undefined {
  if (section === 'todos') return undefined
  return coverOverrides[coverKey(date, item.title)]
}
