<template>
  <div class="page-view home-view">
    <V5HeroLab :project-mail-href="projectMailHref" />

    <section class="section" id="services">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('home.servicesEyebrow') }}</p>
          <h2>{{ t('home.disciplinesTitle') }}</h2>
          <p>{{ t('home.disciplinesIntro') }}</p>
        </header>
        <div class="service-grid">
          <ServiceCard v-for="service in services" :key="service.slug" v-reveal :service="service" />
        </div>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('home.engagementEyebrow') }}</p>
          <h2>{{ t('home.engagementTitle') }}</h2>
          <p>{{ t('home.engagementIntro') }}</p>
        </header>
        <div class="engagement-grid">
          <article v-for="item in t('home.engagements')" :key="item[0]" v-reveal class="engagement-card">
            <span>{{ item[0] }}</span>
            <h3>{{ item[1] }}</h3>
            <p>{{ item[2] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-heading section-heading-row" v-reveal>
          <div>
            <p class="eyebrow">{{ t('home.selectedWorkEyebrow') }}</p>
            <h2>{{ t('home.featuredTitle') }}</h2>
            <p>{{ t('home.featuredIntro') }}</p>
          </div>
          <RouterLink class="text-link" to="/projects">{{ t('common.viewAll') }} →</RouterLink>
        </header>
        <div class="project-grid">
          <ProjectCard v-for="project in featuredProjects" :key="project.slug" v-reveal :project="project" />
        </div>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container split-layout">
        <header class="section-heading sticky-heading" v-reveal>
          <p class="eyebrow">{{ t('home.methodEyebrow') }}</p>
          <h2>{{ t('home.processTitle') }}</h2>
        </header>
        <div class="process-list">
          <article v-for="item in t('home.process')" :key="item[0]" v-reveal class="process-item">
            <span>{{ item[0] }}</span>
            <div>
              <h3>{{ item[1] }}</h3>
              <p>{{ item[2] }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container experience-preview">
        <div v-reveal>
          <p class="eyebrow">{{ t('home.experienceEyebrow') }}</p>
          <h2>{{ t('home.experienceTitle') }}</h2>
          <p>{{ t('home.experienceIntro') }}</p>
          <RouterLink class="button button-light" to="/experience">{{ t('nav.experience') }} →</RouterLink>
        </div>
        <div class="experience-stack">
          <article v-for="item in experiencePreview" :key="localize(item.institution)" v-reveal>
            <span>{{ localize(item.period) }}</span>
            <h3>{{ localize(item.institution) }}</h3>
            <p>{{ localize(item.role) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container" v-reveal>
        <p class="eyebrow">{{ t('home.conversationEyebrow') }}</p>
        <h2>{{ t('home.finalTitle') }}</h2>
        <p>{{ t('home.finalText') }}</p>
        <a class="email-display" :href="`mailto:${site.brand.email}`">{{ site.brand.email }} ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import V5HeroLab from '../components/V5HeroLab.vue'
import { experience, projects, services, site } from '../lib/content.js'
import { localize, t } from '../lib/locale.js'

const featuredProjects = projects.filter((project) => project.featured)
const experiencePreview = [
  experience.nonprofit[0],
  experience.professional[0],
  experience.professional[1],
]
const projectMailHref = computed(() =>
  `mailto:${site.brand.email}?subject=${encodeURIComponent(t('contact.mailSubject'))}`,
)
</script>
