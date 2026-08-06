<template>
  <section class="page-hero contact-hero">
    <div class="container narrow-container">
      <p class="eyebrow">404</p>
      <h1>{{ t('notFound.title') }}</h1>
      <p>{{ t('notFound.text') }}</p>
      <RouterLink class="button button-primary" to="/">{{ t('nav.home') }}</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { t } from '../i18n.js'
</script>
