<template>
    <header class="navbar">
      <nav>
        <ul>
          <li><a href="#hero">{{ $t('navbar.home') }}</a></li>
          <li><a href="#portfolio">{{ $t('navbar.portfolio') }}</a></li>
          <li><a href="#cv">{{ $t('navbar.cv') }}</a></li>
          <li><a href="#contact">{{ $t('navbar.contact') }}</a></li>
        </ul>
      </nav>
  
      <div class="toggles">
        <button @click="toggleTheme">
          {{ darkMode ? '🌙' : '☀️' }}
        </button>
        <select v-model="$i18n.locale">
          <option value="tr">TR</option>
          <option value="en">EN</option>
        </select>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const darkMode = ref(false)
  
  function toggleTheme() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark', darkMode.value)
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    background-color: var(--color-background);
    z-index: 100;
    border-bottom: 1px solid #ddd;
  }
  
  ul {
    display: flex;
    gap: 1.5rem;
    list-style: none;
  }
  
  a {
    font-weight: 500;
    transition: var(--transition);
  }
  
  a:hover {
    color: var(--color-primary);
  }
  
  .toggles {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  </style>  