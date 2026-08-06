<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-name">Ersen Filiz</p>
        <p>{{ t('footer.line') }}</p>
      </div>
      <div class="footer-links">
        <a href="mailto:saygiylasunar@gmail.com">saygiylasunar@gmail.com</a>
        <a href="https://github.com/saygiylasunar" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/saygiylasunar" target="_blank" rel="noreferrer">LinkedIn</a>
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
import { t } from '../i18n.js'

const year = new Date().getFullYear()
</script>
