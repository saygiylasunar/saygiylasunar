<template>
  <article class="project-card v3-project-card">
    <div class="project-meta">
      <span>{{ localize(project.category) }}</span>
      <span>{{ project.year }} · {{ t(`common.projectStatus.${project.status}`) }}</span>
    </div>
    <h3>{{ localize(project.title) }}</h3>
    <p>{{ localize(project.summary) }}</p>
    <div class="project-tech-preview">
      <span v-for="technology in project.technologies.slice(0, 3)" :key="technology">{{ technology }}</span>
    </div>
    <div class="project-actions">
      <RouterLink :to="`/projects/${project.slug}`">{{ t('projects.postLabel') }} →</RouterLink>
      <a v-if="project.links?.length" :href="project.links[0].url" target="_blank" rel="noreferrer">
        {{ project.links[0].label }} ↗
      </a>
      <RouterLink v-if="project.toolPath" :to="project.toolPath">{{ t('common.openTool') }} ↗</RouterLink>
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
