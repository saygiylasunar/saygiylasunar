<template>
    <section class="section" id="cv">
      <h2 class="section-title">{{ $t('cv.title') }}</h2>
  
      <!-- Sekmeler -->
      <div class="cv-tabs">
        <button
          v-for="key in cvKeys"
          :key="key"
          :class="{ active: activeTab === key }"
          @click="activeTab = key"
        >
          {{ $t(`cv.${key}.title`) }}
        </button>
      </div>
  
      <!-- İçerik -->
      <div class="cv-content">
        <!-- Timeline Görünüm -->
        <div v-if="['education', 'experience'].includes(activeTab)" class="timeline">
          <div
            v-for="(item, index) in tm(`cv.details.${activeTab}`)"
            :key="index"
            class="timeline-item"
          >
            <div class="dot" />
            <div class="timeline-content">
              <h3>{{ item.title || item.school || item.organization }}</h3>
              <p>{{ item.detail || item.department || item.role }}</p>
              <em>{{ item.year || item.date || item.duration }}</em>
            </div>
          </div>
        </div>
  
        <!-- Grid Kartlar (skills, projects) -->
        <div v-else-if="['skills', 'projects'].includes(activeTab)" class="card-grid">
          <div
            class="cv-card"
            v-for="(item, index) in tm(`cv.details.${activeTab}`)"
            :key="index"
          >
            <h3>{{ item.title }}</h3>
            <p>{{ item.detail }}</p>
          </div>
        </div>
  
        <!-- Basit Liste (volunteer, academic) -->
        <ul v-else class="simple-list">
          <li
            v-for="(item, index) in tm(`cv.details.${activeTab}`)"
            :key="index"
          >
            <strong>{{ item.title || item.organization }}</strong><br />
            <small>{{ item.detail || item.role }}</small>
            <div><em>{{ item.date || item.year }}</em></div>
          </li>
        </ul>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { tm, t } = useI18n()
  
  const cvKeys = [
    'education',
    'experience',
    'skills',
    'projects',
    'volunteer',
    'academic'
  ]
  
  const activeTab = ref('skills')
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    text-align: center;
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
    margin-bottom: 2rem;
  }
  
  .cv-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .cv-tabs button {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 0.5rem 1.2rem;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .cv-tabs button:hover {
    background: var(--color-accent-light);
  }
  .cv-tabs .active {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }
  
  .cv-content {
    animation: fadeIn 0.4s ease;
  }
  
  /* Timeline */
  .timeline {
    position: relative;
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 2px solid var(--color-border);
  }
  .timeline-item {
    position: relative;
    margin-bottom: 2rem;
    padding-left: 1.5rem;
  }
  .timeline-item .dot {
    width: 12px;
    height: 12px;
    background: var(--color-accent);
    border-radius: 50%;
    position: absolute;
    left: -7px;
    top: 0.3rem;
  }
  .timeline-content h3 {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
  .timeline-content p,
  .timeline-content em {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  
  /* Grid Kartlar */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .cv-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    transition: transform 0.3s ease;
  }
  .cv-card:hover {
    transform: translateY(-4px);
  }
  .cv-card h3 {
    margin-bottom: 0.3rem;
    font-size: 1.1rem;
  }
  .cv-card p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  
  /* Liste */
  .simple-list {
    list-style: none;
    padding: 0;
  }
  .simple-list li {
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }
  
  /* Animasyon */
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  </style>
  