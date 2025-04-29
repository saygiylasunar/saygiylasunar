<template>
    <section class="section" id="portfolio">
      <h2 class="section-title">{{ $t("portfolio.title") }}</h2>
      <div class="projects-wrapper">
        <div
          v-for="project in projects"
          :key="project.title"
          class="project-card"
          @click="openGallery(project)"
        >
          <img :src="project.images[0]" :alt="project.title" loading="lazy" />
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
        </div>
      </div>
  
      <GalleryModal
        v-if="activeProject"
        v-model="showModal"
        :images="activeProject.images"
        :title="activeProject.title"
        :id="activeProject.title"
      />
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import GalleryModal from './GalleryModal.vue'
  
  const showModal = ref(false)
  const activeProject = ref(null)
  
  const projects = [
    {
      title: 'AI Poster Generator',
      desc: 'Yapay zeka destekli görsel üretim aracı',
      images: [
        '/portfolio/ai-poster-generator-1.jpg',
        '/portfolio/ai-poster-generator-2.jpg'
      ]
    },
    {
      title: 'Gradio Tool Set',
      desc: 'Python + UI araçları',
      images: ['/portfolio/gradio-tool-set-1.jpg']
    },
    {
      title: 'Brand Identity Kit',
      desc: 'Kurumsal kimlik tasarımları',
      images: ['/portfolio/brand-kit.jpg']
    }
  ]
  
  function openGallery(project) {
    activeProject.value = project
    showModal.value = true
  }
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    margin-bottom: 2rem;
    color: var(--color-accent);
    text-align: center;
  }
  
  .projects-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
  
  .project-card {
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    padding: 1rem;
    width: 280px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .project-card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
  
  .project-card img {
    width: 100%;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }
  
  .project-card h3 {
    font-size: 1.2rem;
    font-weight: var(--font-weight-medium);
    margin: 0.5rem 0;
  }
  
  .project-card p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  </style>  