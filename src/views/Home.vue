<template>
    <main>
      <!-- Giriş (hero) -->
      <section id="hero" class="section">
        <h1>Saygıyla Sunar</h1>
        <p>Merhaba, ben Ersen FİLİZ. Portfolyoma hoş geldiniz.</p>
      </section>
  
      <!-- Kategoriler (Hub) -->
      <section id="categories" class="section">
        <CategoryHub />
      </section>
  
      <!-- Özgeçmiş (CV) -->
      <section id="cv" class="section">
        <!-- <CVSection /> -->
        <!-- <CVMelez /> -->
        <!-- <CVDNA /> -->
        <CVJourney />
      </section>
  
      <!-- Portfolyo -->
      <section id="portfolio" class="section">
        <PortfolioProjects />
        <EventsGrid />
        <PartnersCarousel />
      </section>
  

<!-- Tools bölümü -->
<section id="tools" class="section">
  <ToolsPreview />
</section>

      <!-- İlham -->
      <section id="inspirations" class="section">
        <InspirationGrid />
      </section>
  
      <!-- Eserler -->
      <section id="works" class="section">
        <WorksGrid />
      </section>
  
      <!-- İletişim -->
      <section id="contact" class="section">
        <h2>İletişim</h2>
        <p>Sağ altta yer alan form aracılığıyla benimle iletişime geçebilirsiniz.</p>
      </section>
    </main>
  </template>
  
  <script setup>
  import CategoryHub from '../components/CategoryHub.vue'
  import ToolsPreview from '../components/ToolsPreview.vue'
  //import CVSection from '../components/CVSection.vue'
  //import CVMelez from '../components/CVMelez.vue'
  //import CVDNA from '../components/CVDNA.vue'
  import CVJourney from '../components/CVJourney.vue'
  import PortfolioProjects from '../components/PortfolioProjects.vue'
  import EventsGrid from '../components/EventsGrid.vue'
  import PartnersCarousel from '../components/PartnersCarousel.vue'
  import InspirationGrid from '../components/InspirationGrid.vue'
  import WorksGrid from '../components/WorksGrid.vue'
  </script>
  
  <style scoped>
  .section {
    padding: 4rem 2rem;
    scroll-margin-top: 80px;
  }
  </style>  