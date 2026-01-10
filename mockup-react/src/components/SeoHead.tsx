/**
 * SEO Head Component
 *
 * Sets up meta tags, Open Graph tags, and JSON-LD structured data
 * for the portfolio overview page.
 */

import { useEffect } from 'react'
import type { ProjectIndex } from '../types/projectsIndex'

interface SeoHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  projects?: ProjectIndex[]
}

export function SeoHead({
  title = 'Work | HueShadow',
  description = 'A curated collection of product design and development projects.',
  image = '/assets/img/logo.png',
  url = '/work',
  projects = []
}: SeoHeadProps) {
  const fullUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${url}`
    : url

  useEffect(() => {
    // JSON-LD structured data for CreativeWork
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description: description,
      url: fullUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          '@type': 'CreativeWork',
          position: index + 1,
          name: project.title,
          description: project.oneLiner,
          url: `${window.location.origin}${project.href}`,
          image: project.coverImage
        }))
      }
    }

    // Set document title
    document.title = title

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    // Set canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', fullUrl)

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: image }
    ]

    ogTags.forEach(({ property, content }) => {
      let metaOg = document.querySelector(`meta[property="${property}"]`)
      if (!metaOg) {
        metaOg = document.createElement('meta')
        metaOg.setAttribute('property', property)
        document.head.appendChild(metaOg)
      }
      metaOg.setAttribute('content', content)
    })

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ]

    twitterTags.forEach(({ name, content }) => {
      let metaTw = document.querySelector(`meta[name="${name}"]`)
      if (!metaTw) {
        metaTw = document.createElement('meta')
        metaTw.setAttribute('name', name)
        document.head.appendChild(metaTw)
      }
      metaTw.setAttribute('content', content)
    })

    // Inject JSON-LD
    let scriptLd = document.querySelector('script[type="application/ld+json"]')
    if (!scriptLd) {
      scriptLd = document.createElement('script')
      scriptLd.type = 'application/ld+json'
      document.head.appendChild(scriptLd)
    }
    scriptLd.textContent = JSON.stringify(jsonLd)

    // Cleanup function
    return () => {
      // Note: In SPA, we don't remove tags as they may be needed for back navigation
    }
  }, [title, description, image, fullUrl, projects])

  return null
}

export default SeoHead
