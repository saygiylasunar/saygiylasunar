<template>
  <div class="page-view about-view">
    <section class="page-hero about-hero">
      <div class="container about-grid">
        <div>
          <p class="eyebrow">{{ t('about.eyebrow') }}</p>
          <h1>{{ t('about.title') }}</h1>
        </div>
        <div class="about-lead">
          <p class="lead-text">{{ t('about.lead') }}</p>
          <p>{{ t('about.bodyOne') }}</p>
          <p>{{ t('about.bodyTwo') }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <header class="section-heading" v-reveal>
          <p class="eyebrow">{{ t('about.principlesEyebrow') }}</p>
          <h2>{{ t('about.principlesTitle') }}</h2>
        </header>
        <div class="principle-grid">
          <article v-for="(item, index) in t('about.principles')" :key="item[0]" v-reveal>
            <span>0{{ index + 1 }}</span>
            <h3>{{ item[0] }}</h3>
            <p>{{ item[1] }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container final-cta" v-reveal>
        <h2>{{ t('home.finalTitle') }}</h2>
        <div class="inline-actions">
          <RouterLink class="button button-primary" to="/services">{{ t('nav.services') }}</RouterLink>
          <RouterLink class="button button-ghost" to="/experience">{{ t('nav.experience') }}</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { t } from '../lib/locale.js'
</script>
