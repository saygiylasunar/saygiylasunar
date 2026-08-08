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
            <input type="file" @change="onFile" />
            <strong>{{ copy.choose }}</strong>
            <span>{{ copy.note }}</span>
          </label>

          <div v-if="fileName" class="hash-result">
            <span>{{ fileName }} · {{ formatBytes(fileSize) }}</span>
            <label>SHA-256</label>
            <code>{{ hash || copy.calculating }}</code>
            <button v-if="hash" class="button button-primary" type="button" @click="copyHash">{{ copied ? copy.copied : copy.copy }}</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { locale } from '../lib/locale.js'

const texts = {
  tr: { eyebrow: 'Yerel çalışan geliştirici aracı', title: 'Dosya Hash Hesaplayıcı', intro: 'Dosyanız tarayıcınızda okunur ve SHA-256 özeti cihazınızda hesaplanır. Sunucuya yüklenmez.', choose: 'Dosya seç', note: 'Her dosya türü desteklenir', calculating: 'Hesaplanıyor…', copy: 'Hash’i kopyala', copied: 'Kopyalandı' },
  en: { eyebrow: 'Local developer utility', title: 'File Hash Calculator', intro: 'Your file is read in the browser and its SHA-256 digest is calculated on your device. Nothing is uploaded.', choose: 'Choose file', note: 'All file types supported', calculating: 'Calculating…', copy: 'Copy hash', copied: 'Copied' },
}

const copy = computed(() => texts[locale.value])
const hash = ref('')
const fileName = ref('')
const fileSize = ref(0)
const copied = ref(false)

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`
}

async function onFile(event) {
  const file = event.target.files?.[0]
  if (!file) return
  fileName.value = file.name
  fileSize.value = file.size
  hash.value = ''
  copied.value = false
  const buffer = await file.arrayBuffer()
  const digest = await crypto.subtle.digest('SHA-256', buffer)
  hash.value = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function copyHash() {
  await navigator.clipboard.writeText(hash.value)
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1400)
}
</script>
