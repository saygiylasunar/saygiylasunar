<template>
  <div class="page-view tool-view">
    <section class="page-hero compact-hero">
      <div class="container narrow-container">
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.title }}</h1>
        <p>{{ copy.intro }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container narrow-container">
        <div class="browser-tool-panel" v-reveal>
          <section class="webp-quality-panel" aria-labelledby="webp-quality-title">
            <div class="webp-quality-head">
              <div>
                <strong id="webp-quality-title">{{ copy.quality }}</strong>
                <span>{{ copy.qualityHint }}</span>
              </div>
              <b>{{ quality }}</b>
            </div>

            <input
              v-model.number="quality"
              type="range"
              min="60"
              max="100"
              step="1"
              :disabled="processing || zipping"
              @input="invalidateResults"
            />

            <div class="preset-row">
              <button type="button" :disabled="processing || zipping" @click="setQuality(92)">92 · {{ copy.high }}</button>
              <button type="button" :disabled="processing || zipping" @click="setQuality(85)">85 · {{ copy.balanced }}</button>
              <button type="button" :disabled="processing || zipping" @click="setQuality(75)">75 · {{ copy.small }}</button>
            </div>
          </section>

          <label
            class="file-drop"
            :class="{ 'is-dragging': dragging }"
            @dragenter.prevent="dragging = true"
            @dragover.prevent="dragging = true"
            @dragleave.prevent="dragging = false"
            @drop.prevent="onDrop"
          >
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              :disabled="processing || zipping"
              @change="onFiles"
            />
            <strong>{{ copy.choose }}</strong>
            <span>{{ copy.support }}</span>
          </label>

          <template v-if="items.length">
            <div class="webp-list-head">
              <strong>{{ copy.selectedFiles }} <span>{{ items.length }}/{{ MAX_FILES }}</span></strong>
              <button type="button" :disabled="processing || zipping" @click="clearAll">{{ copy.clear }}</button>
            </div>

            <div class="tool-stat-grid webp-bulk-stats">
              <article><span>{{ copy.fileCount }}</span><strong>{{ items.length }}</strong></article>
              <article><span>{{ copy.sourceSize }}</span><strong>{{ formatBytes(totalSourceSize) }}</strong></article>
              <article><span>{{ copy.outputSize }}</span><strong>{{ convertedCount ? formatBytes(totalOutputSize) : '—' }}</strong></article>
              <article><span>{{ copy.saving }}</span><strong>{{ totalSavingLabel }}</strong></article>
            </div>

            <div class="webp-primary-actions">
              <button
                class="button button-primary"
                type="button"
                :disabled="processing || zipping || !items.length"
                @click="convertAll"
              >
                {{ processing ? `${copy.processing} ${progress.current}/${progress.total}` : `${copy.convert} (${items.length})` }}
              </button>

              <button
                class="button button-ghost"
                type="button"
                :disabled="processing || zipping || !convertedCount"
                @click="downloadZip"
              >
                {{ zipping ? `${copy.preparingZip} ${zipProgress.current}/${zipProgress.total}` : `${copy.downloadZip} (${convertedCount})` }}
              </button>
            </div>

            <div v-if="processing" class="webp-progress" aria-live="polite">
              <span>{{ copy.processing }} {{ progress.current }}/{{ progress.total }}</span>
              <progress :value="progress.current" :max="progress.total"></progress>
            </div>

            <div v-if="zipping" class="webp-progress" aria-live="polite">
              <span>{{ copy.preparingZip }} {{ zipProgress.current }}/{{ zipProgress.total }}</span>
              <progress :value="zipProgress.current" :max="zipProgress.total"></progress>
            </div>

            <p v-if="error" class="tool-error">{{ error }}</p>
            <p v-if="resultsInvalid" class="webp-change-note">{{ copy.reconvertNote }}</p>

            <div class="webp-file-list">
              <article v-for="item in items" :key="item.id" class="webp-file-row">
                <div class="webp-file-name">
                  <strong :title="item.file.name">{{ item.file.name }}</strong>
                  <span>{{ item.width && item.height ? `${item.width} × ${item.height}` : copy.ready }}</span>
                </div>

                <div class="webp-file-size">
                  <span>{{ formatBytes(item.file.size) }}</span>
                  <b aria-hidden="true">→</b>
                  <strong>{{ item.result ? formatBytes(item.result.size) : '—' }}</strong>
                </div>

                <span class="webp-file-saving" :class="{ 'is-larger': item.saving < 0 }">
                  {{ item.result ? savingLabel(item) : '—' }}
                </span>

                <a
                  v-if="item.resultUrl"
                  class="button button-ghost webp-file-download"
                  :href="item.resultUrl"
                  :download="item.outputName"
                >
                  {{ copy.downloadOne }}
                </a>
                <span v-else class="webp-file-state">{{ item.failed ? copy.failedShort : copy.ready }}</span>
              </article>
            </div>

            <p class="webp-download-note">{{ copy.downloadNote }}</p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onUnmounted, reactive, ref } from 'vue'
import { locale } from '../lib/locale.js'

const MAX_FILES = 100
const ZIP32_MAX = 0xffffffff

const texts = {
  tr: {
    eyebrow: 'Yerel çalışan görsel aracı',
    title: 'WebP Dönüştürücü',
    intro: '100 görsele kadar PNG, JPEG ve WebP dosyasını toplu dönüştürür. Kaliteyi önce seçin, dosyaları ekleyin ve dönüştürmeyi siz başlatın. Çözünürlük korunur; dosyalar tarayıcınızdan ayrılmaz.',
    quality: 'WebP kalitesi',
    qualityHint: 'Kaliteyi dosya seçmeden önce de ayarlayabilirsiniz. Değişiklik otomatik dönüştürme başlatmaz.',
    choose: 'Görselleri seç veya buraya sürükle',
    support: 'PNG · JPEG · WebP · en fazla 100 dosya',
    selectedFiles: 'Seçili dosyalar',
    fileCount: 'Dosya',
    sourceSize: 'Kaynak toplamı',
    outputSize: 'WebP toplamı',
    saving: 'Toplam kazanç',
    high: 'Yüksek',
    balanced: 'Dengeli',
    small: 'Küçük',
    convert: 'Dönüştür',
    processing: 'Dönüştürülüyor',
    clear: 'Listeyi temizle',
    downloadZip: 'ZIP indir',
    preparingZip: 'ZIP hazırlanıyor',
    downloadOne: 'İndir',
    ready: 'Hazır',
    failed: 'Bazı görseller WebP çıktısına dönüştürülemedi.',
    failedShort: 'Hata',
    unsupported: 'Desteklenmeyen dosyalar atlandı.',
    limit: 'En fazla 100 dosya eklenebilir. Fazla dosyalar listeye alınmadı.',
    duplicate: 'Aynı dosyalardan bazıları tekrar eklenmedi.',
    reconvertNote: 'Kalite veya dosya listesi değişti. Yeni ayarlarla çıktı almak için Dönüştür düğmesine basın.',
    downloadNote: 'ZIP indir tek bir .zip dosyası oluşturur; tarayıcı çoklu indirme izni istemez.',
    zipFailed: 'ZIP dosyası hazırlanamadı.',
    zipTooLarge: 'ZIP32 sınırı aşıldı. Daha küçük gruplar halinde dönüştürün.',
  },
  en: {
    eyebrow: 'Local image utility',
    title: 'WebP Converter',
    intro: 'Batch converts up to 100 PNG, JPEG and WebP images. Choose quality first, add files, then start conversion yourself. Resolution is preserved and files never leave your browser.',
    quality: 'WebP quality',
    qualityHint: 'Quality can be set before choosing files. Changing it never starts conversion automatically.',
    choose: 'Choose images or drop them here',
    support: 'PNG · JPEG · WebP · up to 100 files',
    selectedFiles: 'Selected files',
    fileCount: 'Files',
    sourceSize: 'Source total',
    outputSize: 'WebP total',
    saving: 'Total saving',
    high: 'High',
    balanced: 'Balanced',
    small: 'Small',
    convert: 'Convert',
    processing: 'Converting',
    clear: 'Clear list',
    downloadZip: 'Download ZIP',
    preparingZip: 'Preparing ZIP',
    downloadOne: 'Download',
    ready: 'Ready',
    failed: 'Some images could not be converted to WebP.',
    failedShort: 'Error',
    unsupported: 'Unsupported files were skipped.',
    limit: 'A maximum of 100 files can be added. Extra files were skipped.',
    duplicate: 'Some duplicate files were not added again.',
    reconvertNote: 'Quality or the file list changed. Press Convert to create outputs with the current settings.',
    downloadNote: 'Download ZIP creates one .zip file, so the browser does not need multiple-download permission.',
    zipFailed: 'The ZIP file could not be created.',
    zipTooLarge: 'The ZIP32 size limit was exceeded. Convert smaller batches.',
  },
}

const copy = computed(() => texts[locale.value])
const quality = ref(85)
const items = ref([])
const processing = ref(false)
const zipping = ref(false)
const dragging = ref(false)
const error = ref('')
const resultsInvalid = ref(false)
const progress = reactive({ current: 0, total: 0 })
const zipProgress = reactive({ current: 0, total: 0 })
let nextId = 1

const convertedItems = computed(() => items.value.filter((item) => item.result && item.resultUrl))
const convertedCount = computed(() => convertedItems.value.length)
const totalSourceSize = computed(() => items.value.reduce((sum, item) => sum + item.file.size, 0))
const convertedSourceSize = computed(() => convertedItems.value.reduce((sum, item) => sum + item.file.size, 0))
const totalOutputSize = computed(() => convertedItems.value.reduce((sum, item) => sum + item.result.size, 0))
const totalSavingLabel = computed(() => {
  if (!convertedCount.value || !convertedSourceSize.value) return '—'
  const ratio = (1 - totalOutputSize.value / convertedSourceSize.value) * 100
  return formatSaving(ratio)
})

const crcTable = makeCrcTable()

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(2)} MB`
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`
}

function formatSaving(ratio) {
  if (ratio >= 0) return `${ratio.toFixed(1)}%`
  return `+${Math.abs(ratio).toFixed(1)}%`
}

function savingLabel(item) {
  if (!item.result || !item.file.size) return '—'
  return formatSaving((1 - item.result.size / item.file.size) * 100)
}

function validImage(file) {
  return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
}

function fileFingerprint(file) {
  return `${file.name}:${file.size}:${file.lastModified}`
}

async function onFiles(event) {
  const selected = Array.from(event.target.files || [])
  event.target.value = ''
  addFiles(selected)
}

function onDrop(event) {
  dragging.value = false
  addFiles(Array.from(event.dataTransfer?.files || []))
}

function addFiles(files) {
  if (processing.value || zipping.value || !files.length) return
  error.value = ''

  const supported = files.filter(validImage)
  const existing = new Set(items.value.map((item) => fileFingerprint(item.file)))
  const unique = supported.filter((file) => !existing.has(fileFingerprint(file)))
  const available = Math.max(0, MAX_FILES - items.value.length)
  const accepted = unique.slice(0, available)

  const messages = []
  if (supported.length !== files.length) messages.push(copy.value.unsupported)
  if (unique.length !== supported.length) messages.push(copy.value.duplicate)
  if (unique.length > available) messages.push(copy.value.limit)
  error.value = messages.join(' ')

  if (!accepted.length) return

  invalidateResults()
  items.value.push(...accepted.map((file) => ({
    id: nextId++,
    file,
    width: 0,
    height: 0,
    result: null,
    resultUrl: '',
    outputName: '',
    saving: 0,
    failed: false,
  })))
}

function setQuality(value) {
  if (quality.value === value) return
  quality.value = value
  invalidateResults()
}

function invalidateResults() {
  if (!items.value.length) return
  const hadResults = items.value.some((item) => item.result || item.failed)
  cleanupResults()
  resultsInvalid.value = hadResults
}

async function decodeBitmap(file) {
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return await createImageBitmap(file)
  }
}

async function convertAll() {
  if (processing.value || zipping.value || !items.value.length) return
  processing.value = true
  error.value = ''
  resultsInvalid.value = false
  progress.current = 0
  progress.total = items.value.length
  cleanupResults()
  let failed = false
  const usedNames = new Map()

  for (const item of items.value) {
    item.failed = false
    try {
      const bitmap = await decodeBitmap(item.file)
      item.width = bitmap.width
      item.height = bitmap.height

      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const context = canvas.getContext('2d')
      if (!context) throw new Error('canvas-context-unavailable')
      context.drawImage(bitmap, 0, 0)
      bitmap.close?.()

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality.value / 100))
      canvas.width = 1
      canvas.height = 1

      if (!blob || blob.type !== 'image/webp') throw new Error('webp-encode-failed')
      item.result = blob
      item.resultUrl = URL.createObjectURL(blob)
      item.outputName = uniqueOutputName(item.file.name, usedNames)
      item.saving = (1 - blob.size / item.file.size) * 100
    } catch {
      item.failed = true
      failed = true
    } finally {
      progress.current += 1
      await nextFrame()
    }
  }

  if (failed) error.value = copy.value.failed
  processing.value = false
}

function uniqueOutputName(originalName, usedNames) {
  const base = originalName.replace(/\.[^.]+$/, '') || 'image'
  const preferred = `${base}-q${quality.value}.webp`
  const count = usedNames.get(preferred) || 0
  usedNames.set(preferred, count + 1)
  if (!count) return preferred
  return `${base}-q${quality.value}-${count + 1}.webp`
}

async function downloadZip() {
  if (processing.value || zipping.value || !convertedItems.value.length) return
  zipping.value = true
  error.value = ''
  zipProgress.current = 0
  zipProgress.total = convertedItems.value.length

  try {
    const zip = await buildStoreZip(convertedItems.value)
    const url = URL.createObjectURL(zip)
    const link = document.createElement('a')
    link.href = url
    link.download = `webp-q${quality.value}-${convertedItems.value.length}-files.zip`
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1500)
  } catch (zipError) {
    error.value = zipError?.message === 'zip-too-large' ? copy.value.zipTooLarge : copy.value.zipFailed
  } finally {
    zipping.value = false
  }
}

async function buildStoreZip(entries) {
  const encoder = new TextEncoder()
  const localParts = []
  const centralParts = []
  let localOffset = 0
  let centralSize = 0

  for (const item of entries) {
    const nameBytes = encoder.encode(item.outputName)
    const bytes = new Uint8Array(await item.result.arrayBuffer())
    const checksum = crc32(bytes)
    const { time, date } = dosDateTime(new Date())
    const size = item.result.size

    if (size > ZIP32_MAX || localOffset > ZIP32_MAX) throw new Error('zip-too-large')

    const localHeader = new Uint8Array(30 + nameBytes.length)
    const localView = new DataView(localHeader.buffer)
    localView.setUint32(0, 0x04034b50, true)
    localView.setUint16(4, 20, true)
    localView.setUint16(6, 0x0800, true)
    localView.setUint16(8, 0, true)
    localView.setUint16(10, time, true)
    localView.setUint16(12, date, true)
    localView.setUint32(14, checksum, true)
    localView.setUint32(18, size, true)
    localView.setUint32(22, size, true)
    localView.setUint16(26, nameBytes.length, true)
    localView.setUint16(28, 0, true)
    localHeader.set(nameBytes, 30)

    const centralHeader = new Uint8Array(46 + nameBytes.length)
    const centralView = new DataView(centralHeader.buffer)
    centralView.setUint32(0, 0x02014b50, true)
    centralView.setUint16(4, 20, true)
    centralView.setUint16(6, 20, true)
    centralView.setUint16(8, 0x0800, true)
    centralView.setUint16(10, 0, true)
    centralView.setUint16(12, time, true)
    centralView.setUint16(14, date, true)
    centralView.setUint32(16, checksum, true)
    centralView.setUint32(20, size, true)
    centralView.setUint32(24, size, true)
    centralView.setUint16(28, nameBytes.length, true)
    centralView.setUint16(30, 0, true)
    centralView.setUint16(32, 0, true)
    centralView.setUint16(34, 0, true)
    centralView.setUint16(36, 0, true)
    centralView.setUint32(38, 0, true)
    centralView.setUint32(42, localOffset, true)
    centralHeader.set(nameBytes, 46)

    localParts.push(localHeader, item.result)
    centralParts.push(centralHeader)
    localOffset += localHeader.byteLength + size
    centralSize += centralHeader.byteLength
    zipProgress.current += 1
    await nextFrame()
  }

  if (localOffset + centralSize > ZIP32_MAX) throw new Error('zip-too-large')

  const end = new Uint8Array(22)
  const endView = new DataView(end.buffer)
  endView.setUint32(0, 0x06054b50, true)
  endView.setUint16(4, 0, true)
  endView.setUint16(6, 0, true)
  endView.setUint16(8, entries.length, true)
  endView.setUint16(10, entries.length, true)
  endView.setUint32(12, centralSize, true)
  endView.setUint32(16, localOffset, true)
  endView.setUint16(20, 0, true)

  return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' })
}

function makeCrcTable() {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n += 1) {
    let c = n
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c >>> 0
  }
  return table
}

function crc32(bytes) {
  let crc = 0xffffffff
  for (let i = 0; i < bytes.length; i += 1) crc = crcTable[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function dosDateTime(value) {
  const year = Math.max(1980, value.getFullYear())
  return {
    time: (value.getHours() << 11) | (value.getMinutes() << 5) | Math.floor(value.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((value.getMonth() + 1) << 5) | value.getDate(),
  }
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

function cleanupResults() {
  items.value.forEach((item) => {
    if (item.resultUrl) URL.revokeObjectURL(item.resultUrl)
    item.resultUrl = ''
    item.result = null
    item.outputName = ''
    item.saving = 0
    item.failed = false
  })
}

function clearAll() {
  if (processing.value || zipping.value) return
  cleanupResults()
  items.value = []
  resultsInvalid.value = false
  progress.current = 0
  progress.total = 0
  zipProgress.current = 0
  zipProgress.total = 0
  error.value = ''
}

onUnmounted(cleanupResults)
</script>