export const motionTransition = Object.freeze({
  fast: { duration: 0.16, ease: [0.2, 0.75, 0.2, 1] },
  base: { duration: 0.24, ease: [0.2, 0.75, 0.2, 1] },
  slow: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
})

export const motionPreset = Object.freeze({
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: motionTransition.base,
  },
  fadeUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: motionTransition.slow,
  },
  hoverLift: {
    whileHover: { y: -3 },
    transition: motionTransition.fast,
  },
})

export const motionViewport = Object.freeze({
  once: true,
  amount: 0.16,
})
