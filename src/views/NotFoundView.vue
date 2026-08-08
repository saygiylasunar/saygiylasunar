<template>
  <div class="page-view not-found-view">
    <section class="not-found-section">
      <div class="container narrow-container">
        <div class="status-state status-state-404">
          <img
            class="status-artwork"
            :src="imageSrc"
            alt=""
            width="960"
            height="960"
            decoding="async"
          />
          <div class="status-state-copy">
            <p class="eyebrow">404</p>
            <h1>{{ t('notFound.title') }}</h1>
            <p>{{ t('notFound.text') }}</p>
            <RouterLink class="button button-primary" to="/">{{ t('nav.home') }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { locale, t } from '../lib/locale.js'

const imageSrc = computed(() =>
  locale.value === 'en' ? '/cuvuk/404-en.webp' : '/cuvuk/404-tr.webp',
)
</script>
