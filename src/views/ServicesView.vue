<template>
  <div class="page-view services-view">
    <section class="page-hero compact-hero">
      <div class="container">
        <p class="eyebrow">{{ t('services.eyebrow') }}</p>
        <h1>{{ t('services.title') }}</h1>
        <p>{{ t('services.intro') }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container service-grid service-grid-page">
        <ServiceCard v-for="service in services" :key="service.slug" v-reveal :service="service" />
      </div>
    </section>
  </div>
</template>

<script setup>
import ServiceCard from '../components/ServiceCard.vue'
import { services } from '../lib/content.js'
import { t } from '../lib/locale.js'
</script>
