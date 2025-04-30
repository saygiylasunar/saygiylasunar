<template>
    <section id="tools" class="section tools-section">
      <h2 class="section-title">{{ $t("tools.title") }}</h2>
      <p class="section-sub">{{ $t("tools.description") }}</p>
  
      <!-- 🔘 Tetikleyici buton -->
      <button
        class="tools-button"
        @click="toolsVisible = true"
        v-if="!toolsVisible"
      >
        {{ $t("tools.reveal") }}
      </button>
  
      <!-- 🪟 Modal bileşeni -->
      <ToolsModal
        v-if="toolsVisible"
        @close="toolsVisible = false"
      />
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ToolsModal from './ToolsModal.vue'
  
  const toolsVisible = ref(false)
  </script>
  
  <style scoped>
  .tools-section {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .section-sub {
    margin-bottom: 1.5rem;
    color: var(--color-text-secondary);
  }
  
  .tools-button {
    background: var(--color-accent);
    color: white;
    font-weight: bold;
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background 0.3s ease;
  }
  .tools-button:hover {
    background: var(--color-accent-dark);
  }
  </style>
  