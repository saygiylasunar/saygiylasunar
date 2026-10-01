import { existsSync, readFileSync } from 'node:fs'
import projects from '../src/content/projects.json' with { type: 'json' }
import services from '../src/content/services.json' with { type: 'json' }
import blog from '../src/content/blog.json' with { type: 'json' }
import seo from '../src/content/seo.json' with { type: 'json' }
import site from '../src/content/site.json' with { type: 'json' }
import { blogSections } from '../src/content/blogSections.js'

const errors = []

function unique(items, label) {
  const seen = new Set()
  for (const item of items) {
    if (!item) errors.push(`Missing ${label}.`)
    else if (seen.has(item)) errors.push(`Duplicate ${label}: ${item}`)
    seen.add(item)
  }
}

unique(projects.map((item) => item.slug), 'project slug')
unique(services.map((item) => item.slug), 'service slug')
unique(blog.map((item) => item.slug), 'blog slug')
unique(blogSections.map((item) => item.slug), 'blog section slug')

const sectionSlugs = new Set(blogSections.map((item) => item.slug))
for (const entry of blog) {
  if (!entry.title?.tr || !entry.description?.tr) errors.push(`${entry.slug}: missing Turkish title/description`)
  if (!entry.publishedAt) errors.push(`${entry.slug}: missing publishedAt`)
  if (!sectionSlugs.has(entry.section)) errors.push(`${entry.slug}: unknown blog section ${entry.section}`)
  const body = new URL(`../src/content/blog/${entry.slug}.md`, import.meta.url)
  if (entry.visibility === 'public' && !existsSync(body)) errors.push(`${entry.slug}: missing Markdown body`)
}

const requiredSeo = [
  'home','services','projects','blog','music','experience','about','contact',
  'tools','password','exif','webp','resize','hash','json','contrast','lands','ogg','notFound',
]
for (const locale of ['tr', 'en']) {
  for (const key of requiredSeo) {
    if (!seo[locale]?.[key]?.title || !seo[locale]?.[key]?.description) {
      errors.push(`SEO ${locale}.${key}: missing title/description`)
    }
  }
}

if (site.music?.linktree || site.profiles?.linktree) {
  errors.push('Linktree must not remain in public profile data.')
}

const publicFiles = [
  '../src/content/site.json',
  '../src/content/projects.json',
  '../src/content/services.json',
  '../src/content/blog.json',
  '../src/content/seo.json',
].map((path) => readFileSync(new URL(path, import.meta.url), 'utf8').toLocaleLowerCase('tr-TR'))

const forbidden = ['lorem ipsum', 'todo:', 'notion', 'sourcedeck', 'sourceurl']
for (const term of forbidden) {
  if (publicFiles.some((content) => content.includes(term))) errors.push(`Public content trace found: ${term}`)
}

if (errors.length) {
  console.error('Site content validation failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`Site content validation passed: ${projects.length} projects, ${services.length} services, ${blog.filter((item) => item.visibility === 'public').length} blog posts.`)
