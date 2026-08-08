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
              <div>
                <dt>{{ t('projects.yearLabel') }}</dt>
                <dd>{{ project.year }}</dd>
              </div>
              <div>
                <dt>{{ t('projects.statusLabel') }}</dt>
                <dd>{{ t(`common.projectStatus.${project.status}`) }}</dd>
              </div>
              <div>
                <dt>{{ t('projects.roleLabel') }}</dt>
                <dd>{{ localize(project.roles).join(' · ') }}</dd>
              </div>
            </dl>
            <div class="tag-cloud compact-tags">
              <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
            </div>
            <RouterLink v-if="project.toolPath" class="button button-primary" :to="project.toolPath">
              {{ t('nav.password') }} →
            </RouterLink>
          </div>
        </div>
      </section>

      <section v-if="project.development" class="section section-tinted">
        <div class="container narrow-container">
          <UnderConstruction />
        </div>
      </section>
    </template>
    <NotFoundView v-else />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import UnderConstruction from '../components/UnderConstruction.vue'
import NotFoundView from './NotFoundView.vue'
import { getProject } from '../lib/content.js'
import { localize, t } from '../lib/locale.js'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
</script>
