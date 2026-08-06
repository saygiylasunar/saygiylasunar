<template>
  <div>
    <section class="hero-section">
      <div class="hero-orbit hero-orbit-one" aria-hidden="true"></div>
      <div class="hero-orbit hero-orbit-two" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span class="status-dot"></span>{{ t('home.availability') }}</p>
          <h1>{{ t('home.title') }}</h1>
          <p class="hero-intro">{{ t('home.intro') }}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="mailto:saygiylasunar@gmail.com?subject=Proje%20Talebi">
              {{ t('home.primaryCta') }}
            </a>
            <RouterLink class="button button-ghost" to="/services">{{ t('home.secondaryCta') }}</RouterLink>
          </div>
        </div>

        <aside class="identity-panel" aria-label="Profesyonel kimlik">
          <span class="identity-code">EF / 2026</span>
          <div class="identity-main">
            <strong>Ersen Filiz</strong>
            <p>Multidisciplinary Computer Engineer</p>
            <p>AI-Oriented Developer</p>
            <p>Creative Technologist</p>
          </div>
          <div class="identity-tags">
            <span>Research</span><span>Build</span><span>Design</span><span>Compose</span>
          </div>
        </aside>
      </div>
    </section>

    <section class="section" id="services">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">Services / Capabilities</p>
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
        <header class="section-heading section-heading-row" v-reveal>
          <div>
            <p class="eyebrow">Selected Work</p>
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

    <section class="section">
      <div class="container split-layout">
        <header class="section-heading sticky-heading" v-reveal>
          <p class="eyebrow">Method</p>
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
          <p class="eyebrow">Experience</p>
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
        <p class="eyebrow">Start a conversation</p>
        <h2>{{ t('home.finalTitle') }}</h2>
        <p>{{ t('home.finalText') }}</p>
        <a class="email-display" href="mailto:saygiylasunar@gmail.com">saygiylasunar@gmail.com ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { services } from '../data/services.js'
import { projects } from '../data/projects.js'
import { professionalExperience, nonprofitExperience } from '../data/experience.js'
import { localize, t } from '../i18n.js'

const featuredProjects = projects.filter((project) => project.featured)
const experiencePreview = [nonprofitExperience[0], professionalExperience[0], professionalExperience[1]]
</script>
