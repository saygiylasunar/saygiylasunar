<template>
  <component
    :is="icon"
    v-if="icon"
    class="app-icon"
    :size="size"
    :stroke-width="strokeWidth"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : label"
  />
</template>

<script setup>
import { computed } from 'vue'
import {
  ArrowRight,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
} from '@lucide/vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 18 },
  strokeWidth: { type: Number, default: 1.8 },
  decorative: { type: Boolean, default: true },
  label: { type: String, default: '' },
})

const icons = {
  arrowRight: ArrowRight,
  externalLink: ExternalLink,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  moon: Moon,
  shieldCheck: ShieldCheck,
  sun: Sun,
}

const icon = computed(() => icons[props.name] || null)
</script>
