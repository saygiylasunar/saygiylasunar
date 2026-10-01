import seo from '../content/seo.json'
import { getProject, getService, site } from './content.js'
import { getBlogEntry, blogEntries } from './blog.js'
import { oggLessons } from '../content/oggLessonsFull.js'
import { localize } from './locale.js'

const SITE_URL = 'https://saygiylasunar.com'
const SITE_NAME = 'Ersen Filiz · Saygıyla Sunar'
const PERSON_ID = `${SITE_URL}/#ersen-filiz`

const toolRoutes = new Set(['password', 'exif', 'webp', 'resize', 'hash', 'json', 'contrast'])

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
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

function setStructuredData(data) {
  let script = document.head.querySelector('#route-structured-data')
  if (!data) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.id = 'route-structured-data'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data).replaceAll('<', '\\u003c')
}

function clearArticleMeta() {
  for (const key of ['article:published_time', 'article:modified_time', 'article:section']) {
    setMeta('property', key, '')
  }
  document.head.querySelectorAll('meta[property="article:tag"]').forEach((node) => node.remove())
}

function addArticleTags(tags = []) {
  document.head.querySelectorAll('meta[property="article:tag"]').forEach((node) => node.remove())
  for (const tag of tags) {
    const element = document.createElement('meta')
    element.setAttribute('property', 'article:tag')
    element.setAttribute('content', tag)
    document.head.appendChild(element)
  }
}

function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

function sameAs() {
  return [
    site.profiles?.github,
    site.profiles?.linkedin,
    site.profiles?.youtube,
    site.profiles?.instagram,
    site.profiles?.tiktok,
    site.profiles?.x,
    site.music?.spotify,
  ].filter(Boolean)
}

function staticRecord(route, localeValue) {
  const key = route.meta.seoKey || route.name || 'home'
  return seo[localeValue]?.[key] || seo[localeValue]?.home
}

function dynamicRecord(route, localeValue) {
  const homeName = localeValue === 'tr' ? 'Ana Sayfa' : 'Home'

  if (route.name === 'project-detail') {
    const project = getProject(route.params.slug)
    if (!project) return null
    const title = localize(project.title)
    const description = localize(project.summary)
    return {
      title,
      description,
      type: 'website',
      structured: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CreativeWork',
            '@id': `${SITE_URL}/projects/${project.slug}#work`,
            name: title,
            description,
            url: `${SITE_URL}/projects/${project.slug}`,
            creator: { '@id': PERSON_ID },
            dateCreated: project.year,
            keywords: project.technologies || [],
          },
          breadcrumb([
            { name: homeName, path: '/' },
            { name: localeValue === 'tr' ? 'Projeler' : 'Projects', path: '/projects' },
            { name: title, path: `/projects/${project.slug}` },
          ]),
        ],
      },
    }
  }

  if (route.name === 'service-detail') {
    const service = getService(route.params.slug)
    if (!service) return null
    const title = localize(service.title)
    const description = localize(service.short)
    return {
      title,
      description,
      type: 'website',
      structured: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Service',
            name: title,
            description,
            provider: { '@id': PERSON_ID },
            url: `${SITE_URL}/services/${service.slug}`,
          },
          breadcrumb([
            { name: homeName, path: '/' },
            { name: localeValue === 'tr' ? 'Hizmetler' : 'Services', path: '/services' },
            { name: title, path: `/services/${service.slug}` },
          ]),
        ],
      },
    }
  }

  if (route.name === 'blog-detail') {
    const entry = getBlogEntry(route.params.slug)
    if (!entry) return null
    const title = localize(entry.title)
    const description = localize(entry.description)
    return {
      title,
      description,
      type: 'article',
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt,
      section: localize(entry.category),
      tags: entry.tags || [],
      structured: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: title,
            description,
            datePublished: entry.publishedAt,
            dateModified: entry.updatedAt || entry.publishedAt,
            author: { '@id': PERSON_ID },
            mainEntityOfPage: `${SITE_URL}/blog/${entry.slug}`,
            keywords: entry.tags || [],
            inLanguage: entry.language || localeValue,
          },
          breadcrumb([
            { name: homeName, path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: title, path: `/blog/${entry.slug}` },
          ]),
        ],
      },
    }
  }

  if (route.name === 'ogg-lesson') {
    const lesson = oggLessons.find((item) => item.slug === route.params.slug)
    if (!lesson) return null
    const title = `${lesson.title} · ÖGG Ders Notları`
    const description = `${lesson.title} dersi için ${lesson.categories.length} ana konu başlığında düzenlenmiş ÖGG çalışma notları; sınav ifadeleri, açıklamalar ve doğrulama kaynakları.`
    return {
      title,
      description,
      type: 'article',
      structured: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: title,
            description,
            author: { '@id': PERSON_ID },
            mainEntityOfPage: `${SITE_URL}/ogg/${lesson.slug}`,
            about: lesson.categories.map((category) => category.title),
            inLanguage: 'tr',
          },
          breadcrumb([
            { name: homeName, path: '/' },
            { name: 'ÖGG', path: '/ogg' },
            { name: lesson.title, path: `/ogg/${lesson.slug}` },
          ]),
        ],
      },
    }
  }

  return null
}

function structuredForStatic(route, localeValue, record) {
  const homeName = localeValue === 'tr' ? 'Ana Sayfa' : 'Home'

  if (route.name === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': PERSON_ID,
          name: 'Ersen Filiz',
          alternateName: 'Saygıyla Sunar',
          url: SITE_URL,
          jobTitle: localeValue === 'tr' ? 'Bilgisayar Mühendisi' : 'Computer Engineer',
          sameAs: sameAs(),
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          author: { '@id': PERSON_ID },
          inLanguage: ['tr', 'en'],
        },
      ],
    }
  }

  if (route.name === 'blog') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: record.title,
          description: record.description,
          url: `${SITE_URL}/blog`,
          author: { '@id': PERSON_ID },
          hasPart: blogEntries.map((entry) => ({
            '@type': 'BlogPosting',
            headline: localize(entry.title),
            url: `${SITE_URL}/blog/${entry.slug}`,
          })),
        },
        breadcrumb([{ name: homeName, path: '/' }, { name: 'Blog', path: '/blog' }]),
      ],
    }
  }

  if (route.name === 'ogg') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: record.title,
          description: record.description,
          url: `${SITE_URL}/ogg`,
          hasPart: oggLessons.map((lesson) => ({
            '@type': 'Article',
            headline: lesson.title,
            url: `${SITE_URL}/ogg/${lesson.slug}`,
          })),
        },
        breadcrumb([{ name: homeName, path: '/' }, { name: 'ÖGG', path: '/ogg' }]),
      ],
    }
  }

  if (toolRoutes.has(route.name)) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: record.title,
      description: record.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      url: `${SITE_URL}${route.path}`,
      author: { '@id': PERSON_ID },
    }
  }

  if (route.name !== 'not-found') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: record.title,
      description: record.description,
      url: `${SITE_URL}${route.path}`,
      author: { '@id': PERSON_ID },
    }
  }

  return null
}

export function applyRouteSeo(route, localeValue = 'tr') {
  const record = dynamicRecord(route, localeValue) || staticRecord(route, localeValue)
  if (!record) return

  const isHome = route.name === 'home'
  const title = isHome ? record.title : `${record.title} — Saygıyla Sunar`
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`

  document.title = title
  document.documentElement.lang = localeValue

  setMeta('name', 'description', record.description)
  setMeta('name', 'author', 'Ersen Filiz')
  setMeta('name', 'robots', route.meta.noindex ? 'noindex, nofollow' : 'index, follow')
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', record.description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:type', record.type || 'website')
  setMeta('property', 'og:site_name', SITE_NAME)
  setMeta('property', 'og:locale', localeValue === 'tr' ? 'tr_TR' : 'en_US')
  setMeta('name', 'twitter:card', 'summary')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', record.description)

  clearArticleMeta()
  if (record.type === 'article') {
    setMeta('property', 'article:published_time', record.publishedTime || '')
    setMeta('property', 'article:modified_time', record.modifiedTime || '')
    setMeta('property', 'article:section', record.section || '')
    addArticleTags(record.tags)
  }

  setCanonical(canonical)
  setStructuredData(record.structured || structuredForStatic(route, localeValue, record))
}
