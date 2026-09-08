import { existsSync, readFileSync } from 'node:fs'

const projects = JSON.parse(readFileSync(new URL('../src/content/projects.json', import.meta.url), 'utf8'))
const logbook = JSON.parse(readFileSync(new URL('../src/content/logbook.json', import.meta.url), 'utf8'))

const errors = []
const seenProjects = new Set()

for (const project of projects) {
  if (!project.slug) errors.push('Project without slug.')
  if (seenProjects.has(project.slug)) errors.push(`Duplicate project slug: ${project.slug}`)
  seenProjects.add(project.slug)

  if (['private', 'draft'].includes(project.visibility)) {
    errors.push(`Private/draft project must not live in public projects.json: ${project.slug}`)
  }

  for (const locale of ['tr', 'en']) {
    if (!project.title?.[locale]) errors.push(`${project.slug}: missing ${locale} title`)
    if (!project.summary?.[locale]) errors.push(`${project.slug}: missing ${locale} summary`)
  }

  if (!Array.isArray(project.technologies) || !project.technologies.length) {
    errors.push(`${project.slug}: technologies must be a non-empty array`)
  }
}

const seenEntries = new Set()
for (const entry of logbook) {
  if (seenEntries.has(entry.slug)) errors.push(`Duplicate logbook slug: ${entry.slug}`)
  seenEntries.add(entry.slug)

  if (entry.visibility !== 'public') continue

  const markdown = new URL(`../src/content/logbook/${entry.slug}.md`, import.meta.url)
  if (!existsSync(markdown)) errors.push(`${entry.slug}: missing Markdown body`)

  for (const projectSlug of entry.relatedProjects || []) {
    const project = projects.find((item) => item.slug === projectSlug && item.visibility === 'public')
    if (!project) errors.push(`${entry.slug}: unknown/non-public related project ${projectSlug}`)
  }
}

if (errors.length) {
  console.error('Content validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Content validation passed: ${projects.length} projects, ${logbook.length} logbook entries.`)
