<template>
  <section class="section" id="category-hub">
    <!-- Üstte sabit soru -->
    <div class="category-question">
      <h2>{{ $t("category.centerQuestion") }}</h2>
    </div>

    <!-- Döner kategori halkası -->
    <div class="category-orbit">
      <div
        v-for="(item, i) in categories"
        :key="`orbit-${i}`"
        class="orbit-item"
        :style="getTransformStyle(i)"
      >
        <img :src="item.icon" :alt="item.label" />
        <h3>{{ $t(item.label) }}</h3>
        <h4>{{ $t(item.subtitle) }}</h4>
        <p>{{ $t(item.description) }}</p>
      </div>
    </div>

    <!-- Yatay sabit plaket dizisi -->
    <div class="horizontal-cards">
      <div v-for="(item, i) in categories" :key="`horizontal-${i}`" class="horizontal-item">
        <div class="card-title">{{ $t(item.label) }}</div>       
        <div class="card-description" :class="{ active: currentCard === i }">
          {{ $t(item.description) }}
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const categories = [
  { label: 'category.strategy', icon: '/icons/strategy.svg', subtitle: 'category.strategySubtitle', description: 'category.strategyDesc' },
  { label: 'category.design', icon: '/icons/design.svg', subtitle: 'category.designSubtitle', description: 'category.designDesc' },
  { label: 'category.ai', icon: '/icons/ai.svg', subtitle: 'category.aiSubtitle', description: 'category.aiDesc' },
  { label: 'category.edu', icon: '/icons/edu.svg', subtitle: 'category.eduSubtitle', description: 'category.eduDesc' },
  { label: 'category.rnd', icon: '/icons/rnd.svg', subtitle: 'category.rndSubtitle', description: 'category.rndDesc' },
  { label: 'category.it', icon: '/icons/it.svg', subtitle: 'category.itSubtitle', description: 'category.itDesc' }
]

const rotation = ref(0)
const total = categories.length
const anglePerItem = 360 / total
let animationId = null

const currentCard = ref(0)

function animate() {
  rotation.value = (rotation.value + 0.2) % 360
  animationId = requestAnimationFrame(animate)
}

function cycleCards() {
  currentCard.value = (currentCard.value + 1) % total
}

onMounted(() => {
  animate()
  setInterval(cycleCards, 1500)
})
onBeforeUnmount(() => cancelAnimationFrame(animationId))

function getTransformStyle(index) {
  const currentAngle = (index * anglePerItem + rotation.value) % 360
  const rad = (currentAngle * Math.PI) / 180
  const z = Math.cos(rad)
  const scale = 0.8 + 0.4 * (z + 1) / 2
  const zIndex = Math.round(z * 1)

  return {
    transform: `rotateY(${currentAngle}deg) translateZ(280px) scale(${scale})`,
    zIndex
  }
}
</script>

<style scoped>
.section {
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.category-question {
  margin-bottom: 3rem;
}

.category-question h2 {
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
}

.category-orbit {
  position: relative;
  width: 600px;
  height: 480px;
  margin: 0 auto;
  perspective: 1200px;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
}

.orbit-item {
  position: absolute;
  width: 200px;
  height: 220px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, z-index 0.3s ease;
}

.horizontal-cards {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.horizontal-item {
  flex: 1;
  margin: 0 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  height: 180px;
}

.card-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.card-description {
  padding-top: 36px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  font-size: 1.25rem;
  color: var(--color-text-secondary);
}

.card-description.active {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .horizontal-cards {
    flex-direction: column;
  }

  .horizontal-item {
    margin: 1rem 0;
  }
}
</style>