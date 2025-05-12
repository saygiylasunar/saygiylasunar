<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close" tabindex="0">
    <div
      class="modal-content"
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
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import ReactionBar from './ReactionBar.vue';
import maintenanceImage from '@/assets/maintenance.jpg';

const { t } = useI18n();

const props = defineProps({
  images: Array,
  title: String,
  id: String,
  modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);

const currentIndex = ref(0);
const visible = ref(false);
const touchStartX = ref(0);
const touchEndX = ref(0);

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
    if (val) {
      // her açılışta history adımı ekle
      history.pushState({ modalOpen: true }, '');
      window.addEventListener('popstate', onBack);
    } else {
      window.removeEventListener('popstate', onBack);
      // eklediğimiz adımı geri al
      if (history.state && history.state.modalOpen) history.back();
    }
  }
);

function close() {
  emit('update:modelValue', false);
}

function onBack() {
  if (visible.value) {
    close();
  }
}

// carousel helpers
const currentImage = computed(() => props.images[currentIndex.value]);
const currentTitle = computed(() => props.title);
const currentId = computed(() => props.id);

function prev() {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
}
function next() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}
function onImageError(e) {
  e.target.src = maintenanceImage;
}

// keyboard
function onKey(e) {
  if (!visible.value) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
}

onMounted(() => {
  window.addEventListener('keydown', onKey);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  window.removeEventListener('popstate', onBack);
});

// swipe
function onTouchStart(e) {
  touchStartX.value = e.changedTouches[0].screenX;
}
function onTouchEnd(e) {
  touchEndX.value = e.changedTouches[0].screenX;
  const diff = touchStartX.value - touchEndX.value;
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  z-index: 9990;
}

.modal-content {
  position: relative;
  background: var(--color-background);
  color: var(--color-text);
  border-radius: var(--border-radius);
  padding: clamp(1rem, 2vw, 2rem);
  width: clamp(280px, 90%, 600px);
  max-height: 95vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.5s ease;
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
  width: 100%;
}

.carousel-image {
  display: block;
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
  transition: transform 0.4s, opacity 0.3s ease;
}

.carousel-image.fade {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  width: clamp(2.5rem, 8vw, 4rem);
  height: clamp(2.5rem, 8vw, 4rem);
  background: transparent;
  border: none;
  color: var(--color-accent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.nav-btn:hover {
  transform: scale(1.2) translateY(-50%);
}
.nav-btn.left {
  left: clamp(0.5rem, 5vw, 1rem);
}
.nav-btn.right {
  right: clamp(0.5rem, 5vw, 1rem);
}

.close-btn {
  position: absolute;
  top: clamp(0.5rem, 2vw, 1rem);
  right: clamp(0.5rem, 2vw, 1rem);
  font-size: clamp(1rem, 4vw, 1.5rem);
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
