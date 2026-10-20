'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, wrap } from 'motion/react'

type MarqueeProps = {
  children: ReactNode
  direction?: 'left' | 'right'
  /** Speed in pixels per second. */
  speed?: number
  pauseOnHover?: boolean
  /** How many copies of the content to render; must be enough to cover the widest screen twice. */
  copies?: number
  className?: string
}

// Infinite, seamless ticker. Content is duplicated and the track is wrapped by one copy's width.
export function Marquee({ children, direction = 'left', speed = 40, pauseOnHover = true, copies = 6, className }: MarqueeProps) {
  const reduceMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const x = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    const track = trackRef.current
    if (reduceMotion || paused.current || !track) return
    const copyWidth = track.scrollWidth / copies
    if (!copyWidth) return
    const step = (direction === 'left' ? -1 : 1) * speed * (delta / 1000)
    x.set(wrap(-copyWidth, 0, x.get() + step))
  })

  return (
    <div
      className={className ? `marquee ${className}` : 'marquee'}
      onPointerEnter={(event) => { if (pauseOnHover && event.pointerType === 'mouse') paused.current = true }}
      onPointerLeave={() => { paused.current = false }}
    >
      <motion.div ref={trackRef} className="marquee-track" style={{ x }}>
        {Array.from({ length: copies }, (_, index) => (
          <div className="marquee-group" key={index} aria-hidden={index > 0 || undefined}>{children}</div>
        ))}
      </motion.div>
    </div>
  )
}
