<template>
  <section id="canva-embed">
    <div
      style="
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 56.25%;
        box-shadow: 0 2px 8px 0 rgba(63, 69, 81, 0.16);
        margin-top: 1.6em;
        margin-bottom: 0.9em;
        overflow: hidden;
        border-radius: 8px;
      "
    >
      <iframe
        loading="lazy"
        style="
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border: none;
        "
        src="https://www.canva.com/design/DAGOvoWQVS8/LLX09QEy-iONHi-i6cDilA/view?embed"
        allowfullscreen
      ></iframe>
    </div>
    <p>
      <a
        href="https://www.canva.com/design/DAGOvoWQVS8/LLX09QEy-iONHi-i6cDilA/view?utm_content=DAGOvoWQVS8&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener"
        >Grafik Tasarım</a
      >
      - Ersen Filiz
    </p>
  </section>
  <section class="section" id="category-hub">
    <div class="category-question">
      <h2>{{ $t('category.centerQuestion') }}</h2>
    </div>

    <!-- Yalnızca İkonların Döndüğü Orbit -->
    <div ref="orbitContainer" class="category-orbit">
      <div
        v-for="(item, i) in categories"
        :key="`orbit-${i}`"
        class="orbit-icon-bubble"
        :style="getTransformStyle(i)"
      >
        <img :src="item.icon" :alt="item.label" class="icon2" />
      </div>
    </div>

    <!-- Sabit Horizontal Cards -->
    <div class="horizontal-cards">
      <div
        v-for="(item, i) in categories"
        :key="`horizontal-${i}`"
        class="horizontal-item"
        :class="{ active: currentCard === i }"
      >
        <div class="card-icon">
          <img :src="item.icon" :alt="item.label" class="icon" />
        </div>
        <div class="card-title">{{ $t(item.label) }}</div>
        <div class="card-subtitle">{{ $t(item.subtitle) }}</div>
        <div class="card-description">{{ $t(item.description) }}</div>
      </div>
    </div>
  </section>
  <section id="spotify-embed">
    <div class="spotify-container">
      <iframe
        class="spotify-iframe"
        src="https://open.spotify.com/embed/track/0CNAmzpaJO8ezqS8E5diFl?utm_source=generator"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  </section>
  <section id="spotify-embed">
    <div class="spotify-container">
      <iframe
        class="spotify-iframe"
        src="https://open.spotify.com/embed/track/0kFYwgdNxcf72eyPhqCohn?utm_source=generator"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Kategoriler (dokunulmuyor)
const categories = [
  {
    label: 'category.strategy',
    icon: 'strategy.svg',
    subtitle: 'category.strategySubtitle',
    description: 'category.strategyDesc',
  },
  {
    label: 'category.design',
    icon: 'design.svg',
    subtitle: 'category.designSubtitle',
    description: 'category.designDesc',
  },
  {
    label: 'category.ai',
    icon: 'ai.svg',
    subtitle: 'category.aiSubtitle',
    description: 'category.aiDesc',
  },
  {
    label: 'category.edu',
    icon: 'edu.svg',
    subtitle: 'category.eduSubtitle',
    description: 'category.eduDesc',
  },
  {
    label: 'category.rnd',
    icon: 'rnd.svg',
    subtitle: 'category.rndSubtitle',
    description: 'category.rndDesc',
  },
  {
    label: 'category.it',
    icon: 'it.svg',
    subtitle: 'category.itSubtitle',
    description: 'category.itDesc',
  },
];

// Orbit için animasyon değişkenleri
const rotation = ref(0);
const total = categories.length;
const anglePerItem = 360 / total;
let animationId = null;
const orbitContainer = ref(null);

// Horizontal için aktif kart kontrolü
const currentCard = ref(0);
let cardIntervalId = null;

// Orbit Animasyonu
function animate() {
  rotation.value = (rotation.value + 0.05) % 360;
  animationId = requestAnimationFrame(animate);
}

// Orbit için pozisyon hesaplama
function getTransformStyle(index) {
  const currentAngle = (index * anglePerItem + rotation.value) % 360;
  return { transform: `rotateY(${currentAngle}deg) translateZ(280px)` };
}

// Horizontal Kart Geçişi - Yumuşak, Dinamik
function startCardCycling() {
  cardIntervalId = setInterval(() => {
    currentCard.value = (currentCard.value + 1) % total;
  }, 3000);
}

// Sayfa görünürlüğüne göre animasyon kontrolü
function observeVisibility() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate();
          startCardCycling();
        } else {
          cancelAnimationFrame(animationId);
          clearInterval(cardIntervalId);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (orbitContainer.value) observer.observe(orbitContainer.value);
}

// Başlatma ve Temizlik
onMounted(() => observeVisibility());
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  clearInterval(cardIntervalId);
});
</script>

<style scoped>
.spotify-container {
  position: relative;
  width: 100%;
  padding-top: 80px; /* 152px yüksekliğe uygun oran */
  box-shadow: 0 2px 8px rgba(63, 69, 81, 0.16);
  border-radius: 12px;
  overflow: hidden;
}

.spotify-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.canva-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  box-shadow: 0 2px 8px 0 rgba(63, 69, 81, 0.16);
  margin-top: 1.6em;
  margin-bottom: 0.9em;
  overflow: hidden;
  border-radius: 8px;
  will-change: transform;
}

.canva-iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: none;
  padding: 0;
  margin: 0;
}

.section {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Orbit Bubble */
.category-orbit {
  position: relative;
  width: 100%;
  max-width: 640px;
  height: 480px;
  margin: 0 auto 1rem auto;
  perspective: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

.category-question h2 {
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  margin-bottom: 3rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
}

.card-subtitle {
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-light);
}

.orbit-icon-bubble {
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
}

.orbit-icon-bubble img {
  width: 50%;
  filter: brightness(0) saturate(100%) var(--theme-icon-color, invert(0));
}

/* Horizontal Cards */
.horizontal-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
}

.horizontal-item {
  flex: 1 1 200px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease, transform 0.3s ease;
}

.horizontal-item.active {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  background: var(
    linear-gradient(135deg, var(--color-accent), var(--color-surface))
  );
  transform: scale(1.16);
  box-shadow: 0 2px 8px var(--color-accent-light);
}

.card-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.card-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
}

img.icon {
  width: clamp(24px, 5vw, 64px);
  height: auto;
  filter: brightness(0) saturate(100%) var(--color-accent, invert(0));

  [data-theme='dark'] & {
    filter: brightness(0) saturate(100%) invert(1);
  }
}
img.icon2 {
  height: auto;
  filter: brightness(0) saturate(100%) var(--color-accent, invert(0));

  [data-theme='dark'] & {
    filter: brightness(0) saturate(100%) invert(1);
  }
}

@media (max-width: 768px) {
  .category-orbit {
    height: 200px;
  }

  .orbit-icon-bubble {
    width: 60px;
    height: 60px;
  }

  .horizontal-cards {
    flex-direction: column;
    align-items: center;
  }

  .horizontal-item {
    width: 90%;
  }
}
</style>
