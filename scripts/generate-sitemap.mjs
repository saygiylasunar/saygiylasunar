import { readFileSync, writeFileSync } from 'node:fs'
import { oggLessons } from '../src/content/oggLessonsFull.js'

const siteUrl = 'https://saygiylasunar.com'
const projects = JSON.parse(readFileSync(new URL('../src/content/projects.json', import.meta.url), 'utf8'))
const services = JSON.parse(readFileSync(new URL('../src/content/services.json', import.meta.url), 'utf8'))
const blog = JSON.parse(readFileSync(new URL('../src/content/blog.json', import.meta.url), 'utf8'))

const staticPaths = [
  '/', '/services', '/projects', '/blog', '/music', '/experience', '/about', '/contact',
  '/tools', '/tools/password', '/tools/exif', '/tools/webp', '/tools/resize',
  '/tools/hash', '/tools/json', '/tools/contrast', '/arsalar', '/ogg',
]

const rows = [
  ...staticPaths.map((path) => ({ path })),
  ...services.map((item) => ({ path: `/services/${item.slug}` })),
  ...projects.map((item) => ({ path: `/projects/${item.slug}` })),
  ...blog
    .filter((item) => item.visibility === 'public')
    .map((item) => ({ path: `/blog/${item.slug}`, lastmod: item.updatedAt || item.publishedAt })),
  ...oggLessons.map((lesson) => ({ path: `/ogg/${lesson.slug}` })),
]

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

const body = rows.map(({ path, lastmod }) => {
  const loc = path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : '',
    '  </url>',
  ].filter(Boolean).join('\n')
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`Generated sitemap with ${rows.length} URLs.`)
