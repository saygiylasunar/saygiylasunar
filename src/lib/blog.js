import DOMPurify from 'dompurify'
import { marked } from 'marked'
import records from '../content/blog.json'
import { blogSections } from '../content/blogSections.js'

const markdownSources = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const blogEntries = records
  .filter((entry) => entry.visibility === 'public')
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

export { blogSections }

export function getBlogEntry(slug) {
  return blogEntries.find((entry) => entry.slug === slug)
}

export function getBlogMarkdown(slug) {
  const key = Object.keys(markdownSources).find((path) => path.endsWith(`/${slug}.md`))
  return key ? markdownSources[key] : ''
}

export function renderBlogEntry(slug) {
  const source = getBlogMarkdown(slug)
  if (!source) return ''
  return DOMPurify.sanitize(marked.parse(source))
}

export function getBlogSection(slug) {
  return blogSections.find((section) => section.slug === slug)
}
