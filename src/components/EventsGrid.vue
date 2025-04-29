<template>
    <div class="events-grid">
      <h2>Etkinliklerden Kareler</h2>
      <div class="grid">
        <div
          class="item"
          v-for="(media, index) in events"
          :key="index"
        >
          <template v-if="media.type === 'image'">
            <img :src="media.src" alt="event image" />
          </template>
          <template v-else-if="media.type === 'video'">
            <video controls :src="media.src"></video>
          </template>
          <p>{{ media.desc }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const events = [
    { type: 'image', src: '/placeholder.svg', desc: 'AI Konferansı 2024' },
    { type: 'video', src: '/media/sample.mp4', desc: 'Sunumdan kısa bir kesit' },
    { type: 'image', src: '/placeholder.svg', desc: 'Tech Meetup 2023' },
    { type: 'image', src: '/placeholder.svg', desc: 'Atölye Çalışması' }
  ]
  </script>
  
  <style scoped>
  .events-grid {
    text-align: center;
    padding: 2rem 0;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    align-items: start;
  }
  
  .item {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 1rem;
    background: white;
  }
  
  img, video {
    max-width: 100%;
    border-radius: 4px;
  }
  </style>  