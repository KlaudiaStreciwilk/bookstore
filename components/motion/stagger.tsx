'use client'

import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'motion/react'
import { gentleSpring } from '@/components/motion/springs'

type StaggerProps = HTMLMotionProps<'div'> & {
  interval?: number
  delay?: number
}

// Reveals its StaggerItem children one after another when the container scrolls into view.
export function Stagger({ interval = 0.08, delay = 0, children, ...props }: StaggerProps) {
  const reduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : interval, delayChildren: delay } },
  }

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={variants} {...props}>
      {children}
    </motion.div>
  )
}

type StaggerItemProps = HTMLMotionProps<'div'> & {
  as?: 'div' | 'article' | 'li'
  distance?: number
}

export function StaggerItem({ as = 'div', distance = 24, children, ...props }: StaggerItemProps) {
  const reduceMotion = useReducedMotion()
  const Component = motion[as] as typeof motion.div
  const variants: Variants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: gentleSpring },
  }

  return <Component variants={variants} {...props}>{children}</Component>
}
