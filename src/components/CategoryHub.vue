<template>
    <div class="hub">
      <h2 class="center-question">Bana ne için ihtiyacınız var?</h2>
  
      <div class="grid">
        <div
          v-for="(sector, index) in sectors"
          :key="index"
          class="sector-card"
          @click="scrollTo(sector.anchor)"
        >
          <h3>{{ sector.title }}</h3>
          <p>{{ sector.desc }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const sectors = [
    {
      title: 'Strateji & Organizasyonel Yönetim',
      desc: 'Yapılandırma, süreç optimizasyonu, marka planlaması.',
      anchor: 'cv'
    },
    {
      title: 'Dijital ve Görsel Tasarım Üretimi',
      desc: 'Grafik tasarım, kurumsal kimlik, sosyal medya içerikleri.',
      anchor: 'portfolio'
    },
    {
      title: 'Yapay Zeka & Otomasyon',
      desc: 'Gradio, Python, içerik otomasyonu ve AI görsel üretimi.',
      anchor: 'portfolio'
    },
    {
      title: 'Eğitim & Mentorluk',
      desc: 'Eğitici içerikler, topluluk liderliği ve bilgi paylaşımı.',
      anchor: 'cv'
    },
    {
      title: 'Araştırma & Geliştirme (ARGE)',
      desc: 'Yaratıcı fikirlerin yapay zeka ve frontend ile hayata geçişi.',
      anchor: 'portfolio'
    },
    {
      title: 'IT / Bilgi İşlem Destek',
      desc: 'Yazılım, sistem kurulumları, destek ve teknik çözümler.',
      anchor: 'cv'
    }
  ]
  
  function scrollTo(anchorId) {
    const el = document.getElementById(anchorId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
  </script>
  
  <style scoped>
  .hub {
    text-align: center;
  }
  
  .center-question {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  
  .sector-card {
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s;
  }
  
  .sector-card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  }
  </style>  