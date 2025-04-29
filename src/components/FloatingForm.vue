<template>
    <div class="form-float-button" @click="toggleModal">
      ✉️
    </div>
  
    <div v-if="showModal" class="form-modal-backdrop" @click.self="toggleModal">
      <div class="form-modal-content">
        <h2>{{ $t("contact.title") }}</h2>
        <form @submit.prevent="submitForm">
          <input type="text" v-model="form.name" :placeholder="$t('contact.name')" required />
          <input type="email" v-model="form.email" :placeholder="$t('contact.email')" required />
          <textarea v-model="form.message" :placeholder="$t('contact.message')" required></textarea>
  
          <button type="submit">{{ $t("contact.send") }}</button>
        </form>
  
        <button class="close-btn" @click="toggleModal">✖</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  
  const showModal = ref(false)
  const form = ref({
    name: '',
    email: '',
    message: ''
  })
  
  function toggleModal() {
    showModal.value = !showModal.value
  }
  
  async function submitForm() {
    try {
      const response = await fetch('https://formspree.io/f/xnndjjzl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
  
      if (response.ok) {
        alert(t('contact.success'))
        form.value = { name: '', email: '', message: '' }
        showModal.value = false
      } else {
        alert(t('contact.error'))
      }
    } catch (error) {
      console.error(error)
      alert(t('contact.error'))
    }
  }
  </script>
  
  <style scoped>
  .form-float-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--color-accent);
    color: #fff;
    font-size: 1.5rem;
    padding: 0.8rem;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    cursor: pointer;
    z-index: 10000;
    transition: background-color 0.3s;
  }
  
  .form-float-button:hover {
    background: var(--color-accent-light);
  }
  
  .form-modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .form-modal-content {
    background: var(--color-surface);
    padding: 2rem;
    border-radius: var(--border-radius);
    width: 90%;
    max-width: 400px;
    position: relative;
    color: var(--color-text);
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input, textarea {
    padding: 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-main);
    font-weight: var(--font-weight-regular);
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
  
  button[type="submit"] {
    background: var(--color-accent);
    color: #fff;
    padding: 0.8rem;
    font-weight: var(--font-weight-bold);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button[type="submit"]:hover {
    background: var(--color-accent-light);
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    font-size: 1.2rem;
    cursor: pointer;
  }
  </style>  