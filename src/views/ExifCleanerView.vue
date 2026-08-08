<template>
  <div class="page-view exif-view">
    <section class="page-hero compact-hero">
      <div class="container narrow-container">
        <p class="eyebrow">{{ t('exif.eyebrow') }}</p>
        <h1>{{ t('exif.title') }}</h1>
        <p>{{ t('exif.intro') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container narrow-container">
        <div class="exif-tool" v-reveal>
          <input ref="fileInput" class="visually-hidden" type="file" accept="image/jpeg,image/png,image/webp" @change="onFileChange" />

          <button v-if="!sourceUrl" class="exif-drop" type="button" @click="fileInput?.click()">
            <span class="tool-card-index">LOCAL / 01</span>
            <strong>{{ t('exif.dropTitle') }}</strong>
            <small>{{ t('exif.dropText') }}</small>
            <span class="button button-primary">{{ t('exif.choose') }}</span>
          </button>

          <template v-else>
            <div class="exif-preview-grid">
              <figure>
                <img :src="sourceUrl" alt="" />
                <figcaption>{{ t('exif.original') }} · {{ formatBytes(originalSize) }}</figcaption>
              </figure>
              <figure>
                <img v-if="cleanedUrl" :src="cleanedUrl" alt="" />
                <div v-else class="exif-processing">{{ processing ? t('exif.processing') : '—' }}</div>
                <figcaption>{{ t('exif.cleaned') }}<template v-if="cleanedSize"> · {{ formatBytes(cleanedSize) }}</template></figcaption>
              </figure>
            </div>

            <p v-if="message" class="tool-error">{{ message }}</p>
            <p v-else-if="cleanedUrl" class="tool-success">{{ t('exif.ready') }} · {{ t('exif.privacy') }}</p>

            <div class="tool-action-row">
              <a v-if="cleanedUrl" class="button button-primary" :href="cleanedUrl" :download="downloadName">{{ t('exif.download') }}</a>
              <button class="button button-ghost" type="button" @click="resetAndChoose">{{ t('exif.another') }}</button>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import { t } from '../lib/locale.js'

const fileInput = ref(null)
const sourceUrl = ref('')
const cleanedUrl = ref('')
const downloadName = ref('clean-image.jpg')
const originalSize = ref(0)
const cleanedSize = ref(0)
const processing = ref(false)
const message = ref('')

function revoke(url) {
  if (url) URL.revokeObjectURL(url)
}

function formatBytes(bytes) {
  if (!bytes) return '0 KB'
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function outputType(type) {
  return ['image/jpeg', 'image/png', 'image/webp'].includes(type) ? type : 'image/jpeg'
}

function extensionFor(type) {
  if (type === 'image/png') return 'png'
  if (type === 'image/webp') return 'webp'
  return 'jpg'
}

async function cleanImage(file) {
  processing.value = true
  message.value = ''
  revoke(cleanedUrl.value)
  cleanedUrl.value = ''

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const context = canvas.getContext('2d', { alpha: true })
    context.drawImage(bitmap, 0, 0)
    bitmap.close()

    const type = outputType(file.type)
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, type === 'image/png' ? undefined : 0.94))
    if (!blob) throw new Error('encode')

    cleanedSize.value = blob.size
    cleanedUrl.value = URL.createObjectURL(blob)
    const base = file.name.replace(/\.[^.]+$/, '') || 'image'
    downloadName.value = `${base}-clean.${extensionFor(type)}`
  } catch {
    message.value = t('exif.error')
  } finally {
    processing.value = false
  }
}

async function onFileChange(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    message.value = t('exif.unsupported')
    return
  }

  revoke(sourceUrl.value)
  sourceUrl.value = URL.createObjectURL(file)
  originalSize.value = file.size
  await cleanImage(file)
}

function resetAndChoose() {
  revoke(sourceUrl.value)
  revoke(cleanedUrl.value)
  sourceUrl.value = ''
  cleanedUrl.value = ''
  originalSize.value = 0
  cleanedSize.value = 0
  message.value = ''
  if (fileInput.value) fileInput.value.value = ''
  window.setTimeout(() => fileInput.value?.click(), 0)
}

onUnmounted(() => {
  revoke(sourceUrl.value)
  revoke(cleanedUrl.value)
})
</script>
