<template>
    <div class="works-grid">
      <h2>Eserlerim</h2>
      <div class="grid">
        <div class="card" v-for="i in 6" :key="i">
          <h3>Eser Adı {{ i }}</h3>
          <p>Kısa açıklama veya esere ait fragman.</p>
          <span class="tag">Şiir / Beste</span>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .works-grid {
    padding: 2rem 0;
    text-align: center;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    background: #fff;
  }
  
  .tag {
    font-size: 0.8rem;
    color: var(--color-secondary);
  }
  </style>  