<template>
  <div class="reaction-bar">
    <!-- Emojiler -->
    <button
      v-for="emoji in reactions"
      :key="emoji"
      class="reaction-btn"
      @click="triggerEffect(emoji)"
      :aria-label="emoji"
    >
      {{ emoji }}
    </button>

    <!-- Patlat butonu -->
    <button class="explode-btn" @click="triggerExplosion">Patlat 🔥</button>

    <!-- EmojiParticlesArt gösterimi -->
    <EmojiParticlesArt v-if="showParticles" :emoji="activeEmoji" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmojiParticlesArt from './EmojiParticlesArt.vue'

const reactions = ['❤️', '🌟', '👏', '🔥', '💖', '🎉', '😻', '✨']

const showParticles = ref(false)
const activeEmoji = ref('')

function triggerEffect(emoji) {
  activeEmoji.value = emoji
  showParticles.value = true
  setTimeout(() => (showParticles.value = false), 2000)
}

function triggerExplosion() {
  triggerEffect(reactions[Math.floor(Math.random() * reactions.length)])
}
</script>

<style scoped>
.reaction-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  z-index: 10; /* Efektlerin üstte olması için */
  pointer-events: auto;
}

.reaction-btn,
.explode-btn {
  background: transparent;
  border: none;
  font-size: 2.3rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.reaction-btn:hover,
.explode-btn:hover {
  transform: scale(1.2);
}

.explode-btn {
  font-weight: bold;
  padding: 0.3rem 0.8rem;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  background: var(--color-accent, #ff66c4);
  color: white;
}
</style>
