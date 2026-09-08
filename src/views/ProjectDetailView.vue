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

      <section class="section">
        <div class="container narrow-container">
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
              <RouterLink v-if="project.toolPath" class="button button-primary" :to="project.toolPath">{{ t('common.openTool') || t('nav.password') }} →</RouterLink>
            </div>
          </div>
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
import { localize, t } from '../lib/locale.js'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
</script>
