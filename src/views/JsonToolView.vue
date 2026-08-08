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
          <textarea v-model="input" class="json-editor" spellcheck="false" :placeholder="copy.placeholder"></textarea>
          <div class="tool-action-row">
            <button class="button button-primary" type="button" @click="formatJson">{{ copy.format }}</button>
            <button class="button button-ghost" type="button" @click="minifyJson">{{ copy.minify }}</button>
            <button class="button button-ghost" type="button" @click="copyJson">{{ copied ? copy.copied : copy.copy }}</button>
          </div>
          <p class="json-status" :class="{ 'is-valid': valid === true, 'is-invalid': valid === false }">
            {{ statusText }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { locale } from '../lib/locale.js'

const texts = {
  tr: { eyebrow: 'Yerel çalışan geliştirici aracı', title: 'JSON Düzenleyici', intro: 'JSON verisini tarayıcıda doğrular, okunabilir biçime getirir veya tek satıra indirir.', placeholder: '{"cuvuk":"hazır"}', format: 'Biçimlendir', minify: 'Minify', copy: 'Kopyala', copied: 'Kopyalandı', waiting: 'JSON girin.', valid: 'Geçerli JSON', invalid: 'Geçersiz JSON' },
  en: { eyebrow: 'Local developer utility', title: 'JSON Formatter', intro: 'Validates JSON in the browser, formats it for readability or minifies it to one line.', placeholder: '{"cuvuk":"ready"}', format: 'Format', minify: 'Minify', copy: 'Copy', copied: 'Copied', waiting: 'Enter JSON.', valid: 'Valid JSON', invalid: 'Invalid JSON' },
}

const copy = computed(() => texts[locale.value])
const input = ref('')
const valid = ref(null)
const error = ref('')
const copied = ref(false)

const statusText = computed(() => {
  if (!input.value.trim()) return copy.value.waiting
  if (valid.value === true) return copy.value.valid
  if (valid.value === false) return `${copy.value.invalid}: ${error.value}`
  return copy.value.waiting
})

function parse() {
  try {
    const value = JSON.parse(input.value)
    valid.value = true
    error.value = ''
    return value
  } catch (exception) {
    valid.value = false
    error.value = exception.message
    return null
  }
}

function formatJson() {
  const value = parse()
  if (valid.value) input.value = JSON.stringify(value, null, 2)
}

function minifyJson() {
  const value = parse()
  if (valid.value) input.value = JSON.stringify(value)
}

async function copyJson() {
  if (!input.value) return
  await navigator.clipboard.writeText(input.value)
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1400)
}
</script>
