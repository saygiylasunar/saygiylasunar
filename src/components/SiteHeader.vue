<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" :aria-label="t('common.homeAria')">
        <span class="brand-mark">S/</span>
        <span class="brand-copy">
          <strong>{{ site.brand.name }}</strong>
          <small>{{ site.brand.studio }}</small>
        </span>
      </RouterLink>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? t('common.closeMenu') : t('common.openMenu')"
        @click="menuOpen = !menuOpen"
      >
        <span>{{ t('common.menu') }}</span>
        <i aria-hidden="true"></i>
      </button>

      <nav
        class="primary-nav"
        :class="{ 'is-open': menuOpen }"
        :aria-label="t('common.primaryNavAria')"
      >
        <RouterLink to="/projects">{{ locale === 'tr' ? 'Projeler' : 'Projects' }}</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <RouterLink to="/tools">{{ locale === 'tr' ? 'Araçlar' : 'Tools' }}</RouterLink>
        <RouterLink to="/experience">{{ locale === 'tr' ? 'Deneyim' : 'Experience' }}</RouterLink>

        <details ref="moreEl" class="nav-more">
          <summary>{{ locale === 'tr' ? 'Keşfet' : 'Explore' }}</summary>
          <div class="nav-more-panel">
            <RouterLink to="/services">{{ locale === 'tr' ? 'Hizmetler' : 'Services' }}</RouterLink>
            <RouterLink to="/music">{{ locale === 'tr' ? 'Müzik' : 'Music' }}</RouterLink>
            <RouterLink to="/ogg">ÖGG</RouterLink>
            <RouterLink to="/arsalar">{{ locale === 'tr' ? 'Arsalar' : 'Land' }}</RouterLink>
            <RouterLink to="/about">{{ locale === 'tr' ? 'Hakkımda' : 'About' }}</RouterLink>
            <RouterLink class="nav-contact" to="/contact">{{ locale === 'tr' ? 'İletişim' : 'Contact' }}</RouterLink>
          </div>
        </details>

        <div class="header-actions">
          <button
            class="text-button"
            type="button"
            :aria-label="`${t('common.language')}: ${locale === 'tr' ? 'English' : 'Türkçe'}`"
            @click="toggleLocale"
          >
            {{ locale === 'tr' ? 'EN' : 'TR' }}
          </button>

          <details ref="themeEl" class="theme-picker">
            <summary class="icon-button" :aria-label="themePickerLabel">◑</summary>
            <div class="theme-picker-panel">
              <div class="theme-picker-heading">
                <span>{{ locale === 'tr' ? 'Tema' : 'Theme' }}</span>
                <small>{{ currentThemeLabel }}</small>
              </div>
              <button
                v-for="item in themes"
                :key="item.id"
                class="theme-option"
                :class="{ 'is-active': theme === item.id }"
                type="button"
                :aria-pressed="theme === item.id"
                @click="setTheme(item.id)"
              >
                <span class="theme-swatch" :class="`theme-swatch-${item.id}`" aria-hidden="true"></span>
                <span>{{ locale === 'tr' ? item.tr : item.en }}</span>
                <span class="theme-option-check" aria-hidden="true">✓</span>
              </button>
            </div>
          </details>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { site } from '../lib/content.js'
import { locale, setLocale, t } from '../lib/locale.js'

const route = useRoute()
const menuOpen = ref(false)
const moreEl = ref(null)
const themeEl = ref(null)

const themes = [
  { id: 'light', tr: 'Ivory', en: 'Ivory', meta: '#f3f0e8' },
  { id: 'dark', tr: 'Koyu', en: 'Dark', meta: '#0b0d10' },
  { id: 'pastel', tr: 'Pastel', en: 'Pastel', meta: '#f8f4fb' },
  { id: 'earth', tr: 'Toprak', en: 'Earth', meta: '#f6eee5' },
  { id: 'green', tr: 'Adaçayı', en: 'Sage', meta: '#f0f6ef' },
  { id: 'flowers', tr: 'Çiçek', en: 'Bloom', meta: '#fff5f7' },
  { id: 'ocean', tr: 'Okyanus', en: 'Ocean', meta: '#edf8fa' },
  { id: 'night', tr: 'Gece', en: 'Night', meta: '#10182b' },
  { id: 'gold-white', tr: 'Altın Açık', en: 'Gold Light', meta: '#fffdf7' },
  { id: 'gold-black', tr: 'Altın Gece', en: 'Gold Night', meta: '#0d0c0a' },
]

const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const storedTheme = localStorage.getItem('site-theme')
const theme = ref(themes.some((item) => item.id === storedTheme) ? storedTheme : preferredTheme)

const currentTheme = computed(() => themes.find((item) => item.id === theme.value) || themes[0])
const currentThemeLabel = computed(() => locale.value === 'tr' ? currentTheme.value.tr : currentTheme.value.en)
const themePickerLabel = computed(() =>
  locale.value === 'tr'
    ? `Tema seç · ${currentThemeLabel.value}`
    : `Choose theme · ${currentThemeLabel.value}`,
)

function applyTheme() {
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('site-theme', theme.value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', currentTheme.value.meta)
}

function setTheme(id) {
  theme.value = id
  applyTheme()
  if (themeEl.value) themeEl.value.open = false
}

function toggleLocale() {
  setLocale(locale.value === 'tr' ? 'en' : 'tr')
}

function closeMenu() {
  menuOpen.value = false
  if (moreEl.value) moreEl.value.open = false
  if (themeEl.value) themeEl.value.open = false
}

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

function onDocumentPointer(event) {
  if (moreEl.value?.open && !moreEl.value.contains(event.target)) moreEl.value.open = false
  if (themeEl.value?.open && !themeEl.value.contains(event.target)) themeEl.value.open = false
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  applyTheme()
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onDocumentPointer)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onDocumentPointer)
})
</script>
