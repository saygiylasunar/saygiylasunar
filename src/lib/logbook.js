import DOMPurify from 'dompurify'
import { marked } from 'marked'
import records from '../content/logbook.json'

const markdownSources = import.meta.glob('../content/logbook/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const logbookEntries = records
  .filter((entry) => entry.visibility === 'public')
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))

export function getLogbookEntry(slug) {
  return logbookEntries.find((entry) => entry.slug === slug)
}

export function getLogbookMarkdown(slug) {
  const key = Object.keys(markdownSources).find((path) => path.endsWith(`/${slug}.md`))
  return key ? markdownSources[key] : ''
}

export function renderLogbookEntry(slug) {
  const source = getLogbookMarkdown(slug)
  if (!source) return ''
  return DOMPurify.sanitize(marked.parse(source))
}
