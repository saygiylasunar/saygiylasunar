<template>
    <section class="section" id="events">
      <h2 class="section-title">{{ $t("events.title") }}</h2>
  
      <div class="events-grid">
        <div
          v-for="event in events"
          :key="event.title"
          class="event-card"
        >
          <img :src="event.image" :alt="event.title" loading="lazy" />
          <div class="event-info">
            <h3>{{ event.title }}</h3>
            <p>{{ event.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const events = ref([
    {
      title: 'AI Konferansı 2024',
      desc: 'Yapay zeka etkinliğinden kareler.',
      image: '/events/ai-konferansi.jpg'
    },
    {
      title: 'UX Meetup 2023',
      desc: 'Kullanıcı deneyimi üzerine bir buluşma.',
      image: '/events/ux-meetup.jpg'
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
  
  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
  }
  
  .event-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
  
  .event-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .event-info {
    padding: 1rem;
  }
  
  .event-info h3 {
    font-size: 1.1rem;
    font-weight: var(--font-weight-medium);
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  .event-info p {
    font-size: 0.9rem;
    color: var(--color-text-secondary);
  }
  </style>  