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
          <div class="contrast-inputs">
            <label>{{ copy.foreground }}<input v-model="foreground" type="color" /></label>
            <label>{{ copy.background }}<input v-model="background" type="color" /></label>
            <button class="button button-ghost" type="button" @click="swap">{{ copy.swap }}</button>
          </div>

          <div class="contrast-preview" :style="{ color: foreground, backgroundColor: background }">
            <strong>Aa</strong>
            <span>{{ copy.preview }}</span>
          </div>

          <div class="tool-stat-grid">
            <article><span>{{ copy.ratio }}</span><strong>{{ ratio.toFixed(2) }}:1</strong></article>
            <article><span>AA · {{ copy.normal }}</span><strong>{{ ratio >= 4.5 ? copy.pass : copy.fail }}</strong></article>
            <article><span>AAA · {{ copy.normal }}</span><strong>{{ ratio >= 7 ? copy.pass : copy.fail }}</strong></article>
            <article><span>AA · {{ copy.large }}</span><strong>{{ ratio >= 3 ? copy.pass : copy.fail }}</strong></article>
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
  tr: { eyebrow: 'Yerel çalışan tasarım aracı', title: 'Kontrast Kontrolü', intro: 'İki rengin WCAG kontrast oranını ve temel AA/AAA erişilebilirlik eşiklerini anında hesaplar.', foreground: 'Yazı rengi', background: 'Arka plan', swap: 'Renkleri değiştir', preview: 'Okunabilirlik önizlemesi', ratio: 'Kontrast', normal: 'Normal metin', large: 'Büyük metin', pass: 'Geçer', fail: 'Kalır' },
  en: { eyebrow: 'Local design utility', title: 'Contrast Checker', intro: 'Calculates the WCAG contrast ratio and core AA/AAA accessibility thresholds for two colors.', foreground: 'Text color', background: 'Background', swap: 'Swap colors', preview: 'Readability preview', ratio: 'Contrast', normal: 'Normal text', large: 'Large text', pass: 'Pass', fail: 'Fail' },
}

const copy = computed(() => texts[locale.value])
const foreground = ref('#121417')
const background = ref('#f3f0e8')

function luminance(hex) {
  const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => parseInt(part, 16) / 255)
  const channels = rgb.map((value) => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

const ratio = computed(() => {
  const first = luminance(foreground.value)
  const second = luminance(background.value)
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + 0.05) / (darker + 0.05)
})

function swap() {
  ;[foreground.value, background.value] = [background.value, foreground.value]
}
</script>
