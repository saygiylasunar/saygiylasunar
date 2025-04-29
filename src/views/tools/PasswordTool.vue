<template>
    <section class="section" id="password-tool">
      <h2 class="section-title">{{ $t("tools.passwordGenerator") }}</h2>
  
      <div class="tool-wrapper">
        <div class="tool-controls">
          <label>{{ $t("tools.length") }}: {{ length }}</label>
          <input type="range" v-model="length" min="8" max="32" />
  
          <label>{{ $t("tools.complexity") }}</label>
          <select v-model="complexity">
            <option value="simple">{{ $t("tools.simple") }}</option>
            <option value="medium">{{ $t("tools.medium") }}</option>
            <option value="high">{{ $t("tools.high") }}</option>
          </select>
  
          <button @click="generatePassword">{{ $t("tools.generate") }}</button>
        </div>
  
        <div v-if="password" class="password-output">
          <input type="text" :value="password" readonly />
          <button @click="copyPassword">{{ $t("tools.copy") }}</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  // i18n
  const { t } = useI18n()
  
  // States
  const length = ref(12)
  const complexity = ref('medium')
  const password = ref('')
  
  // ReactionBar’da kullanılan userID tekrar kullanılır
  function getUserID() {
    let id = localStorage.getItem('userID')
    if (!id) {
      id = Math.random().toString(36).substring(2, 15)
      localStorage.setItem('userID', id)
    }
    return id
  }
  
  function generatePassword() {
    const id = getUserID()
    let chars = 'abcdefghijklmnopqrstuvwxyz'
    if (complexity.value !== 'simple') chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (complexity.value === 'high') chars += '0123456789!@#$%&*-_'
  
    let result = ''
    for (let i = 0; i < length.value; i++) {
      const seed = id.charCodeAt(i % id.length)
      const index = (Math.floor(Math.random() * chars.length) + seed) % chars.length
      result += chars.charAt(index)
    }
  
    // Son dokunuş: birkaç zorlayıcı karakter daha (karıştırmak için)
    if (complexity.value !== 'simple') {
      result += '!@#$%&0123456789'.charAt(Math.floor(Math.random() * 14))
    }
  
    password.value = result
  }
  
  function copyPassword() {
    navigator.clipboard.writeText(password.value)
  }
  </script>
  
  <style scoped>
  .section-title {
    font-size: 2rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .tool-wrapper {
    background: var(--color-surface);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid var(--color-border);
  }
  
  .tool-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .tool-controls label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
  }
  
  .tool-controls input[type="range"],
  .tool-controls select {
    width: 100%;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    background: var(--color-background);
    color: var(--color-text);
  }
  
  .tool-controls button {
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    font-weight: var(--font-weight-bold);
    background: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .tool-controls button:hover {
    background: var(--color-accent-light);
  }
  
  .password-output {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .password-output input {
    flex: 1;
    padding: 0.7rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-background);
    color: var(--color-text);
  }
  </style>  