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

          <template v-if="bitmap">
            <div class="resize-controls">
              <label>{{ copy.width }}<input v-model.number="width" type="number" min="1" max="12000" @input="onWidth" /></label>
              <label>{{ copy.height }}<input v-model.number="height" type="number" min="1" max="12000" @input="onHeight" /></label>
              <label class="inline-check"><input v-model="locked" type="checkbox" /> {{ copy.lock }}</label>
              <label>{{ copy.format }}
                <select v-model="format">
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                </select>
              </label>
            </div>

            <button class="button button-primary full-button" type="button" @click="resize">{{ copy.process }}</button>
            <p v-if="error" class="tool-error">{{ error }}</p>
            <a v-if="resultUrl" class="button button-ghost full-button" :href="resultUrl" :download="downloadName">{{ copy.download }}</a>
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
  tr: { eyebrow: 'Yerel çalışan görsel aracı', title: 'Görsel Boyutlandırıcı', intro: 'Görselleri sunucuya göndermeden yeniden boyutlandırır. En-boy oranını kilitleyebilir ve çıktı formatını seçebilirsiniz.', choose: 'Görsel seç', support: 'PNG · JPEG · WebP', width: 'Genişlik (px)', height: 'Yükseklik (px)', lock: 'En-boy oranını koru', format: 'Çıktı formatı', process: 'Boyutlandır', download: 'Dosyayı indir', failed: 'Çıktı oluşturulamadı.' },
  en: { eyebrow: 'Local image utility', title: 'Image Resizer', intro: 'Resizes images without sending them to a server. Lock aspect ratio and choose the output format.', choose: 'Choose image', support: 'PNG · JPEG · WebP', width: 'Width (px)', height: 'Height (px)', lock: 'Keep aspect ratio', format: 'Output format', process: 'Resize image', download: 'Download file', failed: 'Could not create output.' },
}

const copy = computed(() => texts[locale.value])
const bitmap = ref(null)
const width = ref(0)
const height = ref(0)
const ratio = ref(1)
const locked = ref(true)
const format = ref('image/webp')
const resultUrl = ref('')
const error = ref('')
const baseName = ref('image')

const extension = computed(() => ({ 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' }[format.value]))
const downloadName = computed(() => `${baseName.value}-${width.value}x${height.value}.${extension.value}`)

async function onFile(event) {
  const file = event.target.files?.[0]
  if (!file) return
  cleanup()
  bitmap.value?.close?.()
  bitmap.value = await createImageBitmap(file)
  width.value = bitmap.value.width
  height.value = bitmap.value.height
  ratio.value = bitmap.value.width / bitmap.value.height
  baseName.value = file.name.replace(/\.[^.]+$/, '') || 'image'
}

function onWidth() {
  if (locked.value && width.value > 0) height.value = Math.max(1, Math.round(width.value / ratio.value))
}

function onHeight() {
  if (locked.value && height.value > 0) width.value = Math.max(1, Math.round(height.value * ratio.value))
}

async function resize() {
  if (!bitmap.value || width.value < 1 || height.value < 1) return
  error.value = ''
  cleanup()
  const canvas = document.createElement('canvas')
  canvas.width = width.value
  canvas.height = height.value
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap.value, 0, 0, width.value, height.value)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, format.value, format.value === 'image/png' ? undefined : 0.9))
  if (!blob) {
    error.value = copy.value.failed
    return
  }
  resultUrl.value = URL.createObjectURL(blob)
}

function cleanup() {
  if (resultUrl.value) URL.revokeObjectURL(resultUrl.value)
  resultUrl.value = ''
}

onUnmounted(() => {
  cleanup()
  bitmap.value?.close?.()
})
</script>
