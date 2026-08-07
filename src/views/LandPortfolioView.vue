<template>
  <div class="page-view lands-view">
    <section class="page-hero compact-hero">
      <div class="container">
        <p class="eyebrow">{{ t('lands.eyebrow') }}</p>
        <h1>{{ t('lands.title') }}</h1>
        <p>{{ t('lands.intro') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container lands-pilot-grid">
        <div v-reveal>
          <span class="status-pill">{{ t('common.inDevelopment') }}</span>
          <h2>{{ t('lands.pilotTitle') }}</h2>
          <p>{{ t('lands.pilotText') }}</p>
          <div class="parcel-chip-row" aria-label="Pilot parcels">
            <span v-for="parcel in parcels.items" :key="parcel.id">{{ parcel.ada }}/{{ parcel.parsel }}</span>
          </div>
        </div>
        <img v-reveal class="lands-cuvuk" src="/cuvuk-construction.svg" alt="" />
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container narrow-container legal-notice" v-reveal>
        <p class="eyebrow">{{ t('lands.legalTitle') }}</p>
        <p v-for="paragraph in t('lands.legal')" :key="paragraph">{{ paragraph }}</p>
        <p><strong>{{ t('lands.representative') }}</strong></p>
      </div>
    </section>

    <section class="section final-cta">
      <div class="container" v-reveal>
        <p class="eyebrow">{{ t('lands.contact') }}</p>
        <a class="email-display" :href="`mailto:${site.brand.email}`">{{ site.brand.email }} ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { parcels, site } from '../lib/content.js'
import { t } from '../lib/locale.js'
</script>
