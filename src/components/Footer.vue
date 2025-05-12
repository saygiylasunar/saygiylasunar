<template>
  <footer class="footer">
    <div class="footer-left">
      <p>{{ $t('footer.rights') }}</p>
    </div>
    <div class="footer-right">
      <a href="mailto:saygiylasunar@gmail.com">📧</a>
      <a href="https://github.com/ersenfiliz" target="_blank">GitHub</a>
      <a href="https://linkedin.com/in/ersenfiliz" target="_blank">LinkedIn</a>
      <!-- Diğer ikonlar -->
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  padding: 2rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
  font-weight: var(--font-weight-regular);
  font-size: 0.85rem;
}

.footer-content {
  max-width: 900px;
  margin: 0 auto;
}

.footer-logo {
  font-size: 1.2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.footer-socials {
  margin-bottom: 1rem;
}

.footer-socials a {
  margin: 0 0.5rem;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  transition: color 0.3s ease;
}

.footer-socials a:hover {
  color: var(--color-accent);
}
</style>
