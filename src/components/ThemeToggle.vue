<template>
    <div class="theme-toggle" :class="theme" @click="toggleTheme">
      <div class="toggle-track">
        <div class="toggle-thumb">
          <span v-if="theme === 'light'">☀️</span>
          <span v-else>🌙</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const theme = ref('light')
  
  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      theme.value = saved
      document.documentElement.setAttribute('data-theme', saved)
    } else {
      theme.value = 'light'
      document.documentElement.setAttribute('data-theme', 'light')
    }
  })
  
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme.value)
    localStorage.setItem('theme', theme.value)
  }
  </script>
  
  <style scoped>
  .theme-toggle {
    position: relative;
    width: 60px;
    height: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .toggle-track {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, #fceabb, #f8b500);
    border-radius: 999px;
    transition: background 0.3s ease;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  }
  
  .theme-toggle.dark .toggle-track {
    background: linear-gradient(to right, #2c3e50, #4b6cb7);
  }
  
  .toggle-thumb {
    width: 26px;
    height: 26px;
    background: #fff;
    border-radius: 50%;
    transform: translateX(2px);
    transition: transform 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  .theme-toggle.dark .toggle-thumb {
    transform: translateX(32px);
  }
  </style>  