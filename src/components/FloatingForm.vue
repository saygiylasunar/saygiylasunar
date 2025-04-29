<template>
    <div class="floating-form">
      <button class="toggle-btn" @click="toggleForm">
        {{ isOpen ? '✖' : '✉️' }}
      </button>
  
      <div v-if="isOpen" class="form-wrapper">
        <form
          action="https://formspree.io/f/xnndjjzl"
          method="POST"
          @submit.prevent="handleSubmit"
        >
          <input type="text" name="name" placeholder="Adınız" required />
          <input type="email" name="email" placeholder="E-posta" required />
          <textarea name="message" placeholder="Mesajınız" required></textarea>
  
          <!-- Captcha yerine basit bir doğrulama örneği (reCAPTCHA entegresi istenirse eklenebilir) -->
          <input type="checkbox" required /> <label>Robot değilim</label>
  
          <button type="submit">Gönder</button>
        </form>
  
        <div v-if="feedback" class="popup">
          {{ feedback }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  const feedback = ref('')
  
  function toggleForm() {
    isOpen.value = !isOpen.value
    feedback.value = ''
  }
  
  function handleSubmit(e) {
    const form = e.target
    const data = new FormData(form)
  
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    }).then(response => {
      if (response.ok) {
        feedback.value = 'Mesajınız başarıyla gönderildi!'
        form.reset()
      } else {
        feedback.value = 'Gönderimde bir hata oluştu.'
      }
    })
  }
  </script>
  
  <style scoped>
  .floating-form {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 999;
  }
  
  .toggle-btn {
    font-size: 1.5rem;
    padding: 0.75rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .form-wrapper {
    background: white;
    border: 1px solid #ddd;
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .popup {
    margin-top: 1rem;
    color: green;
    font-weight: 500;
  }
  </style>  