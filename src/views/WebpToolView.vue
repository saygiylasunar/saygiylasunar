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
              @change="onFiles"
            />
            <strong>{{ copy.choose }}</strong>
            <span>{{ copy.support }}</span>
          </label>

          <template v-if="items.length">
            <div class="tool-stat-grid webp-bulk-stats">
              <article><span>{{ copy.fileCount }}</span><strong>{{ items.length }}</strong></article>
              <article><span>{{ copy.sourceSize }}</span><strong>{{ formatBytes(totalSourceSize) }}</strong></article>
              <article><span>{{ copy.outputSize }}</span><strong>{{ convertedCount ? formatBytes(totalOutputSize) : '—' }}</strong></article>
              <article><span>{{ copy.saving }}</span><strong>{{ totalSavingLabel }}</strong></article>
            </div>

            <label class="range-control">
              <span>{{ copy.quality }}: <strong>{{ quality }}</strong></span>
              <input v-model.number="quality" type="range" min="60" max="100" step="1" @change="convertAll" />
            </label>

            <div class="preset-row">
              <button type="button" :disabled="processing" @click="setQuality(92)">92 · {{ copy.high }}</button>
              <button type="button" :disabled="processing" @click="setQuality(85)">85 · {{ copy.balanced }}</button>
              <button type="button" :disabled="processing" @click="setQuality(75)">75 · {{ copy.small }}</button>
            </div>

            <div v-if="processing" class="webp-progress" aria-live="polite">
              <span>{{ copy.processing }} {{ progress.current }}/{{ progress.total }}</span>
              <progress :value="progress.current" :max="progress.total"></progress>
            </div>

            <p v-if="error" class="tool-error">{{ error }}</p>

            <div class="webp-bulk-actions">
              <button class="button button-ghost" type="button" :disabled="processing" @click="clearAll">
                {{ copy.clear }}
              </button>
              <button
                class="button button-primary"
                type="button"
                :disabled="processing || !convertedCount"
                @click="downloadAll"
              >
                {{ copy.downloadAll }} ({{ convertedCount }})
              </button>
            </div>

            <div class="webp-file-list">
              <article v-for="item in items" :key="item.id" class="webp-file-row">
                <div class="webp-file-name">
                  <strong :title="item.file.name">{{ item.file.name }}</strong>
                  <span>{{ item.width && item.height ? `${item.width} × ${item.height}` : copy.waiting }}</span>
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
                  :download="downloadName(item)"
                >
                  {{ copy.downloadOne }}
                </a>
                <span v-else class="webp-file-state">{{ item.failed ? copy.failedShort : copy.waiting }}</span>
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

const texts = {
  tr: {
    eyebrow: 'Yerel çalışan görsel aracı',
    title: 'WebP Dönüştürücü',
    intro: 'PNG, JPEG ve WebP görsellerini toplu olarak, çözünürlüğü değiştirmeden WebP biçiminde yeniden kodlar. Dosyalar tarayıcınızdan ayrılmaz.',
    choose: 'Görselleri seç veya buraya sürükle',
    support: 'PNG · JPEG · WebP · çoklu seçim desteklenir',
    fileCount: 'Dosya',
    sourceSize: 'Kaynak toplamı',
    outputSize: 'WebP toplamı',
    saving: 'Toplam kazanç',
    quality: 'Kalite',
    high: 'Yüksek',
    balanced: 'Dengeli',
    small: 'Küçük',
    processing: 'Dönüştürülüyor',
    clear: 'Listeyi temizle',
    downloadAll: 'Tümünü indir',
    downloadOne: 'İndir',
    waiting: 'Bekliyor',
    failed: 'Bazı görseller WebP çıktısına dönüştürülemedi.',
    failedShort: 'Hata',
    unsupported: 'Desteklenmeyen dosyalar atlandı.',
    downloadNote: '“Tümünü indir” seçeneğinde tarayıcınız birden fazla dosya indirmek için izin isteyebilir.',
  },
  en: {
    eyebrow: 'Local image utility',
    title: 'WebP Converter',
    intro: 'Batch re-encodes PNG, JPEG and WebP images as WebP without changing resolution. Files never leave your browser.',
    choose: 'Choose images or drop them here',
    support: 'PNG · JPEG · WebP · multiple selection supported',
    fileCount: 'Files',
    sourceSize: 'Source total',
    outputSize: 'WebP total',
    saving: 'Total saving',
    quality: 'Quality',
    high: 'High',
    balanced: 'Balanced',
    small: 'Small',
    processing: 'Converting',
    clear: 'Clear list',
    downloadAll: 'Download all',
    downloadOne: 'Download',
    waiting: 'Waiting',
    failed: 'Some images could not be converted to WebP.',
    failedShort: 'Error',
    unsupported: 'Unsupported files were skipped.',
    downloadNote: 'Your browser may ask permission to download multiple files when using “Download all”.',
  },
}

const copy = computed(() => texts[locale.value])
const quality = ref(85)
const items = ref([])
const processing = ref(false)
const dragging = ref(false)
const error = ref('')
const progress = reactive({ current: 0, total: 0 })
let nextId = 1

const convertedItems = computed(() => items.value.filter((item) => item.result && item.resultUrl))
const convertedCount = computed(() => convertedItems.value.length)
const totalSourceSize = computed(() => items.value.reduce((sum, item) => sum + item.file.size, 0))
const totalOutputSize = computed(() => convertedItems.value.reduce((sum, item) => sum + item.result.size, 0))
const totalSavingLabel = computed(() => {
  if (!convertedCount.value || !totalSourceSize.value) return '—'
  const ratio = (1 - totalOutputSize.value / totalSourceSize.value) * 100
  return `${ratio >= 0 ? '' : '+'}${Math.abs(ratio).toFixed(1)}%${ratio < 0 ? ' larger' : ''}`
})

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`
}

function savingLabel(item) {
  if (!item.result || !item.file.size) return '—'
  const ratio = (1 - item.result.size / item.file.size) * 100
  return `${ratio >= 0 ? '' : '+'}${Math.abs(ratio).toFixed(1)}%${ratio < 0 ? ' larger' : ''}`
}

function downloadName(item) {
  const base = item.file.name.replace(/\.[^.]+$/, '') || 'image'
  return `${base}-q${quality.value}.webp`
}

function validImage(file) {
  return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type)
}

async function onFiles(event) {
  const selected = Array.from(event.target.files || [])
  event.target.value = ''
  await addFiles(selected)
}

async function onDrop(event) {
  dragging.value = false
  await addFiles(Array.from(event.dataTransfer?.files || []))
}

async function addFiles(files) {
  if (processing.value || !files.length) return
  error.value = ''
  const accepted = files.filter(validImage)
  if (accepted.length !== files.length) error.value = copy.value.unsupported
  if (!accepted.length) return

  cleanupResults()
  items.value = accepted.map((file) => ({
    id: nextId++,
    file,
    width: 0,
    height: 0,
    result: null,
    resultUrl: '',
    saving: 0,
    failed: false,
  }))
  await convertAll()
}

function setQuality(value) {
  quality.value = value
  convertAll()
}

async function convertAll() {
  if (processing.value || !items.value.length) return
  processing.value = true
  error.value = ''
  progress.current = 0
  progress.total = items.value.length
  cleanupResults()
  let failed = false

  for (const item of items.value) {
    item.failed = false
    try {
      const bitmap = await createImageBitmap(item.file)
      item.width = bitmap.width
      item.height = bitmap.height

      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const context = canvas.getContext('2d')
      context.drawImage(bitmap, 0, 0)
      bitmap.close?.()

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality.value / 100))
      canvas.width = 1
      canvas.height = 1

      if (!blob || blob.type !== 'image/webp') throw new Error('webp-encode-failed')
      item.result = blob
      item.resultUrl = URL.createObjectURL(blob)
      item.saving = (1 - blob.size / item.file.size) * 100
    } catch {
      item.failed = true
      failed = true
    } finally {
      progress.current += 1
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
  }

  if (failed) error.value = copy.value.failed
  processing.value = false
}

function downloadAll() {
  convertedItems.value.forEach((item) => {
    const link = document.createElement('a')
    link.href = item.resultUrl
    link.download = downloadName(item)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    link.remove()
  })
}

function cleanupResults() {
  items.value.forEach((item) => {
    if (item.resultUrl) URL.revokeObjectURL(item.resultUrl)
    item.resultUrl = ''
    item.result = null
    item.saving = 0
  })
}

function clearAll() {
  if (processing.value) return
  cleanupResults()
  items.value = []
  progress.current = 0
  progress.total = 0
  error.value = ''
}

onUnmounted(cleanupResults)
</script>
