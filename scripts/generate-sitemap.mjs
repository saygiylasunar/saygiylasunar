import { readFileSync, writeFileSync } from 'node:fs'

const siteUrl = 'https://saygiylasunar.com'
const projects = JSON.parse(readFileSync(new URL('../src/content/projects.json', import.meta.url), 'utf8'))
const logbook = JSON.parse(readFileSync(new URL('../src/content/logbook.json', import.meta.url), 'utf8'))

const staticPaths = [
  '/',
  '/services',
  '/projects',
  '/logbook',
  '/music',
  '/experience',
  '/about',
  '/contact',
  '/tools',
  '/tools/password',
  '/tools/exif',
  '/tools/webp',
  '/tools/resize',
  '/tools/hash',
  '/tools/json',
  '/tools/contrast',
  '/arsalar',
  '/ogg',
]

const rows = [
  ...staticPaths.map((path) => ({ path })),
  ...projects
    .filter((project) => project.visibility === 'public')
    .map((project) => ({ path: `/projects/${project.slug}`, lastmod: project.updatedAt })),
  ...logbook
    .filter((entry) => entry.visibility === 'public')
    .map((entry) => ({ path: `/logbook/${entry.slug}`, lastmod: entry.updatedAt || entry.publishedAt })),
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
