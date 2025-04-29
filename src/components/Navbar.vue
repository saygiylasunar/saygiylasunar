<template>
  <nav class="navbar">
    <div class="logo">EFS</div>
    <ul class="nav-links">
      <li><a href="#cv">{{ $t("navbar.cv") }}</a></li>
      <li><a href="#portfolio">{{ $t("navbar.portfolio") }}</a></li>
      <li><a href="#contact">{{ $t("navbar.contact") }}</a></li>
    </ul>
    <div class="toggles">
      <button @click="$emit('toggleTheme')">🌓</button>
      <button @click="toggleLocale">{{ currentLocale.toUpperCase() }}</button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

function toggleLocale() {
  locale.value = locale.value === 'tr' ? 'en' : 'tr'
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.logo {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: var(--color-accent);
}

.toggles button {
  margin-left: 1rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.toggles button:hover {
  color: var(--color-accent);
}
</style>