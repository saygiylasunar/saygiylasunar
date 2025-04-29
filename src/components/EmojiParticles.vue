<template>
    <div class="particles">
      <span
        v-for="(particle, index) in particles"
        :key="index"
        class="particle"
        :style="particle.style"
      >
        {{ particle.emoji }}
      </span>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  
  const props = defineProps({
    emoji: String
  })
  
  const particles = ref([])
  
  onMounted(() => {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * 2 * Math.PI
      const distance = Math.random() * 80 + 40
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance
      const scale = Math.random() * 0.6 + 0.4
  
      particles.value.push({
        emoji: props.emoji,
        style: {
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          animationDelay: `${Math.random() * 0.2}s`,
          opacity: 1
        }
      })
    }
  
    // 1.5s sonra component DOM'dan kalkar
    setTimeout(() => {
      particles.value = []
    }, 1500)
  })
  </script>
  
  <style scoped>
  .particles {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  
  .particle {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 1.2rem;
    animation: floatUp 1.5s ease-out forwards;
    opacity: 0;
  }
  
  @keyframes floatUp {
    0% { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: translateY(-100px) scale(1.2); }
  }
  </style>  