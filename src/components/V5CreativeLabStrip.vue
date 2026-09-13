<template>
  <section class="v5-creative-lab" :data-environment="v5Environment" aria-labelledby="v5-creative-lab-title">
    <div class="container v5-creative-lab-inner">
      <div class="v5-creative-lab-signal">
        <div>
          <span class="v5-creative-lab-kicker">LAB / GENERATIVE SYSTEMS</span>
          <strong id="v5-creative-lab-title">{{ physicsTitle }}</strong>
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
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { creativeLabTracks } from '../config/creativeStack.js'
import { v5Environment } from '../lib/v5Environment.js'

const canvasRef = ref(null)
let frameId = 0
let resizeObserver = null
let stopEnvironmentWatch = null
let pointerX = 0
let pointerY = 0
let reducedMotion = false

const physicsTitles = {
  paper: 'registration → offset → print field',
  night: 'signal → interference → transmission',
  garden: 'seed → branch → living system',
  field: 'bearing → range → coordinate lock',
}

const physicsTitle = computed(() => physicsTitles[v5Environment.value] || physicsTitles.garden)

function getCanvasState() {
  const canvas = canvasRef.value
  if (!canvas) return null

  const rect = canvas.getBoundingClientRect()
  if (!rect.width || !rect.height) return null

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const pixelWidth = Math.round(rect.width * dpr)
  const pixelHeight = Math.round(rect.height * dpr)

  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth
    canvas.height = pixelHeight
  }

  const context = canvas.getContext('2d')
  if (!context) return null

  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, rect.width, rect.height)

  const styles = getComputedStyle(canvas)

  return {
    canvas,
    context,
    width: rect.width,
    height: rect.height,
    text: styles.getPropertyValue('--text').trim() || '#121417',
    muted: styles.getPropertyValue('--muted').trim() || '#62676b',
    accent: styles.getPropertyValue('--accent').trim() || '#dd4b2f',
    secondary: styles.getPropertyValue('--v5-secondary').trim() || '#315bd6',
    third: styles.getPropertyValue('--v5-third').trim() || '#e6ff58',
  }
}

function line(context, x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
}

function dot(context, x, y, radius, color, alpha = 1) {
  context.globalAlpha = alpha
  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}

function drawPaper(state, phase) {
  const { context, width, height, text, accent, secondary, third } = state
  const baseline = height * 0.52
  const count = 22

  context.lineWidth = 0.75

  for (let pass = 0; pass < 3; pass += 1) {
    const color = [text, secondary, accent][pass]
    const offsetX = pass === 0 ? 0 : pass === 1 ? 2.2 : -1.8
    const offsetY = pass === 0 ? 0 : pass === 1 ? -1.3 : 1.6

    context.strokeStyle = color
    context.globalAlpha = pass === 0 ? 0.28 : 0.4
    context.beginPath()

    for (let index = 0; index <= count; index += 1) {
      const ratio = index / count
      const x = ratio * width
      const wave = Math.sin(index * 1.2 + phase * 1.8) * height * 0.12
      const registrationJitter = Math.sin(index * 5.7 + phase * 0.7) * (pass * 0.7)
      const y = baseline + wave + registrationJitter + pointerY * 3 + offsetY
      if (index === 0) context.moveTo(x + offsetX, y)
      else context.lineTo(x + offsetX, y)
    }
    context.stroke()
  }

  const markX = width * (0.22 + ((Math.sin(phase * 0.8) + 1) * 0.28))
  const markY = baseline + Math.cos(phase * 1.3) * height * 0.12
  context.strokeStyle = third
  context.globalAlpha = 0.8
  context.lineWidth = 1
  line(context, markX - 8, markY, markX + 8, markY)
  line(context, markX, markY - 8, markX, markY + 8)
  dot(context, markX, markY, 2.3, third, 0.9)

  context.globalAlpha = 0.11
  context.strokeStyle = text
  for (let x = 12; x < width; x += 24) line(context, x, height - 8, x + pointerX * 2, height - 4)
}

function drawNight(state, phase) {
  const { context, width, height, text, accent, secondary, third } = state
  const channels = 5

  context.lineWidth = 0.8

  for (let channel = 0; channel < channels; channel += 1) {
    const baseY = ((channel + 1) / (channels + 1)) * height
    const color = channel % 3 === 0 ? accent : channel % 3 === 1 ? secondary : third
    context.strokeStyle = color
    context.globalAlpha = 0.22 + channel * 0.045
    context.beginPath()

    for (let x = 0; x <= width; x += 4) {
      const local = x / Math.max(width, 1)
      const carrier = Math.sin(local * 32 + phase * (1.8 + channel * 0.17))
      const interference = Math.sin(local * 91 - phase * 2.4 + channel) * 0.35
      const pointerGain = 1 + Math.abs(pointerX) * 0.7
      const y = baseY + (carrier + interference) * (2.5 + channel * 0.35) * pointerGain
      if (x === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
    context.stroke()
  }

  const scanX = reducedMotion ? width * 0.58 : (phase * 56) % (width + 32) - 16
  context.globalAlpha = 0.4
  context.strokeStyle = accent
  context.lineWidth = 1
  line(context, scanX, 5, scanX, height - 5)

  const glitchBand = Math.floor((Math.sin(phase * 3.7) + 1) * 0.5 * 5)
  context.fillStyle = secondary
  context.globalAlpha = 0.08
  context.fillRect(0, 8 + glitchBand * 11, width, 3)

  context.fillStyle = text
  context.globalAlpha = 0.6
  for (let index = 0; index < 12; index += 1) {
    const x = ((index * 83 + phase * 37) % (width + 20)) - 10
    const y = 9 + (index % 4) * (height - 18) / 3
    context.fillRect(Math.round(x), Math.round(y), index % 3 === 0 ? 5 : 2, 1)
  }
}

function drawGarden(state, phase) {
  const { context, width, height, text, accent, secondary, third } = state
  const rootX = width * 0.18
  const rootY = height * 0.78
  const stems = 7

  context.lineCap = 'round'

  for (let stem = 0; stem < stems; stem += 1) {
    const growth = stem / Math.max(stems - 1, 1)
    const baseAngle = -1.0 + growth * 0.95 + Math.sin(phase * 0.65 + stem) * 0.07
    const length = width * (0.16 + growth * 0.055)
    const sway = pointerX * 0.09 + Math.sin(phase + stem * 1.4) * 0.04
    const tipX = rootX + Math.cos(baseAngle + sway) * length
    const tipY = rootY + Math.sin(baseAngle + sway) * length

    context.strokeStyle = stem % 2 ? secondary : text
    context.globalAlpha = stem % 2 ? 0.34 : 0.24
    context.lineWidth = 0.8 + growth * 0.7
    line(context, rootX, rootY, tipX, tipY)

    for (let branch = 1; branch <= 3; branch += 1) {
      const branchRatio = branch / 4
      const bx = rootX + (tipX - rootX) * branchRatio
      const by = rootY + (tipY - rootY) * branchRatio
      const branchAngle = baseAngle + (branch % 2 ? -0.72 : 0.62) + Math.sin(phase * 0.8 + branch + stem) * 0.08
      const branchLength = length * (0.12 + branch * 0.025)
      const ex = bx + Math.cos(branchAngle) * branchLength
      const ey = by + Math.sin(branchAngle) * branchLength

      context.strokeStyle = branch === 3 ? accent : secondary
      context.globalAlpha = 0.3 + branch * 0.08
      context.lineWidth = 0.65
      line(context, bx, by, ex, ey)
      dot(context, ex, ey, branch === 3 ? 2.1 : 1.4, branch === 3 ? third : accent, 0.78)
    }

    dot(context, tipX, tipY, 1.8 + growth * 0.8, stem % 2 ? third : accent, 0.86)
  }

  context.strokeStyle = third
  context.globalAlpha = 0.25
  context.lineWidth = 0.7
  const orbitX = width * 0.74 + pointerX * 5
  const orbitY = height * 0.46 + pointerY * 4
  context.beginPath()
  context.ellipse(orbitX, orbitY, width * 0.12, height * 0.22, phase * 0.08, 0, Math.PI * 2)
  context.stroke()
  dot(context, orbitX + Math.cos(phase) * width * 0.12, orbitY + Math.sin(phase) * height * 0.22, 2.2, secondary, 0.82)
}

function drawField(state, phase) {
  const { context, width, height, text, accent, secondary, third } = state
  const centerX = width * (0.54 + pointerX * 0.025)
  const centerY = height * (0.52 + pointerY * 0.04)
  const unit = Math.max(14, Math.min(24, width / 12))

  context.lineWidth = 0.65
  context.strokeStyle = text
  context.globalAlpha = 0.12
  for (let x = centerX % unit; x < width; x += unit) line(context, x, 0, x, height)
  for (let y = centerY % unit; y < height; y += unit) line(context, 0, y, width, y)

  const maxRadius = Math.min(width, height) * 0.42
  for (let ring = 1; ring <= 3; ring += 1) {
    context.strokeStyle = ring === 2 ? secondary : text
    context.globalAlpha = ring === 2 ? 0.34 : 0.18
    context.beginPath()
    context.arc(centerX, centerY, maxRadius * (ring / 3), 0, Math.PI * 2)
    context.stroke()
  }

  const bearing = reducedMotion ? -0.72 : phase * 0.42 - 1.2
  const bearingLength = maxRadius * 1.35
  const endX = centerX + Math.cos(bearing) * bearingLength
  const endY = centerY + Math.sin(bearing) * bearingLength
  context.strokeStyle = accent
  context.globalAlpha = 0.8
  context.lineWidth = 1.1
  line(context, centerX, centerY, endX, endY)

  context.strokeStyle = secondary
  context.globalAlpha = 0.55
  line(context, centerX - 9, centerY, centerX + 9, centerY)
  line(context, centerX, centerY - 9, centerX, centerY + 9)
  dot(context, centerX, centerY, 2.4, third, 0.92)

  context.globalAlpha = 0.65
  context.fillStyle = text
  context.font = '8px ui-monospace, SFMono-Regular, Menlo, monospace'
  context.fillText(`${Math.round((bearing * 180) / Math.PI + 360) % 360}°`, Math.min(width - 26, endX + 4), Math.max(9, endY - 3))
  context.fillText('EF/GRID', 5, height - 5)
}

function draw(time = 0) {
  const state = getCanvasState()
  if (!state) return

  const phase = reducedMotion ? 0.82 : time * 0.001
  const drawers = {
    paper: drawPaper,
    night: drawNight,
    garden: drawGarden,
    field: drawField,
  }

  ;(drawers[v5Environment.value] || drawGarden)(state, phase)
  state.context.globalAlpha = 1

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

  stopEnvironmentWatch = watch(v5Environment, () => {
    if (reducedMotion) draw(0)
  })

  if (reducedMotion) draw(0)
  else frameId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  cancelAnimationFrame(frameId)
  resizeObserver?.disconnect()
  stopEnvironmentWatch?.()
  canvasRef.value?.removeEventListener('pointermove', onPointerMove)
  canvasRef.value?.removeEventListener('pointerleave', onPointerLeave)
})
</script>

<style scoped>
.v5-creative-lab {
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line-strong);
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
  height: 88px;
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
