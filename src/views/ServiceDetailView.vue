<template>
  <template v-if="service">
    <section class="page-hero service-hero">
      <div class="container service-detail-head">
        <span class="giant-number">{{ service.number }}</span>
        <div>
          <p class="eyebrow">{{ t('services.eyebrow') }}</p>
          <h1>{{ localize(service.title) }}</h1>
          <p>{{ localize(service.description) }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container detail-grid">
        <div v-reveal>
          <p class="eyebrow">Deliverables</p>
          <h2>{{ t('services.outcomesTitle') }}</h2>
        </div>
        <ul class="outcome-list">
          <li v-for="(item, index) in localize(service.outcomes)" :key="item" v-reveal>
            <span>0{{ index + 1 }}</span>{{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container detail-grid">
        <div v-reveal>
          <p class="eyebrow">Tools & Methods</p>
          <h2>{{ t('services.stackTitle') }}</h2>
        </div>
        <div class="tag-cloud" v-reveal>
          <span v-for="item in service.palette" :key="item">{{ item }}</span>
        </div>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container" v-reveal>
        <h2>{{ t('services.contactTitle') }}</h2>
        <a class="email-display" :href="emailHref">saygiylasunar@gmail.com ↗</a>
      </div>
    </section>
  </template>
  <NotFoundView v-else />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NotFoundView from './NotFoundView.vue'
import { getService } from '../data/services.js'
import { localize, t } from '../i18n.js'

const route = useRoute()
const service = computed(() => getService(route.params.slug))
const emailHref = computed(() => {
  const subject = encodeURIComponent(`${localize(service.value?.title)} — Project Inquiry`)
  return `mailto:saygiylasunar@gmail.com?subject=${subject}`
})
</script>
