<template>
    <div class="reaction-bar">
      <div
        v-for="emoji in reactions"
        :key="emoji.type"
        class="reaction-btn"
        :class="{ selected: selectedReaction === emoji.type }"
        @click="react(emoji.type)"
      >
        <span class="emoji">{{ emoji.icon }}</span>
        <span class="count">{{ counts[emoji.type] }}</span>
      </div>
  
      <!-- Emoji Patlama Efekti -->
      <EmojiParticles
        v-if="showParticles"
        :emoji="reactions.find(r => r.type === selectedReaction)?.icon"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import EmojiParticles from './EmojiParticles.vue'
  
  // Props
  const props = defineProps({
    imageId: String // örn: 'ai-poster-generator'
  })
  
  // Reactions listesi
  const reactions = [
    { type: 'like', icon: '❤️' },
    { type: 'star', icon: '🌟' },
    { type: 'clap', icon: '👏' },
    { type: 'fire', icon: '🔥' }
  ]
  
  // Local state
  const selectedReaction = ref('')
  const counts = ref({ like: 0, star: 0, clap: 0, fire: 0 })
  const showParticles = ref(false)
  
  // LocalStorage kontrolü
  const key = `reacted:${props.imageId}`
  onMounted(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      selectedReaction.value = saved
    }
    fetchCounts()
  })
  
  // Reaksiyon sayılarını çek
  async function fetchCounts() {
    try {
      const res = await fetch(`/api/react?imageId=${props.imageId}`)
      const data = await res.json()
      counts.value = { ...counts.value, ...data }
    } catch (e) {
      console.warn('Reaksiyon verisi alınamadı:', e)
    }
  }
  
  // Emojiye tıklanınca
  async function react(type) {
    if (selectedReaction.value) return
    try {
      const res = await fetch('/api/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId: props.imageId, reaction: type })
      })
      const data = await res.json()
      if (data.success) {
        selectedReaction.value = type
        counts.value[type]++
        localStorage.setItem(key, type)
  
        // animasyonu tetikle
        showParticles.value = true
        setTimeout(() => (showParticles.value = false), 1500)
      }
    } catch (e) {
      console.error('Reaksiyon gönderilemedi:', e)
    }
  }
  </script>
  
  <style scoped>
  .reaction-bar {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
    position: relative;
  }
  
  .reaction-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.8rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    position: relative;
  }
  
  .reaction-btn:hover {
    transform: scale(1.1);
  }
  
  .selected {
    filter: drop-shadow(0 0 6px #ff4081);
  }
  
  .count {
    font-size: 0.8rem;
    color: #555;
    margin-top: 0.3rem;
  }
  </style>  