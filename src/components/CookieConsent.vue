<template>
    <div v-if="!accepted" class="cookie-banner">
      <p>
        Bu site, deneyiminizi geliştirmek için çerezler kullanır.
        <a href="#cookies">Detaylar</a>
      </p>
      <button @click="accept">Kabul Et</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const accepted = ref(false)
  
  onMounted(() => {
    if (localStorage.getItem('cookieAccepted') === 'true') {
      accepted.value = true
    }
  })
  
  function accept() {
    localStorage.setItem('cookieAccepted', 'true')
    accepted.value = true
  }
  </script>
  
  <style scoped>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--color-background);
    color: var(--color-text);
    border-top: 1px solid #ddd;
    padding: 1rem;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 1rem;
    z-index: 1000;
  }
  </style>  