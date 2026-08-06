<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink class="brand" to="/" aria-label="Saygıyla Sunar ana sayfa">
        <span class="brand-mark">S/</span>
        <span class="brand-copy">
          <strong>Ersen Filiz</strong>
          <small>Saygıyla Sunar</small>
        </span>
      </RouterLink>

      <button class="menu-button" type="button" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <span>{{ t('common.menu') }}</span>
        <i aria-hidden="true"></i>
      </button>

      <nav class="primary-nav" :class="{ 'is-open': menuOpen }" aria-label="Ana navigasyon">
        <RouterLink to="/services" @click="closeMenu">{{ t('nav.services') }}</RouterLink>
        <RouterLink to="/projects" @click="closeMenu">{{ t('nav.projects') }}</RouterLink>
        <RouterLink to="/experience" @click="closeMenu">{{ t('nav.experience') }}</RouterLink>
        <RouterLink to="/about" @click="closeMenu">{{ t('nav.about') }}</RouterLink>
        <RouterLink class="nav-contact" to="/contact" @click="closeMenu">{{ t('nav.contact') }}</RouterLink>

        <div class="header-actions">
          <button class="text-button" type="button" @click="toggleLocale">
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
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { locale, setLocale, t } from '../i18n.js'

const menuOpen = ref(false)
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const theme = ref(localStorage.getItem('site-theme') || preferredTheme)
const themeLabel = computed(() => (theme.value === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'))

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

onMounted(applyTheme)
</script>
