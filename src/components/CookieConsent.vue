<template>
  <div v-if="!accepted" class="cookie-banner">
    <p>{{ $t("cookie.message") }}</p>
    <button @click="accept" class="cookie-btn">{{ $t("cookie.accept") }}</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const accepted = ref(false)

onMounted(() => {
  accepted.value = localStorage.getItem("cookieAccepted") === "true"
})

const accept = () => {
  localStorage.setItem("cookieAccepted", "true")
  accepted.value = true
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--color-surface);
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
  padding: 1rem;
  text-align: center;
  z-index: 10000;
}
.cookie-btn {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
}
</style>