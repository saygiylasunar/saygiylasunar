<template>
    <button
      @click="scrollToTop"
      class="back-to-top"
      aria-label="{{ $t(backtotop) }}"
    >
      ↑
    </button>
  </template>
  
  <script setup>
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  </script>
  
  <style scoped lang="scss">
  .back-to-top {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
  
    &:hover {
      background: var(--color-accent-light);
      transform: scale(1.05);
    }
  }
  </style>  