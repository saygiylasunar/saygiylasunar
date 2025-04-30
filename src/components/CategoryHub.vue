<template>
  <section class="section" id="category-hub">
    <!-- Üstte sabit soru -->
    <div class="category-question">
      <h2>{{ $t("category.centerQuestion") }}</h2>
    </div>

    <!-- Döner kategori halkası -->
    <div class="category-orbit" ref="orbitRef">
      <div
        v-for="(item, i) in categories"
        :key="i"
        class="orbit-item"
        :style="getTransformStyle(i)"
      >
        <img :src="item.icon" :alt="item.label" />
        <h3>{{ $t(item.label) }}</h3>
        <h4>{{ $t(item.subtitle) }}</h4>
        <p>{{ $t(item.description) }}</p>
      </div>
    </div>
    <ToolsPreview />
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const categories = [
  {
    label: 'category.strategy',
    icon: '/icons/strategy.svg',
    subtitle: 'category.strategySubtitle',
    description: 'category.strategyDesc'
  },
  {
    label: 'category.design',
    icon: '/icons/design.svg',
    subtitle: 'category.designSubtitle',
    description: 'category.designDesc'
  },
  {
    label: 'category.ai',
    icon: '/icons/ai.svg',
    subtitle: 'category.aiSubtitle',
    description: 'category.aiDesc'
  },
  {
    label: 'category.edu',
    icon: '/icons/edu.svg',
    subtitle: 'category.eduSubtitle',
    description: 'category.eduDesc'
  },
  {
    label: 'category.rnd',
    icon: '/icons/rnd.svg',
    subtitle: 'category.rndSubtitle',
    description: 'category.rndDesc'
  },
  {
    label: 'category.it',
    icon: '/icons/it.svg',
    subtitle: 'category.itSubtitle',
    description: 'category.itDesc'
  }
]

const rotation = ref(0)
const total = categories.length
const anglePerItem = 360 / total

let animationId = null

function animate() {
  const easing = Math.sin((rotation.value * Math.PI) / 180)
  rotation.value = (rotation.value + 0.05 * (1 + easing)) % 360
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})
onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})

function getTransformStyle(index) {
  const currentAngle = (index * anglePerItem + rotation.value) % 360
  const rad = (currentAngle * Math.PI) / 180
  const z = Math.cos(rad)
  const scale = 0.8 + 0.4 * (z + 1) / 2
  const zIndex = Math.round(z * 100)

  return {
    transform: `rotateY(${index * anglePerItem + rotation.value}deg) translateZ(280px) scale(${scale})`,
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

/* Döner yapı */
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

.orbit-item img {
  width: 40px;
  margin-bottom: 0.5rem;
}
.orbit-item h3 {
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  margin-bottom: 0.25rem;
}
.orbit-item h4 {
  font-size: 0.85rem;
  font-weight: var(--font-weight-regular);
  color: var(--color-accent);
  margin-bottom: 0.25rem;
}
.orbit-item p {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .category-orbit {
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    perspective: none;
  }

  .orbit-item {
    position: static;
    transform: none !important;
    margin: 1rem;
  }
}
</style>