<template>
  <div
    v-if="visible"
    class="modal-backdrop"
    @click.self="close"
    @keydown.esc="close"
    tabindex="0"
  >
    <div
      class="modal-content"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="carousel">
        <img
          :src="currentImage"
          :alt="currentTitle"
          class="carousel-image fade"
          loading="lazy"
          @error="onImageError"
        />
        <button class="nav-btn left" @click="prev">←</button>
        <button class="nav-btn right" @click="next">→</button>
      </div>

      <ReactionBar :imageId="currentId" />
      <button class="close-btn" @click="close">✖</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import ReactionBar from './ReactionBar.vue'
import maintenanceImage from '@/assets/maintenance.jpg'

const props = defineProps({
  images: Array,
  title: String,
  id: String,
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const currentIndex = ref(0)
const visible = ref(false)

const touchStartX = ref(null)
const touchEndX = ref(null)

watch(() => props.modelValue, (val) => {
  visible.value = val
})

const currentImage = computed(() => props.images[currentIndex.value])
const currentTitle = computed(() => props.title)
const currentId = computed(() => props.id)

function close() {
  emit('update:modelValue', false)
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function onImageError(event) {
  event.target.src = maintenanceImage
}

// Keyboard support
function handleKey(e) {
  if (!visible.value) return
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
})

// Mobile swipe support
function onTouchStart(e) {
  touchStartX.value = e.changedTouches[0].screenX
}
function onTouchEnd(e) {
  touchEndX.value = e.changedTouches[0].screenX
  handleSwipe()
}
function handleSwipe() {
  if (touchStartX.value !== null && touchEndX.value !== null) {
    const diff = touchStartX.value - touchEndX.value
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  position: relative;
  background: var(--color-background);
  color: var(--color-text);
  border-radius: var(--border-radius);
  padding: 2rem;
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.5s ease;
  transition: transform 0.3s ease;
}

.modal-content:hover {
  transform: scale(1.01);
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.carousel {
  position: relative;
}

.carousel-image {
  width: 100%;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  transition: transform 0.4s, opacity 0.3s ease;
}

.carousel-image.fade {
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  background: transparent;
  border: none;
  color: var(--color-accent);
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;
}

.nav-btn:hover {
  transform: scale(1.2) translateY(-50%);
}

.left { left: 10px; }
.right { right: 10px; }

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.3rem;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color 0.2s ease;
}
.close-btn:hover {
  color: var(--color-accent);
}
</style>