<template>
  <div class="page-view home-view home-v3">
    <section class="v3-hero">
      <div class="v3-hero-noise" aria-hidden="true"></div>
      <div class="container v3-hero-layout">
        <div class="v3-hero-copy">
          <p class="eyebrow">{{ t('homeV3.studio') }}</p>
          <h1>{{ t('homeV3.title') }}</h1>
          <p class="v3-hero-intro">{{ t('homeV3.intro') }}</p>
          <div class="hero-actions">
            <RouterLink class="button button-primary" to="/projects">{{ t('homeV3.exploreWork') }}</RouterLink>
            <RouterLink class="button button-ghost" to="/logbook">{{ t('homeV3.readLogbook') }}</RouterLink>
            <button class="button button-quiet" type="button" @click="openLauncher">{{ t('homeV3.openLauncher') }} ↗</button>
          </div>
          <div class="v3-signal">
            <span>{{ t('homeV3.signal') }}</span>
            <p>{{ t('homeV3.signalText') }}</p>
          </div>
        </div>

        <aside class="v3-signature" aria-label="Ersen Filiz">
          <div class="signature-top">
            <span>EF / 26</span>
            <span>TR ↔ EN</span>
          </div>
          <div class="signature-core">
            <span class="signature-slash">S/</span>
            <strong>{{ site.brand.name }}</strong>
            <p>{{ site.brand.studio }}</p>
          </div>
          <div class="signature-grid">
            <span>ENGINEERING</span>
            <span>AI</span>
            <span>DESIGN</span>
            <span>MUSIC</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section v3-work-section">
      <div class="container">
        <header class="section-heading section-heading-row" v-reveal>
          <div>
            <p class="eyebrow">{{ t('homeV3.workEyebrow') }}</p>
            <h2>{{ t('homeV3.workTitle') }}</h2>
            <p>{{ t('homeV3.workIntro') }}</p>
          </div>
          <RouterLink class="text-link" to="/projects">{{ t('common.viewAll') }} →</RouterLink>
        </header>
        <div class="v3-featured-grid">
          <ProjectCard v-for="project in featuredProjects" :key="project.slug" v-reveal :project="project" />
        </div>
      </div>
    </section>

    <section class="section section-dark v3-building-section">
      <div class="container v3-building-layout">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('homeV3.buildingEyebrow') }}</p>
          <h2>{{ t('homeV3.buildingTitle') }}</h2>
        </header>
        <div class="v3-building-list">
          <RouterLink
            v-for="(item, index) in t('homeV3.buildingItems')"
            :key="item[0]"
            :to="item[2]"
            class="v3-building-row"
            v-reveal
          >
            <span>0{{ index + 1 }}</span>
            <strong>{{ item[0] }}</strong>
            <p>{{ item[1] }}</p>
            <i aria-hidden="true">↗</i>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section v3-logbook-section">
      <div class="container">
        <header class="section-heading section-heading-row" v-reveal>
          <div>
            <p class="eyebrow">{{ t('homeV3.logEyebrow') }}</p>
            <h2>{{ t('homeV3.logTitle') }}</h2>
            <p>{{ t('homeV3.logIntro') }}</p>
          </div>
          <RouterLink class="text-link" to="/logbook">{{ t('homeV3.readLogbook') }} →</RouterLink>
        </header>

        <div class="v3-log-preview">
          <RouterLink
            v-for="entry in latestLogbook"
            :key="entry.slug"
            :to="`/logbook/${entry.slug}`"
            class="v3-log-entry"
            v-reveal
          >
            <div>
              <span>{{ localize(entry.category) }}</span>
              <time :datetime="entry.publishedAt">{{ formatDate(entry.publishedAt) }}</time>
            </div>
            <h3>{{ localize(entry.title) }}</h3>
            <p>{{ localize(entry.description) }}</p>
            <strong>{{ t('logbook.read') }} →</strong>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section-tinted v3-capability-section">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('homeV3.capabilityEyebrow') }}</p>
          <h2>{{ t('homeV3.capabilityTitle') }}</h2>
          <p>{{ t('homeV3.capabilityIntro') }}</p>
        </header>
        <div class="v3-service-grid">
          <ServiceCard v-for="service in services" :key="service.slug" v-reveal :service="service" />
        </div>
      </div>
    </section>

    <section class="section v3-experience">
      <div class="container v3-experience-layout">
        <div v-reveal>
          <p class="eyebrow">{{ t('homeV3.experienceEyebrow') }}</p>
          <h2>{{ t('homeV3.experienceTitle') }}</h2>
          <RouterLink class="button button-ghost" to="/experience">{{ t('nav.experience') }} →</RouterLink>
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

    <section class="section final-cta v3-final">
      <div class="container" v-reveal>
        <p class="eyebrow">{{ t('homeV3.contactEyebrow') }}</p>
        <h2>{{ t('homeV3.contactTitle') }}</h2>
        <a class="email-display" :href="`mailto:${site.brand.email}`">{{ site.brand.email }} ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import ServiceCard from '../components/ServiceCard.vue'
import { experience, projects, services, site } from '../lib/content.js'
import { logbookEntries } from '../lib/logbook.js'
import { locale, localize, t } from '../lib/locale.js'

const featuredProjects = projects.filter((project) => project.featured).slice(0, 6)
const latestLogbook = logbookEntries.slice(0, 3)
const experiencePreview = [experience.nonprofit[0], experience.professional[0], experience.professional[1]]

function openLauncher() {
  window.dispatchEvent(new CustomEvent('open-intent'))
}

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
