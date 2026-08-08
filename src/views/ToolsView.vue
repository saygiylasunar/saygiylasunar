<template>
  <div class="page-view tools-view">
    <section class="page-hero compact-hero">
      <div class="container narrow-container">
        <p class="eyebrow">{{ t('tools.eyebrow') }}</p>
        <h1>{{ t('tools.title') }}</h1>
        <p>{{ t('tools.intro') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container tools-grid">
        <RouterLink class="tool-card" to="/tools/password" v-reveal>
          <span class="tool-card-index">01</span>
          <h2>{{ t('tools.passwordTitle') }}</h2>
          <p>{{ t('tools.passwordText') }}</p>
          <strong>{{ t('common.openTool') }} →</strong>
        </RouterLink>

        <RouterLink class="tool-card" to="/tools/exif" v-reveal>
          <span class="tool-card-index">02</span>
          <h2>{{ t('tools.exifTitle') }}</h2>
          <p>{{ t('tools.exifText') }}</p>
          <strong>{{ t('common.openTool') }} →</strong>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { t } from '../lib/locale.js'
</script>
