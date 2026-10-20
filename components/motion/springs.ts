import type { Transition } from 'motion/react'

// Shared spring presets so every animation on the site feels the same: soft, no overshoot jitter.
export const gentleSpring: Transition = { type: 'spring', stiffness: 110, damping: 20, mass: 0.9 }
export const snappySpring: Transition = { type: 'spring', stiffness: 260, damping: 22 }
