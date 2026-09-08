import seo from '../content/seo.json'
import { getProject, getService } from './content.js'
import { getLogbookEntry } from './logbook.js'
import { localize } from './locale.js'

const SITE_URL = 'https://saygiylasunar.com'
const SITE_NAME = 'Ersen Filiz · Saygıyla Sunar'

function setMeta(attribute, key, value) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)

  if (!value) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', value)
}

function setCanonical(url) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function clearArticleTags() {
  document.head.querySelectorAll('meta[property="article:tag"]').forEach((node) => node.remove())
}

function addArticleTags(tags = []) {
  clearArticleTags()
  for (const tag of tags) {
    const meta = document.createElement('meta')
    meta.setAttribute('property', 'article:tag')
    meta.setAttribute('content', tag)
    document.head.appendChild(meta)
  }
}

function staticSeo(route, localeValue) {
  const key = route.meta.seoKey || route.name || 'home'
  return seo[localeValue]?.[key] || seo[localeValue]?.home
}

function dynamicSeo(route, localeValue) {
  if (route.name === 'project-detail') {
    const project = getProject(route.params.slug)
    if (!project) return null
    return {
      title: localize(project.title),
      description: localize(project.seo?.description) || localize(project.summary),
      image: project.ogImage || '',
      type: 'website',
    }
  }

  if (route.name === 'service-detail') {
    const service = getService(route.params.slug)
    if (!service) return null
    return {
      title: localize(service.title),
      description: localize(service.short) || staticSeo(route, localeValue).description,
      image: service.ogImage || '',
      type: 'website',
    }
  }

  if (route.name === 'logbook-detail') {
    const entry = getLogbookEntry(route.params.slug)
    if (!entry) return null
    return {
      title: localize(entry.title),
      description: localize(entry.description),
      image: entry.ogImage || '',
      type: 'article',
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt,
      section: localize(entry.category),
      tags: entry.tags || [],
    }
  }

  return null
}

export function applyRouteSeo(route, localeValue = 'tr') {
  const record = dynamicSeo(route, localeValue) || staticSeo(route, localeValue)
  if (!record) return

  const isHome = route.name === 'home'
  const title = isHome || record.title.includes(SITE_NAME)
    ? record.title
    : `${record.title} — ${SITE_NAME}`
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`
  const absoluteImage = record.image
    ? (record.image.startsWith('http') ? record.image : `${SITE_URL}${record.image}`)
    : ''

  document.title = title
  setMeta('name', 'description', record.description)
  setMeta('name', 'robots', route.meta.noindex ? 'noindex, nofollow' : 'index, follow')
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', record.description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:type', record.type || 'website')
  setMeta('property', 'og:site_name', SITE_NAME)
  setMeta('property', 'og:locale', localeValue === 'tr' ? 'tr_TR' : 'en_US')
  setMeta('property', 'og:image', absoluteImage)
  setMeta('name', 'twitter:card', absoluteImage ? 'summary_large_image' : 'summary')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', record.description)
  setMeta('name', 'twitter:image', absoluteImage)
  setMeta('property', 'article:published_time', record.publishedTime || '')
  setMeta('property', 'article:modified_time', record.modifiedTime || '')
  setMeta('property', 'article:section', record.section || '')
  if (record.type === 'article') addArticleTags(record.tags)
  else clearArticleTags()
  setCanonical(canonical)
}
