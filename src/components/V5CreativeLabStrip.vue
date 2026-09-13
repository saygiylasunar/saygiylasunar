<template>
  <section class="v5-creative-lab" aria-labelledby="v5-creative-lab-title">
    <div class="container v5-creative-lab-inner">
      <div class="v5-creative-lab-signal">
        <div>
          <span class="v5-creative-lab-kicker">LAB / GENERATIVE SYSTEMS</span>
          <strong id="v5-creative-lab-title">for → sin / cos → field</strong>
        </div>
        <canvas ref="canvasRef" aria-hidden="true"></canvas>
      </div>

      <div class="v5-creative-lab-tracks">
        <div v-for="track in creativeLabTracks" :key="track.id" class="v5-creative-lab-track">
          <span>{{ track.label }}</span>
          <strong>{{ track.tools.join(' · ') }}</strong>
          <small>{{ track.note }}</small>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { creativeLabTracks } from '../config/creativeStack.js'

const canvasRef = ref(null)
let frameId = 0
let resizeObserver = null
let pointerX = 0
let pointerY = 0
let reducedMotion = false

function draw(time = 0) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const pixelWidth = Math.round(rect.width * dpr)
  const pixelHeight = Math.round(rect.height * dpr)

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth
    canvas.height = pixelHeight
  }

  const context = canvas.getContext('2d')
  if (!context) return

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, rect.width, rect.height)

  const styles = getComputedStyle(document.documentElement)
  const text = styles.getPropertyValue('--text').trim() || '#121417'
  const accent = styles.getPropertyValue('--accent').trim() || '#dd4b2f'
  const width = rect.width
  const height = rect.height
  const centerX = width * 0.5
  const centerY = height * 0.5
  const phase = reducedMotion ? 0.7 : time * 0.00045
  const pointCount = 34
  const points = []

  for (let index = 0; index < pointCount; index += 1) {
    const ratio = index / pointCount
    const angle = ratio * Math.PI * 2 + phase
    const wave = Math.sin(index * 1.73 + phase * 2.4)
    const radius = Math.min(width, height) * (0.24 + wave * 0.055)
    const pointerDriftX = pointerX * Math.sin(index * 0.7) * 5
    const pointerDriftY = pointerY * Math.cos(index * 0.6) * 5

    points.push({
      x: centerX + Math.cos(angle) * radius + pointerDriftX,
      y: centerY + Math.sin(angle) * radius + pointerDriftY,
    })
  }

  context.strokeStyle = text
  context.lineWidth = 0.7
  context.globalAlpha = 0.17

  for (let index = 0; index < points.length; index += 1) {
    const point = points[index]
    const partner = points[(index + 7) % points.length]
    context.beginPath()
    context.moveTo(point.x, point.y)
    context.lineTo(partner.x, partner.y)
    context.stroke()
  }

  context.globalAlpha = 0.72
  context.fillStyle = text
  points.forEach((point, index) => {
    const radius = index % 5 === 0 ? 1.8 : 1.05
    context.beginPath()
    context.arc(point.x, point.y, radius, 0, Math.PI * 2)
    context.fill()
  })

  const activePoint = points[Math.floor((phase * 4) % points.length)] || points[0]
  if (activePoint) {
    context.globalAlpha = 0.9
    context.fillStyle = accent
    context.beginPath()
    context.arc(activePoint.x, activePoint.y, 2.6, 0, Math.PI * 2)
    context.fill()
  }

  context.globalAlpha = 1

  if (!reducedMotion) frameId = requestAnimationFrame(draw)
}

function onPointerMove(event) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2
}

function onPointerLeave() {
  pointerX = 0
  pointerY = 0
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resizeObserver = new ResizeObserver(() => {
    if (reducedMotion) draw(0)
  })
  resizeObserver.observe(canvas)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', onPointerLeave)

  if (reducedMotion) draw(0)
  else frameId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  canvasRef.value?.removeEventListener('pointermove', onPointerMove)
  canvasRef.value?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<style scoped>
.v5-creative-lab {
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
  background: color-mix(in srgb, var(--bg-soft) 58%, var(--bg));
}

.v5-creative-lab-inner {
  display: grid;
  grid-template-columns: minmax(250px, 0.78fr) minmax(0, 2.22fr);
  min-height: 142px;
}

.v5-creative-lab-signal {
  display: grid;
  grid-template-columns: minmax(130px, 1fr) minmax(100px, 0.85fr);
  align-items: center;
  gap: 16px;
  border-right: 1px solid var(--line-strong);
  padding: 18px 24px 18px 0;
}

.v5-creative-lab-kicker,
.v5-creative-lab-track > span {
  display: block;
  margin-bottom: 7px;
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.v5-creative-lab-signal strong {
  display: block;
  font-size: clamp(0.95rem, 1.25vw, 1.14rem);
  letter-spacing: -0.025em;
}

.v5-creative-lab canvas {
  width: 100%;
  height: 82px;
  cursor: crosshair;
}

.v5-creative-lab-tracks {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.v5-creative-lab-track {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--line);
  padding: 18px 22px;
}

.v5-creative-lab-track:last-child {
  border-right: 0;
}

.v5-creative-lab-track strong {
  overflow: hidden;
  margin-bottom: 5px;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v5-creative-lab-track small {
  color: var(--muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.62rem;
  line-height: 1.4;
}

@media (max-width: 860px) {
  .v5-creative-lab-inner {
    grid-template-columns: 1fr;
  }

  .v5-creative-lab-signal {
    border-right: 0;
    border-bottom: 1px solid var(--line-strong);
    padding-right: 0;
  }
}

@media (max-width: 640px) {
  .v5-creative-lab-tracks {
    grid-template-columns: 1fr;
  }

  .v5-creative-lab-track {
    border-right: 0;
    border-bottom: 1px solid var(--line);
    padding-inline: 0;
  }

  .v5-creative-lab-track:last-child {
    border-bottom: 0;
  }
}
</style>
