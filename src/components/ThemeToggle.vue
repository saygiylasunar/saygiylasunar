<template>
  <div class="theme-toggle" :class="mode" @click="toggleMode">
    <div class="toggle-track">
      <div class="toggle-thumb">
        <span v-if="mode === 'light'">☀️</span>
        <span v-else>🌙</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

const emit = defineEmits(['mode-changed']);
const mode = ref('light');

onMounted(() => {
  const saved = localStorage.getItem('selectedMode') || 'light';
  mode.value = saved;
  document.documentElement.setAttribute('data-theme', saved);
});

function toggleMode() {
  mode.value = mode.value === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', mode.value);
  localStorage.setItem('selectedMode', mode.value);
  emit('mode-changed', mode.value);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.theme-toggle.dark .toggle-thumb {
  transform: translateX(32px);
}
</style>
