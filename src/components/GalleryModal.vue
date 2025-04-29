<template>
    <div v-if="visible" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <div class="carousel">
          <img :src="currentImage" :alt="currentTitle" class="carousel-image" loading="lazy" />
          <button class="nav-btn left" @click="prev">←</button>
          <button class="nav-btn right" @click="next">→</button>
        </div>
  
        <ReactionBar :imageId="currentId" />
  
        <button class="close-btn" @click="close">✖</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue'
  import ReactionBar from './ReactionBar.vue'
  
  const props = defineProps({
    images: Array,
    title: String,
    id: String,
    modelValue: Boolean
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const currentIndex = ref(0)
  const visible = ref(false)
  
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
  
  .left {
    left: 10px;
  }
  
  .right {
    right: 10px;
  }
  
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