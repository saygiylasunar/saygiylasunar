<template>
    <div class="inspiration-grid">
      <h2>İlham Aldığım İsimler</h2>
      <div class="grid">
        <div class="card" v-for="i in 6" :key="i">
          <strong>İsim Placeholder {{ i }}</strong>
          <p>Bu kişiden neden ilham alındığının kısa açıklaması buraya gelir.</p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .inspiration-grid {
    text-align: center;
    padding: 2rem 0;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    align-items: start;
  }
  
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    padding: 1rem;
  }
  </style>  