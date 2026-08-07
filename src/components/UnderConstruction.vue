<template>
  <section class="construction-panel">
    <img src="/cuvuk-construction.svg" alt="" />
    <div>
      <span class="status-pill">{{ t('common.inDevelopment') }}</span>
      <h2>{{ t('projects.underTitle') }}</h2>
      <p>{{ t('projects.underText') }}</p>
    </div>
  </section>
</template>

<script setup>
import { t } from '../lib/locale.js'
</script>
