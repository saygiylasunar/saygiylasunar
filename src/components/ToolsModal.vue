<template>
    <div class="tools-backdrop" @click.self="close">
      <div class="tools-modal">
        <!-- ✖️ Kapatma butonu -->
        <button class="modal-close" @click="close">✖</button>
  
        <!-- 🗂 Sekmeli butonlar -->
        <div class="tools-tabs">
          <button
            v-for="tool in tools"
            :key="tool.key"
            :class="{ active: selected === tool.key }"
            @click="selected = tool.key"
          >
            {{ $t(tool.label) }}
          </button>
        </div>
  
        <!-- 🧩 İçerik bölümü -->
        <div class="tools-content">
          <component :is="selectedComponent" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import PasswordTool from '../views/tools/PasswordTool.vue'
  import ExifTool from '../views/tools/ExifTool.vue'
  
  const emit = defineEmits(['close'])
  
  function close() {
    emit('close') // 🔁 Modalı kapat
  }
  
  // ⌨️ ESC tuşu ile kapatma
  function handleKey(e) {
    if (e.key === 'Escape') close()
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKey)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
  })
  
  const selected = ref('password')
  
  const tools = [
    { key: 'password', label: 'tools.password.title', component: PasswordTool },
    { key: 'exif', label: 'tools.exif.title', component: ExifTool }
  ]
  
  const selectedComponent = computed(() =>
    tools.find((t) => t.key === selected.value)?.component
  )
  </script>
  
  <style scoped>
  .tools-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
  }
  
  .tools-modal {
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 880px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
    position: relative;
    animation: scaleIn 0.4s ease;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.2rem;
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
  }
  .modal-close:hover {
    color: var(--color-accent);
  }
  
  .tools-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .tools-tabs button {
    padding: 0.6rem 1.2rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    transition: background 0.3s ease;
  }
  .tools-tabs button:hover {
    background: var(--color-accent-light);
  }
  .tools-tabs .active {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
  }
  
  .tools-content {
    padding: 1rem 0;
  }
  </style>
  