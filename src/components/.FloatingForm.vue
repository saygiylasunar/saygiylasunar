<!--<template>
  <div class="floating-form">
    <button @click="isOpen = !isOpen" class="form-toggle">
      ✉️
    </button>

    <div v-if="isOpen" class="form-popup">
      <form @submit.prevent="submitForm">
        <label>
          {{ $t("form.name") }}
          <input type="text" v-model="form.name" :placeholder="$t('form.namePlaceholder')" required />
        </label>

        <label>
          {{ $t("form.email") }}
          <input type="email" v-model="form.email" :placeholder="$t('form.emailPlaceholder')" required />
        </label>

        <label>
          {{ $t("form.message") }}
          <textarea v-model="form.message" :placeholder="$t('form.messagePlaceholder')" required></textarea>
        </label>
        <-- İsteğe bağlı Captcha alanı->
        <--<div class="captcha">[CAPTCHA]</div>->

        <button type="submit" class="submit-btn">
          {{ $t("form.send") }}
        </button>

        <p v-if="submitted" class="success-message">
          {{ $t("form.success") }}
        </p>
      </form>
    </div>
  </div>
</template>-->

<template>
  <div class="text-center py-20 text-muted">
    <p>Şu anda iletişim formu aktif değil.</p>
    <p>
      Bizimle iletişime geçmek için lütfen
      <a href="mailto:saygiylasunar@gmail.com" class="underline">e-posta</a>
      gönderin.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isOpen = ref(false);
const submitted = ref(false);

const form = ref({
  name: '',
  email: '',
  message: '',
});

const submitForm = async () => {
  try {
    await fetch('https://formspree.io/f/your-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    });
    submitted.value = true;
    setTimeout(() => (submitted.value = false), 5000);
    form.value = { name: '', email: '', message: '' };
  } catch (e) {
    alert('Bir hata oluştu.');
  }
};
</script>

<style scoped>
.floating-form {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
}
.form-toggle {
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  cursor: pointer;
}
.form-popup {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 280px;
  margin-top: 0.5rem;
}
label {
  display: block;
  margin-bottom: 1rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}
.submit-btn {
  background: var(--color-accent);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
}
.success-message {
  margin-top: 1rem;
  color: var(--color-success);
  font-weight: bold;
}
</style>
