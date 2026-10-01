import { readFileSync } from 'node:fs'
import { oggLessons, oggLessonsMeta } from '../src/content/oggLessonsFull.js'

const errors = []
const lessonIds = new Set()
const lessonSlugs = new Set()
const categoryIds = new Set()
let categoryCount = 0

function requireUnique(set, value, label) {
  if (!value) {
    errors.push(`Missing ${label}.`)
    return
  }
  if (set.has(value)) errors.push(`Duplicate ${label}: ${value}`)
  set.add(value)
}

for (const lesson of oggLessons) {
  requireUnique(lessonIds, lesson.id, 'lesson id')
  requireUnique(lessonSlugs, lesson.slug, 'lesson slug')

  if (!lesson.no) errors.push(`${lesson.slug || lesson.id}: missing lesson number`)
  if (!lesson.title) errors.push(`${lesson.slug || lesson.id}: missing lesson title`)
  if (!Array.isArray(lesson.categories) || !lesson.categories.length) {
    errors.push(`${lesson.slug || lesson.id}: lesson must contain categories`)
    continue
  }

  for (const category of lesson.categories) {
    categoryCount += 1
    requireUnique(categoryIds, category.id, 'category id')
    if (!category.title) errors.push(`${lesson.slug}: category without title`)
    if (!category.html?.trim()) errors.push(`${lesson.slug}/${category.id}: empty category body`)
  }

  for (const reference of lesson.references || []) {
    if (!reference.label || !/^https?:\/\//.test(reference.href || '')) {
      errors.push(`${lesson.slug}: invalid official reference`)
    }
  }
}

if (!oggLessonsMeta?.fullVersion) errors.push('oggLessonsMeta.fullVersion must stay enabled.')

const publicText = JSON.stringify(oggLessons).toLocaleLowerCase('tr-TR')
const forbiddenAuthoringTraces = [
  'notion',
  'powerpoint',
  'sourcedeck',
  'sourceurl',
  'binary görsel',
  'özgün fotoğraf',
  'okuyamad',
]
for (const term of forbiddenAuthoringTraces) {
  if (publicText.includes(term)) errors.push(`Public authoring trace found: ${term}`)
}

const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')
const expectedUrls = [
  'https://saygiylasunar.com/ogg',
  ...oggLessons.map((lesson) => `https://saygiylasunar.com/ogg/${lesson.slug}`),
]
for (const url of expectedUrls) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) errors.push(`Missing sitemap URL: ${url}`)
}

if (errors.length) {
  console.error('ÖGG content validation failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`ÖGG content validation passed: ${oggLessons.length} lessons, ${categoryCount} categories.`)
