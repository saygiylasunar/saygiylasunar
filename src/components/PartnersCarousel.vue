<template>
    <section class="section" id="partners">
      <h2 class="section-title">{{ $t("partners.title") }}</h2>
  
      <div class="carousel-wrapper">
        <div class="carousel-track" :style="{ animationDuration: speed + 's' }">
          <div
            v-for="partner in partners"
            :key="partner.name"
            class="partner-logo"
          >
            <img :src="partner.logo" :alt="partner.name" />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const partners = ref([
    { name: 'Partner 1', logo: '/partners/partner1.png' },
    { name: 'Partner 2', logo: '/partners/partner2.png' },
    { name: 'Partner 3', logo: '/partners/partner3.png' },
    { name: 'Partner 4', logo: '/partners/partner4.png' }
  ])
  
  const speed = 30 // Carousel'in dönme süresi (saniye cinsinden)
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .carousel-wrapper {
    overflow: hidden;
    width: 100%;
    background: var(--color-surface);
    padding: 1.5rem 0;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
  
  .carousel-track {
    display: flex;
    width: fit-content;
    animation: scroll infinite linear;
    gap: 4rem;
  }
  
  .partner-logo {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .partner-logo img {
    height: 60px;
    max-width: 120px;
    object-fit: contain;
    filter: brightness(0) invert(0);
    transition: filter 0.3s;
  }
  
  .partner-logo img:hover {
    filter: brightness(1) invert(0.2) sepia(0.5) saturate(3) hue-rotate(200deg);
  }
  
  /* Sonsuz kaydırma animasyonu */
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  </style>  