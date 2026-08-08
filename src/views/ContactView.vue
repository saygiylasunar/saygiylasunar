<template>
  <div class="page-view contact-view">
    <section class="page-hero contact-hero">
      <div class="container narrow-container">
        <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
        <h1>{{ t('contact.title') }}</h1>
        <p>{{ t('contact.text') }}</p>
        <a class="email-display" :href="mailHref">{{ site.brand.email }} ↗</a>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container">
        <header class="section-heading" v-reveal>
          <h2>{{ t('contact.briefTitle') }}</h2>
        </header>
        <div class="contact-brief-grid">
          <article v-for="item in t('contact.brief')" :key="item[0]" v-reveal>
            <span>{{ item[0] }}</span>
            <h3>{{ item[1] }}</h3>
            <p>{{ item[2] }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { site } from '../lib/content.js'
import { t } from '../lib/locale.js'

const mailHref = computed(() =>
  `mailto:${site.brand.email}?subject=${encodeURIComponent(t('contact.mailSubject'))}`,
)
</script>
