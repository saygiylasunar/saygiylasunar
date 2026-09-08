import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url).pathname
const limits = {
  '.js': 450 * 1024,
  '.css': 160 * 1024,
}
const violations = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    const stat = statSync(path)
    if (stat.isDirectory()) {
      walk(path)
      continue
    }
    for (const [extension, max] of Object.entries(limits)) {
      if (name.endsWith(extension) && stat.size > max) {
        violations.push(`${name}: ${(stat.size / 1024).toFixed(1)} kB > ${(max / 1024).toFixed(0)} kB`)
      }
    }
  }
}

walk(dist)

if (violations.length) {
  console.error('Bundle budget exceeded:')
  violations.forEach((item) => console.error(`- ${item}`))
  process.exit(1)
}

console.log('Bundle budget passed.')
