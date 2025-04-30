<template>
    <section class="section" id="cv">
      <h2 class="section-title">{{ $t('cv.title') }}</h2>
  
      <!-- Her kategori ayrı başlıkla otomatik sırayla gösterilir -->
      <div v-for="key in cvKeys" :key="key" class="cv-group">
        <h3 class="cv-subtitle">{{ $t(`cv.${key}.title`) }}</h3>
  
        <!-- 🎓 Timeline format -->
        <div v-if="['education', 'experience'].includes(key)" class="timeline">
          <div
            v-for="(item, index) in tm(`cv.details.${key}`)"
            :key="index"
            class="timeline-item"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <div class="dot" />
            <div class="timeline-content">
              <h4>{{ item.title || item.school || item.organization }}</h4>
              <p>{{ item.detail || item.department || item.role }}</p>
              <em>{{ item.year || item.date || item.duration }}</em>
            </div>
          </div>
        </div>
  
        <!-- 🧠 Grid Kartlar -->
        <div v-else-if="['skills', 'projects'].includes(key)" class="card-grid">
          <div
            class="cv-card"
            v-for="(item, index) in tm(`cv.details.${key}`)"
            :key="index"
            :style="{ animationDelay: `${index * 0.15}s` }"
          >
            <h4>{{ item.title }}</h4>
            <p>{{ item.detail }}</p>
          </div>
        </div>
  
        <!-- 🤝 Basit Liste -->
        <ul v-else class="simple-list">
          <li
            v-for="(item, index) in tm(`cv.details.${key}`)"
            :key="index"
            :style="{ animationDelay: `${index * 0.15}s` }"
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
  const { tm } = useI18n()
  
  const cvKeys = [
    'education',
    'experience',
    'skills',
    'projects',
    'volunteer',
    'academic'
  ]
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    text-align: center;
    color: var(--color-accent);
    font-weight: var(--font-weight-bold);
    margin-bottom: 3rem;
  }
  
  .cv-group {
    margin-bottom: 3rem;
  }
  
  .cv-subtitle {
    font-size: 1.5rem;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text);
    margin-bottom: 1rem;
    border-left: 4px solid var(--color-accent);
    padding-left: 1rem;
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
    opacity: 0;
    animation: fadeSlideIn 0.6s ease forwards;
  }
  .timeline-item .dot {
    width: 12px;
    height: 12px;
    background: var(--color-accent);
    border-radius: 50%;
    position: absolute;
    left: -1.6rem;
    top: 0.4rem;
  }
  .timeline-content h4 {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }
  .timeline-content p,
  .timeline-content em {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  
  /* Card Grid */
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
    animation: fadeSlideIn 0.6s ease forwards;
    opacity: 0;
  }
  .cv-card:hover {
    transform: translateY(-4px);
  }
  .cv-card h4 {
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
    opacity: 0;
    animation: fadeSlideIn 0.6s ease forwards;
  }
  
  /* Animasyon */
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Responsive tweaks */
  @media (max-width: 600px) {
    .section-title {
      font-size: 1.6rem;
    }
    .cv-subtitle {
      font-size: 1.2rem;
    }
  }
  </style>
  