<template>
  <section class="status-state construction-state">
    <img
      class="status-artwork"
      :src="imageSrc"
      alt=""
      width="960"
      height="960"
      loading="lazy"
      decoding="async"
    />
    <div class="status-state-copy">
      <span class="status-pill">{{ t('common.inDevelopment') }}</span>
      <h2>{{ t('projects.underTitle') }}</h2>
      <p>{{ t('projects.underText') }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { locale, t } from '../lib/locale.js'

const imageSrc = computed(() =>
  locale.value === 'en'
    ? '/cuvuk/construction-en.webp'
    : '/cuvuk/construction-tr.webp',
)
</script>
