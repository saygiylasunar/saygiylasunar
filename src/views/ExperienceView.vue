<template>
  <section class="page-hero compact-hero">
    <div class="container">
      <p class="eyebrow">{{ t('experience.eyebrow') }}</p>
      <h1>{{ t('experience.title') }}</h1>
      <p>{{ t('experience.intro') }}</p>
    </div>
  </section>

  <section class="section">
    <div class="container resume-layout">
      <aside class="resume-nav">
        <a href="#professional">{{ t('experience.work') }}</a>
        <a href="#nonprofit">{{ t('experience.nonprofit') }}</a>
        <a href="#education">{{ t('experience.education') }}</a>
        <a href="#skills">{{ t('experience.skills') }}</a>
        <a href="#certificates">{{ t('experience.certificates') }}</a>
      </aside>

      <div class="resume-content">
        <section id="professional" class="resume-section">
          <h2>{{ t('experience.work') }}</h2>
          <article v-for="item in professionalExperience" :key="localize(item.institution)" v-reveal class="timeline-item">
            <div class="timeline-period">{{ localize(item.period) }}</div>
            <div>
              <h3>{{ localize(item.institution) }}</h3>
              <strong>{{ localize(item.role) }}</strong>
              <p>{{ localize(item.detail) }}</p>
            </div>
          </article>
        </section>

        <section id="nonprofit" class="resume-section">
          <h2>{{ t('experience.nonprofit') }}</h2>
          <article v-for="item in nonprofitExperience" :key="item.institution" v-reveal class="timeline-item">
            <div class="timeline-period">{{ localize(item.period) }}</div>
            <div>
              <h3>{{ item.institution }}</h3>
              <strong>{{ localize(item.role) }}</strong>
              <p>{{ localize(item.detail) }}</p>
            </div>
          </article>
        </section>

        <section id="education" class="resume-section">
          <h2>{{ t('experience.education') }}</h2>
          <article v-for="item in education" :key="localize(item.institution)" v-reveal class="timeline-item">
            <div class="timeline-period">{{ item.period }}</div>
            <div>
              <h3>{{ localize(item.institution) }}</h3>
              <strong>{{ localize(item.degree) }}</strong>
            </div>
          </article>
        </section>

        <section id="skills" class="resume-section">
          <h2>{{ t('experience.skills') }}</h2>
          <div class="skill-grid">
            <article v-for="group in skillGroups" :key="localize(group.title)" v-reveal>
              <h3>{{ localize(group.title) }}</h3>
              <div class="tag-cloud compact-tags">
                <span v-for="item in group.items" :key="item">{{ item }}</span>
              </div>
            </article>
          </div>
        </section>

        <section id="certificates" class="resume-section">
          <h2>{{ t('experience.certificates') }}</h2>
          <article v-for="item in certificates" :key="localize(item.title)" v-reveal class="timeline-item">
            <div class="timeline-period">{{ item.period }}</div>
            <div>
              <h3>{{ localize(item.title) }}</h3>
              <strong>{{ item.institution }}</strong>
              <p>{{ item.detail }}</p>
            </div>
          </article>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  certificates,
  education,
  nonprofitExperience,
  professionalExperience,
  skillGroups,
} from '../data/experience.js'
import { localize, t } from '../i18n.js'
</script>
