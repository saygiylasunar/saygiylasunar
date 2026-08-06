<template>
  <RouterLink class="service-card" :to="`/services/${service.slug}`">
    <span class="service-number">{{ service.number }}</span>
    <h3>{{ localize(service.title) }}</h3>
    <p>{{ localize(service.short) }}</p>
    <span class="card-link">{{ t('common.explore') }} <b aria-hidden="true">↗</b></span>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { localize, t } from '../i18n.js'

defineProps({
  service: { type: Object, required: true },
})
</script>
