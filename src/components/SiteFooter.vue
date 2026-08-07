<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-name">{{ site.brand.name }}</p>
        <p>{{ t('footer.line') }}</p>
      </div>
      <div class="footer-links">
        <a :href="`mailto:${site.brand.email}`">{{ site.brand.email }}</a>
        <a :href="site.profiles.github" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="site.profiles.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        <RouterLink to="/arsalar">{{ t('nav.lands') }}</RouterLink>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© {{ year }} {{ t('footer.rights') }}</span>
      <RouterLink to="/tools/password">{{ t('nav.password') }}</RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { site } from '../lib/content.js'
import { t } from '../lib/locale.js'

const year = new Date().getFullYear()
</script>
