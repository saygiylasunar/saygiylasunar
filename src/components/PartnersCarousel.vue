<template>
    <div class="partners-carousel">
      <h2>İş Ortakları & Referanslar</h2>
      <div class="logo-track">
        <div class="logo-slide" v-for="(partner, index) in repeatedPartners" :key="index">
          <img :src="partner.logo" :alt="partner.name" />
          <p>{{ partner.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Gerçek projede logolar src/assets/ veya public/ içinde tutulabilir
  const partners = [
    { name: 'OpenAI', logo: '/placeholder.svg' },
    { name: 'İstanbul Tech Hub', logo: '/placeholder.svg' },
    { name: 'ArtHive Studio', logo: '/placeholder.svg' },
    { name: 'BİLSEM & STK İşbirlikleri', logo: '/placeholder.svg' }
  ]
  
  // Carousel döngüsünü oluşturmak için partner listesini 2x tekrar et
  const repeatedPartners = [...partners, ...partners]
  </script>
  
  <style scoped>
  .partners-carousel {
    overflow: hidden;
    background: #fafafa;
    padding: 2rem 0;
    text-align: center;
  }
  
  .logo-track {
    display: flex;
    width: max-content;
    animation: scroll 20s linear infinite;
    gap: 3rem;
    align-items: center;
  }
  
  .logo-slide {
    flex: 0 0 auto;
    text-align: center;
  }
  
  .logo-slide img {
    width: 80px;
    height: auto;
    filter: grayscale(100%);
    transition: filter 0.3s;
  }
  
  .logo-slide img:hover {
    filter: grayscale(0%);
  }
  
  .logo-slide p {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #555;
  }
  
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  </style>  