<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">EFS</div>

      <div class="footer-socials">
        <a href="https://github.com/saygiylasunar" target="_blank" aria-label="GitHub">🐙</a>
        <a href="https://linkedin.com/in/ersenfiliz" target="_blank" aria-label="LinkedIn">🔗</a>
        <a href="mailto:saygiylasunar@gmail.com" aria-label="Email">✉️</a>
      </div>

      <div class="footer-copy">
        © Ersen FİLİZ Saygıyla Sunar. Tüm hakları saklıdır.
      </div>
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