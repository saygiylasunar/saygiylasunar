<template>
  <section class="section" id="events">
    <h2 class="section-title">{{ $t("events.title") }}</h2>
    <p class="section-sub">{{ $t("events.description") }}</p>

    <div class="events-grid">
      <div
        v-for="(event, i) in events"
        :key="i"
        class="event-card"
        @click="openViewer(i)"
      >
        <img :src="event.image" :alt="event.title" class="event-image" />
        <h3>{{ event.title }}</h3>
        <p>{{ event.description }}</p>
      </div>
    </div>

    <div v-if="viewerActive" class="image-viewer" @click.self="closeViewer">
      <button class="close-button" @click="closeViewer">×</button>
      <button class="nav-button left" @click.stop="prevImage">‹</button>
      <button class="nav-button right" @click.stop="nextImage">›</button>

      <div class="viewer-container">
        <div class="viewer-info">
          <h3>{{ events[currentIndex].title }}</h3>
          <p>{{ events[currentIndex].description }}</p>
        </div>

        <img
          :src="events[currentIndex].image"
          :alt="events[currentIndex].title"
          class="viewer-image"
        />

        <div class="viewer-reactions">
          <ReactionBar :image-id="events[currentIndex].slug" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import ReactionBar from './ReactionBar.vue'

const { t, locale } = useI18n()

const imageModules = import.meta.glob('/src/assets/events/*.{SVG,svg,JPG,PNG,WEBP,JPEG,MP4,mp4,GIF,gif,jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
})

const events = Object.entries(imageModules).map(([path, src]) => {
  const slug = path.split('/').pop().replace(/\.[^/.]+$/, '') // filename without extension

  return {
    slug,
    image: src,
    title: t(`events.items.${slug}.title`),
    description: t(`events.items.${slug}.description`)
  }
})

const viewerActive = ref(false)
const currentIndex = ref(0)

function openViewer(index) {
  currentIndex.value = index
  viewerActive.value = true
}
function closeViewer() {
  viewerActive.value = false
}
function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + events.length) % events.length
}
function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % events.length
}
function handleEsc(e) {
  if (e.key === 'Escape') closeViewer()
}
onMounted(() => window.addEventListener('keydown', handleEsc))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEsc))
</script>


<style scoped>
.section-title {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-accent);
  text-align: center;
  margin-bottom: 2rem;
}

.section-sub {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.event-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.event-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.event-card h3 {
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  margin: 0.75rem;
  color: var(--color-text);
}

.event-card p {
  font-size: 0.9rem;
  margin: 0 0.75rem 1rem;
  color: var(--color-text-secondary);
}

/* === Viewer === */
.image-viewer {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}

.viewer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
  width: 90%;
  max-height: 90vh;
}

.viewer-info {
  text-align: center;
  color: #fff;
  margin-bottom: 1rem;
}

.viewer-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.viewer-info p {
  font-size: 1rem;
  opacity: 0.8;
}

.viewer-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: var(--border-radius);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
}

.viewer-reactions {
  margin-top: 1.5rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  color: #fff;
  font-size: 2rem;
  border: none;
  cursor: pointer;
}

.nav-button {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 2.5rem;
  border: none;
  cursor: pointer;
  z-index: 10000;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}
.nav-button:hover {
  background: rgba(255, 255, 255, 0.15);
}
.nav-button.left {
  left: 1rem;
}
.nav-button.right {
  right: 1rem;
}
</style>