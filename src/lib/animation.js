import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let installed = false

export const motion = Object.freeze({
  duration: {
    fast: 0.18,
    base: 0.36,
    slow: 0.72,
  },
  ease: {
    standard: 'power2.out',
    emphasized: 'power3.out',
    inOut: 'power2.inOut',
  },
  distance: {
    subtle: 8,
    base: 20,
    strong: 36,
  },
})

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function installAnimationFoundation() {
  if (installed || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({
    duration: motion.duration.base,
    ease: motion.ease.standard,
  })
  installed = true
}

export function createGsapContext(scope, setup) {
  installAnimationFoundation()

  if (prefersReducedMotion()) {
    return { revert() {} }
  }

  return gsap.context(setup, scope)
}

export function revealOnScroll(targets, options = {}) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { clearProps: 'all' })
    return null
  }

  const {
    y = motion.distance.base,
    duration = motion.duration.slow,
    stagger = 0,
    start = 'top 88%',
    once = true,
  } = options

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration,
      stagger,
      ease: motion.ease.emphasized,
      scrollTrigger: {
        trigger: Array.isArray(targets) ? targets[0] : targets,
        start,
        once,
      },
    },
  )
}

export function refreshScrollAnimations() {
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger }
