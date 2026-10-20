'use client'

import type { PointerEvent } from 'react'
import { Sparkles } from 'lucide-react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { BookCover } from '@/components/catalog/book-cover'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import type { Book } from '@/lib/types'

const MAX_TILT = 7
const tiltSpring = { stiffness: 140, damping: 18, mass: 0.6 }

function bob(duration: number, delay: number, distance = 6) {
  return {
    animate: { y: [0, -distance, 0] },
    transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
  }
}

// Featured book with a slow floating loop, cursor tilt (desktop only) and bobbing badges.
export function HeroArt({ book }: { book: Book }) {
  const reduceMotion = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const canTilt = finePointer && !reduceMotion
  const rotateX = useSpring(0, tiltSpring)
  const rotateY = useSpring(0, tiltSpring)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!canTilt) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * MAX_TILT * 2)
    rotateX.set(-py * MAX_TILT * 2)
  }

  function resetTilt() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="hero-art" aria-label={`Polecana książka: ${book.title}`} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="hero-ring" aria-hidden="true" />
      <motion.div className="hero-float" {...(reduceMotion ? {} : bob(6, 0, 10))}>
        <motion.div className="hero-tilt" style={{ rotateX, rotateY, transformPerspective: 900 }}>
          <div className="hero-book-wrap"><BookCover book={book} large /></div>
        </motion.div>
      </motion.div>
      <motion.div className="rating-float" {...(reduceMotion ? {} : bob(3.6, 0.5))}><div><strong>Wybór czytelników</strong><span className="float-stars">★★★★★</span></div><strong>{book.rating}</strong></motion.div>
      <motion.div className="new-badge" {...(reduceMotion ? {} : bob(4.2, 1.4))}><Sparkles aria-hidden="true" /> Nowość</motion.div>
    </div>
  )
}
