export const TAB_PATHS: Record<string, string> = {
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  flow: '/flow',
  contact: '/contact',
}

export const TAB_IDS = Object.keys(TAB_PATHS)

export function pathForTab(tabId: string): string {
  return TAB_PATHS[tabId] ?? '/'
}

export function tabFromPath(pathname: string): string | null {
  if (pathname === '/' || pathname === '/home') return 'home'
  if (pathname === '/about') return 'about'
  if (pathname === '/portfolio') return 'portfolio'
  if (pathname === '/flow') return 'flow'
  if (pathname === '/contact') return 'contact'
  return null
}

export function tabFromHost(hostname: string): string | null {
  const host = hostname.split(':')[0].toLowerCase()
  const sub = host.split('.')[0]
  if (sub === 'www' || sub === 'hueshadow' || sub === 'localhost' || sub === '127') {
    return null
  }
  if (TAB_IDS.includes(sub)) return sub
  return null
}

export function tabFromLocation(pathname: string, hostname?: string): string {
  return tabFromPath(pathname) ?? (hostname ? tabFromHost(hostname) : null) ?? 'home'
}

export function isTabDetailPath(pathname: string): boolean {
  return (
    /^\/portfolio\/[^/]+/.test(pathname) ||
    /^\/flow\/[^/]+/.test(pathname) ||
    /^\/blog\/[^/]+/.test(pathname)
  )
}
