<template>
  <nav class="navbar">
    <div class="nav-content">
      <a href="#home" class="nav-logo">Saygıyla Sunar</a>

      <div class="nav-links">
        <a href="#portfolio" class="nav-item">{{ $t('navbar.portfolio') }}</a>
        <a href="#cv" class="nav-item">{{ $t('navbar.cv') }}</a>
        <a href="#tools" class="nav-item">{{ $t('navbar.tools') }}</a>
        <a href="#contact" class="nav-item">{{ $t('navbar.contact') }}</a>
      </div>

      <div class="nav-controls">
        <div class="theme-switcher-wrapper">
          <button @click="toggleThemeDropdown" class="theme-current">
            🎨 Tema
          </button>
          <ul v-if="isThemeOpen" class="theme-dropdown">
            <li @click="applyTheme('theme1')">{{ $t('themes.default') }}</li>
            <li @click="applyTheme('theme2')">{{ $t('themes.theme2') }}</li>
            <li @click="applyTheme('palet001')">{{ $t('themes.palet001') }}</li>
            <li @click="applyTheme('palet002')">{{ $t('themes.palet002') }}</li>
            <li @click="applyTheme('palet003')">{{ $t('themes.palet003') }}</li>
            <li @click="applyTheme('palet004')">{{ $t('themes.palet004') }}</li>
            <li @click="applyTheme('palet005')">{{ $t('themes.palet005') }}</li>
            <li @click="applyTheme('palet006')">{{ $t('themes.palet006') }}</li>
          </ul>
        </div>
        <ThemeToggle @mode-changed="applyModeAndReapplyTheme" />
        <div class="lang-switch-wrapper">
          <button @click="toggleLangDropdown" class="lang-current">
            {{ currentLabel }}
          </button>
          <ul v-if="isLangOpen" class="lang-dropdown">
            <li @click="selectLang('tr')">🇹🇷 Türkçe</li>
            <li @click="selectLang('en')">🇬🇧 English</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import ThemeToggle from '../components/ThemeToggle.vue';
import { useI18n } from 'vue-i18n';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const { locale, t } = useI18n();

const isLangOpen = ref(false);
function toggleLangDropdown() {
  isLangOpen.value = !isLangOpen.value;
}
function selectLang(lang) {
  locale.value = lang;
  isLangOpen.value = false;
}
const currentLabel = computed(() =>
  locale.value === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'
);

const isThemeOpen = ref(false);
const currentTheme = ref('theme1');

function applyMode(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('selectedMode', mode);
}

function applyTheme(paletName, forceMode = null) {
  const mode =
    forceMode || document.documentElement.getAttribute('data-theme') || 'light';
  applyMode(mode);
  const themeSet = themes[paletName] || themes['theme1'];
  const theme = themeSet[mode] || themeSet;
  for (const key in theme) {
    document.documentElement.style.setProperty(key, theme[key]);
  }
  currentTheme.value = paletName;
  localStorage.setItem('selectedTheme', paletName);
  isThemeOpen.value = false;
}

function applyModeAndReapplyTheme(newMode) {
  applyMode(newMode);
  applyTheme(currentTheme.value, newMode);
}

function toggleThemeDropdown() {
  isThemeOpen.value = !isThemeOpen.value;
}

function handleClickOutside(event) {
  if (!event.target.closest('.lang-switch-wrapper')) isLangOpen.value = false;
  if (!event.target.closest('.theme-switcher-wrapper'))
    isThemeOpen.value = false;
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  const savedTheme = localStorage.getItem('selectedTheme') || 'theme1';
  const savedMode = localStorage.getItem('selectedMode') || 'light';
  applyMode(savedMode);
  applyTheme(savedTheme, savedMode);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
/* Tema JSON (light/dark uyumlu olmalı) */

const themes = {
  theme1: {
    light: {
      '--color-background': '#ffffff',
      '--color-surface': '#f7f7f7',
      '--color-text': '#222222',
      '--color-text-secondary': '#555555',
      '--color-border': '#dddddd',
      '--color-accent': '#7f5af0',
      '--color-accent-light': '#b5a7f2',
      '--color-success': '#28a745',
      '--color-error': '#dc3545',
    },
    dark: {
      '--color-background': '#111111',
      '--color-surface': '#1a1a1a',
      '--color-text': '#f0f0f0',
      '--color-text-secondary': '#aaaaaa',
      '--color-border': '#333333',
      '--color-accent': '#7f5af0',
      '--color-accent-light': '#d3c8fa',
      '--color-success': '#28a745',
      '--color-error': '#dc3545',
    },
  },
  theme2: {
    light: {
      '--color-background': '#FCFAF8',
      '--color-surface': '#ffffff',
      '--color-text': '#1d1d1d',
      '--color-text-secondary': '#555555',
      '--color-border': '#feac5d',
      '--color-accent': 'linear-gradient(90deg, #ff5722, #feac5d)',
      '--color-accent-light': '#feac5d',
      '--color-success': '#4caf50',
      '--color-error': '#f44336',
    },
    dark: {
      '--color-background': '#140f1f',
      '--color-surface': '#2c2c2c',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#cccccc',
      '--color-border': '#ff8a50',
      '--color-accent': 'linear-gradient(90deg, #ff5722, #ff8a50)',
      '--color-accent-light': '#ff8a50',
      '--color-success': '#4caf50',
      '--color-error': '#f44336',
    },
  },
  palet001: {
    light: {
      '--color-background': '#f5e7ca',
      '--color-surface': '#ffffff',
      '--color-text': '#222222',
      '--color-text-secondary': '#555555',
      '--color-border': '#c7a6ae',
      '--color-accent': 'linear-gradient(90deg, #6f5c78, #c7a6ae)',
      '--color-accent-light': '#c7a6ae',
      '--color-success': '#a7bc78',
      '--color-error': '#d2c49d',
    },
    dark: {
      '--color-background': '#6f5c78',
      '--color-surface': '#3b3b3b',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#dddddd',
      '--color-border': '#a7bc78',
      '--color-accent': 'linear-gradient(90deg, #6f5c78, #a7bc78)',
      '--color-accent-light': '#a7bc78',
      '--color-success': '#c7a6ae',
      '--color-error': '#d2c49d',
    },
  },
  palet002: {
    light: {
      '--color-background': '#FCFAF8',
      '--color-surface': '#ffffff',
      '--color-text': '#1d1d1d',
      '--color-text-secondary': '#555555',
      '--color-border': '#feac5d',
      '--color-accent': 'linear-gradient(90deg, #1d828e, #feac5d)',
      '--color-accent-light': '#feac5d',
      '--color-success': '#ffffff',
      '--color-error': '#140f1f',
    },
    dark: {
      '--color-background': '#140f1f',
      '--color-surface': '#1d828e',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#cccccc',
      '--color-border': '#feac5d',
      '--color-accent': 'linear-gradient(90deg, #1d828e, #140f1f)',
      '--color-accent-light': '#1d828e',
      '--color-success': '#feac5d',
      '--color-error': '#FCFAF8',
    },
  },
  palet003: {
    light: {
      '--color-background': '#ffdbc3',
      '--color-surface': '#fff5e0',
      '--color-text': '#190933',
      '--color-text-secondary': '#555555',
      '--color-border': '#ee9e8e',
      '--color-accent': 'linear-gradient(90deg, #190933, #ee9e8e)',
      '--color-accent-light': '#ee9e8e',
      '--color-success': '#ffdbc3',
      '--color-error': '#fff5e0',
    },
    dark: {
      '--color-background': '#190933',
      '--color-surface': '#2c2c2c',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#cccccc',
      '--color-border': '#ee9e8e',
      '--color-accent': 'linear-gradient(90deg, #190933, #ffdbc3)',
      '--color-accent-light': '#190933',
      '--color-success': '#ee9e8e',
      '--color-error': '#ffdbc3',
    },
  },
  palet004: {
    light: {
      '--color-background': '#fbf0f3',
      '--color-surface': '#ffffff',
      '--color-text': '#222222',
      '--color-text-secondary': '#555555',
      '--color-border': '#f1c382',
      '--color-accent': 'linear-gradient(90deg, #91736c, #fbf0f3)',
      '--color-accent-light': '#fbf0f3',
      '--color-success': '#9fc48d',
      '--color-error': '#6976ad',
    },
    dark: {
      '--color-background': '#91736c',
      '--color-surface': '#3b3b3b',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#cccccc',
      '--color-border': '#9fc48d',
      '--color-accent': 'linear-gradient(90deg, #91736c, #9fc48d)',
      '--color-accent-light': '#91736c',
      '--color-success': '#f1c382',
      '--color-error': '#6976ad',
    },
  },
  palet005: {
    light: {
      '--color-background': '#f0f3fc',
      '--color-surface': '#ffffff',
      '--color-text': '#222222',
      '--color-text-secondary': '#555555',
      '--color-border': '#a3c5fb',
      '--color-accent': 'linear-gradient(90deg, #477081, #a3c5fb)',
      '--color-accent-light': '#a3c5fb',
      '--color-success': '#f784b3',
      '--color-error': '#efb475',
    },
    dark: {
      '--color-background': '#477081',
      '--color-surface': '#2c2c2c',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#cccccc',
      '--color-border': '#efb475',
      '--color-accent': 'linear-gradient(90deg, #477081, #efb475)',
      '--color-accent-light': '#477081',
      '--color-success': '#f784b3',
      '--color-error': '#a3c5fb',
    },
  },
  palet006: {
    light: {
      '--color-background': '#ffffff',
      '--color-surface': '#f5f5f5',
      '--color-text': '#0f172a',
      '--color-text-secondary': '#555555',
      '--color-border': '#3b82f6',
      '--color-accent': 'linear-gradient(90deg, #0f172a, #3b82f6)',
      '--color-accent-light': '#3b82f6',
      '--color-success': '#22c55e',
      '--color-error': '#ef4444',
    },
    dark: {
      '--color-background': '#0f172a',
      '--color-surface': '#1e293b',
      '--color-text': '#ffffff',
      '--color-text-secondary': '#cccccc',
      '--color-border': '#3b82f6',
      '--color-accent': 'linear-gradient(90deg, #0f172a, #3b82f6)',
      '--color-accent-light': '#0f172a',
      '--color-success': '#22c55e',
      '--color-error': '#ef4444',
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  z-index: 10000;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 2rem;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* FLEX YAPISI */
.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* LOGO */
.nav-logo {
  font-size: 1.2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  text-decoration: none;
  margin-right: 2rem;
}

/* MENÜ */
.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.nav-item {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-item:hover {
  color: var(--color-accent);
}

/* SAĞ TARAF */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/*.lang-switch {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
}*/

.lang-switch-wrapper {
  position: relative;
}

.lang-current {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  color: var(--color-text);
}

.lang-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.lang-dropdown li {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.lang-dropdown li:hover {
  background: var(--color-accent-light);
  color: var(--color-background);
}

/* RESPONSIVE: Menü hep açık kalır, alt alta dizilir */
@media (max-width: 768px) {
  .nav-content {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0;
  }

  .nav-controls {
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .nav-logo {
    flex: 1 1 100%;
    text-align: center;
  }
}

/*Temalar*/
.theme-switcher-wrapper {
  position: relative;
}

.theme-current {
  background: transparent;
  border: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.theme-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.theme-dropdown li {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.theme-dropdown li:hover {
  background: var(--color-accent-light);
  color: var(--color-background);
}
</style>
