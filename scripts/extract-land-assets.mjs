import { existsSync } from 'node:fs'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const archivePath = path.resolve('assets/lands-publishable.zip')
const outputRoot = path.resolve('public/lands')

if (!existsSync(archivePath)) {
  console.log('[lands] assets/lands-publishable.zip not found; skipping asset extraction')
  process.exit(0)
}

const buffer = await readFile(archivePath)
await rm(outputRoot, { recursive: true, force: true })
await mkdir(outputRoot, { recursive: true })

let offset = 0
let extracted = 0

while (offset + 4 <= buffer.length) {
  const signature = buffer.readUInt32LE(offset)

  if (signature === 0x02014b50 || signature === 0x06054b50) break
  if (signature !== 0x04034b50) throw new Error(`[lands] invalid ZIP local header at byte ${offset}`)

  const flags = buffer.readUInt16LE(offset + 6)
  const method = buffer.readUInt16LE(offset + 8)
  const compressedSize = buffer.readUInt32LE(offset + 18)
  const fileNameLength = buffer.readUInt16LE(offset + 26)
  const extraLength = buffer.readUInt16LE(offset + 28)

  if (flags & 0x0008) throw new Error('[lands] ZIP data descriptors are not supported')
  if (method !== 0) throw new Error('[lands] land asset ZIP must use STORE / no compression')

  const nameStart = offset + 30
  const nameEnd = nameStart + fileNameLength
  const dataStart = nameEnd + extraLength
  const dataEnd = dataStart + compressedSize
  const entryName = buffer.subarray(nameStart, nameEnd).toString('utf8').replaceAll('\\', '/')

  if (dataEnd > buffer.length) throw new Error(`[lands] truncated ZIP entry: ${entryName}`)

  const safeSegments = entryName.split('/').filter(Boolean)
  if (!safeSegments.length || safeSegments.some((segment) => segment === '..')) {
    throw new Error(`[lands] unsafe ZIP entry: ${entryName}`)
  }

  if (!entryName.includes('309-14')) {
    const outputPath = path.join(outputRoot, ...safeSegments)
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, buffer.subarray(dataStart, dataEnd))
    extracted += 1
  }

  offset = dataEnd
}

console.log(`[lands] extracted ${extracted} publishable WebP assets`)
