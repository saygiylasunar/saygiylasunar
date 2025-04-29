<template>
    <section class="section" id="works">
      <h2 class="section-title">{{ $t("works.title") }}</h2>
  
      <div class="works-grid">
        <div
          v-for="work in works"
          :key="work.title"
          class="work-card"
        >
          <img :src="work.image" :alt="work.title" />
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const works = ref([
    {
      title: 'Dijital Poster Koleksiyonu',
      description: 'Yapay zeka destekli poster tasarımları.',
      image: '/works/poster1.jpg'
    },
    {
      title: 'Sunum Şablonları',
      description: 'Profesyonel sunum setleri.',
      image: '/works/presentation1.jpg'
    },
    {
      title: 'Sosyal Medya Kampanyası',
      description: 'Minimalist sosyal medya görsel setleri.',
      image: '/works/socialmedia1.jpg'
    }
  ])
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .works-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
  }
  
  .work-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    text-align: center;
    padding: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .work-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
  
  .work-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }
  
  .work-card h3 {
    font-size: 1.2rem;
    font-weight: var(--font-weight-medium);
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  .work-card p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  </style>  