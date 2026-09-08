<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @click.self="close">
        <section
          ref="modalRef"
          class="intent-modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
        >
          <button ref="closeButtonRef" class="modal-close" type="button" :aria-label="t('common.close')" @click="close">×</button>
          <p class="eyebrow">{{ t('intent.eyebrow') }}</p>
          <h2 :id="titleId">{{ t('intent.title') }}</h2>

          <div class="intent-about">
            <p class="mini-title">{{ t('intent.aboutTitle') }}</p>
            <p>{{ t('intent.aboutOne') }}</p>
            <p>{{ t('intent.aboutTwo') }}</p>
          </div>

          <div class="intent-actions">
            <button class="intent-card intent-card-primary" type="button" @click="choose('/projects')">
              <span>01</span>
              <strong>{{ t('intent.knowTitle') }}</strong>
              <small>{{ t('intent.knowText') }}</small>
            </button>
            <button class="intent-card" type="button" @click="choose('/services')">
              <span>02</span>
              <strong>{{ t('intent.workTitle') }}</strong>
              <small>{{ t('intent.workText') }}</small>
            </button>
          </div>

          <div class="intent-quick">
            <p class="mini-title">{{ t('intent.quickTitle') }}</p>
            <div class="intent-quick-grid">
              <button type="button" @click="choose('/projects/loravow')">
                <strong>{{ t('intent.loravowTitle') }}</strong>
                <small>{{ t('intent.loravowText') }}</small>
              </button>
              <button type="button" @click="choose('/projects/beyaz-onlukluler-digital-transformation')">
                <strong>{{ t('intent.beyazTitle') }}</strong>
                <small>{{ t('intent.beyazText') }}</small>
              </button>
              <button type="button" @click="choose('/projects/yavuz-ozel-guvenlik')">
                <strong>{{ t('intent.yavuzTitle') }}</strong>
                <small>{{ t('intent.yavuzText') }}</small>
              </button>
              <button type="button" @click="choose('/logbook')">
                <strong>{{ t('intent.logbookTitle') }}</strong>
                <small>{{ t('intent.logbookText') }}</small>
              </button>
              <button type="button" @click="choose('/music')">
                <strong>{{ t('intent.musicTitle') }}</strong>
                <small>{{ t('intent.musicText') }}</small>
              </button>
              <button type="button" @click="choose('/projects')">
                <strong>{{ t('intent.projectsTitle') }}</strong>
                <small>{{ t('intent.projectsText') }}</small>
              </button>
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '../lib/locale.js'

const router = useRouter()
const open = ref(false)
const modalRef = ref(null)
const closeButtonRef = ref(null)
const titleId = 'intent-title'
let previousFocus = null
let previousOverflow = ''

function restoreDocument() {
  document.body.style.overflow = previousOverflow
  if (previousFocus instanceof HTMLElement) previousFocus.focus()
  previousFocus = null
}

function close() {
  if (!open.value) return
  open.value = false
  sessionStorage.setItem('intent-seen-v3', 'true')
}

function choose(path) {
  close()
  router.push(path)
}

function reopen() {
  open.value = true
}

function focusableElements() {
  if (!modalRef.value) return []
  return [...modalRef.value.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )]
}

function onKeydown(event) {
  if (!open.value) return
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== 'Tab') return

  const items = focusableElements()
  if (!items.length) {
    event.preventDefault()
    modalRef.value?.focus()
    return
  }

  const first = items[0]
  const last = items[items.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    previousFocus = document.activeElement
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButtonRef.value?.focus()
  } else {
    await nextTick()
    restoreDocument()
  }
})

onMounted(() => {
  if (!sessionStorage.getItem('intent-seen-v3')) {
    window.setTimeout(() => { open.value = true }, 420)
  }
  window.addEventListener('open-intent', reopen)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('open-intent', reopen)
  window.removeEventListener('keydown', onKeydown)
  if (open.value) restoreDocument()
})
</script>
