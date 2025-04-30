<template>
    <section class="section" id="references">
      <h2 class="section-title">{{ $t("references.title") }}</h2>
  
      <div class="references-grid">
        <div
          v-for="(reference, i) in $t('references.items')"
          :key="i"
          class="reference-card"
        >
          <img v-if="reference.image" :src="reference.image" :alt="reference.name" />
          <h3>{{ reference.name }}</h3>
          <p class="ref-role">{{ reference.role }}</p>
          <p class="ref-note">{{ reference.note }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .references-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
  }
  
  .reference-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    text-align: center;
    padding: 1rem;
    transition: transform 0.4s ease, box-shadow 0.3s ease;
    transform-style: preserve-3d;
  }
  
  .reference-card:hover {
    transform: rotateY(5deg) scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .reference-card img {
    width: 100%;
    height: 180px;
    object-fit: contain;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    background: white;
  }
  
  .reference-card h3 {
    font-size: 1.1rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
    margin-bottom: 0.3rem;
  }
  
  .ref-role {
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-accent);
    margin-bottom: 0.5rem;
  }
  
  .ref-note {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
  }
  </style>  