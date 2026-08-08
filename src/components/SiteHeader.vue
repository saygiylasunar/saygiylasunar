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
        <RouterLink to="/services">{{ t('nav.services') }}</RouterLink>
        <RouterLink to="/projects">{{ t('nav.projects') }}</RouterLink>
        <RouterLink to="/music">{{ locale === 'tr' ? 'Müzik' : 'Music' }}</RouterLink>
        <RouterLink to="/experience">{{ t('nav.experience') }}</RouterLink>
        <RouterLink to="/about">{{ t('nav.about') }}</RouterLink>
        <RouterLink class="nav-contact" to="/contact">{{ t('nav.contact') }}</RouterLink>

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
}

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  applyTheme()
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
