<template>
    <div class="carousel-container">
      <h2>Projelerim</h2>
      <div class="carousel">
        <div
          class="card"
          v-for="(project, index) in projects"
          :key="index"
          :style="{ transform: `rotateY(${angle * (index - current)}deg) translateZ(300px)` }"
        >
          <img :src="project.image" alt="project" />
          <h3>{{ project.title }}</h3>
          <p>{{ project.desc }}</p>
        </div>
      </div>
      <div class="controls">
        <button @click="prev">←</button>
        <button @click="next">→</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const current = ref(0)
  const angle = 360 / 5 // 5 kartlık döngü
  
  const projects = [
    { title: 'AI Poster Generator', desc: 'Yapay zeka destekli görsel üretim aracı', image: '/placeholder.svg' },
    { title: 'Gradio Tool Set', desc: 'Python + UI araçları', image: '/placeholder.svg' },
    { title: 'Brand Identity Kit', desc: 'Kurumsal kimlik tasarımları', image: '/placeholder.svg' },
    { title: 'Müzik & Şiir Serisi', desc: 'Sanat üretimleri', image: '/placeholder.svg' },
    { title: 'Saygıyla Sunar Web', desc: 'Bu portfolyo sitesi', image: '/placeholder.svg' }
  ]
  
  function prev() {
    current.value = (current.value - 1 + projects.length) % projects.length
  }
  
  function next() {
    current.value = (current.value + 1) % projects.length
  }
  </script>
  
  <style scoped>
  .carousel-container {
    text-align: center;
  }
  
  .carousel {
    perspective: 1000px;
    height: 300px;
    margin: 2rem auto;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.8s;
  }
  
  .card {
    width: 220px;
    height: 280px;
    position: absolute;
    top: 0;
    left: calc(50% - 110px);
    transform-origin: center;
    transition: transform 0.5s;
    background: white;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
  
  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  
  .controls {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  </style>  