'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { gentleSpring } from '@/components/motion/springs'

type FadeInProps = HTMLMotionProps<'div'> & {
  delay?: number
  distance?: number
}

// Slides up and fades in once, when the element scrolls into view.
export function FadeIn({ delay = 0, distance = 16, children, ...props }: FadeInProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ...gentleSpring, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
