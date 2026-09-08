import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = new URL('../', import.meta.url)
const seo = JSON.parse(readFileSync(new URL('../src/content/seo.json', import.meta.url), 'utf8'))
const projects = JSON.parse(readFileSync(new URL('../src/content/projects.json', import.meta.url), 'utf8'))
const logbook = JSON.parse(readFileSync(new URL('../src/content/logbook.json', import.meta.url), 'utf8'))

const outRoot = new URL('../public/og/', import.meta.url)

function escapeXml(value='') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function wrap(text, max=34, lines=3) {
  const words = String(text).split(/\s+/)
  const out = []
  let current = ''
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length > max && current) {
      out.push(current)
      current = word
      if (out.length === lines - 1) break
    } else {
      current = next
    }
  }
  if (out.length < lines && current) out.push(current)
  const consumed = out.join(' ').length
  if (consumed < String(text).length - 3) out[out.length - 1] = out[out.length - 1].replace(/[.,;:]?$/, '…')
  return out.slice(0, lines)
}

function svgCard({title, label='SAYGIYLA SUNAR', kicker='ERSEN FILIZ / 2026'}) {
  const lines = wrap(title, 34, 3)
  const tspans = lines.map((line, index) =>
    `<tspan x="88" dy="${index === 0 ? 0 : 82}">${escapeXml(line)}</tspan>`
  ).join('')
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#0b0d10"/>
        <stop offset="1" stop-color="#17131b"/>
      </linearGradient>
      <radialGradient id="r" cx="78%" cy="18%" r="65%">
        <stop offset="0" stop-color="#ff7258" stop-opacity=".48"/>
        <stop offset=".65" stop-color="#ff7258" stop-opacity=".05"/>
        <stop offset="1" stop-color="#ff7258" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect width="1200" height="630" fill="url(#r)"/>
    <g opacity=".16" stroke="#f1efe8">
      <path d="M0 105H1200M0 210H1200M0 315H1200M0 420H1200M0 525H1200"/>
      <path d="M100 0V630M300 0V630M500 0V630M700 0V630M900 0V630M1100 0V630"/>
    </g>
    <circle cx="1090" cy="570" r="190" fill="none" stroke="#ff7258" stroke-width="2"/>
    <text x="88" y="82" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="#ff7258">${escapeXml(label)}</text>
    <text x="88" y="185" font-family="Arial, sans-serif" font-size="66" font-weight="700" letter-spacing="-2" fill="#f1efe8">${tspans}</text>
    <text x="88" y="558" font-family="Arial, sans-serif" font-size="19" font-weight="600" letter-spacing="3.5" fill="#a9aaa4">${escapeXml(kicker)}</text>
    <text x="1045" y="110" font-family="Arial, sans-serif" font-size="60" font-weight="800" fill="#f1efe8">S/</text>
  </svg>`
}

async function writeCard(relativePath, data) {
  const path = join(new URL('.', outRoot).pathname, relativePath)
  mkdirSync(dirname(path), { recursive: true })
  await sharp(Buffer.from(svgCard(data))).png({ compressionLevel: 9 }).toFile(path)
}

for (const [key, record] of Object.entries(seo.tr)) {
  await writeCard(`${key}.png`, {
    title: record.title.replace(/ — Ersen Filiz.*$/, ''),
    label: key === 'music' ? 'SAYGIYLA SUNAR / MUSIC' : 'SAYGIYLA SUNAR',
  })
}

for (const project of projects.filter((item) => item.visibility === 'public')) {
  await writeCard(`projects/${project.slug}.png`, {
    title: project.title.tr,
    label: 'PROJECT / CASE RECORD',
    kicker: project.category.tr,
  })
}

for (const entry of logbook.filter((item) => item.visibility === 'public')) {
  await writeCard(`logbook/${entry.slug}.png`, {
    title: entry.title.tr,
    label: 'DEV LOGBOOK',
    kicker: entry.category.tr,
  })
}

console.log('Generated Open Graph PNG assets.')
