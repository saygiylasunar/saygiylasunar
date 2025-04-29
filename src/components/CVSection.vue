<template>
    <section class="section" id="cv">
      <h2 class="section-title">{{ $t("cv.title") }}</h2>
  
      <div class="accordion">
        <div
          v-for="category in cvCategories"
          :key="category.title"
          class="accordion-item"
        >
          <button class="accordion-header" @click="toggle(category)">
            {{ category.title }}
          </button>
  
          <div
            class="accordion-body"
            v-show="category.open"
          >
            <div
              class="cv-card"
              v-for="item in category.items"
              :key="item.title"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const cvCategories = ref([
    {
      title: t('cv.education'),
      open: true,
      items: [
        { title: 'İstanbul Üniversitesi', detail: 'Bilgisayar Mühendisliği, 2020 - 2024' }
      ]
    },
    {
      title: t('cv.experience'),
      open: false,
      items: [
        { title: 'Frontend Developer', detail: 'ABC Teknoloji, 2023 - ...' }
      ]
    }
  ])
  
  function toggle(cat) {
    cat.open = !cat.open
  }
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .accordion {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .accordion-header {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-medium);
    font-size: 1rem;
    text-align: left;
    color: var(--color-text);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .accordion-header:hover {
    background: var(--color-accent-light);
  }
  
  .accordion-body {
    padding: 1rem 1.5rem;
    border-left: 4px solid var(--color-accent);
    background: var(--color-background);
    border-radius: 0 0 var(--border-radius) var(--border-radius);
  }
  
  .cv-card {
    padding: 1rem 0;
    border-bottom: 1px solid var(--color-border);
  }
  
  .cv-card:last-child {
    border-bottom: none;
  }
  
  .cv-card h3 {
    font-size: 1.1rem;
    font-weight: var(--font-weight-medium);
    margin: 0 0 0.5rem;
  }
  
  .cv-card p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
    margin: 0;
  }
  </style>  