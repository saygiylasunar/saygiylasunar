<template>
  <div class="particles-overlay">
    <!-- Emoji particles -->
    <span
      v-for="(particle, index) in particles"
      :key="index"
      class="particle"
      :style="particle.style"
      @click="triggerLottieAnimation"
    >
      {{ particle.emoji }}
    </span>

    <!-- Lottie Animation -->
    <div ref="lottieContainer" class="lottie-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Lottie from 'lottie-web'
import { gsap } from 'gsap'

// Emojiler
const emojis = ['❤️', '🔥', '👏', '🌟', '💖', '✨', '🎉', '😻']
const particles = ref([])
const lottieContainer = ref(null)

// Lottie animasyonunu başlatıyoruz
onMounted(() => {
  // Lottie animasyonunu yükle
  Lottie.loadAnimation({
    container: lottieContainer.value, // Animasyonun yerleşeceği element
    renderer: 'svg',
    loop: true,
    autoplay: false, // Lottie otomatik başlamasın
    path: '/assets/lottie/magic-sparks.json' // Lottie JSON dosyasının yolu
  })

  // Partikül oluşturma
  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * 360
    const radius = Math.random() * 400 + 100
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.random() * 800 - 400
    const rotate = Math.random() * 720 - 360
    const scale = Math.random() * 1.5 + 0.5
    const duration = Math.random() * 1 + 1.5 // More random speed

    particles.value.push({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      style: {
        transform: `
          translate3d(${x}px, ${y}px, ${z}px)
          rotate(${rotate}deg)
          scale(${scale})
        `,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${duration}s`, // Random speed for each particle
        opacity: 1,
        filter: `hue-rotate(${Math.random() * 360}deg)` // Random color change
      }
    })

    // Kaybolma süresi 2-5 saniye arasında olacak
    const disappearTime = Math.random() * 3000 + 2000
    setTimeout(() => {
      particles.value = particles.value.filter(p => p !== particles.value[i])
    }, disappearTime)
  }
})

// Lottie animasyonunu tetiklemek için tıklama fonksiyonu
function triggerLottieAnimation() {
  const animation = Lottie.getAnimations()[0]; // Lottie animasyonunu al
  animation.play(); // Animasyonu başlat
}
</script>

<style scoped>
.particles-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999; /* Animasyonun modalın üstünde görünmesi için */
  pointer-events: none;
  overflow: visible;
  perspective: 1200px;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 2rem;
  animation: popout 2s ease-out forwards, rotateParticle 4s linear infinite;
  opacity: 0;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5)); /* Make it more prominent */
  cursor: pointer; /* Emoji tıklanabilir olacak */
}

@keyframes popout {
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate3d(var(--x), var(--y), var(--z)) scale(2);
  }
}

@keyframes rotateParticle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Lottie container for animation */
.lottie-container {
  width: 100%; /* Tam ekran genişliği */
  height: 100%; /* Tam ekran yüksekliği */
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998; /* Ensure it stays behind particles but still above other content */
}
</style>
