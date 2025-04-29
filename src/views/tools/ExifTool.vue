<template>
    <section class="section" id="exif-tool">
      <h2 class="section-title">{{ $t("tools.exifRemover") }}</h2>
  
      <div class="tool-wrapper">
        <div class="tool-controls">
          <input type="file" accept="image/*" @change="handleFile" />
          <button :disabled="!image" @click="clearMetadata">
            {{ $t("tools.clearMetadata") }}
          </button>
        </div>
  
        <div v-if="image" class="tool-preview">
          <img :src="previewUrl" alt="Preview" />
          <p>{{ $t("tools.metadataCleared") }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const { t } = useI18n()
  const image = ref(null)
  const previewUrl = ref('')
  
  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
  
    const reader = new FileReader()
    reader.onload = () => {
      previewUrl.value = reader.result
      image.value = file
    }
    reader.readAsDataURL(file)
  }
  
  function clearMetadata() {
    // Sadece Base64 üzerinden EXIF verisi sıfırlanmış kopya yapılır
    const img = new Image()
    img.src = previewUrl.value
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      previewUrl.value = canvas.toDataURL('image/jpeg') // EXIF'siz yeni görsel
    }
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
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid var(--color-border);
  }
  
  .tool-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .tool-controls input[type="file"] {
    background: var(--color-background);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    padding: 0.6rem;
    border-radius: var(--border-radius);
  }
  
  .tool-controls button {
    padding: 0.7rem 1rem;
    font-weight: var(--font-weight-bold);
    background: var(--color-accent);
    color: #fff;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .tool-controls button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .tool-controls button:hover:enabled {
    background: var(--color-accent-light);
  }
  
  .tool-preview {
    text-align: center;
  }
  
  .tool-preview img {
    max-width: 100%;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }
  
  .tool-preview p {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
  }
  </style>  