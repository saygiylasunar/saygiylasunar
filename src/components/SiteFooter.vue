<template>
  <footer class="site-footer">
    <div class="container footer-grid footer-grid-rich">
      <div class="footer-identity">
        <p class="footer-name">{{ site.brand.name }}</p>
        <p>Saygıyla Sunar · {{ locale === 'tr' ? 'dijital çalışma alanı' : 'digital work space' }}</p>
        <a class="footer-email" :href="`mailto:${site.brand.email}`">{{ site.brand.email }}</a>
      </div>

      <nav class="footer-map" :aria-label="locale === 'tr' ? 'Site haritası' : 'Site map'">
        <div>
          <strong>{{ locale === 'tr' ? 'Çalışmalar' : 'Work' }}</strong>
          <RouterLink to="/projects">{{ locale === 'tr' ? 'Projeler' : 'Projects' }}</RouterLink>
          <RouterLink to="/services">{{ locale === 'tr' ? 'Hizmetler' : 'Services' }}</RouterLink>
          <RouterLink to="/experience">{{ locale === 'tr' ? 'Deneyim' : 'Experience' }}</RouterLink>
          <RouterLink to="/music">{{ locale === 'tr' ? 'Müzik' : 'Music' }}</RouterLink>
        </div>
        <div>
          <strong>{{ locale === 'tr' ? 'Yayınlar / Araçlar' : 'Publishing / Tools' }}</strong>
          <RouterLink to="/blog">Blog</RouterLink>
          <RouterLink to="/tools">{{ locale === 'tr' ? 'Araçlar' : 'Tools' }}</RouterLink>
          <RouterLink to="/ogg">ÖGG</RouterLink>
          <RouterLink to="/arsalar">{{ locale === 'tr' ? 'Arsalar' : 'Land' }}</RouterLink>
        </div>
        <div>
          <strong>{{ locale === 'tr' ? 'Bağlantılar' : 'Links' }}</strong>
          <RouterLink to="/about">{{ locale === 'tr' ? 'Hakkımda' : 'About' }}</RouterLink>
          <RouterLink to="/contact">{{ locale === 'tr' ? 'İletişim' : 'Contact' }}</RouterLink>
          <a :href="site.profiles.github" target="_blank" rel="noreferrer">GitHub</a>
          <a :href="site.profiles.linkedin" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </nav>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} {{ site.brand.name }}</span>
      <div class="footer-socials">
        <a :href="site.profiles.youtube" target="_blank" rel="noreferrer">YouTube</a>
        <a :href="site.profiles.instagram" target="_blank" rel="noreferrer">Instagram</a>
        <a :href="site.profiles.tiktok" target="_blank" rel="noreferrer">TikTok</a>
        <a :href="site.profiles.x" target="_blank" rel="noreferrer">X</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { site } from '../lib/content.js'
import { locale } from '../lib/locale.js'

const year = new Date().getFullYear()
</script>
