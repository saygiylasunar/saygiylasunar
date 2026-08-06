<template>
  <section class="page-hero contact-hero">
    <div class="container narrow-container">
      <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
      <h1>{{ t('contact.title') }}</h1>
      <p>{{ t('contact.text') }}</p>
      <a class="email-display" href="mailto:saygiylasunar@gmail.com?subject=Project%20Inquiry">saygiylasunar@gmail.com ↗</a>
      <p class="privacy-note">{{ t('contact.privacy') }}</p>
    </div>
  </section>
</template>

<script setup>
import { t } from '../i18n.js'
</script>
