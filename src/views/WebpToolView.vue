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
          <label class="file-drop">
            <input type="file" accept="image/png,image/jpeg,image/webp" @change="onFile" />
            <strong>{{ copy.choose }}</strong>
            <span>{{ copy.support }}</span>
          </label>

          <template v-if="source">
            <div class="tool-stat-grid">
              <article><span>{{ copy.resolution }}</span><strong>{{ source.width }} × {{ source.height }}</strong></article>
              <article><span>{{ copy.sourceSize }}</span><strong>{{ formatBytes(source.size) }}</strong></article>
              <article><span>{{ copy.outputSize }}</span><strong>{{ result ? formatBytes(result.size) : '—' }}</strong></article>
              <article><span>{{ copy.saving }}</span><strong>{{ savingLabel }}</strong></article>
            </div>

            <label class="range-control">
              <span>{{ copy.quality }}: <strong>{{ quality }}</strong></span>
              <input v-model.number="quality" type="range" min="60" max="100" step="1" @change="convert" />
            </label>

            <div class="preset-row">
              <button type="button" @click="setQuality(92)">92 · {{ copy.high }}</button>
              <button type="button" @click="setQuality(85)">85 · {{ copy.balanced }}</button>
              <button type="button" @click="setQuality(75)">75 · {{ copy.small }}</button>
            </div>

            <p v-if="error" class="tool-error">{{ error }}</p>
            <a v-if="resultUrl" class="button button-primary full-button" :href="resultUrl" :download="downloadName">
              {{ copy.download }}
            </a>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { locale } from '../lib/locale.js'

const texts = {
  tr: { eyebrow: 'Yerel çalışan görsel aracı', title: 'WebP Dönüştürücü', intro: 'Görsel çözünürlüğünü değiştirmeden WebP olarak yeniden kodlar ve dosya boyutunu optimize eder. Dosya tarayıcınızdan ayrılmaz.', choose: 'Görsel seç', support: 'PNG · JPEG · WebP', resolution: 'Çözünürlük', sourceSize: 'Kaynak', outputSize: 'WebP', saving: 'Kazanç', quality: 'Kalite', high: 'Yüksek', balanced: 'Dengeli', small: 'Küçük', download: 'WebP dosyasını indir', failed: 'Tarayıcı WebP çıktısı oluşturamadı.' },
  en: { eyebrow: 'Local image utility', title: 'WebP Converter', intro: 'Re-encodes images as WebP without changing resolution and optimizes file size. The file never leaves your browser.', choose: 'Choose image', support: 'PNG · JPEG · WebP', resolution: 'Resolution', sourceSize: 'Source', outputSize: 'WebP', saving: 'Saving', quality: 'Quality', high: 'High', balanced: 'Balanced', small: 'Small', download: 'Download WebP', failed: 'The browser could not create a WebP output.' },
}

const copy = computed(() => texts[locale.value])
const quality = ref(85)
const source = ref(null)
const result = ref(null)
const resultUrl = ref('')
const bitmap = ref(null)
const error = ref('')
const fileName = ref('image')

const savingLabel = computed(() => {
  if (!source.value || !result.value) return '—'
  const ratio = (1 - result.value.size / source.value.size) * 100
  return `${ratio >= 0 ? '' : '+'}${Math.abs(ratio).toFixed(1)}%${ratio < 0 ? ' larger' : ''}`
})
const downloadName = computed(() => `${fileName.value}-q${quality.value}.webp`)

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`
}

async function onFile(event) {
  const file = event.target.files?.[0]
  if (!file) return
  cleanupResult()
  bitmap.value?.close?.()
  bitmap.value = await createImageBitmap(file)
  source.value = { size: file.size, width: bitmap.value.width, height: bitmap.value.height }
  fileName.value = file.name.replace(/\.[^.]+$/, '') || 'image'
  await convert()
}

function setQuality(value) {
  quality.value = value
  convert()
}

async function convert() {
  if (!bitmap.value) return
  error.value = ''
  cleanupResult()
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.value.width
  canvas.height = bitmap.value.height
  canvas.getContext('2d').drawImage(bitmap.value, 0, 0)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', quality.value / 100))
  if (!blob || blob.type !== 'image/webp') {
    error.value = copy.value.failed
    return
  }
  result.value = blob
  resultUrl.value = URL.createObjectURL(blob)
}

function cleanupResult() {
  if (resultUrl.value) URL.revokeObjectURL(resultUrl.value)
  resultUrl.value = ''
  result.value = null
}

onUnmounted(() => {
  cleanupResult()
  bitmap.value?.close?.()
})
</script>
