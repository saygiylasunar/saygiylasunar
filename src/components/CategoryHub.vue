<template>
  <section id="category-hub">
    <div class="hub-container">
      <div class="hub-center">
        <h2>{{ $t('categoryHub.question') }}</h2>
      </div>

      <div
        v-for="key in categoryKeys"
        :key="key"
        class="hub-node"
        :class="'node-' + (categoryKeys.indexOf(key) + 1)"
      >
        <img :src="iconMap[key]" alt="" class="hub-icon" />
        <h3>{{ $t(`categories.${key}.title`) }}</h3>
        <p>{{ $t(`categories.${key}.description`) }}</p>
      </div>

      <div
        v-for="key in subCategoryKeys"
        :key="key"
        class="sub-node"
      >
        <img :src="subIconMap[key]" alt="" class="hub-icon" />
        <h4>{{ $t(`designSub.${key}.title`) }}</h4>
        <p>{{ $t(`designSub.${key}.description`) }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const categoryKeys = [
  'strategy',
  'design',
  'ai',
  'education',
  'r_and_d',
  'it'
]

const subCategoryKeys = [
  'graphic',
  'uiux',
  'identity',
  'social',
  'presentation'
]

const iconMap = {
  strategy: new URL('@/assets/icons/strategy.svg', import.meta.url).href,
  design: new URL('@/assets/icons/design.svg', import.meta.url).href,
  ai: new URL('@/assets/icons/ai.svg', import.meta.url).href,
  education: new URL('@/assets/icons/education.svg', import.meta.url).href,
  r_and_d: new URL('@/assets/icons/r_and_d.svg', import.meta.url).href,
  it: new URL('@/assets/icons/it.svg', import.meta.url).href
}

const subIconMap = {
  graphic: new URL('@/assets/icons/graphic.svg', import.meta.url).href,
  uiux: new URL('@/assets/icons/uiux.svg', import.meta.url).href,
  identity: new URL('@/assets/icons/identity.svg', import.meta.url).href,
  social: new URL('@/assets/icons/social.svg', import.meta.url).href,
  presentation: new URL('@/assets/icons/presentation.svg', import.meta.url).href
}
</script>

<style scoped>
.hub-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hub-center {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-accent);
  color: white;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem auto;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.hub-node, .sub-node {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hub-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.hub-icon:hover {
  transform: scale(1.1);
}
</style>