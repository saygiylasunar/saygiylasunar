<template>
  <template v-if="project">
    <section class="page-hero compact-hero project-post-head">
      <div class="container">
        <RouterLink class="back-link" to="/projects">← {{ t('common.back') }}</RouterLink>
        <p class="eyebrow">{{ localize(project.category) }}</p>
        <h1>{{ project.title }}</h1>
        <p>{{ localize(project.summary) }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container narrow-container">
        <UnderConstruction />
      </div>
    </section>
  </template>
  <NotFoundView v-else />
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import UnderConstruction from '../components/UnderConstruction.vue'
import NotFoundView from './NotFoundView.vue'
import { getProject } from '../data/projects.js'
import { localize, t } from '../i18n.js'

const route = useRoute()
const project = computed(() => getProject(route.params.slug))
</script>
