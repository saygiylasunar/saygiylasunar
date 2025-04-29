<template>
    <div class="cv-section">
      <div class="tabs">
        <button
          v-for="(tab, index) in categories"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </button>
      </div>
  
      <div class="content-grid">
        <div
          v-for="(item, i) in categories[activeTab].items"
          :key="i"
          class="card"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <span class="tag">{{ item.tag }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const activeTab = ref(0)
  
  const categories = [
    {
      title: 'Eğitim',
      items: [
        { title: 'Bilgisayar Mühendisliği', desc: 'Üniversite', tag: '2020 - 2024' },
        { title: 'Lise', desc: 'Fen Bilimleri Anadolu Lisesi', tag: '2016 - 2020' }
      ]
    },
    {
      title: 'İş Deneyimi',
      items: [
        { title: 'Frontend Developer', desc: 'XYZ Ajansı', tag: '2023 - Devam' }
      ]
    },
    {
      title: 'Sivil Toplum',
      items: [
        { title: 'Yapay Zeka Topluluğu', desc: 'Kurucu / Mentor', tag: '2022 -' }
      ]
    },
    {
      title: 'Projeler & Yayınlar',
      items: [
        { title: 'Saygıyla Sunar', desc: 'Kişisel marka & portfolyo', tag: '2024' }
      ]
    },
    {
      title: 'Organizasyonlar',
      items: [
        { title: 'TechFest 2024', desc: 'Panelist & Atölye Sunumu', tag: '2024' }
      ]
    },
    {
      title: 'Yetkinlikler',
      items: [
        { title: 'Vue / Angular / JS', desc: 'Frontend Geliştirme', tag: 'Uzmanlık' },
        { title: 'Gradio / Python', desc: 'AI araçları & Otomasyon', tag: 'İleri Düzey' }
      ]
    }
  ]
  </script>
  
  <style scoped>
  .cv-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .tabs {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
  
  .tabs button {
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
  
  .tabs .active {
    border-bottom: 2px solid var(--color-primary);
  }
  
  .content-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background: white;
  }
  
  .tag {
    font-size: 0.75rem;
    color: var(--color-secondary);
  }
  </style>  