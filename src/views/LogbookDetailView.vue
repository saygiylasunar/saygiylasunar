<template>
  <div class="page-view logbook-detail-view">
    <template v-if="entry">
      <article>
        <header class="page-hero compact-hero logbook-post-head">
          <div class="container narrow-container">
            <RouterLink class="back-link" to="/logbook">← {{ t('logbook.back') }}</RouterLink>
            <p class="eyebrow">{{ localize(entry.category) }}</p>
            <h1>{{ localize(entry.title) }}</h1>
            <p>{{ localize(entry.description) }}</p>
            <div class="article-meta">
              <span>{{ t('logbook.published') }} · {{ formatDate(entry.publishedAt) }}</span>
              <span>{{ t('logbook.language') }} · {{ entry.language.toUpperCase() }}</span>
            </div>
          </div>
        </header>

        <section class="section article-section">
          <div class="container article-shell">
            <div class="article-body" v-html="body"></div>

            <aside v-if="relatedProjects.length" class="article-related">
              <p class="eyebrow">{{ t('logbook.related') }}</p>
              <RouterLink
                v-for="project in relatedProjects"
                :key="project.slug"
                :to="`/projects/${project.slug}`"
              >
                <strong>{{ localize(project.title) }}</strong>
                <small>{{ localize(project.category) }}</small>
              </RouterLink>
            </aside>
          </div>
        </section>
      </article>
    </template>
    <NotFoundView v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import NotFoundView from './NotFoundView.vue'
import { getProject } from '../lib/content.js'
import { getLogbookEntry, renderLogbookEntry } from '../lib/logbook.js'
import { locale, localize, t } from '../lib/locale.js'

const route = useRoute()
const entry = computed(() => getLogbookEntry(route.params.slug))
const body = computed(() => renderLogbookEntry(route.params.slug))
const relatedProjects = computed(() =>
  (entry.value?.relatedProjects || []).map(getProject).filter(Boolean),
)

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
