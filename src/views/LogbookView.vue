<template>
  <div class="page-view logbook-view">
    <section class="page-hero compact-hero logbook-hero">
      <div class="container">
        <p class="eyebrow">{{ t('logbook.eyebrow') }}</p>
        <h1>{{ t('logbook.title') }}</h1>
        <p>{{ t('logbook.intro') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="logbook-grid">
          <article v-for="entry in logbookEntries" :key="entry.slug" class="logbook-card" v-reveal>
            <div class="logbook-card-meta">
              <span>{{ localize(entry.category) }}</span>
              <time :datetime="entry.publishedAt">{{ formatDate(entry.publishedAt) }}</time>
            </div>
            <h2>{{ localize(entry.title) }}</h2>
            <p>{{ localize(entry.description) }}</p>
            <div class="tag-cloud compact-tags">
              <span v-for="tag in entry.tags" :key="tag">#{{ tag }}</span>
            </div>
            <RouterLink class="logbook-read-link" :to="`/logbook/${entry.slug}`">
              {{ t('logbook.read') }} →
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { logbookEntries } from '../lib/logbook.js'
import { locale, localize, t } from '../lib/locale.js'

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
