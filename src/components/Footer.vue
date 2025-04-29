<template>
    <footer class="footer">
      <p>{{ $t('footer.rights') }}</p>
      <div class="socials">
        <a href="https://github.com/saygiylasunar" target="_blank">GitHub</a>
        <a href="https://linkedin.com" target="_blank">LinkedIn</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
      </div>
      <button class="top" @click="scrollToTop">↑</button>
    </footer>
  </template>
  
  <script setup>
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  </script>
  
  <style scoped>
  .footer {
    text-align: center;
    padding: 2rem;
    background-color: var(--color-background);
    color: var(--color-text);
    border-top: 1px solid #ddd;
  }
  
  .socials {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
  }
  
  .top {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .top:hover {
    transform: scale(1.2);
  }
  </style>  