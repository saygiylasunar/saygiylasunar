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
        <div class="logbook-filter" :aria-label="t('logbook.filter')">
          <button
            type="button"
            :class="{ active: activeTag === 'all' }"
            @click="activeTag = 'all'"
          >
            {{ t('logbook.all') }}
          </button>
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            :class="{ active: activeTag === tag }"
            @click="activeTag = tag"
          >
            #{{ tag }}
          </button>
        </div>

        <div class="logbook-grid">
          <article v-for="entry in filteredEntries" :key="entry.slug" class="logbook-card" v-reveal>
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
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { logbookEntries } from '../lib/logbook.js'
import { locale, localize, t } from '../lib/locale.js'

const activeTag = ref('all')
const tags = [...new Set(logbookEntries.flatMap((entry) => entry.tags || []))].sort()
const filteredEntries = computed(() =>
  activeTag.value === 'all'
    ? logbookEntries
    : logbookEntries.filter((entry) => entry.tags?.includes(activeTag.value)),
)

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
