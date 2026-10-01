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
          <button class="icon-button" type="button" :aria-label="themeLabel" @click="toggleTheme">
            {{ theme === 'dark' ? '☀' : '◐' }}
          </button>
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
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = ref(localStorage.getItem('site-theme') || preferredTheme)
const themeLabel = computed(() =>
  theme.value === 'dark' ? t('common.switchToLight') : t('common.switchToDark'),
)

function applyTheme() {
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('site-theme', theme.value)
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme()
}

function toggleLocale() {
  setLocale(locale.value === 'tr' ? 'en' : 'tr')
}

function closeMenu() {
  menuOpen.value = false
  if (moreEl.value) moreEl.value.open = false
}

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

function onDocumentPointer(event) {
  if (moreEl.value?.open && !moreEl.value.contains(event.target)) moreEl.value.open = false
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
