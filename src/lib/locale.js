import { computed, ref } from 'vue'
import ui from '../content/ui.json'

const supportedLocales = ['tr', 'en']
const storedLocale = localStorage.getItem('site-locale')
const browserLocale = navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'tr'

export const locale = ref(
  supportedLocales.includes(storedLocale) ? storedLocale : browserLocale,
)

export function setLocale(nextLocale) {
  if (!supportedLocales.includes(nextLocale)) return
  locale.value = nextLocale
  localStorage.setItem('site-locale', nextLocale)
  document.documentElement.lang = nextLocale
}

export function t(path, fallback = '') {
  const value = path
    .split('.')
    .reduce((current, key) => current?.[key], ui[locale.value])

  return value ?? fallback ?? path
}

export function localize(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[locale.value] ?? value.tr ?? value.en ?? ''
  }
  return value ?? ''
}

export function useLocale() {
  return {
    locale,
    localeLabel: computed(() => (locale.value === 'tr' ? 'Türkçe' : 'English')),
    setLocale,
    t,
    localize,
  }
}

setLocale(locale.value)
