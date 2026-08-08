<template>
  <div class="page-view service-detail-view">
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
            <p class="eyebrow">{{ t('services.deliverablesEyebrow') }}</p>
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
            <p class="eyebrow">{{ t('services.audienceEyebrow') }}</p>
            <h2>{{ t('services.audienceTitle') }}</h2>
          </div>
          <p class="detail-lead" v-reveal>{{ localize(service.audience) }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container detail-grid">
          <div v-reveal>
            <p class="eyebrow">{{ t('services.methodsEyebrow') }}</p>
            <h2>{{ t('services.stackTitle') }}</h2>
          </div>
          <div class="tag-cloud" v-reveal>
            <span v-for="item in service.palette" :key="item">{{ item }}</span>
          </div>
        </div>
      </section>

      <section v-if="relatedProjects.length" class="section section-tinted">
        <div class="container">
          <header class="section-heading" v-reveal>
            <p class="eyebrow">{{ t('services.relatedEyebrow') }}</p>
            <h2>{{ t('services.relatedTitle') }}</h2>
          </header>
          <div class="project-grid">
            <ProjectCard v-for="project in relatedProjects" :key="project.slug" v-reveal :project="project" />
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container detail-grid">
          <div v-reveal>
            <p class="eyebrow">{{ t('services.processEyebrow') }}</p>
            <h2>{{ t('services.processTitle') }}</h2>
          </div>
          <div class="process-list">
            <article v-for="item in t('home.process').slice(0, 3)" :key="item[0]" v-reveal class="process-item">
              <span>{{ item[0] }}</span>
              <div>
                <h3>{{ item[1] }}</h3>
                <p>{{ item[2] }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section final-cta">
        <div class="container" v-reveal>
          <h2>{{ t('services.contactTitle') }}</h2>
          <a class="email-display" :href="emailHref">{{ site.brand.email }} ↗</a>
        </div>
      </section>
    </template>
    <NotFoundView v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NotFoundView from './NotFoundView.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { getProjectsForService, getService, site } from '../lib/content.js'
import { localize, t } from '../lib/locale.js'

const route = useRoute()
const service = computed(() => getService(route.params.slug))
const relatedProjects = computed(() =>
  service.value ? getProjectsForService(service.value.slug).slice(0, 4) : [],
)
const emailHref = computed(() => {
  const subject = encodeURIComponent(`${localize(service.value?.title)} — ${t('contact.mailSubject')}`)
  return `mailto:${site.brand.email}?subject=${subject}`
})
</script>
