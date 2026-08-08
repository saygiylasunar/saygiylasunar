<template>
  <section class="construction-panel construction-panel-rich">
    <img
      class="construction-visual"
      :src="imageSrc"
      alt=""
      width="720"
      height="720"
      loading="lazy"
      decoding="async"
    />
    <div class="construction-copy">
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
