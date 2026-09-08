import DOMPurify from 'dompurify'
import { marked } from 'marked'

const caseSources = import.meta.glob('../content/project-cases/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export function getProjectCaseMarkdown(slug) {
  const key = Object.keys(caseSources).find((path) => path.endsWith(`/${slug}.md`))
  return key ? caseSources[key] : ''
}

export function renderProjectCase(slug) {
  const source = getProjectCaseMarkdown(slug)
  if (!source) return ''
  return DOMPurify.sanitize(marked.parse(source))
}

export function hasProjectCase(slug) {
  return Boolean(getProjectCaseMarkdown(slug))
}
