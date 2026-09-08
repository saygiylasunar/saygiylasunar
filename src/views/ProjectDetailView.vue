<template>
  <div class="page-view project-detail-view">
    <template v-if="project">
      <section class="page-hero compact-hero project-post-head">
        <div class="container">
          <RouterLink class="back-link" to="/projects">← {{ t('common.back') }}</RouterLink>
          <p class="eyebrow">{{ localize(project.category) }}</p>
          <h1>{{ localize(project.title) }}</h1>
          <p>{{ localize(project.summary) }}</p>
        </div>
      </section>

      <section class="section project-overview-section">
        <div class="container project-detail-grid">
          <div class="project-record-panel" v-reveal>
            <dl>
              <div><dt>{{ t('projects.yearLabel') }}</dt><dd>{{ project.year }}</dd></div>
              <div><dt>{{ t('projects.statusLabel') }}</dt><dd>{{ t(`common.projectStatus.${project.status}`) }}</dd></div>
              <div><dt>{{ t('projects.roleLabel') }}</dt><dd>{{ localize(project.roles).join(' · ') }}</dd></div>
            </dl>

            <div class="tag-cloud compact-tags">
              <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
            </div>

            <ul v-if="localize(project.highlights)?.length" class="project-highlight-list">
              <li v-for="highlight in localize(project.highlights)" :key="highlight">{{ highlight }}</li>
            </ul>

            <div v-if="project.links?.length || project.toolPath" class="project-link-row">
              <a v-for="link in project.links" :key="link.url" class="button button-ghost" :href="link.url" target="_blank" rel="noreferrer">{{ link.label }} ↗</a>
              <RouterLink v-if="project.toolPath" class="button button-primary" :to="project.toolPath">{{ t('common.openTool') }} →</RouterLink>
            </div>
          </div>

          <aside v-if="relatedLogbook.length" class="project-related-log" v-reveal>
            <p class="eyebrow">{{ t('projectsV3.relatedLogbook') }}</p>
            <RouterLink v-for="entry in relatedLogbook" :key="entry.slug" :to="`/logbook/${entry.slug}`">
              <span>{{ formatDate(entry.publishedAt) }}</span>
              <strong>{{ localize(entry.title) }}</strong>
            </RouterLink>
          </aside>
        </div>
      </section>

      <section v-if="caseBody" class="section section-tinted project-case-section">
        <div class="container article-shell project-case-shell">
          <div>
            <p class="eyebrow">{{ t('projectsV3.caseStudy') }}</p>
            <div class="article-body project-case-body" v-html="caseBody"></div>
          </div>
          <aside class="article-related">
            <p class="eyebrow">{{ t('projectsV3.sourceLinks') }}</p>
            <a v-for="link in project.links || []" :key="link.url" :href="link.url" target="_blank" rel="noreferrer">
              <strong>{{ link.label }}</strong>
              <small>{{ link.url.replace(/^https?:\/\//, '') }}</small>
            </a>
            <RouterLink to="/projects">
              <strong>{{ t('nav.projects') }}</strong>
              <small>saygiylasunar.com/projects</small>
            </RouterLink>
          </aside>
        </div>
      </section>
    </template>
    <NotFoundView v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import NotFoundView from './NotFoundView.vue'
import { getProject } from '../lib/content.js'
import { logbookEntries } from '../lib/logbook.js'
import { renderProjectCase } from '../lib/projectCases.js'
import { locale, localize, t } from '../lib/locale.js'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
const caseBody = computed(() => renderProjectCase(route.params.slug))
const relatedLogbook = computed(() =>
  logbookEntries.filter((entry) => entry.relatedProjects?.includes(route.params.slug)),
)

function formatDate(value) {
  return new Intl.DateTimeFormat(locale.value === 'tr' ? 'tr-TR' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}
</script>
