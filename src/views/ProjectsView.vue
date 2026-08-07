<template>
  <div class="page-view projects-view">
    <section class="page-hero compact-hero">
      <div class="container">
        <p class="eyebrow">{{ t('projects.eyebrow') }}</p>
        <h1>{{ t('projects.title') }}</h1>
        <p>{{ t('projects.intro') }}</p>
      </div>
    </section>
    <section class="section">
      <div class="container project-grid project-grid-page">
        <ProjectCard v-for="project in projects" :key="project.slug" v-reveal :project="project" />
      </div>
    </section>
  </div>
</template>

<script setup>
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../lib/content.js'
import { t } from '../lib/locale.js'
</script>
