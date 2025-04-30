<template>
  <nav class="navbar">
    <div class="nav-content">
      <!-- LOGO ALANI -->
      <a href="#home" class="nav-logo">Saygıyla Sunar</a>

      <!-- MENÜ -->
      <div class="nav-links">
        <a href="#home" class="nav-item">{{ $t("navbar.home") }}</a>
        <a href="#portfolio" class="nav-item">{{ $t("navbar.portfolio") }}</a>
        <a href="#cv" class="nav-item">{{ $t("navbar.cv") }}</a>
        <a href="#tools" class="nav-item">Tools</a>
        <a href="#contact" class="nav-item">{{ $t("navbar.contact") }}</a>
      </div>

      <!-- TEMA VE DİL -->
      <div class="nav-controls">
        <ThemeToggle />
        <select class="lang-switch" @change="changeLang" :value="locale">
          <option value="tr">🇹🇷</option>
          <option value="en">🇬🇧</option>
        </select>
      </div>
    </div>
  </nav>
</template>

<script setup>
import ThemeToggle from '../components/ThemeToggle.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
function changeLang(event) {
  locale.value = event.target.value
}
</script>

<style scoped>
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

.lang-switch {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0.25rem 0.5rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  cursor: pointer;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* şimdilik collapse */
  }
  .nav-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>