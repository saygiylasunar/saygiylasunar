<template>
  <div class="page-view blog-detail-view">
    <template v-if="entry">
      <article>
        <header class="page-hero compact-hero blog-post-head">
          <div class="container narrow-container">
            <RouterLink class="back-link" to="/blog">← {{ copy.back }}</RouterLink>
            <p class="eyebrow">{{ localize(entry.category) }}</p>
            <h1>{{ localize(entry.title) }}</h1>
            <p>{{ localize(entry.description) }}</p>
            <div class="article-meta">
              <span>{{ copy.published }} · {{ formatDate(entry.publishedAt) }}</span>
              <span v-if="entry.updatedAt && entry.updatedAt !== entry.publishedAt">{{ copy.updated }} · {{ formatDate(entry.updatedAt) }}</span>
              <span>{{ entry.language.toUpperCase() }}</span>
            </div>
          </div>
        </header>

        <section class="section article-section">
          <div class="container article-shell">
            <div class="article-body" v-html="body"></div>

            <aside class="article-aside">
              <div class="article-aside-block">
                <p class="eyebrow">{{ copy.topic }}</p>
                <strong>{{ localize(section?.title) }}</strong>
                <p>{{ localize(section?.description) }}</p>
              </div>

              <div class="article-aside-block">
                <p class="eyebrow">{{ copy.tags }}</p>
                <div class="tag-cloud compact-tags">
                  <span v-for="tag in entry.tags" :key="tag">#{{ tag }}</span>
                </div>
              </div>

              <div v-if="relatedProjects.length" class="article-aside-block">
                <p class="eyebrow">{{ copy.related }}</p>
                <RouterLink
                  v-for="project in relatedProjects"
                  :key="project.slug"
                  class="article-related-link"
                  :to="`/projects/${project.slug}`"
                >
                  <strong>{{ localize(project.title) }}</strong>
                  <small>{{ localize(project.category) }}</small>
                </RouterLink>
              </div>
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
import { getBlogEntry, getBlogSection, renderBlogEntry } from '../lib/blog.js'
import { locale, localize } from '../lib/locale.js'

const route = useRoute()
const entry = computed(() => getBlogEntry(route.params.slug))
const body = computed(() => renderBlogEntry(route.params.slug))
const section = computed(() => getBlogSection(entry.value?.section))
const relatedProjects = computed(() =>
  (entry.value?.relatedProjects || []).map(getProject).filter(Boolean),
)

const copy = computed(() => locale.value === 'tr'
  ? { back: 'Blog', published: 'Yayın', updated: 'Güncelleme', topic: 'Konu', tags: 'Etiketler', related: 'İlgili projeler' }
  : { back: 'Blog', published: 'Published', updated: 'Updated', topic: 'Topic', tags: 'Tags', related: 'Related projects' })

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
