<template>
  <article class="project-card">
    <div class="project-meta">
      <span>{{ localize(project.category) }}</span>
      <span>{{ project.year }} · {{ t(`common.projectStatus.${project.status}`) }}</span>
    </div>
    <h3>{{ localize(project.title) }}</h3>
    <p>{{ localize(project.summary) }}</p>
    <div class="project-actions">
      <RouterLink :to="`/projects/${project.slug}`">{{ t('projects.postLabel') }} ↗</RouterLink>
      <RouterLink v-if="project.toolPath" :to="project.toolPath">{{ t('nav.password') }} ↗</RouterLink>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { localize, t } from '../lib/locale.js'

defineProps({
  project: { type: Object, required: true },
})
</script>
